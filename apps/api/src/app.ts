import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import waitlist from './routes/waitlist';

const app = new Hono().basePath('/api/v1');

app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use('*', logger());

// routes
app.route('/waitlist', waitlist);

// test route
app.get('/', (c) => {
  return c.json({ ok: true });
});

export default app;
