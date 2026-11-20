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

export type CaseStudyCardsLayout = "timeline" | "story" | "icon-grid" | "around-image" | "steps";

export type CaseStudyCardsSection = {
  type: "cards";
  id: string;
  eyebrow: string | null;
  title: string;
  intro: string | null;
  layout: CaseStudyCardsLayout;
  image: ContentfulImage | null;
  /** Story panels: one image per card, in order (0016). */
  images: (ContentfulImage | null)[];
  items: CaseStudyItem[];
};

export type CaseStudyGallerySection = {
  type: "gallery";
  id: string;
  title: string;
  intro: string | null;
  images: ContentfulImage[];
  /** A video for each image, in the same order (0019; null where there is none). */
  videos: (VideoFile | null)[];
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

/** A section's eyebrow, title, and intro (the marketing sections, 0011). */
type SectionHeadingData = { eyebrow: string | null; title: string; intro: string | null };

/** A brand colour from "Name #RRGGBB". */
export type BrandColour = { name: string; hex: string };

export type CaseStudyBrandBoardSection = SectionHeadingData & {
  type: "brandBoard";
  id: string;
  /** "board": heading beside the board. "wide": heading above, logo beside tall colour stripes. */
  layout: "board" | "wide";
  logo: ContentfulImage | null;
  colours: BrandColour[];
  typefaces: string[];
  tagline: string | null;
};

export type SocialPlatform = "Facebook" | "Instagram" | "LinkedIn" | "TikTok" | "YouTube";

export type SocialFeedLayout = "grid" | "phones" | "spotlight" | "carousel" | "collage";

export type CaseStudySocialFeedSection = SectionHeadingData & {
  type: "socialFeed";
  id: string;
  layout: SocialFeedLayout;
  accountName: string | null;
  avatar: ContentfulImage | null;
  platforms: SocialPlatform[];
  posts: ContentfulImage[];
};

export type CaseStudyFunnelSection = SectionHeadingData & {
  type: "funnel";
  id: string;
  /** "funnel": narrowing bands beside the heading. "journey": stages left to right on a line. */
  layout: "funnel" | "journey";
  stages: CaseStudyItem[];
};

export type CaseStudyResultsSection = SectionHeadingData & {
  type: "results";
  id: string;
  /** Title = the number (e.g. +150%), text = its label. */
  metrics: CaseStudyItem[];
};

/** A YouTube video: its id, and its title from YouTube (null if YouTube didn't answer). */
export type YouTubeVideo = { id: string; title: string | null };

/** A video uploaded to Contentful: its file URL, MIME type, and caption (the asset's description). */
export type VideoFile = { url: string; contentType: string; caption: string | null };

type VideoAssetData = { url: string | null; contentType: string | null; description: string | null } | null;

// An uploaded asset as a video file (with an absolute URL), or null when it isn't a video.
function toVideoFile(file: VideoAssetData): VideoFile | null {
  if (!file?.url || !file.contentType?.startsWith("video/")) return null;
  return { url: file.url.startsWith("//") ? `https:${file.url}` : file.url, contentType: file.contentType, caption: file.description };
}

export type CaseStudyVideosSection = SectionHeadingData & {
  type: "videos";
  id: string;
  /** Uploaded videos (0014), shown first. */
  files: VideoFile[];
  videos: YouTubeVideo[];
};

/** A SWOT analysis (0018): the client's situation when the work started, as a 2×2 matrix. */
export type CaseStudySwotSection = SectionHeadingData & {
  type: "swot";
  id: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
};

export type CaseStudySectionData =
  | CaseStudyTextImageSection
  | CaseStudyTechStackSection
  | CaseStudyFeatureGridSection
  | CaseStudyShowcaseSection
  | CaseStudyCardsSection
  | CaseStudyGallerySection
  | CaseStudyTestimonialsSection
  | CaseStudyCallToActionSection
  | CaseStudyBrandBoardSection
  | CaseStudySocialFeedSection
  | CaseStudyFunnelSection
  | CaseStudyResultsSection
  | CaseStudyVideosSection
  | CaseStudySwotSection;

/** "split": logo, heading, and text beside the image, on white. "centered": white heading on
 *  the brand gradient with an arch, image below. "light": eyebrow, heading, text, and button
 *  centred on cream, image below. "dark": like split, on navy with a glow, with the eyebrow and
 *  button. "editorial": a very large heading on white, the text and button beside it, the image
 *  across the page below. */
export type CaseStudyHeroLayout = "split" | "centered" | "light" | "dark" | "editorial";

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
  /** A video played muted and looping behind the hero text (0017); the hero image is its still.
   *  When set, the hero is the video banner and the layout and layers are not used. */
  heroVideo: VideoFile | null;
  /** The services ticked in Contentful (slugs from src/content/services.ts). */
  services: string[];
  /** The logo is only included once the client has approved its use. */
  client: { name: string; logo: ContentfulImage | null } | null;
  sections: CaseStudySectionData[];
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
  /** When it was first published, and last published (ISO dates). */
  publishedAt: string;
  updatedAt: string;
};

