"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import brandDrop from "@/assets/images/brand-drop.webp";
import { CountUp } from "@/components/motion/CountUp";
import type { Testimonial } from "@/content/home";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

// The whole testimonials layout, one testimonial at a time: heading + quote + action on the
// left, the client's video card in the middle, results on the right.
// - The quote, photo, and results change with the slide; the heading and action stay.
// - Quotes are stacked in one grid cell (only the active one visible), so the column is as
//   tall as the longest quote and nothing moves when slides change.
// - Dots are buttons (arrow keys move between them); a hidden live region announces
//   "Testimonial 2 of 6" on change. No auto-rotation.
// - Changing slide crossfades the photo and cascades the quote and stats in (skipped for
//   reduced motion).
// - The play button only appears when a testimonial has a video; it opens a full-screen
//   native <dialog> (Esc closes it, focus stays inside).
// Children marked data-reveal cascade in when the carousel is wrapped in <Reveal>.
export function TestimonialCarousel({
  testimonials,
  heading,
  action,
}: {
  testimonials: Testimonial[];
  heading: ReactNode;
  action: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLDialogElement>(null);
  const firstRun = useRef(true);
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  const count = testimonials.length;

  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      if (!window.matchMedia(MOTION_OK).matches) return;
      gsap.fromTo(
        "[data-slide-image]",
        { autoAlpha: 0, scale: 1.06 },
        { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out", overwrite: true },
      );
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

  const onDotsKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const next = (index + step + count) % count;
    setIndex(next);
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

        <div data-reveal className="mt-5 grid">
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
          <div className="relative aspect-[535/684] overflow-hidden rounded-[clamp(1.5rem,2.1vw,2.5rem)] bg-[#2b2e44]">
            <Image
              key={index}
              data-slide-image
              src={current.image}
              alt={current.client}
              fill
              sizes="(min-width: 1280px) 28vw, (min-width: 768px) 45vw, 26rem"
              placeholder="blur"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-black/25" />

            {current.video && (
              <button
                type="button"
                onClick={() => video.current?.showModal()}
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

          <div
            aria-hidden="true"
            data-speed="0.9"
            className="pointer-events-none absolute bottom-[2.5%] -left-[3%] w-[30%] sm:-left-[12%]"
          >
            <Image src={brandDrop} alt="" sizes="(min-width: 1280px) 9vw, 30vw" className="h-auto w-full" />
          </div>
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
                onClick={() => setIndex(dot)}
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

      {current.video && (
        <dialog
          ref={video}
          aria-label={`${current.client} video`}
          onClose={(event) => event.currentTarget.querySelector("video")?.pause()}
          className="m-auto w-[min(90vw,60rem)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        >
          <form method="dialog" className="mb-3 flex justify-end">
            <button
              type="submit"
              className="rounded-full border border-white/25 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
            >
              Close
            </button>
          </form>
          <video src={current.video} controls autoPlay playsInline className="w-full rounded-2xl bg-black" />
        </dialog>
      )}
    </div>
  );
}
