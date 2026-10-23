import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withAccent } from "@/components/ui/accent";
import { coreHero } from "@/content/core-pages";

type Link = { label: string; href: string };

// The split hero of the core service pages (except Branding) and the service pages: navy with the
// faint grid and crimson and coral glows; on the left the pill, the title (`*accent*` words in the
// brand gradient), the line, and two buttons (the page's call, and Our Work filtered to the core
// service); on the right the illustration (scenes/). Phones and tablets: the text, then the
// illustration. The entrance is CSS, so it starts on the first frame; the title is the LCP.
// `compact` is a smaller title for the service pages' longer ones.
export function SceneHero({
  eyebrow,
  title,
  text,
  button,
  workHref,
  compact = false,
  scene,
}: {
  eyebrow: string;
  title: string;
  text: string;
  button: Link;
  workHref: string;
  compact?: boolean;
  scene: ReactNode;
}) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-primary">
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
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className={`mx-auto mt-6 font-display leading-[1.04] font-medium tracking-[-0.03em] text-balance text-white lg:mx-0 ${
              compact ? "max-w-[14em] text-[clamp(2.375rem,4vw,4.75rem)]" : "max-w-[11em] text-[clamp(2.75rem,5.3vw,6.5rem)]"
            }`}
          >
            {withAccent(title)}
          </h1>
          <p className="mx-auto mt-[clamp(1.25rem,1.6vw,2rem)] max-w-[36em] text-[clamp(1rem,1.15vw,1.375rem)] leading-[1.8] text-light/80 lg:mx-0">
            {text}
          </p>
          <div className="mt-[clamp(1.75rem,2.2vw,2.75rem)] flex flex-wrap justify-center gap-3 lg:justify-start">
            <Magnetic>
              <Button href={button.href} icon>
                {button.label}
              </Button>
            </Magnetic>
            <Button href={workHref} variant="secondary">
              {coreHero.workButton}
            </Button>
          </div>
        </div>

        {scene && <div className="motion-safe:animate-[rise_1.1s_var(--ease-out-soft)_0.15s_both]">{scene}</div>}
      </div>
    </section>
  );
}
