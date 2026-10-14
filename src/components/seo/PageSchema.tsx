import type { Thing } from "schema-dts";
import { getPageSeo } from "@/contentful/queries/page-seo";
import { customSchema, mergeSchema, siteSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

// A page's structured data: the studio and the website (on every page), the page's own automatic
// schema (`items`), and the schema editors pasted in Contentful, which replaces automatic schema
// of the same @type. Pasted schema comes from the page's Page SEO entry (found by `path`), or, for
// case studies and blog posts, from their own SEO entry (`custom`).
export async function PageSchema({ path, items = [], custom }: { path: string; items?: Thing[]; custom?: unknown }) {
  const pasted = custom !== undefined ? custom : (await getPageSeo(path))?.jsonLd;
  return <JsonLd items={mergeSchema([...siteSchema(), ...items], customSchema(pasted, path))} />;
}
