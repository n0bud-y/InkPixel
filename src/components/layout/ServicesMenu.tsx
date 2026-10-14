"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { DropIcon } from "@/components/ui/Button";
import { serviceCategories } from "@/content/services";

// Waits before opening (so the mouse can cross the menu without opening it) and before
// closing (so it can travel from the button down to the panel).
const OPEN_DELAY = 100;
const CLOSE_DELAY = 200;

// "Services" in the desktop menu: a button that opens a mega menu under the header with every
// service category (src/content/services.ts, shared with the home page's services section).
// A mouse opens it on hover; a click or Enter toggles it. Esc, a click
// outside, focus leaving it, or opening a page closes it. The panel is positioned against the
// <header>, the nearest positioned ancestor.
export function ServicesMenu({
  label,
  className,
  light,
}: {
  label: string;
  /** The menu item's pill classes, from NavLinks. */
  className: string;
  /** White header (case studies): a white panel with dark text. */
  light: boolean;
}) {
  const pathname = usePathname();
  // The page the menu was opened on, so it is closed again on any other page.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const hovering = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const panelId = useId();

  const close = () => setOpenOn(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenOn(null);
      if (root.current?.contains(document.activeElement)) button.current?.focus();
    };
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpenOn(null);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const onPointerEnter = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    hovering.current = true;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenOn(pathname), OPEN_DELAY);
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    hovering.current = false;
    clearTimeout(timer.current);
    timer.current = setTimeout(close, CLOSE_DELAY);
  };

  // A mouse already opened it by hovering, so its click keeps it open rather than closing it.
  const toggle = () => setOpenOn(open && !hovering.current ? null : pathname);

  // Also close when a link to the current page is clicked (the pathname does not change).
  const closeOnLinkClick = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest("a")) close();
  };

  return (
    <div
      ref={root}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={(event) => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <button
        ref={button}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        className={`${className} items-center gap-1.5`}
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`size-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* The full-width layer lets clicks through beside the card. */}
      <div
        id={panelId}
        onClick={closeOnLinkClick}
        className={[
          "pointer-events-none absolute inset-x-0 top-full pt-3 transition duration-200 ease-out motion-reduce:transition-none",
          open ? "visible opacity-100" : "invisible -translate-y-2 opacity-0",
        ].join(" ")}
      >
        <div className="container-site">
          <div
            className={[
              "pointer-events-auto max-h-[calc(100dvh-7.5rem)] overflow-y-auto overscroll-contain rounded-3xl border p-8 2xl:max-h-[calc(100dvh-9.5rem)] 2xl:p-10",
              light
                ? "border-primary/10 bg-white text-primary shadow-[0_40px_80px_-32px_rgb(21_25_54_/_0.35)]"
                : "border-white/[0.08] bg-primary bg-[radial-gradient(90%_70%_at_100%_0%,rgb(201_29_76_/_0.16),transparent_60%)] text-light shadow-[0_40px_80px_-32px_rgb(0_0_0_/_0.7)]",
            ].join(" ")}
          >
            <ul className="grid grid-cols-3 gap-x-10 gap-y-8 xl:gap-x-16 2xl:gap-x-20">
              {serviceCategories.map((category, index) => {
                const headingId = `${panelId}-${index}`;
                return (
                  <li key={category.slug}>
                    <p
                      id={headingId}
                      className={`flex items-baseline gap-3 border-b pb-3 font-display text-lg leading-tight font-medium tracking-[-0.01em] 2xl:text-xl ${light ? "border-primary/10" : "border-white/[0.08] text-white"}`}
                    >
                      <span aria-hidden="true" className="font-mono text-[11px] tracking-[0.2em] text-crimson">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {category.label}
                    </p>
                    <ul aria-labelledby={headingId} className="mt-3">
                      {category.services.map((service) => {
                        const current = pathname === service.href;
                        return (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              aria-current={current ? "page" : undefined}
                              className={[
                                "-mx-2 block rounded-lg px-2 py-1.5 text-[13px] leading-snug transition-colors duration-200 2xl:text-[15px]",
                                light
                                  ? current
                                    ? "text-crimson"
                                    : "text-primary/70 hover:bg-primary/[0.04] hover:text-primary"
                                  : current
                                    ? "text-white"
                                    : "text-light/65 hover:bg-white/[0.05] hover:text-white",
                              ].join(" ")}
                            >
                              {service.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>

            <div className={`mt-8 border-t pt-5 ${light ? "border-primary/10" : "border-white/[0.08]"}`}>
              <Link
                href="/services"
                className={`group inline-flex items-center gap-2 text-sm font-medium transition-colors ${light ? "text-primary hover:text-crimson" : "text-white hover:text-coral"}`}
              >
                View all services
                <DropIcon gradient className="h-[1.1em] w-auto transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
