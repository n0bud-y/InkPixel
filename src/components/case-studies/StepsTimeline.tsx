"use client";

import { useRef, useState, type CSSProperties } from "react";
import type { CaseStudyItem } from "@/contentful/queries/case-studies";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";
import { cardTextClass, cardTitleClass } from "./CaseStudySection";

// Card background: light grey with the brand gradient at 10% and a 1px gradient border (as before).
const pinkFill = "linear-gradient(rgb(248 248 248 / 0.9), rgb(248 248 248 / 0.9))";
const pinkCardWithBorder = {
  background: `${pinkFill} padding-box, var(--gradient-reverse) padding-box, var(--gradient-reverse) border-box`,
};

// The "Numbered steps" timeline (cards layout): cards alternate left and right of a dashed line
// (on phones and tablets, one column with the line on the left), each with its number in a bubble.
// While scrolling (motion allowed): a solid gradient line fills the dashed one, with a glowing dot
// at its tip; the card the line has reached lights up (gradient fill, white text, bigger bubble)
// and hands over to the next; cards slide in from their side. Hovering any card fills and lifts
// it. Reduced motion and no JavaScript: the static timeline, with the hover effect.
export function StepsTimeline({ items }: { items: CaseStudyItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      const list = root.current;
      if (!list) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const fill = list.querySelector<HTMLElement>("[data-fill]");
        const cards = gsap.utils.toArray<HTMLElement>("[data-step]", list);

        // The line fills as the list passes the middle of the screen.
        if (fill) {
          gsap.fromTo(
            fill,
            { scaleY: 0 },
            { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 60%", end: "bottom 60%", scrub: 0.4 } },
          );
        }

        cards.forEach((card, index) => {
          // Slide in from its side (left column from the left, right from the right; one column: left).
          const fromRight = index % 2 === 1 && window.matchMedia("(min-width: 64rem)").matches;
          gsap.from(card.querySelector("[data-card]"), {
            x: fromRight ? 70 : -70,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });
          // The current step: the last one whose top has passed 60% of the screen.
          ScrollTrigger.create({
            trigger: card,
            start: "top 60%",
            onEnter: () => setActive(index),
            onLeaveBack: () => setActive(index - 1),
          });
        });
        return () => setActive(-1);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative mt-[clamp(2.5rem,3.6vw,4.4rem)]">
      {/* The dashed line, and the gradient line that fills it while scrolling. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-[calc(clamp(2.75rem,3.2vw,3.875rem)/2-1px)] border-l-2 border-dashed border-coral/60 before:absolute before:-top-1 before:-left-[5px] before:size-2 before:rounded-full before:bg-coral after:absolute after:-bottom-1 after:-left-[5px] after:size-2 after:rounded-full after:bg-coral lg:left-[calc(50%-1px)]"
      >
        <span
          data-fill
          className="absolute top-0 -left-[2px] block h-full w-[2px] origin-top scale-y-0 bg-linear-to-b from-coral to-crimson motion-reduce:hidden"
        >
          <span className="absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-coral shadow-[0_0_0_5px_rgb(250_97_67_/_0.25),0_0_18px_4px_rgb(250_97_67_/_0.6)]" />
        </span>
      </div>

      <ol className="grid grid-cols-[minmax(0,1fr)] gap-y-6 lg:grid-cols-2 lg:gap-x-[clamp(7rem,22vw,32rem)] lg:gap-y-0">
        {items.map((item, index) => {
          const left = index % 2 === 0;
          const lit = index === active;
          return (
            <li
              key={item.title}
              data-step
              data-active={lit}
              className={[
                "group/step relative pl-[calc(clamp(2.75rem,3.2vw,3.875rem)+1.25rem)] lg:pl-0 lg:[grid-row:var(--row)/span_2]",
                left ? "lg:col-start-1" : "lg:col-start-2",
                index < items.length - 1 ? "lg:pb-[10.5vw]" : "",
              ].join(" ")}
              style={{ "--row": index + 1 } as CSSProperties}
            >
              <div
                data-card
                className="relative rounded-[1.25rem] border border-transparent transition-[translate,box-shadow] duration-500 ease-out group-hover/step:-translate-y-1.5 group-hover/step:shadow-[0_30px_60px_-28px_rgb(201_29_76_/_0.75)] group-data-[active=true]/step:shadow-[0_30px_60px_-28px_rgb(201_29_76_/_0.75)]"
                style={pinkCardWithBorder}
              >
                {/* The gradient fill, faded in when the card is current or hovered. */}
                <span
                  aria-hidden="true"
                  className="absolute -inset-px rounded-[1.25rem] bg-brand-gradient-reverse opacity-0 transition-opacity duration-500 ease-out group-hover/step:opacity-100 group-data-[active=true]/step:opacity-100"
                />
                <span
                  aria-hidden="true"
                  className={[
                    "absolute top-1/2 -left-[calc(clamp(2.75rem,3.2vw,3.875rem)+1.25rem)] z-10 flex size-[clamp(2.75rem,3.2vw,3.875rem)] -translate-y-1/2 items-center justify-center rounded-full bg-brand-gradient-reverse font-display text-[clamp(0.875rem,1vw,1.25rem)] font-bold text-white shadow-[0_8px_20px_-8px_rgb(227_70_22_/_0.8)] transition-transform duration-500 ease-out group-hover/step:scale-110 group-data-[active=true]/step:scale-115 group-data-[active=true]/step:shadow-[0_0_0_6px_rgb(250_97_67_/_0.2),0_10px_24px_-8px_rgb(227_70_22_/_0.9)]",
                    "after:absolute after:top-1/2 after:-right-1 after:size-3 after:-translate-y-1/2 after:rotate-45 after:bg-crimson",
                    left
                      ? "lg:top-[72%] lg:right-auto lg:left-[calc(100%+0.75vw)] lg:after:right-auto lg:after:-left-1 lg:after:bg-coral"
                      : "lg:top-0 lg:-left-[calc(clamp(2.75rem,3.2vw,3.875rem)+0.75vw)] lg:translate-y-0",
                  ].join(" ")}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative px-[clamp(1.25rem,1.6vw,2rem)] py-[clamp(1.5rem,2.4vw,2.9rem)]">
                  <h3
                    className={`${cardTitleClass} text-primary transition-colors duration-500 group-hover/step:text-white group-data-[active=true]/step:text-white`}
                  >
                    {item.title}
                  </h3>
                  {item.text && (
                    <p
                      className={`mt-3 ${cardTextClass} text-primary/75 transition-colors duration-500 group-hover/step:text-white/90 group-data-[active=true]/step:text-white/90`}
                    >
                      {item.text}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
