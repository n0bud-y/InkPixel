import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudyShowcaseSection } from "@/contentful/queries/case-studies";
import type { SectionTone } from "./CaseStudySection";

// One image across the full width of the screen (e.g. a band of app screens), with no text, so
// it is a plain block rather than a labelled section. Same background and padding as the
// other case-study sections; the image may run to the screen edges, up to its own width.
export function ShowcaseSection({ tone, image }: Omit<CaseStudyShowcaseSection, "type" | "id"> & { tone: SectionTone }) {
  return (
    <div className={`overflow-hidden ${tone === "dark" ? "bg-primary" : "bg-white bg-grid-light"}`}>
      <Reveal y={50} className="py-[clamp(4rem,5.85vw,7rem)]">
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          alt={image.alt}
          unoptimized={image.isSvg}
          sizes={`min(100vw, ${image.width}px)`}
          className="mx-auto h-auto w-full"
          style={{ maxWidth: image.width }}
        />
      </Reveal>
    </div>
  );
}
