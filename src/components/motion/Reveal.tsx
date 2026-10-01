"use client";

import { useRef, type ReactNode } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Distance in px the content rises from. */
  y?: number;
  /** Seconds between items marked `data-reveal`. */
  stagger?: number;
  delay?: number;
  /** ScrollTrigger start, e.g. "top 85%" = when the top of the block reaches 85% down the screen. */
  start?: string;
};

// Fades content up the first time it scrolls into view. Animates the children marked
// `data-reveal` one after another, or the whole block if none are marked.
// Content is visible without JavaScript and for visitors who prefer reduced motion.
export function Reveal({
  children,
  className,
  y = 40,
  stagger = 0.1,
  delay = 0,
  start = "top 85%",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const block = ref.current;
        if (!block) return;
        const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", block);
        gsap.from(items.length ? items : block, {
          y,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: { trigger: block, start, once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
