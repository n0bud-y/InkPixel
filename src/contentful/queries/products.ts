import "server-only";
import { cache } from "react";
import { ContentfulError, contentfulQuery } from "@/contentful/client";
import {
  heroLayouts,
  IMAGE_FIELDS,
  SECTION_FIELDS,
  toButton,
  toImage,
  toLayers,
  toSection,
  type AssetData,
  type CaseStudyButton,
  type CaseStudyHeroLayout,
  type CaseStudySectionData,
  type ContentfulImage,
  type SectionData,
} from "@/contentful/queries/case-studies";

// Products (migration 0010): the studio's own products, at /products and /products/<slug>. A
// content type of their own; a product's page uses the same hero and section blocks as a case
// study's.

export type Product = {
  name: string;
  slug: string;
  tagline: string | null;
  excerpt: string;
  logo: ContentfulImage | null;
  heroLayout: CaseStudyHeroLayout;
  heroEyebrow: string | null;
  heroHeading: string;
  heroText: string | null;
  heroButton: CaseStudyButton | null;
  heroImage: ContentfulImage;
  /** The hero image cut into layers; empty when not set or when any layer is missing. */
  heroLayers: ContentfulImage[];
  sections: CaseStudySectionData[];
  /** The linked SEO entry: the title is used as typed; canonical replaces the page's address. */
  seo: {
    title: string | null;
    description: string | null;
    canonical: string | null;
    image: ContentfulImage | null;
    noIndex: boolean;
    jsonLd: unknown;
  };
  publishedAt: string;
  updatedAt: string;
};

// A product as a card on /products.
export type ProductSummary = {
  name: string;
  slug: string;
  href: string;
  tagline: string | null;
  excerpt: string;
  image: ContentfulImage;
  logo: ContentfulImage | null;
  /** When it was last published (ISO date), e.g. for the sitemap. */
  updatedAt: string;
};

type ProductData = {
  productCollection: {
    items: ({
      name: string | null;
      slug: string | null;
      tagline: string | null;
      excerpt: string | null;
      logo: AssetData;
      heroLayout: string | null;
      heroEyebrow: string | null;
      heroHeading: string | null;
      heroText: string | null;
      heroButtonLabel: string | null;
      heroButtonLink: string | null;
      heroImage: AssetData;
      heroLayersCollection: { items: AssetData[] } | null;
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

type ProductsData = {
  productCollection: {
    items: ({
      name: string | null;
      slug: string | null;
      tagline: string | null;
      excerpt: string | null;
      logo: AssetData;
      cardImage: AssetData;
      heroImage: AssetData;
      sys: { publishedAt: string };
    } | null)[];
  };
};

const PRODUCT = /* GraphQL */ `
  query Product($slug: String!) {
    productCollection(where: { slug: $slug }, limit: 1) {
      items {
        name
        slug
        tagline
        excerpt
        logo {
          ...ImageFields
        }
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
        sectionsCollection(limit: 20) {
          items {
            ${SECTION_FIELDS}
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

const PRODUCTS = /* GraphQL */ `
  query Products {
    productCollection(limit: 100, order: [sys_firstPublishedAt_ASC]) {
      items {
        name
        slug
        tagline
        excerpt
        logo {
          ...ImageFields
        }
        cardImage {
          ...ImageFields
        }
        heroImage {
          ...ImageFields
        }
        sys {
          publishedAt
        }
      }
    }
  }
  ${IMAGE_FIELDS}
`;

// Before the content model exists (migration 0010 not run), no products, with a warning.
async function productQuery<T>(query: string, options: Parameters<typeof contentfulQuery>[1]) {
  try {
    return await contentfulQuery<T>(query, options);
  } catch (error) {
    const missing =
      error instanceof ContentfulError &&
      error.messages.some((message) => message.includes('Cannot query field "productCollection"'));
    if (!missing) throw error;
    console.warn("Contentful has no product type yet. Run: npm run contentful:migrate -- contentful/migrations/0010-product-model.cjs");
    return null;
  }
}

// One published product, or null if there is none with this slug. Cached per request, so the
// page and its metadata share one query.
export const getProduct = cache(async (slug: string): Promise<Product | null> => {
  const data = await productQuery<ProductData>(PRODUCT, { variables: { slug }, tags: ["product", `product:${slug}`] });
  const item = data?.productCollection.items[0];
  if (!item) return null;

  const heroImage = toImage(item.heroImage);
  if (!item.name || !item.slug || !item.excerpt || !item.heroHeading || !heroImage) {
    console.warn(`Product "${slug}" is missing its name, excerpt, hero heading, or hero image, so it is not shown.`);
    return null;
  }

  return {
    name: item.name,
    slug: item.slug,
    tagline: item.tagline,
    excerpt: item.excerpt,
    logo: toImage(item.logo),
    heroLayout: (item.heroLayout && heroLayouts[item.heroLayout]) || "split",
    heroEyebrow: item.heroEyebrow,
    heroHeading: item.heroHeading,
    heroText: item.heroText,
    heroButton: toButton(item.heroButtonLabel, item.heroButtonLink),
    heroImage,
    heroLayers: toLayers(item.heroLayersCollection?.items ?? []),
    sections: (item.sectionsCollection?.items ?? []).flatMap(toSection),
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

// Every published product, oldest first (so new products join the end of the list).
export const getProducts = cache(async (): Promise<ProductSummary[]> => {
  const data = await productQuery<ProductsData>(PRODUCTS, { tags: ["product"] });
  return (data?.productCollection.items ?? []).flatMap((item) => {
    const image = toImage(item?.cardImage ?? null) ?? toImage(item?.heroImage ?? null);
    if (!item?.name || !item.slug || !item.excerpt || !image) return [];
    return [
      {
        name: item.name,
        slug: item.slug,
        href: `/products/${item.slug}`,
        tagline: item.tagline,
        excerpt: item.excerpt,
        image,
        logo: toImage(item.logo),
        updatedAt: item.sys.publishedAt,
      },
    ];
  });
});
