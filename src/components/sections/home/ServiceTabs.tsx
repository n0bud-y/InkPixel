"use client";

import { useRef, useState } from "react";
import { Button, DropIcon } from "@/components/ui/Button";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/Tabs";
import type { ServiceCategory } from "@/content/services";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

// The brand gradient, as defined by --gradient in globals.css. Keep the two in sync.
const GRADIENT = {
  angle: 132.34,
  from: { color: "#c91d4c", at: 0.02 },
  to: { color: "#fa6143", at: 0.9777 },
};

type Box = { left: number; top: number; width: number; height: number };
type Stops = [number, number];

// Colour stops (0–1) that make `box` show exactly the slice of the panel's gradient that
// lies behind it, extended smoothly beyond the panel's edge. CSS linear-gradient geometry:
// the gradient line runs through the box centre at `angle`, with length |w·sin| + |h·cos|.
function sliceStops(box: Box, panel: Box): Stops {
  const radians = (GRADIENT.angle * Math.PI) / 180;
  const dx = Math.sin(radians);
  const dy = -Math.cos(radians);
  const lineLength = (b: Box) => Math.abs(b.width * dx) + Math.abs(b.height * dy);
  const offset =
    (box.left + box.width / 2 - (panel.left + panel.width / 2)) * dx +
    (box.top + box.height / 2 - (panel.top + panel.height / 2)) * dy;
  const toBox = (at: number) => ((at - 0.5) * lineLength(panel) - offset) / lineLength(box) + 0.5;
  return [toBox(GRADIENT.from.at), toBox(GRADIENT.to.at)];
}

const gradientCss = ([a, b]: Stops) =>
  `linear-gradient(${GRADIENT.angle}deg, ${GRADIENT.from.color} ${(a * 100).toFixed(3)}%, ${GRADIENT.to.color} ${(b * 100).toFixed(3)}%)`;

// Divider lines between grid cells: 1 column on phones, 2 from `sm`, 3 from `xl`.
// Every breakpoint sets both edges explicitly, so the rules never conflict.
function cellBorders(index: number) {
  return [
    index > 0 ? "border-t" : "",
    index >= 2 ? "sm:border-t" : "sm:border-t-0",
    index % 2 === 1 ? "sm:border-l" : "sm:border-l-0",
    index >= 3 ? "xl:border-t" : "xl:border-t-0",
    index % 3 !== 0 ? "xl:border-l" : "xl:border-l-0",
  ].join(" ");
}

// Phones and tablets: pills in a sideways-scrolling row. Desktop: rows in the glass panel,
// reaching 20px past it on the left and across the gap into the gradient panel on the right.
// Until the sliding indicator is measured (and without JavaScript), the active tab paints
// itself crimson, with concave corners from before/after.
function tabClass(indicatorReady: boolean) {
  return [
    "group relative flex shrink-0 items-center justify-between gap-4 font-display transition-colors duration-300",
    "rounded-full border border-white/15 px-4 py-2.5 text-[15px] text-light/85 hover:text-white",
    "data-[state=active]:border-crimson data-[state=active]:bg-crimson data-[state=active]:text-white",
    "lg:-mr-[calc(1.25rem+1px)] lg:-ml-5 lg:h-[clamp(4rem,5.5vw,6.625rem)] lg:rounded-l-[0.875rem] lg:rounded-r-none lg:border-0",
    "lg:pr-[calc(1.25rem+3.4vw)] lg:pl-[calc(1.25rem+2.5vw)] lg:text-[clamp(1.25rem,1.95vw,2.375rem)] lg:tracking-[-0.01em]",
    indicatorReady
      ? "lg:data-[state=active]:bg-transparent"
      : [
          "lg:before:pointer-events-none lg:before:absolute lg:before:right-0 lg:before:bottom-full lg:before:size-5 lg:before:opacity-0",
          "lg:before:bg-[radial-gradient(circle_at_0_0,transparent_1.25rem,var(--crimson)_calc(1.25rem+0.5px))]",
          "lg:after:pointer-events-none lg:after:absolute lg:after:top-full lg:after:right-0 lg:after:size-5 lg:after:opacity-0",
          "lg:after:bg-[radial-gradient(circle_at_0_100%,transparent_1.25rem,var(--crimson)_calc(1.25rem+0.5px))]",
          "lg:data-[state=active]:before:opacity-100 lg:data-[state=active]:after:opacity-100",
        ].join(" "),
  ].join(" ");
}

