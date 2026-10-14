import type { MetadataRoute } from "next";
import { servicePages } from "@/content/service-pages";
import { getCaseStudies, type CaseStudySummary } from "@/contentful/queries/case-studies";
import { absoluteUrl } from "@/lib/seo";
import { contactCta, footerNav, mainNav } from "@/lib/site";

// The built pages: the main menu, contact, and legal pages; the service pages; and every case
// study from Contentful, with the date it was last published (if Contentful is down, the rest
// is still listed). Industry, article, and category pages are added once they have content
// (P3-08, P3-11).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let caseStudies: CaseStudySummary[] = [];
  try {
    caseStudies = await getCaseStudies();
  } catch (error) {
    console.error("Sitemap: could not load the case studies.", error);
  }

  return [
    ...[...mainNav, contactCta, ...footerNav.legal].map(({ href }) => ({ url: absoluteUrl(href) })),
    ...servicePages.map(({ slug }) => ({ url: absoluteUrl(`/services/${slug}`) })),
    ...caseStudies.map(({ href, updatedAt }) => ({ url: absoluteUrl(href), lastModified: updatedAt })),
  ];
}
