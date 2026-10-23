import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { domains } from "@/content/service-pages";

// An icon as a shape filled with the brand gradient (CSS mask), so the mixed icon styles read as
// one set (as in the mega menus).
const maskOf = (src: string): CSSProperties => ({
  maskImage: `url(${src})`,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskImage: `url(${src})`,
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
});

// "Our Domain Diversity": the industries the studio works in (src/content/service-pages.ts), on
// white with the light grid. Each is a small card: the icon in the brand gradient on a soft
// tile, and the name; hovering lifts the card and turns its border crimson. Five to a row on
// desktop, three on tablets; on phones two compact chips (icon beside the name) to a row, the odd
// last one centred.
export function DomainDiversity() {
  return (
    <section aria-labelledby="domains-title" className="bg-white bg-grid-light">
      <div className="container-site py-[clamp(4rem,5.6vw,6.75rem)]">
        <Reveal className="text-center">
          <SectionHeading
            id="domains-title"
            tone="onLight"
            align="center"
            eyebrow="07 · Industries"
            eyebrowTone="brand"
            title="Our Domain Diversity"
            description={`From online stores to public services, we’ve built for teams across ${domains.length} industries.`}
            className="[&_p]:mx-auto"
          />
        </Reveal>
        <Reveal stagger={0.035} className="mx-auto mt-[clamp(2.25rem,3.6vw,4rem)] max-w-[84rem]">
          <ul className="grid grid-cols-2 gap-[clamp(0.625rem,1.2vw,1.25rem)] sm:grid-cols-3 lg:grid-cols-5">
            {domains.map((domain) => (
              <li
                key={domain.label}
                data-reveal
                className="group flex items-center gap-3 rounded-2xl border border-primary/[0.08] bg-white p-3 shadow-[0_18px_40px_-28px_rgb(21_25_54_/_0.35)] transition-[border-color,box-shadow,translate] duration-300 ease-out last:odd:col-span-2 last:odd:mx-auto last:odd:w-[calc(50%-0.3125rem)] hover:border-crimson/40 hover:shadow-[0_24px_44px_-26px_rgb(201_29_76_/_0.45)] motion-safe:hover:-translate-y-1 sm:flex-col sm:gap-[clamp(0.75rem,1vw,1rem)] sm:p-[clamp(1.25rem,1.6vw,1.75rem)] sm:text-center sm:last:odd:col-span-1 sm:last:odd:mx-0 sm:last:odd:w-auto"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-crimson/[0.06] ring-1 ring-crimson/10 transition-colors duration-300 group-hover:bg-crimson/10 sm:size-[clamp(3.5rem,4vw,4.5rem)] sm:rounded-2xl">
                  <span aria-hidden="true" className="block size-6 bg-brand-gradient-reverse sm:size-[55%]" style={maskOf(domain.icon.src)} />
                </span>
                <span className="text-[clamp(0.875rem,1vw,1.125rem)] leading-snug font-medium text-primary">{domain.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
