import Image from "next/image";
import hero from "@/assets/images/about/hero.webp";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { aboutHero } from "@/content/about";

// "Where Creativity Meets Technology": the photo (a hand touching a city of data) behind a navy
// veil that clears toward the right, with the heading, intro, and button on the left. The
// entrance is CSS, like the home hero; the photo is the LCP image, so it is preloaded.
export function AboutHero() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative isolate flex min-h-[clamp(36rem,52.9vw,63.5rem)] items-center overflow-hidden bg-primary"
    >
      <Image src={hero} alt="" fill preload sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
      {/* The design's veil: navy at 75%, then a radial fade that keeps the photo's right side clear. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#1b213f]/75" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(64%_67%_at_99%_46%,transparent_22%,var(--primary)_100%)]"
      />

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
