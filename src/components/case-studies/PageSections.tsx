import { BrandBoardSection } from "@/components/case-studies/BrandBoardSection";
import { CallToActionSection } from "@/components/case-studies/CallToActionSection";
import { CardsSection } from "@/components/case-studies/CardsSection";
import { CaseStudySection } from "@/components/case-studies/CaseStudySection";
import { FeatureGridSection } from "@/components/case-studies/FeatureGridSection";
import { FunnelSection } from "@/components/case-studies/FunnelSection";
import { GallerySection } from "@/components/case-studies/GallerySection";
import { ResultsSection } from "@/components/case-studies/ResultsSection";
import { ShowcaseSection } from "@/components/case-studies/ShowcaseSection";
import { SocialFeedSection } from "@/components/case-studies/SocialFeedSection";
import { SwotSection } from "@/components/case-studies/SwotSection";
import { TechStackSection } from "@/components/case-studies/TechStackSection";
import { VideoSection } from "@/components/case-studies/VideoSection";
import { TestimonialsSection } from "@/components/case-studies/TestimonialsSection";
import type { CaseStudySectionData } from "@/contentful/queries/case-studies";

// A case study's or a product's sections from Contentful, in order, alternating navy and white
// (starting with navy). A SWOT section (always on white, right under the banner) is left out of
// the alternation, so the sections after it keep their colours. `largerImage` and `removePadding` list text + image sections (by title)
// that need the design's larger image or no padding around it.
export function PageSections({
  sections,
  largerImage = [],
  removePadding = [],
}: {
  sections: CaseStudySectionData[];
  largerImage?: string[];
  removePadding?: string[];
}) {
  let index = -1;
  return sections.map((section) => {
    if (section.type === "swot") return <SwotSection key={section.id} {...section} />;
    index += 1;
    const tone = index % 2 === 0 ? "dark" : "light";
    switch (section.type) {
      case "textImage":
        return (
          <CaseStudySection
            key={section.id}
            tone={tone}
            largerImage={largerImage.includes(section.title)}
            removePadding={removePadding.includes(section.title)}
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
      case "brandBoard":
        return <BrandBoardSection key={section.id} tone={tone} {...section} />;
      case "socialFeed":
        return <SocialFeedSection key={section.id} tone={tone} {...section} />;
      case "funnel":
        return <FunnelSection key={section.id} tone={tone} {...section} />;
      case "results":
        return <ResultsSection key={section.id} tone={tone} {...section} />;
      case "videos":
        return <VideoSection key={section.id} tone={tone} {...section} />;
    }
  });
}
