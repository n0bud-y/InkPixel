import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CallToActionSection } from "@/components/case-studies/CallToActionSection";
import { CardsSection } from "@/components/case-studies/CardsSection";
import { CaseStudyHero } from "@/components/case-studies/CaseStudyHero";
import { CaseStudySection } from "@/components/case-studies/CaseStudySection";
import { FeatureGridSection } from "@/components/case-studies/FeatureGridSection";
import { GallerySection } from "@/components/case-studies/GallerySection";
import { ShowcaseSection } from "@/components/case-studies/ShowcaseSection";
import { TechStackSection } from "@/components/case-studies/TechStackSection";
import { TestimonialsSection } from "@/components/case-studies/TestimonialsSection";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { PageSchema } from "@/components/seo/PageSchema";
import { getCaseStudies, getCaseStudy, type CaseStudy } from "@/contentful/queries/case-studies";
import { breadcrumbSchema, caseStudySchema, pageMetadata, toShareImage } from "@/lib/seo";

// Meta title, description, canonical URL, and share image: the case study's SEO entry in
// Contentful (its title used as typed), or the case study's title, excerpt, address, and hero
// image.
function seoOf(caseStudy: CaseStudy) {
  const { seo } = caseStudy;
  return {
    title: seo.title ? { absolute: seo.title } : `${caseStudy.title} Case Study`,
    description: seo.description ?? caseStudy.excerpt,
    path: `/case-studies/${caseStudy.slug}`,
    canonical: seo.canonical,
    image: toShareImage(seo.image ?? caseStudy.heroImage),
  };
}

// Every published case study is built ahead of time; one published later renders on its
// first visit and is then cached like the rest.
export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy) return {};

  return pageMetadata({
    ...seoOf(caseStudy),
    article: { publishedTime: caseStudy.publishedAt, modifiedTime: caseStudy.updatedAt },
    noIndex: caseStudy.seo.noIndex,
  });
}

// A case study from Contentful: the hero, its sections in order (alternating navy and white,
// starting with navy), then the closing call to action.
export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy) notFound();
  const seo = seoOf(caseStudy);

  return (
    <>
      <PageSchema
        path={seo.path}
        custom={caseStudy.seo.jsonLd}
        items={[
          breadcrumbSchema([
            { name: "Case studies", path: "/case-studies" },
            { name: caseStudy.title, path: seo.path },
          ]),
          caseStudySchema({
            title: `${caseStudy.title} Case Study`,
            description: seo.description,
            path: seo.path,
            image: seo.image.url,
            publishedTime: caseStudy.publishedAt,
            modifiedTime: caseStudy.updatedAt,
            client: caseStudy.client?.name ?? null,
          }),
        ]}
      />
      <CaseStudyHero
        layout={caseStudy.heroLayout}
        eyebrow={caseStudy.heroEyebrow}
        heading={caseStudy.heroHeading}
        text={caseStudy.heroText}
        button={caseStudy.heroButton}
        image={caseStudy.heroImage}
        layers={caseStudy.heroLayers}
        client={caseStudy.client}
      />
      {caseStudy.sections.map((section, index) => {
        const tone = index % 2 === 0 ? "dark" : "light";
        switch (section.type) {
          case "textImage":
            return (
              <CaseStudySection
                key={section.id}
                tone={tone}
                largerImage={
                  (slug === "crm-terminal-gateway" && section.title === "The Challenge") ||
                  (slug === "gulbaan" && section.title === "Insights from Client")
                }
                removePadding={slug === "gulbaan" && section.title === "Insights from Client"}
                {...section}
              />
            );
          case "techStack":
            return <TechStackSection key={section.id} tone={tone} {...section} />;
          case "featureGrid":
            return <FeatureGridSection key={section.id} tone={tone} {...section} />;
          case "showcase":
            return <ShowcaseSection key={section.id} tone={tone} image={section.image} />;
          case "cards":
            return <CardsSection key={section.id} tone={tone} {...section} />;
          case "gallery":
            return <GallerySection key={section.id} tone={tone} {...section} />;
          case "testimonials":
            return <TestimonialsSection key={section.id} tone={tone} {...section} />;
          case "callToAction":
            return <CallToActionSection key={section.id} tone={tone} {...section} />;
        }
      })}
      <ContactCta />
    </>
  );
}
