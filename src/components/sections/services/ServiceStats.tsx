import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import type { ServicePage } from "@/content/service-pages";

// The service's numbers on navy: a gradient icon (the design's black glyph used as a CSS mask
// over the brand gradient), the counting value, and its label. Two per row on phones.
export function ServiceStats({ page }: { page: ServicePage }) {
  return (
    <section aria-label={`${page.name} in numbers`} className="bg-primary">
      <Reveal stagger={0.1} className="container-site py-[clamp(3rem,4.7vw,5.6rem)]">
        {/* Label before value in the markup (required by <dl>); shown value-first. */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:flex lg:justify-between lg:px-[1.5vw] xl:pr-[9vw]">
          {page.stats.map((stat, index) => {
            // CountUp counts whole numbers, so a rating like 4.8 counts its whole part with the
            // decimals as part of the suffix.
            const [whole, fraction] = stat.value.toFixed(stat.decimals ?? 0).split(".");
            return (
              <div key={stat.label} data-reveal className="flex items-center gap-[clamp(0.75rem,1.1vw,1.25rem)]">
                <span
                  aria-hidden="true"
                  className="block size-[clamp(2.75rem,4.6vw,5.5rem)] shrink-0 bg-brand-gradient-reverse"
                  style={{
                    maskImage: `url(${stat.icon.src})`,
                    maskSize: "contain",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    WebkitMaskImage: `url(${stat.icon.src})`,
                    WebkitMaskSize: "contain",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                  }}
                />
                <div className="flex flex-col-reverse">
                  <dt className="mt-1 text-[clamp(0.8125rem,1vw,1.1875rem)] text-white/90">{stat.label}</dt>
                  <dd className="font-display text-[clamp(1.75rem,3.2vw,3.85rem)] leading-none font-bold whitespace-nowrap text-white">
                    <CountUp value={Number(whole)} suffix={`${fraction ? `.${fraction}` : ""}${stat.suffix}`} delay={index * 150} />
                  </dd>
                </div>
              </div>
            );
          })}
        </dl>
      </Reveal>
    </section>
  );
}
