# OPSCORD API Design

## REST API Structure

The Core API Gateway provides a RESTful interface for the Next.js frontend and external integrations.

**Base Path:** `/api/v1`

### Conventions

- **Routing:** Kebab-case plural nouns (e.g., `/api/v1/alert-rules`).
- **Data Format:** JSON requests/responses using camelCase fields.
- **Envelope:** All responses follow a strict envelope format:
  ```json
  {
    "success": true,
    "data": { "id": "...", "title": "..." },
    "error": null,
    "metadata": { "totalCount": 1 }
  }
  ```

### Core Resources

- **`POST /api/v1/auth/login`** - Issue JWTs.
- **`GET /api/v1/projects/:id/incidents`** - Fetch paginated incidents for a project.
- **`GET /api/v1/projects/:id/events`** - Fetch raw logs and webhook events.
- **`POST /api/v1/projects/:id/alert-rules`** - Create a new alerting configuration.

## Metrics Ingestion Pipeline

The Ingestion Gateway exposes explicit endpoints for third-party services.

- **`POST /api/v1/ingest/github`**
- **`POST /api/v1/ingest/datadog`**
- **`POST /api/v1/ingest/sentry`**
- **`POST /api/v1/ingest/custom`**

### Payload Normalization

Each ingestion endpoint contains a specific parser that normalizes the proprietary payload into the standard `Event` schema:

```typescript
interface NormalizedEvent {
  projectId: string;
  source: string;
  type: string;
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
  message: string;
  payload: any; // The original raw JSON
  timestamp: Date;
}
```

## Alerting Engine

Upon normalizing and persisting an Event, the alerting engine evaluates it against the Project's `AlertRule` configurations.

- **Condition Matching:** Complex JSON rules (e.g., `{"source": "datadog", "severity": "CRITICAL"}`).
- **Action Dispatch:** Enqueues notification jobs to Redis for Slack/Discord/Email delivery.
