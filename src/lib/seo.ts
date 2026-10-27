// Search and sharing for every page (architecture plan §8): each page's metadata (title,
// description, canonical URL, Open Graph tags, which Twitter's are filled from) and its
// structured data (JSON-LD, schema.org), rendered with <JsonLd>. Editors change the metadata in
// Contentful: Page SEO entries for pages whose content is in code (pageMetadataFromCms), each
// case study's and post's own SEO entry; the text in code is the fallback.
import type { Metadata } from "next";
import type {
  Article,
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  ItemList,
  Organization,
  Service,
  Thing,
  WebSite,
} from "schema-dts";
// The logo's drop mark: search engines need a logo of at least 112 × 112 px, and the full
// logo is only 57 px tall.
import logo from "@/assets/images/brand-drop.webp";
import type { ContentfulImage } from "@/contentful/queries/case-studies";
import { getPageSeo } from "@/contentful/queries/page-seo";
import { serviceCategories } from "@/content/services";
import { siteConfig } from "@/lib/site";

/** Search engines may index the site (robots.txt allows crawling, no noindex tag) unless
 *  `BLOCK_INDEXING=true` is set, e.g. on a test copy such as the old cPanel demo (26 Oct 2026,
 *  project head: indexing on by default, so the live site needs no setting). robots.ts uses the
 *  same rule. */
export const indexable = process.env.BLOCK_INDEXING !== "true";

/** A path on the site as a full URL on the live site. */
export const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

/** A readable title from a URL slug, for placeholder pages: "why-we-still" → "Why we still". */
export function titleFromSlug(slug: string) {
  const words = slug.replace(/-/g, " ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

export type ShareImage = { url: string; width: number; height: number; alt: string };

/** The site's share image (src/app/opengraph-image.tsx), for pages without their own. */
export const defaultShareImage: ShareImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name}: software, branding, and digital products`,
};

/** A Contentful image as a share image. */
export const toShareImage = ({ url, width, height, alt }: ContentfulImage): ShareImage => ({ url, width, height, alt });

type PageSeo = {
  /** The page's own title; the layout adds " | Ink Pixel Studios". `{ absolute }` is used as
   *  is (the home page, and titles from Contentful). */
  title: string | { absolute: string };
  description: string;
  /** The page's path, e.g. "/about": its canonical URL unless `canonical` is set. */
  path: string;
  /** Another canonical URL (a full address or a path), set by editors in Contentful. */
  canonical?: string | null;
  /** Replaces the default share image. */
  image?: ShareImage;
  /** Case studies and articles: their dates, as ISO strings. */
  article?: { publishedTime: string; modifiedTime: string };
  noIndex?: boolean;
};

// A page's metadata. Open Graph is set in full on every page: a page's `openGraph` replaces the
// layout's instead of merging with it.
export function pageMetadata({ title, description, path, canonical, image, article, noIndex }: PageSeo): Metadata {
  const url = canonical || path;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      siteName: siteConfig.name,
      locale: "en_US",
      url,
      title: typeof title === "string" ? title : title.absolute,
      description,
      images: [image ?? defaultShareImage],
      ...(article ? { type: "article", ...article } : { type: "website" }),
    },
    ...(noIndex && { robots: { index: false } }),
  };
}

// The metadata of a page whose content is in code: from its Page SEO entry in Contentful (found
// by the page's address) when there is one, otherwise `fallback`.
export async function pageMetadataFromCms(fallback: PageSeo): Promise<Metadata> {
  const entry = await getPageSeo(fallback.path);
  if (!entry) return pageMetadata(fallback);
  return pageMetadata({
    title: { absolute: entry.title },
    description: entry.description,
    path: fallback.path,
    canonical: entry.canonical,
    image: entry.image ? toShareImage(entry.image) : fallback.image,
    noIndex: entry.noIndex || fallback.noIndex,
  });
}

// --- Structured data -------------------------------------------------------------------------

const organizationId = absoluteUrl("/#organization");

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: siteConfig.office.streetAddress,
  addressLocality: siteConfig.office.addressLocality,
  addressRegion: siteConfig.office.addressRegion,
  postalCode: siteConfig.office.postalCode,
  addressCountry: siteConfig.office.addressCountry,
} as const;

// The studio and the website: on every page (PageSchema). The studio is both an Organization and
// a ProfessionalService (a business with an office), with its Karachi office's address and
// position, what it works on (the core services), and its social profiles.
export function siteSchema(): Thing[] {
  const organization = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": organizationId,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: absoluteUrl(logo.src) },
    image: absoluteUrl(defaultShareImage.url),
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone.schema,
    address: postalAddress,
    geo: { "@type": "GeoCoordinates", latitude: siteConfig.office.latitude, longitude: siteConfig.office.longitude },
    areaServed: "Worldwide",
    knowsAbout: serviceCategories.map(({ label }) => label),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email,
        telephone: siteConfig.phone.schema,
        availableLanguage: ["English"],
        areaServed: "Worldwide",
      },
    ],
    ...(siteConfig.socialProfiles.length > 0 && { sameAs: siteConfig.socialProfiles }),
  } as unknown as Organization;
  const website: WebSite = {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: "en",
    publisher: { "@id": organizationId },
  };
  return [organization, website];
}

// The path from the home page to this one, e.g. Home › Services › Web Development (inner pages).
export function breadcrumbSchema(trail: { name: string; path: string }[]): BreadcrumbList {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** The kinds of page (schema.org) the site has. */
export type PageType = "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";

// A page, as a WebPage (or one of its kinds) of the website, about and published by the studio.
export function webPageSchema({ type, name, description, path }: { type: PageType; name: string; description: string; path: string }): Thing {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: { "@id": organizationId },
    publisher: { "@id": organizationId },
  } as Thing;
}

// A core service or a service, provided by the studio worldwide; a service is related to its core
// service (`parentPath`).
export function serviceSchema({
  name,
  description,
  path,
  parentPath,
}: {
  name: string;
  description: string;
  path: string;
  parentPath?: string;
}): Service {
  const url = absoluteUrl(path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    url,
    name,
    serviceType: name,
    description,
    provider: { "@id": organizationId },
    areaServed: "Worldwide",
    ...(parentPath && { isRelatedTo: { "@id": `${absoluteUrl(parentPath)}#service` } }),
  } as Service;
}

