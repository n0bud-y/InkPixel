import { Eyebrow } from "@/components/ui/Eyebrow";
import { withAccent } from "@/components/ui/accent";
import { caseStudiesPage } from "@/content/case-studies-page";
import { serviceCategories } from "@/content/services";
import type { CaseStudySummary } from "@/contentful/queries/case-studies";
import { WorkFilter } from "./WorkFilter";

// The case studies listing (/case-studies): the hero (as on the Insights page), then the service
// pills, the first case study as a wide card, and the rest in a grid (WorkFilter). Case studies
// ticked "Featured" in Contentful come first, then the newest. Only services that have case
// studies get a pill.
export function WorkListing({ caseStudies }: { caseStudies: CaseStudySummary[] }) {
  const ordered = [...caseStudies.filter((item) => item.featured), ...caseStudies.filter((item) => !item.featured)];
  const services = serviceCategories
    .filter((category) => ordered.some((item) => item.services.includes(category.slug)))
    .map(({ slug, label }) => ({ slug, label }));

  return (
    <section aria-labelledby="work-title" className="relative isolate overflow-hidden bg-primary">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent_60rem)]" />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 size-[54rem] max-w-[180vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.32),transparent)]"
      />
      <div className="container-site pt-36 pb-[clamp(4rem,6.15vw,7.25rem)] sm:pt-40 2xl:pt-48">
        <div className="text-center motion-safe:animate-rise">
          <Eyebrow>{caseStudiesPage.eyebrow}</Eyebrow>
          <h1
            id="work-title"
            className="mt-6 font-display text-[clamp(2.75rem,5vw,6rem)] leading-[1.02] font-medium tracking-[-0.03em] text-white"
          >
            {withAccent(caseStudiesPage.title)}
          </h1>
          <p className="mx-auto mt-6 max-w-[40em] text-[clamp(1rem,1.17vw,1.4rem)] leading-[1.75] text-light/80">
            {caseStudiesPage.intro}
          </p>
        </div>

        <WorkFilter caseStudies={ordered} services={services} />
      </div>
    </section>
  );
}
