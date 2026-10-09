import Image from "next/image";
import officeMap from "@/assets/images/about/office-map.webp";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { visitUs } from "@/content/about";
import { siteConfig } from "@/lib/site";

// The office map (a picture that opens Google Maps: no map scripts on the page), the
// "Get In Touch" card, and the "Contact Us" card with the address and email. The design's form
// comes with the lead pipeline (P3-14); until then the card links to the contact page.
// Phones and tablets: the two cards, then the map.
export function VisitUs() {
  return (
    <section aria-labelledby="visit-title" className="bg-primary">
      <div className="container-site py-[clamp(4rem,6.25vw,7.5rem)]">
        <Reveal
          stagger={0.12}
          className="grid grid-cols-[minmax(0,1fr)] items-center gap-6 lg:grid-cols-[minmax(0,630fr)_minmax(0,491fr)_minmax(0,525fr)] lg:gap-0"
        >
          <a
            href={visitUs.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="group block max-lg:order-last"
          >
            <span className="sr-only">Open our office in Google Maps (opens in a new tab)</span>
            <Image
              src={officeMap}
              alt=""
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="h-auto w-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.01]"
            />
          </a>

          <div
            data-reveal
            className="rounded-[1.2rem] bg-white px-[clamp(1.5rem,2.3vw,2.75rem)] py-[clamp(2rem,3vw,3.5rem)] text-center shadow-[0_24px_60px_-30px_rgb(0_0_0_/_0.6)] ring-1 ring-primary/30 lg:min-h-[clamp(24rem,33.9vw,40.6rem)] lg:content-center"
          >
            <h2
              id="visit-title"
              className="mx-auto w-fit bg-brand-gradient-reverse bg-clip-text font-display text-[clamp(2.25rem,3.3vw,4rem)] leading-tight font-medium tracking-[-0.02em] text-transparent"
            >
              {visitUs.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[22em] text-[clamp(0.9375rem,1vw,1.1875rem)] leading-[1.75] text-primary/85">{visitUs.text}</p>
            <div className="mt-8">
              <Magnetic>
                <Button href="/contact" variant="primary-reverse" icon>
                  Start a project
                </Button>
              </Magnetic>
            </div>
            <p className="mt-6 text-[clamp(0.875rem,0.9vw,1.0625rem)] text-primary/75">
              or email us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-crimson underline decoration-crimson/30 underline-offset-4 transition-colors duration-300 hover:decoration-crimson"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>

          <div
            data-reveal
            className="rounded-[1.2rem] bg-brand-gradient px-[clamp(1.5rem,1.9vw,2.25rem)] py-[clamp(2rem,2.6vw,3rem)] text-white shadow-[0_24px_60px_-30px_rgb(201_29_76_/_0.8)] lg:-ml-[0.3vw]"
          >
            <p className="font-display text-[clamp(1.75rem,2.1vw,2.5rem)] leading-tight font-bold">Contact Us</p>
            <p className="mt-2 text-sm font-semibold">{visitUs.hours}</p>
            <address className="mt-[clamp(1.25rem,1.6vw,2rem)] space-y-[clamp(1rem,1.4vw,1.6rem)] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-snug not-italic">
              <p className="flex gap-3">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mt-0.5 size-[1.4em] shrink-0">
                  <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                <span>{siteConfig.address}</span>
              </p>
              <p className="flex gap-3">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="mt-0.5 size-[1.4em] shrink-0">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
                </svg>
                <a href={`mailto:${siteConfig.email}`} className="underline-offset-4 hover:underline">
                  {siteConfig.email}
                </a>
              </p>
            </address>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
