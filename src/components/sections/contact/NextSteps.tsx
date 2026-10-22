import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactPage } from "@/content/contact-page";

// "What Happens Next": three numbered steps after a visitor gets in touch, on navy with the grid,
// in a row on desktop (joined by a faint line through the numbers), stacked on phones.
export function NextSteps() {
  const { steps } = contactPage;
  return (
    <section aria-labelledby="next-steps-title" className="relative isolate overflow-hidden bg-primary bg-grid">
      <div className="container-site pt-[clamp(1rem,2vw,2.5rem)] pb-[clamp(4rem,6.25vw,7.5rem)]">
        <Reveal className="text-center">
          <SectionHeading id="next-steps-title" align="center" title={withAccent(steps.title)} description={steps.intro} />
        </Reveal>

        <Reveal stagger={0.12} className="relative mt-[clamp(2.5rem,3.6vw,4.25rem)]">
          <span
            aria-hidden="true"
            className="absolute top-[clamp(1.5rem,1.7vw,2rem)] right-[16.7%] left-[16.7%] hidden h-px bg-linear-to-r from-crimson/0 via-crimson/60 to-coral/0 md:block"
          />
          <ol className="relative grid grid-cols-[minmax(0,1fr)] gap-[clamp(1.25rem,2vw,2.5rem)] md:grid-cols-3">
            {steps.items.map((step, index) => (
              <li key={step.title} data-reveal className="flex flex-col items-center text-center">
                <span
                  aria-hidden="true"
                  className="grid size-[clamp(3rem,3.4vw,4rem)] place-items-center rounded-full bg-brand-gradient font-mono text-[clamp(0.875rem,0.95vw,1.125rem)] font-medium text-white shadow-[0_12px_32px_-10px_rgb(201_29_76_/_0.75)] ring-8 ring-primary"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-[clamp(1.25rem,1.5vw,1.75rem)] font-display text-[clamp(1.25rem,1.45vw,1.75rem)] leading-tight font-medium text-white">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-[24em] text-[clamp(0.9375rem,0.95vw,1.125rem)] leading-[1.75] text-light/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
