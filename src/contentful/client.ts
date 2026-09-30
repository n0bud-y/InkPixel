import "server-only";
import { env } from "@/env";

const endpoint = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}`;

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

// Runs a query against Contentful's GraphQL Content API.
// `preview: true` switches to the Preview API token (draft mode only). Queries that
// should return drafts must also pass `preview: true` to each collection, e.g.
// `blogPostCollection(preview: $preview)`.
export async function contentfulQuery<T>(
  query: string,
  { variables, preview = false }: { variables?: Record<string, unknown>; preview?: boolean } = {},
): Promise<T> {
  const token = preview ? env.CONTENTFUL_PREVIEW_TOKEN : env.CONTENTFUL_DELIVERY_TOKEN;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Contentful request failed: ${response.status} ${response.statusText}`);
  }

  const json = (await response.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(`Contentful query failed: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  if (!json.data) {
    throw new Error("Contentful query returned no data");
  }

  return json.data;
}
