ALTER TABLE "transaction" RENAME COLUMN "amountInCents" TO "amount_in_cents";--> statement-breakpoint
ALTER TABLE "transaction" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "transaction" ALTER COLUMN "updated_at" SET DEFAULT now();