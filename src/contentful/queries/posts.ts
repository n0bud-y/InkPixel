import "server-only";
import { ContentfulError, contentfulQuery } from "@/contentful/client";

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
