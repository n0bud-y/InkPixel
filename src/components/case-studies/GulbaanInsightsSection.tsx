import Image from "next/image";
import bgGrid from "@/assets/images/case-studies/gulban/background-white-check.webp";
import clientImage from "@/assets/images/case-studies/gulban/Insights-from-Client.webp";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GulbaanInsightsSection() {
  return (
    <section aria-labelledby="gulbaan-insights-title" className="relative isolate overflow-hidden bg-white py-8 sm:py-12 lg:py-14">
      {/* Background Grid Pattern */}
      <Image
        src={bgGrid}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-80"
      />

      <div className="container-site grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column - Copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <SectionHeading
              id="gulbaan-insights-title"
              title="Insights from Client"
              tone="onLight"
              size="fluid"
              description={[
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.",
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.",
              ]}
            />
          </Reveal>
        </div>

        {/* Right Column - Client Image Graphic */}
        <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
          <Reveal y={30} delay={0.15} className="w-full max-w-md lg:max-w-none flex justify-center lg:justify-end">
            <Image
              src={clientImage}
              alt="Gulbaan Client sitting with laptop"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="w-full h-auto object-contain"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