// A list of pages, e.g. the core services (home, Services) or a core service's services.
export function itemListSchema(name: string, items: { name: string; path: string }[]): ItemList {
  return {
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

// The core services, as a list (home and Services).
export const coreServicesList = (name: string) =>
  itemListSchema(
    name,
    serviceCategories.map(({ label, slug }) => ({ name: label, path: `/services/${slug}` })),
  );

// The FAQ, as shown on the home page (one FAQPage for the site, on the home page only).
export function faqSchema(items: { question: string; answer: string[] }[]): FAQPage {
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl("/#faq"),
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer.join(" ") },
    })),
  };
}

// One of the studio's products (/products/<slug>), as a web application made and published by
// the studio.
export function productSchema({
  name,
  description,
  path,
  image,
}: {
  name: string;
  description: string;
  path: string;
  image: string;
}): Thing {
  const url = absoluteUrl(path);
  return {
    "@type": "SoftwareApplication",
    "@id": `${url}#product`,
    name,
    description,
    url,
    image,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
  } as Thing;
}

// A case study, as an article by the studio about a client's project.
export function caseStudySchema(caseStudy: {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedTime: string;
  modifiedTime: string;
  client: string | null;
}): Article {
  return {
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.description,
    url: absoluteUrl(caseStudy.path),
    mainEntityOfPage: absoluteUrl(caseStudy.path),
    image: caseStudy.image,
    datePublished: caseStudy.publishedTime,
    dateModified: caseStudy.modifiedTime,
    author: { "@type": "Organization", "@id": organizationId, name: siteConfig.name, url: absoluteUrl("/") },
    publisher: { "@id": organizationId },
    ...(caseStudy.client && { about: { "@type": "Organization", name: caseStudy.client } }),
  };
}

// A blog post, by its author (a person; the studio when the post has none), published by the studio.
export function blogPostingSchema(post: {
  title: string;
  description: string;
  path: string;
  image: string | null;
  publishedTime: string;
  modifiedTime: string;
  category: string;
  author: { name: string; role: string | null; links: string[] } | null;
}): BlogPosting {
  return {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url: absoluteUrl(post.path),
    mainEntityOfPage: absoluteUrl(post.path),
    ...(post.image && { image: post.image }),
    datePublished: post.publishedTime,
    dateModified: post.modifiedTime,
    articleSection: post.category,
    inLanguage: "en",
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          ...(post.author.role && { jobTitle: post.author.role }),
          ...(post.author.links.length > 0 && { sameAs: post.author.links }),
        }
      : { "@type": "Organization", "@id": organizationId, name: siteConfig.name, url: absoluteUrl("/") },
    publisher: { "@id": organizationId },
  };
}

// --- Schema pasted by editors -------------------------------------------------------------------

type SchemaObject = Record<string, unknown>;
const isObject = (value: unknown): value is SchemaObject =>
  typeof value === "object" && value !== null && !Array.isArray(value);
const typesOf = (item: Thing) => {
  const type = (item as { "@type"?: unknown })["@type"];
  return (Array.isArray(type) ? type : [type]).filter((t): t is string => typeof t === "string");
};

// The schema an editor pasted into a Page SEO or SEO entry ("Custom schema (JSON-LD)"): one
// object, a list of objects, or an object with "@graph". Each item must be an object with an
// "@type"; anything else is skipped and logged, so a bad paste never breaks the page. Each
// item's "@context" is dropped: the page's graph has one.
export function customSchema(value: unknown, page: string): Thing[] {
  if (value === null || value === undefined) return [];
  const list = Array.isArray(value) ? value : isObject(value) && Array.isArray(value["@graph"]) ? value["@graph"] : [value];
  return list.flatMap((item: unknown) => {
    if (!isObject(item) || typesOf(item as Thing).length === 0) {
      console.warn(`Custom schema on ${page}: skipped an item that isn't an object with an "@type".`);
      return [];
    }
    const rest = { ...item };
    delete rest["@context"];
    return [rest as Thing];
  });
}

// A page's schema: the automatic schema, except the types the editor pasted (pasted schema of
// the same @type replaces it), then the pasted schema.
export function mergeSchema(automatic: Thing[], pasted: Thing[]): Thing[] {
  const replaced = new Set(pasted.flatMap(typesOf));
  return [...automatic.filter((item) => !typesOf(item).some((type) => replaced.has(type))), ...pasted];
}
