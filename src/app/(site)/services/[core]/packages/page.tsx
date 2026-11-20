import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Thing } from "schema-dts";
import { CallToActionSection } from "@/components/case-studies/CallToActionSection";
import { CaseStudyHeading, CaseStudySectionFrame } from "@/components/case-studies/CaseStudySection";
import { StepsTimeline } from "@/components/case-studies/StepsTimeline";
import { Reveal } from "@/components/motion/Reveal";
import { CompareTable } from "@/components/sections/packages/CompareTable";
import { PackageCards } from "@/components/sections/packages/PackageCards";
import { PackagesFaq } from "@/components/sections/packages/PackagesFaq";
import { PackagesHero } from "@/components/sections/packages/PackagesHero";
import { SubServiceCards } from "@/components/sections/packages/SubServiceCards";
import { subServicesOf } from "@/components/sections/packages/sub-services";
import { PageSchema } from "@/components/seo/PageSchema";
import { getServicePackages, packagesLive, servicePackages } from "@/content/packages";
import { absoluteUrl, breadcrumbSchema, pageMetadata, serviceSchema } from "@/lib/seo";

// One packages page per core service in src/content/packages.ts; any other address is a 404.
// (A fixed folder name wins over the [service] pages beside it, so /services/<core>/packages
// never reaches them.)
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePackages.map(({ service }) => ({ core: service }));
}

function find(core: string) {
  const data = getServicePackages(core);
  const subs = subServicesOf(core);
  return data && subs ? { data, ...subs } : null;
}

export async function generateMetadata(props: PageProps<"/services/[core]/packages">): Promise<Metadata> {
  const { core } = await props.params;
  const found = find(core);
  if (!found) return {};
  return pageMetadata({
    title: `${found.category.label} Packages`,
    description: `${found.category.label} packages from Ink Pixel Studios: ${found.data.hubLine} Compare what each package includes.`,
    path: `/services/${core}/packages`,
    // Not indexed until the project head approves the packages (packagesLive).
    noIndex: !packagesLive,
  });
}

// A core service's packages page, all from src/content/packages.ts: the hero, the four packages,
// the comparison table, what each sub-service includes, how it works, the questions, and a call.
// Not linked from the site yet (project head, 20 Nov 2026).
export default async function ServicePackagesPage(props: PageProps<"/services/[core]/packages">) {
  const { core } = await props.params;
  const found = find(core);
  if (!found) notFound();
  const { data, category, bySlug } = found;
  const path = `/services/${core}/packages`;
  const title = `${category.label} Packages`;

  // Offers only for packages with a price (none until the studio sets them).
  const offers = data.packages.flatMap((pkg) =>
    !pkg.custom && pkg.price != null
      ? [{ "@type": "Offer", name: pkg.name, price: pkg.price, priceCurrency: "PKR", url: absoluteUrl(`${path}#package-${pkg.slug}`) }]
      : [],
  );
  const service = {
    ...serviceSchema({ name: title, description: data.intro, path, parentPath: `/services/${core}` }),
    ...(offers.length ? { offers } : {}),
  } as Thing;

  return (
    <>
      <PageSchema
        path={path}
        page={{ type: "WebPage", title, description: data.intro }}
        items={[
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: category.label, path: `/services/${core}` },
            { name: "Packages", path },
          ]),
          service,
        ]}
      />
      <PackagesHero
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: category.label, href: `/services/${core}` },
          { label: "Packages" },
        ]}
        eyebrow={`${category.label} · Packages`}
        title={`${category.label} *Packages*`}
        text={data.intro}
        primary={{ label: "Compare packages", href: "#compare" }}
        secondary={{ label: "Book a free call", href: `/contact?service=${core}` }}
      />
      <PackageCards data={data} subServices={bySlug} />
      <CompareTable data={data} subServices={bySlug} />
      <SubServiceCards data={data} category={category} />
      <CaseStudySectionFrame headingId="how-it-works-title" tone="dark">
        <Reveal>
          <CaseStudyHeading id="how-it-works-title" tone="dark" eyebrow="How It Works" title="From First Call to *Launch*" centered />
        </Reveal>
        <StepsTimeline items={data.steps} />
      </CaseStudySectionFrame>
      <PackagesFaq name={`${core}-packages-faq`} items={data.faq} />
      <CallToActionSection
        id="packages-cta"
        tone="dark"
        title="Not Sure Which Package *Fits*?"
        text="Book a free call. We'll ask about your goals and recommend the package, or a mix, that suits you."
        button={{ label: "Book a free call", href: `/contact?service=${core}` }}
        image={null}
      />
    </>
  );
}
