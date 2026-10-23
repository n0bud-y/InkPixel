import { Reveal } from "@/components/motion/Reveal";
import { visitUs } from "@/content/about";
import { ContactForm } from "./ContactForm";
import { ContactIcon, contactLines, OfficeMap, SocialLinks } from "./ContactDetails";

const iconClass = "mt-0.5 size-[1.25em] shrink-0";

// "Get in touch" (About, service pages, Services): one card, the form on white on the left, and on
// the gradient on the right a short line, the office map (a picture that opens Google Maps: no map
// scripts on the page), the address, phone, and email, then the social links (once siteConfig
// has any; ContactDetails). Phones and tablets: the form, then the details.
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

              {/* 3:2 fills the panel beside the form on desktop without making the card taller. */}
              <OfficeMap className="mt-[clamp(1.25rem,1.6vw,2rem)] aspect-[3/2]" />

              <address className="mt-[clamp(1.25rem,1.6vw,2rem)] space-y-[clamp(0.75rem,1vw,1.1rem)] text-[clamp(0.9375rem,1vw,1.1875rem)] leading-snug not-italic">
                {contactLines.map((line) => (
                  <p key={line.key} className="flex gap-3">
                    <ContactIcon icon={line.icon} className={iconClass} />
                    {/* The address is plain text here (the map above opens it). */}
                    {line.key === "address" ? (
                      <span>{line.text}</span>
                    ) : (
                      <a href={line.href} className="underline-offset-4 hover:underline">
                        {line.text}
                      </a>
                    )}
                  </p>
                ))}
              </address>
            </div>

            <SocialLinks className="mt-[clamp(1.5rem,2vw,2.5rem)] justify-end" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
