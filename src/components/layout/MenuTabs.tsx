"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent, type ReactNode } from "react";

// Waits before a hovered tab takes over, so a mouse heading diagonally for the panel doesn't
// flick through the tabs it crosses (as in the Services menu).
const TAB_DELAY = 120;

// The inside of a tabbed mega menu (Industries, Technologies), laid out like the Services menu:
// numbered tabs on the left, the chosen one's content on the right. The tabs are buttons, not
// links: hovering one (mouse), a click or tap, or the arrow keys, Home, and End choose it. Only
// the chosen tab is in the Tab order. `panel` renders a tab's content; the chosen one rises in on
// each change (not with reduced motion).
export function MenuTabs({
  label,
  tabs,
  panel,
}: {
  /** Names the tab list for screen readers. */
  label: string;
  tabs: string[];
  panel: (index: number) => ReactNode;
}) {
  const [tab, setTab] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const id = useId();
  const tabId = (index: number) => `${id}-tab-${index}`;
  const panelId = (index: number) => `${id}-panel-${index}`;

  useEffect(() => () => clearTimeout(timer.current), []);

  const hover = (event: PointerEvent, index: number) => {
    if (event.pointerType !== "mouse") return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setTab(index), TAB_DELAY);
  };

  const choose = (index: number) => {
    clearTimeout(timer.current);
    setTab(index);
  };

  const onKeyDown = (event: ReactKeyboardEvent) => {
    const count = tabs.length;
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
    choose(next);
    document.getElementById(tabId(next))?.focus();
  };

  return (
    <div className="grid grid-cols-[minmax(0,16rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] 2xl:grid-cols-[minmax(0,21rem)_minmax(0,1fr)]">
      <div role="tablist" aria-label={label} aria-orientation="vertical" className="flex flex-col gap-1 border-r border-primary/10 p-3 2xl:p-4">
        {tabs.map((name, index) => {
          const selected = index === tab;
          return (
            <button
              key={name}
              id={tabId(index)}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId(index)}
              tabIndex={selected ? 0 : -1}
              onPointerEnter={(event) => hover(event, index)}
              onPointerLeave={() => clearTimeout(timer.current)}
              onClick={() => choose(index)}
              onKeyDown={onKeyDown}
              className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors duration-200 2xl:py-3.5 ${
                selected ? "bg-primary/[0.05] text-primary" : "text-primary/65 hover:text-primary"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-y-2.5 left-0 w-[3px] rounded-full bg-brand-gradient transition-opacity duration-200 ${selected ? "opacity-100" : "opacity-0"}`}
              />
              <span aria-hidden="true" className="font-mono text-[12px] tracking-[0.2em] text-crimson">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-[16px] leading-tight font-medium tracking-[-0.01em] 2xl:text-[18px]">{name}</span>
              <svg
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className={`ml-auto size-3 shrink-0 transition duration-200 ${selected ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"}`}
              >
                <path d="M4.5 2.5 8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Every tab's content in one grid cell, only the chosen one visible: the menu keeps the
          tallest one's height, and the images are already loaded when a tab is chosen. */}
      <div className="grid p-5 2xl:p-7">
        {tabs.map((name, index) => {
          const selected = index === tab;
          return (
            <div
              key={name}
              id={panelId(index)}
              role="tabpanel"
              aria-labelledby={tabId(index)}
              inert={!selected}
              className={`[grid-area:1/1] ${selected ? "motion-safe:animate-[rise_0.35s_var(--ease-out-soft)_both]" : "invisible"}`}
            >
              {panel(index)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
