import { PrismaClient } from "@prisma/client";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";

import { env } from "@/lib/env";

const authPrisma = new PrismaClient();

const socialProviders =
  env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: env.GOOGLE_CLIENT_ID,
          clientSecret: env.GOOGLE_CLIENT_SECRET
        }
      }
    : {};

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL ?? env.NEXT_PUBLIC_APP_URL,
  secret:
    env.BETTER_AUTH_SECRET ?? "9wR3zK7mL2qV8xB4nP5tD1yF6cH0uJ9sE3aN7rT4pQ8v",
  database: prismaAdapter(authPrisma, {
    provider: "mongodb"
  }),
  advanced: {
    database: {
      generateId: false
    }
  },
  emailAndPassword: {
    enabled: true
  },
  socialProviders,
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "PATIENT"
      }
    }
  }
});
