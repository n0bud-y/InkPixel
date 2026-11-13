"use client";

import { useEffect, useRef } from "react";

const motionOk = "(prefers-reduced-motion: no-preference)";

// Starts `run` once the page has finished loading and the browser is idle (at most 1.5 s later),
// so the video doesn't compete with the page's own scripts, fonts, and images. Returns a cancel.
function afterPageLoad(run: () => void) {
  let idle: number | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
    if ("requestIdleCallback" in window) idle = window.requestIdleCallback(run, { timeout: 1500 });
    else timer = setTimeout(run, 200);
  };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  return () => {
    window.removeEventListener("load", schedule);
    if (idle !== undefined) window.cancelIdleCallback(idle);
    clearTimeout(timer);
  };
}

// The About and home heroes' background video (the red drop forming the Ink Pixel drop), looping
// and silent. The poster (its first frame) shows first; the video is only downloaded and started
// once the page has loaded, so it never slows the first view down, and the switch from poster to
// video is seamless. Its only source is for visitors who allow motion (the <source> media query),
// so with reduced motion, without JavaScript, or for visitors saving data, the poster stays.
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
    let started = false;
    const sync = () => {
      if (!started) return;
      if (motion.matches && !saveData) {
        // The first time, and after switching reduced motion off, the source needs choosing.
        if (video.networkState === video.NETWORK_NO_SOURCE || video.networkState === video.NETWORK_EMPTY) video.load();
        video.play().catch(() => {});
      } else video.pause();
    };
    const cancel = afterPageLoad(() => {
      started = true;
      sync();
    });
    motion.addEventListener("change", sync);
    return () => {
      cancel();
      motion.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-hidden="true" className={className}>
      <source src={src} type="video/mp4" media={motionOk} />
    </video>
  );
}
