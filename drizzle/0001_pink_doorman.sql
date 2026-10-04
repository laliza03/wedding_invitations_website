ALTER TABLE `rsvps` ADD `wants` text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `rsvps` ADD `able` text DEFAULT 'pending' NOT NULL;--> statement-breakpoint
ALTER TABLE `rsvps` ADD `abroad` integer DEFAULT 0 NOT NULL;