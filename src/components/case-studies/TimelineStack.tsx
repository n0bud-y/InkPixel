"use client";

import { useRef } from "react";
import type { CaseStudyItem } from "@/contentful/queries/case-studies";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

const PINNED = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";

// The cards of a "Timeline beside text (pinned)" section: the same stack and dotted line as the
// timeline layout, but on desktop (motion allowed) the section locks to the screen and, as you
// scroll, each card after the first rises from below into its place on the stack; the dot of
// the newest card lights up. Once the last card is in, the page scrolls on. The section is pinned
// just below the fixed header when it fits on screen, otherwise with its bottom on the screen's
// bottom (as HorizontalPin does). Phones, tablets, reduced motion, and no JavaScript: every card
// shows, and the last dot is lit, as in the plain timeline layout.
export function TimelineStack({
  items,
  tone,
  cardTitleClass,
  cardTextClass,
}: {
  items: CaseStudyItem[];
  tone: "dark" | "light";
  cardTitleClass: string;
  cardTextClass: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const column = root.current;
      const section = column?.closest("section");
      if (!column || !section) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", column);
      const dots = gsap.utils.toArray<HTMLElement>("[data-stack-dot]", column);
      if (cards.length < 2) return;

      const light = (count: number) =>
        dots.forEach((dot, i) => {
          if (i === count - 1) dot.dataset.on = "true";
          else delete dot.dataset.on;
        });

      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        const header = () => document.querySelector("header")?.offsetHeight ?? 0;
        const rest = cards.slice(1);
        // While locked, the section's padding shrinks to a small gap below the header and at
        // the bottom, so the whole section usually fits between the fixed header and the screen's
        // bottom edge (otherwise its top would sit under the header).
        const frame = column.parentElement;
        if (frame) gsap.set(frame, { paddingTop: "2rem", paddingBottom: "2rem" });
        gsap.set(rest, { yPercent: 70, autoAlpha: 0 });
        light(1);

        // One step per card, a short hold at the end so the last card can be read.
        const timeline = gsap.timeline({
          defaults: { ease: "power2.out", duration: 1 },
          scrollTrigger: {
            trigger: section,
            start: () => (section.offsetHeight <= window.innerHeight - header() ? `top ${header()}px` : "bottom bottom"),
            end: () => `+=${rest.length * window.innerHeight * 0.55}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate(self) {
              light(1 + Math.min(rest.length, Math.floor(self.progress * (rest.length + 0.25) + 0.15)));
            },
          },
        });
        rest.forEach((card) => timeline.to(card, { yPercent: 0, autoAlpha: 1 }));
        timeline.to({}, { duration: 0.25 });
        ScrollTrigger.refresh();

        return () => {
          light(cards.length);
          if (frame) gsap.set(frame, { clearProps: "paddingTop,paddingBottom" });
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative lg:pl-[clamp(2.25rem,2.5vw,3rem)]">
      <div
        aria-hidden="true"
        className={`absolute top-0 left-0 hidden h-[clamp(12rem,15.6vw,18.75rem)] w-1.5 flex-col items-center justify-around rounded-full lg:flex ${tone === "dark" ? "bg-[#f0f0f0]" : "bg-primary/10"}`}
      >
        {items.map((item, index) => (
          <span
            key={index}
            data-stack-dot
            data-on={index === items.length - 1 ? "true" : undefined}
            className="size-[1.125rem] shrink-0 rounded-full bg-[#d2d1d1] transition-[background,box-shadow,scale] duration-300 data-[on=true]:scale-125 data-[on=true]:bg-brand-gradient data-[on=true]:shadow-[0_0_14px_2px_rgb(227_70_22_/_0.55)]"
          />
        ))}
      </div>
      <ul>
        {items.map((item, index) => (
          <li
            key={item.title}
            data-stack-card
            className={[
              "relative rounded-[1.85rem] border border-transparent px-[clamp(1.5rem,1.6vw,2rem)] pt-[clamp(1.75rem,2.6vw,3.25rem)] shadow-[0_-18px_40px_-28px_rgb(21_25_54_/_0.45)]",
              index < items.length - 1 ? "pb-[clamp(3.5rem,4.6vw,5.5rem)]" : "pb-[clamp(1.75rem,2.6vw,3.25rem)]",
              index > 0 ? "-mt-[clamp(1.75rem,2.3vw,2.75rem)]" : "",
            ].join(" ")}
            style={{ background: "linear-gradient(#fff, #fff) padding-box, var(--gradient-reverse) border-box" }}
          >
            <h3 className={`${cardTitleClass} text-primary`}>{item.title}</h3>
            {item.text && <p className={`mt-3 ${cardTextClass} text-primary/80`}>{item.text}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
