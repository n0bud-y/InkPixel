"use client";

import Image from "next/image";
import { useState } from "react";
import type { YouTubeVideo } from "@/contentful/queries/case-studies";

// A YouTube video as its thumbnail with a play button. Only a click loads YouTube's player (from
// youtube-nocookie.com, which sets no cookies until the video plays), so a page of videos stays
// light. `large` asks for the high-resolution thumbnail, falling back to the standard one (not
// every video has it).
export function VideoPlayer({ video, large = false, sizes }: { video: YouTubeVideo; large?: boolean; sizes: string }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(large ? "maxresdefault" : "hqdefault");
  const label = video.title ?? "YouTube video";

  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
        title={label}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        className="aspect-video w-full rounded-[1.25rem] bg-black"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block aspect-video w-full overflow-hidden rounded-[1.25rem] bg-black text-left shadow-[0_30px_60px_-30px_rgb(0_0_0_/_0.6)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
    >
      <span className="sr-only">Play video: {label}</span>
      <Image
        src={`https://i.ytimg.com/vi/${video.id}/${thumb}.jpg`}
        alt=""
        fill
        sizes={sizes}
        onError={() => setThumb("hqdefault")}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      <span
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 flex -translate-1/2 items-center justify-center rounded-full bg-brand-gradient-reverse shadow-[0_12px_32px_-8px_rgb(201_29_76_/_0.8)] transition-transform duration-300 group-hover:scale-110 ${large ? "size-[clamp(4rem,5.5vw,6rem)]" : "size-14"}`}
      >
        <svg viewBox="0 0 24 24" className={`ml-1 fill-white ${large ? "size-[40%]" : "size-6"}`}>
          <path d="M7 4.5v15l13-7.5z" />
        </svg>
      </span>
    </button>
  );
}
