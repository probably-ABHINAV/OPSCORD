import { db } from '../db';
import { ApiError, getIncident, ensureSeed } from './store';
import { blankCoordination, blankPostmortem, starterRunbooks, type Coordination, type ActionItem, type ActivityEntry, type Postmortem, type Runbook, type ResponseData, type OperationsData, responseAction, reviewInput, runbookInput } from './response';
import type { z } from 'zod';
import { incidents, coordination, actionItems, activity, postmortems, runbooks } from '../db/schema';
import { eq, and, desc, asc, sql } from 'drizzle-orm';

export async function requireIncident(id: string) {
  await ensureSeed();
  const incident = await getIncident(id);
  if (!incident) throw new ApiError(404, 'Incident not found.');
  return incident;
}

export async function getRunbooks(): Promise<Runbook[]> {
  await db.transaction(async (tx) => {
    for (const r of starterRunbooks) {
      const existing = await tx.select().from(runbooks).where(eq(runbooks.id, r.id)).limit(1);
      if (existing.length === 0) {
        await tx.insert(runbooks).values({
          id: r.id,
          name: r.name,
          description: r.description,
          steps: JSON.stringify(r.steps),
          version: 1,
          updatedAt: '2026-09-18T00:00:00.000Z'
        });
      }
    }
  });

  const rows = await db.select().from(runbooks).orderBy(runbooks.name).limit(100);
  return rows.map(r => ({ ...r, steps: JSON.parse(r.steps) }));
}

export async function getResponse(id: string): Promise<ResponseData> {
  await requireIncident(id);
  
  const c = await db.select().from(coordination).where(eq(coordination.incidentId, id)).limit(1);
  const t = await db.select().from(actionItems).where(eq(actionItems.incidentId, id)).orderBy(asc(actionItems.createdAt), asc(actionItems.id));
  const a = await db.select().from(activity).where(eq(activity.incidentId, id)).orderBy(desc(activity.createdAt), desc(activity.id)).limit(201);
  const p = await db.select().from(postmortems).where(eq(postmortems.incidentId, id)).limit(1);
  const r = await getRunbooks();

  return {
    coordination: c[0] as Coordination ?? blankCoordination(id),
    tasks: t as ActionItem[],
    activity: a.slice(0, 200) as ActivityEntry[],
    activityTruncated: a.length > 200,
    postmortem: p[0] as Postmortem ?? blankPostmortem(id),
    runbooks: r
  };
}

export async function getOperations(): Promise<OperationsData> {
  await ensureSeed();
  
  const tasks = await db.select().from(actionItems).orderBy(
    sql`CASE WHEN status = 'done' THEN 1 ELSE 0 END`,
    sql`due_at IS NULL`,
    asc(actionItems.dueAt),
    desc(actionItems.createdAt)
  ).limit(500);

  const topIncidents = await db.select({ id: incidents.id }).from(incidents).orderBy(desc(incidents.createdAt)).limit(100);
  const incidentIds = topIncidents.map(i => i.id);

  let coords: any[] = [];
  let reviews: any[] = [];
  if (incidentIds.length > 0) {
    coords = await db.select().from(coordination).where(sql`incident_id IN ${incidentIds}`);
    reviews = await db.select().from(postmortems).where(sql`incident_id IN ${incidentIds}`);
  }

  const taskCount = await db.select({ n: sql<number>`count(*)` }).from(actionItems);
  const incidentCount = await db.select({ n: sql<number>`count(*)` }).from(incidents);
  const rbs = await getRunbooks();

  return {
    tasks: tasks as ActionItem[],
    coordination: coords as Coordination[],
    reviews: reviews as Postmortem[],
    taskCount: taskCount[0]?.n ?? 0,
    incidentCount: incidentCount[0]?.n ?? 0,
    runbooks: rbs
  };
}

const stale = () => new ApiError(409, 'This record changed in another session. Refresh to load the current version; your draft has been kept.');

