import { z } from 'zod';
import { db } from '@/db';
import { notes, activity } from '@/db/schema';
import { ensureSeed, getIncident, ApiError } from '@/lib/store';
import { readJson, json, errorResponse } from '@/lib/http';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = z.object({ body: z.string().trim().min(1).max(5000) }).strict().parse(await readJson(request));
    await ensureSeed();
    
    if (!await getIncident(id)) throw new ApiError(404, 'Incident not found.');
    
    const note = {
      id: crypto.randomUUID(),
      incidentId: id,
      body: data.body,
      createdAt: new Date().toISOString()
    };

    await db.transaction(async (tx) => {
      await tx.insert(notes).values(note);
      await tx.insert(activity).values({
        id: crypto.randomUUID(),
        incidentId: id,
        kind: 'note',
        message: note.body,
        createdAt: new Date().toISOString()
      });
    });

    return json(note, 201);
  } catch (e) {
    return errorResponse(e);
  }
}
