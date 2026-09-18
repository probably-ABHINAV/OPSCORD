import {env} from 'cloudflare:workers';
import {demoIncident,demoEvents,demoAsOf,type Incident,type EvidenceEvent,type EventInput,type Note} from './domain';
import {rankCandidates} from './scoring';
export function db(){if(!env.DB)throw new Error('The workspace database is unavailable.');return env.DB;}
export const incidentSelect='SELECT id,title,service,severity,status,started_at AS startedAt,created_at AS createdAt,mode,version,resolved_at AS resolvedAt,resolution_summary AS resolutionSummary FROM incidents';
const eventSelect='SELECT id,incident_id AS incidentId,external_id AS externalId,source,type,service,severity,title,occurred_at AS occurredAt,received_at AS receivedAt,metadata FROM events';
export function canonical(event:EventInput){return JSON.stringify(Object.fromEntries(Object.entries({...event,metadata:Object.fromEntries(Object.entries(event.metadata).sort(([a],[b])=>a.localeCompare(b)))}).sort(([a],[b])=>a.localeCompare(b))));}
export async function digest(event:EventInput){const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(canonical(event)));return [...new Uint8Array(bytes)].map(v=>v.toString(16).padStart(2,'0')).join('');}
function eventStatement(e:EvidenceEvent,hash:string){return db().prepare('INSERT INTO events (id,incident_id,external_id,source,type,service,severity,title,occurred_at,received_at,metadata,payload_hash) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').bind(e.id,e.incidentId,e.externalId,e.source,e.type,e.service,e.severity,e.title,e.occurredAt,e.receivedAt,JSON.stringify(e.metadata),hash);}
export function insertIncident(i:Incident){return db().prepare('INSERT INTO incidents (id,title,service,severity,status,started_at,created_at,mode,version,resolved_at) VALUES (?,?,?,?,?,?,?,?,?,?)').bind(i.id,i.title,i.service,i.severity,i.status,i.startedAt,i.createdAt,i.mode,i.version,i.resolvedAt);}
export async function ensureSeed(){
 if(await db().prepare('SELECT id FROM seed_runs WHERE id=?').bind('opscord-demo-v1').first())return;
 const statements=[db().prepare('INSERT INTO seed_runs (id) VALUES (?)').bind('opscord-demo-v1'),insertIncident(demoIncident)];
 for(const e of demoEvents){const {id,incidentId,receivedAt,...input}=e;statements.push(eventStatement(e,await digest(input)));}
 try{await db().batch(statements);}catch(error){if(!await db().prepare('SELECT id FROM seed_runs WHERE id=?').bind('opscord-demo-v1').first())throw error;}
}
export async function getIncident(id:string){return db().prepare(`${incidentSelect} WHERE id=?`).bind(id).first<Incident>();}
export async function workspace(id?:string){
 await ensureSeed();
 const incidents=(await db().prepare(`${incidentSelect} ORDER BY created_at DESC LIMIT 100`).all<Incident>()).results;
 const incident=id?await getIncident(id):incidents.find(i=>i.mode==='demo')??incidents[0];
 if(!incident)throw new ApiError(404,'Incident not found.');
 const rows=(await db().prepare(`${eventSelect} WHERE incident_id=? ORDER BY occurred_at,id LIMIT 2000`).bind(incident.id).all<Omit<EvidenceEvent,'metadata'>&{metadata:string}>()).results;
 const events=rows.map(e=>({...e,metadata:JSON.parse(e.metadata)})) as EvidenceEvent[];
 const notes=(await db().prepare('SELECT id,incident_id AS incidentId,body,created_at AS createdAt FROM notes WHERE incident_id=? ORDER BY created_at DESC LIMIT 100').bind(incident.id).all<Note>()).results;
 const asOf=incident.mode==='demo'?demoAsOf:new Date().toISOString();
 return {incidents,incident,events,notes,asOf,candidates:rankCandidates(incident,events,asOf)};
}
export class ApiError extends Error{constructor(public status:number,message:string){super(message)}}
export async function ingest(incidentId:string,input:EventInput){
 await ensureSeed(); const incident=await getIncident(incidentId);if(!incident)throw new ApiError(404,'Incident not found.');
 const t=Date.parse(input.occurredAt),onset=Date.parse(incident.startedAt),asOf=Date.parse(incident.mode==='demo'?demoAsOf:new Date().toISOString());
 if(t<onset-86400000||t>asOf+30000)throw new ApiError(400,'Event time must be within 24 hours before onset and no later than the investigation clock. The demo clock is 17 May 2025, 11:45 IST.');
 const hash=await digest(input),lookup=()=>db().prepare('SELECT id,payload_hash AS payloadHash FROM events WHERE incident_id=? AND source=? AND external_id=?').bind(incidentId,input.source,input.externalId).first<{id:string;payloadHash:string}>();
 const existing=await lookup();if(existing){if(existing.payloadHash!==hash)throw new ApiError(409,'That source and external ID already identify different evidence. Use a new external ID.');return {id:existing.id,duplicate:true};}
 const event:EvidenceEvent={...input,id:crypto.randomUUID(),incidentId,receivedAt:new Date().toISOString()};
 try{await eventStatement(event,hash).run();}catch(error){const raced=await lookup();if(!raced)throw error;if(raced.payloadHash!==hash)throw new ApiError(409,'External ID conflicts with an existing event.');return {id:raced.id,duplicate:true};}
 return {id:event.id,duplicate:false};
}
