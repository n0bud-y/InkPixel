"use client";

import Image from "next/image";
import { useState } from "react";
import type { ContentfulImage } from "@/contentful/queries/case-studies";

// A before / after pair shot from the same spot, laid over each other: drag the handle (or use the
// arrow keys: it's a range input) to wipe between them. Starts half and half; both photos keep
// their alt text, the slider is named for the pair.
export function CompareSlider({
  before,
  after,
  name,
  dark,
}: {
  before: ContentfulImage;
  after: ContentfulImage;
  name: string | null;
  dark: boolean;
}) {
  const [position, setPosition] = useState(50);
  const label = "pointer-events-none absolute bottom-4 rounded-full px-3.5 py-1.5 font-mono text-[11px] tracking-[0.16em] text-white uppercase backdrop-blur-sm";

  return (
    <figure>
      <div className="relative overflow-hidden rounded-[1.75rem] shadow-[0_50px_100px_-50px_rgb(10_12_30_/_0.9)] ring-1 ring-white/10 select-none">
        <Image
          src={after.url}
          width={after.width}
          height={after.height}
          alt={after.alt}
          unoptimized={after.isSvg}
          sizes="(min-width: 640px) 34rem, 100vw"
          className="block h-auto w-full"
          draggable={false}
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={before.url}
            width={before.width}
            height={before.height}
            alt={before.alt}
            unoptimized={before.isSvg}
            sizes="(min-width: 640px) 34rem, 100vw"
            className="block size-full object-cover"
            draggable={false}
          />
        </div>
        <span aria-hidden="true" className={`${label} left-4 bg-primary/80`}>
          Before
        </span>
        <span aria-hidden="true" className={`${label} right-4 bg-brand-gradient`}>
          After
        </span>

        {/* The divider and its handle. */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_18px_rgb(0_0_0_/_0.45)]" style={{ left: `${position}%` }}>
          <span className="absolute top-1/2 left-1/2 grid size-12 -translate-1/2 place-items-center rounded-full border-4 border-white bg-brand-gradient-reverse text-white shadow-[0_12px_30px_-8px_rgb(201_29_76_/_0.8)]">
            <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[2.5]">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={name ? `${name}: before and after (drag to compare)` : "Before and after (drag to compare)"}
          className="peer absolute inset-0 size-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.75rem] peer-focus-visible:outline-2 peer-focus-visible:-outline-offset-4 peer-focus-visible:outline-coral" />
      </div>
      <figcaption className={`mt-4 text-center text-[14px] ${dark ? "text-light/65" : "text-primary/60"}`}>
        {name ?? "Before and after"} · drag to compare
      </figcaption>
    </figure>
  );
}
