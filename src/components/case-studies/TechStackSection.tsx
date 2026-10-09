import Image from "next/image";
import { Fragment } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { technologies } from "@/content/technologies";
import type { CaseStudyTechStackSection } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, lightPanelStyle, type SectionTone } from "./CaseStudySection";

// "Tech Stack Used" in one of two layouts: cards (one white card per group, with the logos,
// the group's label, and the technology names) or tiles (every technology as a logo tile, in a
// light panel; group labels are not shown).
export function TechStackSection({
  id,
  tone,
  title,
  layout,
  groups,
}: Omit<CaseStudyTechStackSection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;

  if (layout === "tiles") {
    const slugs = [...new Set(groups.flatMap((group) => group.technologies))];
    return (
      <CaseStudySectionFrame headingId={headingId} tone={tone}>
        <Reveal>
          <div
            className="rounded-[1.25rem] border border-transparent px-[clamp(1.25rem,4.3vw,5.25rem)] py-[clamp(2.5rem,3.4vw,4rem)]"
            style={lightPanelStyle}
          >
            <CaseStudyHeading id={headingId} tone="light" title={title} centered />
            <ul className="mt-[clamp(2rem,3vw,3.5rem)] flex flex-wrap justify-center gap-[clamp(0.75rem,2.6vw,3.125rem)]">
              {slugs.map((slug) => {
                const technology = technologies[slug];
                return (
                  <li
                    key={slug}
                    data-reveal
                    className="flex w-[clamp(7.5rem,12.6vw,15.125rem)] flex-col items-center justify-center gap-3 rounded-[0.9375rem] bg-white px-3 py-[clamp(1rem,1.6vw,1.875rem)] shadow-[0_10px_30px_-18px_rgb(21_25_54_/_0.35)]"
                  >
                    {/* Decorative: the name is written under the logo. */}
                    <Image src={technology.logo} alt="" className="size-[clamp(3rem,4.9vw,5.875rem)] object-contain" />
                    <span className="text-center text-[clamp(0.8125rem,0.85vw,1rem)] text-primary/80">{technology.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </CaseStudySectionFrame>
    );
  }

  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} title={title} centered />
      </Reveal>

      <Reveal y={30} delay={0.1}>
        <ul className="mt-[clamp(2.5rem,3vw,3.5rem)] flex flex-wrap justify-center gap-[clamp(1rem,1.5vw,1.75rem)]">
          {groups.map((group, index) => {
            const items = group.technologies.map((slug) => technologies[slug]);
            return (
              <li
                key={`${group.label}-${index}`}
                data-reveal
                className="flex flex-wrap items-center justify-center gap-x-[clamp(1.25rem,1.6vw,2rem)] gap-y-4 rounded-2xl bg-white px-[clamp(1.25rem,1.6vw,2rem)] py-[clamp(1rem,1.25vw,1.5rem)] text-primary shadow-[0_18px_40px_-24px_rgb(21_25_54_/_0.45)] ring-1 ring-primary/10"
              >
                <div className="flex items-center gap-[clamp(1rem,1.2vw,1.5rem)]">
                  {items.map((technology, itemIndex) => (
                    <Fragment key={technology.name}>
                      {itemIndex > 0 && <span aria-hidden="true" className="h-8 w-px bg-primary/15" />}
                      {/* Decorative: the names are listed next to the logos. */}
                      <Image src={technology.logo} alt="" className="h-[clamp(1.75rem,2vw,2.5rem)] w-auto" />
                    </Fragment>
                  ))}
                </div>
                <div>
                  <h3 className="font-display text-[clamp(1rem,1.05vw,1.25rem)] leading-tight font-semibold">
                    {group.label}
                  </h3>
                  <p className="mt-1 text-[clamp(0.8125rem,0.85vw,1rem)] text-primary/60">
                    {items.map((technology) => technology.name).join(", ")}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
