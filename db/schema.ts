import { integer, pgTable, text, index, uniqueIndex } from 'drizzle-orm/pg-core';

export const incidents = pgTable('incidents', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  service: text('service').notNull(),
  severity: text('severity').notNull(),
  status: text('status').notNull(),
  startedAt: text('started_at').notNull(),
  createdAt: text('created_at').notNull(),
  mode: text('mode').notNull(),
  version: integer('version').notNull().default(1),
  resolvedAt: text('resolved_at'),
  resolutionSummary: text('resolution_summary').notNull().default('')
});

export const events = pgTable('events', {
  id: text('id').primaryKey(),
  incidentId: text('incident_id').notNull().references(() => incidents.id),
  externalId: text('external_id').notNull(),
  source: text('source').notNull(),
  type: text('type').notNull(),
  service: text('service').notNull(),
  severity: text('severity').notNull(),
  title: text('title').notNull(),
  occurredAt: text('occurred_at').notNull(),
  receivedAt: text('received_at').notNull(),
  metadata: text('metadata').notNull(),
  payloadHash: text('payload_hash').notNull()
}, t => [
  uniqueIndex('idx_events_delivery').on(t.incidentId, t.source, t.externalId),
  index('idx_events_incident_time').on(t.incidentId, t.occurredAt)
]);

export const notes = pgTable('notes', {
  id: text('id').primaryKey(),
  incidentId: text('incident_id').notNull().references(() => incidents.id),
  body: text('body').notNull(),
  createdAt: text('created_at').notNull()
}, t => [
  index('idx_notes_incident_time').on(t.incidentId, t.createdAt)
]);

export const seeds = pgTable('seed_runs', {
  id: text('id').primaryKey()
});

export const coordination = pgTable('incident_coordination', {
  incidentId: text('incident_id').primaryKey().references(() => incidents.id),
  owner: text('owner').notNull().default(''),
  communicationsLead: text('communications_lead').notNull().default(''),
  environment: text('environment').notNull().default('unknown'),
  impact: text('impact').notNull().default(''),
  summary: text('summary').notNull().default(''),
  channelUrl: text('channel_url').notNull().default(''),
  nextUpdateAt: text('next_update_at'),
  version: integer('version').notNull().default(1),
  updatedAt: text('updated_at').notNull()
});

export const actionItems = pgTable('action_items', {
  id: text('id').primaryKey(),
  incidentId: text('incident_id').notNull().references(() => incidents.id),
  title: text('title').notNull(),
  owner: text('owner').notNull().default(''),
  priority: text('priority').notNull(),
  category: text('category').notNull(),
  status: text('status').notNull().default('open'),
  dueAt: text('due_at'),
  evidenceId: text('evidence_id').references(() => events.id),
  version: integer('version').notNull().default(1),
  createdAt: text('created_at').notNull(),
  completedAt: text('completed_at'),
  runbookKey: text('runbook_key')
}, t => [
  index('idx_actions_incident').on(t.incidentId),
  uniqueIndex('idx_actions_runbook').on(t.incidentId, t.runbookKey)
]);

export const activity = pgTable('incident_activity', {
  id: text('id').primaryKey(),
  incidentId: text('incident_id').notNull().references(() => incidents.id),
  kind: text('kind').notNull(),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull()
}, t => [
  index('idx_activity_incident_time').on(t.incidentId, t.createdAt)
]);

export const postmortems = pgTable('postmortems', {
  incidentId: text('incident_id').primaryKey().references(() => incidents.id),
  summary: text('summary').notNull(),
  impact: text('impact').notNull(),
  cause: text('cause').notNull(),
  response: text('response').notNull(),
  lessons: text('lessons').notNull(),
  status: text('status').notNull().default('draft'),
  version: integer('version').notNull().default(1),
  updatedAt: text('updated_at').notNull()
});

export const runbooks = pgTable('runbooks', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  steps: text('steps').notNull(),
  version: integer('version').notNull().default(1),
  updatedAt: text('updated_at').notNull()
});