// A case study as listed on /case-studies (and later on cards).
export type CaseStudySummary = {
  title: string;
  slug: string;
  href: string;
  excerpt: string;
  image: ContentfulImage;
  /** The services ticked in Contentful (slugs from src/content/services.ts). */
  services: string[];
  /** Ticked "Featured" in Contentful: listed first on /case-studies. */
  featured: boolean;
  /** When it was last published (ISO date), e.g. for the sitemap. */
  updatedAt: string;
};

// A case study as a project card on a service page.
export type CaseStudyCard = Omit<CaseStudySummary, "updatedAt" | "services" | "featured"> & {
  /** The logo is only included once the client has approved its use. */
  client: { name: string; logo: ContentfulImage | null } | null;
  highlight: string | null;
  points: string[];
};

// An asset as queried with ImageFields (also used by the other queries).
export type AssetData = {
  url: string | null;
  width: number | null;
  height: number | null;
  description: string | null;
  contentType: string | null;
} | null;

type ItemData = { title: string | null; text: string | null } | null;

export type SectionData =
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
      imagesCollection: { items: AssetData[] } | null;
      itemsCollection: { items: ItemData[] } | null;
    }
  | {
      __typename: "CaseStudyGallery";
      sys: { id: string };
      title: string | null;
      intro: string | null;
      imagesCollection: { items: AssetData[] } | null;
      videosCollection: { items: VideoAssetData[] } | null;
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
    }
  | (HeadingData & {
      __typename: "CaseStudyBrandBoard";
      layout: string | null;
      logo: AssetData;
      colours: (string | null)[] | null;
      typefaces: (string | null)[] | null;
      tagline: string | null;
    })
  | (HeadingData & {
      __typename: "CaseStudySocialFeed";
      layout: string | null;
      accountName: string | null;
      avatar: AssetData;
      platforms: (string | null)[] | null;
      postsCollection: { items: AssetData[] } | null;
    })
  | (HeadingData & { __typename: "CaseStudyFunnel"; layout: string | null; stagesCollection: { items: ItemData[] } | null })
  | (HeadingData & { __typename: "CaseStudyResults"; metricsCollection: { items: ItemData[] } | null })
  | (HeadingData & {
      __typename: "CaseStudyVideos";
      videos: (string | null)[] | null;
      filesCollection: { items: VideoAssetData[] } | null;
    })
  | (HeadingData & {
      __typename: "CaseStudySwot";
      strengths: (string | null)[] | null;
      weaknesses: (string | null)[] | null;
      opportunities: (string | null)[] | null;
      threats: (string | null)[] | null;
    });

type HeadingData = { sys: { id: string }; eyebrow: string | null; title: string | null; intro: string | null };

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
      heroVideo: VideoAssetData;
      services: (string | null)[] | null;
      client: { name: string | null; logoApproved: boolean | null; logo: AssetData } | null;
      sectionsCollection: { items: (SectionData | null)[] } | null;
      seo: {
        title: string | null;
        description: string | null;
        canonical: string | null;
        noIndex: boolean | null;
        image: AssetData;
        jsonLd: unknown;
      } | null;
      sys: { firstPublishedAt: string; publishedAt: string };
    } | null)[];
  };
};

