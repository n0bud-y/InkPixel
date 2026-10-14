"use client";

import { useRef, type ComponentProps } from "react";
import { ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

const PINNED = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";

// A <section> that, on desktop (motion allowed), locks to the screen while its cards marked
// `data-stack-card` arrive one by one: each slides up from below and covers the one before,
// which sinks back and darkens, its top edge still showing. Then the page scrolls on.
// Locked at the top of the screen, like the home page's Process section: give the section the
// screen's height while locked (`data-[pinned=true]:h-dvh`), with room for the fixed header.
// Progress, optional: the element marked `data-stack-current` shows the current card's number
// ("02"), and `data-stack-bar` fills from left to right across the stack.
// GSAP marks the section data-pinned="true"; style the locked state with it, or with the group
// `group-data-[pinned=true]/stack:` inside (e.g. put every card in the same grid cell).
// Phones, tablets, reduced motion, no JavaScript, or a single card: nothing moves; the cards
// should then be a sideways-scrolling row, so nothing is hidden.
export function StackPin({ className, children, ...props }: ComponentProps<"section">) {
  const section = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = section.current;
      if (!root) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]", root);
      if (cards.length < 2) return;
      const current = root.querySelector<HTMLElement>("[data-stack-current]");
      const bar = root.querySelector<HTMLElement>("[data-stack-bar]");

      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        root.dataset.pinned = "true";
        const steps = cards.length - 1;
        let shown = 0;
        if (bar) gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            // Three quarters of a screen's scroll per card.
            end: () => `+=${steps * window.innerHeight * 0.75}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: ({ progress }) => {
              if (bar) gsap.set(bar, { scaleX: progress });
              // A card counts as shown once it covers more than half of the one before.
              const index = Math.round(progress * steps);
              if (current && index !== shown) {
                shown = index;
                current.textContent = String(index + 1).padStart(2, "0");
              }
            },
          },
        });
        cards.slice(1).forEach((card, i) => {
          timeline
            .fromTo(card, { y: () => window.innerHeight }, { y: 0 })
            .fromTo(
              cards[i],
              { scale: 1, yPercent: 0, filter: "brightness(1)" },
              { scale: 0.92, yPercent: -6, filter: "brightness(0.55)" },
              "<",
            );
        });
        // The section's height changed when it was marked pinned, which moves everything below.
        ScrollTrigger.refresh();

        return () => {
          delete root.dataset.pinned;
        };
      });
      return () => mm.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} className={["group/stack", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </section>
  );
}
