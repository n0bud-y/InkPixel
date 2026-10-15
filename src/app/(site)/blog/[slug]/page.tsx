import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { PageSchema } from "@/components/seo/PageSchema";
import { blog } from "@/content/blog";
import { getPost, getPosts, type Post } from "@/contentful/queries/posts";
import { ArticleBody, articleHeadings } from "@/contentful/rich-text";
import { absoluteUrl, blogPostingSchema, breadcrumbSchema, pageMetadata, toShareImage } from "@/lib/seo";

// Meta title, description, canonical URL, and share image: the post's SEO entry in Contentful
// (its title used as typed), or the post's title, excerpt, address, and cover image.
function seoOf(post: Post) {
  return {
    title: post.seo.title ? { absolute: post.seo.title } : post.title,
    description: post.seo.description ?? post.excerpt ?? `${post.title}: an article from the Ink Pixel Studios blog.`,
    path: post.href,
    canonical: post.seo.canonical,
    image: post.seo.image ?? post.coverImage,
  };
}

// Every published post is built ahead of time; one published later renders on its first visit
// and is then cached like the rest.
export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};
  const { image, ...seo } = seoOf(post);
  return pageMetadata({
    ...seo,
    image: image ? toShareImage(image) : undefined,
    article: { publishedTime: post.publishedDate, modifiedTime: post.updatedDate ?? post.publishedDate },
    noIndex: post.seo.noIndex,
  });
}

// A blog post from Contentful: the header and cover on navy; on white, the table of contents
// (when the post has headings) beside the text, then the share buttons and the author; then more
// posts.
export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const [post, posts] = await Promise.all([getPost(slug), getPosts()]);
  if (!post) notFound();
  const seo = seoOf(post);
  const shareUrl = absoluteUrl(post.href);
  const headings = articleHeadings(post.body);

  return (
    <>
      <PageSchema
        path={post.href}
        custom={post.seo.jsonLd}
        items={[
          breadcrumbSchema([
            { name: blog.title, path: "/blog" },
            { name: post.category, path: `/blog/category/${post.categorySlug}` },
            { name: post.title, path: post.href },
          ]),
          blogPostingSchema({
            title: post.title,
            description: seo.description,
            path: post.href,
            image: seo.image?.url ?? null,
            publishedTime: post.publishedDate,
            modifiedTime: post.updatedDate ?? post.publishedDate,
            category: post.category,
            author: post.author,
          }),
        ]}
      />
      <article>
        <ArticleHeader post={post} shareUrl={shareUrl} />
        <div className="bg-white">
          <div
            className={[
              "container-site py-[clamp(3rem,5vw,6rem)]",
              headings.length > 0
                ? "grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,15rem)_minmax(0,46rem)] lg:justify-center lg:gap-[clamp(3rem,5vw,6rem)]"
                : "",
            ].join(" ")}
          >
            {headings.length > 0 && <TableOfContents headings={headings} />}
            <div className={headings.length > 0 ? "" : "mx-auto max-w-[46rem]"}>
              <ArticleBody document={post.body} links={post.links} />
              <div className="mt-[clamp(3rem,4vw,4.5rem)] flex flex-col gap-8 border-t border-primary/10 pt-8">
                <ShareButtons url={shareUrl} title={post.title} tone="onLight" />
                {post.author && <AuthorCard author={post.author} />}
              </div>
            </div>
          </div>
        </div>
      </article>
      <RelatedPosts current={post} posts={posts} />
    </>
  );
}
