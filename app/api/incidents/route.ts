import {incidentInput,type Incident} from '@/lib/domain';
import {db,ensureSeed,insertIncident,ApiError} from '@/lib/store';
import {activityStatement} from '@/lib/response-store';
import {readJson,json,errorResponse} from '@/lib/http';
export async function POST(request:Request){try{const input=incidentInput.parse(await readJson(request));if(Date.parse(input.startedAt)>Date.now()+30000)throw new ApiError(400,'Incident onset cannot be in the future.');await ensureSeed();const incident:Incident={...input,id:`INC-${crypto.randomUUID().slice(0,8).toUpperCase()}`,status:'active',mode:'live',createdAt:new Date().toISOString(),version:1,resolvedAt:null};await db().batch([insertIncident(incident),activityStatement(incident.id,'created',`Incident declared: ${incident.title}. Severity: ${incident.severity}.`)]);return json(incident,201);}catch(e){return errorResponse(e);}}
