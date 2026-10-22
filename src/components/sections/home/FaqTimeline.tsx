"use client";

import { useRef } from "react";
import {
  TimelineLine,
  TimelineMarker,
  timelineCard,
  timelineGap,
  timelineGutter,
} from "@/components/ui/Timeline";
import type { Faq } from "@/content/faq";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

// The FAQ as a timeline, like "Our Process": numbered question cards on the red line. The open
// question is the active one (pink card, tick badge); one answer is open at a time.
// The list stays in normal page flow; clicking a question opens it.
// - Clicking the open question closes it.
// - Built on <details>/<summary>, as the Accordion: without JavaScript it still works (the
//   shared `name` keeps one open), answers stay in the HTML for search engines and screen
//   readers, and find-in-page opens the matching answer.

export function FaqTimeline({ items, name }: { items: Faq[]; name: string }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const window_ = viewport.current;
      const list = track.current;
      if (!window_ || !list) return;

      const steps = Array.from(list.querySelectorAll<HTMLLIElement>(":scope > ol > li"));
      const all = steps.map((step) => step.querySelector("details")!);
      const answer = (item: HTMLDetailsElement) => item.querySelector<HTMLElement>("[data-answer]");
      const animate = () => window.matchMedia(MOTION_OK).matches;
      const markActive = () =>
        steps.forEach((step, i) => {
          if (all[i].dataset.state === "open") step.dataset.active = "true";
          else delete step.dataset.active;
        });

      // data-state is the state the item is heading to; `open` stays set while it closes.
      const open = (item: HTMLDetailsElement) => {
        const stillOpen = item.open;
        item.dataset.state = "open";
        item.open = true;
        if (!animate()) return;
        const to = {
          height: "auto",
          autoAlpha: 1,
          duration: 0.5,
          ease: "power3.out",
          overwrite: true,
          clearProps: "height,opacity,visibility",
        };
        if (stillOpen) gsap.to(answer(item), to);
        else gsap.fromTo(answer(item), { height: 0, autoAlpha: 0 }, to);
      };

      const close = (item: HTMLDetailsElement) => {
        item.dataset.state = "closed";
        if (!animate()) {
          item.open = false;
          return;
        }
        gsap.to(answer(item), {
          height: 0,
          autoAlpha: 0,
          duration: 0.4,
          ease: "power3.inOut",
          overwrite: true,
          onComplete: () => {
            item.open = false;
            gsap.set(answer(item), { clearProps: "height,opacity,visibility" });
          },
        });
      };

      const show = (index: number) => {
        if (all[index].dataset.state !== "open") open(all[index]);
        all.forEach((other, i) => {
          if (i !== index && other.dataset.state === "open") close(other);
        });
        markActive();
      };

      all.forEach((item) => {
        item.removeAttribute("name");
        item.dataset.state = item.open ? "open" : "closed";
      });
      markActive();

      const onClick = (event: MouseEvent) => {
        const index = all.indexOf((event.target as Element).closest("summary")?.parentElement as HTMLDetailsElement);
        if (index < 0) return;
        event.preventDefault();
        if (all[index].dataset.state === "open") {
          close(all[index]);
          markActive();
        } else {
          show(index);
        }
      };

      // Opened by the browser itself (e.g. find-in-page): close the others.
      const onToggle = (event: Event) => {
        const index = all.indexOf(event.target as HTMLDetailsElement);
        if (index >= 0 && all[index].open && all[index].dataset.state !== "open") show(index);
      };

      list.addEventListener("click", onClick);
      list.addEventListener("toggle", onToggle, true); // toggle does not bubble

      return () => {
        list.removeEventListener("click", onClick);
        list.removeEventListener("toggle", onToggle, true);
        all.forEach((item) => {
          item.setAttribute("name", name);
          delete item.dataset.state;
        });
      };
    },
    { scope: viewport, dependencies: [name] },
  );

  return (
    <div ref={viewport} className="relative">
      <div ref={track} className={`relative ${timelineGutter}`}>
        <ol className={`flex flex-col ${timelineGap}`}>
          {items.map((item, index) => (
            // The first question is open (and active) in the server HTML.
            <li key={item.question} data-active={index === 0 ? "true" : undefined} className="group/step relative">
              {/* {index < items.length - 1 && <TimelineLine />}
              <TimelineMarker /> */}
              <div className={timelineCard}>
                <details name={name} open={index === 0} className="group/q">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span aria-hidden="true" className="flex items-baseline gap-3">
                        <span className="font-display text-[clamp(1.25rem,1.4vw,1.625rem)] leading-none font-semibold text-crimson">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.25em] text-primary/55 uppercase 2xl:text-[11px]">
                          Question {index + 1} of {items.length}
                        </span>
                      </span>
                      <span className="mt-1.5 block font-display text-[clamp(1.25rem,1.4vw,1.625rem)] leading-tight font-medium text-primary transition-colors duration-300 group-hover/q:text-crimson">
                        {item.question}
                      </span>
                    </span>
                    {/* "+" that turns into "×" while the question is open. */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className="mt-1 size-3 shrink-0 text-coral transition-transform duration-400 ease-out group-open/q:rotate-45 group-data-[state=closed]/q:rotate-0 motion-reduce:transition-none"
                    >
                      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </summary>
                  <div data-answer className="overflow-hidden">
                    <div className="pt-[clamp(0.6rem,1vw,1.25rem)] text-[clamp(0.9375rem,1.1vw,1.3rem)] leading-snug text-primary/85">
                      {item.answer.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </details>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
