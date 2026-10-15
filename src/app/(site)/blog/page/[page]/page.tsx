import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogListing, laterPage, laterPages } from "@/components/blog/BlogListing";
import { PageSchema } from "@/components/seo/PageSchema";
import { blog } from "@/content/blog";
import { getCategories, getPosts } from "@/contentful/queries/posts";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

// Every later page of the blog is built ahead of time; pages that new posts add render on their
// first visit.
export async function generateStaticParams() {
  return laterPages((await getPosts()).length);
}

export async function generateMetadata(props: PageProps<"/blog/page/[page]">): Promise<Metadata> {
  const { page: value } = await props.params;
  const page = laterPage(value, (await getPosts()).length);
  if (!page) return {};
  return pageMetadata({ title: `Blog: page ${page}`, description: blog.description, path: `/blog/page/${page}` });
}

// Page 2 onwards of "Insights" (page 1 is /blog).
export default async function BlogPageNumber(props: PageProps<"/blog/page/[page]">) {
  const { page: value } = await props.params;
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const page = laterPage(value, posts.length);
  if (!page) notFound();

  return (
    <>
      <PageSchema
        path={`/blog/page/${page}`}
        items={[
          breadcrumbSchema([
            { name: blog.title, path: "/blog" },
            { name: `Page ${page}`, path: `/blog/page/${page}` },
          ]),
        ]}
      />
      <BlogListing posts={posts} categories={categories} page={page} />
    </>
  );
}
