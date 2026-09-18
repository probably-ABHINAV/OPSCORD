import {z} from 'zod';
import {db,getIncident,ensureSeed,ApiError} from '@/lib/store';
import {readJson,json,errorResponse} from '@/lib/http';
import {activityStatement} from '@/lib/response-store';
const input=z.object({status:z.enum(['active','investigating','resolved']),version:z.number().int().positive(),resolution:z.string().trim().min(10).max(5000).optional()}).strict();
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){
 try{
  const {id}=await params;const data=input.parse(await readJson(request));await ensureSeed();
  const current=await getIncident(id);if(!current)throw new ApiError(404,'Incident not found.');
  if(current.version!==data.version)throw new ApiError(409,'This incident changed. Refresh and try again.');
  if(current.status===data.status)return json(current);
  if(current.status==='active'&&data.status==='resolved')throw new ApiError(400,'Start investigating before resolving this incident.');
  if(data.status==='resolved'&&!data.resolution)throw new ApiError(400,'Add a resolution summary describing the mitigation and recovery check.');
  const results=await db().batch([
   db().prepare('UPDATE incidents SET status=?,version=version+1,resolved_at=?,resolution_summary=? WHERE id=? AND version=?').bind(data.status,data.status==='resolved'?new Date().toISOString():null,data.status==='resolved'?data.resolution:'',id,data.version),
   activityStatement(id,'status',`Status: ${current.status} → ${data.status}.${data.resolution?` Resolution: ${data.resolution}`:''}`,true),
   db().prepare("UPDATE postmortems SET status='draft',version=version+1,updated_at=? WHERE incident_id=? AND status='final' AND EXISTS (SELECT 1 FROM incidents WHERE id=? AND status!='resolved' AND version=?)").bind(new Date().toISOString(),id,id,data.version+1),
  ]);
  if(!results[0].meta.changes)throw new ApiError(409,'This incident changed. Refresh and try again.');
  return json(await getIncident(id));
 }catch(e){return errorResponse(e);}
}
