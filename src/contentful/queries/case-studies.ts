import "server-only";
import { cache } from "react";
import { isTechnologySlug, type TechnologySlug } from "@/content/technologies";
import { ContentfulError, contentfulQuery } from "@/contentful/client";
import type { RichTextNode } from "@/contentful/rich-text";

// An image from Contentful, ready for next/image. `alt` is the asset's description.
export type ContentfulImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
  /** SVGs are served as they are (next/image does not optimize them). */
  isSvg: boolean;
};

export type CaseStudySectionLayout = "image-left" | "image-right" | "image-below";

export type CaseStudyTextImageSection = {
  type: "textImage";
  id: string;
  title: string;
  body: RichTextNode;
  image: ContentfulImage;
  layout: CaseStudySectionLayout;
};

export type CaseStudyTechStackSection = {
  type: "techStack";
  id: string;
  title: string;
  groups: { label: string; technologies: TechnologySlug[] }[];
};

export type CaseStudyFeatureGridSection = {
  type: "featureGrid";
  id: string;
  title: string;
  intro: string | null;
  items: string[];
};

export type CaseStudyShowcaseSection = {
  type: "showcase";
  id: string;
  image: ContentfulImage;
};

/** "split": logo, heading, and text beside the image, on white. "centered": white heading on
 *  the brand gradient with an arch, image below. */
export type CaseStudyHeroLayout = "split" | "centered";

export type CaseStudy = {
  title: string;
  slug: string;
  excerpt: string;
  heroLayout: CaseStudyHeroLayout;
  heroHeading: string;
  heroText: string | null;
  heroImage: ContentfulImage;
  /** The hero image cut into pieces, back to front, each the size of the hero image; shown
   *  instead of it, floating. Empty when not set or when any piece is missing. */
  heroLayers: ContentfulImage[];
  /** The logo is only included once the client has approved its use. */
  client: { name: string; logo: ContentfulImage | null } | null;
  sections: (
    | CaseStudyTextImageSection
    | CaseStudyTechStackSection
    | CaseStudyFeatureGridSection
    | CaseStudyShowcaseSection
  )[];
  seo: { title: string | null; description: string | null; image: ContentfulImage | null; noIndex: boolean };
};

// A case study as listed on /case-studies (and later on cards).
export type CaseStudySummary = {
  title: string;
  slug: string;
  href: string;
  excerpt: string;
  image: ContentfulImage;
};

type AssetData = {
  url: string | null;
  width: number | null;
  height: number | null;
  description: string | null;
  contentType: string | null;
} | null;

type SectionData =
  | {
      __typename: "CaseStudySection";
      sys: { id: string };
      title: string | null;
      layout: string | null;
      body: { json: RichTextNode } | null;
      image: AssetData;
    }
  | {
      __typename: "CaseStudyTechStack";
      sys: { id: string };
      title: string | null;
      groupsCollection: { items: ({ label: string | null; technologies: string[] | null } | null)[] } | null;
    }
  | {
      __typename: "CaseStudyFeatureGrid";
      sys: { id: string };
      title: string | null;
      intro: string | null;
      items: string[] | null;
    }
  | {
      __typename: "CaseStudyShowcase";
      sys: { id: string };
      image: AssetData;
    };

type CaseStudyData = {
  caseStudyCollection: {
    items: ({
      title: string | null;
      slug: string | null;
      excerpt: string | null;
      heroLayout: string | null;
      heroHeading: string | null;
      heroText: string | null;
      heroImage: AssetData;
      heroLayersCollection: { items: AssetData[] } | null;
      client: { name: string | null; logoApproved: boolean | null; logo: AssetData } | null;
      sectionsCollection: { items: (SectionData | null)[] } | null;
      seo: { title: string | null; description: string | null; noIndex: boolean | null; image: AssetData } | null;
    } | null)[];
  };
};

type CaseStudiesData = {
  caseStudyCollection: {
    items: ({ title: string | null; slug: string | null; excerpt: string | null; heroImage: AssetData } | null)[];
  };
};

const IMAGE_FIELDS = /* GraphQL */ `
  fragment ImageFields on Asset {
    url
    width
    height
    description
    contentType
  }
`;

const CASE_STUDY = /* GraphQL */ `
  query CaseStudy($slug: String!) {
    caseStudyCollection(where: { slug: $slug }, limit: 1) {
      items {
        title
        slug
        excerpt
        heroLayout
        heroHeading
        heroText
        heroImage {
          ...ImageFields
        }
        heroLayersCollection(limit: 10) {
          items {
            ...ImageFields
          }
        }
        client {
          name
          logoApproved
          logo {
            ...ImageFields
          }
        }
        sectionsCollection(limit: 20) {
          items {
            __typename
            ... on CaseStudySection {
              sys {
                id
              }
              title
              layout
              body {
                json
              }
              image {
                ...ImageFields
              }
            }
            ... on CaseStudyTechStack {
              sys {
                id
              }
              title
              groupsCollection(limit: 6) {
                items {
                  label
                  technologies
                }
              }
            }
            ... on CaseStudyFeatureGrid {
              sys {
                id
              }
              title
              intro
              items
            }
            ... on CaseStudyShowcase {
              sys {
                id
              }
              image {
                ...ImageFields
              }
            }
          }
        }
        seo {
          title
          description
          noIndex
          image {
            ...ImageFields
          }
        }
      }
    }
  }
  ${IMAGE_FIELDS}
`;