export async function updateResponse(id: string, input: z.infer<typeof responseAction>) {
  await requireIncident(id);
  const now = new Date().toISOString();
  
  await db.transaction(async (tx) => {
    if (input.action === 'coordination') {
      const d = input.data;
      const existing = await tx.select().from(coordination).where(eq(coordination.incidentId, id)).limit(1);
      
      if (d.version === 0) {
        if (existing.length > 0) throw stale();
        await tx.insert(coordination).values({ incidentId: id, owner: d.owner, communicationsLead: d.communicationsLead, environment: d.environment, impact: d.impact, summary: d.summary, channelUrl: d.channelUrl, nextUpdateAt: d.nextUpdateAt, version: 1, updatedAt: now });
      } else {
        if (existing.length === 0 || existing[0].version !== d.version) throw stale();
        await tx.update(coordination).set({ owner: d.owner, communicationsLead: d.communicationsLead, environment: d.environment, impact: d.impact, summary: d.summary, channelUrl: d.channelUrl, nextUpdateAt: d.nextUpdateAt, version: d.version + 1, updatedAt: now }).where(eq(coordination.incidentId, id));
      }
      await tx.insert(activity).values({ id: crypto.randomUUID(), incidentId: id, kind: 'coordination', message: `Response brief updated. Commander: ${d.owner||'unassigned'}. Environment: ${d.environment}.`, createdAt: now });
    }
    
    if (input.action === 'create_task') {
      const d = input.data;
      const existing = await tx.select().from(actionItems).where(eq(actionItems.id, input.id)).limit(1);
      if (existing.length > 0) {
         if (existing[0].incidentId !== id || Object.entries(d).some(([k,v]) => existing[0][k as keyof ActionItem] !== v)) throw new ApiError(409, 'This task ID already exists with different content.');
         return; // no-op
      }
      const count = await tx.select({ n: sql<number>`count(*)` }).from(actionItems).where(eq(actionItems.incidentId, id));
      if (count[0].n >= 200) throw new ApiError(400, 'An incident supports up to 200 actions.');
      
      await tx.insert(actionItems).values({ id: input.id, incidentId: id, title: d.title, owner: d.owner, priority: d.priority, category: d.category, status: 'open', dueAt: d.dueAt, evidenceId: d.evidenceId, version: 1, createdAt: now });
      await tx.insert(activity).values({ id: crypto.randomUUID(), incidentId: id, kind: 'task', message: `Action added: ${d.title}`, createdAt: now });
    }
    
    if (input.action === 'update_task') {
      const d = input.data;
      const existing = await tx.select().from(actionItems).where(and(eq(actionItems.id, input.id), eq(actionItems.incidentId, id))).limit(1);
      if (existing.length === 0 || existing[0].version !== d.version) throw stale();
      
      await tx.update(actionItems).set({ title: d.title, owner: d.owner, priority: d.priority, category: d.category, status: d.status, dueAt: d.dueAt, evidenceId: d.evidenceId, version: d.version + 1, completedAt: d.status === 'done' ? (existing[0].completedAt ?? now) : null }).where(eq(actionItems.id, input.id));
      await tx.insert(activity).values({ id: crypto.randomUUID(), incidentId: id, kind: 'task', message: `Action ${d.status.replace('_',' ')}: ${d.title}. Owner: ${d.owner||'unassigned'}.`, createdAt: now });
    }
    
    if (input.action === 'decision') {
      const existing = await tx.select().from(activity).where(eq(activity.id, input.id)).limit(1);
      if (existing.length > 0) {
        if (existing[0].incidentId !== id || existing[0].message !== input.body) throw new ApiError(409, 'This decision ID already has different content.');
        return; // no-op
      }
      await tx.insert(activity).values({ id: input.id, incidentId: id, kind: 'decision', message: input.body, createdAt: now });
    }
    
    if (input.action === 'apply_runbook') {
      const rbs = await getRunbooks();
      const runbook = rbs.find(r => r.id === input.id);
      if (!runbook) throw new ApiError(404, 'Runbook not found.');
      
      let currentActionCount = (await tx.select({ n: sql<number>`count(*)` }).from(actionItems).where(eq(actionItems.incidentId, id)))[0].n;
      let addedCount = 0;
      
      for (let i = 0; i < runbook.steps.length; i++) {
        const stepTitle = runbook.steps[i];
        const key = `${runbook.id}:v${runbook.version}:${i}`;
        const existing = await tx.select().from(actionItems).where(and(eq(actionItems.incidentId, id), eq(actionItems.runbookKey, key))).limit(1);
        if (existing.length === 0) {
          if (currentActionCount + addedCount >= 200) throw new ApiError(400, 'This runbook would exceed the 200-action limit. No steps were added.');
          await tx.insert(actionItems).values({ id: crypto.randomUUID(), incidentId: id, title: stepTitle, owner: '', priority: 'medium', category: 'mitigation', status: 'open', version: 1, createdAt: new Date(Date.parse(now) + i).toISOString(), runbookKey: key });
          addedCount++;
        }
      }
      
      if (addedCount > 0) {
        await tx.insert(activity).values({ id: crypto.randomUUID(), incidentId: id, kind: 'runbook', message: `Applied ${runbook.name} (version ${runbook.version}). Existing checklist actions were preserved.`, createdAt: now });
      }
    }
  });

  return getResponse(id);
}

