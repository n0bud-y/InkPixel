"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { MOTION_OK } from "@/lib/gsap";

/** How long the row rests at each position before moving on, in ms. */
const DWELL = 3000;
/** How long snapping stays off after a mouse drag, so the row can glide to its card, in ms. */
const GLIDE = 700;

const arrowClass =
  "grid size-[clamp(2.75rem,3vw,3.25rem)] place-items-center rounded-full bg-white text-primary ring-1 ring-primary/15 transition duration-200 hover:bg-brand-gradient-reverse hover:text-white hover:ring-transparent";
const arrowIcon = (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-[42%]">
    <path d="M4.5 12h15M13.5 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Where the row rests at position `stop`: that card at the row's left edge, or the row's end.
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

// The position the row is closest to.
function nearestStop(row: HTMLElement, stops: number) {
  let nearest = 0;
  for (let stop = 1; stop < stops; stop++) {
    if (Math.abs(offsetOf(row, stop) - row.scrollLeft) < Math.abs(offsetOf(row, nearest) - row.scrollLeft)) {
      nearest = stop;
    }
  }
  return nearest;
}

const subscribeMotion = (onChange: () => void) => {
  const query = window.matchMedia(MOTION_OK);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

// The team row as an auto-sliding carousel. The row is a normal sideways-scrolling list with
// snapping, so swiping and trackpads work; every 3 s it moves one card along, and after the
// last position it goes back to the start.
// - Mouse: drag the cards sideways; on release the row glides to the nearest card. Snapping is
//   off during the drag, as it would fight the pointer.
// - ← and → buttons beside the dots (under them on phones, where 17 dots fill the width); they
//   loop like the auto-slide.
// - Dots: one per position (labelled with the person it brings to the front); arrow keys move
//   between them.
// - Holds still while the mouse is over the cards, while the cards or controls have keyboard
//   focus, during a touch or drag, for 3 s after any scroll, and while it is off screen or the
//   tab is hidden. No pause button (project head decision, 10 Oct 2026).
// - No auto-slide for visitors who prefer reduced motion (controls and swiping still work).
// The children are the cards (<li>), each `snap-start`.
export function TeamCarousel({ names, children }: { names: string[]; children: ReactNode }) {
  const row = useRef<HTMLUListElement>(null);
  const [stops, setStops] = useState(1);
  const [current, setCurrent] = useState(0);
  const motion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(MOTION_OK).matches, () => false);
  // Read by the timer, so changing them doesn't re-render.
  const live = useRef({ hover: false, focus: false, press: false, inView: false, lastMove: 0 });
  // The mouse drag under way: where it started, and the row's scroll position then.
  const drag = useRef<{ x: number; left: number } | null>(null);
  const snapTimer = useRef(0);

  const goTo = (stop: number) => {
    const el = row.current;
    if (!el) return;
    live.current.lastMove = performance.now();
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
        setStops(count);
        setCurrent(nearestStop(el, count));
      });
    };
    const onScroll = () => {
      live.current.lastMove = performance.now();
      update();
    };
    const resize = new ResizeObserver(update);
    const view = new IntersectionObserver(
      ([entry]) => {
        live.current.inView = entry.isIntersecting;
        if (entry.isIntersecting) live.current.lastMove = performance.now();
      },
      { threshold: 0.3 },
    );
    resize.observe(el);
    view.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      view.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // The auto-slide. Set up again after every render, so it always sees the current position.
  useEffect(() => {
    if (!motion || stops < 2) return;
    const timer = setInterval(() => {
      const { hover, focus, press, inView, lastMove } = live.current;
      if (hover || focus || press || !inView || document.hidden) return;
      if (performance.now() - lastMove < DWELL) return;
      goTo(current === stops - 1 ? 0 : current + 1);
    }, 250);
    return () => clearInterval(timer);
  });

  const hold = (reason: "hover" | "focus" | "press", on: boolean) => {
    live.current[reason] = on;
    if (!on) live.current.lastMove = performance.now();
  };
  // Keyboard focus only: a dot clicked with the mouse doesn't stop the slider.
  const focusHolds = {
    onFocus: (event: FocusEvent<HTMLElement>) => {
      if (event.target.matches(":focus-visible")) hold("focus", true);
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget)) hold("focus", false);
    },
  };

  // Touch scrolls the row natively; only a mouse needs dragging by hand. The pointer is captured
  // so the drag carries on, and always ends, even if the mouse leaves the row.
  const onPointerDown = (event: PointerEvent<HTMLUListElement>) => {
    const mouse = event.pointerType === "mouse";
    if (mouse && event.button !== 0) return;
    hold("press", true);
    if (!mouse) return;
    const el = event.currentTarget;
    clearTimeout(snapTimer.current);
    el.setPointerCapture(event.pointerId);
    el.style.scrollSnapType = "none";
    drag.current = { x: event.clientX, left: el.scrollLeft };
  };

  const onPointerMove = (event: PointerEvent<HTMLUListElement>) => {
    if (!drag.current) return;
    event.currentTarget.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
  };

  const onPointerUp = (event: PointerEvent<HTMLUListElement>) => {
    hold("press", false);
    if (!drag.current) return;
    drag.current = null;
    const el = event.currentTarget;
    goTo(nearestStop(el, stops));
    snapTimer.current = window.setTimeout(() => {
      el.style.scrollSnapType = "";
    }, GLIDE);
  };

  const moveBy = (by: 1 | -1) => goTo((current + by + stops) % stops);

  const onDotsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (current + step + stops) % stops;
    goTo(next);
    event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next]?.focus({ preventScroll: true });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Team members">
      <ul
        ref={row}
        {...focusHolds}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") hold("hover", true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") hold("hover", false);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative -mx-5 flex cursor-grab snap-x snap-mandatory scroll-px-5 gap-(--gap) overflow-x-auto px-5 pb-2 select-none [--gap:1rem] [scrollbar-width:none] active:cursor-grabbing sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0 lg:[--gap:clamp(1rem,1.3vw,1.6rem)]"
      >
        {children}
      </ul>

      {/* Height kept while the row is measured, so nothing below moves. */}
      <div
        {...focusHolds}
        className="mt-[clamp(1.25rem,1.8vw,2.25rem)] flex min-h-20 flex-wrap items-center justify-center gap-3 md:min-h-[clamp(2.75rem,3vw,3.25rem)] md:flex-nowrap md:gap-5"
      >
        {stops > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous team member"
              onClick={() => moveBy(-1)}
              className={`${arrowClass} order-2 md:order-1`}
            >
              <span className="grid size-full -scale-x-100 place-items-center">{arrowIcon}</span>
            </button>
            <div
              role="group"
              aria-label="Choose a team member"
              onKeyDown={onDotsKeyDown}
              className="order-1 flex w-full items-center justify-center md:order-2 md:w-auto"
            >
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
                      stop === current ? "w-8 bg-brand-gradient sm:w-12" : "w-2 bg-primary/50 group-hover:bg-primary/80 sm:w-3",
                    ].join(" ")}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next team member"
              onClick={() => moveBy(1)}
              className={`${arrowClass} order-3`}
            >
              {arrowIcon}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
