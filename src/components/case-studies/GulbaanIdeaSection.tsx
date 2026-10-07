import Image from "next/image";
import ideaImage from "@/assets/images/case-studies/gulban/The-Idea-Behind-Gulbaan.webp";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function GulbaanIdeaSection() {
  return (
    <section aria-labelledby="gulbaan-idea-title" className="relative isolate bg-primary py-16 sm:py-24 lg:py-32 text-light overflow-hidden">
      <div className="container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column - Laptop Mockup Image */}
        <div className="lg:col-span-6 xl:col-span-6 flex justify-center">
          <Reveal y={40} className="w-full">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9]">
              <Image
                src={ideaImage}
                alt="The Idea Behind Gulbaan Laptop Mockup"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-contain object-center"
              />
            </div>
          </Reveal>
        </div>

        {/* Right Column - Text Content */}
        <div className="lg:col-span-6 xl:col-span-6">
          <Reveal delay={0.15}>
            <SectionHeading
              id="gulbaan-idea-title"
              title="The Idea Behind Gulbaan"
              tone="onDark"
              size="fluid"
              description={[
                "We were responsible for refining the eCommerce presence of Al Hussaini Trading Company by evaluating their digital presence and presenting a full-fledged alternative from scratch that comprised of building a more connected omnichannel interface.",
                "The idea of an omnichannel eCommerce solution is to provide customers with a unified experience across different channels - whether it be phone, desktop, or a visit to one of the 40+ Al Hussaini Trading Company outlets across the Kingdom",
              ]}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
