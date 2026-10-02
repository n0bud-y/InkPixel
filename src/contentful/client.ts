import "server-only";
import { env } from "@/env";

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}`;

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

// A failed Contentful request, with Contentful's own error messages.
export class ContentfulError extends Error {
  constructor(
    readonly status: number,
    readonly messages: string[],
  ) {
    super(`Contentful request failed (${status}): ${messages.join("; ")}`);
    this.name = "ContentfulError";
  }
}

type QueryOptions = {
  variables?: Record<string, unknown>;
  preview?: boolean;
  /** Cache tags, so the publish webhook can refresh this data with revalidateTag (P3-03). */
  tags?: string[];
  /** Seconds before the cached result is refreshed in the background. */
  revalidate?: number;
};

// Runs a query against Contentful's GraphQL Content API.
// Published content is cached (Next.js fetch cache): pages are built with it and refreshed
// after `revalidate` seconds or when one of their `tags` is revalidated.
// `preview: true` switches to the Preview API token (draft mode only) and skips the cache.
// Queries that should return drafts must also pass `preview: true` to each collection,
// e.g. `postCollection(preview: $preview)`.
export async function contentfulQuery<T>(
  query: string,
  { variables, preview = false, tags, revalidate = 3600 }: QueryOptions = {},
): Promise<T> {
  const token = preview ? env.CONTENTFUL_PREVIEW_TOKEN : env.CONTENTFUL_DELIVERY_TOKEN;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
    // POST requests with a token are only cached when asked for explicitly.
    ...(preview ? { cache: "no-store" } : { cache: "force-cache", next: { revalidate, tags } }),
  });

  // GraphQL errors (e.g. a field that doesn't exist) arrive as JSON, often with a 400 status.
  const json = (await response.json().catch(() => ({}))) as GraphQLResponse<T>;
  if (!response.ok || json.errors?.length) {
    throw new ContentfulError(
      response.status,
      json.errors?.map((e) => e.message) ?? [response.statusText],
    );
  }
  if (!json.data) {
    throw new Error("Contentful query returned no data");
  }

  return json.data;
}
