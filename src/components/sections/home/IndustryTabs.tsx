"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { FeatureItem } from "@/components/ui/FeatureItem";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/Tabs";
import type { Industry } from "@/content/industries";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

// Dividers in a 2-column grid (1 column on phones): left line on the second column, top line
// from the second row. Every breakpoint sets both edges explicitly, so the rules never conflict.
function cellBorders(index: number) {
  return [
    index > 0 ? "border-t" : "",
    index >= 2 ? "sm:border-t" : "sm:border-t-0",
    index % 2 === 1 ? "sm:border-l" : "sm:border-l-0",
  ].join(" ");
}

// Colours for navy sections (home) and cream ones (About). Class names are written out in
// full, because Tailwind only generates classes it can find in the source.
const tones = {
  onDark: {
    band: "from-white/[0.01] via-white/[0.15] via-25% to-white/20",
    activeBand:
      "lg:data-[state=active]:from-white/[0.01] lg:data-[state=active]:via-white/[0.15] lg:data-[state=active]:via-25% lg:data-[state=active]:to-white/20",
    pill: "border-white/15 text-light/85",
    row: "lg:text-white",
    rowDescription: "text-white/55",
    panelDescription: "text-white/70",
    solutions: "text-white",
    cells: "border-white/25",
  },
  onLight: {
    band: "from-coral/0 via-coral/15 via-25% to-coral/[0.22]",
    activeBand:
      "lg:data-[state=active]:from-coral/0 lg:data-[state=active]:via-coral/15 lg:data-[state=active]:via-25% lg:data-[state=active]:to-coral/[0.22]",
    pill: "border-primary/15 text-primary/80",
    // The active pill's white text (phones) would otherwise stay white on the desktop band.
    row: "lg:text-primary lg:data-[state=active]:text-primary",
    rowDescription: "text-primary/60",
    panelDescription: "text-primary/70",
    solutions: "text-primary",
    cells: "border-crimson/20",
  },
};

