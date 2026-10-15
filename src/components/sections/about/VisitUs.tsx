import Image from "next/image";
import type { ReactNode } from "react";
import contactMap from "@/assets/images/contact-map.webp";
import { Reveal } from "@/components/motion/Reveal";
import { visitUs } from "@/content/about";
import { siteConfig } from "@/lib/site";
import { ContactForm } from "./ContactForm";

// Icons for the social links, by site; any other site gets a globe.
const socialIcons: Record<string, { name: string; icon: ReactNode }> = {
  "instagram.com": {
    name: "Instagram",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </>
    ),
  },
  "x.com": { name: "X", icon: <path d="M4 4l16 16M20 4L4 20" /> },
  "twitter.com": { name: "X", icon: <path d="M4 4l16 16M20 4L4 20" /> },
  "facebook.com": {
    name: "Facebook",
    icon: <path d="M14 21v-7h3l.5-3.5H14V8.5c0-1 .5-1.5 1.5-1.5H18V4h-3c-2.5 0-4 1.5-4 4v2.5H8V14h3v7" />,
  },
  "youtube.com": {
    name: "YouTube",
    icon: (
      <>
        <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
        <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
      </>
    ),
  },
  "linkedin.com": {
    name: "LinkedIn",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5a2.5 2.5 0 0 1 5 0V17" />
      </>
    ),
  },
};
const globe = (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
  </>
);
const socialOf = (url: string) => {
  const host = new URL(url).hostname.replace(/^www\./, "");
  return socialIcons[host] ?? { name: host, icon: globe };
};

const iconClass = "mt-0.5 size-[1.25em] shrink-0";

// "Get in touch" (About, service pages, Services): one card, the form on white on the left, and on
// the gradient on the right a short line, the office map (a picture that opens Google Maps: no map
// scripts on the page), the address, phone, and email, then the social links (once siteConfig
// has any). Phones and tablets: the form, then the details.
export function VisitUs() {
  return (
    <section aria-labelledby="visit-title" className="bg-primary">
      <div className="container-site py-[clamp(4rem,6.25vw,7.5rem)]">
        <Reveal
          stagger={0.12}
          className="mx-auto grid max-w-[81rem] grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[clamp(1rem,1.6vw,1.9rem)] shadow-[0_30px_80px_-40px_rgb(0_0_0_/_0.8)] lg:grid-cols-2"
        >
          <div data-reveal className="bg-white px-[clamp(1.5rem,4.1vw,5rem)] py-[clamp(2.5rem,4.6vw,5.5rem)]">
            <h2
              id="visit-title"
              className="w-fit bg-brand-gradient-reverse bg-clip-text font-display text-[clamp(2.25rem,3.3vw,4rem)] leading-tight font-medium tracking-[-0.02em] text-transparent"
            >
              {visitUs.title}
            </h2>
            <span aria-hidden="true" className="mt-1 block h-[3px] w-[clamp(4rem,5.4vw,6.5rem)] rounded-full bg-brand-gradient-reverse" />
            <ContactForm />
          </div>

          <div
            data-reveal
            className="flex flex-col bg-brand-gradient-reverse px-[clamp(1.5rem,4.1vw,5rem)] py-[clamp(2.5rem,4.6vw,5.5rem)] text-white"
          >
            <div className="my-auto">
              <p className="max-w-[30em] text-[clamp(0.9375rem,1vw,1.1875rem)] leading-[1.6]">{visitUs.text}</p>

              <a
                href={visitUs.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative mt-[clamp(1.25rem,1.6vw,2rem)] block aspect-[516/214] overflow-hidden rounded-[clamp(0.5rem,0.6vw,0.75rem)] bg-white"
              >
                <span className="sr-only">Open our office in Google Maps (opens in a new tab)</span>
                <Image
                  src={contactMap}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 28vw, 90vw"
                  className="object-cover object-[50%_49%] transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-[8%] right-[3%] max-w-[45%] rounded-md bg-white px-2.5 py-1.5 text-[clamp(0.625rem,0.65vw,0.75rem)] leading-snug text-primary shadow-md"
                >
                  <strong className="block font-semibold text-crimson">{siteConfig.name}</strong>
                  {visitUs.mapLabel}
                </span>
              </a>

              <address className="mt-[clamp(1.25rem,1.6vw,2rem)] space-y-[clamp(0.75rem,1vw,1.1rem)] text-[clamp(0.9375rem,1vw,1.1875rem)] leading-snug not-italic">
                <p className="flex gap-3">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
                    <path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                  <span>{siteConfig.address}</span>
                </p>
                <p className="flex gap-3">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                  </svg>
                  <a href={`tel:${siteConfig.phone.tel}`} className="underline-offset-4 hover:underline">
                    {siteConfig.phone.display}
                  </a>
                </p>
                <p className="flex gap-3">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
                  </svg>
                  <a href={`mailto:${siteConfig.email}`} className="underline-offset-4 hover:underline">
                    {siteConfig.email}
                  </a>
                </p>
              </address>
            </div>

            {siteConfig.socialProfiles.length > 0 && (
              <ul aria-label="Social media" className="mt-[clamp(1.5rem,2vw,2.5rem)] flex justify-end gap-3">
                {siteConfig.socialProfiles.map((url) => {
                  const { name, icon } = socialOf(url);
                  return (
                    <li key={url}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="grid size-9 place-items-center rounded-full bg-white/15 transition-colors duration-300 hover:bg-white/30"
                      >
                        <span className="sr-only">{name} (opens in a new tab)</span>
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-[1.15rem]">
                          {icon}
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
