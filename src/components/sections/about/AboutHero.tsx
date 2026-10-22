import poster from "@/assets/images/about/hero-video-poster.webp";
import droplet from "@/assets/videos/about-droplet.mp4";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { aboutHero } from "@/content/about";
import { AboutHeroVideo } from "./AboutHeroVideo";

// "Where Creativity Meets Technology": the heading, intro, and button on the left, and behind
// them a looping video of a red drop forming the Ink Pixel drop (AboutHeroVideo). On desktop the
// video fills the right ~65% and fades into the navy toward the text; its near-black background
// blends into the navy (lighten), so only the drop shows. Phones and tablets: the video behind
// the text under a navy veil. The entrance is CSS, like the home hero.
export function AboutHero() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative isolate flex min-h-[clamp(36rem,52.9vw,63.5rem)] items-center overflow-hidden bg-primary"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 mix-blend-lighten [mask-image:linear-gradient(to_bottom,#000_75%,transparent)] lg:left-auto lg:w-[65%] lg:[mask-image:linear-gradient(to_right,transparent,#000_35%,#000_85%,transparent),linear-gradient(to_bottom,#000_80%,transparent)] lg:[mask-composite:intersect]"
      >
        <AboutHeroVideo src={droplet} poster={poster.src} className="size-full object-cover" />
      </div>
      {/* Phones and tablets: the text sits over the video, so darken it. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-primary via-primary/80 to-primary/45 lg:hidden" />

      <div className="container-site pt-28 pb-16 sm:pt-32 lg:pt-28">
        <div className="max-w-[46rem] motion-safe:animate-rise">
          <h1
            id="about-title"
            className="font-display text-[clamp(2.75rem,4.6vw,5.5rem)] leading-[1.08] font-bold tracking-[-0.02em] text-white"
          >
            {aboutHero.title}
          </h1>
          <p className="mt-6 max-w-[40em] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.75] text-light/85">
            {aboutHero.text}
          </p>
          <div className="mt-8 2xl:mt-10">
            <Magnetic>
              <Button href={aboutHero.button.href} icon>
                {aboutHero.button.label}
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
