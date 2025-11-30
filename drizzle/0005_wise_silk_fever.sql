CREATE TYPE "public"."currency" AS ENUM('USD', 'BRL', 'CRYPTO');--> statement-breakpoint
CREATE TABLE "investment_transaction" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"asset_symbol" text NOT NULL,
	"asset_currency" "currency" NOT NULL,
	"quantity" integer NOT NULL,
	"amount_in_cents" bigint NOT NULL,
	"total_paid_in_cents" bigint NOT NULL,
	"transacted_at" timestamp with time zone NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "portfolio_item" RENAME COLUMN "quantity" TO "total_quantity";--> statement-breakpoint
ALTER TABLE "portfolio_item" RENAME COLUMN "purchase_price" TO "total_invested_in_cents";--> statement-breakpoint
ALTER TABLE "transaction" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."transaction_type";--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('income', 'expense');--> statement-breakpoint
ALTER TABLE "transaction" ALTER COLUMN "type" SET DATA TYPE "public"."transaction_type" USING "type"::"public"."transaction_type";--> statement-breakpoint
ALTER TABLE "portfolio_item" ADD COLUMN "asset_currency" "currency" NOT NULL;--> statement-breakpoint
ALTER TABLE "investment_transaction" ADD CONSTRAINT "investment_transaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_item" DROP COLUMN "purchased_at";