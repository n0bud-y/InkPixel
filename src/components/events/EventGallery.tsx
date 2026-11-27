import Image, { type StaticImageData } from "next/image";

// "From the Ring" on an event's page (28 Nov 2026, project head: an auto-running gallery of
// Pakistani dogs): the photos in one strip sliding left forever (the list twice, the copy hidden
// from screen readers), all the same height with their own widths, faded at both ends. It pauses
// while hovered, a photo zooms a little under the pointer. Reduced motion: no sliding; the strip
// scrolls sideways by hand instead (and by keyboard, as a focusable region).
export function EventGallery({
  title,
  intro,
  credit,
  photos,
}: {
  title: string;
  intro: string;
  credit: string | null;
  photos: { src: StaticImageData; alt: string }[];
}) {
  if (!photos.length) return null;
  const strip = (copy: boolean) =>
    photos.map((photo, index) => (
      <li
        key={`${copy ? "copy" : "photo"}-${index}`}
        aria-hidden={copy || undefined}
        // A margin, not the list's gap: each half then ends with one, so the loop has no seam.
        className={`group/photo relative mr-4 h-[clamp(11rem,16vw,15rem)] shrink-0 overflow-hidden rounded-[1.25rem] bg-primary/10 shadow-[0_20px_40px_-26px_rgb(21_25_54_/_0.7)] ring-1 ring-primary/10 ${copy ? "motion-reduce:hidden" : ""}`}
      >
        <Image
          src={photo.src}
          alt={copy ? "" : photo.alt}
          sizes="(min-width: 1024px) 20vw, 50vw"
          className="h-full w-auto transition-transform duration-700 ease-out group-hover/photo:scale-[1.07]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-primary/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/photo:opacity-100"
        />
      </li>
    ));

  return (
    <section aria-labelledby="gallery-title">
      <p className="font-mono text-[11px] tracking-[0.18em] text-crimson uppercase">Gallery</p>
      <h2 id="gallery-title" className="mt-2 font-display text-[clamp(1.6rem,2.4vw,2.4rem)] leading-tight font-semibold tracking-[-0.02em] text-primary">
        {title}
      </h2>
      <p className="mt-3 text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.75] text-primary/75">{intro}</p>

      <div
        role="region"
        aria-label="Photos"
        tabIndex={0}
        className="group/strip relative mt-6 overflow-hidden rounded-[1.5rem] outline-offset-4 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] focus-visible:outline-2 focus-visible:outline-coral motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:thin]"
      >
        <ul className="flex w-max py-3 group-hover/strip:[animation-play-state:paused] motion-safe:animate-marquee">
          {strip(false)}
          {strip(true)}
        </ul>
      </div>
      {credit && <p className="mt-3 text-[13px] text-primary/50">{credit}</p>}
    </section>
  );
}
