import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { DrivesUs } from "@/components/sections/about/DrivesUs";
import { Team } from "@/components/sections/about/Team";
import { TrustedBy } from "@/components/sections/about/TrustedBy";
import { VisitUs } from "@/components/sections/about/VisitUs";
import { WhoWeAre } from "@/components/sections/about/WhoWeAre";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { Faq } from "@/components/sections/home/Faq";
import { Industries } from "@/components/sections/home/Industries";
import { Insights } from "@/components/sections/home/Insights";
import { PageSchema } from "@/components/seo/PageSchema";
import { faqs } from "@/content/faq";
import { breadcrumbSchema, faqSchema, pageMetadataFromCms } from "@/lib/seo";
import { features } from "@/lib/site";

// From the page's Page SEO entry in Contentful; this is the fallback (the structured data's too).
const seo = {
  title: "About",
  description:
    "Ink Pixel Studios is a software and digital solutions company in Karachi, Pakistan: the people, the values, and the way we work.",
  path: "/about",
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms(seo);
}

// About: static content in src/content/about.ts. Industries, Insights, and the FAQ are the
// home page's sections (Industries on cream here, between two navy sections).
export default function AboutPage() {
  return (
    <>
      <PageSchema
        path={seo.path}
        page={{ type: "AboutPage", title: seo.title, description: seo.description }}
        items={[breadcrumbSchema([{ name: "About", path: seo.path }]), faqSchema(faqs, seo.path)]}
      />
      <AboutHero />
      <TrustedBy />
      <WhoWeAre />
      <Team />
      <DrivesUs />
      <Industries tone="onLight" />
      {features.blog && <Insights eyebrow="08 · Insights" />}
      <Faq eyebrow={features.blog ? "09 · FAQ" : "08 · FAQ"} />
      <VisitUs />
      <ContactCta />
    </>
  );
}
