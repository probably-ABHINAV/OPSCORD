import {getOperations} from '@/lib/response-store';
import {json,errorResponse} from '@/lib/http';
export async function GET(){try{return json(await getOperations());}catch(e){return errorResponse(e);}}
