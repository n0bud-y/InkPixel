import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { BrandColour, CaseStudyBrandBoardSection } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, lightPanelStyle, type SectionTone } from "./CaseStudySection";

// True when dark text reads better than white on this colour (relative luminance above ~0.5).
function isLight({ hex }: BrandColour) {
  const [r, g, b] = [1, 3, 5].map((start) => {
    const channel = parseInt(hex.slice(start, start + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45;
}

type BoardProps = Omit<CaseStudyBrandBoardSection, "type"> & { tone: SectionTone };

// A brand identity, as a board beside the heading (Board) or across the page (Wide).
export function BrandBoardSection(props: BoardProps) {
  return props.layout === "wide" ? <WideBoard {...props} /> : <Board {...props} />;
}

// The heading centred above; the logo on white beside tall colour stripes (two per row on phones),
// the typefaces under them, then the tagline large in the brand gradient.
function WideBoard({ id, tone, eyebrow, title, intro, logo, colours, typefaces, tagline }: BoardProps) {
  const headingId = `section-${id}-title`;
  const dark = tone === "dark";

  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} eyebrow={eyebrow} title={title} intro={intro} centered />
      </Reveal>
      <Reveal y={40} delay={0.1}>
        <div
          className={`mt-[clamp(2.5rem,3.5vw,4.5rem)] grid grid-cols-[minmax(0,1fr)] gap-[clamp(0.75rem,1vw,1.25rem)] ${logo ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]" : ""}`}
        >
          {logo && (
            <div
              data-reveal
              className="flex min-h-[clamp(12rem,22vw,28rem)] items-center justify-center rounded-[1.5rem] bg-white bg-grid-light p-[clamp(1.5rem,3vw,4rem)] ring-1 ring-primary/10"
            >
              <Image
                src={logo.url}
                width={logo.width}
                height={logo.height}
                alt={logo.alt}
                unoptimized={logo.isSvg}
                sizes="(min-width: 1024px) 35vw, 80vw"
                className="h-auto max-h-[18rem] w-auto max-w-full object-contain"
              />
            </div>
          )}
          <ul aria-label="Colour palette" className="grid grid-cols-2 gap-[clamp(0.75rem,1vw,1.25rem)] sm:flex">
            {colours.map((colour) => (
              <li
                key={colour.name + colour.hex}
                data-reveal
                style={{ backgroundColor: colour.hex }}
                className={[
                  "flex h-[clamp(9rem,22vw,28rem)] flex-1 flex-col justify-end rounded-[1.5rem] p-[clamp(0.875rem,1.2vw,1.5rem)] ring-1",
                  isLight(colour) ? "text-primary ring-primary/10" : "text-white ring-white/10",
                ].join(" ")}
              >
                <span className="font-display text-[clamp(1rem,1.2vw,1.375rem)] leading-tight font-semibold">{colour.name}</span>
                <span className="mt-1 font-mono text-[11px] tracking-[0.12em] uppercase opacity-75">{colour.hex}</span>
              </li>
            ))}
          </ul>
        </div>
        {typefaces.length > 0 && (
          <ul aria-label="Typefaces" className="mt-[clamp(0.75rem,1vw,1.25rem)] flex flex-wrap gap-3">
            {typefaces.map((typeface) => (
              <li
                key={typeface}
                data-reveal
                className={`rounded-full px-5 py-2.5 text-sm ring-1 ${dark ? "text-light/85 ring-white/15" : "text-primary/80 ring-primary/15"}`}
              >
                <span className="font-display font-bold">Aa</span> · {typeface}
              </li>
            ))}
          </ul>
        )}
        {tagline && (
          <figure data-reveal className="mt-[clamp(2.5rem,4vw,5rem)] text-center">
            <figcaption className={`font-mono text-[11px] tracking-[0.2em] uppercase ${dark ? "text-light/60" : "text-primary/55"}`}>Tagline</figcaption>
            <blockquote className="mx-auto mt-3 w-fit max-w-full bg-brand-gradient-reverse bg-clip-text font-display text-[clamp(2.25rem,5.4vw,6.5rem)] leading-[1.02] font-bold tracking-[-0.03em] text-balance text-transparent">
              “{tagline}”
            </blockquote>
          </figure>
        )}
      </Reveal>
    </CaseStudySectionFrame>
  );
}

// The heading, intro, and tagline on the left; on the right a board with the logo on white, the
// colour swatches (name and hex code), and the typefaces.
function Board({ id, tone, eyebrow, title, intro, logo, colours, typefaces, tagline }: BoardProps) {
  const headingId = `section-${id}-title`;
  const dark = tone === "dark";

  return (
    <CaseStudySectionFrame
      headingId={headingId}
      tone={tone}
      className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-[clamp(2rem,4vw,6rem)]"
    >
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} eyebrow={eyebrow} title={title} intro={intro} />
        {tagline && (
          <figure data-reveal className="mt-[clamp(1.75rem,2.4vw,3rem)] border-l-2 border-coral pl-[clamp(1rem,1.3vw,1.5rem)]">
            <figcaption className={`font-mono text-[11px] tracking-[0.2em] uppercase ${dark ? "text-light/60" : "text-primary/55"}`}>
              Tagline
            </figcaption>
            <blockquote
              className={`mt-2 font-display text-[clamp(1.375rem,2vw,2.5rem)] leading-[1.15] font-semibold ${dark ? "text-white" : "text-primary"}`}
            >
              “{tagline}”
            </blockquote>
          </figure>
        )}
      </Reveal>

      <Reveal y={40} delay={0.1}>
        <div
          className={[
            "grid gap-[clamp(0.625rem,0.9vw,1.125rem)] rounded-[1.5rem] border p-[clamp(0.75rem,1.2vw,1.5rem)]",
            dark ? "border-white/10 bg-white/[0.04]" : "border-transparent",
          ].join(" ")}
          style={dark ? undefined : lightPanelStyle}
        >
          {logo && (
            <div
              data-reveal
              className="flex h-[clamp(11rem,17vw,20rem)] items-center justify-center rounded-[1rem] bg-white bg-grid-light p-[clamp(1.25rem,2.4vw,3rem)] ring-1 ring-primary/10"
            >
              <Image
                src={logo.url}
                width={logo.width}
                height={logo.height}
                alt={logo.alt}
                unoptimized={logo.isSvg}
                sizes="(min-width: 1024px) 30vw, 70vw"
                className="h-auto max-h-full w-auto max-w-full object-contain"
              />
            </div>
          )}

          {/* One row for up to four colours (two per row on phones), three per row for five or six. */}
          <ul
            aria-label="Colour palette"
            className="grid grid-cols-2 gap-[clamp(0.625rem,0.9vw,1.125rem)] sm:[grid-template-columns:repeat(var(--columns),minmax(0,1fr))]"
            style={{ "--columns": colours.length <= 4 ? colours.length : 3 } as CSSProperties}
          >
            {colours.map((colour) => (
              <li
                key={colour.name + colour.hex}
                data-reveal
                style={{ backgroundColor: colour.hex }}
                className={[
                  "flex h-[clamp(6.5rem,8.5vw,10rem)] flex-col justify-end rounded-[1rem] p-[clamp(0.75rem,1vw,1.25rem)] ring-1",
                  isLight(colour) ? "text-primary ring-primary/10" : "text-white ring-white/10",
                ].join(" ")}
              >
                <span className="font-display text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-tight font-semibold">{colour.name}</span>
                <span className="mt-1 font-mono text-[11px] tracking-[0.12em] uppercase opacity-75">{colour.hex}</span>
              </li>
            ))}
          </ul>

          {typefaces.length > 0 && (
            <ul
              aria-label="Typefaces"
              className="grid gap-[clamp(0.625rem,0.9vw,1.125rem)]"
              style={{ gridTemplateColumns: `repeat(${typefaces.length}, minmax(0, 1fr))` }}
            >
              {typefaces.map((typeface) => (
                <li
                  key={typeface}
                  data-reveal
                  className={`rounded-[1rem] p-[clamp(0.75rem,1vw,1.25rem)] ring-1 ${dark ? "bg-white/[0.06] text-white ring-white/10" : "bg-white text-primary ring-primary/10"}`}
                >
                  <span aria-hidden="true" className="block font-display text-[clamp(2rem,2.8vw,3.5rem)] leading-none font-bold">
                    Aa
                  </span>
                  <span className="mt-2 block text-[clamp(0.875rem,0.95vw,1.0625rem)]">{typeface}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
