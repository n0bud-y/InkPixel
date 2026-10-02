import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceCategories } from "@/content/services";
import { ServiceTabs } from "./ServiceTabs";

export function ServicesShowcase() {
  return (
    <section
      aria-labelledby="services-title"
      className="relative isolate overflow-hidden bg-primary bg-grid"
    >
      {/* Soft glow at the bottom of the section. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[34%] -z-10 h-[45rem] w-[70rem] max-w-[140vw] -translate-x-1/2 translate-y-1/2 bg-[radial-gradient(closest-side,rgb(88_96_190_/_0.35),transparent)]"
      />

      <div className="container-site py-[clamp(4rem,5.4vw,6.5rem)]">
        <Reveal>
          <SectionHeading
            id="services-title"
            align="center"
            title={
              <>
                Building The Future of
                <br className="max-sm:hidden" /> Digital Products
              </>
            }
            description="From startups finding product-market fit to enterprises modernizing at scale, we engineer digital products that perform in the market."
          />  
        </Reveal>

        <Reveal y={60} start="top 80%" className="mt-[clamp(2.5rem,3.1vw,3.75rem)]">
          <ServiceTabs categories={serviceCategories} />
        </Reveal>
      </div>
    </section>
  );
}
