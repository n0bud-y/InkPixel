import Image from "next/image";
import banner from "@/assets/images/banner.webp";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

const headlineLines = [
  { text: "We make" },
  { text: "brand", accent: true },
  { text: "that earns" },
  { text: "its place." },
];

// Entrance animations are CSS (`motion-safe:animate-*` in globals.css) so they start on the
// first frame, before JavaScript loads. Parallax on the photo comes from SmoothScroll.
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden"
    >
      {/* Taller than the section so the parallax (data-speed="auto") never shows an edge. */}
      <div aria-hidden="true" data-speed="auto" className="absolute inset-x-0 top-0 -z-20 h-[118%]">
        {/* The banner already fades to navy on its left, behind the text. It is the LCP
            image, so it is preloaded and never hidden; decorative, so empty alt text. */}
        <Image
          src={banner}
          alt=""
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[72%_center] motion-safe:animate-hero-zoom lg:object-right"
        />
      </div>
      {/* Phones and tablets: the text sits over the photo, so darken it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-primary via-primary/85 to-primary/40 lg:hidden"
      />
      {/* Fade into the next section. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-linear-to-t from-primary to-transparent"
      />

      <div className="container-site pt-32 pb-20 sm:pt-36 lg:pt-28 lg:pb-16 2xl:pt-36">
        <div>
          <div className="motion-safe:animate-rise">
            <Eyebrow>Studio · Karachi + Worldwide</Eyebrow>
          </div>

          {/* Sizes follow the 1920px design frame and scale down with the viewport.
              Each line rises out of its own mask; the padding keeps descenders visible. */}
          <h1
            id="hero-title"
            className="mt-7 font-display text-[clamp(2.75rem,5.8vw,7rem)] leading-[1.04] font-normal tracking-[-0.02em] text-light sm:mt-8"
          >
            {headlineLines.map((line, index) => (
              <span key={line.text} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
                <span
                  className={`block motion-safe:animate-line-up ${line.accent ? "text-crimson" : ""}`}
                  style={{ animationDelay: `${120 + index * 90}ms` }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="mt-6 max-w-[41em] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.75] text-light/70 motion-safe:animate-rise"
            style={{ animationDelay: "520ms" }}
          >
            Ink Pixel Studios is a leading software development company in Pakistan, providing
            innovative, scalable, and customized software solutions for businesses of all sizes.
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3 motion-safe:animate-rise sm:gap-4 2xl:mt-11 2xl:gap-6"
            style={{ animationDelay: "640ms" }}
          >
            <Magnetic>
              <Button href="/contact" icon>
                Start A Project
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/case-studies" variant="secondary">
                See Our Work
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
