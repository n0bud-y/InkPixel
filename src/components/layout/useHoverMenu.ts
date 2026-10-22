"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent, type MouseEvent, type PointerEvent } from "react";

// Waits before opening (so the mouse can cross the menu without opening it) and before
// closing (so it can travel from the button down to the panel).
const OPEN_DELAY = 100;
const CLOSE_DELAY = 200;

// Opening and closing for the header's mega menus (Services, Technologies). A mouse opens the
// menu by hovering it; the menu's button toggles it (click, Enter, touch). Esc (focus goes back
// to the button), a click outside, focus leaving it, or opening a page closes it. `onOpen` runs
// each time it opens.
export function useHoverMenu(onOpen?: () => void) {
  const pathname = usePathname();
  // The page the menu was opened on, so it is closed again on any other page.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const hovering = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const close = () => setOpenOn(null);
  const show = () => {
    if (!open) onOpen?.();
    setOpenOn(pathname);
  };

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
    timer.current = setTimeout(show, OPEN_DELAY);
  };

  const onPointerLeave = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    hovering.current = false;
    clearTimeout(timer.current);
    timer.current = setTimeout(close, CLOSE_DELAY);
  };

  const onBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) close();
  };

  // A mouse already opened it by hovering, so its click keeps it open rather than closing it.
  const toggle = () => (open && !hovering.current ? close() : show());

  // Also close when a link to the current page is clicked (the pathname does not change); not
  // when the click was cancelled (e.g. a first tap that only previews something).
  const closeOnLinkClick = (event: MouseEvent) => {
    if (!event.defaultPrevented && (event.target as HTMLElement).closest("a")) close();
  };

  return {
    open,
    close,
    toggle,
    button,
    closeOnLinkClick,
    /** Spread on the element around the button and the panel. */
    rootProps: { ref: root, onPointerEnter, onPointerLeave, onBlur },
  };
}
