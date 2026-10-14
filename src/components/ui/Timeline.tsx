// Shared pieces of the vertical timelines (home "Our Process" and the FAQ): cards on a red
// line, with one marker per step that grows from a dot into the gradient tick badge while its
// card is active. A step is an element with `group/step` and `relative`, marked
// data-active="true" while active. The list needs `timelineGutter` (room for the line on the
// left) and `timelineGap` between steps (TimelineLine crosses exactly that gap).

/** Left padding of the list: room for the line and the markers. */
export const timelineGutter = "pl-[clamp(2.5rem,3vw,3.6rem)]";

/** Gap between steps. */
export const timelineGap = "gap-[clamp(1rem,1.25vw,1.5rem)]";

// The card. The gradient is a before-layer that fades in (gradients can't be transitioned
// directly); the step's group/step carries data-active.
export const timelineCard = [
  "relative isolate rounded-2xl border px-[clamp(1.25rem,1.5vw,1.75rem)] py-[clamp(1.1rem,1.3vw,1.5rem)]",
  "border-[#e9e6e2] bg-[#f8f6f4]/90 backdrop-blur-sm transition-[border-color,box-shadow] duration-400 ease-out motion-reduce:transition-none",
  "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-linear-to-r before:from-[#fbded7] before:to-[#f9d7dd] before:opacity-0 before:transition-opacity before:duration-400 before:ease-out motion-reduce:before:transition-none",
  "group-data-[active=true]/step:border-coral/60 group-data-[active=true]/step:shadow-[0_18px_40px_-24px_rgb(201_29_76_/_0.5)] group-data-[active=true]/step:before:opacity-100",
].join(" ");

// Marker position on the line (the same for every step): `top` from the card's top, `left` back
// across the list's left padding to the line.
const onLine =
  "absolute top-[clamp(1.6rem,1.9vw,2.3rem)] left-[calc(-1*clamp(2.5rem,3vw,3.6rem)+clamp(0.6rem,0.85vw,0.95rem))]";

// The step's marker: a small dot that grows into the gradient tick badge while its card is active.
export function TimelineMarker() {
  return (
    <span aria-hidden="true" className={`${onLine} grid -translate-1/2 place-items-center`}>
      <span className="col-start-1 row-start-1 size-[clamp(0.75rem,0.85vw,1rem)] rounded-full bg-crimson shadow-[0_0_0_4px_rgb(201_29_76_/_0.12),0_0_12px_rgb(201_29_76_/_0.5)] transition-[scale,opacity] duration-300 ease-out motion-reduce:transition-none group-data-[active=true]/step:scale-50 group-data-[active=true]/step:opacity-0" />
      <span className="col-start-1 row-start-1 grid size-[clamp(2rem,2.4vw,2.9rem)] scale-[0.35] place-items-center rounded-full bg-brand-gradient opacity-0 shadow-[0_0_0_5px_rgb(201_29_76_/_0.15),0_8px_24px_-6px_rgb(201_29_76_/_0.7)] transition-[scale,opacity] duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none group-data-[active=true]/step:scale-100 group-data-[active=true]/step:opacity-100">
        <svg viewBox="0 0 24 24" fill="none" className="size-[45%]">
          <path d="M5 12.5l4.5 4.5L19 7.5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
}

// The red line from this step's marker down to the next one (across the gap between cards),
// so the line always starts and ends exactly on the markers. Leave it out on the last step.
export function TimelineLine() {
  return (
    <span
      aria-hidden="true"
      className={`${onLine} -bottom-[calc(clamp(1rem,1.25vw,1.5rem)+clamp(1.6rem,1.9vw,2.3rem))] w-0.5 -translate-x-1/2 bg-crimson shadow-[0_0_10px_rgb(201_29_76_/_0.45)]`}
    />
  );
}
