"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { caseStudiesPage } from "@/content/case-studies-page";
import type { CaseStudySummary } from "@/contentful/queries/case-studies";

type ServiceOption = { slug: string; label: string };

// The chosen service lives in the address (?service=branding), so a filtered view can be shared.
// Choosing one replaces the address (no new history entry) and tells the listeners here.
const listeners = new Set<() => void>();
const subscribe = (onChange: () => void) => {
  listeners.add(onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("popstate", onChange);
  };
};
const serviceInUrl = () => new URLSearchParams(window.location.search).get("service");

function choose(slug: string | null) {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set("service", slug);
  else url.searchParams.delete("service");
  window.history.replaceState(null, "", url);
  listeners.forEach((onChange) => onChange());
}

// The service pills and the case studies they filter, without a page load: the first shown as a
// wide card, the rest in a two-column grid. The page is built with every case study showing
// (what search engines and visitors without JavaScript see); a ?service= address is applied
// once the page opens.
export function WorkFilter({ caseStudies, services }: { caseStudies: CaseStudySummary[]; services: ServiceOption[] }) {
  const inUrl = useSyncExternalStore(subscribe, serviceInUrl, () => null);
  const active = services.find((service) => service.slug === inUrl) ?? null;
  const shown = active ? caseStudies.filter((item) => item.services.includes(active.slug)) : caseStudies;
  const [first, ...rest] = shown;
  const labels = new Map(services.map((service) => [service.slug, service.label]));

  return (
    <>
      {services.length > 0 && (
        <div
          role="group"
          aria-label={caseStudiesPage.filter.label}
          className="mt-[clamp(2rem,2.9vw,3.5rem)] motion-safe:animate-rise motion-safe:[animation-delay:150ms]"
        >
          <ul className="-mx-5 flex gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-8">
            {[{ slug: null, label: caseStudiesPage.filter.all }, ...services].map((pill) => {
              const current = pill.slug === (active?.slug ?? null);
              return (
                <li key={pill.slug ?? "all"} className="shrink-0">
                  <button
                    type="button"
                    aria-pressed={current}
                    onClick={() => choose(pill.slug)}
                    className={[
                      "inline-flex h-11 items-center rounded-full px-5 text-[clamp(0.875rem,0.9vw,1rem)] font-medium transition-colors duration-200 2xl:h-12 2xl:px-6",
                      current
                        ? "bg-brand-gradient text-white shadow-[0_10px_24px_-12px_rgb(201_29_76_/_0.8)]"
                        : "border border-white/15 text-light/80 hover:border-white/35 hover:text-white",
                    ].join(" ")}
                  >
                    {pill.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <h2 className="sr-only">{caseStudiesPage.name}</h2>
      <p aria-live="polite" className="sr-only">
        {active ? `${shown.length} ${shown.length === 1 ? "case study" : "case studies"}: ${active.label}` : ""}
      </p>

      {/* Keyed by the filter, so the new set rises in. */}
      <div
        key={active?.slug ?? "all"}
        className="mt-[clamp(2rem,2.9vw,3.5rem)] motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both] motion-safe:[animation-delay:250ms]"
      >
        {first ? (
          <WideCard item={first} labels={labels} />
        ) : (
          <p className="py-16 text-center text-[clamp(1rem,1.1vw,1.25rem)] text-light/70">{caseStudiesPage.empty}</p>
        )}
        {rest.length > 0 && (
          <ul className="mt-[clamp(1rem,1.15vw,1.4rem)] grid grid-cols-[minmax(0,1fr)] gap-[clamp(1rem,1.15vw,1.4rem)] md:grid-cols-2">
            {rest.map((item, index) => (
              <li key={item.slug}>
                <Card item={item} number={index + 2} labels={labels} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

const cardClass = [
  "group relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-light",
  "transition-[translate,background-color,border-color,box-shadow] duration-500 ease-out hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_28px_60px_-30px_rgb(0_0_0_/_0.7)] motion-safe:hover:-translate-y-1",
  "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-coral",
].join(" ");

// The case study's hero image (a product mockup) on a light panel, as on the service pages'
// project cards. Multiplied, so an image's own white background takes on the panel's colour.
function Shot({ item, sizes, className = "" }: { item: CaseStudySummary; sizes: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-linear-to-br from-[#fbe7e3] to-[#f6dfe6] ${className}`}>
      <Image
        src={item.image.url}
        alt={item.image.alt}
        fill
        unoptimized={item.image.isSvg}
        sizes={sizes}
        className="object-contain p-[7%] mix-blend-multiply transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
      />
    </div>
  );
}

// The number and the services ticked in Contentful.
function Meta({ number, item, labels }: { number: number; item: CaseStudySummary; labels: Map<string, string> }) {
  const tags = item.services.flatMap((slug) => labels.get(slug) ?? []);
  return (
    <div className="flex flex-wrap items-center gap-2.5 font-mono text-[clamp(0.6875rem,0.75vw,0.875rem)] leading-none tracking-[0.14em] uppercase">
      <span aria-hidden="true" className="mr-1 text-coral">
        {String(number).padStart(2, "0")}
      </span>
      {tags.length > 0 && (
        <ul aria-label="Services" className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-light/80">
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// "View case study" and the arrow; the whole card is one link (the title link's ::after covers it).
function More() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center gap-2 text-[clamp(0.875rem,0.95vw,1.0625rem)] font-medium text-light/85 transition-colors duration-300 group-hover:text-coral"
    >
      {caseStudiesPage.button}
      <ArrowUpRightIcon className="size-[1em] transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
    </span>
  );
}

// The first case study, large: the text beside the image (the image on top on phones).
function WideCard({ item, labels }: { item: CaseStudySummary; labels: Map<string, string> }) {
  return (
    <article className={`${cardClass} grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]`}>
      <Shot item={item} sizes="(min-width: 64rem) 50vw, 100vw" className="aspect-[16/10] lg:order-last lg:aspect-auto lg:min-h-[clamp(22rem,28vw,34rem)]" />
      <div className="flex flex-col p-[clamp(1.5rem,3vw,3.5rem)]">
        <Meta number={1} item={item} labels={labels} />
        <h3 className="mt-[clamp(1.5rem,2.5vw,3rem)] font-display text-[clamp(1.75rem,2.6vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.02em] text-balance text-white lg:mt-auto">
          <Link href={item.href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {item.title}
          </Link>
        </h3>
        <p className="mt-4 max-w-[36em] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.75] text-light/70">{item.excerpt}</p>
        <div className="mt-[clamp(1.5rem,2vw,2.5rem)]">
          <More />
        </div>
      </div>
    </article>
  );
}

// A case study in the grid: the image on top, then the number and services, title, excerpt.
function Card({ item, number, labels }: { item: CaseStudySummary; number: number; labels: Map<string, string> }) {
  return (
    <article className={`${cardClass} flex h-full flex-col`}>
      <Shot item={item} sizes="(min-width: 48rem) 45vw, 100vw" className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-[clamp(1.25rem,2.2vw,2.5rem)]">
        <Meta number={number} item={item} labels={labels} />
        <h3 className="mt-[clamp(1rem,1.4vw,1.5rem)] font-display text-[clamp(1.5rem,1.9vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.02em] text-balance text-white">
          <Link href={item.href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {item.title}
          </Link>
        </h3>
        <p className="mt-3 text-[clamp(0.9375rem,1vw,1.125rem)] leading-[1.7] text-light/70">{item.excerpt}</p>
        <div className="mt-auto pt-[clamp(1.25rem,1.8vw,2rem)]">
          <More />
        </div>
      </div>
    </article>
  );
}
