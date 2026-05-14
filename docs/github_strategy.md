# GitHub Project Organization Strategy

To maintain a "startup-grade" and highly professional repository, OPSCORD utilizes a strict GitHub project management strategy. This is especially critical during high-volume periods like GSSoC.

## Label Strategy

Labels are used to categorize issues and PRs for easy filtering. Mentors and Maintainers are responsible for applying these labels.

### Triage & Priority

- `triage`: New issue, needs review from a maintainer.
- `priority:critical`: Drops everything, needs fixing immediately (e.g., production crash).
- `priority:high`: Should be worked on next sprint.
- `priority:low`: Nice to have, but not blocking.

### Type of Work

- `bug`: Something isn't working.
- `enhancement`: New feature or request.
- `documentation`: Improvements or additions to docs.
- `refactor`: Code improvements without functionality changes.

### Community & Programs

- `good first issue`: Ideal for beginners. Clearly scoped and self-contained.
- `help wanted`: Maintainers need community help with this.
- `gssoc`: Exclusively for GirlScript Summer of Code participants.

### PR Status

- `pr:review-needed`: Ready for mentor/maintainer review.
- `pr:changes-requested`: Author needs to address feedback.
- `pr:approved`: Ready to merge.

## GitHub Projects (Kanban) Setup

We use GitHub Projects to track the lifecycle of all work.

**Board Name:** OPSCORD Main Engineering
**Columns:**

1. **Backlog:** Triaged issues ready to be worked on.
2. **In Progress:** Issues currently assigned and being worked on.
3. **In Review:** PR submitted, awaiting mentor review.
4. **Done:** Merged and completed.

### The Triage Process

1. **New Issue Created:** Automatically gets the `triage` label.
2. **Review:** Maintainer reviews issue for validity.
3. **Categorize:** Maintainer removes `triage`, adds appropriate labels (`bug`, `priority:low`, etc.).
4. **Assign:** For `gssoc` or `good first issue`, maintainer waits for a community member to request it, then assigns them and moves the issue to "In Progress".

## Automated Workflows

We leverage GitHub Actions to keep the repository clean:

- **Stalebot:** Closes issues that have had no activity for 30 days to keep the backlog clean.
- **Auto-Assign:** (If enabled) automatically assigns reviewers based on codeowners.
- **CI Enforcement:** PRs cannot be merged unless the `ci.yml` workflow (lint, build) passes successfully.
