import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().optional(),
  BETTER_AUTH_SECRET: z.string().optional(),
  BETTER_AUTH_URL: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GMAIL_APP_USER: z.string().optional(),
  GMAIL_APP_PASSWORD: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000")
});

export const env = envSchema.parse(process.env);
