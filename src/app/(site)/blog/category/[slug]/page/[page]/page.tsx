import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing, laterPage, laterPages } from "@/components/blog/BlogListing";
import { PageSchema } from "@/components/seo/PageSchema";
import { blog } from "@/content/blog";
import { getCategories, getCategory, getPosts } from "@/contentful/queries/posts";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const postsIn = async (slug: string) => (await getPosts()).filter((post) => post.categorySlug === slug);

// Every later page of each category is built ahead of time; pages that new posts add render on
// their first visit.
export async function generateStaticParams() {
  const categories = await getCategories();
  const pages = await Promise.all(
    categories.map(async ({ slug }) => laterPages((await postsIn(slug)).length).map(({ page }) => ({ slug, page }))),
  );
  return pages.flat();
}

export async function generateMetadata(props: PageProps<"/blog/category/[slug]/page/[page]">): Promise<Metadata> {
  const { slug, page: value } = await props.params;
  const [category, posts] = await Promise.all([getCategory(slug), postsIn(slug)]);
  const page = laterPage(value, posts.length);
  if (!category || !page) return {};
  return pageMetadata({
    title: `${category.title} articles: page ${page}`,
    description: blog.categoryIntro.replace("{category}", category.title.toLowerCase()),
    path: `${category.href}/page/${page}`,
  });
}

// Page 2 onwards of a category (page 1 is /blog/category/<slug>).
export default async function CategoryPageNumber(props: PageProps<"/blog/category/[slug]/page/[page]">) {
  const { slug, page: value } = await props.params;
  const [category, posts, categories] = await Promise.all([getCategory(slug), postsIn(slug), getCategories()]);
  const page = laterPage(value, posts.length);
  if (!category || !page) notFound();

  return (
    <>
      <PageSchema
        path={`${category.href}/page/${page}`}
        items={[
          breadcrumbSchema([
            { name: blog.title, path: "/blog" },
            { name: category.title, path: category.href },
            { name: `Page ${page}`, path: `${category.href}/page/${page}` },
          ]),
        ]}
      />
      <BlogListing posts={posts} categories={categories} category={category} page={page} />
    </>
  );
}
