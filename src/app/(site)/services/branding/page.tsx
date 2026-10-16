import type { Metadata } from "next";
import { BrandingHero } from "@/components/sections/branding/BrandingHero";
import { BrandingIntro } from "@/components/sections/branding/BrandingIntro";
import { BrandingServices } from "@/components/sections/branding/BrandingServices";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { Industries } from "@/components/sections/home/Industries";
import { ServiceProjects } from "@/components/sections/services/ServiceProjects";
import { PageSchema } from "@/components/seo/PageSchema";
import { brandingPage } from "@/content/branding-page";
import { breadcrumbSchema, pageMetadataFromCms, serviceSchema } from "@/lib/seo";

const path = "/services/branding";

// From the page's Page SEO entry in Contentful; the content file's name and description otherwise.
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({ title: brandingPage.name, description: brandingPage.description, path });
}

// The Branding page, from Service Branding.svg: static content from src/content/branding-page.ts,
// its projects from Contentful (case studies with "branding" ticked). "Industry-Specific
// Solutions" (cream, as on the About page) and the closing call to action are the home page's
// sections.
export default function BrandingPage() {
  return (
    <>
      <PageSchema
        path={path}
        items={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: brandingPage.name, path },
          ]),
          serviceSchema({ name: brandingPage.name, description: brandingPage.description, path }),
        ]}
      />
      <BrandingHero hero={brandingPage.hero} />
      <BrandingIntro intro={brandingPage.intro} />
      <BrandingServices services={brandingPage.services} />
      <Industries tone="onLight" />
      <ServiceProjects
        tone="dark"
        page={{ slug: "branding", caseStudyService: brandingPage.caseStudyService, projects: brandingPage.projects }}
      />
      <ContactCta />
    </>
  );
}
