# OPSCORD — Community Growth Strategy

## LinkedIn Content Calendar

### Weekly Posting Cadence

| Day           | Post Type                | Template                                                                                                                |
| ------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Monday**    | 🛠️ Technical Deep-Dive   | "How we built [feature] using [technology]. Here's the architecture..."                                                 |
| **Wednesday** | 🌟 Contributor Spotlight | "Meet @contributor who just shipped [feature]! Their journey from first PR to core contributor..."                      |
| **Friday**    | 📢 Issue of the Week     | "Looking for open-source contributors! This week's featured issue: [title]. Difficulty: [level]. Great for [audience]." |

### Content Pillars

1. **Technical Credibility** (40%)
   - Architecture decisions with Mermaid diagrams
   - "Why we chose X over Y" comparative posts
   - Performance benchmarks and optimizations

2. **Community Celebration** (30%)
   - Contributor spotlights with GitHub avatars
   - "First PR merged" celebrations
   - Monthly contributor leaderboard

3. **Learning Content** (20%)
   - "How we built X" step-by-step breakdowns
   - Common GSSoC contributor mistakes and how to avoid them
   - DevOps/observability educational content

4. **Social Proof** (10%)
   - Star/fork count milestones
   - GSSoC ranking updates
   - Testimonials from contributors

### Post Templates

#### Launch Announcement

```
🚀 Excited to announce OPSCORD — an AI-powered observability platform built during GSSoC 2026!

What makes it special:
• AI root cause analysis across event chains
• Real-time infrastructure monitoring
• Universal webhook ingestion (GitHub, Sentry, Datadog)

Tech stack: Next.js · Hono.js · PostgreSQL · Redis · Gemini AI

We're looking for contributors! Check out our 42 pre-scoped issues:
🔗 github.com/probably-ABHINAV/OPSCORD

#GSSoC #OpenSource #DevOps #AI #Observability
```

#### Contributor Spotlight

```
🌟 Contributor Spotlight: @[name]

[Name] just merged their [Nth] PR into OPSCORD, shipping [feature description].

What they built:
• [Bullet 1]
• [Bullet 2]
• [Bullet 3]

The best open-source contributions come from real engineering passion. Thank you, [Name]! 🙏

#GSSoC2026 #OpenSource #Contributors
```

#### Issue of the Week

```
🔧 Issue of the Week — OPSCORD

📋 [Issue Title]
🏷️ Difficulty: [Beginner/Intermediate/Advanced]
⏱️ Time estimate: [X hours]
📍 Track: [Frontend/Backend/AI/DevOps]

Perfect for: [target audience description]

Claim it here: github.com/probably-ABHINAV/OPSCORD/issues/[N]

#GSSoC #OpenSource #GoodFirstIssue
```

---

## GitHub Project Board Setup

### Create the Board

1. Go to **github.com/probably-ABHINAV/OPSCORD** → Projects → New project
2. Name: **OPSCORD Roadmap**
3. Template: **Board** (Kanban)

### Columns

| Column         | Auto-trigger                              |
| -------------- | ----------------------------------------- |
| 📋 Backlog     | Issue created + labeled `mentor-approved` |
| 🏃 Sprint      | Manual move (current sprint, max 10)      |
| 🔧 In Progress | PR opened linking the issue               |
| 👀 In Review   | PR review requested                       |
| ✅ Done        | PR merged                                 |
| 🗑️ Closed      | Issue/PR closed without merge             |

### Custom Fields

| Field      | Type          | Values                                        |
| ---------- | ------------- | --------------------------------------------- |
| Difficulty | Single select | Beginner, Intermediate, Advanced              |
| Track      | Single select | Frontend, Backend, AI, DevOps, Docs, Security |
| Points     | Number        | 10, 25, 50                                    |
| Sprint     | Iteration     | 2-week sprints                                |

### Views to Create

1. **Kanban** — Default board view
2. **By Track** — Group by Track field
3. **By Difficulty** — Group by Difficulty
4. **Sprint Planning** — Filter to current sprint
5. **Contributor Activity** — Group by assignee

---

## Contributor Recognition Tiers

| Tier              | Criteria                                      | Recognition                                                                 |
| ----------------- | --------------------------------------------- | --------------------------------------------------------------------------- |
| 🌱 **First PR**   | 1 merged PR                                   | Added to README Contributors table                                          |
| ⚡ **Active**     | 3+ merged PRs                                 | LinkedIn shoutout + Discord "Active Contributor" role                       |
| 🔥 **Core**       | 10+ merged PRs across multiple tracks         | Listed as "Core Contributor" in README, invited to architecture discussions |
| 👑 **Maintainer** | Consistent quality + trust + mentoring others | Write access, CODEOWNERS entry, merge permissions                           |

### How to Recognize (for Maintainers)

After merging a PR, comment:

```
@all-contributors please add @username for code
```

The bot will auto-update the README Contributors section.

---

## Discord Server Structure

### Channels

| Channel              | Purpose                          |
| -------------------- | -------------------------------- |
| `#general`           | Community chat                   |
| `#introductions`     | New member intros                |
| `#help`              | Ask questions about contributing |
| `#showcase`          | Share merged PRs and screenshots |
| `#announcements`     | Maintainer updates               |
| `#issue-of-the-week` | Pinned featured issue            |
| `#architecture`      | Design discussions               |
| `#off-topic`         | Non-project chat                 |

### Roles

| Role                 | Color      | Who               |
| -------------------- | ---------- | ----------------- |
| `Maintainer`         | 🔴 Red     | @probably-ABHINAV |
| `Mentor`             | 🟠 Orange  | GSSoC mentors     |
| `Core Contributor`   | 🟣 Purple  | 10+ PRs           |
| `Active Contributor` | 🔵 Blue    | 3+ PRs            |
| `Contributor`        | 🟢 Green   | 1+ PRs            |
| `Community`          | ⚪ Default | Everyone          |
