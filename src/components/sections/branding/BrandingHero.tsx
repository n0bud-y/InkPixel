import Image from "next/image";
import type { CSSProperties } from "react";
import cube from "@/assets/images/services/branding/decor-cube.webp";
import triangle from "@/assets/images/services/branding/decor-triangle.webp";
import office from "@/assets/images/services/branding/hero-office.webp";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import type { BrandingPage } from "@/content/branding-page";

// Where something sits in the design's 1920 × 1130 hero: its frame's top-left corner and width,
// and its rotation about that corner, as percentages of the hero (desktop, where the hero keeps
// the design's proportions).
const at = (x: number, y: number, width: number, rotate = 0): CSSProperties => ({
  left: `${(x / 1920) * 100}%`,
  top: `${(y / 1130) * 100}%`,
  width: `${(width / 1920) * 100}%`,
  rotate: `${rotate}deg`,
});

// The Branding page's hero: the office photo, faint, over navy; the title, line, and button in
// the middle; clients' logos floating around them (desktop); the design's red cube (desktop) and
// triangle. The entrance is CSS, so it starts on the first frame.
export function BrandingHero({ hero }: { hero: BrandingPage["hero"] }) {
  const { logos } = hero;

  return (
    <section
      aria-labelledby="branding-title"
      className="relative isolate flex min-h-[36rem] items-center overflow-hidden bg-primary lg:block lg:aspect-[1920/1130] lg:min-h-0"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-20 lg:left-[2.45%]">
        <Image src={office} alt="" fill preload sizes="100vw" className="object-cover opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-white/5" />
      </div>
      <Image src={cube} alt="" aria-hidden="true" sizes="19vw" className="absolute -z-10 hidden h-auto lg:block" style={at(1719, 0, 361)} />
      <Image
        src={triangle}
        alt=""
        aria-hidden="true"
        sizes="19vw"
        className="absolute -z-10 h-auto opacity-75"
        style={at(-182, 462, 364, -0.35)}
      />

      {/* Clients' logos, floating (desktop). */}
      <div aria-hidden="true" className="hidden lg:block">
        {[
          { logo: logos.pakArmoring, style: at(105, 287, 187, -19.86), delay: "0s" },
          { logo: logos.drumond, style: at(1634, 188, 360, 45.35), delay: "-1.2s" },
          { logo: logos.ihr, style: at(1444, 717, 304, -11.96), delay: "-2.4s" },
          { logo: logos.gulbaan, style: at(10, 700, 470, -16), delay: "-3.4s", white: true },
        ].map(({ logo, style, delay, white }) => (
          <div key={logo.alt} className="absolute origin-top-left" style={style}>
            <Image
              src={logo.image}
              alt=""
              sizes="19vw"
              className={`h-auto w-full motion-safe:animate-float ${white ? "brightness-0 invert" : "drop-shadow-[0_18px_30px_rgb(0_0_0_/_0.45)]"}`}
              style={{ animationDelay: delay }}
            />
          </div>
        ))}
      </div>

      <div className="container-site relative pt-32 pb-20 text-center sm:pt-36 lg:pt-[17.2%] lg:pb-0">
        <div className="motion-safe:animate-rise">
          <h1
            id="branding-title"
            className="mx-auto max-w-[11em] font-display text-[clamp(2.75rem,7.8vw,9.5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance text-white"
          >
            {hero.title}
          </h1>
          <p className="mx-auto mt-[clamp(1.25rem,1.9vw,2.25rem)] max-w-[44em] text-[clamp(1rem,1.15vw,1.375rem)] leading-[1.85] text-light/85">
            {hero.text}
          </p>
          <div className="mt-[clamp(1.75rem,2vw,2.5rem)] flex justify-center">
            <Magnetic>
              <Button href={hero.button.href} icon>
                {hero.button.label}
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
