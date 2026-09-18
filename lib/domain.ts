import {z} from 'zod';
export const sources = ['github','cicd','kubernetes','monitoring','iot','slack'] as const;
export const eventTypes = ['commit','deployment','configuration','resource_pressure','database_saturation','temperature_anomaly','pod_restart','error_spike','latency','log_error','discussion','rollback_recovery','release_absent'] as const;
export const serviceCatalog = [
 {id:'client-apps',name:'Client apps',kind:'service',team:'Experience',status:'healthy'},
 {id:'api-gateway',name:'API gateway',kind:'service',team:'Platform',status:'healthy'},
 {id:'auth-service',name:'Auth service',kind:'service',team:'Identity',status:'healthy'},
 {id:'payment-api',name:'Payment API',kind:'service',team:'Payments',status:'failing'},
 {id:'order-service',name:'Order service',kind:'service',team:'Commerce',status:'degraded'},
 {id:'database',name:'Database',kind:'service',team:'Data',status:'healthy'},
 {id:'redis-cache',name:'Redis cache',kind:'service',team:'Platform',status:'healthy'},
 {id:'edge-telemetry',name:'Edge service',kind:'service',team:'Edge',status:'degraded'},
 {id:'worker-node',name:'Worker node 03',kind:'infrastructure',team:'Platform',status:'degraded'},
 {id:'edge-device',name:'Edge device · Rack 3',kind:'device',team:'Edge',status:'degraded'},
] as const;
export const dependencies = [
 {from:'client-apps',to:'api-gateway'},{from:'api-gateway',to:'auth-service'},
 {from:'api-gateway',to:'payment-api'},{from:'api-gateway',to:'edge-telemetry'},
 {from:'payment-api',to:'order-service'},{from:'payment-api',to:'database'},
 {from:'payment-api',to:'worker-node'},{from:'order-service',to:'database'},
 {from:'order-service',to:'redis-cache'},{from:'edge-telemetry',to:'redis-cache'},
 {from:'edge-telemetry',to:'edge-device'},
];
export type Edge = {from:string;to:string};
export const serviceIds = serviceCatalog.map(s=>s.id) as [string,...string[]];
const iso = z.string().datetime({offset:true}).transform(v=>new Date(v).toISOString());
export const eventInput = z.object({externalId:z.string().trim().min(1).max(120),source:z.enum(sources),type:z.enum(eventTypes),service:z.enum(serviceIds),severity:z.enum(['info','warning','critical']),title:z.string().trim().min(3).max(180),occurredAt:iso,metadata:z.record(z.union([z.string().max(2000),z.number().finite(),z.boolean()])).refine(v=>Object.keys(v).length<=20,'Maximum 20 metadata fields').default({})}).strict();
export type EventInput = z.infer<typeof eventInput>;
export type EvidenceEvent = EventInput & {id:string;incidentId:string;receivedAt:string};
export type Incident = {id:string;title:string;service:string;severity:string;status:'active'|'investigating'|'resolved';startedAt:string;createdAt:string;mode:'demo'|'live';version:number;resolvedAt:string|null;resolutionSummary?:string};
export type Note = {id:string;incidentId:string;body:string;createdAt:string};
export const incidentInput = z.object({title:z.string().trim().min(3).max(180),service:z.enum(serviceIds),severity:z.enum(['warning','critical']),startedAt:iso}).strict();
export const demoAsOf='2025-05-17T06:15:00.000Z';
export const demoIncident:Incident={id:'INC-2025-0517',title:'Payment API failure',service:'payment-api',severity:'critical',status:'active',startedAt:'2025-05-17T06:01:00.000Z',createdAt:'2025-05-17T06:01:00.000Z',mode:'demo',version:1,resolvedAt:null};
const sample = (id:string,source:EventInput['source'],type:EventInput['type'],service:string,time:string,title:string,severity:EventInput['severity']='warning',metadata:EventInput['metadata']={}):EvidenceEvent=>({id:`demo:${id}`,externalId:id,incidentId:demoIncident.id,source,type,service,occurredAt:`2025-05-17T${time}:00.000Z`,receivedAt:`2025-05-17T${time}:02.000Z`,title,severity,metadata});
export const demoEvents:EvidenceEvent[]=[
 sample('commit-b7f3c2a','github','commit','payment-api','05:34','Payment retry logic updated','info',{releaseId:'b7f3c2a',author:'payments-team'}),
 sample('build-15234','cicd','deployment','payment-api','05:42','Payment API deployed to production','info',{releaseId:'b7f3c2a',build:'15234'}),
 sample('edge-temp','iot','temperature_anomaly','edge-device','05:49','Edge device exceeded temperature threshold','warning',{value:98.6,threshold:75,unit:'°C',sensorId:'TEMP-1847'}),
 sample('cpu-node','kubernetes','resource_pressure','worker-node','05:52','Worker node CPU reached 94%','warning',{value:94,threshold:85}),
 sample('db-pool','monitoring','database_saturation','database','05:54','Connection pool saturation detected','warning',{value:92,threshold:80}),
 sample('pod-restart','kubernetes','pod_restart','payment-api','05:55','Payment pod entered CrashLoopBackOff','critical',{releaseId:'b7f3c2a',pod:'payment-api-7c8d'}),
 sample('db-log','kubernetes','log_error','database','05:56','Connection acquisition timed out','warning',{message:'Timeout acquiring connection after 3000ms'}),
 sample('payment-log','monitoring','log_error','payment-api','05:57','Retry budget exhausted on payment requests','critical',{releaseId:'b7f3c2a',message:'PaymentRetryError: maximum retry budget exceeded'}),
 sample('order-latency','monitoring','latency','order-service','05:58','Order service p95 latency elevated','warning',{value:840,unit:'ms'}),
 sample('edge-latency','monitoring','latency','edge-telemetry','05:59','Edge telemetry processing delayed','warning',{value:2300,unit:'ms'}),
 sample('payment-5xx','monitoring','error_spike','payment-api','06:00','Payment errors breached 5% threshold','critical',{value:18.7,threshold:5,impactedUsers:2842}),
 sample('discussion','slack','discussion','payment-api','06:02','Engineers linked retry failures to the latest release','info',{releaseId:'b7f3c2a',message:'Inspect retry configuration and compare the previous release before considering rollback.'}),
];
export const timeLabel=(iso:string)=>new Date(iso).toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'});
export const sourceLabel=(value:string)=>({github:'GitHub',cicd:'CI/CD',kubernetes:'Kubernetes',monitoring:'Monitoring',iot:'IoT platform',slack:'Slack'}[value]??value);
export type Candidate={id:string;title:string;service:string;score:number;seedId:string;path:string[]|null;breakdown:{topology:number;timing:number;support:number;penalty:number;cap:number|null};supportIds:string[];contradictionIds:string[];explanation:string;nextStep:string};
export type Workspace={incidents:Incident[];incident:Incident;events:EvidenceEvent[];notes:Note[];candidates:Candidate[];asOf:string};
