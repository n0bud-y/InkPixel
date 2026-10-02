"use client";

import { useRef } from "react";
import { MOTION_OK, gsap, useGSAP } from "@/lib/gsap";

export type AccordionItem = {
  question: string;
  /** The answer, one entry per line. */
  answer: string[];
};

type AccordionProps = {
  items: AccordionItem[];
  /** Groups the items so only one is open at a time (also without JavaScript). */
  name: string;
  /** Index of the item that is open on load; -1 for none. */
  defaultOpen?: number;
  className?: string;
};

// Questions and answers, one answer open at a time (FAQ).
// Built on <details>/<summary>: it works without JavaScript (the shared `name` keeps one item
// open), answers stay in the HTML for search engines and screen readers, and find-in-page
// (Ctrl+F) opens the matching answer. With JavaScript, answers slide open and closed (GSAP;
// instant for reduced motion) and the script keeps one item open itself, because with `name`
// the browser would close the other item instantly. Items are marked data-reveal, so they
// cascade in when the list is wrapped in <Reveal>.
export function Accordion({ items, name, defaultOpen = 0, className }: AccordionProps) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const list = root.current;
      if (!list) return;
      const all = Array.from(list.querySelectorAll<HTMLDetailsElement>(":scope > details"));
      const answer = (item: HTMLDetailsElement) => item.querySelector<HTMLElement>("[data-answer]");
      const animate = () => window.matchMedia(MOTION_OK).matches;

      // data-state is the state the item is heading to; `open` stays set while it closes.
      const open = (item: HTMLDetailsElement) => {
        const stillOpen = item.open; // reopened while closing: continue from where it is
        item.dataset.state = "open";
        item.open = true;
        if (!animate()) return;
        const to = { height: "auto", autoAlpha: 1, duration: 0.5, ease: "power3.out", overwrite: true, clearProps: "height,opacity,visibility" };
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

      const show = (item: HTMLDetailsElement) => {
        open(item);
        all.forEach((other) => {
          if (other !== item && other.dataset.state === "open") close(other);
        });
      };

      all.forEach((item) => {
        item.removeAttribute("name");
        item.dataset.state = item.open ? "open" : "closed";
      });

      const onClick = (event: MouseEvent) => {
        const item = (event.target as Element).closest("summary")?.parentElement;
        if (!(item instanceof HTMLDetailsElement) || !all.includes(item)) return;
        event.preventDefault();
        if (item.dataset.state === "open") close(item);
        else show(item);
      };

      // Opened by the browser itself (e.g. find-in-page): close the others.
      const onToggle = (event: Event) => {
        const item = event.target as HTMLDetailsElement;
        if (item.open && item.dataset.state !== "open") show(item);
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
    { scope: root, dependencies: [name] },
  );

  return (
    <div ref={root} className={["border-t border-primary/10", className].filter(Boolean).join(" ")}>
      {items.map((item, index) => (
        <details
          key={item.question}
          name={name}
          open={index === defaultOpen}
          data-reveal
          className="group border-b border-primary/10"
        >
          <summary className="group/summary flex cursor-pointer list-none items-center justify-between gap-6 py-[clamp(1.25rem,1.97vw,2.4rem)] [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[clamp(1.125rem,1.7vw,2.05rem)] leading-tight font-medium tracking-[-0.01em] text-primary transition-colors duration-300 group-hover/summary:text-crimson">
              {item.question}
            </span>
            {/* "+" that turns into "×" while the item is open. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              className="size-3 shrink-0 text-coral transition-transform duration-400 ease-out group-open:rotate-45 group-data-[state=closed]:rotate-0 motion-reduce:transition-none"
            >
              <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </summary>
          <div data-answer className="overflow-hidden">
            <div className="max-w-3xl pb-[clamp(1.25rem,2.1vw,2.5rem)] text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.65] text-primary/85">
              {item.answer.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
