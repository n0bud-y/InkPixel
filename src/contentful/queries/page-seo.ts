import "server-only";
import { cache } from "react";
import { ContentfulError, contentfulQuery } from "@/contentful/client";
import { IMAGE_FIELDS, toImage, type AssetData, type ContentfulImage } from "./case-studies";

// A Page SEO entry: the search and sharing settings of a page whose content is in code
// (migration 0007). The title is used exactly as typed.
export type PageSeoEntry = {
  title: string;
  description: string;
  canonical: string | null;
  image: ContentfulImage | null;
  noIndex: boolean;
};

type PageSeoData = {
  pageSeoCollection: {
    items: ({
      path: string | null;
      title: string | null;
      description: string | null;
      canonical: string | null;
      noIndex: boolean | null;
      image: AssetData;
    } | null)[];
  };
};

const PAGE_SEO = /* GraphQL */ `
  query PageSeo {
    pageSeoCollection(limit: 200) {
      items {
        path
        title
        description
        canonical
        noIndex
        image {
          ...ImageFields
        }
      }
    }
  }
  ${IMAGE_FIELDS}
`;

// Every published Page SEO entry, by page address: one query for all pages, cached per request
// and in the fetch cache (tag "pageSeo"). If Contentful can't be reached, or the model doesn't
// exist yet, there are none and pages use the text in their code.
const getAllPageSeo = cache(async (): Promise<Map<string, PageSeoEntry>> => {
  let data: PageSeoData;
  try {
    data = await contentfulQuery<PageSeoData>(PAGE_SEO, { tags: ["pageSeo"] });
  } catch (error) {
    const missingModel =
      error instanceof ContentfulError &&
      error.messages.some((message) => message.includes('Cannot query field "pageSeoCollection"'));
    if (missingModel) {
      console.warn("Contentful has no Page SEO type yet. Run: npm run contentful:migrate -- contentful/migrations/0007-page-seo.cjs");
    } else {
      console.error("Could not load the Page SEO entries; pages use the text in their code.", error);
    }
    return new Map();
  }

  return new Map(
    data.pageSeoCollection.items.flatMap((item) => {
      if (!item?.path || !item.title || !item.description) return [];
      const entry: PageSeoEntry = {
        title: item.title,
        description: item.description,
        canonical: item.canonical,
        image: toImage(item.image),
        noIndex: item.noIndex ?? false,
      };
      return [[item.path, entry] as const];
    }),
  );
});

// The Page SEO entry for a page address (e.g. "/about"), or null when there is none.
export async function getPageSeo(path: string): Promise<PageSeoEntry | null> {
  return (await getAllPageSeo()).get(path) ?? null;
}
