import type { CSSProperties } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudyResultsSection } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, type SectionTone } from "./CaseStudySection";

// "+150%" → counts up to 150 between "+" and "%". Decimals and anything else (e.g. "3.2x") are
// shown as typed.
function Metric({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  if (!match) return <>{value}</>;
  return <CountUp prefix={match[1]} value={Number(match[2])} suffix={match[3]} />;
}

// Result numbers with their labels, in cards with the brand-gradient number. Contentful only
// returns this section once it has a metric, and the content model asks for real, approved
// figures only.
export function ResultsSection({
  id,
  tone,
  eyebrow,
  title,
  intro,
  metrics,
}: Omit<CaseStudyResultsSection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;
  const dark = tone === "dark";

  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} eyebrow={eyebrow} title={title} intro={intro} centered />
      </Reveal>
      <Reveal y={30} delay={0.1}>
        <ul
          className="mx-auto mt-[clamp(2.5rem,3vw,3.5rem)] grid grid-cols-2 gap-[clamp(0.75rem,1.4vw,1.75rem)] lg:[grid-template-columns:repeat(var(--columns),minmax(0,1fr))]"
          style={{ "--columns": Math.min(metrics.length, 4) } as CSSProperties}
        >
          {metrics.map((metric) => (
            <li
              key={metric.title + metric.text}
              data-reveal
              className={[
                "flex flex-col items-center rounded-[1.25rem] px-5 py-[clamp(1.75rem,2.2vw,2.75rem)] text-center ring-1",
                dark ? "bg-white/[0.04] ring-white/10" : "bg-white ring-primary/10",
              ].join(" ")}
            >
              <span className="bg-brand-gradient-reverse bg-clip-text font-display text-[clamp(2.25rem,3.4vw,4.25rem)] leading-none font-bold text-transparent">
                <Metric value={metric.title} />
              </span>
              {metric.text && (
                <span className={`mt-3 text-[clamp(0.875rem,1vw,1.1875rem)] leading-snug ${dark ? "text-light/80" : "text-primary/80"}`}>
                  {metric.text}
                </span>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