type CaseStudiesData = {
  caseStudyCollection: {
    items: ({
      title: string | null;
      slug: string | null;
      excerpt: string | null;
      services: (string | null)[] | null;
      featured: boolean | null;
      heroImage: AssetData;
      cardImage: AssetData;
      heroVideo: { url: string | null } | null;
      sys: { publishedAt: string };
    } | null)[];
  };
};

type ProjectCardsData = {
  caseStudyCollection: {
    items: ({
      title: string | null;
      slug: string | null;
      excerpt: string | null;
      services: (string | null)[] | null;
      cardHighlight: string | null;
      cardPoints: (string | null)[] | null;
      cardImage: AssetData;
      heroImage: AssetData;
      client: { name: string | null; logoApproved: boolean | null; logo: AssetData } | null;
    } | null)[];
  };
};

export const IMAGE_FIELDS = /* GraphQL */ `
  fragment ImageFields on Asset {
    url
    width
    height
    description
    contentType
  }
`;

// The fields of every section block (case studies and products share them; products since 26 Oct
// 2026), inside a query's `sectionsCollection { items { ... } }`.
export const SECTION_FIELDS = /* GraphQL */ `
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
      imagesCollection(limit: 9) {
        items {
          ...ImageFields
        }
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
      videosCollection(limit: 12) {
        items {
          url
          contentType
          description
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
`;

// The marketing sections (0011), allowed on case studies only: a product's query can't ask for
// them (GraphQL rejects fragments for types its sections can't hold).
const MARKETING_SECTION_FIELDS = /* GraphQL */ `
    ... on CaseStudyBrandBoard {
      sys {
        id
      }
      eyebrow
      title
      intro
      layout
      logo {
        ...ImageFields
      }
      colours
      typefaces
      tagline
    }
    ... on CaseStudySocialFeed {
      sys {
        id
      }
      eyebrow
      title
      intro
      layout
      accountName
      avatar {
        ...ImageFields
      }
      platforms
      postsCollection(limit: 12) {
        items {
          ...ImageFields
        }
      }
    }
    ... on CaseStudyFunnel {
      sys {
        id
      }
      eyebrow
      title
      intro
      layout
      stagesCollection(limit: 6) {
        items {
          title
          text
        }
      }
    }
    ... on CaseStudySwot {
      sys {
        id
      }
      eyebrow
      title
      intro
      strengths
      weaknesses
      opportunities
      threats
    }
    ... on CaseStudyVideos {
      sys {
        id
      }
      eyebrow
      title
      intro
      videos
      filesCollection(limit: 6) {
        items {
          url
          contentType
          description
        }
      }
    }
    ... on CaseStudyResults {
      sys {
        id
      }
      eyebrow
      title
      intro
      metricsCollection(limit: 6) {
        items {
          title
          text
        }
      }
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
        heroVideo {
          url
          contentType
          description
        }
        services
        client {
          name
          logoApproved
          logo {
            ...ImageFields
          }
        }
        sectionsCollection(limit: 20) {
          items {
            ${SECTION_FIELDS}
            ${MARKETING_SECTION_FIELDS}
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
        sys {
          firstPublishedAt
          publishedAt
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
        services
        featured
        heroImage {
          ...ImageFields
        }
        cardImage {
          ...ImageFields
        }
        heroVideo {
          url
        }
        sys {
          publishedAt
        }
      }
    }
  }
  ${IMAGE_FIELDS}
`;

