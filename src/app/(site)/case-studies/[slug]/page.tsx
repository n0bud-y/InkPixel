import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/case-studies/CaseStudyHero";
import { CaseStudySection } from "@/components/case-studies/CaseStudySection";
import { FeatureGridSection } from "@/components/case-studies/FeatureGridSection";
import { ShowcaseSection } from "@/components/case-studies/ShowcaseSection";
import { TechStackSection } from "@/components/case-studies/TechStackSection";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { getCaseStudies, getCaseStudy } from "@/contentful/queries/case-studies";

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

  const { seo } = caseStudy;
  const image = seo.image ?? caseStudy.heroImage;
  return {
    title: seo.title ?? `${caseStudy.title} Case Study`,
    description: seo.description ?? caseStudy.excerpt,
    alternates: { canonical: `/case-studies/${caseStudy.slug}` },
    openGraph: { images: [{ url: image.url, width: image.width, height: image.height, alt: image.alt }] },
    robots: seo.noIndex ? { index: false } : undefined,
  };
}

// A case study from Contentful: the hero, its sections in order (alternating navy and white,
// starting with navy), then the closing call to action.
export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  const caseStudy = await getCaseStudy(slug);
  if (!caseStudy) notFound();

  return (
    <>
      <CaseStudyHero
        layout={caseStudy.heroLayout}
        heading={caseStudy.heroHeading}
        text={caseStudy.heroText}
        image={caseStudy.heroImage}
        layers={caseStudy.heroLayers}
        client={caseStudy.client}
      />
      {caseStudy.sections.map((section, index) => {
        const tone = index % 2 === 0 ? "dark" : "light";
        switch (section.type) {
          case "techStack":
            return (
              <TechStackSection key={section.id} id={section.id} tone={tone} title={section.title} groups={section.groups} />
            );
          case "featureGrid":
            return (
              <FeatureGridSection
                key={section.id}
                id={section.id}
                tone={tone}
                title={section.title}
                intro={section.intro}
                items={section.items}
              />
            );
          case "showcase":
            return <ShowcaseSection key={section.id} tone={tone} image={section.image} />;
          default:
            return (
              <CaseStudySection
                key={section.id}
                id={section.id}
                tone={tone}
                title={section.title}
                body={section.body}
                image={section.image}
                layout={section.layout}
              />
            );
        }
      })}
      <ContactCta />
    </>
  );
}
