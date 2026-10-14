import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/content/faq";
import { siteConfig } from "@/lib/site";
import { FaqTimeline } from "./FaqTimeline";

// "Common questions.": heading and an email prompt on the left, the questions on the right as
// a timeline, like "Our Process". On desktop the section locks to one screen while the scroll
// walks through the questions (see FaqTimeline); the data-pinned classes below only apply once
// that is running. The eyebrow numbers the section on its page (home, About, service pages).
export function Faq({ eyebrow = "08 · FAQ" }: { eyebrow?: string }) {
  return (
    <section
      aria-labelledby="faq-title"
      className="group/faq relative isolate overflow-hidden bg-[#fffdfa] data-[pinned=true]:h-dvh"
    >
      {/* Top padding clears the fixed header while the section is locked to the screen. */}
      <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-10 pt-[clamp(3.5rem,3.7vw,4.5rem)] pb-[clamp(3.5rem,3.6vw,4.4rem)] lg:grid-cols-[minmax(0,646fr)_minmax(0,951fr)] lg:gap-x-[1.8vw] group-data-[pinned=true]/faq:h-full group-data-[pinned=true]/faq:grid-rows-[minmax(0,1fr)] group-data-[pinned=true]/faq:pt-28 group-data-[pinned=true]/faq:pb-[clamp(2rem,3vw,3.5rem)] 2xl:group-data-[pinned=true]/faq:pt-36">
        {/* At the top of the list; vertically centred beside the list's window while locked. */}
        <Reveal className="self-start group-data-[pinned=true]/faq:self-center">
          <div data-reveal className="mb-7">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
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

        <FaqTimeline name="faq" items={faqs} />
      </div>
    </section>
  );
}
