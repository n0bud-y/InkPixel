import Image from "next/image";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import type { CaseStudyCallToActionSection } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, lightPanelStyle, type SectionTone } from "./CaseStudySection";

// A light panel with a gradient border: centred title, text, and button, then the image at the
// bottom, cut off by the panel's edge (the image is exported that way).
export function CallToActionSection({
  id,
  tone,
  title,
  text,
  button,
  image,
}: Omit<CaseStudyCallToActionSection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;

  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <div
          className={`overflow-hidden rounded-[1.25rem] border border-transparent px-[clamp(1.25rem,4vw,5rem)] pt-[clamp(2.5rem,3.4vw,4rem)] text-center ${image ? "" : "pb-[clamp(2.5rem,3.4vw,4rem)]"}`}
          style={lightPanelStyle}
        >
          <CaseStudyHeading id={headingId} tone="light" title={title} intro={text} centered />
          {button && (
            <div data-reveal className="mt-[clamp(1.5rem,1.8vw,2.25rem)]">
              <Magnetic>
                <Button href={button.href} variant="primary-reverse" icon>
                  {button.label}
                </Button>
              </Magnetic>
            </div>
          )}
          {image && (
            <div data-reveal className="mt-[clamp(2rem,2.6vw,3rem)] flex justify-center">
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alt}
                unoptimized={image.isSvg}
                sizes="(min-width: 1024px) 65vw, 100vw"
                className="h-auto w-full max-w-[78rem]"
              />
            </div>
          )}
        </div>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
