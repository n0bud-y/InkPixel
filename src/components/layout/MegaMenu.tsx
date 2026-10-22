"use client";

import { useId, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useHoverMenu } from "./useHoverMenu";

// A desktop menu item that is not a link, only a button opening a mega menu under the header
// (Technologies, Industries): the panel's content, then a bar with a short line and a button.
// Opens and closes like the Services menu (useHoverMenu): hover, or a click, Enter, or tap on the
// button. The panel is positioned against the <header>, the nearest positioned ancestor.
export function MegaMenu({
  label,
  className,
  active,
  callout,
  button: action,
  children,
}: {
  label: string;
  /** The menu item's pill classes, from NavLinks. */
  className: string;
  /** On the item's own page. */
  active: boolean;
  /** The bar under the content: a short line and a button. */
  callout: string;
  button: { label: string; href: string };
  children: ReactNode;
}) {
  const { open, toggle, button, closeOnLinkClick, rootProps } = useHoverMenu();
  const panelId = useId();

  return (
    <div {...rootProps}>
      <button
        ref={button}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={active ? "true" : undefined}
        className={`${className} items-center gap-1.5`}
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className={`-mr-0.5 size-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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
          <div className="pointer-events-auto max-h-[calc(100dvh-7.5rem)] scrollbar-brand overflow-y-auto overscroll-contain rounded-3xl border border-primary/10 bg-white text-primary shadow-[0_40px_80px_-32px_rgb(21_25_54_/_0.35)] 2xl:max-h-[calc(100dvh-9.5rem)]">
            {children}

            <div className="flex items-center justify-end gap-4 border-t border-primary/10 bg-primary/[0.025] px-6 py-4 2xl:px-8 2xl:py-5">
              <span className="text-[15px] text-primary/60">{callout}</span>
              <Button href={action.href} size="sm" icon>
                {action.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