const CASE_STUDIES = /* GraphQL */ `
  query CaseStudies {
    caseStudyCollection(limit: 100, order: [sys_firstPublishedAt_DESC]) {
      items {
        title
        slug
        excerpt
        heroImage {
          ...ImageFields
        }
      }
    }
  }
  ${IMAGE_FIELDS}
`;

const layouts: Record<string, CaseStudySectionLayout> = {
  "Image left": "image-left",
  "Image right": "image-right",
  "Image below": "image-below",
};

function toImage(asset: AssetData): ContentfulImage | null {
  if (!asset?.url || !asset.width || !asset.height) return null;
  return {
    url: asset.url.startsWith("//") ? `https:${asset.url}` : asset.url,
    width: asset.width,
    height: asset.height,
    alt: asset.description ?? "",
    isSvg: asset.contentType === "image/svg+xml",
  };
}

// Hero layers are all or nothing: with one missing (e.g. not published), the picture would
// have a hole, so the single hero image is shown instead.
function toLayers(assets: AssetData[]): ContentfulImage[] {
  const layers = assets.map(toImage);
  return layers.every((layer): layer is ContentfulImage => layer !== null) ? layers : [];
}

// True when the space doesn't have the case-study content model yet (migration not run).
const isMissingCaseStudyType = (error: unknown) =>
  error instanceof ContentfulError &&
  error.messages.some((message) => message.includes('Cannot query field "caseStudyCollection"'));

// Runs a case-study query. Before the content model exists, returns null with a warning
// (an expected setup state, not an error).
async function caseStudyQuery<T>(query: string, options: Parameters<typeof contentfulQuery>[1]) {
  try {
    return await contentfulQuery<T>(query, options);
  } catch (error) {
    if (!isMissingCaseStudyType(error)) throw error;
    console.warn(
      "Contentful has no case study type yet, so no case studies are shown. Run: npm run contentful:migrate -- contentful/migrations/0002-case-study-model.cjs",
    );
    return null;
  }
}

function toSection(item: SectionData | null): CaseStudy["sections"] {
  if (item?.__typename === "CaseStudySection") {
    const image = toImage(item.image);
    const layout = item.layout ? layouts[item.layout] : undefined;
    if (!item.title || !item.body || !image || !layout) return [];
    return [{ type: "textImage", id: item.sys.id, title: item.title, body: item.body.json, image, layout }];
  }
  if (item?.__typename === "CaseStudyTechStack") {
    const groups = (item.groupsCollection?.items ?? []).flatMap((group) => {
      const technologies = (group?.technologies ?? []).filter(isTechnologySlug);
      return group?.label && technologies.length ? [{ label: group.label, technologies }] : [];
    });
    if (!item.title || !groups.length) return [];
    return [{ type: "techStack", id: item.sys.id, title: item.title, groups }];
  }
  if (item?.__typename === "CaseStudyFeatureGrid") {
    const items = (item.items ?? []).filter((feature) => feature.trim());
    if (!item.title || !items.length) return [];
    return [{ type: "featureGrid", id: item.sys.id, title: item.title, intro: item.intro, items }];
  }
  if (item?.__typename === "CaseStudyShowcase") {
    const image = toImage(item.image);
    return image ? [{ type: "showcase", id: item.sys.id, image }] : [];
  }
  return [];
}

// One published case study, or null if there is none with this slug. Incomplete sections
// (e.g. a linked image that is not published) are skipped rather than shown half-empty.
// Cached per request, so the page and its metadata share one query.
export const getCaseStudy = cache(async (slug: string): Promise<CaseStudy | null> => {
  const data = await caseStudyQuery<CaseStudyData>(CASE_STUDY, {
    variables: { slug },
    tags: ["caseStudy", `caseStudy:${slug}`],
  });
  const item = data?.caseStudyCollection.items[0];
  if (!item) return null;

  const heroImage = toImage(item.heroImage);
  if (!item.title || !item.slug || !item.excerpt || !item.heroHeading || !heroImage) {
    console.warn(`Case study "${slug}" is missing its title, excerpt, hero heading, or hero image, so it is not shown.`);
    return null;
  }

  return {
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    heroLayout: item.heroLayout === "Centered" ? "centered" : "split",
    heroHeading: item.heroHeading,
    heroText: item.heroText,
    heroImage,
    heroLayers: toLayers(item.heroLayersCollection?.items ?? []),
    client: item.client?.name
      ? { name: item.client.name, logo: item.client.logoApproved ? toImage(item.client.logo) : null }
      : null,
    sections: (item.sectionsCollection?.items ?? []).flatMap(toSection),
    seo: {
      title: item.seo?.title ?? null,
      description: item.seo?.description ?? null,
      image: toImage(item.seo?.image ?? null),
      noIndex: item.seo?.noIndex ?? false,
    },
  };
});

// Every published case study, newest first.
export const getCaseStudies = cache(async (): Promise<CaseStudySummary[]> => {
  const data = await caseStudyQuery<CaseStudiesData>(CASE_STUDIES, { tags: ["caseStudy"] });

  return (data?.caseStudyCollection.items ?? []).flatMap((item) => {
    const image = toImage(item?.heroImage ?? null);
    if (!item?.title || !item.slug || !item.excerpt || !image) return [];
    return [{ title: item.title, slug: item.slug, href: `/case-studies/${item.slug}`, excerpt: item.excerpt, image }];
  });
});
