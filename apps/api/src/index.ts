import { serve } from '@hono/node-server';
import { app } from './app';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

console.log(`🚀 API Gateway is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
