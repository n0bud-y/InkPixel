"use client";

import { useRef } from "react";
import {
  TimelineLine,
  TimelineMarker,
  timelineCard,
  timelineGap,
  timelineGutter,
} from "@/components/ui/Timeline";
import type { ProcessStep, processOutcome } from "@/content/home";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

// The process timeline.
// - Desktop (and motion allowed): the whole section locks to one screen while the timeline
//   scrolls inside its window; once the last card ("Live") is fully visible, it unlocks.
//   GSAP marks the section data-pinned="true", which (classes below and in Process.tsx) gives
//   the section the screen's height and turns the timeline column into a clipping window; a
//   ScrollTrigger then pins the section and moves the list up by exactly the hidden distance.
// - Elsewhere, and without JavaScript, it is a normal list.
// - One card at a time is "active" (peach → pink, coral border, and its dot grows into the
//   gradient tick badge): the highlight walks from the first card to "Live" as you scroll, and
//   back when scrolling up. Without JavaScript, "Live" is active, as in the design.

const PINNED = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";
const UNPINNED = "(max-width: 63.999rem), (prefers-reduced-motion: reduce)";

export function ProcessTimeline({
  steps,
  outcome,
}: {
  steps: ProcessStep[];
  outcome: typeof processOutcome;
}) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const window_ = viewport.current;
      const list = track.current;
      const section = window_?.closest("section");
      if (!window_ || !list || !section) return;

      const items = Array.from(list.querySelectorAll<HTMLLIElement>(":scope > ol > li"));
      const last = items.length - 1;
      let current = -1;
      const activate = (index: number) => {
        if (index === current) return;
        current = index;
        items.forEach((item, i) => {
          if (i === index) item.dataset.active = "true";
          else delete item.dataset.active;
        });
      };

      const mm = gsap.matchMedia();

      // Locked: the highlight follows a focus line that moves from the top of the window
      // (start) to its bottom (end), so it starts on the first card and ends on "Live".
      mm.add(PINNED, () => {
        section.dataset.pinned = "true";
        const hidden = () => Math.max(0, list.offsetHeight - window_.clientHeight);
        const follow = (progress: number) => {
          const box = window_.getBoundingClientRect();
          const focus = box.top + progress * box.height;
          let nearest = 0;
          let best = Infinity;
          items.forEach((item, i) => {
            const r = item.getBoundingClientRect();
            const distance = focus < r.top ? r.top - focus : focus > r.bottom ? focus - r.bottom : 0;
            if (distance < best) {
              best = distance;
              nearest = i;
            }
          });
          activate(nearest);
        };

        gsap.to(list, {
          y: () => -hidden(),
          ease: "none",
          onUpdate() {
            follow(this.progress());
          },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${hidden()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        activate(0);
        ScrollTrigger.refresh();

        return () => {
          delete section.dataset.pinned;
        };
      });

      // Not locked: the card crossing the middle of the screen is active.
      mm.add(UNPINNED, () => {
        activate(0);
        items.forEach((item, i) =>
          ScrollTrigger.create({
            trigger: item,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (self.isActive) activate(i);
            },
          }),
        );
      });

      return () => {
        mm.revert();
        current = -1;
        activate(last);
      };
    },
    { scope: viewport },
  );

  return (
    // While pinned: fills the row, clips the list, and fades the top and bottom edges. The -mx/px
    // pair widens the clipping box so the tick badge and card shadows are not cut off.
    <div
      ref={viewport}
      className="relative min-h-0 group-data-[pinned=true]/process:-mx-6 group-data-[pinned=true]/process:overflow-hidden group-data-[pinned=true]/process:px-6 group-data-[pinned=true]/process:[mask-image:linear-gradient(to_bottom,transparent,#000_2.5rem,#000_calc(100%-2.5rem),transparent)]"
    >
      <div ref={track} className={`relative ${timelineGutter} group-data-[pinned=true]/process:py-10`}>
        <ol className={`flex flex-col ${timelineGap}`}>
          {steps.map((step, index) => (
            <li key={step.title} className="group/step relative">
              <TimelineLine />
              <TimelineMarker />
              <div className={timelineCard}>
                <p className="flex items-baseline gap-3">
                  <span
                    aria-hidden="true"
                    className="font-display text-[clamp(1.25rem,1.4vw,1.625rem)] leading-none font-semibold text-crimson"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-primary/55 uppercase 2xl:text-[11px]">
                    Phase {index + 1} of {steps.length}
                  </span>
                </p>
                <h3 className="mt-1.5 font-display text-[clamp(1.25rem,1.4vw,1.625rem)] leading-tight font-medium text-primary">
                  {step.title}
                </h3>
                <p className="mt-[clamp(0.6rem,1vw,1.25rem)] text-[clamp(0.9375rem,1.1vw,1.3rem)] leading-snug text-primary/85">
                  {step.description}
                </p>
              </div>
            </li>
          ))}

          {/* "Live": active by default (the server HTML), so without JavaScript it is highlighted. */}
          <li data-active="true" className="group/step relative">
            <TimelineMarker />
            <div className={timelineCard}>
              <p className="font-display text-[clamp(1.6rem,1.8vw,2.125rem)] leading-none font-medium text-crimson">
                {outcome.label}
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.25rem,1.4vw,1.625rem)] leading-tight font-medium text-primary">
                {outcome.title}
              </h3>
              <p className="mt-2 text-[clamp(0.9375rem,1.1vw,1.3rem)] leading-snug text-primary/85">
                {outcome.description}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}
