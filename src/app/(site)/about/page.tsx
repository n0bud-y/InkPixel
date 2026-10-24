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
import { breadcrumbSchema, officeSchema, pageMetadataFromCms } from "@/lib/seo";
import { features } from "@/lib/site";

// From the page's Page SEO entry in Contentful; this is the fallback.
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: "About",
    description:
      "Ink Pixel Studios is a software and digital solutions company in Karachi, Pakistan: the people, the values, and the way we work.",
    path: "/about",
  });
}

// About: static content in src/content/about.ts. Industries, Insights, and the FAQ are the
// home page's sections (Industries on cream here, between two navy sections).
export default function AboutPage() {
  return (
    <>
      <PageSchema path="/about" items={[breadcrumbSchema([{ name: "About", path: "/about" }]), officeSchema()]} />
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
