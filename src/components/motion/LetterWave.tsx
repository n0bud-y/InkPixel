"use client";

import { useRef } from "react";
import { MOTION_OK, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

type LetterWaveProps = {
  text: string;
  /** Milliseconds before the first letter rises in. */
  delay?: number;
  /** Seconds between waves. */
  every?: number;
  className?: string;
};

// Milliseconds between letters as they rise in.
const STAGGER = 28;

// A line whose letters rise in one by one, then every few seconds a wave runs through them: each
// letter hops and glows in turn (the home hero's "Innovate Faster.").
// - The rise is CSS (`animate-line-up` per letter), so it starts on the first frame like the
//   other hero lines; the wave is GSAP, on an inner span, so the two transforms don't clash.
// - The wave pauses while the line is off screen and is skipped for reduced motion.
// - Screen readers get the plain text; the letters are hidden from them.
// - Words never break inside: each is one unbreakable group of letters.
export function LetterWave({ text, delay = 0, every = 4, className = "" }: LetterWaveProps) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const line = root.current;
      if (!line) return;
      const letters = line.querySelectorAll("[data-letter]");
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const [r, g, b] = gsap.utils.splitColor(getComputedStyle(line).getPropertyValue("--coral").trim() || "#fa6143");
        gsap.set(letters, { textShadow: `0 0 0em rgba(${r}, ${g}, ${b}, 0)` });
        const wave = gsap.timeline({
          repeat: -1,
          repeatDelay: every,
          // First wave once every letter has risen in.
          delay: (delay + letters.length * STAGGER + 1000) / 1000,
        });
        wave.to(letters, {
          y: "-0.12em",
          color: `rgb(${r}, ${g}, ${b})`,
          textShadow: `0 0 0.35em rgba(${r}, ${g}, ${b}, 0.55)`,
          duration: 0.28,
          ease: "sine.out",
          // Each letter goes up and back down on its own, so the hop travels along the line.
          stagger: { each: 0.045, yoyo: true, repeat: 1 },
        });
        ScrollTrigger.create({
          trigger: line,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => wave.paused(!self.isActive),
        });
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [text, delay, every] },
  );

  let index = 0;
  return (
    <span ref={root} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, wordIndex) => (
          <span key={wordIndex}>
            {wordIndex > 0 && " "}
            <span className="inline-block whitespace-nowrap">
              {[...word].map((letter) => {
                const order = index++;
                return (
                  <span
                    key={order}
                    className="inline-block motion-safe:animate-line-up"
                    style={{ animationDelay: `${delay + order * STAGGER}ms` }}
                  >
                    <span data-letter className="inline-block">
                      {letter}
                    </span>
                  </span>
                );
              })}
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}
