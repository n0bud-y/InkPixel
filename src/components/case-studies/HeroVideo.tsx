"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { ContentfulImage, VideoFile } from "@/contentful/queries/case-studies";

// Whether the video may play: not for reduced motion or save data. False on the server and during
// hydration, so the first render matches the server's (the still only).
const noSubscribe = () => () => {};
const motionAllowed = () =>
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData !== true;

// The video behind a case study's hero banner (0017). The still (the hero image) is what loads
// first and stays for visitors who prefer reduced motion or save data, and without JavaScript; the
// video is only fetched after the page has loaded for everyone else, then fades in over the still
// once it plays, muted and looping. It pauses while the banner is off screen, and a small button
// lets visitors pause it (moving content longer than five seconds needs a way to stop it).
export function HeroVideo({ video, still }: { video: VideoFile; still: ContentfulImage }) {
  const ref = useRef<HTMLVideoElement>(null);
  const enabled = useSyncExternalStore(noSubscribe, motionAllowed, () => false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;
    // Set as properties too: React doesn't always reflect `muted` from the server HTML.
    element.muted = true;
    element.loop = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !paused) element.play().catch(() => {});
      else element.pause();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, paused]);

  return (
    <>
      <Image src={still.url} alt="" fill preload sizes="100vw" className="-z-20 object-cover" />
      {enabled && (
        <video
          ref={ref}
          aria-hidden="true"
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setPlaying(true)}
          className={`absolute inset-0 -z-20 size-full object-cover transition-opacity duration-700 ${playing ? "opacity-100" : "opacity-0"}`}
        >
          <source src={video.url} type={video.contentType} />
        </video>
      )}
      {enabled && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? "Play the background video" : "Pause the background video"}
          className="absolute right-[clamp(1rem,2vw,2rem)] bottom-[clamp(1rem,2vw,2rem)] z-10 grid size-10 cursor-pointer place-items-center rounded-full border border-white/25 bg-primary/50 text-white backdrop-blur-sm transition-colors hover:bg-primary/80"
        >
          {paused ? (
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 translate-x-px fill-current">
              <path d="M4 2.5v11l9-5.5z" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 fill-current">
              <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
