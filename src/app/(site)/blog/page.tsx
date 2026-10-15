import type { Metadata } from "next";
import { BlogListing } from "@/components/blog/BlogListing";
import { PageSchema } from "@/components/seo/PageSchema";
import { blog } from "@/content/blog";
import { getCategories, getPosts } from "@/contentful/queries/posts";
import { breadcrumbSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback (stand-in description, issue I9).
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({ title: "Blog", description: blog.description, path: "/blog" });
}

// "Insights": every post from Contentful, newest first (the newest featured), with the category
// pills and, past ten posts, page numbers.
export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  return (
    <>
      <PageSchema path="/blog" items={[breadcrumbSchema([{ name: blog.title, path: "/blog" }])]} />
      <BlogListing posts={posts} categories={categories} page={1} />
    </>
  );
}
