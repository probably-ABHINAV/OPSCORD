<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield-alert.svg" />
    <img alt="OpsCord Logo" src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shield-alert.svg" width="120" />
  </picture>

  <h1 style="margin-top: 20px;">OpsCord</h1>
  
  <p>
    <b>The evidence-based incident response platform with deterministic candidate ranking.</b><br />
    Turn scattered telemetry and deployments into a clear picture of incident causality.
  </p>

  <p>
    <a href="https://github.com/opscord/opscord/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" alt="License">
    </a>
    <a href="https://nextjs.org/">
      <img src="https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js" alt="Next.js">
    </a>
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
    </a>
    <a href="https://supabase.com/">
      <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
    </a>
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-architecture--stack">Architecture</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-deployment">Deployment</a> •
    <a href="#-api-reference">API</a>
  </p>
</div>

<br />

<div align="center">
  <!-- Embedded native MP4 video for high-quality playback -->
  <video src="./public/brag.mp4" width="100%" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);" autoPlay loop muted playsInline></video>
  <p><em>OpsCord’s deterministic candidate ranking tracing incident causality in real-time.</em></p>
</div>

---

## ✨ Features

Incident response is often chaotic, manual, and lacks clear evidence. OpsCord transforms investigations by bringing telemetry, deployment events, and topology into a single deterministic view.

<table width="100%">
  <tr>
    <td width="50%">
      <h3>🎯 Evidence-Based Ranking</h3>
      <p>A deterministic BFS traversal walks incoming dependency edges from candidate causes to the affected service. Candidates (deployments, config changes) are ranked algorithmically using time locality and corroborating telemetry.</p>
    </td>
    <td width="50%">
      <h3>🛡️ Robust Event Ingestion</h3>
      <p>Validates incoming JSON payloads with strict provider delivery deduplication. Events are persisted to PostgreSQL with conflict detection and unified UTC timestamp normalization.</p>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3>⚡ Actionable Workflows</h3>
      <p>Searchable incident queues, atomic activity records (declarations, decisions, notes), and idempotent runbook application. Everything is versioned, trackable, and built for speed.</p>
    </td>
    <td width="50%">
      <h3>🌍 Scalable Architecture</h3>
      <p>Built with Next.js App Router and PostgreSQL (via Supabase), ensuring massive scalability for enterprise-grade event ingestion and complex graph traversals.</p>
    </td>
  </tr>
</table>

<div align="center">
  <img src="./public/screenshot-hero.png" alt="OpsCord Dashboard" width="100%" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />
</div>

---

## 🏗️ Architecture & Stack

OpsCord utilizes a highly typed, modern React stack designed for performance and reliability.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg" width="20" align="top"/> [Next.js](https://nextjs.org) | App Router architecture, running on Vite via [Vinext](https://github.com/vinext). |
| **Language** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="20" align="top"/> [TypeScript](https://www.typescriptlang.org) | End-to-end type safety from DB schema to UI. |
| **Database** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" width="20" align="top"/> [PostgreSQL](https://supabase.com) | Highly reliable relational data store (Supabase recommended). |
| **ORM** | 🔹 [Drizzle](https://orm.drizzle.team) | Lightweight and incredibly fast TypeScript ORM. |
| **Styling** | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" width="20" align="top"/> [Tailwind CSS](https://tailwindcss.com) | With Radix UI & Shadcn for accessible, unstyled primitives. |

### Event Ingestion Flow

```mermaid
graph LR
    A[CI/CD / K8s / Webhooks] -->|POST JSON| B(Next.js API Route)
    B --> C{Zod Validation}
    C -->|Valid| D[Deduplication Check]
    C -.->|Invalid| E[400 Bad Request]
    D -->|New Event| F[(PostgreSQL)]
    D -.->|Duplicate| G[200 OK - Ignored]
    
    style B fill:#000,stroke:#fff,stroke-width:2px,color:#fff
    style F fill:#336791,stroke:#fff,stroke-width:2px,color:#fff
```

---

## 🚀 Quick Start

Node `22.13+` and `npm` are required.

### 1. Clone & Install
```bash
git clone https://github.com/opscord/opscord.git
cd opscord
npm run install:ci
npm run build
```

### 2. Environment Configuration
Create a `.env.local` file in the root directory. You will need a PostgreSQL database (like [Supabase](https://supabase.com/)).

```ini
# .env.local
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

### 3. Database Setup
Push the Drizzle schema to your PostgreSQL database.
```bash
npm run db:generate
npx drizzle-kit push:pg
```

### 4. Start Development Server
```bash
npm run dev
```

> [!WARNING]
> Do not expose the development server to the network directly in production without an authentication layer.

---

## 🚢 Deployment

Deploying OpsCord is straightforward since it's a standard Next.js application.

<details>
<summary><strong>Deploying to Vercel (Recommended)</strong></summary>

1. Push your repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Set the `DATABASE_URL` environment variable in the Vercel dashboard.
4. Add a custom build command if needed (e.g., to run migrations during build), or just use the default Next.js settings.
5. Click **Deploy**.

```mermaid
graph TD
    A[GitHub Repo] -->|Webhook| B(Vercel Build)
    B --> C[Vercel Edge Network]
    C <--> D[(Supabase PostgreSQL)]
    
    style C fill:#000,stroke:#fff,stroke-width:2px,color:#fff
    style D fill:#336791,stroke:#fff,stroke-width:2px,color:#fff
```
</details>

<details>
<summary><strong>Deploying via Docker</strong></summary>

You can build a standalone Next.js image. *(Ensure `output: 'standalone'` is in your `next.config.ts`)*.

```bash
# Build the image
docker build -t opscord .

# Run the container
docker run -p 3000:3000 -e DATABASE_URL="your_postgres_url" opscord
```
</details>

---

## 📡 API Reference

OpsCord is designed to integrate seamlessly with your existing CI/CD, Kubernetes, and monitoring tools.

<details>
<summary><strong>Ingest Event</strong> <code>POST /api/incidents/{id}/events</code></summary>

Ingests a new telemetry or deployment event and attaches it to an incident.

**Headers:**
`Content-Type: application/json`

**Payload:**
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

**Responses:**
- `200 OK`: Event created successfully (or successfully deduplicated).
- `400 Bad Request`: Invalid JSON schema.
- `409 Conflict`: `externalId` already exists for this source but with a different payload.
</details>

<details>
<summary><strong>List Runbooks</strong> <code>GET /api/runbooks</code></summary>

Retrieves the library of available incident response runbooks.

**Response:**
```json
[
  {
    "id": "rb_123",
    "title": "Database Failover Procedure",
    "version": 2,
    "steps": [ ... ]
  }
]
```
</details>

---

## 🗺️ Roadmap & Contributing

We welcome contributions! OpsCord is an evolving MVP with the following major milestones ahead:

- [ ] **Ingestion**: Authenticated GitHub Actions & Kubernetes adapters.
- [ ] **Security**: Tenant isolation, webhook rate limiting, and audit trails.
- [ ] **AI**: Optional evidence-grounded LLM summaries.

Read the [Full Roadmap](ROADMAP.md) to see where we are heading.

<div align="center">
  <sub>Built with ❤️ for on-call engineers.</sub>
</div>
