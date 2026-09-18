import {z} from 'zod';
import {getRunbooks,saveRunbook} from '@/lib/response-store';
import {runbookInput} from '@/lib/response';
import {readJson,json,errorResponse} from '@/lib/http';
export async function GET(){try{return json(await getRunbooks());}catch(e){return errorResponse(e);}}
export async function POST(request:Request){try{return json(await saveRunbook(runbookInput.parse(await readJson(request))),201);}catch(e){return errorResponse(e);}}
export async function PATCH(request:Request){try{const d=z.object({id:z.string().min(1).max(100),version:z.number().int().positive(),data:runbookInput}).strict().parse(await readJson(request));return json(await saveRunbook(d.data,d.id,d.version));}catch(e){return errorResponse(e);}}
