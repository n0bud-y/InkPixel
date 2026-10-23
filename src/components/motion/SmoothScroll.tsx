"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { MOTION_OK, ScrollSmoother, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

// Eased "inertia" scrolling for the page content (GSAP ScrollSmoother).
// - Fixed elements (the header) must stay outside this wrapper.
// - Off for visitors who prefer reduced motion, and on touch screens, where native
//   scrolling feels better; the page then scrolls normally.
// - `effects` enables parallax through attributes, e.g. data-speed="auto".
// - Every new page starts at the top (see the effect below).
export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const lastPathname = useRef(pathname);

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

  // On a new page, jump to the top before it is painted. Next.js only scrolls up when it
  // thinks the new page is out of view, which the smoother's moved content confuses: a shorter
  // page could open at its footer, and others visibly scrolled up. Query changes (filters)
  // and links to a #section are left alone. Then the pins and reveals measure the new page;
  // their scroll memory is cleared first, as the new page's triggers recorded the old page's
  // position when they were created, and a refresh would scroll back there.
  useLayoutEffect(() => {
    if (lastPathname.current === pathname) return;
    lastPathname.current = pathname;
    if (window.location.hash) return;
    const toTop = () => {
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTop(0);
      else window.scrollTo({ top: 0, behavior: "instant" });
    };
    toTop();
    const frame = requestAnimationFrame(() => {
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.refresh();
      toTop();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

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
