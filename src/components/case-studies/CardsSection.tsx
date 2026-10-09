import Image from "next/image";
import type { CSSProperties } from "react";
import checkIcon from "@/assets/images/icons/case-study-check.svg";
import solutionIcon from "@/assets/images/icons/case-study-solution.svg";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudyCardsSection, CaseStudyItem } from "@/contentful/queries/case-studies";
import {
  CaseStudyHeading,
  CaseStudySectionFrame,
  cardTextClass,
  cardTitleClass,
  type SectionTone,
} from "./CaseStudySection";

type CardsProps = Omit<CaseStudyCardsSection, "type"> & { tone: SectionTone };

// Card backgrounds from the design. Light grey with the brand gradient at 10% (icon grid,
// numbered steps), optionally with a 1px gradient border; white with a gradient border (timeline).
const pinkFill = "linear-gradient(rgb(248 248 248 / 0.9), rgb(248 248 248 / 0.9))";
const pinkCard = { background: `${pinkFill}, var(--gradient-reverse)` };
const pinkCardWithBorder = {
  background: `${pinkFill} padding-box, var(--gradient-reverse) padding-box, var(--gradient-reverse) border-box`,
};
const whiteCardWithBorder = { background: "linear-gradient(#fff, #fff) padding-box, var(--gradient-reverse) border-box" };

// Cards in one of four layouts (picked per section in Contentful).
export function CardsSection(props: CardsProps) {
  switch (props.layout) {
    case "timeline":
      return <TimelineCards {...props} />;
    case "icon-grid":
      return <IconGridCards {...props} />;
    case "around-image":
      return <AroundImageCards {...props} />;
    case "steps":
      return <NumberedSteps {...props} />;
  }
}

const headingId = (id: string) => `section-${id}-title`;

// Text and image on the left; on the right, the cards stacked so each one overlaps the one
// before it, beside a short line with a dot per card (the last one highlighted).
function TimelineCards({ id, tone, eyebrow, title, intro, image, items }: CardsProps) {
  return (
    <CaseStudySectionFrame
      headingId={headingId(id)}
      tone={tone}
      className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-2 lg:gap-[clamp(2rem,4vw,6rem)]"
    >
      <Reveal>
        <CaseStudyHeading id={headingId(id)} tone={tone} eyebrow={eyebrow} title={title} intro={intro} />
        {image && (
          <div data-reveal className="mt-[clamp(1.5rem,2vw,2.5rem)] overflow-hidden rounded-[1.3rem]">
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alt}
              unoptimized={image.isSvg}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        )}
      </Reveal>

      <Reveal y={40} delay={0.1} className="relative lg:pl-[clamp(2.25rem,2.5vw,3rem)]">
        <div
          aria-hidden="true"
          className={`absolute top-0 left-0 hidden h-[clamp(12rem,15.6vw,18.75rem)] w-1.5 flex-col items-center justify-around rounded-full lg:flex ${tone === "dark" ? "bg-[#f0f0f0]" : "bg-primary/10"}`}
        >
          {items.map((item, index) =>
            index === items.length - 1 ? (
              <span key={index} className="size-[1.4rem] shrink-0 rounded-full bg-brand-gradient shadow-[0_0_14px_2px_rgb(227_70_22_/_0.55)]" />
            ) : (
              <span key={index} className="size-[1.125rem] shrink-0 rounded-full bg-[#d2d1d1]" />
            ),
          )}
        </div>
        <ul>
          {items.map((item, index) => (
            <li
              key={item.title}
              data-reveal
              className={[
                "relative rounded-[1.85rem] border border-transparent px-[clamp(1.5rem,1.6vw,2rem)] pt-[clamp(1.75rem,2.6vw,3.25rem)]",
                index < items.length - 1 ? "pb-[clamp(3.5rem,4.6vw,5.5rem)]" : "pb-[clamp(1.75rem,2.6vw,3.25rem)]",
                index > 0 ? "-mt-[clamp(1.75rem,2.3vw,2.75rem)]" : "",
              ].join(" ")}
              style={whiteCardWithBorder}
            >
              <h3 className={`${cardTitleClass} text-primary`}>{item.title}</h3>
              {item.text && <p className={`mt-3 ${cardTextClass} text-primary/80`}>{item.text}</p>}
            </li>
          ))}
        </ul>
      </Reveal>
    </CaseStudySectionFrame>
  );
}

