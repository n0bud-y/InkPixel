"use client";

import { useRef } from "react";
import { DropIcon } from "@/components/ui/Button";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

// Copies of each row while it moves: enough to cover a wide screen with room to loop.
const COPIES = 4;

const pill =
  "inline-flex rounded-full bg-white/25 px-[clamp(1.25rem,3.6vw,4.4rem)] py-[clamp(0.6rem,1.35vw,1.65rem)] text-[clamp(1.125rem,2.6vw,3.125rem)] leading-none font-medium whitespace-nowrap text-white";

const line = "mb-[0.32em] hidden h-[3px] w-[clamp(6rem,11.8vw,14rem)] shrink-0 bg-linear-to-r from-crimson to-coral lg:block";
const gradientText = "bg-brand-gradient bg-clip-text pb-[0.06em] text-transparent";

// "Take a Look at What We Can Do For You": the title in two halves around the brand drop, then the
// capabilities as pills on the gradient band, in three rows. With motion allowed, the rows glide
// sideways in turn (GSAP marks the section data-moving="true", which lines each row up in one
// line with repeated copies, hidden from screen readers) and slow to a stop under the pointer.
// Reduced motion and no JavaScript: the design's still rows.
export function CapabilitiesMarquee({ title, items }: { title: { start: string[]; end: string[] }; items: string[] }) {
  const root = useRef<HTMLElement>(null);
  const rows = [items.slice(0, 3), items.slice(3, 6), items.slice(6)];

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        section.dataset.moving = "true";
        // Each row moves by one copy, then starts again: seamless, as the copies are identical.
        const tweens = gsap.utils.toArray<HTMLElement>("[data-track]", section).map((track, index) => {
          const leftward = index % 2 === 0;
          return gsap.fromTo(
            track,
            { xPercent: leftward ? 0 : -100 / COPIES },
            { xPercent: leftward ? -100 / COPIES : 0, duration: 32 + index * 6, ease: "none", repeat: -1 },
          );
        });
        const band = section.querySelector<HTMLElement>("[data-band]");
        const easeTo = (timeScale: number) => () =>
          tweens.forEach((tween) => gsap.to(tween, { timeScale, duration: 0.6, overwrite: true }));
        const stop = easeTo(0);
        const go = easeTo(1);
        band?.addEventListener("pointerenter", stop);
        band?.addEventListener("pointerleave", go);
        return () => {
          band?.removeEventListener("pointerenter", stop);
          band?.removeEventListener("pointerleave", go);
          delete section.dataset.moving;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="capabilities-title" className="group/caps overflow-hidden bg-primary">
      <div className="container-site py-[clamp(3.5rem,5.5vw,6.5rem)]">
        <h2 id="capabilities-title" className="font-display">
          <span className="sr-only">{[...title.start, ...title.end].join(" ")}</span>
          <span
            aria-hidden="true"
            className="grid grid-cols-[minmax(0,1fr)] justify-items-center gap-6 text-center text-[clamp(2.25rem,4.45vw,5.35rem)] leading-[1.05] font-semibold tracking-[-0.04em] lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:justify-items-stretch lg:gap-[clamp(1.5rem,2vw,3rem)] lg:text-left"
          >
            <span className="flex flex-col items-center lg:items-start lg:self-start">
              <span className={gradientText}>{title.start[0]}</span>
              <span className="flex items-end gap-[clamp(1.5rem,3.1vw,3.75rem)]">
                <span className={gradientText}>{title.start[1]}</span>
                <span className={line} />
              </span>
            </span>
            <span className="grid size-[clamp(8rem,12.5vw,15rem)] place-items-center rounded-full bg-brand-gradient shadow-[0_24px_60px_-18px_rgb(201_29_76_/_0.7)] ring-1 ring-white/15">
              <DropIcon className="h-auto w-[50%] text-white" />
            </span>
            <span className="flex flex-col items-center lg:items-end lg:self-end lg:pt-[clamp(2rem,6vw,7rem)]">
              <span className={gradientText}>{title.end[0]}</span>
              <span className="flex items-end gap-[clamp(1.5rem,3.1vw,3.75rem)]">
                <span className={line} />
                <span className={gradientText}>{title.end[1]}</span>
              </span>
            </span>
          </span>
        </h2>
      </div>

      <div data-band className="bg-brand-gradient py-[clamp(3rem,7.4vw,9rem)]">
        <div className="flex flex-col gap-[clamp(0.75rem,1.6vw,1.9rem)]">
          {rows.map((row, rowIndex) => (
            <ul
              key={rowIndex}
              data-track
              className="container-site flex flex-wrap gap-y-[clamp(0.75rem,1.6vw,1.9rem)] group-data-[moving=true]/caps:w-max group-data-[moving=true]/caps:max-w-none group-data-[moving=true]/caps:flex-nowrap group-data-[moving=true]/caps:px-0"
            >
              {Array.from({ length: COPIES }, (_, copy) =>
                row.map((item) => (
                  <li
                    key={`${copy}-${item}`}
                    aria-hidden={copy > 0 || undefined}
                    className={`mr-[clamp(0.75rem,1.25vw,1.5rem)] shrink-0 ${copy > 0 ? "hidden group-data-[moving=true]/caps:block" : ""}`}
                  >
                    <span className={pill}>{item}</span>
                  </li>
                )),
              )}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
