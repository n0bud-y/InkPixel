import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudyFunnelSection } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, type SectionTone } from "./CaseStudySection";

// Widths of the stages, top to bottom, as % of the column: from 100% down to `100 - narrowing`.
const widths = (count: number, narrowing: number) =>
  Array.from({ length: count }, (_, index) => 100 - (index * narrowing) / Math.max(1, count - 1));

// Each band's sides slope in by half the step to the next band, so the stack reads as one funnel.
function clip(widthsList: number[], index: number) {
  const width = widthsList[index];
  const step = (widthsList[0] - widthsList[widthsList.length - 1]) / Math.max(1, widthsList.length - 1);
  const inset = ((step / 2) / width) * 100;
  return `polygon(0 0, 100% 0, ${100 - inset}% 100%, ${inset}% 100%)`;
}

// A campaign or lead-generation funnel: the heading on the left, the stages on the right as
// bands narrowing from coral (top) to crimson (bottom), each with its number, title, and text.
export function FunnelSection({
  id,
  tone,
  eyebrow,
  title,
  intro,
  stages,
}: Omit<CaseStudyFunnelSection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;
  const desktop = widths(stages.length, 44);
  const phone = widths(stages.length, 18);

  return (
    <CaseStudySectionFrame
      headingId={headingId}
      tone={tone}
      className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-[clamp(2rem,4vw,6rem)]"
    >
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} eyebrow={eyebrow} title={title} intro={intro} />
      </Reveal>

      <Reveal y={30} delay={0.1} stagger={0.12}>
        <ol className="flex flex-col items-center gap-[clamp(0.375rem,0.5vw,0.625rem)]">
          {stages.map((stage, index) => {
            const share = stages.length > 1 ? (index / (stages.length - 1)) * 100 : 0;
            return (
              <li
                key={index}
                data-reveal
                style={
                  {
                    "--w-phone": `${phone[index]}%`,
                    "--w": `${desktop[index]}%`,
                    "--clip-phone": clip(phone, index),
                    "--clip": clip(desktop, index),
                    background: `color-mix(in srgb, #c91d4c ${share.toFixed(0)}%, #fa6143)`,
                  } as CSSProperties
                }
                className="w-[var(--w-phone)] px-[clamp(2rem,3vw,3.5rem)] py-[clamp(1rem,1.3vw,1.5rem)] text-center text-white [clip-path:var(--clip-phone)] lg:w-[var(--w)] lg:[clip-path:var(--clip)]"
              >
                <p className="font-mono text-[11px] tracking-[0.2em] text-white/75 uppercase">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 font-display text-[clamp(1.0625rem,1.3vw,1.5rem)] leading-tight font-semibold">{stage.title}</p>
                {stage.text && (
                  <p className="mx-auto mt-1.5 max-w-[30em] text-[clamp(0.8125rem,0.85vw,1rem)] leading-[1.6] text-white/90">{stage.text}</p>
                )}
              </li>
            );
          })}
        </ol>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
