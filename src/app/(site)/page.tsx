import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { Faq } from "@/components/sections/home/Faq";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { Hero } from "@/components/sections/home/Hero";
import { Industries } from "@/components/sections/home/Industries";
import { Insights } from "@/components/sections/home/Insights";
import { Process } from "@/components/sections/home/Process";
import { ServicesShowcase } from "@/components/sections/home/ServicesShowcase";
import { Stats } from "@/components/sections/home/Stats";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { PageSchema } from "@/components/seo/PageSchema";
import { faqs } from "@/content/faq";
import { coreServicesList, faqSchema, pageMetadataFromCms } from "@/lib/seo";
import { features, siteConfig } from "@/lib/site";

// From the home page's Page SEO entry in Contentful; this is the fallback (the structured
// data's too). Stand-in title, issue I9.
const seo = {
  title: { absolute: "Ink Pixel Studios | Software & Digital Studio in Karachi" },
  description: siteConfig.description,
  path: "/",
};

export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms(seo);
}

// Structured data: the studio and the website, the page, the core services, and the FAQ (as shown
// in the FAQ section; the site's only FAQPage), plus any schema pasted into the home page's Page
// SEO entry.
export default function HomePage() {
  return (
    <>
      <PageSchema
        path={seo.path}
        page={{ type: "WebPage", title: seo.title, description: seo.description }}
        items={[coreServicesList("Services"), faqSchema(faqs)]}
      />
      <Hero />
      <Stats />
      <ServicesShowcase />
      <FeaturedWork />
      <Testimonials />
      <Process />
      <Industries />
      <Faq />
      {features.blog && <Insights />}
      <ContactCta />
    </>
  );
} 