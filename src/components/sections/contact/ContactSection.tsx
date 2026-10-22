import { Reveal } from "@/components/motion/Reveal";
import { ContactIcon, contactLines, OfficeMap, SocialLinks } from "@/components/sections/about/ContactDetails";
import { visitUs } from "@/content/about";
import { contactPage } from "@/content/contact-page";
import { ProjectForm, type Estimator, type ServiceChoice } from "./ProjectForm";

// The Contact page's card, like "Get in touch" (VisitUs) but with more room for the form: the
// form on white (about 60% on desktop), and on the gradient the reply-time badge, a short line,
// the office map, then the address, phone, and email as tappable rows, and the social links
// (ContactDetails). Phones and tablets: the form, then the details.
export function ContactSection({ services, estimators }: { services: ServiceChoice[]; estimators: Record<string, Estimator> }) {
  return (
    <section aria-labelledby="contact-form-title" className="bg-primary">
      <div className="container-site pt-[clamp(2.5rem,4vw,4.5rem)] pb-[clamp(4rem,6.25vw,7.5rem)]">
        <Reveal
          stagger={0.12}
          className="mx-auto grid max-w-[85rem] grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[clamp(1rem,1.6vw,1.9rem)] shadow-[0_30px_80px_-40px_rgb(0_0_0_/_0.8)] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
        >
          <div data-reveal className="bg-white px-[clamp(1.25rem,3.6vw,4.5rem)] py-[clamp(2rem,4vw,4.75rem)]">
            <h2
              id="contact-form-title"
              className="w-fit bg-brand-gradient-reverse bg-clip-text font-display text-[clamp(2rem,2.9vw,3.5rem)] leading-tight font-medium tracking-[-0.02em] text-transparent"
            >
              {contactPage.form.title}
            </h2>
            <span aria-hidden="true" className="mt-1 block h-[3px] w-[clamp(4rem,5.4vw,6.5rem)] rounded-full bg-brand-gradient-reverse" />
            <ProjectForm services={services} estimators={estimators} />
          </div>

          <div
            data-reveal
            className="flex flex-col bg-brand-gradient-reverse px-[clamp(1.25rem,3vw,3.75rem)] py-[clamp(2rem,4vw,4.75rem)] text-white"
          >
            <p className="flex w-fit items-center gap-2 rounded-full bg-white/15 px-3.5 py-2 text-[13px] font-medium ring-1 ring-white/20">
              <span aria-hidden="true" className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-white/70 motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-white" />
              </span>
              {contactPage.details.badge}
            </p>

            <p className="mt-[clamp(1.25rem,1.6vw,2rem)] max-w-[30em] text-[clamp(0.9375rem,1vw,1.1875rem)] leading-[1.6]">{visitUs.text}</p>

            <OfficeMap className="mt-[clamp(1.25rem,1.6vw,2rem)]" />

            <address className="mt-[clamp(1.25rem,1.6vw,2rem)] flex flex-col gap-2.5 not-italic">
              {contactLines.map((line) => (
                <a
                  key={line.key}
                  href={line.href}
                  {...(line.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl bg-white/10 p-3 pr-4 ring-1 ring-white/10 transition duration-200 hover:bg-white/20"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-crimson shadow-[0_8px_20px_-10px_rgb(0_0_0_/_0.5)]">
                    <ContactIcon icon={line.icon} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-semibold tracking-[0.12em] text-white/75 uppercase">{line.label}</span>
                    <span className="mt-0.5 block text-[clamp(0.9375rem,0.95vw,1.0625rem)] leading-snug break-words">{line.text}</span>
                    {line.external && <span className="sr-only"> (opens Google Maps in a new tab)</span>}
                  </span>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto size-4 shrink-0 opacity-60 transition duration-200 group-hover:translate-x-0.5 group-hover:opacity-100">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              ))}
            </address>

            <SocialLinks className="mt-auto justify-end pt-[clamp(1.5rem,2vw,2.5rem)]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
