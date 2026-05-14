# ⚡ Contributing to OPSCORD

First, thank you for considering contributing to OPSCORD! It's people like you that make open source such a fantastic community to learn, inspire, and create.

We are building a **production-grade AI observability platform**. Whether you are a GirlScript Summer of Code (GSSoC) participant, a seasoned DevOps engineer, or someone making their very first open-source pull request, we want to ensure your experience here is professional, rewarding, and impactful.

---

## 🎯 The OPSCORD Standard

We hold our codebase to a high standard. We aim for:

1. **Premium Quality**: Code that looks and runs like it belongs in a top-tier tech startup.
2. **Reliability**: Testing and typing are mandatory, not optional.
3. **Clarity**: Code is read far more often than it is written. Make your intent clear.

---

## 🚦 Issue Claiming Workflow

To prevent duplicated work and ensure fairness, especially during active programs like GSSoC, please follow this workflow:

1. **Find an Issue:** Look for issues labeled `help wanted`, `good first issue`, or `gssoc`.
2. **Request to Claim:** Comment on the issue asking to be assigned.
   - _Example:_ "Hi, I'd love to work on this issue. Can you assign it to me?"
3. **Wait for Assignment:** Wait until a maintainer or mentor assigns the issue to you. **Do not start working or submit a PR for an unassigned issue, or an issue assigned to someone else.**
4. **Time Limit:** Once assigned, you have **3 days (72 hours)** to submit a draft or initial PR. If there's no activity, the issue may be unassigned to let someone else try.

---

## 🛑 Anti-Spam Policy (GSSoC Strict Rules)

We take spam PRs very seriously. The following will result in an **immediate closure** of your PR and a potential ban/report:

- Submitting trivial typo fixes that do not add value (e.g., removing a trailing space).
- Submitting PRs for issues assigned to other people.
- Submitting the same PR multiple times.
- Modifying files unrelated to the specific issue you claimed.

---

## 🤖 AI-Generated Code Policy

We embrace AI tools (Copilot, ChatGPT, Claude) at OPSCORD, but **you are responsible for the code you commit**.

- **Transparency:** If your PR heavily relies on AI generation, please state it in your PR description.
- **Understanding:** You must fully understand the code you are submitting. If a maintainer asks you to explain a function and you cannot, the PR will be rejected.
- **Verification:** AI code is often buggy or hallucinated. **It must be tested locally before submitting.**

---

## 🌿 Branch Naming Rules

We use a strict branch naming convention to keep our repository organized. Create a branch from `main` using the following format:

`[type]/[issue-number]-[short-description]`

**Types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `refactor`: A code change that neither fixes a bug nor adds a feature

**Examples:**

- `feat/12-add-github-webhook-ingestion`
- `fix/45-resolve-dashboard-websocket-crash`
- `docs/88-update-readme-architecture`

---

## 💬 Commit Message Rules

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard. This helps us auto-generate changelogs.

**Format:**

```
<type>(<scope>): <subject>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

**Examples:**

- `feat(api): add redis caching to event queue`
- `fix(ui): resolve overflow issue on mobile dashboard`
- `docs(readme): add docker setup instructions`

---

## 🔄 The PR Workflow

1. **Fork the Repository:** Create a fork to your own GitHub account.
2. **Clone Locally:** `git clone https://github.com/YOUR_USERNAME/OPSCORD.git`
3. **Create Branch:** `git checkout -b feat/123-your-feature`
4. **Make Changes:** Write your code, following our contribution standards.
5. **Run Checks Locally:** Run the full quality gate before pushing:
   ```bash
   npm run validate  # lint + type-check + test
   ```
6. **Commit & Push:** Commit using the rules above and push to your fork.
7. **Open PR:** Create a Pull Request against the `main` branch of OPSCORD. **You must use the provided PR template.**
8. **Link Issue:** Ensure you link the issue your PR resolves (e.g., "Closes #123").

---

## 👨‍🏫 Mentor Review System

During GSSoC, we have a dedicated team of Mentors reviewing PRs:

1. **Automated Checks:** GitHub Actions will run CI (Lint, Build, Tests). If this fails, fix the errors before requesting a review.
2. **Initial Review:** A mentor will review your PR for styling, logic, and adherence to the issue requirements.
3. **Requested Changes:** If changes are requested, please address them promptly by pushing new commits to your branch. **Do not close the PR and open a new one.**
4. **Approval & Merge:** Once 1 Maintainer or 2 Mentors approve the PR, it will be merged into `main`.

---

## 💻 Contribution Standards

- **TypeScript:** We strictly use TypeScript. Avoid `any` types wherever possible.
- **Styling:** Use Tailwind CSS utility classes. Do not create custom CSS files unless absolutely necessary.
- **Formatting:** We use Prettier (auto-enforced via pre-commit hooks). Run `npm run format` to auto-fix.
- **Testing:** We use Vitest. Write tests for new utility functions. Run `npm run test` to verify.
- **Quality Gate:** Run `npm run validate` before every PR — it checks lint + types + tests in one command.
- **Labels:** See [docs/LABELS.md](docs/LABELS.md) for our complete label taxonomy.

Thank you for contributing to the future of incident intelligence! ⚡
