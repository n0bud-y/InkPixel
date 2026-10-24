import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SceneHero } from "@/components/sections/core/SceneHero";
import { serviceScenes } from "@/components/sections/core/scenes/services";
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
import { PageSchema } from "@/components/seo/PageSchema";
import { getServicePage, servicePages, servicePlace } from "@/content/service-pages";
import { breadcrumbSchema, pageMetadataFromCms, serviceSchema } from "@/lib/seo";
import { features } from "@/lib/site";

// Only the services with content in src/content/service-pages.ts exist, each under its core
// service (/services/development/web-development); any other address is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.flatMap(({ slug }) => {
    const place = servicePlace(slug);
    return place ? [{ core: place.core.slug, service: slug }] : [];
  });
}

export async function generateMetadata(props: PageProps<"/services/[core]/[service]">): Promise<Metadata> {
  const { core, service } = await props.params;
  const found = getServicePage(core, service);
  if (!found) return {};
  const { page, path } = found;
  // From the page's Page SEO entry in Contentful; the content file's name and description otherwise.
  return pageMetadataFromCms({ title: page.name, description: page.description, path });
}

// A service page: static content from src/content/service-pages.ts, its projects from
// Contentful (case studies with the service ticked). The stats band, Insights, the FAQ, and the
// closing call to action are the home page's sections; "Get In Touch" is the About page's.
export default async function ServicePage(props: PageProps<"/services/[core]/[service]">) {
  const { core, service } = await props.params;
  const found = getServicePage(core, service);
  if (!found) notFound();
  const { page, path } = found;
  const category = found.core;
  // The split hero with the service's illustration, once it has one; until then the photo hero
  // with the consultation card.
  const Scene = serviceScenes[page.slug];

  return (
    <>
      <PageSchema
        path={path}
        items={[
          // The core service is a step once it has its own page (Branding so far).
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            ...(category.href ? [{ name: category.label, path: category.href }] : []),
            { name: page.name, path },
          ]),
          serviceSchema({ name: page.name, description: page.description, path }),
        ]}
      />
      {Scene ? (
        <SceneHero
          eyebrow={`${category.label} · ${page.name}`}
          // The service's name in the brand gradient.
          title={page.hero.title.replace(page.name, `*${page.name}*`)}
          text={page.hero.text}
          button={page.consultation.button}
          workHref={`/case-studies?service=${category.slug}`}
          compact
          scene={<Scene />}
        />
      ) : (
        <ServiceHero page={page} />
      )}
      <Stats />
      <ServiceIntro page={page} />
      <ServiceOfferings page={page} />
      <ServiceTypes page={page} />
      <ServiceProjects page={page} />
      <CostEstimator page={page} />
      <ServiceWorkflow page={page} />
      <ServiceStats page={page} />
      <DomainDiversity />
      {features.blog && <Insights eyebrow="08 · Insights" />}
      <Faq eyebrow={features.blog ? "09 · FAQ" : "08 · FAQ"} />
      <VisitUs />
      <ContactCta />
    </>
  );
}