export async function saveReview(id: string, d: z.infer<typeof reviewInput>) {
  const incident = await requireIncident(id);
  if (d.status === 'final' && incident.status !== 'resolved') throw new ApiError(400, 'Resolve the incident before finalizing its postmortem. Drafts can be saved at any time.');
  const now = new Date().toISOString();
  
  await db.transaction(async (tx) => {
    const existing = await tx.select().from(postmortems).where(eq(postmortems.incidentId, id)).limit(1);
    if (d.version === 0) {
      if (existing.length > 0) throw stale();
      await tx.insert(postmortems).values({ incidentId: id, summary: d.summary, impact: d.impact, cause: d.cause, response: d.response, lessons: d.lessons, status: d.status, version: 1, updatedAt: now });
    } else {
      if (existing.length === 0 || existing[0].version !== d.version) throw stale();
      await tx.update(postmortems).set({ summary: d.summary, impact: d.impact, cause: d.cause, response: d.response, lessons: d.lessons, status: d.status, version: d.version + 1, updatedAt: now }).where(eq(postmortems.incidentId, id));
    }
    await tx.insert(activity).values({ id: crypto.randomUUID(), incidentId: id, kind: 'review', message: d.status === 'final' ? 'Postmortem finalized.' : 'Postmortem draft saved.', createdAt: now });
  });
  
  return getResponse(id);
}

export async function saveRunbook(d: z.infer<typeof runbookInput>, id = crypto.randomUUID(), version = 0) {
  await getRunbooks();
  const now = new Date().toISOString();
  
  await db.transaction(async (tx) => {
    if (version === 0) {
      const count = await tx.select({ n: sql<number>`count(*)` }).from(runbooks);
      if (count[0].n >= 100) throw new ApiError(400, 'The library supports up to 100 runbooks.');
      await tx.insert(runbooks).values({ id, name: d.name, description: d.description, steps: JSON.stringify(d.steps), version: 1, updatedAt: now });
    } else {
      const existing = await tx.select().from(runbooks).where(eq(runbooks.id, id)).limit(1);
      if (existing.length === 0 || existing[0].version !== version) throw stale();
      await tx.update(runbooks).set({ name: d.name, description: d.description, steps: JSON.stringify(d.steps), version: version + 1, updatedAt: now }).where(eq(runbooks.id, id));
    }
  });
  
  return getRunbooks();
}
