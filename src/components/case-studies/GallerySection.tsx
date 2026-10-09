import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudyGallerySection } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, type SectionTone } from "./CaseStudySection";

// "App Screens": a centred heading, then the screens four per row (two on phones), every second
// one sitting higher, as in the design.
export function GallerySection({
  id,
  tone,
  title,
  intro,
  images,
}: Omit<CaseStudyGallerySection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;

  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} title={title} intro={intro} centered />
      </Reveal>
      <Reveal y={40} delay={0.1}>
        <ul className="mt-[clamp(2rem,3vw,3.5rem)] grid grid-cols-2 gap-x-[clamp(0.75rem,1.4vw,1.75rem)] gap-y-[clamp(1.5rem,2.8vw,3.5rem)] lg:grid-cols-4">
          {images.map((image, index) => (
            <li key={image.url} data-reveal className={`flex justify-center ${index % 2 === 0 ? "mt-[clamp(1.5rem,4.2vw,5rem)]" : ""}`}>
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alt}
                unoptimized={image.isSvg}
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="h-auto w-full max-w-[24rem]"
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
