"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ContentfulImage, VideoFile } from "@/contentful/queries/case-studies";

const reelIcon = "size-6 drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.5)]";

// The reels of a gallery shown as a client's social videos (see `reelGalleries`): each cover is a
// vertical reel with the platform and number on top, the like / comment / share rail (icons only:
// no counts we can't vouch for), the account and caption, and a play button. A reel with a video
// (0019) is a button: a click plays the video in place, with sound, and the progress bar follows
// it; a second click pauses. Only one plays at a time; it pauses when scrolled away and goes back
// to its cover when it ends. Every second reel sits lower on desktop; phones swipe through a row.
export function ReelList({
  images,
  videos,
  handle,
  platform,
}: {
  images: ContentfulImage[];
  videos: (VideoFile | null)[];
  handle: string;
  platform: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  // Pause when the reels leave the screen.
  useEffect(() => {
    const list = listRef.current;
    if (!list || active === null) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) refs.current[active]?.pause();
    });
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  const toggle = (index: number) => {
    const video = refs.current[index];
    if (!video) return;
    if (active === index && !video.paused) {
      video.pause();
      return;
    }
    refs.current.forEach((other, otherIndex) => {
      if (other && otherIndex !== index) {
        other.pause();
        other.currentTime = 0;
      }
    });
    if (active !== index) setProgress(0);
    setActive(index);
    video.muted = false;
    video.play().catch(() => {
      // Sound blocked: play muted instead.
      video.muted = true;
      video.play().catch(() => setPlaying(false));
    });
  };

  return (
    <ul
      ref={listRef}
      role="region"
      aria-label={`Videos on ${platform}`}
      tabIndex={0}
      className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-2 pb-6 outline-offset-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-coral sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-[clamp(1rem,1.6vw,2rem)] lg:overflow-visible lg:px-0 lg:pb-[clamp(2rem,3vw,3.5rem)]"
    >
      {images.map((image, index) => {
        const video = videos[index] ?? null;
        const isActive = active === index;
        const isPlaying = isActive && playing;
        return (
          <li
            key={image.url}
            data-reveal
            className={`w-[68vw] max-w-[18rem] shrink-0 snap-center sm:w-[42vw] lg:w-auto lg:max-w-none ${index % 2 === 1 ? "lg:pt-[clamp(2rem,3vw,3.5rem)]" : ""}`}
          >
            <div className="group relative isolate aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-[#0b0d1f] shadow-[0_40px_80px_-40px_rgb(0_0_0_/_0.9)] ring-1 ring-white/10 transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_50px_90px_-35px_rgb(201_29_76_/_0.7)]">
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alt}
                unoptimized={image.isSvg}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 68vw"
                className={`absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.2s] ease-out ${isActive ? "" : "group-hover:scale-[1.06]"}`}
              />
              {video && (
                <video
                  ref={(element) => {
                    refs.current[index] = element;
                  }}
                  src={video.url}
                  playsInline
                  preload="none"
                  poster={image.url}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onEnded={() => {
                    setActive(null);
                    setProgress(0);
                  }}
                  onTimeUpdate={(event) => {
                    const { currentTime, duration } = event.currentTarget;
                    if (duration) setProgress(currentTime / duration);
                  }}
                  className={`absolute inset-0 -z-10 size-full object-cover transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
                />
              )}
              <span
                aria-hidden="true"
                className={`absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0_/_0.45),transparent_22%,transparent_55%,rgb(0_0_0_/_0.85))] transition-opacity duration-300 ${isPlaying ? "opacity-60" : ""}`}
              />

              {/* Top: the platform and the reel number. */}
              <span aria-hidden="true" className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">
                {platform}
              </span>
              <span aria-hidden="true" className="absolute top-4 right-4 font-mono text-[12px] text-white/80">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Play / pause: the whole reel is the button when it has a video. */}
              {video ? (
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-label={`${isPlaying ? "Pause" : "Play"} video: ${image.alt}`}
                  className="absolute inset-0 z-10 cursor-pointer rounded-[1.75rem] outline-offset-[-3px] focus-visible:outline-2 focus-visible:outline-coral"
                >
                  <PlayBadge playing={isPlaying} />
                </button>
              ) : (
                <PlayBadge playing={false} />
              )}

              {/* The rail. */}
              <span aria-hidden="true" className="absolute right-3 bottom-[5.5rem] flex flex-col items-center gap-4">
                <svg viewBox="0 0 24 24" className={`${reelIcon} fill-white transition-colors duration-300 group-hover:fill-[#fe2c55]`}>
                  <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.2 1.8-2 3.3-3.2 5.4-3.2 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21Z" />
                </svg>
                <svg viewBox="0 0 24 24" className={`${reelIcon} fill-white`}>
                  <path d="M12 3C6.5 3 2 6.9 2 11.7c0 2.6 1.3 4.9 3.4 6.5L4.6 21.5l3.9-2c1.1.3 2.3.5 3.5.5 5.5 0 10-3.9 10-8.7S17.5 3 12 3Z" />
                </svg>
                <svg viewBox="0 0 24 24" className={`${reelIcon} fill-white`}>
                  <path d="M13 4.5v4C6.5 9 3.5 13.5 3 19.5c2-3.2 5-4.7 10-4.7v4.2l8-7.3-8-7.2Z" />
                </svg>
              </span>

              {/* Bottom: the account and the caption (the cover's alt text, so hidden from screen readers). */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 p-4 pr-12 pb-5 text-white">
                <span className="flex items-center gap-2 text-[13px] font-semibold">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-[10px] font-bold">NG</span>
                  <span className="truncate">{handle}</span>
                </span>
                <span className="mt-2 line-clamp-2 block text-[13px] leading-snug text-white/85">{image.alt}</span>
              </span>
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20">
                {isActive ? (
                  <span className="block h-full origin-left bg-brand-gradient" style={{ transform: `scaleX(${progress})` }} />
                ) : (
                  <span className="block h-full origin-left scale-x-[0.12] bg-brand-gradient transition-transform duration-[4s] ease-linear group-hover:scale-x-100" />
                )}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// The round play button in the middle of a reel; while a video plays it fades to a pause icon
// that shows on hover.
function PlayBadge({ playing }: { playing: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute top-1/2 left-1/2 grid size-16 -translate-1/2 place-items-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-md transition-[scale,opacity] duration-500 ease-out group-hover:scale-110 ${
        playing ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" : ""
      }`}
    >
      {!playing && <span className="absolute inset-0 rounded-full bg-white/25 opacity-0 group-hover:opacity-100 motion-safe:group-hover:animate-ping" />}
      <svg viewBox="0 0 24 24" className={`relative size-7 fill-white ${playing ? "" : "ml-1"}`}>
        {playing ? <path d="M7 4.5h3.5v15H7zM13.5 4.5H17v15h-3.5z" /> : <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />}
      </svg>
    </span>
  );
}
