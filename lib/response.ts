import {z} from 'zod';
import type {Incident} from './domain';

const short = z.string().trim().max(120);
const prose = z.string().trim().max(5000);
const version = z.number().int().nonnegative();
const dueAt = z.string().datetime({offset:true}).transform(v=>new Date(v).toISOString()).nullable();
export const coordinationInput = z.object({owner:short,communicationsLead:short,environment:z.enum(['production','staging','development','unknown']),impact:prose,summary:prose,channelUrl:z.string().trim().max(500).refine(v=>!v||/^https:\/\//i.test(v),'Use an HTTPS URL').refine(v=>{try{return !v||!new URL(v).username&&!new URL(v).password}catch{return false}},'Use a valid URL without credentials'),nextUpdateAt:dueAt,version}).strict();
export const taskInput = z.object({title:z.string().trim().min(3).max(240),owner:short,priority:z.enum(['high','medium','low']),category:z.enum(['mitigation','follow_up']),dueAt,evidenceId:z.string().max(150).nullable()}).strict();
export const taskUpdateInput = taskInput.extend({status:z.enum(['open','in_progress','done']),version:z.number().int().positive()});
export const reviewInput = z.object({summary:prose,impact:prose,cause:prose,response:prose,lessons:prose,status:z.enum(['draft','final']),version}).strict().superRefine((v,ctx)=>{if(v.status==='final')for(const key of ['summary','impact','cause','response','lessons'] as const)if(v[key].length<10)ctx.addIssue({code:z.ZodIssueCode.custom,path:[key],message:'Add at least 10 characters before finalizing.'});});
export const runbookInput = z.object({name:z.string().trim().min(3).max(120),description:z.string().trim().max(1000),steps:z.array(z.string().trim().min(3).max(240)).min(1).max(20)}).strict();
export const responseAction = z.discriminatedUnion('action',[
 z.object({action:z.literal('coordination'),data:coordinationInput}).strict(),
 z.object({action:z.literal('create_task'),id:z.string().uuid(),data:taskInput}).strict(),
 z.object({action:z.literal('update_task'),id:z.string().uuid(),data:taskUpdateInput}).strict(),
 z.object({action:z.literal('apply_runbook'),id:z.string().max(100)}).strict(),
 z.object({action:z.literal('decision'),id:z.string().uuid(),body:z.string().trim().min(3).max(5000)}).strict(),
]);
export type Coordination = z.infer<typeof coordinationInput> & {incidentId:string;updatedAt:string|null};
export type ActionItem = z.infer<typeof taskUpdateInput> & {id:string;incidentId:string;createdAt:string;completedAt:string|null;runbookKey:string|null};
export type ActivityEntry = {id:string;incidentId:string;kind:string;message:string;createdAt:string};
export type Postmortem = z.infer<typeof reviewInput> & {incidentId:string;updatedAt:string|null};
export type Runbook = z.infer<typeof runbookInput> & {id:string;version:number;updatedAt:string};
export type ResponseData = {coordination:Coordination;tasks:ActionItem[];activity:ActivityEntry[];postmortem:Postmortem;runbooks:Runbook[];activityTruncated:boolean};
export type OperationsData = {tasks:ActionItem[];coordination:Coordination[];reviews:Postmortem[];taskCount:number;incidentCount:number;runbooks:Runbook[]};
export const blankCoordination=(incidentId:string):Coordination=>({incidentId,owner:'',communicationsLead:'',environment:'unknown',impact:'',summary:'',channelUrl:'',nextUpdateAt:null,version:0,updatedAt:null});
export const blankPostmortem=(incidentId:string):Postmortem=>({incidentId,summary:'',impact:'',cause:'',response:'',lessons:'',status:'draft',version:0,updatedAt:null});
export const starterRunbooks=[
 {id:'runbook-first-response',name:'First response',description:'Establish ownership, understand impact, and coordinate the next update.',steps:['Assign an incident commander and communications lead','Record customer impact and affected services','Collect recent deployments, alerts, and relevant logs','Choose a reversible mitigation and document the decision','Confirm recovery with service and customer signals','Record the resolution and assign follow-up work']},
 {id:'runbook-release-regression',name:'Investigate a release regression',description:'Compare a recent release with the evidence before deciding on a rollback.',steps:['Confirm release identity and deployment time','Compare failures before and after the change','Check dependency health and contradictory evidence','Agree on rollback safety and the person responsible','Execute the approved mitigation outside OpsCord','Verify recovery and document the outcome']},
 {id:'runbook-database-pressure',name:'Database connection pressure',description:'Inspect saturation, protect capacity, and verify recovery.',steps:['Check connection usage, latency, and error trends','Identify callers with elevated connection demand','Check recent configuration or traffic changes','Agree on a safe mitigation with the database owner','Verify recovery across the database and its callers']},
];
export const taskStatusLabel=(value:string)=>({open:'Open',in_progress:'In progress',done:'Done'}[value]??value);
export const formatDuration=(ms:number)=>{const mins=Math.max(0,Math.round(ms/60000));return mins<60?`${mins}m`:mins<1440?`${Math.floor(mins/60)}h ${mins%60}m`:`${Math.floor(mins/1440)}d ${Math.floor(mins%1440/60)}h`;};
export function incidentMetrics(incidents:Incident[],tasks:ActionItem[],now=Date.now()){
 const live=incidents.filter(i=>i.mode==='live');const ids=new Set(live.map(i=>i.id));
 const resolved=live.filter(i=>i.status==='resolved'&&i.resolvedAt&&Date.parse(i.resolvedAt)>=Date.parse(i.startedAt));
 const durations=resolved.map(i=>Date.parse(i.resolvedAt!)-Date.parse(i.startedAt));
 return {total:live.length,active:live.filter(i=>i.status!=='resolved').length,resolved:resolved.length,meanResolutionMs:durations.length?durations.reduce((a,b)=>a+b,0)/durations.length:null,overdue:tasks.filter(t=>ids.has(t.incidentId)&&t.status!=='done'&&t.dueAt&&Date.parse(t.dueAt)<now).length};
}
