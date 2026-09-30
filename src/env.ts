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
  },
  client: {},
  experimental__runtimeEnv: {},
  // Treat `KEY=` (as copied from .env.example) as missing.
  emptyStringAsUndefined: true,
});
