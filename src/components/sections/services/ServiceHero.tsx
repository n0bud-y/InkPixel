import Image from "next/image";
import Link from "next/link";
import hero from "@/assets/images/about/hero.webp";
import { Magnetic } from "@/components/motion/Magnetic";
import { withAccent } from "@/components/ui/accent";
import { Button } from "@/components/ui/Button";
import type { ServicePage } from "@/content/service-pages";
import { siteConfig } from "@/lib/site";

// The service hero: the About photo (the design uses the same one) behind a navy veil, the title,
// intro, and button on the left, and the "Book a Free Consultation" card on the right. The
// design's form comes with the lead pipeline (P3-14); until then the card links to the contact
// page and the email address. The entrance is CSS; the photo is the LCP image, so it is preloaded.
export function ServiceHero({ page }: { page: ServicePage }) {
  const { hero: content, consultation } = page;

  return (
    <section
      aria-labelledby="service-title"
      className="relative isolate flex min-h-[clamp(36rem,52.9vw,63.5rem)] items-center overflow-hidden bg-primary"
    >
      <Image src={hero} alt="" fill preload sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#1b213f]/75" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(64%_67%_at_99%_46%,transparent_22%,var(--primary)_100%)]"
      />

      <div className="container-site grid grid-cols-[minmax(0,1fr)] items-center gap-10 pt-28 pb-16 sm:pt-32 lg:grid-cols-[minmax(0,860fr)_minmax(0,744fr)] lg:gap-[clamp(2rem,2vw,3rem)] lg:pt-28">
        <div className="motion-safe:animate-rise">
          <h1
            id="service-title"
            className="font-display text-[clamp(2.5rem,4.3vw,5.25rem)] leading-[1.08] font-bold tracking-[-0.02em] text-balance text-white"
          >
            {content.title}
          </h1>
          <p className="mt-6 max-w-[40em] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.75] text-light/85">
            {content.text}
          </p>
          <div className="mt-8 2xl:mt-10">
            <Magnetic>
              <Button href={content.button.href} icon>
                {content.button.label}
              </Button>
            </Magnetic>
          </div>
        </div>

        <aside
          aria-labelledby="consultation-title"
          className="rounded-[1.25rem] bg-white px-[clamp(1.5rem,2.1vw,2.5rem)] py-[clamp(2rem,3.3vw,4rem)] text-center shadow-[0_30px_80px_-30px_rgb(0_0_0_/_0.6)] motion-safe:animate-rise motion-safe:[animation-delay:150ms]"
        >
          <h2
            id="consultation-title"
            className="font-display text-[clamp(1.75rem,2.1vw,2.5rem)] leading-tight font-bold tracking-[-0.03em] text-[#2f3d4c]"
          >
            {withAccent(consultation.title)}
          </h2>
          <p className="mx-auto mt-4 max-w-[28em] text-[clamp(0.9375rem,1vw,1.1875rem)] leading-[1.7] text-primary/80">
            {consultation.text}
          </p>
          <Link
            href={consultation.button.href}
            className="mt-[clamp(1.75rem,2.4vw,2.75rem)] flex h-[clamp(3.25rem,3.6vw,4.25rem)] w-full items-center justify-center rounded-full border-2 border-crimson/80 text-[clamp(1.0625rem,1.25vw,1.5rem)] font-medium text-crimson transition-colors duration-200 hover:border-crimson hover:bg-crimson hover:text-white"
          >
            {consultation.button.label}
          </Link>
          <p className="mt-5 text-[clamp(0.875rem,0.95vw,1.125rem)] text-primary/80">
            Or email us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-crimson underline-offset-4 hover:underline">
              {siteConfig.email}
            </a>
          </p>
        </aside>
      </div>
    </section>
  );
}
