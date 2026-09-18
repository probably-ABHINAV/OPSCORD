# OpsCord

An evidence-based incident investigation application built from the OpsCord dashboard and system-architecture references.

## Implemented

- Responsive dashboard with a clearly labeled Payment API sample incident.
- Persistent incidents, normalized events, and investigation notes in Cloudflare D1 (SQLite).
- Validated JSON event ingestion with provider delivery deduplication and conflict detection.
- Cross-source evidence search, source filtering, timestamp filtering, and event inspection.
- Directed service dependency traversal and deterministic, explainable candidate ranking.
- Incident lifecycle: active → investigating → resolved, with explicit reopening and optimistic concurrency.
- Score breakdowns, supporting and contradicting evidence, investigation recommendations, Markdown report export.
- Service inventory, IoT sample, integration schema guide, and architecture view.
- Private Sites deployment. The hosting access policy gates the whole application, including APIs.

This is a private manual incident-response MVP. It does not yet connect real GitHub, CI/CD, Kubernetes, monitoring, Slack, or MQTT accounts. Ingestion accepts normalized events through the private UI/API. It does not train ML models or call an LLM. See [the prioritized roadmap](ROADMAP.md) for team-launch requirements and additional features.

## Response workflow

- Searchable incident queue with status/severity filters and direct links to an investigation.
- Saved commander, communications lead, environment, impact, situation brief, response-channel URL, and next-update time.
- Mitigation and follow-up actions with owners, priorities, deadlines, evidence links, completion, and reopening.
- Cross-incident action queue, overdue filters, three starter runbooks, editable custom runbooks, and idempotent checklist application.
- Atomic activity records for declarations, lifecycle changes, notes, briefs, tasks, runbooks, decisions, and reviews.
- Required resolution summaries, draft/final postmortems, recorded-fact prefilling, completeness checks, and review reopening when an incident reopens.
- Markdown response reports, JSON incident export, copyable handoffs, and manual-incident metrics that exclude sample scenarios.
- Optimistic concurrency and recoverable edit conflicts. Brief/review drafts are temporarily kept in this browser tab; saved records remain in D1. Assignments are free text and do not create membership or notifications.

## Stack

TypeScript, React, Vinext (Next-compatible App Router on Vite), Cloudflare Workers, D1, Drizzle migrations, Zod, Radix/Shadcn primitives, and Lucide icons. This repository was empty; source from the prior ChatGPT prototype was not available. The implementation uses a unified TypeScript backend instead of that conversation's separate FastAPI server.

## Run locally

Node 22.13+ and npm are required.

```powershell
npm run install:ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_flowery_sally_floyd.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_fantastic_vector.sql
npm run dev
```

