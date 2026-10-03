import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { footerNav, siteConfig } from "@/lib/site";

// Footer text colours from the design: warm greys, not tints of the page's light colour.
const linkClass = "text-[#b9aea9] transition-colors duration-200 hover:text-white";
const columnTitle =
  "font-mono text-[clamp(0.6875rem,0.68vw,0.8125rem)] leading-none tracking-[0.24em] text-[#7d716c] uppercase";
const bodyText = "text-[clamp(0.9375rem,0.9vw,1.0625rem)] leading-[1.76]";
const linkText = "text-[clamp(0.9375rem,0.94vw,1.125rem)] leading-[1.4]";

function LinkColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} data-reveal>
      <h2 className={columnTitle}>{title}</h2>
      <ul className={`mt-[clamp(1.25rem,1.6vw,1.9rem)] flex flex-col gap-[clamp(0.75rem,1.15vw,1.375rem)] ${linkText}`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// "Let's make something great.": big closing line, then the studio line, sitemap, services
// and contact columns, and the copyright row. Sizes follow the 1920px design frame.
// Phones: one column; tablets: two; desktop: four.
export function Footer() {
  return (
    <footer className="bg-primary pt-[clamp(4rem,5.65vw,6.8rem)] pb-[clamp(3.5rem,8.3vw,10rem)]">
      <div className="container-site">
        <Reveal y={50} stagger={0.12}>
          <p
            className="font-display text-[clamp(2.75rem,7.8vw,9.375rem)] leading-[0.95] font-medium tracking-[-0.035em] text-light"
          >
            <span data-reveal className="block">
              Let&apos;s make
            </span>
            <span data-reveal className="block">
              <span className="bg-linear-to-r from-[#f15a29] to-[#da1c5c] bg-clip-text text-transparent">
                something great.
              </span>
            </span>
          </p>
        </Reveal>

        <Reveal
          stagger={0.08}
          className="mt-[clamp(2.5rem,3.95vw,4.75rem)] grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[minmax(0,516fr)_minmax(0,388fr)_minmax(0,387fr)_minmax(0,319fr)] lg:gap-x-0"
        >
          <p data-reveal className={`max-w-[25em] text-[#b9aea9] sm:col-span-2 lg:col-span-1 lg:pt-[clamp(2.5rem,2.95vw,3.55rem)] lg:pr-8 ${bodyText}`}>
            {siteConfig.tagline}
          </p>
          <LinkColumn title="Sitemap" links={footerNav.sitemap} />
          <LinkColumn title="Services" links={footerNav.services} />
          <div data-reveal>
            <h2 className={columnTitle}>Contact</h2>
            <a
              href={`mailto:${siteConfig.email}`}
              className={`mt-[clamp(1.25rem,1.6vw,1.9rem)] inline-block ${linkText} ${linkClass}`}
            >
              {siteConfig.email}
            </a>
            <address className={`mt-6 max-w-[16em] text-[#b9aea9] not-italic ${bodyText}`}>
              {siteConfig.address}
            </address>
          </div>
        </Reveal>

        <div className="mt-[clamp(3.5rem,4.75vw,5.7rem)] flex flex-col gap-4 border-t border-white/6 pt-[clamp(1.5rem,1.75vw,2.125rem)] text-[clamp(0.8125rem,0.83vw,1rem)] text-[#7d716c] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} <span className="uppercase">{siteConfig.name}</span>. All
            rights reserved.
          </p>
          <ul className="flex gap-[clamp(1.25rem,1.35vw,1.625rem)]">
            {footerNav.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors duration-200 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
