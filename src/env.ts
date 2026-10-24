import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

// Every environment variable the app reads is declared and validated here.
// Server variables throw if client code tries to read them.
export const env = createEnv({
  server: {
    CONTENTFUL_SPACE_ID: z.string().min(1),
    CONTENTFUL_ENVIRONMENT: z.string().min(1).default("master"),
    CONTENTFUL_DELIVERY_TOKEN: z.string().min(1),
    CONTENTFUL_PREVIEW_TOKEN: z.string().min(1),
    // The mailbox the contact forms send through (src/lib/send-enquiry.ts). Optional: without
    // them the site still builds, and the forms offer the visitor's email app instead.
    SMTP_HOST: z.string().min(1).optional(),
    SMTP_PORT: z.coerce.number().int().positive().default(465),
    SMTP_USER: z.string().min(1).optional(),
    SMTP_PASSWORD: z.string().min(1).optional(),
    /** Where enquiries go; the studio's address (siteConfig.email) when unset. */
    CONTACT_TO: z.email().optional(),
  },
  client: {},
  experimental__runtimeEnv: {},
  // Treat `KEY=` (as copied from .env.example) as missing.
  emptyStringAsUndefined: true,
});
