"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Background layers that react to the pointer (GSAP). Place it inside a
// `relative isolate overflow-hidden` element: it fills that element, sits behind the content
// (-z-10) and listens for the pointer on it.
//
// Mark each moving layer with `data-pointer-layer` and a `data-strength` (0–1: how far it is
// pulled toward the pointer; negative values push it away). Make the layer a zero-size anchor
// at the visual's centre, with the visual inside it: the layer then pulls, stretches and
// turns around that centre, and the visual keeps its own CSS animations (e.g. a pulse).
// - Moving: each layer eases toward the pointer and stretches a little along the direction of
//   movement, like liquid; the stretch springs back when the pointer slows down.
// - Leaving: the layers spring back to where the design puts them.
// - Mouse and trackpad only, and off for reduced motion: the layers stay in place.
export function PointerParallax({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const layer = root.current;
        const area = layer?.parentElement;
        if (!layer || !area) return;
        const layers = gsap.utils.toArray<HTMLElement>("[data-pointer-layer]", layer);

        let pointer: { x: number; y: number } | null = null;
        let last: { x: number; y: number; time: number } | null = null;
        let frame = 0;

        // At most once per frame: pull toward the pointer and stretch with its speed.
        const update = () => {
          frame = 0;
          if (!pointer) return;
          const now = performance.now();
          const speed = last ? Math.hypot(pointer.x - last.x, pointer.y - last.y) / Math.max(now - last.time, 1) : 0;
          const angle = last ? (Math.atan2(pointer.y - last.y, pointer.x - last.x) * 180) / Math.PI : 0;
          const stretch = Math.min(speed * 0.06, 0.28); // speed in CSS px per ms
          last = { ...pointer, time: now };

          for (const el of layers) {
            const strength = Number(el.dataset.strength ?? 0.3);
            // The anchor's untransformed position = where the design puts the layer's centre.
            gsap.to(el, {
              x: (pointer.x - el.offsetLeft) * strength,
              y: (pointer.y - el.offsetTop) * strength,
              duration: 1.1,
              ease: "power3.out",
              overwrite: "auto",
            });
            if (stretch > 0.02) {
              gsap.killTweensOf(el, "scaleX,scaleY");
              gsap.to(el, {
                rotation: `${angle}_short`,
                scaleX: 1 + stretch,
                scaleY: 1 - stretch * 0.45,
                duration: 0.3,
                ease: "power2.out",
              });
              gsap.to(el, { scaleX: 1, scaleY: 1, duration: 1.4, ease: "elastic.out(1, 0.35)", delay: 0.3 });
            }
          }
        };

        const onMove = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const box = layer.getBoundingClientRect();
          pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
          if (!frame) frame = requestAnimationFrame(update);
        };
        const onLeave = () => {
          pointer = null;
          last = null;
          gsap.to(layers, { x: 0, y: 0, duration: 1.8, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
        };

        area.addEventListener("pointermove", onMove);
        area.addEventListener("pointerleave", onLeave);
        return () => {
          cancelAnimationFrame(frame);
          area.removeEventListener("pointermove", onMove);
          area.removeEventListener("pointerleave", onLeave);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {children}
    </div>
  );
}
