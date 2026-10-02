// Runs one Contentful migration file against the space and environment in .env.local.
// Usage: npm run contentful:migrate -- contentful/migrations/<file>.cjs [--yes]
// It shows the planned changes and asks before applying them (--yes skips the question).
// Needs CONTENTFUL_MANAGEMENT_TOKEN, which only these scripts use; the website never reads it.
import { resolve } from "node:path";
import contentfulMigration from "contentful-migration";

const file = process.argv.slice(2).find((arg) => !arg.startsWith("--"));
const {
  CONTENTFUL_SPACE_ID: spaceId,
  CONTENTFUL_ENVIRONMENT: environmentId = "master",
  CONTENTFUL_MANAGEMENT_TOKEN: accessToken,
} = process.env;

if (!file) {
  console.error("Usage: npm run contentful:migrate -- contentful/migrations/<file>.cjs [--yes]");
  process.exit(1);
}
if (!spaceId || !accessToken) {
  console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local.");
  process.exit(1);
}

console.log(`Migration ${file} → space ${spaceId}, environment "${environmentId}"`);
await contentfulMigration.runMigration({
  filePath: resolve(file),
  spaceId,
  environmentId,
  accessToken,
  yes: process.argv.includes("--yes"),
});
