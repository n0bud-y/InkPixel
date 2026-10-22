import type { ComponentType } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withAccent } from "@/components/ui/accent";
import { coreHero, type CorePage } from "@/content/core-pages";
import { AiAutomationScene } from "./scenes/AiAutomationScene";
import { ApplicationsScene } from "./scenes/ApplicationsScene";
import { DevelopmentScene } from "./scenes/DevelopmentScene";
import { MarketingScene } from "./scenes/MarketingScene";
import { SoftwareScene } from "./scenes/SoftwareScene";

// Each core service's illustration (drawn in code; see scenes/parts.tsx).
const scenes: Record<string, ComponentType> = {
  development: DevelopmentScene,
  marketing: MarketingScene,
  software: SoftwareScene,
  applications: ApplicationsScene,
  "ai-automation": AiAutomationScene,
};

// The hero of every core service page except Branding (which has its own, BrandingHero): navy
// with the faint grid and crimson and coral glows; on the left the pill, the title (accent words
// in the brand gradient), the line, and two buttons (the page's call, and Our Work filtered to
// this service); on the right the service's illustration. Phones and tablets: the text, then the
// illustration. The entrance is CSS, so it starts on the first frame; the title is the LCP.
export function CoreHero({ slug, label, hero }: { slug: string; label: string; hero: CorePage["hero"] }) {
  const Scene = scenes[slug];

  return (
    <section aria-labelledby="core-title" className="relative isolate overflow-hidden bg-primary">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_70%_45%,#000,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="absolute top-[10%] right-[-10%] -z-10 size-[56rem] max-w-[150vw] rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.3),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-30%] left-[-15%] -z-10 size-[44rem] max-w-[140vw] rounded-full bg-[radial-gradient(closest-side,rgb(250_97_67_/_0.16),transparent)]"
      />

      <div className="container-site grid grid-cols-[minmax(0,1fr)] items-center gap-x-[clamp(2rem,4vw,6rem)] gap-y-12 pt-32 pb-[clamp(4rem,6vw,7rem)] sm:pt-36 lg:min-h-[min(100svh,64rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:pt-36 2xl:pt-44">
        <div className="text-center motion-safe:animate-rise lg:text-left">
          <Eyebrow>{coreHero.eyebrow(label)}</Eyebrow>
          <h1
            id="core-title"
            className="mx-auto mt-6 max-w-[11em] font-display text-[clamp(2.75rem,5.3vw,6.5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance text-white lg:mx-0"
          >
            {withAccent(hero.title)}
          </h1>
          <p className="mx-auto mt-[clamp(1.25rem,1.6vw,2rem)] max-w-[36em] text-[clamp(1rem,1.15vw,1.375rem)] leading-[1.8] text-light/80 lg:mx-0">
            {hero.text}
          </p>
          <div className="mt-[clamp(1.75rem,2.2vw,2.75rem)] flex flex-wrap justify-center gap-3 lg:justify-start">
            <Magnetic>
              <Button href={hero.button.href} icon>
                {hero.button.label}
              </Button>
            </Magnetic>
            <Button href={`/case-studies?service=${slug}`} variant="secondary">
              {coreHero.workButton}
            </Button>
          </div>
        </div>

        {Scene && (
          <div className="motion-safe:animate-[rise_1.1s_var(--ease-out-soft)_0.15s_both]">
            <Scene />
          </div>
        )}
      </div>
    </section>
  );
}
