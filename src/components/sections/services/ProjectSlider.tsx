"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { MOTION_OK } from "@/lib/gsap";

// Where the row rests at position `stop`: that card at the row's left edge, or the row's end
// (as in the About page's TeamCarousel).
function offsetOf(row: HTMLElement, stop: number) {
  const cards = row.children as HTMLCollectionOf<HTMLElement>;
  return Math.min(cards[stop].offsetLeft - cards[0].offsetLeft, row.scrollWidth - row.clientWidth);
}

// How many positions the row can rest at: one per card, until the last cards are all on screen.
function countStops(row: HTMLElement) {
  const end = row.scrollWidth - row.clientWidth - 1;
  let stops = 1;
  while (stops < row.children.length && offsetOf(row, stops - 1) < end) stops++;
  return stops;
}

const subscribeMotion = (onChange: () => void) => {
  const query = window.matchMedia(MOTION_OK);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

// The service pages' projects as a slider. The row is a normal sideways-scrolling list with
// snapping, so swiping and trackpads work; under it, ← and → buttons and a dot per position
// (labelled with the project it brings to the front; arrow keys move between the dots). It
// doesn't move by itself. On desktop the row runs on to the screen's right edge, so the next
// card shows. The children are the cards (<li>), each `snap-start`.
export function ProjectSlider({ names, dark, children }: { names: string[]; dark: boolean; children: ReactNode }) {
  const row = useRef<HTMLUListElement>(null);
  const [stops, setStops] = useState(1);
  const [current, setCurrent] = useState(0);
  const motion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(MOTION_OK).matches, () => false);

  const goTo = (stop: number) => {
    const el = row.current;
    if (!el || stop < 0 || stop >= stops) return;
    el.scrollTo({ left: offsetOf(el, stop), behavior: motion ? "smooth" : "auto" });
  };

  // Follow the row: how many positions it has (changes with the screen width), which one it's at.
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const count = countStops(el);
        let nearest = 0;
        for (let stop = 1; stop < count; stop++) {
          if (Math.abs(offsetOf(el, stop) - el.scrollLeft) < Math.abs(offsetOf(el, nearest) - el.scrollLeft)) {
            nearest = stop;
          }
        }
        setStops(count);
        setCurrent(nearest);
      });
    };
    const resize = new ResizeObserver(update);
    resize.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  const onDotsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (current + step + stops) % stops;
    goTo(next);
    event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next]?.focus({ preventScroll: true });
  };

  const arrow = [
    "grid size-[clamp(2.75rem,3vw,3.25rem)] place-items-center rounded-full ring-1 transition duration-200 hover:bg-brand-gradient-reverse hover:text-white hover:ring-transparent aria-disabled:pointer-events-none aria-disabled:opacity-35",
    dark ? "bg-white/10 text-white ring-white/25" : "bg-white text-primary ring-primary/15",
  ].join(" ");
  const arrowIcon = (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-[42%]">
      <path d="M4.5 12h15M13.5 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Projects">
      <ul
        ref={row}
        className="relative -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-[clamp(0.75rem,1.05vw,1.25rem)] overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mr-[calc(-1*min(7.5vw,9rem))] lg:ml-0 lg:scroll-px-0 lg:pr-[min(7.5vw,9rem)] lg:pl-0"
      >
        {children}
      </ul>

      {/* Height kept while the row is measured, so nothing below moves. */}
      <div className="mt-[clamp(1.25rem,1.8vw,2.25rem)] flex min-h-[clamp(2.75rem,3vw,3.25rem)] items-center justify-center gap-3 sm:gap-5">
        {stops > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous project"
              aria-disabled={current === 0 || undefined}
              onClick={() => goTo(current - 1)}
              className={arrow}
            >
              <span className="grid size-full -scale-x-100 place-items-center">{arrowIcon}</span>
            </button>
            <div role="group" aria-label="Choose a project" onKeyDown={onDotsKeyDown} className="flex items-center">
              {Array.from({ length: stops }, (_, stop) => (
                <button
                  key={stop}
                  type="button"
                  aria-label={`Show ${names[stop]}`}
                  aria-current={stop === current ? "true" : undefined}
                  tabIndex={stop === current ? 0 : -1}
                  onClick={() => goTo(stop)}
                  className="group grid h-6 place-items-center px-1 sm:px-1.5"
                >
                  <span
                    className={[
                      "block h-1.5 rounded-full transition-all duration-500 ease-out",
                      stop === current
                        ? "w-8 bg-brand-gradient sm:w-12"
                        : `w-2 sm:w-3 ${dark ? "bg-white/40 group-hover:bg-white/70" : "bg-primary/40 group-hover:bg-primary/70"}`,
                    ].join(" ")}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next project"
              aria-disabled={current === stops - 1 || undefined}
              onClick={() => goTo(current + 1)}
              className={arrow}
            >
              {arrowIcon}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
