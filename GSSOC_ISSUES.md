# GSSoC '26: Contributor Issues

> **42 pre-scoped issues** organized by difficulty and track.
> Maintainers: Copy the title and description into a GitHub issue and apply the suggested labels.
> See [docs/LABELS.md](docs/LABELS.md) for the full label guide.

---

## 🟢 Level 1: Beginner Friendly (Good First Issues) — 10 pts

_Perfect for first-time contributors. Git, Markdown, basic React/CSS._

### 1. `[Docs] Add .nvmrc file`

- **Description:** Add an `.nvmrc` file specifying `v20` to ensure all contributors use the same Node.js version.
- **Labels:** `good first issue`, `gssoc`, `track:devops`
- **File:** `.nvmrc` (new)

### 2. `[UI] Add hover effects to sidebar navigation`

- **Description:** The sidebar items in `components/core/Sidebar.tsx` need a distinct hover state. Add a glow/underline effect matching the neon cyan theme.
- **Labels:** `good first issue`, `gssoc`, `track:frontend`

### 3. `[UI] Create custom 404 page`

- **Description:** Create `app/not-found.tsx` with our dark/industrial aesthetic. Include a "Return Home" button.
- **Labels:** `good first issue`, `gssoc`, `track:frontend`

### 4. `[Docs] Add JSDoc comments to mockData.ts`

- **Description:** Add TypeScript JSDoc comments to all interfaces and mock data in `apps/web/lib/mockData.ts`.
- **Labels:** `good first issue`, `gssoc`, `track:docs`

### 5. `[UI] Fix mobile padding on hero section`

- **Description:** The hero text in `app/page.tsx` overflows on iPhone SE screens. Adjust padding for mobile.
- **Labels:** `good first issue`, `gssoc`, `track:frontend`

### 6. `[UI] Add scroll-to-top floating button`

- **Description:** Add a floating button that appears when scrolling down and smoothly scrolls to the top.
- **Labels:** `good first issue`, `gssoc`, `track:frontend`

### 7. `[Docs] Create issue label guide`

- **Description:** ~~Create `docs/LABELS.md`~~ — **✅ DONE.** Expand it with visual examples of each label.
- **Labels:** `good first issue`, `gssoc`, `track:docs`

### 8. `[UI] Add loading spinner to sidebar AI indicator`

- **Description:** The "AI Insights" sidebar item has a "Live" badge. Add a subtle pulsing animation to make it feel active.
- **Labels:** `good first issue`, `gssoc`, `track:frontend`

### 9. `[Config] Add .editorconfig file`

- **Description:** Create `.editorconfig` to standardize indentation (2 spaces) and charset across different IDEs.
- **Labels:** `good first issue`, `gssoc`, `track:devops`

### 10. `[Docs] Add Mermaid architecture diagram to README`

- **Description:** Update the README's architecture section with a detailed Mermaid diagram showing the full data flow: Webhooks → Ingestion → Redis → AI → Postgres → Frontend.
- **Labels:** `good first issue`, `gssoc`, `track:docs`

### 11. `[UI] Add tooltips to MetricCard components`

- **Description:** When hovering over a MetricCard on the metrics dashboard, show a tooltip with the metric's description.
- **Labels:** `good first issue`, `gssoc`, `track:frontend`

### 12. `[Docs] Document all npm scripts`

- **Description:** Create `docs/SCRIPTS.md` explaining every npm script: `dev`, `build`, `lint`, `test`, `validate`, `format`, etc.
- **Labels:** `good first issue`, `gssoc`, `track:docs`

---

## 🟡 Level 2: Intermediate — 25 pts

_Requires solid React, Next.js App Router, Hono, or Prisma knowledge._

### 13. `[Frontend] Build DateRangePicker component`

- **Description:** Build a reusable `DateRangePicker` to filter the incidents dashboard by time range.
- **Labels:** `intermediate`, `gssoc`, `track:frontend`

### 14. `[Frontend] Implement skeleton loading states`

- **Description:** While dashboard data loads, show a pulsing skeleton UI instead of a blank screen.
- **Labels:** `intermediate`, `gssoc`, `track:frontend`

### 15. `[Frontend] Add dark/light theme toggle`

- **Description:** The app is dark-mode only. Add `next-themes` to support a light mode toggle.
- **Labels:** `intermediate`, `gssoc`, `track:frontend`

### 16. `[Frontend] Build toast notification system`

- **Description:** Implement a generic toast notification system (e.g., "Incident resolved") using `react-hot-toast` or Sonner.
- **Labels:** `intermediate`, `gssoc`, `track:frontend`

### 17. `[Backend] Replace console.log with Pino logger`

- **Description:** Replace all `console.log` in `apps/api` and `apps/ingestion` with structured `pino` logging.
- **Labels:** `intermediate`, `gssoc`, `track:backend`

### 18. `[CI] Add Conventional Commits PR title linter`

- **Description:** Add `amannn/action-semantic-pull-request` to enforce PR titles follow Conventional Commits format.
- **Labels:** `intermediate`, `gssoc`, `track:devops`

### 19. `[DB] Implement soft-delete pattern`

- **Description:** Add `deletedAt` DateTime field to Prisma models and update queries to filter soft-deleted records.
- **Labels:** `intermediate`, `gssoc`, `track:backend`

### 20. `[Backend] Add pagination to projects endpoint`

