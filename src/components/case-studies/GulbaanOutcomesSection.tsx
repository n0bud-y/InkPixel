import Image from "next/image";
import bgGrid from "@/assets/images/case-studies/gulban/background-white-check.webp";
import outcomesImage from "@/assets/images/case-studies/gulban/The-Outcomes.webp";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GulbaanOutcomesSection() {
  return (
    <section aria-labelledby="gulbaan-outcomes-title" className="relative isolate overflow-hidden bg-white py-16 sm:py-14 lg:py-28">
      {/* Background Grid Pattern */}
      <Image
        src={bgGrid}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-80"
      />

      <div className="container-site flex flex-col items-center">
        {/* Top Header & Copy */}
        <Reveal className="w-full text-center [&_p]:max-w-none">
          <SectionHeading
            id="gulbaan-outcomes-title"
            title="The Outcomes"
            align="center"
            tone="onLight"
            size="fluid"
            description={[
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.",
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London.",
            ]}
          />
        </Reveal>

        {/* Perspective Fan Screens Image Graphic */}
        <Reveal y={40} delay={0.15} className="mt-10 sm:mt-12 lg:mt-14 w-full flex justify-center">
          <Image
            src={outcomesImage}
            alt="Gulbaan Platform Outcomes - Multi-screen Experience Showcase"
            sizes="(min-width: 1024px) 85vw, 100vw"
            className="w-full h-auto max-w-6xl object-contain drop-shadow-md"
          />
        </Reveal>
      </div>
    </section>
  );
}
