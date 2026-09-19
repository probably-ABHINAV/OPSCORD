import { db } from '../db';
import { incidents, events as eventsTable, notes as notesTable, seeds } from '../db/schema';
import { eq, and, desc, asc } from 'drizzle-orm';
import { demoIncident, demoEvents, demoAsOf, type Incident, type EvidenceEvent, type EventInput, type Note } from './domain';
import { rankCandidates } from './scoring';

export function canonical(event: EventInput) {
  return JSON.stringify(Object.fromEntries(Object.entries({
    ...event,
    metadata: Object.fromEntries(Object.entries(event.metadata).sort(([a], [b]) => a.localeCompare(b)))
  }).sort(([a], [b]) => a.localeCompare(b))));
}

export async function digest(event: EventInput) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonical(event)));
  return [...new Uint8Array(bytes)].map(v => v.toString(16).padStart(2, '0')).join('');
}

export async function ensureSeed() {
  const seedRun = await db.select({ id: seeds.id }).from(seeds).where(eq(seeds.id, 'opscord-demo-v1')).limit(1);
  if (seedRun.length > 0) return;

  try {
    await db.transaction(async (tx) => {
      await tx.insert(seeds).values({ id: 'opscord-demo-v1' });
      await tx.insert(incidents).values(demoIncident);
      for (const e of demoEvents) {
        const { id, incidentId, receivedAt, ...input } = e;
        const hash = await digest(input);
        await tx.insert(eventsTable).values({ ...e, metadata: JSON.stringify(e.metadata), payloadHash: hash });
      }
    });
  } catch (error) {
    const check = await db.select({ id: seeds.id }).from(seeds).where(eq(seeds.id, 'opscord-demo-v1')).limit(1);
    if (check.length === 0) throw error;
  }
}

export async function getIncident(id: string) {
  const result = await db.select().from(incidents).where(eq(incidents.id, id)).limit(1);
  return result[0] as Incident | undefined;
}

export async function workspace(id?: string) {
  await ensureSeed();
  const allIncidents = await db.select().from(incidents).orderBy(desc(incidents.createdAt)).limit(100);
  const incident = id ? await getIncident(id) : allIncidents.find(i => i.mode === 'demo') ?? allIncidents[0];
  
  if (!incident) throw new ApiError(404, 'Incident not found.');

  const rows = await db.select().from(eventsTable).where(eq(eventsTable.incidentId, incident.id)).orderBy(asc(eventsTable.occurredAt), asc(eventsTable.id)).limit(2000);
  const events = rows.map(e => ({ ...e, metadata: JSON.parse(e.metadata) })) as EvidenceEvent[];

  const notes = await db.select().from(notesTable).where(eq(notesTable.incidentId, incident.id)).orderBy(desc(notesTable.createdAt)).limit(100);
  const asOf = incident.mode === 'demo' ? demoAsOf : new Date().toISOString();
  
  return { incidents: allIncidents as Incident[], incident: incident as Incident, events, notes, asOf, candidates: rankCandidates(incident as Incident, events, asOf) };
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function ingest(incidentId: string, input: EventInput) {
  await ensureSeed(); 
  const incident = await getIncident(incidentId);
  if (!incident) throw new ApiError(404, 'Incident not found.');

  const t = Date.parse(input.occurredAt), onset = Date.parse(incident.startedAt), asOf = Date.parse(incident.mode === 'demo' ? demoAsOf : new Date().toISOString());
  if (t < onset - 86400000 || t > asOf + 30000) throw new ApiError(400, 'Event time must be within 24 hours before onset and no later than the investigation clock. The demo clock is 17 May 2025, 11:45 IST.');

  const hash = await digest(input);
  const lookup = async () => {
    const result = await db.select({ id: eventsTable.id, payloadHash: eventsTable.payloadHash })
      .from(eventsTable)
      .where(and(eq(eventsTable.incidentId, incidentId), eq(eventsTable.source, input.source), eq(eventsTable.externalId, input.externalId)))
      .limit(1);
    return result[0];
  };

  const existing = await lookup();
  if (existing) {
    if (existing.payloadHash !== hash) throw new ApiError(409, 'That source and external ID already identify different evidence. Use a new external ID.');
    return { id: existing.id, duplicate: true };
  }

  const event: EvidenceEvent = { ...input, id: crypto.randomUUID(), incidentId, receivedAt: new Date().toISOString() };
  try {
    await db.insert(eventsTable).values({ ...event, metadata: JSON.stringify(event.metadata), payloadHash: hash });
  } catch (error) {
    const raced = await lookup();
    if (!raced) throw error;
    if (raced.payloadHash !== hash) throw new ApiError(409, 'External ID conflicts with an existing event.');
    return { id: raced.id, duplicate: true };
  }
  return { id: event.id, duplicate: false };
}
