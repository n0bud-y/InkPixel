import { Reveal } from "@/components/motion/Reveal";
import { CaseStudyHeading } from "@/components/case-studies/CaseStudySection";
import type { ServicePackages } from "@/content/packages";
import type { Service } from "@/content/services";

// One table cell: a tick, a dash, or a short note. Ticks and dashes have words for screen readers.
function Cell({ value }: { value: string }) {
  if (value === "✓")
    return (
      <>
        <svg aria-hidden="true" viewBox="0 0 16 16" className="mx-auto size-4 text-coral">
          <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="sr-only">Included</span>
      </>
    );
  if (value === "—")
    return (
      <>
        <span aria-hidden="true" className="text-light/30">
          —
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="text-light/90">{value}</span>;
}

// "Compare Packages": the six sub-services, then timeline, revisions, and support as rows; the
// four packages as columns (its own <section>, so the hero's "Compare packages" can jump to #compare). On narrow screens the table scrolls sideways inside its box (the box
// is focusable, so it scrolls with the keyboard too) with the first column kept in view.
export function CompareTable({ data, subServices }: { data: ServicePackages; subServices: Map<string, Service> }) {
  const headingId = "compare-title";
  const rows: [string, string[]][] = [
    ...Object.entries(data.comparison).map(([slug, values]): [string, string[]] => [subServices.get(slug)?.title ?? slug, values]),
    ["Timeline", data.packages.map((pkg) => pkg.timeline)],
    ["Revisions", data.packages.map((pkg) => pkg.revisions)],
    ["Support", data.packages.map((pkg) => pkg.support)],
  ];

  return (
    <section id="compare" aria-labelledby={headingId} className="relative isolate scroll-mt-24 overflow-hidden bg-primary">
      <div className="container-site py-[clamp(4rem,5.85vw,7rem)]">
        <Reveal>
          <CaseStudyHeading
            id={headingId}
            tone="dark"
            eyebrow="Compare"
            title="Compare *Packages*"
            intro="What each package covers, side by side."
            centered
          />
        </Reveal>
        <Reveal y={30} className="mt-[clamp(2.5rem,3.4vw,4rem)]">
          <div
            role="region"
            aria-labelledby={headingId}
            tabIndex={0}
            className="overflow-x-auto rounded-[1.25rem] border border-white/10 outline-offset-4 focus-visible:outline-2 focus-visible:outline-coral"
          >
            <table className="w-full min-w-[46rem] border-collapse text-left text-[clamp(0.8125rem,0.85vw,0.9375rem)]">
              <caption className="sr-only">Packages compared by sub-service, timeline, revisions, and support</caption>
              <thead>
                <tr>
                  <th scope="col" className="sticky left-0 z-10 w-[24%] bg-[#1d2147] px-4 py-4 font-mono text-[11px] font-medium tracking-[0.14em] text-light/60 uppercase">
                    Included
                  </th>
                  {data.packages.map((pkg, index) => (
                    <th
                      key={pkg.slug}
                      scope="col"
                      className={`px-4 py-4 text-center align-bottom ${pkg.popular ? "bg-white/[0.06]" : ""}`}
                    >
                      {pkg.popular && (
                        <span className="mb-1.5 block font-mono text-[10px] tracking-[0.14em] text-coral uppercase">Most popular</span>
                      )}
                      <span className="block font-mono text-[11px] text-light/50">{String(index + 1).padStart(2, "0")}</span>
                      <span className="block font-display text-[clamp(0.9375rem,1.05vw,1.125rem)] font-semibold text-white">{pkg.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, values], rowIndex) => (
                  <tr key={label} className={`border-t border-white/10 ${rowIndex === rows.length - 3 ? "border-t-white/25" : ""}`}>
                    <th scope="row" className="sticky left-0 z-10 bg-[#1d2147] px-4 py-3.5 font-medium text-white">
                      {label}
                    </th>
                    {values.map((value, index) => (
                      <td
                        key={index}
                        className={`px-4 py-3.5 text-center leading-snug ${data.packages[index].popular ? "bg-white/[0.06]" : ""}`}
                      >
                        <Cell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

