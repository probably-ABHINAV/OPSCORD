import {db,ApiError,getIncident,ensureSeed} from './store';
import {blankCoordination,blankPostmortem,starterRunbooks,type Coordination,type ActionItem,type ActivityEntry,type Postmortem,type Runbook,type ResponseData,type OperationsData,responseAction,reviewInput,runbookInput} from './response';
import type {z} from 'zod';

const coordinationSelect='SELECT incident_id AS incidentId,owner,communications_lead AS communicationsLead,environment,impact,summary,channel_url AS channelUrl,next_update_at AS nextUpdateAt,version,updated_at AS updatedAt FROM incident_coordination';
const tasksSelect='SELECT id,incident_id AS incidentId,title,owner,priority,category,status,due_at AS dueAt,evidence_id AS evidenceId,version,created_at AS createdAt,completed_at AS completedAt,runbook_key AS runbookKey FROM action_items';
const reviewSelect='SELECT incident_id AS incidentId,summary,impact,cause,response,lessons,status,version,updated_at AS updatedAt FROM postmortems';
export function activityStatement(incidentId:string,kind:string,message:string,conditional=false,id=crypto.randomUUID()){
 return db().prepare(`INSERT INTO incident_activity (id,incident_id,kind,message,created_at) SELECT ?,?,?,?,?${conditional?' WHERE changes() > 0':''}`).bind(id,incidentId,kind,message,new Date().toISOString());
}
export async function requireIncident(id:string){await ensureSeed();const incident=await getIncident(id);if(!incident)throw new ApiError(404,'Incident not found.');return incident;}
export async function getRunbooks():Promise<Runbook[]>{
 await db().batch(starterRunbooks.map(r=>db().prepare('INSERT OR IGNORE INTO runbooks (id,name,description,steps,version,updated_at) VALUES (?,?,?,?,1,?)').bind(r.id,r.name,r.description,JSON.stringify(r.steps),'2026-09-18T00:00:00.000Z')));
 const rows=(await db().prepare('SELECT id,name,description,steps,version,updated_at AS updatedAt FROM runbooks ORDER BY name LIMIT 100').all<Omit<Runbook,'steps'>&{steps:string}>()).results;
 return rows.map(r=>({...r,steps:JSON.parse(r.steps)}));
}
export async function getResponse(id:string):Promise<ResponseData>{
 await requireIncident(id);
 const [coordination,tasks,activity,postmortem,runbooks]=await Promise.all([
 db().prepare(`${coordinationSelect} WHERE incident_id=?`).bind(id).first<Coordination>(),
 db().prepare(`${tasksSelect} WHERE incident_id=? ORDER BY created_at,id`).bind(id).all<ActionItem>(),
 db().prepare('SELECT id,incident_id AS incidentId,kind,message,created_at AS createdAt FROM incident_activity WHERE incident_id=? ORDER BY created_at DESC,id DESC LIMIT 201').bind(id).all<ActivityEntry>(),
 db().prepare(`${reviewSelect} WHERE incident_id=?`).bind(id).first<Postmortem>(),getRunbooks()]);
 return {coordination:coordination??blankCoordination(id),tasks:tasks.results,activity:activity.results.slice(0,200),activityTruncated:activity.results.length>200,postmortem:postmortem??blankPostmortem(id),runbooks};
}
export async function getOperations():Promise<OperationsData>{
 await ensureSeed();
 const [tasks,coordination,reviews,taskCount,incidentCount,runbooks]=await Promise.all([
 db().prepare(`${tasksSelect} ORDER BY CASE status WHEN 'done' THEN 1 ELSE 0 END, due_at IS NULL,due_at,created_at DESC LIMIT 500`).all<ActionItem>(),
 db().prepare(`${coordinationSelect} WHERE incident_id IN (SELECT id FROM incidents ORDER BY created_at DESC LIMIT 100)`).all<Coordination>(),
 db().prepare(`${reviewSelect} WHERE incident_id IN (SELECT id FROM incidents ORDER BY created_at DESC LIMIT 100)`).all<Postmortem>(),
 db().prepare('SELECT count(*) AS n FROM action_items').first<{n:number}>(),db().prepare('SELECT count(*) AS n FROM incidents').first<{n:number}>(),getRunbooks()]);
 return {tasks:tasks.results,coordination:coordination.results,reviews:reviews.results,taskCount:taskCount?.n??0,incidentCount:incidentCount?.n??0,runbooks};
}
async function checkEvidence(id:string,evidenceId:string|null){if(evidenceId&&!await db().prepare('SELECT id FROM events WHERE id=? AND incident_id=?').bind(evidenceId,id).first())throw new ApiError(400,'Linked evidence must belong to this incident.');}
const stale=()=>new ApiError(409,'This record changed in another session. Refresh to load the current version; your draft has been kept.');
export async function updateResponse(id:string,input:z.infer<typeof responseAction>){
 await requireIncident(id);const now=new Date().toISOString();
 if(input.action==='coordination'){
  const d=input.data;
  const statement=db().prepare(`INSERT INTO incident_coordination (incident_id,owner,communications_lead,environment,impact,summary,channel_url,next_update_at,version,updated_at) SELECT ?,?,?,?,?,?,?,?,1,? WHERE ?=0 OR EXISTS (SELECT 1 FROM incident_coordination WHERE incident_id=?) ON CONFLICT(incident_id) DO UPDATE SET owner=excluded.owner,communications_lead=excluded.communications_lead,environment=excluded.environment,impact=excluded.impact,summary=excluded.summary,channel_url=excluded.channel_url,next_update_at=excluded.next_update_at,version=incident_coordination.version+1,updated_at=excluded.updated_at WHERE incident_coordination.version=?`).bind(id,d.owner,d.communicationsLead,d.environment,d.impact,d.summary,d.channelUrl,d.nextUpdateAt,now,d.version,id,d.version);
  const results=await db().batch([statement,activityStatement(id,'coordination',`Response brief updated. Commander: ${d.owner||'unassigned'}. Environment: ${d.environment}.`,true)]);if(!results[0].meta.changes)throw stale();
 }
 if(input.action==='create_task'){
  const d=input.data;await checkEvidence(id,d.evidenceId);
  const previous=await db().prepare(`${tasksSelect} WHERE id=?`).bind(input.id).first<ActionItem>();
  if(previous){if(previous.incidentId!==id||Object.entries(d).some(([k,v])=>previous[k as keyof ActionItem]!==v))throw new ApiError(409,'This task ID already exists with different content.');return getResponse(id);}
  const results=await db().batch([db().prepare('INSERT OR IGNORE INTO action_items (id,incident_id,title,owner,priority,category,status,due_at,evidence_id,version,created_at) SELECT ?,?,?,?,?,?,\'open\',?,?,1,? WHERE (SELECT count(*) FROM action_items WHERE incident_id=?)<200').bind(input.id,id,d.title,d.owner,d.priority,d.category,d.dueAt,d.evidenceId,now,id),activityStatement(id,'task',`Action added: ${d.title}`,true)]);
  if(!results[0].meta.changes){const raced=await db().prepare(`${tasksSelect} WHERE id=?`).bind(input.id).first<ActionItem>();if(raced&&raced.incidentId===id&&Object.entries(d).every(([k,v])=>raced[k as keyof ActionItem]===v))return getResponse(id);throw new ApiError(raced?409:400,raced?'This task ID already has different content.':'An incident supports up to 200 actions.');}
 }
 if(input.action==='update_task'){
  const d=input.data;await checkEvidence(id,d.evidenceId);
  const results=await db().batch([db().prepare(`UPDATE action_items SET title=?,owner=?,priority=?,category=?,status=?,due_at=?,evidence_id=?,version=version+1,completed_at=CASE WHEN ?='done' THEN COALESCE(completed_at,?) ELSE NULL END WHERE id=? AND incident_id=? AND version=?`).bind(d.title,d.owner,d.priority,d.category,d.status,d.dueAt,d.evidenceId,d.status,now,input.id,id,d.version),activityStatement(id,'task',`Action ${d.status.replace('_',' ')}: ${d.title}. Owner: ${d.owner||'unassigned'}.`,true)]);if(!results[0].meta.changes)throw stale();
 }
 if(input.action==='decision'){
  const existing=await db().prepare('SELECT incident_id AS incidentId,message FROM incident_activity WHERE id=?').bind(input.id).first<{incidentId:string;message:string}>();
  if(existing){if(existing.incidentId!==id||existing.message!==input.body)throw new ApiError(409,'This decision ID already has different content.');return getResponse(id);}
  try{await activityStatement(id,'decision',input.body,false,input.id).run();}catch(error){const raced=await db().prepare('SELECT incident_id AS incidentId,message FROM incident_activity WHERE id=?').bind(input.id).first<{incidentId:string;message:string}>();if(!raced)throw error;if(raced.incidentId!==id||raced.message!==input.body)throw new ApiError(409,'This decision ID already has different content.');}
 }
 if(input.action==='apply_runbook'){
  const runbook=(await getRunbooks()).find(r=>r.id===input.id);if(!runbook)throw new ApiError(404,'Runbook not found.');
  // One statement enforces capacity for the entire checklist. Stable versioned keys make retries idempotent.
  const steps=JSON.stringify(runbook.steps.map((title,index)=>({id:crypto.randomUUID(),title,key:`${runbook.id}:v${runbook.version}:${index}`,createdAt:new Date(Date.parse(now)+index).toISOString()})));
  const missingSql="SELECT count(*) AS n FROM json_each(?) step WHERE NOT EXISTS (SELECT 1 FROM action_items a WHERE a.incident_id=? AND a.runbook_key=json_extract(step.value,'$.key'))";
  const results=await db().batch([db().prepare(`INSERT OR IGNORE INTO action_items (id,incident_id,title,owner,priority,category,status,version,created_at,runbook_key) SELECT json_extract(value,'$.id'),?,json_extract(value,'$.title'),'','medium','mitigation','open',1,json_extract(value,'$.createdAt'),json_extract(value,'$.key') FROM json_each(?) WHERE (SELECT count(*) FROM action_items WHERE incident_id=?) + (${missingSql}) <= 200`).bind(id,steps,id,steps,id),activityStatement(id,'runbook',`Applied ${runbook.name} (version ${runbook.version}). Existing checklist actions were preserved.`,true)]);
  if(!results[0].meta.changes&&(await db().prepare(missingSql).bind(steps,id).first<{n:number}>())?.n)throw new ApiError(400,'This runbook would exceed the 200-action limit. No steps were added.');
 }
 return getResponse(id);
}
export async function saveReview(id:string,d:z.infer<typeof reviewInput>){
 const incident=await requireIncident(id);if(d.status==='final'&&incident.status!=='resolved')throw new ApiError(400,'Resolve the incident before finalizing its postmortem. Drafts can be saved at any time.');
 const now=new Date().toISOString();
 const results=await db().batch([db().prepare(`INSERT INTO postmortems (incident_id,summary,impact,cause,response,lessons,status,version,updated_at) SELECT ?,?,?,?,?,?,?,1,? WHERE (?=0 OR EXISTS (SELECT 1 FROM postmortems WHERE incident_id=?)) AND (?='draft' OR EXISTS (SELECT 1 FROM incidents WHERE id=? AND status='resolved')) ON CONFLICT(incident_id) DO UPDATE SET summary=excluded.summary,impact=excluded.impact,cause=excluded.cause,response=excluded.response,lessons=excluded.lessons,status=excluded.status,version=postmortems.version+1,updated_at=excluded.updated_at WHERE postmortems.version=?`).bind(id,d.summary,d.impact,d.cause,d.response,d.lessons,d.status,now,d.version,id,d.status,id,d.version),activityStatement(id,'review',d.status==='final'?'Postmortem finalized.':'Postmortem draft saved.',true)]);if(!results[0].meta.changes)throw stale();return getResponse(id);
}
export async function saveRunbook(d:z.infer<typeof runbookInput>,id=crypto.randomUUID(),version=0){
 await getRunbooks();
 const now=new Date().toISOString();
 const result=version===0?await db().prepare('INSERT INTO runbooks (id,name,description,steps,version,updated_at) SELECT ?,?,?,?,1,? WHERE (SELECT count(*) FROM runbooks)<100').bind(id,d.name,d.description,JSON.stringify(d.steps),now).run():await db().prepare('UPDATE runbooks SET name=?,description=?,steps=?,version=version+1,updated_at=? WHERE id=? AND version=?').bind(d.name,d.description,JSON.stringify(d.steps),now,id,version).run();
 if(!result.meta.changes){if(version===0)throw new ApiError(400,'The library supports up to 100 runbooks.');throw stale();}return getRunbooks();
}
