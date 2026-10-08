import Image from "next/image";
import { Fragment } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { technologies } from "@/content/technologies";
import type { CaseStudyTechStackSection } from "@/contentful/queries/case-studies";
import { CaseStudySectionFrame, CaseStudyTitle, type SectionTone } from "./CaseStudySection";

// "Tech Stack Used": one white card per group, with the logos and the technology names.
export function TechStackSection({
  id,
  tone,
  title,
  groups,
}: Omit<CaseStudyTechStackSection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;

  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyTitle centered>
          <SectionHeading
            id={headingId}
            title={title}
            tone={tone === "dark" ? "onDark" : "onLight"}
            size="fluid-wide"
            align="center"
          />
        </CaseStudyTitle>
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
