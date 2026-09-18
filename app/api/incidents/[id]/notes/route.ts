import {z} from 'zod';
import {db,ensureSeed,getIncident,ApiError} from '@/lib/store';
import {readJson,json,errorResponse} from '@/lib/http';
import {activityStatement} from '@/lib/response-store';
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){try{const {id}=await params;const data=z.object({body:z.string().trim().min(1).max(5000)}).strict().parse(await readJson(request));await ensureSeed();if(!await getIncident(id))throw new ApiError(404,'Incident not found.');const note={id:crypto.randomUUID(),incidentId:id,body:data.body,createdAt:new Date().toISOString()};await db().batch([db().prepare('INSERT INTO notes (id,incident_id,body,created_at) VALUES (?,?,?,?)').bind(note.id,id,note.body,note.createdAt),activityStatement(id,'note',note.body)]);return json(note,201);}catch(e){return errorResponse(e);}}
