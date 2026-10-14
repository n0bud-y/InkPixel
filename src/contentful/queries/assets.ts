import "server-only";
import { cache } from "react";
import { contentfulQuery } from "@/contentful/client";

type AssetData = { asset: { url: string | null } | null };

const ASSET = /* GraphQL */ `
  query Asset($id: String!) {
    asset(id: $id) {
      url
    }
  }
`;

// The address of a file uploaded to Contentful (e.g. a video), by its asset id; null when the
// asset has no file. Tagged so the publish webhook can refresh it (P3-03).
export const getAssetUrl = cache(async (id: string): Promise<string | null> => {
  const data = await contentfulQuery<AssetData>(ASSET, {
    variables: { id },
    tags: ["asset", `asset:${id}`],
  });
  return data.asset?.url ?? null;
});
