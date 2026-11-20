import Link from "next/link";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withAccent } from "@/components/ui/accent";

type Crumb = { label: string; href?: string };
type Action = { label: string; href: string };

// The packages pages' hero: navy with the faint grid and the brand glows (as SceneHero), the
// breadcrumb, the pill, the title (`*accent*` words in the brand gradient), a line, and buttons.
export function PackagesHero({
  crumbs,
  eyebrow,
  title,
  text,
  primary,
  secondary,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: string;
  text: string;
  primary: Action;
  secondary?: Action;
}) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-primary">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_at_50%_40%,#000,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="absolute top-[5%] right-[-15%] -z-10 size-[50rem] max-w-[150vw] rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.3),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-35%] left-[-15%] -z-10 size-[40rem] max-w-[140vw] rounded-full bg-[radial-gradient(closest-side,rgb(250_97_67_/_0.16),transparent)]"
      />

      <div className="container-site pt-32 pb-[clamp(3.5rem,5vw,6rem)] text-center sm:pt-36 lg:pt-40 2xl:pt-48">
        <div className="motion-safe:animate-rise">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-light/60 2xl:text-sm">
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden="true">›</span>}
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-light/90">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mx-auto mt-6 max-w-[14em] font-display text-[clamp(2.5rem,5vw,5.75rem)] leading-[1.04] font-medium tracking-[-0.03em] text-balance text-white"
          >
            {withAccent(title)}
          </h1>
          <p className="mx-auto mt-[clamp(1.25rem,1.6vw,2rem)] max-w-[40em] text-[clamp(1rem,1.15vw,1.375rem)] leading-[1.8] text-light/80">
            {text}
          </p>
          <div className="mt-[clamp(1.75rem,2.2vw,2.75rem)] flex flex-wrap justify-center gap-3">
            <Magnetic>
              <Button href={primary.href} icon>
                {primary.label}
              </Button>
            </Magnetic>
            {secondary && (
              <Button href={secondary.href} variant="secondary">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
