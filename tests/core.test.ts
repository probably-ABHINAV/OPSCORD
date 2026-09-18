import {test} from 'node:test';
import assert from 'node:assert/strict';
import {rankCandidates,impactPath} from '../lib/scoring';
import {demoIncident,demoEvents,demoAsOf,eventInput,type EvidenceEvent} from '../lib/domain';
test('directed impact traversal follows reverse dependency edges and survives cycles',()=>{
 const graph=[{from:'payment',to:'db'},{from:'db',to:'cache'},{from:'cache',to:'db'}];
 assert.deepEqual(impactPath('db','payment',graph),['db','payment']);assert.equal(impactPath('payment','db',graph),null);assert.deepEqual(impactPath('cache','payment',graph),['cache','db','payment']);
});
test('ranking is deterministic and every candidate exposes its calculation',()=>{
 const ranked=rankCandidates(demoIncident,demoEvents,demoAsOf);assert.equal(ranked[0].seedId,'demo:build-15234');assert.equal(ranked[0].score,92);
 assert.deepEqual(rankCandidates(demoIncident,[...demoEvents].reverse(),demoAsOf),ranked);
 for(const c of ranked){const b=c.breakdown;assert.equal(c.score,Math.round(Math.min(b.cap??100,Math.max(0,b.topology+b.timing+b.support-b.penalty))));}
});
test('post-onset changes and evidence from another incident never become causes',()=>{
 const seed=demoEvents[1];const events=[{...seed,id:'future',externalId:'future',occurredAt:'2025-05-17T06:10:00.000Z'},{...seed,id:'other',externalId:'other',incidentId:'different'}];
 assert.deepEqual(rankCandidates(demoIncident,events,demoAsOf),[]);
});
test('duplicate and repeated alerts do not inflate independent evidence',()=>{
 const base=rankCandidates(demoIncident,demoEvents,demoAsOf);
 const spam=Array.from({length:100},(_,i)=>({...demoEvents[10],id:`spam${i}`,externalId:`spam${i}`}));
 assert.deepEqual(rankCandidates(demoIncident,[...demoEvents,...spam],demoAsOf).map(c=>c.score),base.map(c=>c.score));
});
test('disconnected physical telemetry cannot imply service causality',()=>{
 const c=rankCandidates(demoIncident,demoEvents,demoAsOf).find(c=>c.seedId==='demo:edge-temp')!;
 assert.equal(c.path,null);assert.equal(c.breakdown.cap,39);assert.ok(c.score<40);
});
test('release-specific contradiction penalizes a deployment and mismatched release does not',()=>{
 const base=rankCandidates(demoIncident,demoEvents,demoAsOf)[0];
 const evidence:EvidenceEvent={...demoEvents[5],id:'contradiction',externalId:'contradiction',type:'release_absent',occurredAt:'2025-05-17T06:03:00.000Z',metadata:{releaseId:'b7f3c2a'}};
 const c=rankCandidates(demoIncident,[...demoEvents,evidence],demoAsOf).find(c=>c.id===base.id)!;assert.equal(c.score,base.score-20);assert.deepEqual(c.contradictionIds,['contradiction']);
 const other={...evidence,metadata:{releaseId:'different'}};assert.equal(rankCandidates(demoIncident,[...demoEvents,other],demoAsOf)[0].score,base.score);
});
test('event validation normalizes timezone and rejects missing timezone, nonfinite metadata, unknown entity and extra fields',()=>{
 const {id,incidentId,receivedAt,...input}=demoEvents[0];
 assert.equal(eventInput.parse({...input,occurredAt:'2025-05-17T11:04:00+05:30'}).occurredAt,input.occurredAt);
 for(const invalid of [{...input,occurredAt:'2025-05-17T11:04:00'},{...input,metadata:{value:Infinity}},{...input,service:'unknown'},{...input,score:100}])assert.equal(eventInput.safeParse(invalid).success,false);
});
