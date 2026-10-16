import type { MetadataRoute } from "next";
import { servicePages, servicePlace } from "@/content/service-pages";
import { getCaseStudies, type CaseStudySummary } from "@/contentful/queries/case-studies";
import { getCategories, getPosts, type Category, type PostSummary } from "@/contentful/queries/posts";
import { absoluteUrl } from "@/lib/seo";
import { contactCta, footerNav, mainNav } from "@/lib/site";

// The built pages: the main menu, contact, and legal pages; the service pages and the Branding
// page; every case study and blog post from Contentful, with the date it was last published
// (case studies) or updated (posts); and the blog's categories. If Contentful is down, the rest is still listed. Industry
// pages are added once they have content (P3-08).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let caseStudies: CaseStudySummary[] = [];
  let posts: PostSummary[] = [];
  let categories: Category[] = [];
  try {
    caseStudies = await getCaseStudies();
  } catch (error) {
    console.error("Sitemap: could not load the case studies.", error);
  }
  try {
    [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  } catch (error) {
    console.error("Sitemap: could not load the blog posts.", error);
  }

  return [
    ...[...mainNav, contactCta, ...footerNav.legal].map(({ href }) => ({ url: absoluteUrl(href) })),
    ...servicePages.flatMap(({ slug }) => {
      const place = servicePlace(slug);
      return place ? [{ url: absoluteUrl(place.path) }] : [];
    }),
    { url: absoluteUrl("/services/branding") },
    ...caseStudies.map(({ href, updatedAt }) => ({ url: absoluteUrl(href), lastModified: updatedAt })),
    ...posts.map(({ href, publishedDate, updatedDate }) => ({ url: absoluteUrl(href), lastModified: updatedDate ?? publishedDate })),
    ...categories.map(({ href }) => ({ url: absoluteUrl(href) })),
  ];
}
