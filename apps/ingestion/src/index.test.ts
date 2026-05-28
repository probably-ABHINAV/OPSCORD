import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Hono } from 'hono';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Ingestion Service — Unit Tests
// Tests webhook handlers in isolation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

vi.mock('@opscord/db', () => ({
  default: {},
}));

import { app } from './app';

describe('Ingestion Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/v1/ingest/health', () => {
    it('returns healthy status', async () => {
      const res = await app.request('/api/v1/ingest/health');
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.status).toBe('ok');
      expect(body.service).toBe('ingestion');
    });
  });

  describe('POST /api/v1/ingest/:source', () => {
    it('accepts GitHub webhook payload', async () => {
      const payload = {
        action: 'opened',
        pull_request: { id: 123, title: 'feat: new feature' },
      };

      const res = await app.request('/api/v1/ingest/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await res.json();

      expect(res.status).toBe(202);
      expect(body.success).toBe(true);
      expect(body.message).toContain('queued');
    });

    it('accepts Sentry webhook payload', async () => {
      const payload = {
        event: { event_id: 'abc123', level: 'error', message: 'NullPointerException' },
      };

      const res = await app.request('/api/v1/ingest/sentry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(res.status).toBe(202);
    });

    it('accepts Datadog webhook payload', async () => {
      const payload = {
        alert_type: 'error',
        title: 'CPU usage above 90%',
        tags: ['env:production'],
      };

      const res = await app.request('/api/v1/ingest/datadog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      expect(res.status).toBe(202);
    });

    it('rejects empty payloads', async () => {
      const res = await app.request('/api/v1/ingest/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      expect(res.status).toBe(400);
    });
  });
});
