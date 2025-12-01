ALTER TABLE "payment_event" DROP CONSTRAINT "payment_event_stripe_event_id_unique";--> statement-breakpoint
ALTER TABLE "payment_event" DROP COLUMN "stripe_event_id";