"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent, type ReactNode } from "react";
import brandDrop from "@/assets/images/brand-drop.webp";
import { CountUp } from "@/components/motion/CountUp";
import type { Testimonial } from "@/content/home";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

// Dragging: how far (px) before a drag picks a direction, how far to change slide, and how fast
// (px per ms, over the last FLICK_WINDOW ms) a shorter flick must be.
const DRAG_START = 8;
const DRAG_DISTANCE = 60;
const FLICK_SPEED = 0.5;
const FLICK_WINDOW = 100;

export type TestimonialSlide = Omit<Testimonial, "videoAssetId"> & {
  /** The video's address (from Contentful); the play button only appears when it is set. */
  video?: string;
};

// The whole testimonials layout, one testimonial at a time: heading + quote + action on the
// left, the client's video card in the middle, results on the right.
// - The quote, photo, and results change with the slide; the heading and action stay.
// - Quotes are stacked in one grid cell (only the active one visible), so the column is as
//   tall as the longest quote and nothing moves when slides change.
// - Dots are buttons (arrow keys move between them); a hidden live region announces
//   "Testimonial 2 of 6" on change. No auto-rotation.
// - Changing slide crossfades the photo and cascades the quote and stats in (skipped for
//   reduced motion).
// - The play button only appears when a testimonial has a video; playback stays in the
//   cropped card and starts on demand.
// - Drag the photo card sideways (mouse, touch, or pen), or swipe the quote on a touch screen,
//   to change slide: past DRAG_DISTANCE, or a quick flick, moves one slide (wrapping round);
//   less springs back. The card follows the pointer (not for reduced motion). Only clearly
//   sideways movement counts, so vertical scrolling still works; a drag never counts as a click;
//   no dragging while a video plays.
// Children marked data-reveal cascade in when the carousel is wrapped in <Reveal>.
export function TestimonialCarousel({
  testimonials,
  heading,
  action,
}: {
  testimonials: TestimonialSlide[];
  heading: ReactNode;
  action: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const firstRun = useRef(true);
  const [index, setIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const current = testimonials[index];
  const count = testimonials.length;

  const playVideo = () => {
    const player = video.current;
    if (!player) return;
    player.play().then(
      () => setVideoPlaying(true),
      (error: unknown) => console.error(`Home page: could not play the testimonial video for "${current.client}".`, error),
    );
  };

  const goToSlide = (next: number) => {
    video.current?.pause();
    setVideoPlaying(false);
    setIndex(next);
  };

  // The slide shown before the current one, whose photo stays under the new one while it fades in.
  const previous = useRef(0);

  useGSAP(
    () => {
      const before = previous.current;
      previous.current = index;
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      if (!window.matchMedia(MOTION_OK).matches) return;
      const photo = (slide: number) => `[data-slide-photo="${slide}"]`;
      // The new photo fades in on top; the old one stays fully shown underneath until it has.
      gsap.fromTo(
        photo(index),
        { autoAlpha: 0, scale: 1.06 },
        { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out", overwrite: true },
      );
      if (before !== index) {
        gsap.set(photo(before), { autoAlpha: 1 });
        gsap.to(photo(before), { autoAlpha: 0, duration: 0.3, delay: 0.6, ease: "none" });
      }
      gsap.fromTo(
        "[data-slide-quote] p",
        { y: 16, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out", stagger: 0.08, overwrite: true },
      );
      gsap.fromTo(
        "[data-slide-stat]",
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.07, overwrite: true },
      );
    },
    { dependencies: [index], scope: root },
  );

  // Dragging: where it started, which way it is going once clear ("x" sideways, "y" a scroll),
  // and whether the card follows it.
  const card = useRef<HTMLDivElement>(null);
  // `recent` keeps the last FLICK_WINDOW ms of positions, for the speed at release.
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    recent: { x: number; time: number }[];
    axis: "x" | "y" | null;
    follow: boolean;
  } | null>(null);
  const dragged = useRef(false);
  const canDrag = count > 1 && !videoPlaying;

  const onDragStart = (event: PointerEvent<HTMLDivElement>, { follow, touchOnly = false }: { follow: boolean; touchOnly?: boolean }) => {
    if (!canDrag || (touchOnly && event.pointerType === "mouse") || (event.pointerType === "mouse" && event.button !== 0)) return;
    dragged.current = false;
    drag.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      recent: [{ x: event.clientX, time: event.timeStamp }],
      axis: null,
      follow: follow && window.matchMedia(MOTION_OK).matches,
    };
  };

  const onDragMove = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || event.pointerId !== current.id) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    if (!current.axis) {
      if (Math.hypot(dx, dy) < DRAG_START) return;
      current.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      // Keep the pointer once it is clearly a drag (also when it leaves the card).
      if (current.axis === "x") event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (current.axis !== "x") return;
    dragged.current = true;
    current.recent = [...current.recent, { x: event.clientX, time: event.timeStamp }].filter(
      (point) => event.timeStamp - point.time <= FLICK_WINDOW,
    );
    if (current.follow && card.current) gsap.set(card.current, { x: dx * 0.6, rotation: dx * 0.02, overwrite: true });
  };

  const onDragEnd = (event: PointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current || event.pointerId !== current.id) return;
    drag.current = null;
    if (current.follow && card.current) gsap.to(card.current, { x: 0, rotation: 0, duration: 0.5, ease: "power3.out", overwrite: true });
    if (current.axis !== "x" || event.type === "pointercancel") return;
    const dx = event.clientX - current.x;
    // Speed over the last moments only, so a flick counts even after a slow start.
    const [first] = current.recent;
    const speed = first ? Math.abs(event.clientX - first.x) / Math.max(1, event.timeStamp - first.time) : 0;
    if (Math.abs(dx) > DRAG_DISTANCE || speed > FLICK_SPEED) goToSlide((index + (dx < 0 ? 1 : -1) + count) % count);
  };

  // A drag ends with a click on whatever is under the pointer; ignore it.
  const onClickAfterDrag = (event: MouseEvent) => {
    if (!dragged.current) return;
    dragged.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  const onDotsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + count) % count;
    goToSlide(next);
    event.currentTarget.querySelectorAll<HTMLButtonElement>("button")[next]?.focus({ preventScroll: true });
  };

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-[minmax(0,535fr)_minmax(0,369fr)] md:gap-x-[4.2vw] xl:grid-cols-[minmax(0,568fr)_minmax(0,535fr)_minmax(0,369fr)] xl:items-center xl:gap-x-[4.4vw]"
    >
      <p aria-live="polite" className="sr-only">
        Testimonial {index + 1} of {count}
      </p>

      {/* Left: heading, quote, action. A size container, so the heading can follow its width. */}
      <div className="@container md:col-span-2 xl:col-span-1 xl:-mt-[3vw]">
        {heading}

        {/* Swipeable on touch screens (a mouse selects the text as usual). */}
        <div
          data-reveal
          onPointerDown={(event) => onDragStart(event, { follow: false, touchOnly: true })}
          onPointerMove={onDragMove}
          onPointerUp={onDragEnd}
          onPointerCancel={onDragEnd}
          onClickCapture={onClickAfterDrag}
          className="mt-5 grid touch-pan-y"
        >
          {testimonials.map((testimonial, slide) => (
            <blockquote
              key={slide}
              data-slide-quote={slide === index ? "" : undefined}
              aria-hidden={slide === index ? undefined : true}
              className={[
                "col-start-1 row-start-1 max-w-[44em] text-[clamp(1rem,1.17vw,1.4rem)] leading-[1.85] text-white",
                slide === index ? "" : "invisible",
              ].join(" ")}
            >
              {testimonial.quote.map((paragraph, line) => (
                <p key={line} className={line > 0 ? "mt-[1lh]" : undefined}>
                  {paragraph}
                </p>
              ))}
            </blockquote>
          ))}
        </div>

        <div data-reveal className="mt-5 2xl:mt-6">
          {action}
        </div>
      </div>

      {/* Middle: video card + dots. */}
      <div data-reveal>
        {/* The drop overlaps the card's bottom-left corner, so this wrapper does not clip. */}
        <div className="relative mx-auto w-full max-w-[26rem] md:max-w-none">
          {/* Draggable: the card follows the pointer, and a long enough drag changes slide. */}
          <div
            ref={card}
            onPointerDown={(event) => onDragStart(event, { follow: true })}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
            onClickCapture={onClickAfterDrag}
            className={[
              "relative aspect-[535/684] touch-pan-y overflow-hidden rounded-[clamp(1.5rem,2.1vw,2.5rem)] bg-[#2b2e44] select-none",
              canDrag ? "cursor-grab active:cursor-grabbing" : "",
            ].join(" ")}
          >
            {/* Every slide's photo, stacked; only the current one shows (and it sits on top), so
                changing slide crossfades from one card to the next. `isolate` keeps them under
                the veil and the video. */}
            <div className="absolute inset-0 isolate">
              {testimonials.map((testimonial, slide) => (
                <Image
                  key={slide}
                  data-slide-photo={slide}
                  src={testimonial.image}
                  alt={slide === index ? testimonial.client : ""}
                  aria-hidden={slide === index ? undefined : true}
                  draggable={false}
                  fill
                  sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 26rem"
                  placeholder="blur"
                  className={`object-cover ${slide === index ? "z-[1]" : "opacity-0"}`}
                />
              ))}
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-black/25" />

            {current.video && (
              <video
                key={`video-${index}`}
                ref={video}
                src={current.video}
                poster={current.image.src}
                preload="none"
                controls={videoPlaying}
                playsInline
                aria-hidden={!videoPlaying}
                className={[
                  "absolute inset-0 size-full object-cover transition-opacity duration-300",
                  videoPlaying ? "opacity-100" : "pointer-events-none opacity-0",
                ].join(" ")}
              />
            )}

            {current.video && !videoPlaying && (
              <button
                type="button"
                onClick={playVideo}
                className="group absolute top-1/2 left-1/2 grid size-[clamp(3.5rem,4.4vw,5.25rem)] -translate-1/2 place-items-center rounded-full border-[clamp(3px,0.26vw,5px)] border-crimson bg-black/10 backdrop-blur-[2px] transition-transform duration-300 hover:scale-105"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full border-2 border-crimson opacity-60 motion-safe:animate-ping"
                />
                <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-[8%] size-[42%] fill-crimson">
                  <path d="M6 3.5v17l14-8.5z" />
                </svg>
                <span className="sr-only">Play {current.client} video</span>
              </button>
            )}
          </div>

          {/* <div
            aria-hidden="true"
            data-speed="0.9"
            className="pointer-events-none absolute bottom-[2.5%] -left-[3%] w-[30%] sm:-left-[12%]"
          >
            <Image src={brandDrop} alt="" sizes="(min-width: 1280px) 9vw, 30vw" className="h-auto w-full" />
          </div> */}
        </div>

        {count > 1 && (
          <div
            role="group"
            aria-label="Choose a testimonial"
            onKeyDown={onDotsKeyDown}
            className="mt-[clamp(1.5rem,2.2vw,2.6rem)] flex items-center justify-center"
          >
            {testimonials.map((testimonial, dot) => (
              <button
                key={dot}
                type="button"
                aria-label={`Show testimonial ${dot + 1}`}
                aria-current={dot === index ? "true" : undefined}
                tabIndex={dot === index ? 0 : -1}
                onClick={() => goToSlide(dot)}
                className="group grid h-6 place-items-center px-1.5"
              >
                <span
                  className={[
                    "block h-1.5 rounded-full transition-all duration-500 ease-out",
                    dot === index ? "w-12 bg-brand-gradient" : "w-3 bg-white/30 group-hover:bg-white/60",
                  ].join(" ")}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: results. Label before value in the markup (required by <dl>); shown value-first. */}
      <dl
        data-reveal
        className="grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-x-10 md:mt-[2.1vw] md:grid-cols-1 md:gap-0 md:self-start"
      >
        {current.stats.map((stat, position) => (
          <div
            key={`${index}-${stat.label}`}
            data-slide-stat
            className="flex flex-col-reverse justify-end border-b border-white/35 pb-3 md:items-end md:pt-[clamp(0.75rem,0.9vw,1.1rem)] md:pb-[clamp(0.75rem,0.85vw,1.05rem)] md:text-right md:first:pt-0"
          >
            <dt className="mt-1 text-sm text-light/90 2xl:text-lg">{stat.label}</dt>
            <dd className="font-display text-[clamp(2.75rem,4.8vw,5.75rem)] leading-none font-medium tracking-[-0.04em]">
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                delay={position * 150}
                className="bg-brand-gradient bg-clip-text pr-[0.04em] text-transparent"
              />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
