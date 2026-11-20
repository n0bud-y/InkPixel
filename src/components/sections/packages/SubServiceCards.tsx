import Link from "next/link";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyHeading, CaseStudySectionFrame } from "@/components/case-studies/CaseStudySection";
import type { ServicePackages } from "@/content/packages";
import type { ServiceCategory } from "@/content/services";

// The icon, painted in the brand gradient through its shape (as in the header's Services menu).
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

// The site's one-line list for a sub-service (e.g. "Primary logo, secondary logo, icon/mark…"),
// as up to four bullets.
const bulletsOf = (description: string) =>
  description
    .replace(/\.$/, "")
    .split(/,\s+/)
    .slice(0, 4)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1));

// "What Each Sub-service Includes": one card per sub-service with its icon, the site's summary,
// up to four bullets (from its description), which packages include it, and a link to its page.
export function SubServiceCards({ data, category }: { data: ServicePackages; category: ServiceCategory }) {
  const headingId = "sub-services-title";
  return (
    <CaseStudySectionFrame headingId={headingId} tone="light">
      <Reveal>
        <CaseStudyHeading
          id={headingId}
          tone="light"
          eyebrow="What's Inside"
          title={`What Each ${category.label} *Service* Includes`}
          intro="The six services the packages are built from, and which packages include each one."
          centered
        />
      </Reveal>
      <Reveal y={40} stagger={0.07} className="mt-[clamp(2.5rem,3.4vw,4rem)]">
        <ul className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2 xl:grid-cols-3">
          {category.services.map((service) => {
            const slug = service.href.split("/").pop() ?? "";
            const inPackages = data.packages.flatMap((pkg, index) => (pkg.includedSubServices.includes(slug) ? [index + 1] : []));
            return (
              <li
                key={service.href}
                data-reveal
                className="group flex flex-col rounded-[1.25rem] border border-primary/10 bg-white p-[clamp(1.25rem,1.6vw,1.75rem)] shadow-[0_20px_50px_-35px_rgb(21_25_54_/_0.5)] transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-crimson/30 hover:shadow-[0_30px_60px_-30px_rgb(201_29_76_/_0.4)]"
              >
                <div className="flex items-center gap-3.5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/[0.04] ring-1 ring-primary/[0.07]">
                    <span aria-hidden="true" className="block size-7 bg-brand-gradient-reverse transition-transform duration-300 group-hover:scale-110" style={maskOf(service.icon.src)} />
                  </span>
                  <h3 className="font-display text-[clamp(1.0625rem,1.2vw,1.375rem)] leading-tight font-semibold text-primary">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-primary/70">{service.summary}</p>
                <ul className="mt-4 space-y-1.5">
                  {bulletsOf(service.description).map((item) => (
                    <li key={item} className="flex gap-2.5 text-[14.5px] text-primary/80">
                      <span aria-hidden="true" className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-crimson" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                  <p className="rounded-full bg-crimson/10 px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.08em] text-crimson">
                    {inPackages.length === 4
                      ? "In all packages"
                      : inPackages.length
                        ? `In package${inPackages.length > 1 ? "s" : ""} ${inPackages.join(", ")}`
                        : "On request"}
                  </p>
                  <Link
                    href={service.href}
                    className="text-[14px] font-medium text-primary underline decoration-primary/25 underline-offset-4 transition-colors hover:text-crimson hover:decoration-crimson"
                  >
                    More about it<span className="sr-only">: {service.title}</span> →
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
