"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { industries } from "@/content/industries";
import { serviceCategories } from "@/content/services";
import { technologyMenu } from "@/content/technology-menu";
import { contactCta, mainNav } from "@/lib/site";
import { useHeaderLight } from "./header-tone";
import { isActive } from "./NavLinks";

// Phone and tablet menu: a full-screen native <dialog>, which gives focus trapping,
// Esc to close, and an inert page behind it for free.
export function MobileNav({ logo }: { logo: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const light = useHeaderLight();

  const close = () => dialogRef.current?.close();

  // Close after navigating to another page.
  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  // Close if the window grows to the desktop layout, which has no menu button.
  useEffect(() => {
    const desktop = window.matchMedia("(width >= 64rem)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) dialogRef.current?.close();
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  // Also close when a link to the current page is tapped (the pathname does not change).
  const closeOnLinkClick = (event: MouseEvent<HTMLDialogElement>) => {
    if ((event.target as HTMLElement).closest("a")) close();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-haspopup="dialog"
        className={[
          "inline-flex size-11 items-center justify-center rounded-full border transition-colors lg:hidden",
          light
            ? "border-primary/15 bg-primary/[0.04] text-primary hover:bg-primary/10"
            : "border-white/15 bg-white/[0.04] text-light hover:bg-white/10",
        ].join(" ")}
      >
        <span className="sr-only">Open menu</span>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
          <path d="M4 8.5h16M4 15.5h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClick={closeOnLinkClick}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-primary p-0 text-light backdrop:bg-transparent"
      >
        <div className="flex min-h-full flex-col bg-[radial-gradient(120%_60%_at_100%_0%,rgb(201_29_76_/_0.18),transparent_60%)]">
          <div className="container-site flex h-20 items-center justify-between gap-6">
            {logo}
            <button
              type="button"
              onClick={close}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-light transition-colors hover:bg-white/10"
            >
              <span className="sr-only">Close menu</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav aria-label="Main" className="container-site flex-1 pt-6">
            <ul>
              {mainNav.map((item, index) => {
                const active = isActive(pathname, item.href);
                if (item.href === "/services" || item.href === "/industries" || item.href === "/technologies") {
                  return (
                    <ExpandableItem key={item.href} label={item.label} number={index + 1} active={active}>
                      {item.href === "/services" ? (
                        <ServicesList label={item.label} />
                      ) : item.href === "/industries" ? (
                        <IndustriesList label={item.label} />
                      ) : (
                        <TechnologiesList />
                      )}
                    </ExpandableItem>
                  );
                }
                return (
                  <li key={item.href} className="border-b border-white/[0.07]">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "flex items-baseline justify-between py-4 font-display text-[1.75rem] leading-tight font-medium tracking-[-0.02em] transition-colors",
                        active ? "text-white" : "text-light/75 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`font-mono text-[11px] tracking-[0.2em] ${active ? "text-crimson" : "text-light/35"}`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="container-site pt-8 pb-10">
            <Button href={contactCta.href} icon className="w-full">
              {contactCta.label}
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}

// A menu item that opens its content under it on a tap (Services, Industries, Technologies).
// <details>, so it works without JavaScript.
function ExpandableItem({
  label,
  number,
  active,
  children,
}: {
  label: string;
  number: number;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <li className="border-b border-white/[0.07]">
      <details className="group/expand">
        <summary
          className={[
            "flex cursor-pointer list-none items-baseline justify-between py-4 font-display text-[1.75rem] leading-tight font-medium tracking-[-0.02em] transition-colors [&::-webkit-details-marker]:hidden",
            active ? "text-white" : "text-light/75 hover:text-white",
          ].join(" ")}
        >
          <span className="flex items-center gap-3">
            {label}
            <svg
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              className="size-3.5 transition-transform duration-200 group-open/expand:rotate-180"
            >
              <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span aria-hidden="true" className={`font-mono text-[11px] tracking-[0.2em] ${active ? "text-crimson" : "text-light/35"}`}>
            {String(number).padStart(2, "0")}
          </span>
        </summary>

        <div className="pt-1 pb-6">{children}</div>
      </details>
    </li>
  );
}

// Services: "All services" (the Services page), then the core services (src/content/services.ts).
// A core service's name opens its page; the rest of its row opens its services (icon on the brand
// gradient and name, each a link to its page) and a link to the core service's page.
function ServicesList({ label }: { label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Link
        href="/services"
        className="flex items-center justify-between rounded-xl bg-brand-gradient px-4 py-3 text-[15px] font-medium text-white shadow-[0_10px_24px_-12px_rgb(201_29_76_/_0.8)]"
      >
        All services
        <Arrow />
      </Link>
      <ul aria-label={label} className="flex flex-col gap-2">
        {serviceCategories.map((category) => (
          <li key={category.slug} className="rounded-xl bg-white/[0.04] ring-1 ring-white/[0.06]">
            <details className="group/core">
              {/* The name is a link to the core service's page (a link inside <summary> opens the
                  page instead of toggling); the rest of the row opens and closes the list. */}
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-[16px] font-medium text-light/90 group-open/core:text-white [&::-webkit-details-marker]:hidden">
                <Link
                  href={category.href ?? `/services/${category.slug}`}
                  className="-my-1 rounded-md py-1 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {category.label}
                </Link>
                <span className="flex items-center gap-3 text-[12px] font-normal text-light/45">
                  {category.services.length}
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className="size-3 transition-transform duration-200 group-open/core:rotate-180"
                  >
                    <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <ul aria-label={`${category.label} services`} className="grid gap-0.5 px-2 pb-3">
                {category.services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-[14px] leading-snug text-light/85 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-gradient">
                        <Image src={service.icon} alt="" width={48} height={48} className="size-1/2" />
                      </span>
                      {service.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href={category.href ?? `/services/${category.slug}`}
                    className="mt-1 flex items-center gap-2 rounded-lg px-2 py-2 text-[14px] font-medium text-coral transition-colors hover:text-white"
                  >
                    View all {category.label} services
                    <Arrow />
                  </Link>
                </li>
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 shrink-0">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// The industries, each its icon on the brand gradient and its name (src/content/industries.ts;
// display only).
function IndustriesList({ label }: { label: string }) {
  return (
    <ul aria-label={label} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {industries.map((industry) => (
        <li key={industry.slug} className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] px-2.5 py-2 ring-1 ring-white/[0.06]">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-gradient">
            <Image src={industry.icon} alt="" width={48} height={48} className="size-1/2" />
          </span>
          <span className="min-w-0 text-[14px] leading-snug text-light/85">{industry.label}</span>
        </li>
      ))}
    </ul>
  );
}

// The technologies by group, each a logo and a name (src/content/technology-menu.ts; display
// only).
function TechnologiesList() {
  return (
    <div className="flex flex-col gap-6">
      {technologyMenu.groups.map((group) => (
        <div key={group.label}>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-crimson uppercase">{group.label}</p>
          <ul aria-label={group.label} className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {group.items.map((item) => (
              <li key={item.name} className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] px-2.5 py-2 ring-1 ring-white/[0.06]">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white">
                  <Image src={item.logo} alt="" className="size-[1.125rem] object-contain" />
                </span>
                <span className="min-w-0 text-[14px] leading-snug text-light/85">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
