CREATE TABLE `rsvps` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`attendance` text NOT NULL,
	`guests` integer NOT NULL,
	`dietary` text NOT NULL,
	`country` text NOT NULL,
	`letter` integer NOT NULL,
	`message` text NOT NULL,
	`created_at` text NOT NULL
);
