import {eventInput} from '@/lib/domain';
import {ingest} from '@/lib/store';
import {readJson,json,errorResponse} from '@/lib/http';
export async function POST(request:Request,{params}:{params:Promise<{id:string}>}){try{const {id}=await params;const result=await ingest(id,eventInput.parse(await readJson(request)));return json(result,result.duplicate?200:201);}catch(e){return errorResponse(e);}}
