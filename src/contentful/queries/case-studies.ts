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

/** A title and a short text: a card, a fact (title = label, text = value), or a highlight box. */
export type CaseStudyItem = { title: string; text: string | null };

/** A link button; only set when both its label and its link are. */
export type CaseStudyButton = { label: string; href: string };

export type CaseStudySectionLayout = "image-left" | "image-right" | "image-below";

export type CaseStudyTextImageSection = {
  type: "textImage";
  id: string;
  eyebrow: string | null;
  title: string;
  body: RichTextNode;
  image: ContentfulImage;
  layout: CaseStudySectionLayout;
  facts: CaseStudyItem[];
  highlight: CaseStudyItem | null;
};

export type CaseStudyTechStackSection = {
  type: "techStack";
  id: string;
  title: string;
  /** "cards": one card per group, with its label. "tiles": every technology as a tile, in a panel. */
  layout: "cards" | "tiles";
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

export type CaseStudyCardsLayout = "timeline" | "icon-grid" | "around-image" | "steps";

export type CaseStudyCardsSection = {
  type: "cards";
  id: string;
  eyebrow: string | null;
  title: string;
  intro: string | null;
  layout: CaseStudyCardsLayout;
  image: ContentfulImage | null;
  items: CaseStudyItem[];
};

export type CaseStudyGallerySection = {
  type: "gallery";
  id: string;
  title: string;
  intro: string | null;
  images: ContentfulImage[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string | null;
  company: string | null;
  photo: ContentfulImage | null;
};

export type CaseStudyTestimonialsSection = {
  type: "testimonials";
  id: string;
  title: string;
  subtitle: string | null;
  /** Published testimonials only; the section is left out when there are none. */
  testimonials: Testimonial[];
};

export type CaseStudyCallToActionSection = {
  type: "callToAction";
  id: string;
  title: string;
  text: string | null;
  button: CaseStudyButton | null;
  image: ContentfulImage | null;
};

export type CaseStudySectionData =
  | CaseStudyTextImageSection
  | CaseStudyTechStackSection
  | CaseStudyFeatureGridSection
  | CaseStudyShowcaseSection
  | CaseStudyCardsSection
  | CaseStudyGallerySection
  | CaseStudyTestimonialsSection
  | CaseStudyCallToActionSection;

/** "split": logo, heading, and text beside the image, on white. "centered": white heading on
 *  the brand gradient with an arch, image below. "light": eyebrow, heading, text, and button
 *  centred on cream, image below. */
export type CaseStudyHeroLayout = "split" | "centered" | "light";

export type CaseStudy = {
  title: string;
  slug: string;
  excerpt: string;
  heroLayout: CaseStudyHeroLayout;
  heroEyebrow: string | null;
  heroHeading: string;
  heroText: string | null;
  heroButton: CaseStudyButton | null;
  heroImage: ContentfulImage;
  /** The hero image cut into pieces, back to front, each the size of the hero image; shown
   *  instead of it, floating. Empty when not set or when any piece is missing. */
  heroLayers: ContentfulImage[];
  /** The logo is only included once the client has approved its use. */
  client: { name: string; logo: ContentfulImage | null } | null;
  sections: CaseStudySectionData[];
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

// A case study as a project card on a service page.
export type CaseStudyCard = CaseStudySummary & {
  /** The logo is only included once the client has approved its use. */
  client: { name: string; logo: ContentfulImage | null } | null;
  highlight: string | null;
  points: string[];
};

type AssetData = {
  url: string | null;
  width: number | null;
  height: number | null;
  description: string | null;
  contentType: string | null;
} | null;

type ItemData = { title: string | null; text: string | null } | null;

type SectionData =
  | {
      __typename: "CaseStudySection";
      sys: { id: string };
      eyebrow: string | null;
      title: string | null;
      layout: string | null;
      body: { json: RichTextNode } | null;
      image: AssetData;
      factsCollection: { items: ItemData[] } | null;
      highlight: ItemData;
    }
  | {
      __typename: "CaseStudyTechStack";
      sys: { id: string };
      title: string | null;
      layout: string | null;
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
    }
  | {
      __typename: "CaseStudyCards";
      sys: { id: string };
      eyebrow: string | null;
      title: string | null;
      intro: string | null;
      layout: string | null;
      image: AssetData;
      itemsCollection: { items: ItemData[] } | null;
    }
  | {
      __typename: "CaseStudyGallery";
      sys: { id: string };
      title: string | null;
      intro: string | null;
      imagesCollection: { items: AssetData[] } | null;
    }
  | {
      __typename: "CaseStudyTestimonials";
      sys: { id: string };
      title: string | null;
      subtitle: string | null;
      testimonialsCollection: {
        items: ({
          quote: string | null;
          name: string | null;
          role: string | null;
          company: string | null;
          photo: AssetData;
        } | null)[];
      } | null;
    }
  | {
      __typename: "CaseStudyCallToAction";
      sys: { id: string };
      title: string | null;
      text: string | null;
      buttonLabel: string | null;
      buttonLink: string | null;
      image: AssetData;
    };

type CaseStudyData = {
  caseStudyCollection: {
    items: ({
      title: string | null;
      slug: string | null;
      excerpt: string | null;
      heroLayout: string | null;
      heroEyebrow: string | null;
      heroHeading: string | null;
      heroText: string | null;
      heroButtonLabel: string | null;
      heroButtonLink: string | null;
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

type ServiceCaseStudiesData = {
  caseStudyCollection: {
    items: ({
      title: string | null;
      slug: string | null;
      excerpt: string | null;
      cardHighlight: string | null;
      cardPoints: (string | null)[] | null;
      heroImage: AssetData;
      client: { name: string | null; logoApproved: boolean | null; logo: AssetData } | null;
    } | null)[];
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
        heroEyebrow
        heroHeading
        heroText
        heroButtonLabel
        heroButtonLink
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
              eyebrow
              title
              layout
              body {
                json
              }
              image {
                ...ImageFields
              }
              factsCollection(limit: 6) {
                items {
                  title
                  text
                }
              }
              highlight {
                title
                text
              }
            }
            ... on CaseStudyTechStack {
              sys {
                id
              }
              title
              layout
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
            ... on CaseStudyCards {
              sys {
                id
              }
              eyebrow
              title
              intro
              layout
              image {
                ...ImageFields
              }
              itemsCollection(limit: 9) {
                items {
                  title
                  text
                }
              }
            }
            ... on CaseStudyGallery {
              sys {
                id
              }
              title
              intro
              imagesCollection(limit: 12) {
                items {
                  ...ImageFields
                }
              }
            }
            ... on CaseStudyTestimonials {
              sys {
                id
              }
              title
              subtitle
              testimonialsCollection(limit: 6) {
                items {
                  quote
                  name
                  role
                  company
                  photo {
                    ...ImageFields
                  }
                }
              }
            }
            ... on CaseStudyCallToAction {
              sys {
                id
              }
              title
              text
              buttonLabel
              buttonLink
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

// Case studies tagged with one service (the slugs in contentful/migrations/0002), newest first.
const SERVICE_CASE_STUDIES = /* GraphQL */ `
  query ServiceCaseStudies($service: String!) {
    caseStudyCollection(where: { services_contains_some: [$service] }, limit: 12, order: [sys_firstPublishedAt_DESC]) {
      items {
        title
        slug
        excerpt
        cardHighlight
        cardPoints
        heroImage {
          ...ImageFields
        }
        client {
          name
          logoApproved
          logo {
            ...ImageFields
          }
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

const cardsLayouts: Record<string, CaseStudyCardsLayout> = {
  "Timeline beside text": "timeline",
  "Icon grid": "icon-grid",
  "Around image": "around-image",
  "Numbered steps": "steps",
};

const heroLayouts: Record<string, CaseStudyHeroLayout> = { Centered: "centered", Light: "light" };

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

// Items without a title (e.g. not published) are skipped.
const toItems = (items: ItemData[] | undefined): CaseStudyItem[] =>
  (items ?? []).flatMap((item) => (item?.title ? [{ title: item.title, text: item.text }] : []));

const toButton = (label: string | null, href: string | null): CaseStudyButton | null =>
  label && href ? { label, href } : null;

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

function toSection(item: SectionData | null): CaseStudySectionData[] {
  switch (item?.__typename) {
    case "CaseStudySection": {
      const image = toImage(item.image);
      const layout = item.layout ? layouts[item.layout] : undefined;
      if (!item.title || !item.body || !image || !layout) return [];
      const [highlight = null] = toItems([item.highlight]);
      return [
        {
          type: "textImage",
          id: item.sys.id,
          eyebrow: item.eyebrow,
          title: item.title,
          body: item.body.json,
          image,
          layout,
          facts: toItems(item.factsCollection?.items),
          highlight,
        },
      ];
    }
    case "CaseStudyTechStack": {
      const groups = (item.groupsCollection?.items ?? []).flatMap((group) => {
        const technologies = (group?.technologies ?? []).filter(isTechnologySlug);
        return group?.label && technologies.length ? [{ label: group.label, technologies }] : [];
      });
      if (!item.title || !groups.length) return [];
      return [{ type: "techStack", id: item.sys.id, title: item.title, layout: item.layout === "Tiles" ? "tiles" : "cards", groups }];
    }
    case "CaseStudyFeatureGrid": {
      const items = (item.items ?? []).filter((feature) => feature.trim());
      if (!item.title || !items.length) return [];
      return [{ type: "featureGrid", id: item.sys.id, title: item.title, intro: item.intro, items }];
    }
    case "CaseStudyShowcase": {
      const image = toImage(item.image);
      return image ? [{ type: "showcase", id: item.sys.id, image }] : [];
    }
    case "CaseStudyCards": {
      const layout = item.layout ? cardsLayouts[item.layout] : undefined;
      const items = toItems(item.itemsCollection?.items);
      if (!item.title || !layout || !items.length) return [];
      return [
        {
          type: "cards",
          id: item.sys.id,
          eyebrow: item.eyebrow,
          title: item.title,
          intro: item.intro,
          layout,
          image: toImage(item.image),
          items,
        },
      ];
    }
    case "CaseStudyGallery": {
      const images = (item.imagesCollection?.items ?? []).flatMap((asset) => toImage(asset) ?? []);
      if (!item.title || !images.length) return [];
      return [{ type: "gallery", id: item.sys.id, title: item.title, intro: item.intro, images }];
    }
    case "CaseStudyTestimonials": {
      const testimonials = (item.testimonialsCollection?.items ?? []).flatMap((testimonial) =>
        testimonial?.quote && testimonial.name
          ? [
              {
                quote: testimonial.quote,
                name: testimonial.name,
                role: testimonial.role,
                company: testimonial.company,
                photo: toImage(testimonial.photo),
              },
            ]
          : [],
      );
      if (!item.title || !testimonials.length) return [];
      return [{ type: "testimonials", id: item.sys.id, title: item.title, subtitle: item.subtitle, testimonials }];
    }
    case "CaseStudyCallToAction": {
      if (!item.title) return [];
      return [
        {
          type: "callToAction",
          id: item.sys.id,
          title: item.title,
          text: item.text,
          button: toButton(item.buttonLabel, item.buttonLink),
          image: toImage(item.image),
        },
      ];
    }
    default:
      return [];
  }
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
    heroLayout: (item.heroLayout && heroLayouts[item.heroLayout]) || "split",
    heroEyebrow: item.heroEyebrow,
    heroHeading: item.heroHeading,
    heroText: item.heroText,
    heroButton: toButton(item.heroButtonLabel, item.heroButtonLink),
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

// The published case studies tagged with a service, as project cards, newest first.
export const getServiceCaseStudies = cache(async (service: string): Promise<CaseStudyCard[]> => {
  const data = await caseStudyQuery<ServiceCaseStudiesData>(SERVICE_CASE_STUDIES, {
    variables: { service },
    tags: ["caseStudy"],
  });

  return (data?.caseStudyCollection.items ?? []).flatMap((item) => {
    const image = toImage(item?.heroImage ?? null);
    if (!item?.title || !item.slug || !item.excerpt || !image) return [];
    return [
      {
        title: item.title,
        slug: item.slug,
        href: `/case-studies/${item.slug}`,
        excerpt: item.excerpt,
        image,
        client: item.client?.name
          ? { name: item.client.name, logo: item.client.logoApproved ? toImage(item.client.logo) : null }
          : null,
        highlight: item.cardHighlight,
        points: (item.cardPoints ?? []).filter((point): point is string => Boolean(point)),
      },
    ];
  });
});
