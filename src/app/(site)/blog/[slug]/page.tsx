import type { Metadata } from "next";
import { PageSchema } from "@/components/seo/PageSchema";
import { getPostSeo, type PostSeo } from "@/contentful/queries/posts";
import { breadcrumbSchema, pageMetadata, titleFromSlug, toShareImage } from "@/lib/seo";

// The post from Contentful, or null when there is none (or Contentful can't be reached).
async function postFor(slug: string): Promise<PostSeo | null> {
  try {
    return await getPostSeo(slug);
  } catch (error) {
    console.error(`Blog post "${slug}": could not load its search fields.`, error);
    return null;
  }
}

// Meta title, description, canonical URL, and share image: the post's SEO entry in Contentful
// (its title used as typed), or the post's title, excerpt, and cover image; for an address with
// no post, a title from the address. The article template and BlogPosting structured data come
// in P3-11.
export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const path = `/blog/${slug}`;
  const post = await postFor(slug);
  if (!post) {
    const title = titleFromSlug(slug);
    return pageMetadata({ title, description: `${title}: an article from the Ink Pixel Studios blog.`, path });
  }

  const image = post.seo.image ?? post.coverImage;
  return pageMetadata({
    title: post.seo.title ? { absolute: post.seo.title } : post.title,
    description: post.seo.description ?? post.excerpt ?? `${post.title}: an article from the Ink Pixel Studios blog.`,
    path,
    canonical: post.seo.canonical,
    image: image ? toShareImage(image) : undefined,
    article: { publishedTime: post.publishedDate, modifiedTime: post.updatedDate ?? post.publishedDate },
    noIndex: post.seo.noIndex,
  });
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await postFor(slug);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <PageSchema
        path={`/blog/${slug}`}
        custom={post?.seo.jsonLd}
        items={[
          breadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: post?.title ?? titleFromSlug(slug), path: `/blog/${slug}` },
          ]),
        ]}
      />
      <h1 className="text-4xl font-semibold">Article: {slug}</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The article template comes in P3-11.
      </p>
    </div>
  );
}
