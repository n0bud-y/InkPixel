"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";
import { useHeaderLight } from "./header-tone";
import { IndustriesMenu } from "./IndustriesMenu";
import { ServicesMenu } from "./ServicesMenu";
import { TechnologiesMenu } from "./TechnologiesMenu";

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

// Pages whose top is white, so the header is white with dark text from the start (see HeaderShell):
// each case study (the listing's hero is navy).
export const hasLightHeader = (pathname: string) => pathname.startsWith("/case-studies/");

// Desktop menu. The current section gets the pill; Services links to its page and opens the mega
// menu; Industries and Technologies are not links, only buttons that open their own mega menus.
export function NavLinks() {
  const pathname = usePathname();
  const light = useHeaderLight();

  return (
    <ul className="flex items-center gap-0.5 xl:gap-1">
      {mainNav.map((item) => {
        const active = isActive(pathname, item.href);
        const className = [
          "inline-flex rounded-full px-2.5 py-2 text-[13px] leading-none font-medium whitespace-nowrap transition-colors duration-200 xl:px-3.5 2xl:px-4 2xl:py-2.5 2xl:text-sm",
          light
            ? active
              ? "bg-brand-gradient text-white shadow-[0_8px_20px_-10px_rgb(201_29_76_/_0.6)]"
              : "text-primary/75 hover:bg-primary/5 hover:text-primary"
            : active
              ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255_/_0.06)]"
              : "text-light/70 hover:bg-white/[0.06] hover:text-white",
        ].join(" ");
        return (
          <li key={item.href}>
            {item.href === "/services" ? (
              <ServicesMenu label={item.label} className={className} active={active} />
            ) : item.href === "/industries" ? (
              <IndustriesMenu label={item.label} className={className} active={active} />
            ) : item.href === "/technologies" ? (
              <TechnologiesMenu label={item.label} className={className} active={active} />
            ) : (
              <Link href={item.href} aria-current={active ? "page" : undefined} className={className}>
                {item.label}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
