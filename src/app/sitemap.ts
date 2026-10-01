import type { MetadataRoute } from "next";
import { contactCta, mainNav, siteConfig } from "@/lib/site";

// Static routes only. Contentful entries, with their real lastModified, are added in P3-16.
export default function sitemap(): MetadataRoute.Sitemap {
  return [...mainNav.map((item) => item.href), contactCta.href].map((path) => ({
    url: new URL(path, siteConfig.url).toString(),
  }));
}
