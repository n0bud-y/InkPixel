"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BrandingPage } from "@/content/branding-page";

// "Branding Services", on navy: the six services as cards (icon, name, description), three to a
// row on desktop. One card is filled with the brand gradient: the first, or the one under the
// pointer. The icons are the mega menu's, painted with a CSS mask (gradient, or white on the
// filled card).
export function BrandingServices({ services }: { services: BrandingPage["services"] }) {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="branding-services-title" className="bg-primary">
      <div className="container-site py-[clamp(4rem,6.25vw,7.5rem)]">
        <Reveal>
          <SectionHeading
            id="branding-services-title"
            align="center"
            size="lg"
            title={services.title}
            description={services.text}
            className="[&_p]:mx-auto [&_p]:max-w-[22em]"
          />
        </Reveal>

        <Reveal y={50} stagger={0.08} className="mx-auto mt-[clamp(2.5rem,2.6vw,3.2rem)] max-w-[94.2rem]">
          <ul
            onMouseLeave={() => setActive(0)}
            className="grid grid-cols-[minmax(0,1fr)] gap-x-[clamp(1rem,2.56vw,3.1rem)] gap-y-[clamp(1rem,2.86vw,3.45rem)] sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.items.map((service, index) => {
              const lit = index === active;
              return (
                <li
                  key={service.title}
                  data-reveal
                  onMouseEnter={() => setActive(index)}
                  className={[
                    "flex flex-col items-center rounded-[clamp(1rem,1.25vw,1.5rem)] px-[clamp(1.25rem,2.4vw,2.9rem)] pt-[clamp(2rem,3.57vw,4.3rem)] pb-[clamp(2rem,2.6vw,3rem)] text-center transition-[background-color,box-shadow] duration-300 ease-out lg:min-h-[clamp(20rem,22.2vw,26.7rem)]",
                    lit
                      ? "bg-brand-gradient-reverse text-white shadow-[0_24px_50px_-24px_rgb(201_29_76_/_0.9)]"
                      : "bg-white text-primary ring-1 ring-crimson/50",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={`block size-[clamp(5rem,8.15vw,9.8rem)] ${lit ? "bg-white" : "bg-brand-gradient-reverse"}`}
                    style={{
                      maskImage: `url(${service.icon.src})`,
                      maskSize: "contain",
                      maskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskImage: `url(${service.icon.src})`,
                      WebkitMaskSize: "contain",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                    }}
                  />
                  <h3 className="mt-[clamp(1.25rem,2vw,2.4rem)] font-display text-[clamp(1.25rem,1.67vw,2rem)] leading-tight font-bold tracking-[-0.01em]">
                    {service.title}
                  </h3>
                  <p
                    className={`mt-2 max-w-[22em] text-[clamp(0.875rem,0.95vw,1.125rem)] leading-[1.45] ${lit ? "text-white/90" : "text-primary/70"}`}
                  >
                    {service.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
