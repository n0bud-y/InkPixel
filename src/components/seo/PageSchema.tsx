import type { Thing } from "schema-dts";
import { getPageSeo } from "@/contentful/queries/page-seo";
import { customSchema, mergeSchema, siteSchema, webPageSchema, type PageType } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "./JsonLd";

/** The page itself, for its WebPage schema: its kind, and the title and description its metadata
 *  falls back to (a title is shown as "<title> | Ink Pixel Studios" unless it is `absolute`). */
export type PageInfo = { type: PageType; title: string | { absolute: string }; description: string };

// A page's structured data: the studio and the website (on every page), the page itself (`page`:
// a WebPage, AboutPage, CollectionPage, or ContactPage, named and described as in its <head>), the
// page's own automatic schema (`items`), and the schema editors pasted in Contentful, which
// replaces automatic schema of the same @type. The title, description, and pasted schema come from
// the page's Page SEO entry (found by `path`) when it has one; for case studies and blog posts,
// pasted schema comes from their own SEO entry (`custom`).
export async function PageSchema({
  path,
  page,
  items = [],
  custom,
}: {
  path: string;
  page?: PageInfo;
  items?: Thing[];
  custom?: unknown;
}) {
  const entry = await getPageSeo(path);
  const pasted = custom !== undefined ? custom : entry?.jsonLd;
  const pageNode = page
    ? webPageSchema({
        type: page.type,
        path,
        name: entry?.title ?? (typeof page.title === "string" ? `${page.title} | ${siteConfig.name}` : page.title.absolute),
        description: entry?.description ?? page.description,
      })
    : null;
  return <JsonLd items={mergeSchema([...siteSchema(), ...(pageNode ? [pageNode] : []), ...items], customSchema(pasted, path))} />;
}
