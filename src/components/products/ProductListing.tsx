import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { withAccent } from "@/components/ui/accent";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { productsPage } from "@/content/products-page";
import type { ProductSummary } from "@/contentful/queries/products";

// The products listing (/products): the hero (as on the case studies listing), then the first
// product as a wide card and the rest in a grid, in the order they were published. Each card is
// one link to the product's page.
export function ProductListing({ products }: { products: ProductSummary[] }) {
  const [first, ...rest] = products;

  return (
    <section aria-labelledby="products-title" className="relative isolate overflow-hidden bg-primary">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent_60rem)]" />
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 size-[54rem] max-w-[180vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.32),transparent)]"
      />
      <div className="container-site pt-36 pb-[clamp(4rem,6.15vw,7.25rem)] sm:pt-40 2xl:pt-48">
        <div className="text-center motion-safe:animate-rise">
          <Eyebrow>{productsPage.eyebrow}</Eyebrow>
          <h1
            id="products-title"
            className="mt-6 font-display text-[clamp(2.75rem,5vw,6rem)] leading-[1.02] font-medium tracking-[-0.03em] text-white"
          >
            {withAccent(productsPage.title)}
          </h1>
          <p className="mx-auto mt-6 max-w-[40em] text-[clamp(1rem,1.17vw,1.4rem)] leading-[1.75] text-light/80">
            {productsPage.intro}
          </p>
        </div>

        <div className="mt-[clamp(2.5rem,3.5vw,4.5rem)] motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both] motion-safe:[animation-delay:200ms]">
          {first ? (
            <WideCard item={first} />
          ) : (
            <p className="py-16 text-center text-[clamp(1rem,1.1vw,1.25rem)] text-light/70">{productsPage.empty}</p>
          )}
          {rest.length > 0 && (
            <ul className="mt-[clamp(1rem,1.15vw,1.4rem)] grid grid-cols-[minmax(0,1fr)] gap-[clamp(1rem,1.15vw,1.4rem)] md:grid-cols-2">
              {rest.map((item, index) => (
                <li key={item.slug}>
                  <Card item={item} number={index + 2} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

const cardClass = [
  "group relative isolate overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-light",
  "transition-[translate,background-color,border-color,box-shadow] duration-500 ease-out hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_28px_60px_-30px_rgb(0_0_0_/_0.7)] motion-safe:hover:-translate-y-1",
  "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-coral",
].join(" ");

// The product's card image on a light panel (multiplied, so a white background takes on the
// panel's colour).
function Shot({ item, sizes, className = "" }: { item: ProductSummary; sizes: string; className?: string }) {
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

// The number, the product's logo (on a white chip), and its tagline.
function Meta({ number, item }: { number: number; item: ProductSummary }) {
  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-[clamp(0.6875rem,0.75vw,0.875rem)] leading-none tracking-[0.14em] uppercase">
      <span aria-hidden="true" className="mr-1 text-coral">
        {String(number).padStart(2, "0")}
      </span>
      {item.logo && (
        <span className="inline-flex h-8 items-center rounded-full bg-white px-3">
          <Image
            src={item.logo.url}
            alt=""
            width={item.logo.width}
            height={item.logo.height}
            unoptimized={item.logo.isSvg}
            className="h-4 w-auto"
          />
        </span>
      )}
      {item.tagline && (
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-light/80">{item.tagline}</span>
      )}
    </div>
  );
}

// "View product" and the arrow; the whole card is one link (the name link's ::after covers it).
function More() {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center gap-2 text-[clamp(0.875rem,0.95vw,1.0625rem)] font-medium text-light/85 transition-colors duration-300 group-hover:text-coral"
    >
      {productsPage.button}
      <ArrowUpRightIcon className="size-[1em] transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
    </span>
  );
}

// The first product, large: the text beside the image (the image on top on phones).
function WideCard({ item }: { item: ProductSummary }) {
  return (
    <article className={`${cardClass} grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]`}>
      <Shot item={item} sizes="(min-width: 64rem) 50vw, 100vw" className="aspect-[16/10] lg:order-last lg:aspect-auto lg:min-h-[clamp(22rem,28vw,34rem)]" />
      <div className="flex flex-col p-[clamp(1.5rem,3vw,3.5rem)]">
        <Meta number={1} item={item} />
        <h2 className="mt-[clamp(1.5rem,2.5vw,3rem)] font-display text-[clamp(1.75rem,2.6vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.02em] text-balance text-white lg:mt-auto">
          <Link href={item.href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {item.name}
          </Link>
        </h2>
        <p className="mt-4 max-w-[36em] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.75] text-light/70">{item.excerpt}</p>
        <div className="mt-[clamp(1.5rem,2vw,2.5rem)]">
          <More />
        </div>
      </div>
    </article>
  );
}

// A product in the grid: the image on top, then the number, logo, tagline, name, and excerpt.
function Card({ item, number }: { item: ProductSummary; number: number }) {
  return (
    <article className={`${cardClass} flex h-full flex-col`}>
      <Shot item={item} sizes="(min-width: 48rem) 45vw, 100vw" className="aspect-[16/10]" />
      <div className="flex flex-1 flex-col p-[clamp(1.25rem,2.2vw,2.5rem)]">
        <Meta number={number} item={item} />
        <h2 className="mt-[clamp(1rem,1.4vw,1.5rem)] font-display text-[clamp(1.5rem,1.9vw,2.25rem)] leading-[1.1] font-medium tracking-[-0.02em] text-balance text-white">
          <Link href={item.href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {item.name}
          </Link>
        </h2>
        <p className="mt-3 text-[clamp(0.9375rem,1vw,1.125rem)] leading-[1.7] text-light/70">{item.excerpt}</p>
        <div className="mt-auto pt-[clamp(1.25rem,1.8vw,2rem)]">
          <More />
        </div>
      </div>
    </article>
  );
}