// Centred heading, then cards with the brand icon, three per row.
function IconGridCards({ id, tone, eyebrow, title, intro, items }: CardsProps) {
  return (
    <CaseStudySectionFrame headingId={headingId(id)} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId(id)} tone={tone} eyebrow={eyebrow} title={title} intro={intro} centered />
      </Reveal>
      <Reveal y={30} delay={0.1}>
        <ul className="mt-[clamp(2.5rem,3.3vw,4rem)] grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.title}
              data-reveal
              className="rounded-[1.25rem] px-[clamp(1.25rem,1.8vw,2.25rem)] py-[clamp(1.5rem,2.6vw,3.1rem)]"
              style={pinkCard}
            >
              <Image src={solutionIcon} alt="" className="size-[clamp(1.75rem,1.8vw,2.125rem)]" />
              <h3 className={`mt-[clamp(1rem,1.3vw,1.5rem)] ${cardTitleClass} text-primary`}>{item.title}</h3>
              {item.text && <p className={`mt-3 ${cardTextClass} text-primary/75`}>{item.text}</p>}
            </li>
          ))}
        </ul>
      </Reveal>
    </CaseStudySectionFrame>
  );
}

function CheckCard({ item }: { item: CaseStudyItem }) {
  return (
    <>
      <div className="flex items-center gap-[clamp(0.75rem,0.75vw,0.9rem)]">
        <Image src={checkIcon} alt="" className="size-[clamp(2.25rem,2.6vw,3.125rem)] shrink-0" />
        <h3 className={`${cardTitleClass} text-primary`}>{item.title}</h3>
      </div>
      {item.text && <p className={`mt-[clamp(1rem,1.4vw,1.75rem)] ${cardTextClass} text-primary/80`}>{item.text}</p>}
    </>
  );
}

// Centred heading, then the image in the middle with the cards on both sides (odd cards on the
// left, even on the right); the middle cards of each side sit further out, around the image.
// On phones and tablets: the image, then the cards in order.
function AroundImageCards({ id, tone, eyebrow, title, intro, image, items }: CardsProps) {
  const rows = Math.ceil(items.length / 2);

  return (
    <CaseStudySectionFrame headingId={headingId(id)} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId(id)} tone={tone} eyebrow={eyebrow} title={title} intro={intro} centered />
      </Reveal>
      <Reveal
        y={30}
        delay={0.1}
        className="mt-[clamp(2.5rem,3.6vw,4.4rem)] grid grid-cols-[minmax(0,1fr)] items-center gap-5 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_21vw_minmax(0,1fr)] lg:gap-x-[4vw] lg:gap-y-[clamp(1rem,1.6vw,1.9rem)]"
      >
        {image && (
          <div
            data-reveal
            className="flex justify-center sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:[grid-row:1/span_var(--rows)]"
            style={{ "--rows": rows } as CSSProperties}
          >
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alt}
              unoptimized={image.isSvg}
              sizes="(min-width: 1024px) 21vw, 60vw"
              className="h-auto w-full max-w-[25.5rem]"
            />
          </div>
        )}
        {items.map((item, index) => {
          const left = index % 2 === 0;
          const row = Math.floor(index / 2) + 1;
          const middle = row > 1 && row < rows;
          return (
            <div
              key={item.title}
              data-reveal
              className={[
                "rounded-[1.25rem] bg-[#f8f8f8] px-[clamp(1.25rem,1.6vw,2rem)] py-[clamp(1.5rem,2vw,2.5rem)] ring-1 ring-[#ededed] lg:[grid-row:var(--row)]",
                left ? "lg:col-start-1" : "lg:col-start-3",
                middle ? (left ? "lg:-translate-x-[4vw]" : "lg:translate-x-[4vw]") : "",
              ].join(" ")}
              style={{ "--row": row } as CSSProperties}
            >
              <CheckCard item={item} />
            </div>
          );
        })}
      </Reveal>
    </CaseStudySectionFrame>
  );
}

