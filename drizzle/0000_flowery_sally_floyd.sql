CREATE TABLE `events` (
	`id` text PRIMARY KEY NOT NULL,
	`incident_id` text NOT NULL,
	`external_id` text NOT NULL,
	`source` text NOT NULL,
	`type` text NOT NULL,
	`service` text NOT NULL,
	`severity` text NOT NULL,
	`title` text NOT NULL,
	`occurred_at` text NOT NULL,
	`received_at` text NOT NULL,
	`metadata` text NOT NULL,
	`payload_hash` text NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_events_delivery` ON `events` (`incident_id`,`source`,`external_id`);--> statement-breakpoint
CREATE INDEX `idx_events_incident_time` ON `events` (`incident_id`,`occurred_at`);--> statement-breakpoint
CREATE TABLE `incidents` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`service` text NOT NULL,
	`severity` text NOT NULL,
	`status` text NOT NULL,
	`started_at` text NOT NULL,
	`created_at` text NOT NULL,
	`mode` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL,
	`resolved_at` text
);
--> statement-breakpoint
CREATE TABLE `notes` (
	`id` text PRIMARY KEY NOT NULL,
	`incident_id` text NOT NULL,
	`body` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`incident_id`) REFERENCES `incidents`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `idx_notes_incident_time` ON `notes` (`incident_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `seed_runs` (
	`id` text PRIMARY KEY NOT NULL
);
