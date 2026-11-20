import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudySwotSection } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame } from "./CaseStudySection";

const quadrants = [
  { key: "strengths", letter: "S", name: "Strengths", axis: "Internal · Helpful", dark: false },
  { key: "weaknesses", letter: "W", name: "Weaknesses", axis: "Internal · Harmful", dark: true },
  { key: "opportunities", letter: "O", name: "Opportunities", axis: "External · Helpful", dark: true },
  { key: "threats", letter: "T", name: "Threats", axis: "External · Harmful", dark: false },
] as const;

// "SWOT Analysis" (0018), right under the banner on white: a 2×2 matrix, light and navy cards in
// a checkerboard, with the Helpful / Harmful columns and Internal / External rows labelled on
// desktop and a "SWOT" badge where the four meet. Each card: a large outlined letter, the name,
// and its points. On phones the four cards stack, each labelled with its row and column.
export function SwotSection({ id, eyebrow, title, intro, ...points }: Omit<CaseStudySwotSection, "type">) {
  const headingId = `section-${id}-title`;
  return (
    <CaseStudySectionFrame headingId={headingId} tone="light">
      <Reveal>
        <CaseStudyHeading id={headingId} tone="light" eyebrow={eyebrow ?? "SWOT Analysis"} title={title} intro={intro} centered />
      </Reveal>

      <Reveal y={40} stagger={0.1} className="relative mt-[clamp(2.5rem,3.6vw,4.4rem)] lg:pl-12">
        {/* Axis labels (desktop): columns on top, rows down the side. */}
        <div aria-hidden="true" className="mb-4 hidden grid-cols-2 gap-5 font-mono text-[11px] tracking-[0.2em] text-primary/45 uppercase lg:grid">
          <p className="text-center">Helpful</p>
          <p className="text-center">Harmful</p>
        </div>
        <div aria-hidden="true" className="absolute top-12 bottom-0 left-0 hidden w-8 flex-col font-mono text-[11px] tracking-[0.2em] text-primary/45 uppercase lg:flex">
          <p className="flex flex-1 items-center justify-center [writing-mode:vertical-rl] rotate-180">Internal</p>
          <p className="flex flex-1 items-center justify-center [writing-mode:vertical-rl] rotate-180">External</p>
        </div>

        <div className="relative grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-2">
          {quadrants.map(({ key, letter, name, axis, dark }) => (
            <article
              key={key}
              data-reveal
              className={[
                "group relative isolate overflow-hidden rounded-[1.5rem] border p-[clamp(1.5rem,2.2vw,2.75rem)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1",
                dark
                  ? "border-white/10 bg-primary text-white shadow-[0_30px_60px_-35px_rgb(21_25_54_/_0.9)]"
                  : "border-primary/10 bg-white text-primary shadow-[0_24px_60px_-40px_rgb(21_25_54_/_0.55)] hover:shadow-[0_30px_60px_-30px_rgb(201_29_76_/_0.35)]",
              ].join(" ")}
            >
              {/* The big outlined letter in the corner. */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -top-[0.12em] right-[0.08em] -z-10 font-display text-[clamp(7rem,11vw,12rem)] leading-none font-bold transition-transform duration-700 ease-out group-hover:scale-105 ${
                  dark ? "text-transparent [-webkit-text-stroke:2px_rgb(250_97_67_/_0.35)]" : "text-transparent [-webkit-text-stroke:2px_rgb(201_29_76_/_0.18)]"
                }`}
              >
                {letter}
              </span>
              <p className={`font-mono text-[11px] tracking-[0.18em] uppercase ${dark ? "text-light/50" : "text-primary/45"} lg:hidden`}>{axis}</p>
              <h3 className="mt-1 flex items-center gap-3 font-display text-[clamp(1.375rem,1.7vw,2rem)] leading-tight font-semibold lg:mt-0">
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-gradient-reverse text-[16px] font-bold text-white shadow-[0_10px_24px_-10px_rgb(250_97_67_/_0.8)]"
                >
                  {letter}
                </span>
                {name}
              </h3>
              <ul className="mt-5 space-y-3">
                {points[key].map((point) => (
                  <li key={point} className={`flex gap-3 text-[clamp(0.9375rem,0.95vw,1.0625rem)] leading-relaxed ${dark ? "text-light/80" : "text-primary/75"}`}>
                    <span aria-hidden="true" className="mt-[0.6em] h-[2px] w-3.5 shrink-0 rounded-full bg-brand-gradient" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* Where the four meet. */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 z-10 hidden size-20 -translate-1/2 place-items-center rounded-full border-4 border-white bg-brand-gradient-reverse font-display text-[15px] font-bold tracking-[0.12em] text-white shadow-[0_20px_40px_-12px_rgb(201_29_76_/_0.7)] lg:grid"
          >
            SWOT
          </span>
        </div>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
