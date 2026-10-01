"use client";

import { createContext, useContext, useId, useState, type KeyboardEvent, type ReactNode } from "react";

// Accessible, unstyled tabs (WAI-ARIA tabs pattern):
// - Arrow keys move between tabs (left/right and up/down, so vertical and horizontal
//   layouts both work), Home/End jump to the ends; focus activates the tab.
// - Only the active tab is in the Tab order; panels are linked to their tabs.
// - Inactive panels stay in the HTML with `hidden`, so all content is indexable.
// Style with `data-state="active" | "inactive"`, e.g. `data-[state=active]:bg-crimson`.

type TabsContextValue = {
  value: string;
  select: (value: string) => void;
  baseId: string;
};

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab components must be used inside <Tabs>.");
  return context;
}

const tabId = (baseId: string, value: string) => `${baseId}-tab-${value}`;
const panelId = (baseId: string, value: string) => `${baseId}-panel-${value}`;

// Scrolls a sideways-scrolling tab row so the tab is fully visible. Only the row scrolls,
// never the page (so it is safe with smooth scrolling).
function revealInList(tab: HTMLElement) {
  const list = tab.closest<HTMLElement>('[role="tablist"]');
  if (!list || list.scrollWidth <= list.clientWidth) return;
  const tabBox = tab.getBoundingClientRect();
  const listBox = list.getBoundingClientRect();
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  if (tabBox.left < listBox.left) {
    list.scrollBy({ left: tabBox.left - listBox.left - 16, behavior });
  } else if (tabBox.right > listBox.right) {
    list.scrollBy({ left: tabBox.right - listBox.right + 16, behavior });
  }
}

export function Tabs({
  defaultValue,
  onValueChange,
  className,
  children,
}: {
  defaultValue: string;
  /** Called when the active tab changes, e.g. to start an animation. */
  onValueChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
}) {
  const [value, setValue] = useState(defaultValue);
  const baseId = useId();
  const select = (next: string) => {
    if (next === value) return;
    setValue(next);
    onValueChange?.(next);
  };

  return (
    <TabsContext value={{ value, select, baseId }}>
      <div className={className}>{children}</div>
    </TabsContext>
  );
}

export function TabList({
  label,
  className,
  children,
}: {
  /** Accessible name for the tab list, e.g. "Service categories". */
  label: string;
  className?: string;
  children: ReactNode;
}) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)'),
    );
    const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
    if (current === -1) return;

    const last = tabs.length - 1;
    const next = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowDown: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      ArrowUp: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next === undefined) return;

    event.preventDefault();
    tabs[next].focus({ preventScroll: true });
    tabs[next].click();
  };

  return (
    <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className={className}>
      {children}
    </div>
  );
}

export function Tab({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: ReactNode;
}) {
  const { value: selected, select, baseId } = useTabs();
  const active = selected === value;

  return (
    <button
      type="button"
      role="tab"
      id={tabId(baseId, value)}
      aria-selected={active}
      aria-controls={panelId(baseId, value)}
      tabIndex={active ? 0 : -1}
      data-state={active ? "active" : "inactive"}
      onClick={(event) => {
        select(value);
        revealInList(event.currentTarget);
      }}
      className={className}
    >
      {children}
    </button>
  );
}

export function TabPanel({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: ReactNode;
}) {
  const { value: selected, baseId } = useTabs();
  const active = selected === value;

  return (
    <div
      role="tabpanel"
      id={panelId(baseId, value)}
      aria-labelledby={tabId(baseId, value)}
      hidden={!active}
      tabIndex={0}
      data-state={active ? "active" : "inactive"}
      className={className}
    >
      {children}
    </div>
  );
}
