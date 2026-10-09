import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CaseStudyItem, CaseStudyTextImageSection } from "@/contentful/queries/case-studies";
import { RichText } from "@/contentful/rich-text";

// Case-study sections alternate navy and white (the page picks the tone from the position).
export type SectionTone = "dark" | "light";

// SectionHeading options for a section's tone.
export const headingTone = (tone: SectionTone) => (tone === "dark" ? "onDark" : "onLight");
export const eyebrowTone = (tone: SectionTone) => (tone === "dark" ? "glass" : "brand");

// A light panel with a 1px brand-gradient border (tech stack tiles, call to action); the
// element also needs `border border-transparent`.
export const lightPanelStyle = {
  background: "linear-gradient(#f4f4f4, #fff) padding-box, var(--gradient-reverse) border-box",
};

// Text sizes shared by case-study cards (titles and body).
export const cardTitleClass = "font-display text-[clamp(1.125rem,1.35vw,1.625rem)] leading-tight font-semibold";
export const cardTextClass = "text-[clamp(0.9375rem,0.95vw,1.125rem)] leading-[1.8]";

// Wraps a section title. Titles come from Contentful, so they use SectionHeading's
// "fluid-wide" size (a first line up to ~12em never wraps), sized to one column of the
// two-column layout. Centred titles use the same size (the formula halved, as they sit in the
// full width) so every title on the page matches, and may wrap across the full width, with
// balanced lines.
export function CaseStudyTitle({ centered, children }: { centered: boolean; children: ReactNode }) {
  return (
    <div
      className={
        centered
          ? "@container [&_h2]:text-balance lg:[&_h2]:text-[clamp(2.25rem,min(calc(4.475cqw_-_7px),4.25vw),5.125rem)]"
          : "@container"
      }
    >
      {children}
    </div>
  );
}

// A section's eyebrow (optional), title (with *accent* words), and intro (optional), in the
// shared title size. Children marked data-reveal cascade in when wrapped in <Reveal>.
export function CaseStudyHeading({
  id,
  tone,
  eyebrow,
  title,
  intro,
  centered = false,
}: {
  id: string;
  tone: SectionTone;
  eyebrow?: string | null;
  title: string;
  intro?: string | null;
  centered?: boolean;
}) {
  return (
    <>
      <CaseStudyTitle centered={centered}>
        <SectionHeading
          id={id}
          eyebrow={eyebrow ?? undefined}
          eyebrowTone={eyebrowTone(tone)}
          title={withAccent(title)}
          tone={headingTone(tone)}
          size="fluid-wide"
          align={centered ? "center" : "left"}
        />
      </CaseStudyTitle>
      {intro && (
        <p
          data-reveal
          className={[
            "mt-5 max-w-[56em] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.9]",
            centered ? "mx-auto text-center" : "",
            tone === "dark" ? "text-light/80" : "text-primary/85",
          ].join(" ")}
        >
          {intro}
        </p>
      )}
    </>
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

// Label + value pairs in two columns (e.g. Industry: Books, Art & Entertainment).
function Facts({ facts, tone }: { facts: CaseStudyItem[]; tone: SectionTone }) {
  return (
    <dl data-reveal className="mt-[clamp(1.75rem,2vw,2.5rem)] grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-[clamp(1.25rem,1.6vw,2rem)] sm:grid-cols-2">
      {facts.map((fact) => (
        <div key={fact.title} className="font-display text-[clamp(1.0625rem,1.3vw,1.5625rem)] leading-snug font-semibold">
          <dt className="w-fit bg-brand-gradient-reverse bg-clip-text text-transparent">{fact.title}</dt>
          <dd className={`mt-1 ${tone === "dark" ? "text-white" : "text-primary"}`}>{fact.text}</dd>
        </div>
      ))}
    </dl>
  );
}

// A box with a title and a short text (e.g. Services Provided).
function Highlight({ item, tone }: { item: CaseStudyItem; tone: SectionTone }) {
  return (
    <div
      data-reveal
      className={[
        "mt-[clamp(1.75rem,2vw,2.5rem)] rounded-[1.25rem] px-[clamp(1.25rem,1.3vw,1.5rem)] py-[clamp(1.25rem,1.3vw,1.5rem)]",
        tone === "dark"
          ? "bg-white/35 text-white shadow-[0_8px_24px_rgb(149_157_165_/_0.2)]"
          : "bg-primary/[0.04] text-primary ring-1 ring-primary/10",
      ].join(" ")}
    >
      <p className={cardTitleClass}>{item.title}</p>
      {item.text && <p className={`mt-1.5 ${cardTextClass} ${tone === "dark" ? "text-white/90" : "text-primary/80"}`}>{item.text}</p>}
    </div>
  );
}

// Title, text, and an image beside it (two columns from 1024px) or below it. On phones the
// image always follows the text. Images show at most at their own size, never stretched.
// Optional: an eyebrow above the title, facts and a highlight box under the text.
export function CaseStudySection({
  id,
  tone,
  eyebrow,
  title,
  body,
  image,
  layout,
  facts,
  highlight,
}: Omit<CaseStudyTextImageSection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;
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
        <CaseStudyHeading id={headingId} tone={tone} eyebrow={eyebrow} title={title} centered={below} />
        <RichText document={body} tone={headingTone(tone)} align={below ? "center" : "left"} className="mt-5" />
        {facts.length > 0 && <Facts facts={facts} tone={tone} />}
        {highlight && <Highlight item={highlight} tone={tone} />}
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
