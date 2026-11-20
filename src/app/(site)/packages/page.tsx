import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CallToActionSection } from "@/components/case-studies/CallToActionSection";
import { CaseStudyHeading, CaseStudySectionFrame } from "@/components/case-studies/CaseStudySection";
import { Reveal } from "@/components/motion/Reveal";
import { PackagesHero } from "@/components/sections/packages/PackagesHero";
import { PageSchema } from "@/components/seo/PageSchema";
import { packagesLive, priceLabel, servicePackages } from "@/content/packages";
import { serviceCategories } from "@/content/services";
import { breadcrumbSchema, itemListSchema, pageMetadata } from "@/lib/seo";

const description =
  "Packages for branding, development, marketing, software, apps, and AI automation from Ink Pixel Studios. Four tiers per service, each building on the last.";

export function generateMetadata(): Metadata {
  // Not indexed until the project head approves the packages (packagesLive).
  return pageMetadata({ title: "Packages", description, path: "/packages", noIndex: !packagesLive });
}

// "From PKR 80,000" (the lowest set price), or "Get a quote" while no price is set.
function fromLabel(service: (typeof servicePackages)[number]) {
  const first = service.packages[0];
  return first.price != null ? `From ${priceLabel(first)}` : "Get a quote";
}

const howItWorks = [
  { title: "Each tier builds on the last", text: "Every package includes everything in the one before it, plus more services or bigger quantities." },
  { title: "Package 4 is custom", text: "The fourth package in each service is scoped with you and quoted per project." },
  { title: "Payment in advance", text: "Work starts once the advance payment is received; the split is set out in your quote." },
];

// The packages hub: the six services, each linking to its packages page (/services/<core>/packages),
// then how the packages work and a call. Not linked from the site yet (project head, 20 Nov 2026).
export default function PackagesPage() {
  const services = servicePackages.flatMap((data) => {
    const category = serviceCategories.find((item) => item.slug === data.service);
    return category ? [{ data, category, href: `/services/${data.service}/packages` }] : [];
  });

  return (
    <>
      <PageSchema
        path="/packages"
        page={{ type: "CollectionPage", title: "Packages", description }}
        items={[
          breadcrumbSchema([{ name: "Packages", path: "/packages" }]),
          itemListSchema(
            "Service packages",
            services.map(({ category, href }) => ({ name: `${category.label} Packages`, path: href })),
          ),
        ]}
      />
      <PackagesHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Packages" }]}
        eyebrow="Service Packages"
        title="Packages for Every *Stage*"
        text="Six services, four packages each. Start with what you need now and move up when you're ready: every package includes the one before it."
        primary={{ label: "Book a free call", href: "/contact" }}
        secondary={{ label: "See all services", href: "/services" }}
      />

      <CaseStudySectionFrame headingId="hub-services-title" tone="light">
        <Reveal>
          <CaseStudyHeading id="hub-services-title" tone="light" eyebrow="Services" title="Choose a *Service*" centered />
        </Reveal>
        <Reveal y={40} stagger={0.07} className="mt-[clamp(2.5rem,3.4vw,4rem)]">
          <ul className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map(({ data, category, href }) => (
              <li key={category.slug} data-reveal className="h-full">
                <Link
                  href={href}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-primary/10 bg-white shadow-[0_20px_50px_-35px_rgb(21_25_54_/_0.5)] transition-[translate,box-shadow,border-color] duration-500 ease-out outline-offset-4 hover:-translate-y-1 hover:border-crimson/30 hover:shadow-[0_30px_60px_-30px_rgb(201_29_76_/_0.4)] focus-visible:outline-2 focus-visible:outline-coral"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-primary">
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 92vw"
                      className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-[clamp(1.25rem,1.6vw,1.75rem)]">
                    <h3 className="font-display text-[clamp(1.25rem,1.5vw,1.75rem)] leading-tight font-semibold text-primary">
                      {category.label} Packages
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-primary/70">{data.hubLine}</p>
                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                      <span className="font-display text-[1.125rem] font-semibold">
                        <span className="bg-brand-gradient-reverse bg-clip-text text-transparent">{fromLabel(data)}</span>
                      </span>
                      <span className="text-[14px] font-medium text-primary transition-colors group-hover:text-crimson">
                        View packages →
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </CaseStudySectionFrame>

      <CaseStudySectionFrame headingId="hub-how-title" tone="dark">
        <Reveal>
          <CaseStudyHeading id="hub-how-title" tone="dark" eyebrow="How It Works" title="How Our Packages *Work*" centered />
        </Reveal>
        <Reveal y={30} stagger={0.08} className="mt-[clamp(2.5rem,3.4vw,4rem)]">
          <ol className="grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-3">
            {howItWorks.map((item, index) => (
              <li key={item.title} data-reveal className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-[clamp(1.25rem,1.6vw,1.75rem)]">
                <span className="grid size-11 place-items-center rounded-full bg-brand-gradient-reverse font-display text-[15px] font-bold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-[clamp(1.125rem,1.3vw,1.5rem)] font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-light/75">{item.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </CaseStudySectionFrame>

      <CallToActionSection
        id="hub-cta"
        tone="light"
        title="Not Sure Which Package *Fits*?"
        text="Book a free call. We'll ask about your goals and recommend the right service and package."
        button={{ label: "Book a free call", href: "/contact" }}
        image={null}
      />
    </>
  );
}
