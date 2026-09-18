CREATE TABLE `action_items` (
	`id` text PRIMARY KEY NOT NULL,
	`incident_id` text NOT NULL,
	`title` text NOT NULL,
	`owner` text DEFAULT '' NOT NULL,
	`priority` text NOT NULL,
	`category` text NOT NULL,
	`status` text DEFAULT 'open' NOT NULL,
	`due_at` text,
	`evidence_id` text,
	`version` integer DEFAULT 1 NOT NULL,
	`created_at` text NOT NULL,
	`completed_at` text,
	`runbook_key` text,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`evidence_id`) REFERENCES `events`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_actions_incident` ON `action_items` (`incident_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_actions_runbook` ON `action_items` (`incident_id`,`runbook_key`);--> statement-breakpoint
CREATE TABLE `incident_activity` (
	`id` text PRIMARY KEY NOT NULL,
	`incident_id` text NOT NULL,
	`kind` text NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_activity_incident_time` ON `incident_activity` (`incident_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `incident_coordination` (
	`incident_id` text PRIMARY KEY NOT NULL,
	`owner` text DEFAULT '' NOT NULL,
	`communications_lead` text DEFAULT '' NOT NULL,
	`environment` text DEFAULT 'unknown' NOT NULL,
	`impact` text DEFAULT '' NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`channel_url` text DEFAULT '' NOT NULL,
	`next_update_at` text,
	`version` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `postmortems` (
	`incident_id` text PRIMARY KEY NOT NULL,
	`summary` text NOT NULL,
	`impact` text NOT NULL,
	`cause` text NOT NULL,
	`response` text NOT NULL,
	`lessons` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `runbooks` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`steps` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `incidents` ADD `resolution_summary` text DEFAULT '' NOT NULL;