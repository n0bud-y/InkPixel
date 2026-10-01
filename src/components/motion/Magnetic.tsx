"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Pulls its content gently toward the cursor and springs back on leave.
// Desktop mouse/trackpad only, and off for visitors who prefer reduced motion.
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  /** 0–1: how far the content follows the cursor. */
  strength?: number;
  className?: string;
}) {
  const outer = useRef<HTMLSpanElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const area = outer.current;
        const target = inner.current;
        if (!area || !target) return;

        const xTo = gsap.quickTo(target, "x", { duration: 0.6, ease: "elastic.out(1, 0.45)" });
        const yTo = gsap.quickTo(target, "y", { duration: 0.6, ease: "elastic.out(1, 0.45)" });

        // Measure the outer element, which does not move, so the pull stays stable.
        const onMove = (event: PointerEvent) => {
          const box = area.getBoundingClientRect();
          xTo((event.clientX - (box.left + box.width / 2)) * strength);
          yTo((event.clientY - (box.top + box.height / 2)) * strength);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        area.addEventListener("pointermove", onMove);
        area.addEventListener("pointerleave", onLeave);
        return () => {
          area.removeEventListener("pointermove", onMove);
          area.removeEventListener("pointerleave", onLeave);
        };
      });
      return () => mm.revert();
    },
    { scope: outer },
  );

  return (
    <span ref={outer} className={["inline-flex", className].filter(Boolean).join(" ")}>
      <span ref={inner} className="inline-flex w-full">
        {children}
      </span>
    </span>
  );
}