// Centred heading, then a zig-zag timeline: cards alternate left and right of a dashed line,
// each with its number (01, 02, …) in a bubble pointing at it; the first card is filled with the
// brand gradient. On phones and tablets: one column, the line and numbers on the left.
function NumberedSteps({ id, tone, eyebrow, title, intro, items }: CardsProps) {
  return (
    <CaseStudySectionFrame headingId={headingId(id)} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId(id)} tone={tone} eyebrow={eyebrow} title={title} intro={intro} centered />
      </Reveal>
      <Reveal y={30} delay={0.1} className="relative mt-[clamp(2.5rem,3.6vw,4.4rem)]">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-[calc(clamp(2.75rem,3.2vw,3.875rem)/2-1px)] border-l-2 border-dashed border-coral before:absolute before:-top-1 before:-left-[5px] before:size-2 before:rounded-full before:bg-coral after:absolute after:-bottom-1 after:-left-[5px] after:size-2 after:rounded-full after:bg-coral lg:left-[calc(50%-1px)]"
        />
        <ol className="grid grid-cols-[minmax(0,1fr)] gap-y-6 lg:grid-cols-2 lg:gap-x-[clamp(7rem,22vw,32rem)] lg:gap-y-0">
          {items.map((item, index) => {
            const left = index % 2 === 0;
            const first = index === 0;
            return (
              <li
                key={item.title}
                data-reveal
                className={[
                  "relative pl-[calc(clamp(2.75rem,3.2vw,3.875rem)+1.25rem)] lg:pl-0 lg:[grid-row:var(--row)/span_2]",
                  left ? "lg:col-start-1" : "lg:col-start-2",
                  index < items.length - 1 ? "lg:pb-[10.5vw]" : "",
                ].join(" ")}
                style={{ "--row": index + 1 } as CSSProperties}
              >
                <div
                  className="relative rounded-[1.25rem] border border-transparent px-[clamp(1.25rem,1.6vw,2rem)] py-[clamp(1.5rem,2.4vw,2.9rem)]"
                  style={first ? { background: "var(--gradient-reverse)" } : pinkCardWithBorder}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute top-1/2 -left-[calc(clamp(2.75rem,3.2vw,3.875rem)+1.25rem)] flex size-[clamp(2.75rem,3.2vw,3.875rem)] -translate-y-1/2 items-center justify-center rounded-full bg-brand-gradient-reverse font-display text-[clamp(0.875rem,1vw,1.25rem)] font-bold text-white shadow-[0_8px_20px_-8px_rgb(227_70_22_/_0.8)]",
                      "after:absolute after:top-1/2 after:-right-1 after:size-3 after:-translate-y-1/2 after:rotate-45 after:bg-crimson",
                      left
                        ? "lg:top-[72%] lg:right-auto lg:left-[calc(100%+0.75vw)] lg:after:right-auto lg:after:-left-1 lg:after:bg-coral"
                        : "lg:top-0 lg:-left-[calc(clamp(2.75rem,3.2vw,3.875rem)+0.75vw)] lg:translate-y-0",
                    ].join(" ")}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`${cardTitleClass} ${first ? "text-white" : "text-primary"}`}>{item.title}</h3>
                  {item.text && (
                    <p className={`mt-3 ${cardTextClass} ${first ? "text-white/90" : "text-primary/75"}`}>{item.text}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
