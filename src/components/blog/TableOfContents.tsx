"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Heading } from "@/contentful/rich-text";
import { MOTION_OK, ScrollSmoother, ScrollTrigger, gsap, useGSAP } from "@/lib/gsap";

// Where a heading lands when scrolled to: below the fixed header.
const OFFSET = 128;

// "In this article": the article's headings (level 3 indented), each a link to its heading.
// Desktop: a column beside the text that stays in view while the article is read (pinned with
// GSAP: CSS sticky doesn't work inside the smooth scroller) and marks the heading being read; a
// list taller than the screen scrolls inside itself, keeping the marked heading in view.
// Phones and tablets: a box above the text that opens to the list. Also used by the legal pages,
// with their own `label`.
export function TableOfContents({ headings, label = "In this article" }: { headings: Heading[]; label?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);

  // Scroll the list (not the page) so the marked heading stays in view.
  useEffect(() => {
    const box = scroller.current;
    const link = box?.querySelector("[aria-current]");
    if (!box || !link || box.scrollHeight <= box.clientHeight) return;
    const outer = box.getBoundingClientRect();
    const inner = link.getBoundingClientRect();
    if (inner.top >= outer.top && inner.bottom <= outer.bottom) return;
    const top = box.scrollTop + inner.top - outer.top - (outer.height - inner.height) / 2;
    box.scrollTo({ top, behavior: window.matchMedia(MOTION_OK).matches ? "smooth" : "auto" });
  }, [active]);

  useGSAP(
    () => {
      const column = root.current;
      const list = nav.current;
      if (!column || !list) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem)", () => {
        ScrollTrigger.create({
          trigger: list,
          start: `top ${OFFSET}px`,
          end: () => `+=${Math.max(0, column.offsetHeight - list.offsetHeight)}`,
          pin: true,
          pinSpacing: false,
        });
        headings.forEach(({ id }, index) => {
          const heading = document.getElementById(id);
          if (!heading) return;
          ScrollTrigger.create({
            trigger: heading,
            start: "top 40%",
            onEnter: () => setActive(index),
            onLeaveBack: () => setActive(index - 1),
          });
        });
      });

      // An address with a heading's #id: the smooth scroller takes over scrolling, so go there.
      const target = headings.find(({ id }) => `#${id}` === window.location.hash);
      if (target) requestAnimationFrame(() => scrollToHeading(target.id, false));
      return () => mm.revert();
    },
    { scope: root, dependencies: [headings] },
  );

  const onClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    scrollToHeading(id, true);
    history.replaceState(null, "", `#${id}`);
    event.currentTarget.closest("details")?.removeAttribute("open");
  };

  const list = (current: number) => (
    <ol className="space-y-1 border-l border-primary/10">
      {headings.map(({ id, text, level }, index) => (
        <li key={id}>
          <a
            href={`#${id}`}
            onClick={(event) => onClick(event, id)}
            aria-current={index === current ? "location" : undefined}
            className={[
              "-ml-px block border-l-2 py-1.5 text-[clamp(0.875rem,0.9vw,1rem)] leading-snug transition-colors duration-200",
              level === 3 ? "pl-7" : "pl-4",
              index === current ? "border-crimson font-medium text-crimson" : "border-transparent text-primary/65 hover:text-primary",
            ].join(" ")}
          >
            {text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div ref={root} className="lg:h-full">
      <details className="group rounded-2xl border border-primary/10 bg-light/60 px-5 py-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[0.75rem] tracking-[0.14em] text-primary/70 uppercase [&::-webkit-details-marker]:hidden">
          {label}
          <span aria-hidden="true" className="text-lg leading-none transition-transform duration-200 group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="mt-4">{list(-1)}</div>
      </details>

      <nav ref={nav} aria-labelledby="toc-title" className="hidden max-h-[calc(100vh-10rem)] flex-col lg:flex">
        <p id="toc-title" className="mb-4 font-mono text-[0.75rem] tracking-[0.14em] text-primary/55 uppercase">
          {label}
        </p>
        <div ref={scroller} className="min-h-0 overflow-y-auto overscroll-contain pl-px [scrollbar-width:thin]">
          {list(active)}
        </div>
      </nav>
    </div>
  );
}

// Scrolls a heading into view below the header and moves focus to it (for keyboard and screen
// reader users), without a second jump.
function scrollToHeading(id: string, animate: boolean) {
  const heading = document.getElementById(id);
  if (!heading) return;
  const smooth = animate && window.matchMedia(MOTION_OK).matches;
  const smoother = ScrollSmoother.get();
  const y = heading.getBoundingClientRect().top + (smoother ? smoother.scrollTop() : window.scrollY) - OFFSET;
  if (smoother) smoother.scrollTo(y, smooth);
  else window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });

  // Focus once the scroll has settled: the smooth scroller jumps to anything that gets focus
  // while out of view, which would cut the scroll short.
  heading.setAttribute("tabindex", "-1");
  let last = NaN;
  let still = 0;
  const started = performance.now();
  const focusWhenSettled = () => {
    const top = Math.round(heading.getBoundingClientRect().top);
    still = top === last ? still + 1 : 0;
    last = top;
    if (still >= 3 || performance.now() - started > 2500) heading.focus({ preventScroll: true });
    else requestAnimationFrame(focusWhenSettled);
  };
  requestAnimationFrame(focusWhenSettled);
}
