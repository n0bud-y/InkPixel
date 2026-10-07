import Image from "next/image";
import featuresImage from "@/assets/images/case-studies/gulban/Platform-Features.png";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const featuresList = [
  "Product Catalog",
  "Payment Gateways",
  "Store locator",
  "Purchase online or pick up from an outlet",
  "Newsletters",
  "In-app wallet with points",
];

export function GulbaanPlatformFeaturesSection() {
  return (
    <section aria-labelledby="gulbaan-features-title" className="relative isolate bg-primary py-16 sm:py-24 lg:py-28 text-light overflow-hidden">
      <div className="container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column - Desktop & Modals Graphic */}
        <div className="lg:col-span-6 flex justify-center">
          <Reveal y={30} className="w-full">
            <div className="relative w-full aspect-[16/11] sm:aspect-[16/10]">
              <Image
                src={featuresImage}
                alt="Gulbaan Platform Features - Product Catalog & Custom Request Modals"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain object-center"
              />
            </div>
          </Reveal>
        </div>

        {/* Right Column - Title, Description & Feature List */}
        <div className="lg:col-span-6">
          <Reveal delay={0.15}>
            <SectionHeading
              id="gulbaan-features-title"
              title="Platform Features"
              tone="onDark"
              size="fluid"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            />

            <ul className="mt-8 space-y-3.5">
              {featuresList.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-base sm:text-lg text-light/90 font-medium">
                  <span className="inline-flex items-center justify-center size-5 rounded-full border-2 border-[#FA6143] shrink-0">
                    <span className="size-2 rounded-full bg-[#FA6143]" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
