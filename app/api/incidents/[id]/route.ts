import { z } from 'zod';
import { db } from '@/db';
import { incidents, activity, postmortems } from '@/db/schema';
import { getIncident, ensureSeed, ApiError } from '@/lib/store';
import { readJson, json, errorResponse } from '@/lib/http';
import { eq, and } from 'drizzle-orm';

const input = z.object({
  status: z.enum(['active', 'investigating', 'resolved']),
  version: z.number().int().positive(),
  resolution: z.string().trim().min(10).max(5000).optional()
}).strict();

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = input.parse(await readJson(request));
    await ensureSeed();

    const current = await getIncident(id);
    if (!current) throw new ApiError(404, 'Incident not found.');
    if (current.version !== data.version) throw new ApiError(409, 'This incident changed. Refresh and try again.');
    if (current.status === data.status) return json(current);
    if (current.status === 'active' && data.status === 'resolved') throw new ApiError(400, 'Start investigating before resolving this incident.');
    if (data.status === 'resolved' && !data.resolution) throw new ApiError(400, 'Add a resolution summary describing the mitigation and recovery check.');

    const now = new Date().toISOString();
    
    await db.transaction(async (tx) => {
      const existing = await tx.select().from(incidents).where(eq(incidents.id, id)).limit(1);
      if (existing.length === 0 || existing[0].version !== data.version) throw new ApiError(409, 'This incident changed. Refresh and try again.');

      await tx.update(incidents)
        .set({
          status: data.status,
          version: data.version + 1,
          resolvedAt: data.status === 'resolved' ? now : null,
          resolutionSummary: data.status === 'resolved' ? (data.resolution || '') : ''
        })
        .where(eq(incidents.id, id));

      await tx.insert(activity).values({
        id: crypto.randomUUID(),
        incidentId: id,
        kind: 'status',
        message: `Status: ${current.status} → ${data.status}.${data.resolution ? ` Resolution: ${data.resolution}` : ''}`,
        createdAt: now
      });

      // Update postmortems if necessary
      if (data.status !== 'resolved') {
         const existingPostmortem = await tx.select().from(postmortems).where(and(eq(postmortems.incidentId, id), eq(postmortems.status, 'final'))).limit(1);
         if (existingPostmortem.length > 0) {
            await tx.update(postmortems)
              .set({ status: 'draft', version: existingPostmortem[0].version + 1, updatedAt: now })
              .where(eq(postmortems.incidentId, id));
         }
      }
    });

    return json(await getIncident(id));
  } catch (e) {
    return errorResponse(e);
  }
}
