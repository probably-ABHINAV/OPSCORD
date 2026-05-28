import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import prisma from '@opscord/db';

export const app = new Hono().basePath('/api/v1');

// Middleware
app.use('*', logger());
app.use('*', cors());

// Healthcheck
app.get('/health', async (c) => {
  try {
    // Test DB connection
    await prisma.$queryRaw`SELECT 1`;
    return c.json({ status: 'ok', db: 'connected' });
  } catch (error) {
    return c.json({ status: 'error', db: 'disconnected' }, 500);
  }
});

// Example route
app.get('/projects', async (c) => {
  const projects = await prisma.project.findMany();
  return c.json({
    success: true,
    data: projects,
  });
});
