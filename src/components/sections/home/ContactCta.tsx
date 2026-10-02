import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { contactCta, siteConfig } from "@/lib/site";

// The design's two crimson glows (46rem across = a 23rem radius, as in the Figma export),
// centred with translate so the pulse animation can scale them.
const glow =
  "pointer-events-none absolute -z-10 size-[46rem] max-h-[160vw] max-w-[160vw] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,#64293c,transparent)] motion-safe:animate-glow-pulse";

// "Let's build the next thing you ship.": the closing call to action.
// Motion (all CSS except the scroll reveal, and all off for reduced motion): the label,
// both heading lines, the paragraph and the buttons rise in one after another; the orange →
// pink gradient slowly flows through the second line; the two glows pulse gently, out of step.
// The border sits outside the background (bg-clip-padding), so its line shows over the
// navy page, as in the design.
export function ContactCta() {
  return (
    <section
      aria-labelledby="cta-title"
      className="relative isolate overflow-hidden border-y border-white/15 bg-[#311f38] bg-clip-padding"
    >
      <div aria-hidden="true" className={`${glow} top-[20%] left-[8%]`} />
      {/* Half a cycle behind the first. Inline, because the animation shorthand in
          `animate-glow-pulse` would reset a delay class. */}
      <div aria-hidden="true" className={`${glow} top-[83%] left-[91%]`} style={{ animationDelay: "-3.5s" }} />

      <div className="container-site py-[clamp(4.5rem,6.25vw,7.5rem)]">
        <Reveal y={50} stagger={0.12} className="flex flex-col items-center text-center">
          <div data-reveal className="mb-6">
            <Eyebrow>Looking for a creative partner?</Eyebrow>
          </div>
          {/* Same type as SectionHeading size="lg"; each line is its own reveal step. */}
          <h2
            id="cta-title"
            className="font-display text-[clamp(2.5rem,4.25vw,5.125rem)] leading-[1.02] font-medium tracking-[-0.025em] text-white"
          >
            <span data-reveal className="block">
              Let&apos;s build the
            </span>
            <span data-reveal className="block">
              <span className="bg-[linear-gradient(90deg,#f15a29,#da1c5c,#f15a29)] bg-[length:200%_100%] bg-clip-text text-transparent motion-safe:animate-gradient-flow">
                next thing you ship.
              </span>
            </span>
          </h2>
          <p
            data-reveal
            className="mt-5 max-w-[37em] text-[clamp(0.9375rem,0.92vw,1.125rem)] leading-[1.7] text-light/75"
          >
            Tell us what you&apos;re working on. We&apos;ll come back within a working day with a
            starting point — no NDAs, no sales decks.
          </p>
          <div
            data-reveal
            className="mt-[clamp(1.75rem,2.1vw,2.5rem)] flex flex-wrap items-center justify-center gap-3.5"
          >
            <Magnetic>
              <Button href={contactCta.href} variant="primary-reverse" size="sm">
                Start a project
                <ArrowUpRightIcon className="size-[1em] transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
              </Button>
            </Magnetic>
            <Button href={`mailto:${siteConfig.email}`} variant="secondary" size="sm">
              {siteConfig.email}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
