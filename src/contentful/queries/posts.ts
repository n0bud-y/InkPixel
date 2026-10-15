import "server-only";
import { cache } from "react";
import { ContentfulError, contentfulQuery } from "@/contentful/client";
import type { RichTextLinks, RichTextNode } from "@/contentful/rich-text";
import { IMAGE_FIELDS, toImage, type AssetData, type ContentfulImage } from "./case-studies";

// A blog post as shown on article cards (home page "From the studio.", the blog listing,
// related posts).
export type PostSummary = {
  title: string;
  slug: string;
  href: string;
  category: string;
  categorySlug: string;
  excerpt: string | null;
  coverImage: ContentfulImage | null;
  /** ISO date, e.g. "2026-03-01". */
  publishedDate: string;
  updatedDate: string | null;
  readingMinutes: number;
};

export type Category = { title: string; slug: string; href: string };

type CategoryData = { title: string | null; slug: string | null } | null;

type PostsData = {
  postCollection: {
    items: ({
      title: string | null;
      slug: string | null;
      excerpt: string | null;
      publishedDate: string | null;
      updatedDate: string | null;
      category: CategoryData;
      coverImage: AssetData;
      body: { json: RichTextNode } | null;
    } | null)[];
  };
};

// The blog lists every post from one query, newest first; past about 100 posts, page through
// Contentful instead (and the listing's pages with it).
const POSTS = /* GraphQL */ `
  query Posts($limit: Int!) {
    postCollection(limit: $limit, order: [publishedDate_DESC]) {
      items {
        title
        slug
        excerpt
        publishedDate
        updatedDate
        category {
          title
          slug
        }
        coverImage {
          ...ImageFields
        }
        body {
          json
        }
      }
    }
  }
  ${IMAGE_FIELDS}
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

const toCategory = (category: CategoryData): Category | null =>
  category?.title && category.slug
    ? { title: category.title, slug: category.slug, href: `/blog/category/${category.slug}` }
    : null;

// The newest published posts (all of them, up to 100, by default). Incomplete entries (e.g. a
// linked category that is not published) are skipped rather than shown half-empty. Before the
// blog content model exists, returns none with a warning (an expected setup state, not an error).
export const getPosts = cache(async (limit = 100): Promise<PostSummary[]> => {
  let data: PostsData;
  try {
    data = await contentfulQuery<PostsData>(POSTS, { variables: { limit }, tags: ["post"] });
  } catch (error) {
    if (!isMissingPostType(error)) throw error;
    console.warn(
      "Contentful has no blog post type yet, so no posts are shown. Run: npm run contentful:migrate -- contentful/migrations/0001-blog-model.cjs",
    );
    return [];
  }

  return data.postCollection.items.flatMap((item) => {
    const category = toCategory(item?.category ?? null);
    if (!item?.title || !item.slug || !item.publishedDate || !category) return [];
    return [
      {
        title: item.title,
        slug: item.slug,
        href: `/blog/${item.slug}`,
        category: category.title,
        categorySlug: category.slug,
        excerpt: item.excerpt,
        coverImage: toImage(item.coverImage),
        publishedDate: item.publishedDate,
        updatedDate: item.updatedDate,
        readingMinutes: readingMinutes(item.body?.json),
      },
    ];
  });
});

// The home page's newest posts.
export const getLatestPosts = (limit = 3) => getPosts(limit);

// The categories that have posts, in the order of their newest post.
export async function getCategories(): Promise<Category[]> {
  const posts = await getPosts();
  const seen = new Map<string, Category>();
  for (const post of posts) {
    if (!seen.has(post.categorySlug)) {
      seen.set(post.categorySlug, { title: post.category, slug: post.categorySlug, href: `/blog/category/${post.categorySlug}` });
    }
  }
  return [...seen.values()];
}

type CategoryBySlugData = { categoryCollection: { items: CategoryData[] } };

const CATEGORY = /* GraphQL */ `
  query Category($slug: String!) {
    categoryCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
      }
    }
  }