Apply the initial migration only once per local database. Future migrations must be applied in order. The dev server prints its loopback URL (normally http://localhost:5173). Do not expose the development server to the network: private access is enforced by Sites in the hosted environment.

If a Windows shell shim fails to locate npm, invoke `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev` (substitute the installed npm location).

## Verify

```powershell
npm test
node node_modules/typescript/bin/tsc --noEmit
npm run build
npm run test:api
node scripts/smoke-response.mjs
```

API smoke tests require the local development server and database. They create one clearly named local verification incident, then resolve it. They refuse non-loopback hosts. Production data is not affected.

## Event API

`POST /api/incidents/{incidentId}/events` with `Content-Type: application/json`:

```json
{
  "externalId": "provider-event-001",
  "source": "cicd",
  "type": "deployment",
  "service": "payment-api",
  "severity": "info",
  "title": "Payment API release deployed",
  "occurredAt": "2025-05-17T05:42:00Z",
  "metadata": { "releaseId": "b7f3c2a" }
}
```

A matching `(incident, source, externalId)` and canonical payload returns the existing event. Reusing that key with different content returns 409. Server receipt time is stored separately from occurrence time. UTC and timezone-offset timestamps are normalized to UTC. Invalid schemas, unknown entities, oversized bodies, out-of-window events, and cross-origin writes are rejected. Source metadata is displayed as text, never interpreted as instructions or executable HTML.

Other endpoints:

- `GET /api/workspace?incident=INC-2025-0517`
- `POST /api/incidents`: title, service, severity, startedAt.
- `PATCH /api/incidents/{id}`: status, expected version, and a resolution summary when resolving.
- `POST /api/incidents/{id}/notes`: body.
- `GET /api/incidents/{id}/response`: coordination, actions, activity, postmortem, and runbooks.
- `POST /api/incidents/{id}/response`: validated coordination, task, decision, or runbook-application action.
- `PUT /api/incidents/{id}/response`: versioned draft or final postmortem.
- `GET /api/operations`: loaded cross-incident actions, coordination, review status, and record counts.
- `GET/POST/PATCH /api/runbooks`: library retrieval, creation, and versioned editing.

There are no external webhook credentials or adapters yet. The private deployment uses platform authentication; before supporting public/multi-user deployments, add tenant-scoped authorization, authenticated webhook ingress, rate limiting, and audit logging.

## Ranking model

Edges point from caller to dependency. BFS walks incoming edges from a candidate to the affected service, with cycle detection. Candidate seeds are deployments, configuration changes, resource pressure, database saturation, and temperature anomalies. Alerts are treated as evidence rather than automatically promoted to causes.

Candidates must occur within 60 minutes before onset, with a 30-second clock-skew allowance. Supporting observations must follow their seed, belong to the same entity and incident, and be available by the investigation clock. Explicit conflicting release IDs are excluded. Runtime, logs, metrics, and release-specific recovery each contribute at most one observation per family, limiting alert-flood inflation.

```
score = round(clamp(35 / (1 + dependency hops)
                  + 25 * max(0, 1 - ageMinutes / 60)
                  + 40 * min(independentFamilies / 3, 1)
                  - contradictionPenalty, 0, cap))
```

Topology contributes zero when disconnected. Disconnected candidates and candidates without independent corroboration have a cap of 39. A release-specific `release_absent` observation deducts 20. Scores are heuristic evidence rankings, not calibrated probabilities or proof of causality. Service criticality, change frequency, historical failure likelihood, learned causal inference, and confidence calibration are not modeled yet.

The sample sensor is attached to an edge device; the graph does not invent a path to Payment API. Its low-ranked hypothesis explicitly discloses that missing path. The sample temperature chart is illustrative historical telemetry. Sample service health is a scenario snapshot; new manual investigations show health as unverified.

## Persistence and time

One atomic seed batch inserts the namespaced sample events and a seed-version marker. Reloads and deployments never reset incident edits. The sample investigation clock is frozen at 17 May 2025, 11:45 IST. New incidents use server time. Ingestion accepts events from 24 hours before onset through the investigation clock (plus clock skew); ranking deliberately uses the narrower 60-minute window. Event display times use IST; source and receipt timestamps remain accessible in UTC.

Workspace reads return up to 100 incidents, 2,000 events per incident, and 100 recent notes. Response reads return up to 200 activity entries; an incident supports 200 actions and the library supports 100 runbooks. The operations queue returns 500 actions with incomplete-history notices. Metrics describe loaded manual incidents and measure onset to latest resolution; reopening resets the current resolution. The service catalog and directed graph are maintained in `lib/domain.ts`.

## Main source locations

- `components/dashboard.tsx`: workspace and investigation interactions.
- `components/views.tsx`: evidence, inventory, integrations, architecture.
- `components/opscord.tsx`: reusable dashboard panels and diagrams.
- `lib/domain.ts`: validation schemas, types, graph, sample dataset.
- `lib/scoring.ts`: deterministic ranking and BFS.
- `lib/store.ts`: persistence, atomic seed, delivery deduplication.
- `app/api/`: API route handlers.
- `db/schema.ts`, `drizzle/`: schema and immutable migrations.
- `tests/core.test.ts`, `scripts/smoke-api.mjs`: algorithm and integration checks.

## Next milestones

1. Authenticated GitHub/GitHub Actions ingestion and source-specific normalization.
2. Kubernetes/monitoring adapters, maintained dependency discovery, and live health state.
3. Tenant isolation, roles, webhook rate limiting, audit trails, pagination, and operational monitoring.
4. Historical incident dataset and evaluated/calibrated ranking improvements.
5. Optional evidence-grounded LLM summaries, followed by separately evaluated anomaly models.
6. MQTT edge telemetry and verified physical-to-digital dependency mappings.
