import Image from "next/image";
import network from "@/assets/images/process-network.webp";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processOutcome, processSteps } from "@/content/home";
import { ProcessTimeline } from "./ProcessTimeline";

// "Our Process". On desktop the section locks to one screen while the timeline scrolls (see
// ProcessTimeline); the data-pinned classes below only apply once that is running.
export function Process() {
  return (
    <section  
      aria-labelledby="process-title"
      className="group/process relative isolate overflow-hidden bg-[#fffdfa] data-[pinned=true]:h-dvh"
    >
      {/* Off-white with a faint network pattern (baked in at the design's 12% opacity). */}
      <Image src={network} alt="" fill sizes="100vw" className="-z-10 object-cover" />

      {/* Top padding clears the fixed header while the section is locked to the screen. */}
      <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-12 py-[clamp(4rem,4.8vw,5.75rem)] lg:grid-cols-[minmax(0,590fr)_minmax(0,992fr)] lg:gap-x-[2.6vw] group-data-[pinned=true]/process:h-full group-data-[pinned=true]/process:grid-rows-[minmax(0,1fr)] group-data-[pinned=true]/process:pt-28 group-data-[pinned=true]/process:pb-[clamp(2rem,3vw,3.5rem)] 2xl:group-data-[pinned=true]/process:pt-36">
        {/* At the top of the long list; vertically centred beside the timeline window while locked. */}
        <Reveal className="self-start group-data-[pinned=true]/process:self-center">
          <SectionHeading
            id="process-title"
            eyebrow="03 · Process"
            eyebrowTone="brand"
            size="lg"
            tone="onLight"
            descriptionTone="bright"
            title="Our Process"
            description="Simple. Transparent. Operational. We build products that execute."
          />
          <div data-reveal className="mt-5 2xl:mt-4">
            <Magnetic>
              <Button href="/case-studies" variant="primary-reverse" icon>
                View All Projects
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        <ProcessTimeline steps={processSteps} outcome={processOutcome} />
      </div>
    </section>
  );
}
