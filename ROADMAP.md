# 🗺️ OPSCORD Product Roadmap

This document outlines the strategic vision and upcoming milestones for **OPSCORD**. While open-source development is fluid and influenced by community contributions, this roadmap reflects our core priorities for building the ultimate AI observability platform.

---

## 🏁 Phase 1: The Foundation (Q1-Q2 2026)

_Status: In Progress_

The goal of Phase 1 is to establish a robust event ingestion pipeline and a stable, real-time dashboard.

- [x] Set up Next.js (App Router) and Tailwind CSS monorepo architecture.
- [x] Configure Prisma and PostgreSQL database schema.
- [x] Build core WebSockets infrastructure for real-time updates.
- [ ] Implement foundational webhook endpoints (GitHub, Datadog).
- [ ] Build the Command Center UI (timeline view, active incidents).
- [ ] **GSSoC '26 Focus:** Integrate 10+ standard integrations (Vercel, Sentry, AWS CloudWatch).

---

## 🧠 Phase 2: The AI Causality Engine (Q3 2026)

_Status: Planning_

Phase 2 focuses entirely on our proprietary LLM pipeline that turns noisy alerts into actionable intelligence.

- [ ] Integrate Google Gemini API for log summarization.
- [ ] Develop the "Causality Graph" - identifying sequential patterns in failure data.
- [ ] Build the "Odd One Out" anomaly detection algorithm.
- [ ] Implement Automated Post-Mortem Generation (Markdown format).
- [ ] Add the ability for users to "thumb up/down" AI conclusions to improve accuracy.

---

## ⚡ Phase 3: Action & Remediation (Q4 2026)

_Status: Ideation_

Once OPSCORD can identify _why_ something broke, Phase 3 allows it to act on that intelligence.

- [ ] Multi-Agent Chatbot: Interact with the system via Slack/Discord (e.g., "@opscord rollback the last deployment").
- [ ] Automated Runbook Execution: Trigger predefined scripts when specific incidents occur.
- [ ] Webhook Emitters: Send OPSCORD findings _out_ to Jira, Linear, or PagerDuty.
- [ ] Advanced RBAC (Role-Based Access Control) for enterprise teams.

---

## 🔮 Long-Term Vision (2027 & Beyond)

- **Predictive Analytics:** Warn teams _before_ an incident happens based on historical memory and commit risk scoring.
- **Custom Widget Builder:** Allow users to build custom dashboard widgets using a drag-and-drop interface.
- **Self-Hosted Enterprise Edition:** Full offline support for highly secure environments (banking, healthcare) using open-source models (Llama/Mistral).

---

## How to Contribute to the Roadmap

We welcome community feedback! If you have an idea for a feature that isn't listed here:

1. Check the [Issue Tracker](https://github.com/probably-ABHINAV/OPSCORD/issues) to see if it's already requested.
2. Open a new `Feature Request` using our issue template.
3. Discuss the idea with the maintainers in our Discord channel.
