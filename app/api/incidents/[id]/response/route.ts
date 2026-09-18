import {getResponse,updateResponse,saveReview} from '@/lib/response-store';
import {responseAction,reviewInput} from '@/lib/response';
import {readJson,json,errorResponse} from '@/lib/http';
type Context={params:Promise<{id:string}>};
export async function GET(_request:Request,{params}:Context){try{return json(await getResponse((await params).id));}catch(e){return errorResponse(e);}}
export async function POST(request:Request,{params}:Context){try{return json(await updateResponse((await params).id,responseAction.parse(await readJson(request))));}catch(e){return errorResponse(e);}}
export async function PUT(request:Request,{params}:Context){try{return json(await saveReview((await params).id,reviewInput.parse(await readJson(request))));}catch(e){return errorResponse(e);}}
