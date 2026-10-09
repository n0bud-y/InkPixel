import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudyFeatureGridSection } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, type SectionTone } from "./CaseStudySection";

// Card: white with the brand gradient at 10%, and a 1px gradient border (both from the design).
const cardBackground =
  "linear-gradient(rgb(255 255 255 / 0.9), rgb(255 255 255 / 0.9)) padding-box, var(--gradient-reverse) border-box";

// Title, intro, and numbered feature cards (01, 02, …), three per row on desktop.
export function FeatureGridSection({
  id,
  tone,
  title,
  intro,
  items,
}: Omit<CaseStudyFeatureGridSection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;

  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} title={title} intro={intro} centered />
      </Reveal>

      <Reveal y={30} delay={0.1}>
        <ol className="mt-[clamp(2.5rem,3vw,3.5rem)] grid grid-cols-[minmax(0,1fr)] gap-[clamp(1rem,1.4vw,1.75rem)] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={index}
              data-reveal
              style={{ background: cardBackground }}
              className="flex flex-col items-center rounded-[1.25rem] border border-transparent px-6 py-[clamp(1.75rem,2.2vw,2.75rem)] text-center"
            >
              {/* The list itself is numbered for screen readers. */}
              <span
                aria-hidden="true"
                className="bg-brand-gradient-reverse bg-clip-text font-display text-[clamp(2.25rem,2.7vw,3.25rem)] leading-none font-bold text-transparent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-[clamp(0.75rem,1vw,1.25rem)] max-w-[24em] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.75] text-primary">
                {item}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
