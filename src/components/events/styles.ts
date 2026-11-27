// Shared hover styles for the event pages (28 Nov 2026), all skipped for reduced motion.

/** Gradient buttons: lift, brighten, and a light sheen sweeping across (as the site's Button). */
export const sheen = [
  "relative isolate overflow-hidden transition duration-300 hover:-translate-y-0.5 hover:brightness-110",
  "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:-z-10 before:w-1/3 before:-translate-x-full before:skew-x-[-20deg] before:bg-linear-to-r before:from-transparent before:via-white/40 before:to-transparent",
  "motion-safe:before:transition-transform motion-safe:before:duration-700 motion-safe:before:ease-out motion-safe:hover:before:translate-x-[400%]",
].join(" ");

/** Chips that fill with the brand gradient on hover. */
export const chipHover =
  "transition duration-300 hover:-translate-y-0.5 hover:bg-brand-gradient hover:text-white hover:shadow-[0_14px_28px_-14px_rgb(201_29_76_/_0.8)] hover:ring-transparent";
