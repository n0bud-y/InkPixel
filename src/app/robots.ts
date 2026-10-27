import type { MetadataRoute } from "next";
import { indexable } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Crawling is allowed unless indexing is blocked on this copy of the site (see `indexable`).
  if (!indexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