// Every case study as a project card, with its services (the slugs in contentful/migrations/0002),
// newest first.
const PROJECT_CARDS = /* GraphQL */ `
  query ProjectCards {
    caseStudyCollection(limit: 24, order: [sys_firstPublishedAt_DESC]) {
      items {
        title
        slug
        excerpt
        services
        cardHighlight
        cardPoints
        cardImage {
          ...ImageFields
        }
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
  // Replaced by "Story panels" (20 Nov 2026); shown as the plain timeline.
  "Timeline beside text (pinned)": "timeline",
  "Story panels": "story",
  "Icon grid": "icon-grid",
  "Around image": "around-image",
  "Numbered steps": "steps",
};

export const heroLayouts: Record<string, CaseStudyHeroLayout> = {
  Centered: "centered",
  Light: "light",
  Dark: "dark",
  Editorial: "editorial",
};

const socialFeedLayouts: Record<string, SocialFeedLayout> = {
  Phones: "phones",
  Spotlight: "spotlight",
  Carousel: "carousel",
  Collage: "collage",
};

export function toImage(asset: AssetData): ContentfulImage | null {
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

export const toButton = (label: string | null, href: string | null): CaseStudyButton | null =>
  label && href ? { label, href } : null;

// Hero layers are all or nothing: with one missing (e.g. not published), the picture would
// have a hole, so the single hero image is shown instead.
export function toLayers(assets: AssetData[]): ContentfulImage[] {
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

export function toSection(item: SectionData | null): CaseStudySectionData[] {
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
          images: (item.imagesCollection?.items ?? []).map(toImage),
          items,
        },
      ];
    }
    case "CaseStudyGallery": {
      const images = (item.imagesCollection?.items ?? []).flatMap((asset) => toImage(asset) ?? []);
      if (!item.title || !images.length) return [];
      const videos = (item.videosCollection?.items ?? []).map(toVideoFile);
      return [{ type: "gallery", id: item.sys.id, title: item.title, intro: item.intro, images, videos }];
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
    case "CaseStudyBrandBoard": {
      const colours = (item.colours ?? []).flatMap((value) => {
        const match = value?.match(/^(.+) (#[0-9a-f]{6})$/i);
        return match ? [{ name: match[1].trim(), hex: match[2] }] : [];
      });
      if (!item.title || !colours.length) return [];
      return [
        {
          type: "brandBoard",
          ...toHeading(item, item.title),
          layout: item.layout === "Wide" ? "wide" : "board",
          logo: toImage(item.logo),
          colours,
          typefaces: (item.typefaces ?? []).filter((typeface): typeface is string => Boolean(typeface?.trim())),
          tagline: item.tagline,
        },
      ];
    }
    case "CaseStudySocialFeed": {
      const posts = (item.postsCollection?.items ?? []).flatMap((asset) => toImage(asset) ?? []);
      if (!item.title || !posts.length) return [];
      return [
        {
          type: "socialFeed",
          ...toHeading(item, item.title),
          layout: (item.layout && socialFeedLayouts[item.layout]) || "grid",
          accountName: item.accountName,
          avatar: toImage(item.avatar),
          platforms: (item.platforms ?? []).filter(isSocialPlatform),
          posts,
        },
      ];
    }
    case "CaseStudyFunnel": {
      const stages = toItems(item.stagesCollection?.items);
      if (!item.title || !stages.length) return [];
      return [
        { type: "funnel", ...toHeading(item, item.title), layout: item.layout === "Journey" ? "journey" : "funnel", stages },
      ];
    }
    case "CaseStudyResults": {
      // Hidden until it has a published metric.
      const metrics = toItems(item.metricsCollection?.items);
      if (!item.title || !metrics.length) return [];
      return [{ type: "results", ...toHeading(item, item.title), metrics }];
    }
    case "CaseStudyVideos": {
      // Titles are filled in by getCaseStudy (withVideoTitles).
      const videos = (item.videos ?? []).flatMap((url) => {
        const id = url ? youTubeId(url) : null;
        return id ? [{ id, title: null }] : [];
      });
      const files = (item.filesCollection?.items ?? []).flatMap((file) => {
        const video = toVideoFile(file);
        return video ? [video] : [];
      });
      if (!item.title || (!videos.length && !files.length)) return [];
      return [{ type: "videos", ...toHeading(item, item.title), files, videos }];
    }
    case "CaseStudySwot": {
      const list = (values: (string | null)[] | null) => (values ?? []).flatMap((value) => (value?.trim() ? [value.trim()] : []));
      const swot = { strengths: list(item.strengths), weaknesses: list(item.weaknesses), opportunities: list(item.opportunities), threats: list(item.threats) };
      // Hidden unless every quadrant has a point.
      if (!item.title || Object.values(swot).some((points) => !points.length)) return [];
      return [{ type: "swot", ...toHeading(item, item.title), ...swot }];
    }
    default:
      return [];
  }
}

// The 11-character video id from a YouTube link (watch?v=, youtu.be/, shorts/, embed/).
export function youTubeId(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

// A video's title from YouTube's public oEmbed endpoint, cached for a day; null if it fails.
async function youTubeTitle(id: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`,
      { next: { revalidate: 86400 } },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as { title?: unknown };
    return typeof data.title === "string" ? data.title : null;
  } catch {
    return null;
  }
}

