import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CaseStudyHeading, CaseStudySectionFrame } from "@/components/case-studies/CaseStudySection";
import { billingLabel, packageContactLink, priceLabel, type ServicePackages } from "@/content/packages";
import type { Service } from "@/content/services";

function Check({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`mt-[0.3em] size-[0.95em] shrink-0 ${className}`}>
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The four packages side by side (two on tablets, stacked on phones), equal height. Package 3 is
// "Most popular" (gradient border and badge); package 4 is navy ("Custom quote"). Each shows its
// number, name, tagline, price and billing, who it suits, its sub-services as chips, "Everything
// in <previous>, plus:" for 2–4, the deliverables, timeline / revisions / support, and a button.
export function PackageCards({ data, subServices }: { data: ServicePackages; subServices: Map<string, Service> }) {
  const headingId = "packages-title";
  return (
    <CaseStudySectionFrame headingId={headingId} tone="light">
      <Reveal>
        <CaseStudyHeading
          id={headingId}
          tone="light"
          eyebrow="The Packages"
          title="Four Packages, Each Building on the *Last*"
          intro={data.billingNote}
          centered
        />
      </Reveal>
      <Reveal y={40} stagger={0.08} className="mt-[clamp(2.5rem,3.6vw,4.4rem)]">
        <ol className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-4 2xl:gap-6">
          {data.packages.map((pkg, index) => {
            const previous = index > 0 ? data.packages[index - 1] : null;
            const dark = Boolean(pkg.custom);
            const muted = dark ? "text-light/75" : "text-primary/70";
            return (
              <li
                key={pkg.slug}
                id={`package-${pkg.slug}`}
                data-reveal
                className={[
                  "relative flex flex-col rounded-[1.4rem] border p-[clamp(1.25rem,1.5vw,1.75rem)] transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1",
                  dark
                    ? "border-white/10 bg-primary text-white shadow-[0_30px_60px_-30px_rgb(21_25_54_/_0.8)]"
                    : pkg.popular
                      ? "border-transparent bg-white text-primary shadow-[0_30px_70px_-30px_rgb(201_29_76_/_0.55)]"
                      : "border-primary/10 bg-white text-primary shadow-[0_20px_50px_-35px_rgb(21_25_54_/_0.5)] hover:shadow-[0_30px_60px_-30px_rgb(21_25_54_/_0.45)]",
                ].join(" ")}
                style={pkg.popular ? { background: "linear-gradient(#fff, #fff) padding-box, var(--gradient-reverse) border-box", borderWidth: 2 } : undefined}
              >
                {pkg.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient-reverse px-4 py-1.5 font-mono text-[11px] font-medium tracking-[0.16em] whitespace-nowrap text-white uppercase shadow-[0_10px_24px_-10px_rgb(250_97_67_/_0.8)]">
                    Most popular
                  </span>
                )}
                <p className={`font-mono text-[12px] tracking-[0.18em] ${dark ? "text-coral" : "text-crimson"}`}>
                  {String(index + 1).padStart(2, "0")} · PACKAGE
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.375rem,1.6vw,1.875rem)] leading-tight font-semibold">{pkg.name}</h3>
                <p className={`mt-1.5 text-[15px] leading-snug ${muted}`}>{pkg.tagline}</p>

                <div className={`mt-5 border-y py-4 ${dark ? "border-white/10" : "border-primary/10"}`}>
                  <p className="font-display text-[clamp(1.5rem,1.9vw,2.25rem)] leading-none font-bold tracking-[-0.02em]">
                    <span className={pkg.price == null && !dark ? "bg-brand-gradient-reverse bg-clip-text text-transparent" : ""}>
                      {priceLabel(pkg)}
                    </span>
                  </p>
                  <p className={`mt-1.5 text-[13px] ${muted}`}>{billingLabel(pkg)}</p>
                </div>

                <p className={`mt-4 text-[14.5px] leading-relaxed ${muted}`}>
                  <span className={`font-semibold ${dark ? "text-white" : "text-primary"}`}>Best for: </span>
                  {pkg.bestFor}
                </p>

                <ul aria-label="Sub-services included" className="mt-4 flex flex-wrap gap-1.5">
                  {pkg.includedSubServices.map((slug) => {
                    const isNew = !previous?.includedSubServices.includes(slug);
                    return (
                      <li
                        key={slug}
                        className={[
                          "rounded-full px-2.5 py-1 text-[12px] leading-tight",
                          dark
                            ? isNew
                              ? "bg-white/15 text-white"
                              : "bg-white/5 text-light/70"
                            : isNew
                              ? "bg-crimson/10 font-medium text-crimson"
                              : "bg-primary/5 text-primary/65",
                        ].join(" ")}
                      >
                        {subServices.get(slug)?.title ?? slug}
                      </li>
                    );
                  })}
                </ul>

                <p className={`mt-5 text-[14px] font-semibold ${dark ? "text-white" : "text-primary"}`}>
                  {previous ? `Everything in ${previous.name}, plus:` : "What's included:"}
                </p>
                <ul className="mt-2.5 space-y-2">
                  {pkg.deliverables.map((item) => (
                    <li key={item} className={`flex gap-2.5 text-[14.5px] leading-relaxed ${muted}`}>
                      <Check className={dark ? "text-coral" : "text-crimson"} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <dl className={`mt-5 grid gap-2 rounded-xl p-3.5 text-[13px] ${dark ? "bg-white/5" : "bg-primary/[0.035]"}`}>
                  {(
                    [
                      ["Timeline", pkg.timeline],
                      ["Revisions", pkg.revisions],
                      ["Support", pkg.support],
                    ] as const
                  ).map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-3">
                      <dt className={muted}>{label}</dt>
                      <dd className="text-right font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-auto pt-6">
                  <Button
                    href={packageContactLink(data.service, pkg.slug)}
                    variant={dark ? "primary" : "primary-reverse"}
                    size="sm"
                    className="w-full justify-center"
                    aria-label={pkg.custom ? `${pkg.ctaLabel} for ${pkg.name}` : undefined}
                  >
                    {pkg.ctaLabel}
                  </Button>
                </div>
              </li>
            );
          })}
        </ol>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
