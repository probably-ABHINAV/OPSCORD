import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import prisma from '@opscord/db';

const app = new Hono().basePath('/api/v1/ingest');

// Middleware
app.use('*', logger());

// Healthcheck
app.get('/health', (c) => c.json({ status: 'ok', service: 'ingestion' }));

// Webhook Catch-All
app.post('/:source', async (c) => {
  const source = c.req.param('source');
  const payload = await c.req.json();

  // TODO: Validate API Key from Headers
  // TODO: Push to Redis Queue instead of immediate processing

  console.log(`[Ingestion] Received webhook from ${source}`);

  return c.json(
    {
      success: true,
      message: 'Webhook received and queued for processing.',
    },
    202
  );
});

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 4001;

console.log(`⚡ Ingestion Service is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
