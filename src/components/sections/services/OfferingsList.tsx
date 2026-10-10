"use client";

import { useRef } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

// The service's offerings as a list of cards beside a progress line.
// - Desktop (and motion allowed): the section locks to the screen while the list scrolls inside
//   its window (as the home Process timeline does); GSAP marks the section data-pinned="true",
//   which (classes here and in ServiceOfferings) gives it the screen's height and turns this
//   column into a clipping window that fades at the edges.
// - Elsewhere, and without JavaScript, it is a normal list.
// - One card is "active" (filled with the gradient): it follows a focus line that moves down the
//   window as you scroll (locked), or the card crossing the middle of the screen (not locked).
//   The coloured part of the line grows to the active card. Without JavaScript, the first card
//   is active, as in the design.

const PINNED = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";
const UNPINNED = "(max-width: 63.999rem), (prefers-reduced-motion: reduce)";

// The gradient is a before-layer that fades in (gradients can't be transitioned directly).
const card = [
  "relative isolate rounded-[1.1rem] border px-[clamp(1.25rem,1.5vw,1.75rem)] py-[clamp(1.25rem,1.6vw,1.9rem)]",
  "border-[#f4bcc3] bg-linear-to-r from-[#fdf0ec] to-[#fbe8ee] transition-[border-color,box-shadow] duration-400 ease-out motion-reduce:transition-none",
  "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-brand-gradient-reverse before:opacity-0 before:transition-opacity before:duration-400 before:ease-out motion-reduce:before:transition-none",
  "group-data-[active=true]/card:border-transparent group-data-[active=true]/card:shadow-[0_18px_40px_-22px_rgb(201_29_76_/_0.6)] group-data-[active=true]/card:before:opacity-100",
].join(" ");

export function OfferingsList({ items }: { items: { title: string; text: string }[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const window_ = viewport.current;
      const list = track.current;
      const bar = fill.current;
      const section = window_?.closest("section");
      if (!window_ || !list || !bar || !section) return;

      const cards = Array.from(list.children) as HTMLLIElement[];
      let current = -1;
      const activate = (index: number) => {
        if (index === current) return;
        current = index;
        cards.forEach((item, i) => {
          if (i === index) item.dataset.active = "true";
          else delete item.dataset.active;
        });
        bar.style.transform = `scaleY(${(index + 1) / cards.length})`;
      };

      const mm = gsap.matchMedia();

      // Locked: the focus line moves from the top of the window (start) to its bottom (end).
      mm.add(PINNED, () => {
        section.dataset.pinned = "true";
        const hidden = () => Math.max(0, list.offsetHeight - window_.clientHeight);
        const follow = (progress: number) => {
          const box = window_.getBoundingClientRect();
          const focus = box.top + progress * box.height;
          let nearest = 0;
          let best = Infinity;
          cards.forEach((item, i) => {
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
        cards.forEach((item, i) =>
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
        activate(0);
      };
    },
    { scope: viewport },
  );

  return (
    // While locked: fills the row, clips the list, and fades its top and bottom edges.
    <div
      ref={viewport}
      className="relative min-h-0 pl-[clamp(1.25rem,1.7vw,2rem)] group-data-[pinned=true]/offer:overflow-hidden group-data-[pinned=true]/offer:[mask-image:linear-gradient(to_bottom,transparent,#000_1.5rem,#000_calc(100%-5rem),transparent)]"
    >
      {/* The progress line: a faint track, and the coloured part down to the active card. */}
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] rounded-full bg-[#f6d3cb]" />
      <span
        ref={fill}
        aria-hidden="true"
        style={{ transform: `scaleY(${1 / items.length})` }}
        className="absolute inset-y-0 left-0 w-[3px] origin-top rounded-full bg-[#ef6327] transition-transform duration-500 ease-out motion-reduce:transition-none"
      />
      <ol
        ref={track}
        className="flex flex-col gap-[clamp(0.75rem,0.9vw,1.1rem)] group-data-[pinned=true]/offer:pt-6 group-data-[pinned=true]/offer:pb-20"
      >
        {items.map((item, index) => (
          <li key={item.title} data-active={index === 0 ? "true" : undefined} className="group/card">
            <div className={card}>
              <h3 className="w-fit bg-brand-gradient bg-clip-text font-display text-[clamp(1.25rem,1.55vw,1.875rem)] leading-tight font-semibold tracking-[-0.01em] text-transparent group-data-[active=true]/card:bg-none group-data-[active=true]/card:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-[clamp(0.875rem,0.85vw,1rem)] leading-[1.9] text-[#6b6a78] transition-colors duration-400 group-data-[active=true]/card:text-white/95">
                {item.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
