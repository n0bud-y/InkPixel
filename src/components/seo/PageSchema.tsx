import type { Thing } from "schema-dts";
import { getPageSeo } from "@/contentful/queries/page-seo";
import { pageSchemas, sitewideSchemas } from "@/content/seo-schemas";
import { customSchema, mergeSchema, siteSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "./JsonLd";

const sourceSiteUrl = "https://inkpixelstudios.com";
const siteUrl = siteConfig.url.replace(/\/+$/, "");

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

function rebaseSchema(value: unknown): unknown {
  if (typeof value === "string") return value.replaceAll(sourceSiteUrl, siteUrl);
  if (Array.isArray(value)) return value.map(rebaseSchema);
  if (!isRecord(value)) return value;
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, rebaseSchema(item)]));
}

function mergeValues(existing: unknown, supplied: unknown): unknown {
  if (Array.isArray(supplied)) {
    if (supplied.length === 0) return existing;
    if (Array.isArray(existing)) {
      return supplied.map((item, index) => mergeValues(existing[index], item));
    }
    if (isRecord(existing)) return supplied.map((item) => mergeValues(existing, item));
    return supplied;
  }
  if (Array.isArray(existing) && isRecord(supplied)) {
    return existing.map((item) => mergeValues(item, supplied));
  }
  if (isRecord(existing) && isRecord(supplied)) {
    return {
      ...existing,
      ...Object.fromEntries(
        Object.entries(supplied).map(([key, value]) => [
          key,
          key in existing ? mergeValues(existing[key], value) : value,
        ]),
      ),
    };
  }
  return supplied;
}

function mergeById(automatic: Thing[], supplied: Thing[]): Thing[] {
  const merged = [...automatic];
  for (const item of supplied) {
    const id = isRecord(item) && typeof item["@id"] === "string" ? item["@id"] : undefined;
    const index = id ? merged.findIndex((entry) => isRecord(entry) && entry["@id"] === id) : -1;
    if (index === -1) merged.push(item);
    else merged[index] = mergeValues(merged[index], item) as Thing;
  }
  return merged;
}

// Handoff schema merges with the app's automatic schema; Contentful can still replace schemas
// of the same @type. Sitewide entities merge by @id to keep distinct location entities intact.
export async function PageSchema({ path, items = [], custom }: { path: string; items?: Thing[]; custom?: unknown }) {
  const pasted = custom !== undefined ? custom : (await getPageSeo(path))?.jsonLd;
  const automatic = [...siteSchema(), ...items];
  const suppliedSitewide = customSchema(rebaseSchema(sitewideSchemas), path);
  const suppliedPage = customSchema(rebaseSchema(pageSchemas[path] ?? []), path);
  const withPageSchemas = mergeSchema(automatic, suppliedPage);
  const withSitewideSchemas = mergeById(withPageSchemas, suppliedSitewide);
  return <JsonLd items={mergeSchema(withSitewideSchemas, customSchema(pasted, path))} />;
}
