import "server-only";
import { cache } from "react";
import { ContentfulError, contentfulQuery } from "@/contentful/client";
import { IMAGE_FIELDS, toImage, type AssetData, type ContentfulImage } from "./case-studies";

// A blog post as shown on article cards (home page "From the studio.", later the blog listing).
export type PostSummary = {
  title: string;
  slug: string;
  href: string;
  category: string;
  /** ISO date, e.g. "2026-03-01". */
  publishedDate: string;
  readingMinutes: number;
};

type RichTextNode = { nodeType: string; value?: string; content?: RichTextNode[] };

type LatestPostsData = {
  postCollection: {
    items: ({
      title: string | null;
      slug: string | null;
      publishedDate: string | null;
      category: { title: string | null } | null;
      body: { json: RichTextNode } | null;
    } | null)[];
  };
};

const LATEST_POSTS = /* GraphQL */ `
  query LatestPosts($limit: Int!) {
    postCollection(limit: $limit, order: [publishedDate_DESC]) {
      items {
        title
        slug
        publishedDate
        category {
          title
        }
        body {
          json
        }
      }
    }
  }
`;

const WORDS_PER_MINUTE = 200;

// Reading time from the article text, rounded up, at least one minute.
function readingMinutes(node: RichTextNode | undefined): number {
  const words = (current: RichTextNode | undefined): number =>
    (current?.value?.split(/\s+/).filter(Boolean).length ?? 0) +
    (current?.content ?? []).reduce((total, child) => total + words(child), 0);
  return Math.max(1, Math.ceil(words(node) / WORDS_PER_MINUTE));
}

// True when the space doesn't have the blog content model yet (migration not run).
const isMissingPostType = (error: unknown) =>
  error instanceof ContentfulError &&
  error.messages.some((message) => message.includes('Cannot query field "postCollection"'));

// The newest published posts. Incomplete entries (e.g. a linked category that is not
// published) are skipped rather than shown half-empty. Before the blog content model exists,
// returns none with a warning (an expected setup state, not an error).
export async function getLatestPosts(limit = 3): Promise<PostSummary[]> {
  let data: LatestPostsData;
  try {
    data = await contentfulQuery<LatestPostsData>(LATEST_POSTS, {
      variables: { limit },
      tags: ["post"],
    });
  } catch (error) {
    if (!isMissingPostType(error)) throw error;
    console.warn(
      "Contentful has no blog post type yet, so no posts are shown. Run: npm run contentful:migrate -- contentful/migrations/0001-blog-model.cjs",
    );
    return [];
  }
  const { postCollection } = data;

  return postCollection.items.flatMap((item) => {
    if (!item?.title || !item.slug || !item.publishedDate || !item.category?.title) return [];
    return [
      {
        title: item.title,
        slug: item.slug,
        href: `/blog/${item.slug}`,
        category: item.category.title,
        publishedDate: item.publishedDate,
        readingMinutes: readingMinutes(item.body?.json),
      },
    ];
  });
}

// A post's search and sharing fields, for its page's metadata (the article template is P3-11).
export type PostSeo = {
  title: string;
  slug: string;
  excerpt: string | null;
  /** ISO dates. */
  publishedDate: string;
  updatedDate: string | null;
  coverImage: ContentfulImage | null;
  /** The linked SEO entry: the title is used as typed; canonical replaces the page's address. */
  seo: {
    title: string | null;
    description: string | null;
    canonical: string | null;
    image: ContentfulImage | null;
    noIndex: boolean;
    /** Schema pasted by editors (JSON-LD, migration 0008), as stored; read with customSchema(). */
    jsonLd: unknown;
  };
};

type PostSeoData = {
  postCollection: {
    items: ({
      title: string | null;
      slug: string | null;
      excerpt: string | null;
      publishedDate: string | null;
      updatedDate: string | null;
      coverImage: AssetData;
      seo: {
        title: string | null;
        description: string | null;
        canonical: string | null;
        noIndex: boolean | null;
        image: AssetData;
        jsonLd: unknown;
      } | null;
    } | null)[];
  };
};

const POST_SEO = /* GraphQL */ `
  query PostSeo($slug: String!) {
    postCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        excerpt
        publishedDate
        updatedDate
        coverImage {
          ...ImageFields
        }
        seo {
          title
          description
          canonical
          noIndex
          image {
            ...ImageFields
          }
          jsonLd
        }
      }
    }
  }
  ${IMAGE_FIELDS}
`;

// A published post's search fields, or null when there is no such post. Cached per request, so
// the page and its metadata share one query.
export const getPostSeo = cache(async (slug: string): Promise<PostSeo | null> => {
  const data = await contentfulQuery<PostSeoData>(POST_SEO, {
    variables: { slug },
    tags: ["post", `post:${slug}`],
  });
  const item = data.postCollection.items[0];
  if (!item?.title || !item.slug || !item.publishedDate) return null;
  return {
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    publishedDate: item.publishedDate,
    updatedDate: item.updatedDate,
    coverImage: toImage(item.coverImage),
    seo: {
      title: item.seo?.title ?? null,
      description: item.seo?.description ?? null,
      canonical: item.seo?.canonical ?? null,
      image: toImage(item.seo?.image ?? null),
      noIndex: item.seo?.noIndex ?? false,
      jsonLd: item.seo?.jsonLd ?? null,
    },
  };
});
