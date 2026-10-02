import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faq";
import { siteConfig } from "@/lib/site";

// "Common questions.": heading and an email prompt on the left, the questions on the right.
export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="relative isolate bg-[#fffdfa]">
      <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-10 pt-[clamp(3.5rem,3.7vw,4.5rem)] pb-[clamp(3.5rem,3.6vw,4.4rem)] lg:grid-cols-[minmax(0,646fr)_minmax(0,951fr)] lg:gap-x-[1.8vw]">
        <Reveal className="self-start">
          <div data-reveal className="mb-7">
            <Eyebrow tone="light">08 · FAQ</Eyebrow>
          </div>
          <SectionHeading
            id="faq-title"
            size="lg"
            tone="onLight"
            title={
              <>
                Common <br />
                questions.
              </>
            }
          />
          {/* The link is underlined: its colour alone is too close to the text's to stand out. */}
          <p
            data-reveal
            className="mt-6 max-w-[34em] text-[clamp(1rem,1.25vw,1.5rem)] leading-[1.8] text-primary"
          >
            Don&apos;t see yours? Email us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-crimson underline decoration-crimson/30 underline-offset-4 transition-colors duration-300 hover:decoration-crimson"
            >
              {siteConfig.email}
            </a>{" "}
            — we reply within a working day.
          </p>
        </Reveal>

        <Reveal stagger={0.08}>
          <Accordion name="faq" items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