`;

// A published category, or null when there is no such category (one without posts still has
// its page, which says so).
export const getCategory = cache(async (slug: string): Promise<Category | null> => {
  const data = await contentfulQuery<CategoryBySlugData>(CATEGORY, {
    variables: { slug },
    tags: ["post", "category"],
  });
  return toCategory(data.categoryCollection.items[0] ?? null);
});

// --- One article ------------------------------------------------------------------------------

export type Author = {
  name: string;
  role: string | null;
  bio: string | null;
  photo: ContentfulImage | null;
  links: string[];
};

export type Post = PostSummary & {
  body: RichTextNode;
  links: RichTextLinks;
  author: Author | null;
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

type PostData = {
  postCollection: {
    items: ({
      title: string | null;
      slug: string | null;
      excerpt: string | null;
      publishedDate: string | null;
      updatedDate: string | null;
      category: CategoryData;
      coverImage: AssetData;
      author: {
        name: string | null;
        role: string | null;
        bio: string | null;
        links: string[] | null;
        photo: AssetData;
      } | null;
      body: {
        json: RichTextNode;
        links: {
          assets: { block: ((AssetData & { sys: { id: string } }) | null)[] };
          entries: {
            hyperlink: ({ __typename: string; sys: { id: string }; slug?: string | null } | null)[];
          };
        };
      } | null;
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

const POST = /* GraphQL */ `
  query Post($slug: String!) {
    postCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        excerpt
        publishedDate
        updatedDate
        category {
          title
          slug
        }
        coverImage {
          ...ImageFields
        }
        author {
          name
          role
          bio
          links
          photo {
            ...ImageFields
          }
        }
        body {
          json
          links {
            assets {
              block {
                sys {
                  id
                }
                ...ImageFields
              }
            }
            entries {
              hyperlink {
                __typename
                sys {
                  id
                }
                ... on Post {
                  slug
                }
                ... on CaseStudy {
                  slug
                }
              }
            }
          }
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

// Where a link to another entry goes: posts and case studies; other entries aren't linked.
const entryHref = (entry: { __typename: string; slug?: string | null }) =>
  !entry.slug ? null : entry.__typename === "Post" ? `/blog/${entry.slug}` : entry.__typename === "CaseStudy" ? `/case-studies/${entry.slug}` : null;

// A published post with everything its page shows, or null when there is no such post. Cached
// per request, so the page and its metadata share one query.
export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const data = await contentfulQuery<PostData>(POST, {
    variables: { slug },
    tags: ["post", `post:${slug}`],
  });
  const item = data.postCollection.items[0];
  const category = toCategory(item?.category ?? null);
  if (!item?.title || !item.slug || !item.publishedDate || !category || !item.body) return null;

  const images = new Map(
    item.body.links.assets.block.flatMap((asset) => {
      const image = asset && toImage(asset);
      return asset && image ? [[asset.sys.id, image] as const] : [];
    }),
  );
  const hrefs = new Map(
    item.body.links.entries.hyperlink.flatMap((entry) => {
      const href = entry && entryHref(entry);
      return entry && href ? [[entry.sys.id, href] as const] : [];
    }),
  );

  return {
    title: item.title,
    slug: item.slug,
    href: `/blog/${item.slug}`,
    category: category.title,
    categorySlug: category.slug,
    excerpt: item.excerpt,
    coverImage: toImage(item.coverImage),
    publishedDate: item.publishedDate,
    updatedDate: item.updatedDate,
    readingMinutes: readingMinutes(item.body.json),
    body: item.body.json,
    links: { images, hrefs },
    author: item.author?.name
      ? {
          name: item.author.name,
          role: item.author.role,
          bio: item.author.bio,
          photo: toImage(item.author.photo),
          links: item.author.links ?? [],
        }
      : null,
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
