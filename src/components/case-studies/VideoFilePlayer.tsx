"use client";

import { useEffect, useRef } from "react";
import type { VideoFile } from "@/contentful/queries/case-studies";

// An uploaded video (e.g. a vertical reel) with the browser's own player, framed like a phone.
// It plays by itself, muted and looping, while it is on screen (browsers only allow muted
// autoplay), and pauses when it leaves; the controls stay, so visitors can turn the sound on.
// Until it comes near the screen only its first frame is fetched (preload="metadata"; the #t
// fragment makes browsers show that frame instead of a black box). Visitors who prefer reduced
// motion or save data, and visitors without JavaScript, get the still frame and the play button.
export function VideoFilePlayer({ file }: { file: VideoFile }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduced || saveData) return;

    // Set as properties too: React doesn't always reflect `muted` from the server HTML.
    video.muted = true;
    video.loop = true;
    let inView = false;
    let pausedByVisitor = false;
    const onPause = () => {
      // A pause while on screen is the visitor's choice; don't restart it.
      if (inView) pausedByVisitor = true;
    };
    const onPlay = () => {
      pausedByVisitor = false;
    };
    video.addEventListener("pause", onPause);
    video.addEventListener("play", onPlay);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          if (!pausedByVisitor) video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
          pausedByVisitor = false;
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      video.removeEventListener("play", onPlay);
    };
  }, []);

  return (
    <div className="rounded-[2.4rem] bg-[#0b0d1f] p-2.5 shadow-[0_50px_90px_-40px_rgb(0_0_0_/_0.75),inset_0_0_0_2px_#2a2d48]">
      <video
        ref={ref}
        controls
        muted
        playsInline
        preload="metadata"
        aria-label={file.caption ?? "Video"}
        className="aspect-[9/16] w-full rounded-[1.9rem] bg-black object-contain"
      >
        <source src={`${file.url}#t=0.1`} type={file.contentType} />
      </video>
    </div>
  );
}
