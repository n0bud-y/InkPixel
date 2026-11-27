"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const noSubscribe = () => () => {};

/** Days, hours, minutes, and seconds until `start`; null once it has started; undefined until the
 *  page has loaded (so server and browser render the same). */
export function useCountdown(start: string) {
  const mounted = useSyncExternalStore(noSubscribe, () => true, () => false);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (!mounted) return undefined;
  const left = Date.parse(start) - now;
  if (left <= 0) return null;
  const seconds = Math.floor(left / 1000);
  return { days: Math.floor(seconds / 86400), hours: Math.floor((seconds % 86400) / 3600), minutes: Math.floor((seconds % 3600) / 60), seconds: seconds % 60 };
}

const tones = {
  /** On navy: the booking box. */
  dark: { cell: "bg-white/[0.08] ring-white/10", unit: "text-light/60" },
  /** On white: the event cards on /events. */
  light: { cell: "bg-primary text-white ring-primary/10 shadow-[0_12px_24px_-14px_rgb(21_25_54_/_0.8)]", unit: "text-light/60" },
};

// A countdown to an event's start: days, hours, minutes, and seconds in four boxes, each number
// dropping in as it changes. Decorative (the date is in the text, and a ticking timer would keep
// interrupting screen readers); shows nothing before the page has loaded or once the event starts.
// The space it takes is kept while loading, so nothing jumps.
export function Countdown({ start, tone = "dark", className = "" }: { start: string; tone?: keyof typeof tones; className?: string }) {
  const left = useCountdown(start);
  if (left === null) return null;
  const style = tones[tone];
  const cells = [
    ["days", left?.days],
    ["hours", left?.hours],
    ["min", left?.minutes],
    ["sec", left?.seconds],
  ] as const;

  return (
    <div aria-hidden="true" className={`grid grid-cols-4 gap-2 text-center ${className}`}>
      {cells.map(([unit, value]) => (
        <div key={unit} className={`overflow-hidden rounded-xl py-2 ring-1 ${style.cell}`}>
          {/* Re-keyed by its value, so each new number drops in. */}
          <span key={value ?? "-"} className="block font-display text-[1.35rem] leading-none font-semibold tabular-nums motion-safe:animate-tick">
            {value === undefined ? "--" : String(value).padStart(2, "0")}
          </span>
          <span className={`mt-1 block font-mono text-[10px] tracking-[0.14em] uppercase ${style.unit}`}>{unit}</span>
        </div>
      ))}
    </div>
  );
}
