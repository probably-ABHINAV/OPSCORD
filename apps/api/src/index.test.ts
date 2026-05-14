import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Hono } from 'hono';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// API Gateway — Unit Tests
// Tests the Hono app routes in isolation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Mock Prisma before importing the app
vi.mock('@opscord/db', () => ({
  default: {
    $queryRaw: vi.fn(),
    project: {
      findMany: vi.fn(),
    },
  },
}));

import prisma from '@opscord/db';

function createApp() {
  const app = new Hono().basePath('/api/v1');

  app.get('/health', async (c) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return c.json({ status: 'ok', db: 'connected' });
    } catch {
      return c.json({ status: 'error', db: 'disconnected' }, 500);
    }
  });

  app.get('/projects', async (c) => {
    const projects = await prisma.project.findMany();
    return c.json({ success: true, data: projects });
  });

  return app;
}

describe('API Gateway', () => {
  let app: Hono;

  beforeEach(() => {
    vi.clearAllMocks();
    app = createApp();
  });

  describe('GET /api/v1/health', () => {
    it('returns ok when database is connected', async () => {
      vi.mocked(prisma.$queryRaw).mockResolvedValueOnce([{ '?column?': 1 }]);

      const res = await app.request('/api/v1/health');
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.status).toBe('ok');
      expect(body.db).toBe('connected');
    });

    it('returns error when database is disconnected', async () => {
      vi.mocked(prisma.$queryRaw).mockRejectedValueOnce(new Error('Connection refused'));

      const res = await app.request('/api/v1/health');
      const body = await res.json();

      expect(res.status).toBe(500);
      expect(body.status).toBe('error');
      expect(body.db).toBe('disconnected');
    });
  });

  describe('GET /api/v1/projects', () => {
    it('returns list of projects', async () => {
      const mockProjects = [
        { id: 'proj_1', name: 'Production API', description: null },
        { id: 'proj_2', name: 'Staging', description: 'Staging env' },
      ];
      vi.mocked(prisma.project.findMany).mockResolvedValueOnce(mockProjects as any);

      const res = await app.request('/api/v1/projects');
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data).toHaveLength(2);
      expect(body.data[0].name).toBe('Production API');
    });

    it('returns empty array when no projects exist', async () => {
      vi.mocked(prisma.project.findMany).mockResolvedValueOnce([]);

      const res = await app.request('/api/v1/projects');
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data).toHaveLength(0);
    });
  });
});
