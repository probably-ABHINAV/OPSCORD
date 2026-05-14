# OPSCORD — GitHub Label Guide

This document explains every label used in the OPSCORD repository. Maintainers should apply these labels consistently to help contributors find relevant issues.

---

## Difficulty Levels

| Label              | Color        | Meaning                                                                |
| ------------------ | ------------ | ---------------------------------------------------------------------- |
| `good first issue` | 🟣 `#7057ff` | Beginner-friendly. < 1 hour. Perfect for first-time contributors.      |
| `intermediate`     | 🟡 `#fbca04` | Requires framework knowledge (React, Hono, Prisma). 2–4 hours.         |
| `advanced`         | 🔴 `#d93f0b` | Systems design, multi-file changes, architecture decisions. 4–8 hours. |

## GSSoC Points

| Difficulty         | Points |
| ------------------ | ------ |
| `good first issue` | 10 pts |
| `intermediate`     | 25 pts |
| `advanced`         | 50 pts |

---

## Track Labels

Issues are grouped into **tracks** so contributors can filter by their expertise:

| Label            | Color        | Description                                   |
| ---------------- | ------------ | --------------------------------------------- |
| `track:frontend` | 🔵 `#1d76db` | React, Next.js, Tailwind, UI components       |
| `track:backend`  | 🟢 `#0e8a16` | Hono, API routes, Prisma, database            |
| `track:devops`   | 🟣 `#5319e7` | CI/CD, Docker, GitHub Actions, infrastructure |
| `track:ai`       | 🟡 `#e4e669` | AI/ML features, Gemini integration, prompts   |
| `track:docs`     | 🔵 `#c5def5` | Documentation, README, guides                 |
| `track:security` | 🔴 `#b60205` | Security hardening, auth, rate limiting       |

---

## Type Labels

| Label         | Color        | Description                |
| ------------- | ------------ | -------------------------- |
| `bug`         | 🔴 `#d73a4a` | Something is broken        |
| `enhancement` | 🩵 `#a2eeef` | New feature or improvement |
| `chore`       | ⚪ `#ededed` | Config, tooling, cleanup   |

---

## Status Labels

| Label             | Color        | Description                                              |
| ----------------- | ------------ | -------------------------------------------------------- |
| `needs-triage`    | ⚪ `#ededed` | New issue, not yet reviewed by a mentor                  |
| `mentor-approved` | 🔵 `#0075ca` | Verified and scoped by a mentor — ready for contributors |
| `stale`           | ⚪ `#cccccc` | No activity for 7+ days — may be unassigned              |
| `spam`            | ⚫ `#000000` | Spam issue or PR — will be closed and reported           |

---

## Priority Labels

| Label           | Color        | Description                |
| --------------- | ------------ | -------------------------- |
| `priority:high` | 🔴 `#b60205` | Urgent — blocks other work |
| `priority:low`  | 🟢 `#c2e0c6` | Nice-to-have, can wait     |

---

## Program Labels

| Label   | Color        | Description                                   |
| ------- | ------------ | --------------------------------------------- |
| `gssoc` | 🟠 `#ff6600` | Eligible for GirlScript Summer of Code points |

---

## How to Use Labels (for Maintainers)

1. **Every new issue** gets `needs-triage` automatically
2. **After review**, replace `needs-triage` with `mentor-approved` + difficulty + track
3. **When assigning**, the contributor starts work
4. **If no PR in 72 hours**, add `stale` and consider unassigning
5. **Spam PRs** get `spam` label → close → report if repeated
