import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { Faq } from "@/components/sections/home/Faq";
import { Insights } from "@/components/sections/home/Insights";
import { Stats } from "@/components/sections/home/Stats";
import { VisitUs } from "@/components/sections/about/VisitUs";
import { CostEstimator } from "@/components/sections/services/CostEstimator";
import { DomainDiversity } from "@/components/sections/services/DomainDiversity";
import { ServiceHero } from "@/components/sections/services/ServiceHero";
import { ServiceIntro } from "@/components/sections/services/ServiceIntro";
import { ServiceOfferings } from "@/components/sections/services/ServiceOfferings";
import { ServiceProjects } from "@/components/sections/services/ServiceProjects";
import { ServiceStats } from "@/components/sections/services/ServiceStats";
import { ServiceTypes } from "@/components/sections/services/ServiceTypes";
import { ServiceWorkflow } from "@/components/sections/services/ServiceWorkflow";
import { getServicePage, servicePages } from "@/content/service-pages";

// Only the services with content in src/content/service-pages.ts exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = getServicePage(slug);
  if (!page) return {};
  return {
    title: page.name,
    description: page.description,
    alternates: { canonical: `/services/${page.slug}` },
  };
}

// A service page: static content from src/content/service-pages.ts, its projects from
// Contentful (case studies with the service ticked). The stats band, Insights, the FAQ, and the
// closing call to action are the home page's sections; "Get In Touch" is the About page's.
export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const page = getServicePage(slug);
  if (!page) notFound();

  return (
    <>
      <ServiceHero page={page} />
      <Stats />
      <ServiceIntro page={page} />
      <ServiceOfferings page={page} />
      <ServiceTypes page={page} />
      <ServiceProjects page={page} />
      <CostEstimator page={page} />
      <ServiceWorkflow page={page} />
      <ServiceStats page={page} />
      <DomainDiversity />
      <Insights eyebrow="08 · Insights" />
      <Faq eyebrow="09 · FAQ" />
      <VisitUs />
      <ContactCta />
    </>
  );
}
