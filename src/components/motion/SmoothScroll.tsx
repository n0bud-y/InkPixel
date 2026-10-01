"use client";

import { useRef, type ReactNode } from "react";
import { MOTION_OK, ScrollSmoother, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

// Eased "inertia" scrolling for the page content (GSAP ScrollSmoother).
// - Fixed elements (the header) must stay outside this wrapper.
// - Off for visitors who prefer reduced motion, and on touch screens, where native
//   scrolling feels better; the page then scrolls normally.
// - `effects` enables parallax through attributes, e.g. data-speed="auto".
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapper.current,
        content: content.current,
        smooth: 1.1,
        effects: true,
        smoothTouch: false,
      });
      // Reveal animations may have been set up before the smoother existed.
      ScrollTrigger.refresh();
      return () => smoother.kill();
    });
    return () => mm.revert();
  });

  // The wrapper must stay a plain block: as a flex container it would squeeze the content
  // to the window height, ScrollSmoother would measure that, and the page could not scroll.
  return (
    <div ref={wrapper}>
      <div ref={content} className="flex min-h-svh flex-col">
        {children}
      </div>
    </div>
  );
}
