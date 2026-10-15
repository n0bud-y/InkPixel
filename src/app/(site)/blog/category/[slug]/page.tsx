import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing } from "@/components/blog/BlogListing";
import { PageSchema } from "@/components/seo/PageSchema";
import { blog } from "@/content/blog";
import { getCategories, getCategory, getPosts } from "@/contentful/queries/posts";
import { breadcrumbSchema, pageMetadataFromCms } from "@/lib/seo";

// Every category with posts is built ahead of time; one added later renders on its first visit.
export async function generateStaticParams() {
  return (await getCategories()).map(({ slug }) => ({ slug }));
}

// A Page SEO entry in Contentful for this address takes over, if editors add one.
export async function generateMetadata(props: PageProps<"/blog/category/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const category = await getCategory(slug);
  if (!category) return {};
  return pageMetadataFromCms({
    title: `${category.title} articles`,
    description: blog.categoryIntro.replace("{category}", category.title.toLowerCase()),
    path: category.href,
  });
}

// One category's posts, newest first (the newest featured), with the category pills and, past
// ten posts, page numbers. A category that doesn't exist is a 404; one without posts says so.
export default async function CategoryPage(props: PageProps<"/blog/category/[slug]">) {
  const { slug } = await props.params;
  const [category, posts, categories] = await Promise.all([getCategory(slug), getPosts(), getCategories()]);
  if (!category) notFound();

  return (
    <>
      <PageSchema
        path={category.href}
        items={[
          breadcrumbSchema([
            { name: blog.title, path: "/blog" },
            { name: category.title, path: category.href },
          ]),
        ]}
      />
      <BlogListing
        posts={posts.filter((post) => post.categorySlug === slug)}
        categories={categories}
        category={category}
        page={1}
      />
    </>
  );
}