// Fills in the titles of the videos in a page's video sections.
async function withVideoTitles(sections: CaseStudySectionData[]): Promise<CaseStudySectionData[]> {
  return Promise.all(
    sections.map(async (section) =>
      section.type === "videos"
        ? { ...section, videos: await Promise.all(section.videos.map(async (video) => ({ ...video, title: await youTubeTitle(video.id) }))) }
        : section,
    ),
  );
}

const socialPlatforms: SocialPlatform[] = ["Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube"];
const isSocialPlatform = (value: string | null): value is SocialPlatform =>
  socialPlatforms.includes(value as SocialPlatform);

const toHeading = (item: HeadingData, title: string) => ({
  id: item.sys.id,
  eyebrow: item.eyebrow,
  title,
  intro: item.intro,
});

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
    heroVideo: toVideoFile(item.heroVideo),
    services: (item.services ?? []).filter((service): service is string => Boolean(service)),
    client: item.client?.name
      ? { name: item.client.name, logo: item.client.logoApproved ? toImage(item.client.logo) : null }
      : null,
    sections: await withVideoTitles((item.sectionsCollection?.items ?? []).flatMap(toSection)),
    seo: {
      title: item.seo?.title ?? null,
      description: item.seo?.description ?? null,
      canonical: item.seo?.canonical ?? null,
      image: toImage(item.seo?.image ?? null),
      noIndex: item.seo?.noIndex ?? false,
      jsonLd: item.seo?.jsonLd ?? null,
    },
    publishedAt: item.sys.firstPublishedAt,
    updatedAt: item.sys.publishedAt,
  };
});

// Every published case study, newest first.
export const getCaseStudies = cache(async (): Promise<CaseStudySummary[]> => {
  const data = await caseStudyQuery<CaseStudiesData>(CASE_STUDIES, { tags: ["caseStudy"] });

  return (data?.caseStudyCollection.items ?? []).flatMap((item) => {
    // The hero image, except for a case study with a video banner (0017): its hero image is a
    // frame of the video, so the card image is shown instead when there is one (Pak Armoring's
    // logo; project head, 20 Nov 2026).
    const heroImage = toImage(item?.heroImage ?? null);
    const image = (item?.heroVideo?.url ? toImage(item.cardImage ?? null) : null) ?? heroImage;
    if (!item?.title || !item.slug || !item.excerpt || !image) return [];
    return [
      {
        title: item.title,
        slug: item.slug,
        href: `/case-studies/${item.slug}`,
        excerpt: item.excerpt,
        image,
        services: (item.services ?? []).filter((service): service is string => Boolean(service)),
        featured: item.featured === true,
        updatedAt: item.sys.publishedAt,
      },
    ];
  });
});

// Every published case study as a project card, newest first, those tagged with `service` moved
// to the front (a service page shows its own projects first).
export const getProjectCards = cache(async (service: string): Promise<CaseStudyCard[]> => {
  const data = await caseStudyQuery<ProjectCardsData>(PROJECT_CARDS, { tags: ["caseStudy"] });

  const cards = (data?.caseStudyCollection.items ?? []).flatMap((item) => {
    // The card image (0009) when set, otherwise the hero image.
    const image = toImage(item?.cardImage ?? null) ?? toImage(item?.heroImage ?? null);
    if (!item?.title || !item.slug || !item.excerpt || !image) return [];
    const card: CaseStudyCard = {
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
    };
    return [{ card, ours: Boolean(item.services?.includes(service)) }];
  });
  return [...cards.filter(({ ours }) => ours), ...cards.filter(({ ours }) => !ours)].map(({ card }) => card);
});