// Industry tabs: the list on the left picks which solutions show on the right.
// - Desktop: a soft band behind the active industry reaches from the screen's left edge; it
//   slides to the new industry on change, and the new solutions cascade in (GSAP; instant
//   for reduced motion). Until the band is measured (or without JavaScript), the active row
//   paints the band itself.
// - Phones and tablets: the industries become a sideways-scrolling row of pills, and the
//   active industry's description shows above its solutions.
export function IndustryTabs({
  industries,
  tone = "onDark",
}: {
  industries: Industry[];
  tone?: "onDark" | "onLight";
}) {
  const colors = tones[tone];
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const band = useRef<HTMLDivElement>(null);
  const panels = useRef<HTMLDivElement>(null);
  const firstRun = useRef(true);
  const [active, setActive] = useState(industries[0].slug);
  const [bandReady, setBandReady] = useState(false);

  const measure = () => {
    const highlight = band.current;
    const column = list.current;
    if (!highlight || !column || getComputedStyle(highlight).display === "none") return null;
    const tab = column.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
    return tab ? { y: tab.offsetTop, height: tab.offsetHeight } : null;
  };

  // Place the band without animation on load and whenever the layout changes size.
  useGSAP(
    () => {
      const place = () => {
        const target = measure();
        if (!target) return;
        gsap.set(band.current, { y: target.y, height: target.height });
        setBandReady(true);
      };
      place();
      const observer = new ResizeObserver(place);
      if (list.current) observer.observe(list.current);
      return () => observer.disconnect();
    },
    { scope: root },
  );

  // On change: slide the band, then cascade the new solutions in.
  useGSAP(
    () => {
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      const motion = window.matchMedia(MOTION_OK).matches;
      const target = measure();
      if (target) {
        gsap.to(band.current, { ...target, duration: motion ? 0.55 : 0, ease: "power3.inOut", overwrite: true });
      }
      if (!motion) return;
      const shown = panels.current?.querySelector('[role="tabpanel"]:not([hidden])');
      if (!shown) return;
      gsap.fromTo(
        shown.querySelectorAll("[data-item]"),
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.55, ease: "power3.out", stagger: 0.06, overwrite: true },
      );
    },
    { dependencies: [active], scope: root },
  );

  return (
    <div ref={root}>
      <Tabs
        defaultValue={industries[0].slug}
        onValueChange={setActive}
        className="grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,795fr)_minmax(0,663fr)] lg:items-center lg:gap-x-[7vw]"
      >
        <div ref={list} className="relative">
          {/* Desktop band: from the screen's left edge to the end of the list column. */}
          <div
            ref={band}
            aria-hidden="true"
            className={`pointer-events-none absolute top-0 right-0 -left-[min(7.5vw,9rem)] hidden bg-linear-to-r ${colors.band} lg:block ${bandReady ? "opacity-100" : "opacity-0"}`}
          />
          <TabList
            label="Industries"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {industries.map((industry) => (
              <Tab
                key={industry.slug}
                value={industry.slug}
                className={[
                  `group relative flex shrink-0 items-center gap-3 rounded-full border py-2 pr-4 pl-2 text-left text-[15px] transition-colors duration-300 ${colors.pill}`,
                  "data-[state=active]:border-crimson data-[state=active]:bg-crimson data-[state=active]:text-white",
                  `lg:gap-[clamp(1.25rem,2vw,2.4rem)] lg:rounded-none lg:border-0 lg:border-b lg:border-crimson/50 lg:bg-transparent lg:py-[clamp(1.25rem,1.6vw,1.95rem)] lg:pr-0 lg:pl-0 lg:last:border-b-0 ${colors.row}`,
                  "lg:data-[state=active]:bg-transparent",
                  // Before the band is measured (and without JavaScript), the active row paints it.
                  bandReady
                    ? ""
                    : `lg:data-[state=active]:-ml-[min(7.5vw,9rem)] lg:data-[state=active]:pl-[min(7.5vw,9rem)] lg:data-[state=active]:bg-linear-to-r ${colors.activeBand}`,
                ].join(" ")}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-gradient shadow-[0_10px_24px_-10px_rgb(250_97_67_/_0.8)] transition-transform duration-300 group-hover:scale-105 lg:size-[clamp(3.5rem,4.15vw,5rem)]">
                  <Image src={industry.icon} alt="" width={48} height={48} className="size-1/2" />
                </span>
                {/* Right margin keeps the text off the band's right edge. */}
                <span className="min-w-0 lg:pr-[clamp(1.5rem,2.5vw,3rem)]">
                  <span className="block font-display leading-[1.2] font-medium lg:text-[clamp(1.375rem,1.67vw,2rem)] lg:tracking-[-0.015em]">
                    {industry.label}
                  </span>
                  <span className={`mt-1 hidden text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.3] lg:block ${colors.rowDescription}`}>
                    {industry.description}
                  </span>
                </span>
              </Tab>
            ))}
          </TabList>
        </div>

        <div ref={panels}>
          {industries.map((industry) => (
            <TabPanel key={industry.slug} value={industry.slug} className="rounded-2xl">
              {/* Phones and tablets: the description the desktop list shows in each row. */}
              <p className={`mb-6 text-[15px] leading-relaxed lg:hidden ${colors.panelDescription}`}>{industry.description}</p>
              <ul className={`grid grid-cols-1 sm:grid-cols-2 ${colors.solutions}`}>
                {industry.solutions.map((solution, index) => (
                  <li
                    key={solution.title}
                    data-item
                    className={`flex items-center justify-center px-4 py-8 lg:px-2 lg:py-[clamp(1rem,1.2vw,1.45rem)] ${colors.cells} ${cellBorders(index)}`}
                  >
                    <FeatureItem
                      icon={solution.icon}
                      title={solution.title}
                      description={solution.description}
                      iconTone="gradient"
                      size="lg"
                    />
                  </li>
                ))}
              </ul>
            </TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
