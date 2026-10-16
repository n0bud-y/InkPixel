import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { serviceCategories } from "@/content/services";
import { servicesPage } from "@/content/services-page";

const pill =
  "inline-flex rounded-full px-[clamp(1rem,2.1vw,2.5rem)] py-[clamp(0.65rem,0.9vw,1.05rem)] text-[clamp(0.8125rem,1.05vw,1.25rem)] leading-none font-medium text-white transition duration-300";

// "Empowering Your Business with Next-Gen Digital Solutions": the title and intro, then one row
// per service category (src/content/services.ts): the photo, alternating sides, then the title,
// description, and services as pills linking to their pages. The first service is highlighted,
// as in the design. The round arrow on the photo leads to the category's own page (Branding so
// far), labelled for screen readers; otherwise to the first service's page, hidden from screen
// readers and the keyboard, which already have that pill. Phones and tablets: the
// photo above the text.
export function ServiceCategories() {
  const { categories } = servicesPage;

  return (
    <section aria-labelledby="categories-title" className="bg-primary">
      <div className="container-site py-[clamp(4rem,5.2vw,6.25rem)]">
        <Reveal>
          <h2
            id="categories-title"
            data-reveal
            className="max-w-[16em] font-display text-[clamp(1.75rem,2.65vw,3.2rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-white"
          >
            {categories.title}
          </h2>
          <p
            data-reveal
            className="mt-[clamp(0.75rem,1vw,1.25rem)] max-w-[40em] text-[clamp(0.9375rem,0.95vw,1.125rem)] leading-[1.75] text-white/85"
          >
            {categories.text}
          </p>
        </Reveal>

        <div className="mt-[clamp(2.5rem,3.4vw,4rem)] flex flex-col gap-[clamp(4.5rem,7.3vw,8.75rem)]">
          {serviceCategories.map((category, index) => {
            const href = category.href ?? category.services[0]?.href;
            const photoRight = index % 2 === 1;
            return (
              <Reveal
                key={category.slug}
                stagger={0.08}
                className="grid grid-cols-[minmax(0,1fr)] items-center gap-x-[clamp(2rem,2.6vw,3rem)] gap-y-[clamp(3rem,4vw,4.5rem)] lg:grid-cols-2"
              >
                <div data-reveal className={`relative ${photoRight ? "lg:order-2" : ""}`}>
                  <div className="relative aspect-[805/735] overflow-hidden rounded-[clamp(0.75rem,1vw,1.25rem)]">
                    <Image src={category.image} alt="" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
                  </div>
                  {href && (
                    <Link
                      href={href}
                      aria-hidden={category.href ? undefined : true}
                      tabIndex={category.href ? undefined : -1}
                      className="absolute bottom-0 left-1/2 grid size-[clamp(3.5rem,5.4vw,6.5rem)] -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border-[clamp(4px,0.4vw,7px)] border-primary bg-brand-gradient text-white shadow-[0_12px_32px_-10px_rgb(201_29_76_/_0.75)] transition-transform duration-300 hover:scale-105"
                    >
                      {category.href && <span className="sr-only">{category.label} services</span>}
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-[38%]">
                        <path d="M4.5 12h15M13.5 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  )}
                </div>

                <div className={photoRight ? "lg:order-1" : ""}>
                  <h3
                    data-reveal
                    className="font-display text-[clamp(1.75rem,2.9vw,3.5rem)] leading-tight font-semibold tracking-[-0.02em] text-white"
                  >
                    {category.label}
                  </h3>
                  <p
                    data-reveal
                    className="mt-[clamp(0.5rem,0.8vw,1rem)] max-w-[24em] text-[clamp(0.9375rem,1.15vw,1.375rem)] leading-[1.6] text-white/85"
                  >
                    {category.description}
                  </p>
                  <ul
                    data-reveal
                    aria-label={`${category.label} services`}
                    className="mt-[clamp(1.25rem,1.6vw,2rem)] flex flex-wrap gap-x-[clamp(0.75rem,1.8vw,2.2rem)] gap-y-[clamp(0.75rem,1.9vw,2.3rem)]"
                  >
                    {category.services.map((service, serviceIndex) => (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          className={`${pill} ${
                            serviceIndex === 0
                              ? "bg-brand-gradient shadow-[0_10px_30px_-10px_rgb(201_29_76_/_0.8)] hover:brightness-110"
                              : "bg-white/25 hover:bg-brand-gradient"
                          }`}
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
