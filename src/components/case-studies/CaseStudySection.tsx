import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CaseStudyTextImageSection } from "@/contentful/queries/case-studies";
import { RichText } from "@/contentful/rich-text";

// Case-study sections alternate navy and white (the page picks the tone from the position).
export type SectionTone = "dark" | "light";

// Wraps a section title. Titles come from Contentful, so they use SectionHeading's
// "fluid-wide" size (a first line up to ~12em never wraps). Centred titles get the width of
// one column of the two-column layout, so every title on the page is the same size.
export function CaseStudyTitle({ centered, children }: { centered: boolean; children: ReactNode }) {
  return (
    <div className={centered ? "@container mx-auto lg:max-w-[calc(50%-clamp(1rem,2vw,3rem))]" : "@container"}>
      {children}
    </div>
  );
}

// Shared by every case-study section: background, page width, and vertical padding (the same
// padding as the home page's "Ideas Engineered Into Impact" section).
export function CaseStudySectionFrame({
  headingId,
  tone,
  className,
  children,
}: {
  headingId: string;
  tone: SectionTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={headingId}
      className={`relative isolate overflow-hidden ${tone === "dark" ? "bg-primary" : "bg-white bg-grid-light"}`}
    >
      <div className={["container-site py-[clamp(4rem,5.85vw,7rem)]", className].filter(Boolean).join(" ")}>
        {children}
      </div>
    </section>
  );
}

// Title, text, and an image beside it (two columns from 1024px) or below it. On phones the
// image always follows the text. Images show at most at their own size, never stretched.
export function CaseStudySection({
  id,
  tone,
  title,
  body,
  image,
  layout,
}: Omit<CaseStudyTextImageSection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;
  const textTone = tone === "dark" ? "onDark" : "onLight";
  const below = layout === "image-below";

  return (
    <CaseStudySectionFrame
      headingId={headingId}
      tone={tone}
      className={
        below
          ? undefined
          : "grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-2 lg:gap-[clamp(2rem,4vw,6rem)]"
      }
    >
      <Reveal>
        <CaseStudyTitle centered={below}>
          <SectionHeading id={headingId} title={title} tone={textTone} size="fluid-wide" align={below ? "center" : "left"} />
        </CaseStudyTitle>
        <RichText document={body} tone={textTone} align={below ? "center" : "left"} className="mt-5" />
      </Reveal>

      <Reveal
        y={50}
        delay={0.1}
        className={[
          "flex justify-center",
          below ? "mt-[clamp(2.5rem,3.5vw,4rem)]" : "",
          layout === "image-left" ? "lg:order-first" : "",
        ].join(" ")}
      >
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          alt={image.alt}
          unoptimized={image.isSvg}
          sizes={below ? "(min-width: 1024px) 85vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
          className="h-auto max-h-[clamp(24rem,37vw,45rem)] w-auto max-w-full"
        />
      </Reveal>
    </CaseStudySectionFrame>
  );
}
