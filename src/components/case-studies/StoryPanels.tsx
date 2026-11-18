"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import type { CaseStudyItem, ContentfulImage } from "@/contentful/queries/case-studies";
import { ScrollSmoother, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

const PINNED = "(min-width: 64rem) and (prefers-reduced-motion: no-preference)";

// A panel's text: one paragraph per line. A line that starts with a short label and a colon
// ("The problem: …", "What we did: …") shows the label in small red capitals above it.
function PanelText({ text }: { text: string }) {
  const lines = text.split("\n").filter((line) => line.trim());
  return (
    <div className="mt-2.5 space-y-3 text-[clamp(0.9375rem,0.95vw,1.0625rem)] leading-[1.7] text-primary/75">
      {lines.map((line, index) => {
        const match = line.match(/^([^:]{2,24}):\s+(.+)$/);
        return match ? (
          <p key={index}>
            <span className="block font-mono text-[11px] font-medium tracking-[0.16em] text-crimson uppercase">{match[1]}</span>
            {match[2]}
          </p>
        ) : (
          <p key={index}>{line}</p>
        );
      })}
    </div>
  );
}

// "Story panels" (cards layout, 0016). Desktop with motion allowed: the section locks to one
// screen (below the fixed header, normal padding, both columns centred); on the left the heading,
// the cards as a numbered list, and a progress bar; on the right one large panel (the card's image,
// number, title, and text). Scrolling moves to the next card and the panel crossfades; the list's
// items jump to their card. Everywhere else (phones, tablets, reduced motion, no JavaScript): the
// heading, then every card as its own panel. `data-pinned` on the wrapper switches the layouts.
export function StoryPanels({
  heading,
  items,
  images,
  tone,
}: {
  heading: ReactNode;
  items: CaseStudyItem[];
  images: (ContentfulImage | null)[];
  tone: "dark" | "light";
}) {
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const last = items.length - 1;
  const dark = tone === "dark";

  useGSAP(
    () => {
      const wrapper = root.current;
      const section = wrapper?.closest("section");
      if (!wrapper || !section || items.length < 2) return;

      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        const header = () => document.querySelector("header")?.offsetHeight ?? 0;
        const sync = () => wrapper.style.setProperty("--pin-top", `${header()}px`);
        sync();
        // While locked, the section's padding is a little smaller than usual (still generous), so
        // heading, list, and panel fit one screen below the header from laptop to large screens.
        const frame = wrapper.parentElement;
        if (frame) {
          frame.style.setProperty("--pin-pad", "clamp(3rem, 3.8vw, 4.5rem)");
          frame.style.paddingTop = frame.style.paddingBottom = "var(--pin-pad)";
        }
        wrapper.dataset.pinned = "true";
        trigger.current = ScrollTrigger.create({
          trigger: section,
          start: () => `top ${header()}px`,
          end: () => `+=${last * window.innerHeight * 0.7}`,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onRefresh: sync,
          onUpdate: (self) => setActive(Math.min(last, Math.round(self.progress * last))),
        });
        ScrollTrigger.refresh();
        return () => {
          if (frame) {
            frame.style.removeProperty("--pin-pad");
            frame.style.paddingTop = frame.style.paddingBottom = "";
          }
          delete wrapper.dataset.pinned;
          trigger.current = null;
          setActive(0);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Scrolls to the point where card `index` is shown (smooth scrolling when it is on).
  const go = (index: number) => {
    const st = trigger.current;
    if (!st) return;
    const y = st.start + ((st.end - st.start) * index) / last + 1;
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(y, true);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const number = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <div
      ref={root}
      className="group/story data-[pinned=true]:grid data-[pinned=true]:min-h-[calc(100svh-var(--pin-top,6rem)-2*var(--pin-pad,4rem))] data-[pinned=true]:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] data-[pinned=true]:items-center data-[pinned=true]:gap-[clamp(2.5rem,5vw,6.5rem)]"
    >
      <div>
        {heading}

        {/* The cards as a numbered list, and the progress bar: only while locked. */}
        <ol aria-label="Steps" className="mt-[clamp(1.75rem,2.6vw,3rem)] hidden group-data-[pinned=true]/story:block">
          {items.map((item, index) => {
            const current = index === active;
            return (
              <li key={item.title}>
                <button
                  type="button"
                  onClick={() => go(index)}
                  aria-current={current ? "step" : undefined}
                  className={[
                    "group/step flex w-full cursor-pointer items-center gap-4 border-b py-[clamp(0.7rem,1vw,1rem)] text-left transition-colors duration-300",
                    dark ? "border-white/10" : "border-primary/10",
                    current ? (dark ? "text-white" : "text-primary") : dark ? "text-light/45 hover:text-light/80" : "text-primary/45 hover:text-primary/80",
                  ].join(" ")}
                >
                  <span className={`font-mono text-[12px] tracking-[0.18em] transition-colors ${current ? "text-coral" : ""}`}>{number(index)}</span>
                  <span className="font-display text-[clamp(1.0625rem,1.35vw,1.5rem)] leading-tight font-semibold">{item.title}</span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto h-[3px] rounded-full bg-brand-gradient transition-all duration-500 ease-out ${current ? "w-10 opacity-100" : "w-0 opacity-0"}`}
                  />
                </button>
              </li>
            );
          })}
        </ol>
        <div aria-hidden="true" className="mt-[clamp(1.25rem,1.6vw,1.75rem)] hidden items-center gap-4 group-data-[pinned=true]/story:flex">
          <span className={`h-[3px] flex-1 overflow-hidden rounded-full ${dark ? "bg-white/10" : "bg-primary/10"}`}>
            <span
              className="block h-full rounded-full bg-brand-gradient transition-[width] duration-500 ease-out"
              style={{ width: `${((active + 1) / items.length) * 100}%` }}
            />
          </span>
          <span className={`font-mono text-[12px] tracking-[0.18em] ${dark ? "text-light/60" : "text-primary/55"}`}>
            {number(active)} / {number(last)}
          </span>
        </div>
      </div>

      {/* The panels: one at a time in the same place while locked, otherwise all, in a grid. */}
      <ul className="mt-[clamp(2rem,3vw,3.5rem)] grid gap-[clamp(1rem,1.6vw,2rem)] sm:grid-cols-2 group-data-[pinned=true]/story:mt-0 group-data-[pinned=true]/story:grid-cols-1">
        {items.map((item, index) => {
          const image = images[index] ?? null;
          const portrait = image ? image.height > image.width : false;
          return (
            <li
              key={item.title}
              data-active={index === active}
              className="overflow-hidden rounded-[1.6rem] bg-white text-primary shadow-[0_40px_80px_-40px_rgb(0_0_0_/_0.6)] group-data-[pinned=true]/story:flex group-data-[pinned=true]/story:max-h-[calc(100svh-var(--pin-top,6rem)-2*var(--pin-pad,4rem))] group-data-[pinned=true]/story:flex-col group-data-[pinned=true]/story:[grid-area:1/1] group-data-[pinned=true]/story:transition-[opacity,translate,visibility] group-data-[pinned=true]/story:duration-500 group-data-[pinned=true]/story:ease-out group-data-[pinned=true]/story:data-[active=false]:invisible group-data-[pinned=true]/story:data-[active=false]:translate-y-6 group-data-[pinned=true]/story:data-[active=false]:opacity-0"
            >
              {image && (
                <div
                  className={`relative aspect-video min-h-0 w-full shrink overflow-hidden group-data-[pinned=true]/story:max-h-[46svh] ${portrait ? "bg-[radial-gradient(circle_at_50%_40%,#2a2f55,#0b0d1f)]" : "bg-[#0b0d1f]"}`}
                >
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    unoptimized={image.isSvg}
                    sizes="(min-width: 1024px) 50vw, (min-width: 640px) 45vw, 92vw"
                    className={portrait ? "object-contain py-4" : "object-cover"}
                  />
                </div>
              )}
              <div className="shrink-0 px-[clamp(1.25rem,2vw,2.25rem)] py-[clamp(1.25rem,1.8vw,2rem)]">
                <p className="font-mono text-[12px] tracking-[0.18em] text-coral">{number(index)}</p>
                <h3 className="mt-2 font-display text-[clamp(1.25rem,1.6vw,1.875rem)] leading-tight font-semibold tracking-[-0.01em]">
                  {item.title}
                </h3>
                {item.text && <PanelText text={item.text} />}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
