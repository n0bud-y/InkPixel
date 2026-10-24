"use client";

import { useEffect, useRef } from "react";

const motionOk = "(prefers-reduced-motion: no-preference)";

// The About and home heroes' background video (the red drop forming the Ink Pixel drop), looping
// and silent. It starts as soon as the HTML arrives (autoPlay), but its only source is for visitors
// who allow motion (the <source> media query), so with reduced motion, and before anything
// loads, the poster (its first frame) shows. Once JavaScript runs it also makes sure it is muted
// and playing, and pauses it for visitors saving data or switching to reduced motion.
export function AboutHeroVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // Set as a property too: browsers only autoplay muted video, and React doesn't always
    // reflect `muted` from the server HTML.
    video.muted = true;
    const motion = window.matchMedia(motionOk);
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const sync = () => {
      if (motion.matches && !saveData) {
        // After switching reduced motion off, the source needs choosing again.
        if (video.networkState === video.NETWORK_NO_SOURCE) video.load();
        video.play().catch(() => {});
      } else video.pause();
    };
    sync();
    motion.addEventListener("change", sync);
    return () => motion.removeEventListener("change", sync);
  }, []);

  return (
    <video ref={ref} poster={poster} autoPlay muted loop playsInline preload="none" aria-hidden="true" className={className}>
      <source src={src} type="video/mp4" media={motionOk} />
    </video>
  );
}
