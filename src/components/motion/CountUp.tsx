"use client";

import { useEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  /** Text before the number, e.g. "+" for "+150%". */
  prefix?: string;
  suffix?: string;
  /** Milliseconds. */
  duration?: number;
  /** Milliseconds to wait after the number scrolls into view. */
  delay?: number;
  className?: string;
};

// Counts from 0 to `value` the first time the number scrolls into view.
// - The server HTML holds the real value, so search engines, screen readers, and
//   visitors without JavaScript always get it.
// - Skipped when the visitor prefers reduced motion, or when the number is already on
//   screen at load (resetting it to 0 there would flash).
// - The final value is rendered invisibly underneath to reserve its width, so nothing
//   shifts while counting.
// - Frames update the text node directly instead of re-rendering React each frame.
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${prefix}${value}${suffix}`;

  useEffect(() => {
    const text = ref.current?.firstChild;
    if (!ref.current || !text) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const { top, bottom } = ref.current.getBoundingClientRect();
    if (top < window.innerHeight && bottom > 0) return;

    text.nodeValue = `${prefix}0${suffix}`;
    let frame = 0;
    let timeout = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timeout = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - progress) ** 3; // ease-out cubic
            text.nodeValue = `${prefix}${Math.round(eased * value)}${suffix}`;
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.6 },
    );
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
      text.nodeValue = `${prefix}${value}${suffix}`;
    };
  }, [value, prefix, suffix, duration, delay]);

  return (
    <span className={["inline-grid", className].filter(Boolean).join(" ")}>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {final}
      </span>
      <span ref={ref} aria-hidden="true" className="col-start-1 row-start-1">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
