import Image from "next/image";
import network from "@/assets/images/process-network.webp";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { drivesUs, founder } from "@/content/about";

// The card's 1px brand-gradient border around the network background.
const cardBorder = { background: "linear-gradient(#fff, #fff) padding-box, var(--gradient-reverse) border-box" };

// "What Drives Us Forward": heading, text, and button on the left; Mission, Vision, and Values
// on the right (one open at a time). Then the founder's card, whose photo rises above its top
// edge on desktop. Soft crimson glows behind, as in the design.
export function DrivesUs() {
  return (
    <section aria-labelledby="drives-title" className="relative isolate overflow-hidden bg-primary">
      <div aria-hidden="true" className="absolute -z-10 size-[27vw] rounded-full bg-brand-gradient opacity-25 blur-[8vw] max-lg:hidden" style={{ left: "-8vw", top: "10%" }} />
      <div aria-hidden="true" className="absolute -z-10 size-[27vw] rounded-full bg-brand-gradient opacity-25 blur-[8vw] max-lg:hidden" style={{ left: "-8vw", bottom: "-6%" }} />
      <div aria-hidden="true" className="absolute -z-10 size-[27vw] rounded-full bg-brand-gradient opacity-20 blur-[8vw] max-lg:hidden" style={{ right: "-8vw", top: "42%" }} />

      <div className="container-site py-[clamp(4rem,6.25vw,7.5rem)]">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-2 lg:gap-[clamp(2rem,6vw,8rem)]">
          <Reveal>
            <SectionHeading id="drives-title" title={withAccent(drivesUs.title)} description={drivesUs.text} descriptionTone="bright" />
            <div data-reveal className="mt-8">
              <Magnetic>
                <Button href={drivesUs.button.href} icon>
                  {drivesUs.button.label}
                </Button>
              </Magnetic>
            </div>
          </Reveal>
          <Reveal stagger={0.08}>
            <Accordion name="drives-us" items={drivesUs.items} tone="onDark" />
          </Reveal>
        </div>

        <Reveal y={50} className="mt-[clamp(4rem,12vw,14rem)]">
          <article
            aria-labelledby="founder-name"
            className="relative flex flex-col overflow-hidden rounded-[1.25rem] border border-transparent lg:min-h-[clamp(20rem,28.9vw,34.7rem)] lg:justify-center lg:overflow-visible"
            style={cardBorder}
          >
            <Image src={network} alt="" fill sizes="80vw" className="rounded-[1.2rem] object-cover" />
            <div className="relative px-[clamp(1.5rem,3.6vw,4.4rem)] pt-[clamp(2rem,3vw,3.5rem)] lg:w-[60%] lg:py-[clamp(2rem,3vw,3.5rem)]">
              <h2
                id="founder-name"
                className="w-fit bg-brand-gradient-reverse bg-clip-text font-display text-[clamp(2rem,2.7vw,3.25rem)] leading-tight font-bold tracking-[-0.02em] text-transparent"
              >
                {founder.name}
              </h2>
              <p className="mt-1 text-[clamp(1rem,1.05vw,1.25rem)] text-primary">{founder.role}</p>
              <p className="mt-4 text-[clamp(0.9375rem,1vw,1.1875rem)] leading-[1.85] text-primary/90">{founder.bio}</p>
            </div>
            {/* Phones and tablets: under the text, standing on the card's bottom edge. Desktop: on
                the right, rising above the card's top edge. */}
            <div className="relative mx-auto mt-6 w-[min(75%,22rem)] lg:absolute lg:right-[2.2%] lg:bottom-0 lg:mt-0 lg:w-[35.2%]">
              <Image
                src={founder.photo}
                alt={`${founder.name}, ${founder.role}`}
                sizes="(min-width: 1024px) 30vw, 75vw"
                className="h-auto w-full"
              />
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
