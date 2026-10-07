import Image from "next/image";
import whatWeDidImage from "@/assets/images/case-studies/gulban/What-Did We-Do.webp";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GulbaanWhatWeDidSection() {
  return (
    <section aria-labelledby="gulbaan-what-we-did-title" className="relative isolate bg-primary py-16 sm:py-24 lg:py-28 text-light overflow-hidden">
      {/* Soft Ambient Radial Glows matching screenshot */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_100%_0%,rgba(201,29,76,0.22),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(201,29,76,0.18),transparent_50%)]"
      />

      <div className="container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column - Desktop Monitor Image */}
        <div className="lg:col-span-6 xl:col-span-6 flex justify-center">
          <Reveal y={30} className="w-full flex justify-center">
            <Image
              src={whatWeDidImage}
              alt="Gulbaan Full Website Layout Displayed on Monitor"
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="w-full h-auto max-h-[480px] sm:max-h-[580px] lg:max-h-[660px] xl:max-h-[720px] object-contain"
            />
          </Reveal>
        </div>

        {/* Right Column - Title & Narrative Copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal delay={0.15}>
            <SectionHeading
              id="gulbaan-what-we-did-title"
              title="What Did We Do?"
              tone="onDark"
              size="fluid"
              description={[
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London.",
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley.",
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