export function ServiceTabs({ categories }: { categories: ServiceCategory[] }) {
  const root = useRef<HTMLDivElement>(null);
  const glass = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const currentStops = useRef<Stops | null>(null);
  const firstRun = useRef(true);
  const [active, setActive] = useState(categories[0].slug);
  const [indicatorReady, setIndicatorReady] = useState(false);

  // Where the indicator should be for the active tab, or null when it is hidden (below lg).
  const measure = () => {
    const highlight = indicator.current;
    const list = glass.current;
    const content = panel.current;
    if (!highlight || !list || !content || getComputedStyle(highlight).display === "none") return null;
    const tab = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
    if (!tab) return null;

    // Exact (sub-pixel) boxes: offsetLeft/offsetWidth round to whole pixels, which can leave a
    // hairline gap at the join. The highlight also reaches 1px under the panel for the same reason.
    const listBox = list.getBoundingClientRect();
    const panelBox = content.getBoundingClientRect();
    const tabBox = tab.getBoundingClientRect();
    const gap = panelBox.left - listBox.right;
    const box = {
      left: tabBox.left,
      top: tabBox.top - gap,
      width: panelBox.left + 1 - tabBox.left,
      height: tabBox.height + gap * 2,
    };
    return {
      gap,
      x: box.left - listBox.left - list.clientLeft,
      y: box.top - listBox.top - list.clientTop,
      width: box.width,
      height: box.height,
      stops: sliceStops(box, panelBox),
    };
  };

  // Place the indicator without animation: on load and whenever the layout changes size.
  useGSAP(
    () => {
      const place = () => {
        const target = measure();
        if (!target) return;
        gsap.set(indicator.current, {
          x: target.x,
          y: target.y,
          width: target.width,
          height: target.height,
          "--r": `${target.gap}px`,
          backgroundImage: gradientCss(target.stops),
          autoRound: false, // keep the exact sub-pixel size (GSAP rounds px sizes by default)
        });
        currentStops.current = target.stops;
        setIndicatorReady(true);
      };
      place();
      const observer = new ResizeObserver(place);
      if (glass.current) observer.observe(glass.current);
      if (panel.current) observer.observe(panel.current);
      return () => observer.disconnect();
    },
    { scope: root },
  );

  // On tab change: slide the indicator (its gradient slice moves with it, so the join with
  // the panel stays seamless on every frame), then cascade the new services in.
  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      const motion = window.matchMedia(MOTION_OK).matches;
      const duration = motion ? 0.6 : 0;

      const target = measure();
      if (target && currentStops.current) {
        const stops = { a: currentStops.current[0], b: currentStops.current[1] };
        gsap.to(indicator.current, { y: target.y, duration, ease: "power3.inOut", overwrite: true });
        gsap.to(stops, {
          a: target.stops[0],
          b: target.stops[1],
          duration,
          ease: "power3.inOut",
          overwrite: true,
          onUpdate: () => {
            currentStops.current = [stops.a, stops.b];
            gsap.set(indicator.current, { backgroundImage: gradientCss([stops.a, stops.b]) });
          },
        });
      }

      if (!motion) return;
      const shown = panel.current?.querySelector('[role="tabpanel"]:not([hidden])');
      if (!shown) return;
      gsap.fromTo(
        shown.querySelectorAll("[data-item]"),
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.06, overwrite: true },
      );
      gsap.fromTo(
        shown.querySelectorAll("[data-item] img"),
        { scale: 0.7, rotate: -8 },
        { scale: 1, rotate: 0, duration: 0.7, ease: "back.out(2)", stagger: 0.06, overwrite: true },
      );
    },
    { dependencies: [active], scope: root },
  );

  return (
    <div ref={root}>
      <Tabs
        defaultValue={categories[0].slug}
        onValueChange={setActive}
        className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,33.6%)_minmax(0,1fr)] lg:gap-5"
      >
        {/* Glass panel on desktop; a plain sideways-scrolling row on smaller screens.
            Its padding (44px) must stay ≥ the gap (20px) + the gradient panel's corner radius
            (24px), so the highlight's curved corners never run into the panel's rounded corner. */}
        <div
          ref={glass}
          className="relative lg:rounded-3xl lg:border lg:border-white/10 lg:bg-white/20 lg:py-11 lg:backdrop-blur-md"
        >
          <div
            ref={indicator}
            aria-hidden="true"
            className={`tab-indicator pointer-events-none absolute top-0 left-0 hidden lg:block ${indicatorReady ? "opacity-100" : "opacity-0"}`}
          />
          <TabList
            label="Service categories"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {categories.map((category) => (
              <Tab key={category.slug} value={category.slug} className={tabClass(indicatorReady)}>
                {/* Divider above each tab, hidden next to the active one. */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-[calc(1.25rem+1.6vw)] left-[calc(1.25rem+2.5vw)] hidden h-px bg-white/10 lg:block lg:group-first:hidden lg:group-data-[state=active]:hidden lg:[[data-state=active]+*_&]:hidden"
                />
                <span className="transition-transform duration-300 ease-out lg:group-data-[state=inactive]:group-hover:translate-x-1.5">
                  {category.label}
                </span>
                <DropIcon className="hidden h-[clamp(1rem,1.1vw,1.375rem)] w-auto shrink-0 transition-transform duration-300 lg:block group-data-[state=inactive]:text-light/50 group-data-[state=inactive]:*:fill-transparent group-data-[state=inactive]:*:stroke-current group-data-[state=inactive]:*:[stroke-width:0.7] lg:group-hover:scale-110" />
              </Tab>
            ))}
          </TabList>
        </div>

        <div
          ref={panel}
          className="rounded-3xl bg-brand-gradient px-5 py-6 text-white sm:px-8 sm:py-8 lg:px-[min(3.1vw,3.75rem)] lg:py-[min(2.4vw,2.875rem)]"
        >
          {categories.map((category) => (
            <TabPanel key={category.slug} value={category.slug} className="h-full rounded-2xl">
              {category.services.length > 0 ? (
                <ul className="grid h-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2">
                  {category.services.map((service, index) => (
                    <li
                      key={service.title}
                      data-item
                      className={`flex items-center justify-center border-white/30 px-4 py-8 xl:px-2 xl:py-6 ${cellBorders(index)}`}
                    >
                      <FeatureItem
                        icon={service.icon}
                        title={service.title}
                        description={service.description}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  data-item
                  className="flex h-full min-h-72 flex-col items-center justify-center px-4 py-10 text-center"
                >
                  <DropIcon className="h-10 w-auto opacity-90" />
                  <p className="mt-6 font-display text-[clamp(1.5rem,2vw,2.25rem)] leading-tight font-medium">
                    {category.label} services are coming soon
                  </p>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/90">
                    We&apos;re putting the details together. Tell us about your project in the
                    meantime.
                  </p>
                  <Button href="/contact" variant="secondary" className="mt-8">
                    Talk to us
                  </Button>
                </div>
              )}
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
