import Image from "next/image";
import bgGrid from "@/assets/images/case-studies/gulban/background-white-check.webp";
import bouquetImage from "@/assets/images/case-studies/gulban/Challenges-&-Solutions.webp";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GulbaanChallengesSection() {
  return (
    <section aria-labelledby="gulbaan-challenges-title" className="relative isolate overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
      {/* Background Grid Pattern */}
      <Image
        src={bgGrid}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-center opacity-80"
      />

      <div className="container-site grid grid-cols-1 items-center gap-8 lg:grid-cols-12 ">
        {/* Left Column - Copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal>
            <SectionHeading
              id="gulbaan-challenges-title"
              title="Challenges & Solutions"
              tone="onLight"
              size="fluid"
              description={[
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's.",
                "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
                "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
              ]}
            />
          </Reveal>
        </div>

        {/* Right Column - Bouquet Image Graphic */}
        <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
          <Reveal y={30} delay={0.15} className="w-full max-w-md lg:max-w-none flex justify-center lg:justify-end">
            <Image
              src={bouquetImage}
              alt="Fresh flower bouquet representing Gulbaan retail collection"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="w-full h-auto max-h-[550px] sm:max-h-[600px] lg:max-h-[640px] object-contain drop-shadow-xl"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