- **Description:** Update `GET /api/v1/projects` to support cursor-based pagination with `?cursor=X&limit=20`.
- **Labels:** `intermediate`, `gssoc`, `track:backend`

### 21. `[Frontend] Build notification center dropdown`

- **Description:** Build a notification bell icon in the header that opens a dropdown showing recent alerts and events.
- **Labels:** `intermediate`, `gssoc`, `track:frontend`

### 22. `[Backend] Add Zod request validation`

- **Description:** Add Zod schemas for all API route inputs and integrate with Hono's validator middleware.
- **Labels:** `intermediate`, `gssoc`, `track:backend`

### 23. `[Frontend] Build incident detail page`

- **Description:** Create `app/(dashboard)/incidents/[id]/page.tsx` showing full event timeline, AI analysis, and metadata.
- **Labels:** `intermediate`, `gssoc`, `track:frontend`

### 24. `[CI] Add Lighthouse CI performance audit`

- **Description:** Add Lighthouse CI to the GitHub Actions pipeline to audit Core Web Vitals on every PR.
- **Labels:** `intermediate`, `gssoc`, `track:devops`

### 25. `[Frontend] Add keyboard shortcuts (Cmd+K)`

- **Description:** Implement a command palette (Cmd+K / Ctrl+K) for quick navigation between dashboard pages.
- **Labels:** `intermediate`, `gssoc`, `track:frontend`

### 26. `[Backend] Add error handling middleware`

- **Description:** Create centralized error handling middleware for Hono that returns consistent JSON error responses.
- **Labels:** `intermediate`, `gssoc`, `track:backend`

### 27. `[Docs] Write API documentation`

- **Description:** Create `docs/API.md` documenting all API endpoints with example requests/responses using curl.
- **Labels:** `intermediate`, `gssoc`, `track:docs`

---

## 🔴 Level 3: Advanced — 50 pts

_Requires system design, WebSockets, Redis, security, or LLM knowledge._

### 28. `[Backend] Build GitHub webhook receiver with HMAC`

- **Description:** Create `/api/v1/ingest/github` that validates SHA-256 HMAC signatures and parses PR/Push events.
- **Labels:** `advanced`, `gssoc`, `track:backend`, `track:security`

### 29. `[Backend] Add BullMQ Redis queue for webhooks`

- **Description:** Instead of processing webhooks synchronously, enqueue them with BullMQ for background processing.
- **Labels:** `advanced`, `gssoc`, `track:backend`

### 30. `[Security] Implement Redis-based rate limiting`

- **Description:** Add rate limiting to public API routes using Upstash Redis to prevent DDoS and spam.
- **Labels:** `advanced`, `gssoc`, `track:security`

### 31. `[Frontend] Build interactive incident timeline`

- **Description:** Build a Recharts/D3 timeline showing event frequency leading up to an incident.
- **Labels:** `advanced`, `gssoc`, `track:frontend`

### 32. `[Integrations] Build Datadog webhook normalizer`

- **Description:** Create an endpoint to receive and normalize Datadog alerts into the OPSCORD Event format.
- **Labels:** `advanced`, `gssoc`, `track:backend`

### 33. `[AI] Integrate Gemini incident summarization`

- **Description:** Use `@google/generative-ai` to build a function that takes event arrays and returns structured root-cause JSON.
- **Labels:** `advanced`, `gssoc`, `track:ai`

### 34. `[AI] Build "Chat with your Logs" interface`

- **Description:** Build a UI and API allowing users to ask natural language questions about their infrastructure events.
- **Labels:** `advanced`, `gssoc`, `track:ai`, `track:frontend`

### 35. `[DevOps] Setup Playwright E2E tests`

- **Description:** Configure Playwright and write the first E2E test: load the dashboard and verify incident table renders.
- **Labels:** `advanced`, `gssoc`, `track:devops`

### 36. `[Backend] Implement WebSocket server for real-time events`

- **Description:** Add a WebSocket endpoint to broadcast "New Incident" events to connected frontend clients in real-time.
- **Labels:** `advanced`, `gssoc`, `track:backend`

### 37. `[Security] Add CSP and security headers middleware`

- **Description:** Add Content-Security-Policy, X-Frame-Options, and other security headers to the Next.js config and Hono middleware.
- **Labels:** `advanced`, `gssoc`, `track:security`

### 38. `[AI] Build anomaly detection scoring engine`

- **Description:** Implement Z-score anomaly detection on event volumes per 5-minute window in `packages/ai/src/anomaly.ts`.
- **Labels:** `advanced`, `gssoc`, `track:ai`

### 39. `[Integrations] Build Sentry webhook normalizer`

- **Description:** Create an endpoint to receive Sentry issue/event webhooks and normalize into OPSCORD Event format.
- **Labels:** `advanced`, `gssoc`, `track:backend`

### 40. `[DevOps] Add database migration CI check`

- **Description:** Add a CI job that validates Prisma migrations can be applied cleanly to a fresh database.
- **Labels:** `advanced`, `gssoc`, `track:devops`

### 41. `[Frontend] Build Grafana-style custom widget builder`

- **Description:** Let users create custom dashboard widgets by selecting metric type, visualization, and time range.
- **Labels:** `advanced`, `gssoc`, `track:frontend`

### 42. `[AI] Build AI-powered alert prioritization`

- **Description:** Create a scoring function in `packages/ai/src/scoring.ts` that ranks active alerts by severity × frequency × blast radius.
- **Labels:** `advanced`, `gssoc`, `track:ai`
