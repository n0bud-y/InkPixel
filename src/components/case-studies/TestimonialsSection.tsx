import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CaseStudyTestimonialsSection } from "@/contentful/queries/case-studies";
import { CaseStudySectionFrame, CaseStudyTitle, cardTextClass, headingTone, type SectionTone } from "./CaseStudySection";

// "Hear Directly From Our Clients": the title and subtitle on the left, the quotes on the right.
// Only published testimonials reach this component (the page leaves the section out otherwise).
export function TestimonialsSection({
  id,
  tone,
  title,
  subtitle,
  testimonials,
}: Omit<CaseStudyTestimonialsSection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;

  return (
    <CaseStudySectionFrame
      headingId={headingId}
      tone={tone}
      className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[clamp(2rem,4vw,6rem)]"
    >
      <Reveal>
        <CaseStudyTitle centered={false}>
          <SectionHeading id={headingId} title={withAccent(title)} tone={headingTone(tone)} size="fluid-wide" />
        </CaseStudyTitle>
        {subtitle && (
          <p data-reveal className={`mt-4 font-display text-[clamp(1rem,1.15vw,1.375rem)] font-medium ${tone === "dark" ? "text-white" : "text-primary"}`}>
            {subtitle}
          </p>
        )}
      </Reveal>

      <Reveal y={30} delay={0.1}>
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <li key={`${testimonial.name}-${testimonial.quote.slice(0, 20)}`} data-reveal>
              <figure
                className={`flex h-full flex-col rounded-[1.25rem] bg-[#f9f9f9] px-[clamp(1.25rem,1.6vw,2rem)] py-[clamp(1.5rem,2vw,2.5rem)] ${tone === "light" ? "shadow-[0_10px_30px_-18px_rgb(21_25_54_/_0.35)] ring-1 ring-primary/10" : ""}`}
              >
                <span aria-hidden="true" className="bg-brand-gradient-reverse bg-clip-text font-display text-[clamp(2.75rem,3.4vw,4rem)] leading-[0.6] font-bold text-transparent">
                  &ldquo;
                </span>
                <blockquote className={`mt-4 flex-1 ${cardTextClass} text-primary/80`}>{testimonial.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  {testimonial.photo && (
                    <Image
                      src={testimonial.photo.url}
                      width={testimonial.photo.width}
                      height={testimonial.photo.height}
                      alt=""
                      unoptimized={testimonial.photo.isSvg}
                      sizes="3rem"
                      className="size-12 rounded-full object-cover"
                    />
                  )}
                  <span>
                    <span className="block font-semibold text-primary">{testimonial.name}</span>
                    {(testimonial.role || testimonial.company) && (
                      <span className="block text-sm text-primary/60">
                        {[testimonial.role, testimonial.company].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
