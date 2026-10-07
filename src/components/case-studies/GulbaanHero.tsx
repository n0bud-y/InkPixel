import Image from "next/image";
import { Caveat } from "next/font/google";
import gulbaanBanner from "@/assets/images/case-studies/gulban/gulban-case-banner.webp";
import { Reveal } from "@/components/motion/Reveal";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export function GulbaanHero() {
  return (
    <section aria-labelledby="gulbaan-hero-title" className="relative isolate overflow-hidden bg-white pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left Column - Copy */}
        <div className="lg:col-span-6 xl:col-span-5">
          <Reveal>
            {/* Script Title */}
            <h1
              id="gulbaan-hero-title"
              className={`${caveat.className} text-6xl sm:text-7xl lg:text-8xl text-[#151936] font-bold tracking-wide -ml-1`}
            >
              Gulbaan
            </h1>

            {/* Subheading / Key Feature line in Coral/Crimson */}
            <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.2] text-[#FA6143] sm:mt-6">
              A flower retail and delivery service offering fresh, premium flowers across Lahore and Islamabad.
            </h2>

            {/* Description Paragraph */}
            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600 sm:mt-6 max-w-xl">
              A flower retail and delivery service offering fresh, premium flowers across Lahore and Islamabad. So simply stop, smell the roses and shop your picks from our blooming collection of flowers!
            </p>
          </Reveal>
        </div>

        {/* Right Column - Desktop & Product Cards Graphic */}
        <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end">
          <Reveal y={40} delay={0.2} className="w-full max-w-2xl lg:max-w-none">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11]">
              <Image
                src={gulbaanBanner}
                alt="Gulbaan Flower Retail Website & Mobile Product Experience"
                fill
                priority
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-contain object-center lg:object-right"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
