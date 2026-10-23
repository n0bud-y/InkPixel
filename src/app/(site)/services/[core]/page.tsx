import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BrandingHero } from "@/components/sections/branding/BrandingHero";
import { BrandingIntro } from "@/components/sections/branding/BrandingIntro";
import { BrandingServices } from "@/components/sections/branding/BrandingServices";
import { CoreHero } from "@/components/sections/core/CoreHero";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { Industries } from "@/components/sections/home/Industries";
import { ServiceProjects } from "@/components/sections/services/ServiceProjects";
import { PageSchema } from "@/components/seo/PageSchema";
import { corePages, getCorePage } from "@/content/core-pages";
import { withShowcaseIcons } from "@/content/showcase-icons";
import { breadcrumbSchema, pageMetadataFromCms, serviceSchema } from "@/lib/seo";

// One page per core service in src/content/services.ts; any other address is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return corePages.map(({ category }) => ({ core: category.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[core]">): Promise<Metadata> {
  const { core } = await props.params;
  const found = getCorePage(core);
  if (!found) return {};
  // From the page's Page SEO entry in Contentful; the content file's name and description otherwise.
  return pageMetadataFromCms({ title: found.content.name, description: found.content.description, path: `/services/${core}` });
}

// A core service page (e.g. /services/branding), laid out as Service Branding.svg: static content
// from src/content/core-pages.ts (Branding's from branding-page.ts), its projects from Contentful
// (case studies with the core service ticked). "Industry-Specific Solutions" (cream, as on the
// About page) and the closing call to action are the home page's sections.
export default async function CoreServicePage(props: PageProps<"/services/[core]">) {
  const { core } = await props.params;
  const found = getCorePage(core);
  if (!found) notFound();
  const { content } = found;
  const path = `/services/${core}`;

  return (
    <>
      <PageSchema
        path={path}
        items={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: content.name, path },
          ]),
          serviceSchema({ name: content.name, description: content.description, path }),
        ]}
      />
      {core === "branding" ? (
        <BrandingHero hero={content.hero} />
      ) : (
        <CoreHero slug={core} label={found.category.label} hero={content.hero} />
      )}
      <BrandingIntro intro={content.intro} />
      {/* With the previous, more detailed icons (showcase-icons.ts), not the menu's. */}
      <BrandingServices services={{ ...content.services, items: withShowcaseIcons(content.services.items) }} />
      <Industries tone="onLight" />
      <ServiceProjects
        tone="dark"
        page={{ slug: core, caseStudyService: content.caseStudyService, projects: content.projects }}
      />
      <ContactCta />
    </>
  );
}
