import {build} from 'esbuild';
import {mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
await mkdir('work',{recursive:true});
await build({entryPoints:['tests/core.test.ts'],outfile:'work/core.test.mjs',platform:'node',format:'esm',bundle:true,packages:'external'});
await import(pathToFileURL(path.resolve('work/core.test.mjs')));
