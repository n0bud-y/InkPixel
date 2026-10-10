"use client";

import { useRef, type ComponentProps } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PINNED = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";

// A <section> that, on desktop (motion allowed), locks to the screen while its row marked
// `data-horizontal-track` slides sideways, until the row's last item reaches the row's right
// edge; then the page scrolls on. The section is pinned just below the fixed header when it
// fits on screen, otherwise with its bottom on the screen's bottom (so the row stays visible).
// GSAP marks the section data-pinned="true"; style the locked state with the group
// `group-data-[pinned=true]/hpin:` (e.g. let the row overflow instead of scrolling).
// Phones, tablets, reduced motion, and no JavaScript: nothing moves; the row should then be a
// sideways-scrolling list, so nothing is hidden.
export function HorizontalPin({ className, children, ...props }: ComponentProps<"section">) {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = section.current;
      const track = root?.querySelector<HTMLElement>("[data-horizontal-track]");
      if (!root || !track) return;

      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        root.dataset.pinned = "true";
        // How far the row must move for its last item to end at the row's right edge.
        const distance = () => {
          const last = track.lastElementChild as HTMLElement | null;
          return last ? Math.max(0, last.offsetLeft + last.offsetWidth - track.clientWidth) : 0;
        };
        const header = () => document.querySelector("header")?.offsetHeight ?? 0;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: () => (root.offsetHeight <= window.innerHeight - header() ? `top ${header()}px` : "bottom bottom"),
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          delete root.dataset.pinned;
        };
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} className={["group/hpin", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </section>
  );
}
