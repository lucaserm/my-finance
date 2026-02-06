import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  TZ: z.string().default("UTC"),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.url(),
});

export const env = envSchema.parse(process.env);
