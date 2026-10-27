import type { Metadata } from "next";
import { VisitUs } from "@/components/sections/about/VisitUs";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { CapabilitiesMarquee } from "@/components/sections/services/CapabilitiesMarquee";
import { FeaturedIn } from "@/components/sections/services/FeaturedIn";
import { ServiceCategories } from "@/components/sections/services/ServiceCategories";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { PageSchema } from "@/components/seo/PageSchema";
import { servicesPage } from "@/content/services-page";
import { breadcrumbSchema, coreServicesList, pageMetadataFromCms } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

// From the page's Page SEO entry in Contentful; this is the fallback, the structured data's too
// (stand-in description, issue I9).
const seo = {
  title: "Services",
  description:
    "Branding, web and app development, custom software, marketing, and AI automation: the services Ink Pixel Studios offers, from first idea to launch.",
  path: "/services",
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms(seo);
}

// The Services overview (Service.svg): static content in src/content/services-page.ts and the
// categories in src/content/services.ts. The hero is the service pages' hero; "Get In Touch" and
// the closing call to action are the About and home pages' sections.
export default function ServicesPage() {
  return (
    <>
      <PageSchema
        path={seo.path}
        page={{ type: "CollectionPage", title: seo.title, description: seo.description }}
        items={[coreServicesList(`${siteConfig.name} Services`), breadcrumbSchema([{ name: "Services", path: seo.path }])]}
      />
      <ServiceHero page={servicesPage} />
      <FeaturedIn />
      <ServiceCategories />
      <CapabilitiesMarquee title={servicesPage.capabilities.title} items={servicesPage.capabilities.items} />
      <VisitUs />
      <ContactCta />
    </>
  );
}
