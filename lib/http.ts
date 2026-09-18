import {ZodError} from 'zod';
import {ApiError} from './store';
export async function readJson(request:Request){
 const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)throw new ApiError(403,'Cross-origin writes are not allowed.');
 if(!request.headers.get('content-type')?.includes('application/json'))throw new ApiError(415,'Send application/json.');
 if(Number(request.headers.get('content-length')??0)>32768)throw new ApiError(413,'Request is too large.');
 const reader=request.body?.getReader();if(!reader)throw new ApiError(400,'A JSON body is required.');
 let size=0;const chunks:Uint8Array[]=[];
 while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>32768){await reader.cancel();throw new ApiError(413,'Request is too large.');}chunks.push(value);}
 const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
 try{return JSON.parse(new TextDecoder().decode(bytes));}catch{throw new ApiError(400,'The request contains invalid JSON.');}
}
export const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export function errorResponse(error:unknown){
 if(error instanceof ZodError)return json({error:error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('; ')},400);
 if(error instanceof ApiError)return json({error:error.message},error.status);
 console.error('OpsCord request failed',error);return json({error:'The workspace could not be loaded or saved. Please retry.'},503);
}
