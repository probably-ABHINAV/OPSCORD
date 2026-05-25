import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

import waitlist from './routes/waitlist';

const app = new Hono();

// middleware
app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use('*', logger());

// base route
app.get('/', (c) => {
  return c.json({ ok: true });
});

// routes
app.route('/api/v1/waitlist', waitlist);

// IMPORTANT: actually start server
serve({
  fetch: app.fetch,
  port: 4000,
});

console.log('🚀 API running on http://localhost:4000');
export { app };
