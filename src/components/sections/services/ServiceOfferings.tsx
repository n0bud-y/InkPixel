import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServicePage } from "@/content/service-pages";
import { OfferingsList } from "./OfferingsList";

// "… Services for …": title, text, and button on the left, the offerings on the right. On
// desktop the section locks to one screen while the list scrolls (see OfferingsList); the
// data-pinned classes below only apply once that is running.
export function ServiceOfferings({ page }: { page: ServicePage }) {
  const { offerings } = page;

  return (
    <section
      aria-labelledby="offerings-title"
      className="group/offer relative isolate bg-[#f8f8fb] data-[pinned=true]:h-dvh"
    >
      {/* Top padding clears the fixed header while the section is locked to the screen. */}
      <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-12 py-[clamp(4rem,4.2vw,5rem)] lg:grid-cols-[minmax(0,713fr)_minmax(0,820fr)] lg:gap-x-[clamp(2rem,4.2vw,5rem)] group-data-[pinned=true]/offer:h-full group-data-[pinned=true]/offer:grid-rows-[minmax(0,1fr)] group-data-[pinned=true]/offer:pt-28 group-data-[pinned=true]/offer:pb-[clamp(2rem,3vw,3.5rem)] 2xl:group-data-[pinned=true]/offer:pt-36">
        <Reveal className="self-start">
          <SectionHeading
            id="offerings-title"
            tone="onLight"
            descriptionTone="bright"
            title={withAccent(offerings.title)}
            description={offerings.text}
          />
          <div data-reveal className="mt-8 2xl:mt-10">
            <Magnetic>
              <Button href={offerings.button.href} icon>
                {offerings.button.label}
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        <OfferingsList items={offerings.items} />
      </div>
    </section>
  );
}
