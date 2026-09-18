import {dependencies, type Edge, type EvidenceEvent, type Incident, type Candidate} from './domain';
// Edges are caller -> dependency. Walk incoming edges to propagate an impact.
export function impactPath(candidate:string,affected:string,edges:Edge[]=dependencies):string[]|null{
 const queue=[[candidate]],seen=new Set([candidate]);
 while(queue.length){const path=queue.shift()!; const node=path[path.length-1];if(node===affected)return path;
 for(const e of edges)if(e.to===node&&!seen.has(e.from)){seen.add(e.from);queue.push([...path,e.from]);}}
 return null;
}
const hypotheses:Record<string,{title:string;nextStep:string}>={
 deployment:{title:'Recent service deployment',nextStep:'Compare the deployed release with the previous version. Check retry limits and reproduce the failure before considering rollback.'},
 configuration:{title:'Configuration change',nextStep:'Compare configuration revisions and verify which workloads received the changed values.'},
 resource_pressure:{title:'Resource pressure on node',nextStep:'Inspect throttling, pod limits, and node scheduling. Compare unaffected nodes.'},
 database_saturation:{title:'Database connection saturation',nextStep:'Inspect pool utilization, long-running queries, and connection timeout logs.'},
 temperature_anomaly:{title:'Edge device temperature anomaly',nextStep:'Verify the device-to-service dependency and check for thermal throttling. Temperature overlap alone is insufficient.'},
};
export function rankCandidates(incident:Incident,events:EvidenceEvent[],asOf:string,edges:Edge[]=dependencies):Candidate[]{
 const onset=Date.parse(incident.startedAt),end=Date.parse(asOf);
 const scoped=events.filter(e=>e.incidentId===incident.id&&Date.parse(e.occurredAt)<=end&&Date.parse(e.occurredAt)>=onset-3600000);
 // A provider delivery is one observation, even if the caller repeats it.
 const unique=[...new Map(scoped.map(e=>[`${e.source}:${e.externalId}`,e])).values()].sort((a,b)=>a.id.localeCompare(b.id));
 return unique.filter(e=>hypotheses[e.type]&&Date.parse(e.occurredAt)<=onset+30000).map(seed=>{
  const path=impactPath(seed.service,incident.service,edges), age=Math.max(0,(onset-Date.parse(seed.occurredAt))/60000);
  const supporting=new Map<string,EvidenceEvent>(),contradicting:EvidenceEvent[]=[];
  const isRelease=seed.type==='deployment'||seed.type==='configuration';
  for(const e of unique){
   if(e.id===seed.id||Date.parse(e.occurredAt)<Date.parse(seed.occurredAt)||e.service!==seed.service)continue;
   const release=seed.metadata.releaseId;
   if(isRelease&&e.type==='release_absent'&&release&&e.metadata.releaseId===release){contradicting.push(e);continue;}
   if(isRelease&&release&&e.metadata.releaseId&&e.metadata.releaseId!==release)continue;
   const family=e.type==='pod_restart'?'runtime':e.type==='log_error'?'logs':['error_spike','latency'].includes(e.type)?'metrics':isRelease&&e.type==='rollback_recovery'&&release&&e.metadata.releaseId===release?'recovery':null;
   if(family&&!supporting.has(family))supporting.set(family,e);
  }
  const topology=path?35/path.length:0,timing=25*Math.max(0,1-age/60),support=Math.min(supporting.size/3,1)*40,penalty=contradicting.length?20:0;
  const cap=!path||!supporting.size?39:null;
  const score=Math.round(Math.min(cap??100,Math.max(0,topology+timing+support-penalty)));
  return {id:seed.id,title:hypotheses[seed.type].title,service:seed.service,seedId:seed.id,score,path,breakdown:{topology,timing,support,penalty,cap},supportIds:[...supporting.values()].map(e=>e.id),contradictionIds:contradicting.slice(0,1).map(e=>e.id),explanation:`${Math.round(age)} minutes before incident onset. ${path?`${path.length-1} dependency hops to ${incident.service}.`:'No known dependency path to the affected service.'} ${supporting.size} independent evidence families support this hypothesis.`,nextStep:hypotheses[seed.type].nextStep};
 }).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
}
