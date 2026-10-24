import poster from "@/assets/images/about/hero-video-poster.webp";
import droplet from "@/assets/videos/about-droplet.mp4";
import { LetterWave } from "@/components/motion/LetterWave";
import { Magnetic } from "@/components/motion/Magnetic";
import { AboutHeroVideo } from "@/components/sections/about/AboutHeroVideo";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";

// From the content document (23 Oct 2026). A line break (\n) wraps a line there on every screen
// ("Limits." on its own line: project head, 23 Oct 2026).
const headlineLines = [
  { text: "Build Smarter." },
  { text: "Innovate Faster.", accent: true },
  { text: "Grow Without\nLimits." },
];

// Entrance animations are CSS (`motion-safe:animate-*` in globals.css) so they start on the
// first frame, before JavaScript loads. Parallax on the video comes from SmoothScroll.
//
// Background: the About hero's video of the red drop forming the Ink Pixel drop, placed as there.
// On desktop it fills the right ~65% and fades into the navy toward the text; its near-black
// background blends into the navy (lighten), so only the drop shows. Phones and tablets: behind
// the text under a navy veil. (The Awards highlights clip it replaced, in public/videos/, is kept
// for a case study.)
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-svh items-center overflow-hidden bg-primary">
      {/* Taller than the section so the parallax (data-speed="auto") never shows an edge. */}
      <div
        aria-hidden="true"
        data-speed="auto"
        className="absolute inset-x-0 top-0 -z-20 h-[118%] mix-blend-lighten [mask-image:linear-gradient(to_bottom,#000_75%,transparent)] lg:left-auto lg:w-[65%] lg:[mask-image:linear-gradient(to_right,transparent,#000_35%,#000_85%,transparent),linear-gradient(to_bottom,#000_80%,transparent)] lg:[mask-composite:intersect]"
      >
        <AboutHeroVideo src={droplet} poster={poster.src} className="size-full object-cover motion-safe:animate-hero-zoom" />
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
              Each line rises out of its own mask; the padding keeps descenders visible. The
              accent line's letters rise one by one, then a wave runs through them every few
              seconds (LetterWave); its mask has room above for the letters' hop. */}
          <h1
            id="hero-title"
            className="mt-7 font-display text-[clamp(2.75rem,5.8vw,7rem)] leading-[1.04] font-bold tracking-[-0.02em] text-light sm:mt-8"
          >
            {headlineLines.map((line, index) => (
              <span
                key={line.text}
                className={`-mb-[0.14em] block overflow-hidden ${line.accent ? "-mt-[0.2em]" : ""}`}
              >
                {line.accent ? (
                  <LetterWave text={line.text} delay={120 + index * 90} className="block text-crimson" />
                ) : (
                  <span className="block whitespace-pre-line motion-safe:animate-line-up" style={{ animationDelay: `${120 + index * 90}ms` }}>
                    {line.text}
                  </span>
                )}
              </span>
            ))}
          </h1>

          <p
            className="mt-6 max-w-[41em] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.75] text-light/70 motion-safe:animate-rise"
            style={{ animationDelay: "520ms" }}
          >
            Ink Pixel Studios is a place where you get to convert your visions into digital products
            that are successful and strong for businesses today and tomorrow.
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
