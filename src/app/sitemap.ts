import type { MetadataRoute } from "next";
import { corePages } from "@/content/core-pages";
import { servicePages, servicePlace } from "@/content/service-pages";
import { getCaseStudies, type CaseStudySummary } from "@/contentful/queries/case-studies";
import { getCategories, getPosts, type Category, type PostSummary } from "@/contentful/queries/posts";
import { getProducts, type ProductSummary } from "@/contentful/queries/products";
import { absoluteUrl } from "@/lib/seo";
import { contactCta, features, footerNav, mainNav } from "@/lib/site";

// The built pages: the main menu, contact, and legal pages; the core service and service pages
// (dummy ones included, issue I12); every case study, product, and blog post from Contentful, with the date it was last published
// (case studies) or updated (posts); and the blog's categories. If Contentful is down, the rest is still listed. Industry
// pages are added once they have content (P3-08).
// Placeholder pages, left out (and noindex) until they are built: Industries (P3-08) and Technologies.
const unbuilt = ["/industries", "/technologies"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let caseStudies: CaseStudySummary[] = [];
  let products: ProductSummary[] = [];
  let posts: PostSummary[] = [];
  let categories: Category[] = [];
  try {
    caseStudies = await getCaseStudies();
  } catch (error) {
    console.error("Sitemap: could not load the case studies.", error);
  }
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Sitemap: could not load the products.", error);
  }
  // Left out while the blog is switched off (features.blog).
  if (features.blog) {
    try {
      [posts, categories] = await Promise.all([getPosts(), getCategories()]);
    } catch (error) {
      console.error("Sitemap: could not load the blog posts.", error);
    }
  }

  return [
    ...[...mainNav, contactCta, ...footerNav.legal]
      .filter(({ href }) => !unbuilt.includes(href))
      .map(({ href }) => ({ url: absoluteUrl(href) })),
    ...servicePages.flatMap(({ slug }) => {
      const place = servicePlace(slug);
      return place ? [{ url: absoluteUrl(place.path) }] : [];
    }),
    ...corePages.map(({ category }) => ({ url: absoluteUrl(`/services/${category.slug}`) })),
    ...caseStudies.map(({ href, updatedAt }) => ({ url: absoluteUrl(href), lastModified: updatedAt })),
    ...products.map(({ href, updatedAt }) => ({ url: absoluteUrl(href), lastModified: updatedAt })),
    ...posts.map(({ href, publishedDate, updatedDate }) => ({ url: absoluteUrl(href), lastModified: updatedDate ?? publishedDate })),
    ...categories.map(({ href }) => ({ url: absoluteUrl(href) })),
  ];
}
