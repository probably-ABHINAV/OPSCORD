import {workspace} from '@/lib/store';
import {json,errorResponse} from '@/lib/http';
export async function GET(request:Request){try{return json(await workspace(new URL(request.url).searchParams.get('incident')??undefined));}catch(e){return errorResponse(e);}}
