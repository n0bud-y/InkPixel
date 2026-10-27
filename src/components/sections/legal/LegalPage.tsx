import { TableOfContents } from "@/components/blog/TableOfContents";
import { PageSchema } from "@/components/seo/PageSchema";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withAccent } from "@/components/ui/accent";
import { legalLabels, type LegalBlock, type LegalDocument } from "@/content/legal";
import { breadcrumbSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const linkClass =
  "text-crimson underline decoration-crimson/35 underline-offset-[0.2em] transition-colors hover:decoration-crimson";

// The Privacy Policy, Terms and Conditions, and Refund Policy pages (content in
// src/content/legal.ts). Hero as on Contact, Our Work, and Insights: navy with the faint grid and
// a crimson glow, the eyebrow, title, intro, and the date it last changed. Then the numbered
// sections on white (with subheadings where a section has parts), with the
// blog's "On this page" list beside them (desktop: stays in view and marks the section being
// read; phones and tablets: a box above the text that opens to the list).
export function LegalPage({ document }: { document: LegalDocument }) {
  const headings = document.sections.map(({ id, title }) => ({ id, text: title, level: 2 as const }));

  return (
    <>
      <PageSchema
        path={document.path}
        page={{ type: "WebPage", title: document.name, description: document.description }}
        items={[breadcrumbSchema([{ name: document.name, path: document.path }])]}
      />

      <section aria-labelledby="legal-title" className="relative isolate overflow-hidden bg-primary">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent_60rem)]" />
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -z-10 size-[54rem] max-w-[180vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.32),transparent)]"
        />
        <div className="container-site pt-36 pb-[clamp(3.5rem,5vw,6rem)] text-center motion-safe:animate-rise sm:pt-40 2xl:pt-48">
          <Eyebrow>{legalLabels.eyebrow}</Eyebrow>
          <h1
            id="legal-title"
            className="mt-6 font-display text-[clamp(2.75rem,5vw,6rem)] leading-[1.02] font-medium tracking-[-0.03em] text-balance text-white"
          >
            {withAccent(document.title)}
          </h1>
          <p className="mx-auto mt-6 max-w-[40em] text-[clamp(1rem,1.17vw,1.4rem)] leading-[1.75] text-light/80">
            {document.intro}
          </p>
          <p className="mt-6 font-mono text-[13px] tracking-[0.14em] text-light/60 uppercase">
            {legalLabels.updated}: {document.updated}
          </p>
        </div>
      </section>

      <div className="bg-white">
        <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-8 py-[clamp(3rem,5vw,6rem)] lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-[clamp(3rem,5vw,6rem)]">
          <TableOfContents headings={headings} label={legalLabels.toc} />
          <div className="text-[clamp(1rem,1.05vw,1.1875rem)] leading-[1.85] text-primary/85">
            {document.sections.map((section, index) => (
              <section key={section.id} aria-labelledby={section.id} className="[&+&]:mt-[clamp(2.5rem,3.2vw,3.75rem)]">
                <h2
                  id={section.id}
                  className="flex scroll-mt-32 items-baseline gap-[0.6em] font-display text-[clamp(1.5rem,1.85vw,2.25rem)] leading-[1.25] font-semibold tracking-[-0.02em] text-primary outline-none"
                >
                  <span aria-hidden="true" className="w-fit bg-brand-gradient-reverse bg-clip-text font-mono text-[0.6em] font-medium tracking-[0.08em] text-transparent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                <div className="mt-[0.8em] space-y-[1em]">
                  {section.body.map((block, blockIndex) => (
                    <Block key={blockIndex} block={block} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") return <p>{block}</p>;
  if ("heading" in block) {
    return (
      <h3 className="pt-[0.5em] font-display text-[clamp(1.125rem,1.25vw,1.4375rem)] leading-snug font-semibold text-primary">
        {block.heading}
      </h3>
    );
  }
  if ("list" in block) {
    return (
      <ul className="space-y-[0.5em]">
        {block.list.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span aria-hidden="true" className="mt-[0.75em] size-[0.4em] shrink-0 rounded-full bg-coral" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <address className="rounded-2xl border border-primary/10 bg-light/60 px-[clamp(1.25rem,1.6vw,1.75rem)] py-[clamp(1rem,1.3vw,1.5rem)] not-italic">
      <strong className="block font-semibold text-primary">{siteConfig.name}</strong>
      <span className="block">{siteConfig.address}</span>
      <a href={`mailto:${siteConfig.email}`} className={linkClass}>
        {siteConfig.email}
      </a>
      <span aria-hidden="true"> · </span>
      <a href={`tel:${siteConfig.phone.tel}`} className={linkClass}>
        {siteConfig.phone.display}
      </a>
    </address>
  );
}
