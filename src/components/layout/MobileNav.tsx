"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { contactCta, mainNav } from "@/lib/site";
import { isActive } from "./NavLinks";

// Phone and tablet menu: a full-screen native <dialog>, which gives focus trapping,
// Esc to close, and an inert page behind it for free.
export function MobileNav({ logo, isLightHeader = false }: { logo: ReactNode; isLightHeader?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

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
          isLightHeader
            ? "border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200"
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
