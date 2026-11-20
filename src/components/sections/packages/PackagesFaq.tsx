import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { CaseStudyHeading, CaseStudySectionFrame } from "@/components/case-studies/CaseStudySection";

// The packages' questions, in the site's accordion (built on <details>, so it works with the
// keyboard and without JavaScript), on light, the first one open.
export function PackagesFaq({ name, items }: { name: string; items: { question: string; answer: string[] }[] }) {
  const headingId = "packages-faq-title";
  return (
    <CaseStudySectionFrame headingId={headingId} tone="light">
      <div className="mx-auto max-w-[56rem]">
        <Reveal>
          <CaseStudyHeading id={headingId} tone="light" eyebrow="FAQ" title="Questions About the *Packages*" centered />
        </Reveal>
        <Reveal className="mt-[clamp(2rem,3vw,3.5rem)]">
          <Accordion items={items} name={name} tone="onLight" />
        </Reveal>
      </div>
    </CaseStudySectionFrame>
  );
}
