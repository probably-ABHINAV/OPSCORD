# OpsCord MVP and expansion roadmap

## Product direction

OpsCord helps an engineer move from scattered evidence to a coordinated incident response and a useful review. The first release is a private, single-workspace application for manually supplied evidence. The next release should connect one real monitoring source and one deployment source before expanding to many providers.

## Delivered in this milestone

| Workflow | Working capabilities |
| --- | --- |
| Declare and investigate | Incident creation, searchable queue, status/severity filters, direct incident links, source/timestamp evidence filters, inspectable normalized events, deduplicated ingestion |
| Assess causes | Directed dependency paths, explained evidence rankings, corroboration/contradiction details, explicit uncertainty |
| Coordinate | Commander and communications assignments, environment, impact statement, situation brief, channel URL, next-update time, copyable handoff |
| Execute response | Saved mitigation/follow-up actions, one owner, priority, due time, linked evidence, completion and reopening, cross-incident action queue, overdue filter |
| Repeat useful practice | Three starter runbooks, custom runbooks, versioned edits, idempotent checklist application; checklists do not execute infrastructure commands |
| Record decisions | Append-only workspace activity for declarations, status changes, notes, coordination, actions, runbooks, decisions, and reviews |
| Recover and learn | Resolution summary, draft/final postmortems, fact-based prefilling, completeness checks, reopening returns finalized reviews to draft |
| Review outcomes | Manual-incident counts, onset-to-latest-resolution duration, overdue work, review completion, service recurrence; sample scenarios excluded |
| Preserve knowledge | Markdown reports, incident JSON exports, saved data in D1, conflict detection, temporary device-local brief/review drafts |

## Next: required before a team or commercial launch

1. **Verified users and workspace isolation.** Membership, invitations, owner/responder/viewer roles, server-side tenant checks on every record, verified actors on the activity log, and tests for cross-workspace access. Current text assignments confer no access and send no invitations.
2. **One complete integration path.** GitHub deployment/Actions events plus a monitoring provider. Include authenticated ingress, signature checks, replay protection, delivery identifiers, retries, failed-delivery inspection, schema versions, rate limits, and safe secret rotation. A connector is ready only after a real event is observed end to end.
3. **Operational reliability.** Application error monitoring, availability checks, database backup/restore verification, recovery objectives, retention controls, load limits, and a support runbook. Measure the system that responders depend on.
4. **Scalable retrieval.** Cursor pagination and server-side search for incidents, actions, evidence, and history. Existing interfaces disclose their loaded-record limits; reports export the currently loaded incident data.
5. **Editable service inventory.** Service ownership, environments, criticality, runbook links, dependency provenance, last discovery time, and change review. Current topology is curated code and sample health is not live health.
6. **Notification delivery.** Explicitly configured Slack/Teams/email updates, scheduled reminders, escalation rules, delivery history, retry state, and user notification preferences. A next-update time currently acts as a visible planning aid.

## High-value extras, in priority order

| Priority | Feature | Why it matters | Completion condition |
| --- | --- | --- | --- |
| P1 | Responder hypothesis assessments | Preserve human judgment separately from the score | Supported/ruled-out/investigating assessments require a reason and evidence links |
| P1 | Mitigation experiments | Track what was tried and whether it helped | Record hypothesis, action, expected signal, observed outcome, and rollback plan |
| P1 | Recovery monitoring stage | Separate mitigation from verified recovery | Define a watch period and recovery checks before closure |
| P1 | Incoming responder handoff | Reduce repeated investigation | Current impact, decisions, open questions, owners, and next actions in one view |
| P1 | Integration health | Reveal evidence gaps | Last receipt, last successful processing, lag, failure count, and disconnected state |
| P1 | Search similar incidents | Reuse prior findings | Search symptoms, services, changes, confirmed findings, and mitigation outcomes |
| P1 | Follow-up governance | Turn reviews into improvements | Due-date reminders, owner acknowledgement, completion evidence, and review cadence |
| P2 | On-call schedules and escalation | Reach the right person | Timezone-aware rotations, overrides, acknowledgement, escalation, and delivery checks |
| P2 | Alert grouping and suppression | Reduce duplicate investigations | Explainable grouping keys, maintenance windows, and safe ungrouping |
| P2 | Change comparison | Test a suspected regression | Before/after release evidence with source links and explicit missing data |
| P2 | Service objectives | Connect incidents with customer reliability | Define SLIs/SLOs, verified measurements, burn rate, and error-budget policies |
| P2 | Stakeholder updates/status page | Share a consistent impact narrative | Reviewed updates, audience controls, delivery status, and separate public content |
| P2 | Attachments and evidence snapshots | Preserve investigation context | Private object storage, access checks, content limits, provenance, and retention |
| P2 | Drill mode | Practice without contaminating production history | Isolated scenarios, facilitator controls, learning review, and metric exclusion |
| P2 | Service readiness checks | Find operational gaps early | Visible owner, runbook, monitoring coverage, dependency freshness, and recovery guidance |
| P3 | Evidence-grounded summaries | Reduce reading time | Every factual claim cites accessible evidence; insufficient evidence is disclosed |
| P3 | Ranking evaluation | Improve the hypothesis aid | Reviewed incident dataset, held-out tests, error analysis, and calibration before probability claims |
| P3 | Kubernetes topology discovery | Keep service relationships current | Bounded permissions, provenance, freshness, review of inferred relationships |
| P3 | MQTT and physical telemetry | Connect verified physical signals | Authenticated device identity, units, clock quality, and explicit physical dependencies |
| P3 | Approved remediation workflows | Shorten repetitive recovery | Least privilege, explicit approval, dry runs, rollback, execution logs, and outcome verification |

## Product decisions to make before expanding

- Choose the first user: a small engineering team, an IoT operator, or a platform operations team. Their evidence sources and runbooks differ.
- Pick one monitoring provider and one change/deployment provider for the first connector release.
- Decide whether OpsCord stays an internal workspace or becomes a multi-tenant product. The latter requires the launch controls above before onboarding customers.
- Define success through a pilot: time to identify the next useful action, response duration, evidence completeness, and follow-up completion. Establish a baseline before claiming improvement.

## Verification and limits

The current MVP is designed for a private workspace with manually supplied events. It does not have verified multi-user attribution, tenant isolation, automatic connector ingestion, notification delivery, an on-call pager, live topology discovery, autonomous remediation, or an LLM connection. No external accounts are connected by the sample source labels. Evidence rankings are heuristics, not proof of causation or calibrated probabilities.

The response workflow follows established incident-management ideas: named coordination roles and a running response record ([Google SRE incident response](https://sre.google/workbook/incident-response/)), followed by blameless reviews with concrete owned actions ([Google SRE postmortem practices](https://sre.google/workbook/postmortem-culture/)). The prioritization above is a product recommendation for OpsCord, not a claim that those sources prescribe this implementation.
