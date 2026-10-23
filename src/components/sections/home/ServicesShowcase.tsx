import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceCategories } from "@/content/services";
import { withShowcaseIcons } from "@/content/showcase-icons";
import { ServiceTabs } from "./ServiceTabs";

// The tabs show the previous, more detailed icons (showcase-icons.ts), not the menu's.
const categories = serviceCategories.map((category) => ({ ...category, services: withShowcaseIcons(category.services) }));

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
                Technology Solutions Designed
                <br className="max-sm:hidden" /> Around Your Business
              </>
            }
            description="From developing mobile apps, creating custom software solutions, advancing artificial intelligence, building cloud-based systems, designing blockchain-based architectures, or driving user experience, every solution we create brings our expertise in strategy, technology, and creativity to bear, addressing real business problems, enhancing user experiences, and enabling faster sustainable growth."
          />  
        </Reveal>

        <Reveal y={60} start="top 80%" className="mt-[clamp(2.5rem,3.1vw,3.75rem)]">
          <ServiceTabs categories={categories} />
        </Reveal>
      </div>
    </section>
  );
}
