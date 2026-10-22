"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { Button, DropIcon } from "@/components/ui/Button";
import { serviceCategories, type ServiceCategory } from "@/content/services";

// Waits before opening (so the mouse can cross the menu without opening it) and before
// closing (so it can travel from the button down to the panel).
const OPEN_DELAY = 100;
const CLOSE_DELAY = 200;
// Waits before a hovered category takes over, so a mouse heading diagonally for the cards
// doesn't flick through the categories it crosses.
const TAB_DELAY = 120;

// The category of the page you're on (its own page, or one of its services); else the first.
const categoryOf = (pathname: string) =>
  Math.max(
    0,
    serviceCategories.findIndex(
      (category) => category.href === pathname || category.services.some((service) => service.href === pathname),
    ),
  );

// A core service's page; until it has one (href in services.ts), its planned address
// (docs/architecture-plan.md), which shows "not found" until the page is built.
const pageOf = (category: ServiceCategory) => category.href ?? `/services/${category.slug}`;

// A white line icon as a shape filled with the brand gradient (CSS mask).
const maskOf = (src: string): CSSProperties => ({
  maskImage: `url(${src})`,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskImage: `url(${src})`,
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
});

// "Services" in the desktop menu: the word links to the Services page, and a mega menu under the
// header shows the services (src/content/services.ts, shared with the home page's services
// section). A mouse opens the menu by hovering the item; the arrow beside the word is a button
// that toggles it (click, Enter, touch). Esc, a click outside, focus leaving it, or opening a page
// closes it. The panel is positioned against the <header>, the nearest positioned ancestor.
//
// Inside: the six core services on the left, the chosen one's services as cards on the right
// (icon, name, one line), and a bar with "View all services" and a free-call button. Hovering a
// core service (or the arrow keys) shows its services; a click (or Enter) opens its page. On a
// touch screen the first tap shows its services and the second opens the page. It opens on the
// category of the page you're on.
export function ServicesMenu({
  label,
  className,
  active,
}: {
  label: string;
  /** The menu item's pill classes, from NavLinks. */
  className: string;
  /** On the Services page or a service page. */
  active: boolean;
}) {
  const pathname = usePathname();
  // The page the menu was opened on, so it is closed again on any other page.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const [tab, setTab] = useState(0);
  const category = serviceCategories[tab];

  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const hovering = useRef(false);
  // The pointer that pressed a core service ("" for a key), read by its click.
  const pointer = useRef("");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tabTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const panelId = useId();
  const tabId = (index: number) => `${panelId}-tab-${index}`;
  const tabPanelId = `${panelId}-panel`;

  const close = () => setOpenOn(null);
  const show = () => {
    if (!open) setTab(categoryOf(pathname));
    setOpenOn(pathname);
  };

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      clearTimeout(tabTimer.current);
    },
    [],
  );

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
    timer.current = setTimeout(show, OPEN_DELAY);
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    hovering.current = false;
    clearTimeout(timer.current);
    timer.current = setTimeout(close, CLOSE_DELAY);
  };

  // A mouse already opened it by hovering, so its click keeps it open rather than closing it.
  const toggle = () => (open && !hovering.current ? close() : show());

  // Also close when a link to the current page is clicked (the pathname does not change); not
  // for a first tap on a core service, which only shows its services.
  const closeOnLinkClick = (event: MouseEvent) => {
    if (!event.defaultPrevented && (event.target as HTMLElement).closest("a")) close();
  };

  const clickTab = (event: MouseEvent, index: number) => {
    clearTimeout(tabTimer.current);
    const touch = pointer.current !== "" && pointer.current !== "mouse";
    pointer.current = "";
    if (touch && index !== tab) {
      event.preventDefault();
      setTab(index);
    }
  };

  const hoverTab = (event: PointerEvent, index: number) => {
    if (event.pointerType !== "mouse") return;
    clearTimeout(tabTimer.current);
    tabTimer.current = setTimeout(() => setTab(index), TAB_DELAY);
  };

  const onTabKeyDown = (event: ReactKeyboardEvent) => {
    const count = serviceCategories.length;
    const next =
      event.key === "ArrowDown"
        ? (tab + 1) % count
        : event.key === "ArrowUp"
          ? (tab - 1 + count) % count
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? count - 1
              : null;
    if (next === null) return;
    event.preventDefault();
    setTab(next);
    document.getElementById(tabId(next))?.focus();
  };

  const tone = {
    card: "border-primary/10 bg-white text-primary shadow-[0_40px_80px_-32px_rgb(21_25_54_/_0.35)]",
    line: "border-primary/10",
    bar: "bg-primary/[0.025]",
    muted: "text-primary/60",
    tab: "text-primary/65 hover:text-primary",
    tabOn: "bg-primary/[0.05] text-primary",
    item: "hover:bg-primary/[0.04]",
    icon: "bg-primary/[0.04] ring-primary/[0.07]",
    title: "text-primary",
    link: "text-primary hover:text-crimson",
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
      <div className={`${className} items-center gap-1`}>
        <Link href="/services" aria-current={pathname === "/services" ? "page" : active ? "true" : undefined} onClick={close}>
          {label}
        </Link>
        <button
          ref={button}
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${label} menu`}
          className="-my-1 -mr-1.5 grid size-5 place-items-center rounded-full"
        >
          <svg
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            className={`size-2.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          >
            <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

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
            className={`pointer-events-auto max-h-[calc(100dvh-7.5rem)] overflow-y-auto overscroll-contain rounded-3xl border 2xl:max-h-[calc(100dvh-9.5rem)] ${tone.card}`}
          >
            <div className="grid grid-cols-[minmax(0,16rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,21rem)_minmax(0,1fr)]">
              {/* Core services: one stop in the Tab order (the chosen one), the arrow keys move between them. */}
              <ul aria-label="Core services" className={`flex flex-col gap-1 border-r p-3 2xl:p-4 ${tone.line}`}>
                {serviceCategories.map((item, index) => {
                  const selected = index === tab;
                  const href = pageOf(item);
                  return (
                    <li key={item.slug}>
                      <Link
                        id={tabId(index)}
                        href={href}
                        aria-current={pathname === href ? "page" : undefined}
                        tabIndex={selected ? 0 : -1}
                        onPointerEnter={(event) => hoverTab(event, index)}
                        onPointerLeave={() => clearTimeout(tabTimer.current)}
                        onPointerDown={(event) => (pointer.current = event.pointerType)}
                        onClick={(event) => clickTab(event, index)}
                        onKeyDown={onTabKeyDown}
                        className={`relative flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200 2xl:py-3.5 ${selected ? tone.tabOn : tone.tab}`}
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute inset-y-2.5 left-0 w-[3px] rounded-full bg-brand-gradient transition-opacity duration-200 ${selected ? "opacity-100" : "opacity-0"}`}
                        />
                        <span aria-hidden="true" className="font-mono text-[12px] tracking-[0.2em] text-crimson">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[16px] leading-tight font-medium tracking-[-0.01em] 2xl:text-[18px]">
                          {item.label}
                        </span>
                        <svg
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                          className={`ml-auto size-3 transition duration-200 ${selected ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`}
                        >
                          <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* The chosen category's services. */}
              <div id={tabPanelId} role="group" aria-labelledby={tabId(tab)} className="p-5 2xl:p-7">
                <div className="flex items-start justify-between gap-6 px-2">
                  <p className={`max-w-[36em] text-[14px] leading-relaxed 2xl:text-[15px] ${tone.muted}`}>{category.description}</p>
                  {category.href && (
                    <Link
                      href={category.href}
                      className={`group inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium transition-colors 2xl:text-[15px] ${tone.link}`}
                    >
                      Explore {category.label}
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  )}
                </div>

                <ul key={category.slug} className="mt-4 grid grid-cols-2 gap-1.5 motion-safe:animate-[rise_0.35s_var(--ease-out-soft)_both]">
                  {category.services.map((service) => {
                    const current = pathname === service.href;
                    return (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          aria-current={current ? "page" : undefined}
                          className={`group flex items-start gap-3.5 rounded-2xl p-3 transition-colors duration-200 2xl:gap-4 2xl:p-3.5 ${tone.item}`}
                        >
                          <span className={`grid size-11 shrink-0 place-items-center rounded-xl ring-1 2xl:size-12 ${tone.icon}`}>
                            <span
                              aria-hidden="true"
                              className="block size-6 bg-brand-gradient-reverse transition-transform duration-300 group-hover:scale-110 2xl:size-7"
                              style={maskOf(service.icon.src)}
                            />
                          </span>
                          <span className="min-w-0">
                            <span
                              className={`block text-[15px] leading-snug font-semibold 2xl:text-[16px] ${current ? "text-crimson" : tone.title}`}
                            >
                              {service.title}
                            </span>
                            <span className={`mt-1 block text-[13.5px] leading-snug 2xl:text-[14px] ${tone.muted}`}>
                              {service.description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* All services, and a call. */}
            <div className={`flex items-center justify-between gap-6 border-t px-6 py-4 2xl:px-8 2xl:py-5 ${tone.line} ${tone.bar}`}>
              <Link href="/services" className={`group inline-flex items-center gap-2 text-[15px] font-medium transition-colors ${tone.link}`}>
                View all services
                <DropIcon gradient className="h-[1.1em] w-auto transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <div className="flex items-center gap-4">
                <span className={`text-[15px] ${tone.muted}`}>Not sure where to start?</span>
                <Button href="/contact" size="sm" icon>
                  Book a free call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
