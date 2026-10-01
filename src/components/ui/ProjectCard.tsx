import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { DropIcon } from "./Button";

type ProjectCardProps = {
  name: string;
  summary: string;
  href: string;
  image: StaticImageData;
  /** Responsive image sizes, e.g. "(min-width: 1024px) 42vw, 100vw". */
  sizes: string;
  className?: string;
};

// Project image with a dark fade at the bottom, the project name and summary, and a
// "Project Detail" cue. The whole card is one link (the title's link stretches over it), so
// screen readers hear a single link named after the project.
// Text and spacing scale with the card's own width (container query units, cqw): an 800px
// card matches the 1920px design; narrow cards (< 28rem) get a taller image and stacked text.
// Hover: the image zooms slightly and the drop nudges. Inside smooth scrolling the image also
// drifts with the scroll (data-speed).
export function ProjectCard({ name, summary, href, image, sizes, className }: ProjectCardProps) {
  return (
    // Grid stacking: image and text share one cell. The image layer sits behind (-z-10) and
    // the text block is not positioned, so the link's ::after stretches over the whole card.
    <article
      className={[
        "@container group relative isolate grid overflow-hidden rounded-3xl bg-[#0b0b10] shadow-[0_24px_48px_-32px_rgb(21_25_54_/_0.35)]",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-coral",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative -z-10 col-start-1 row-start-1 aspect-[4/5] @md:aspect-[800/543]">
        {/* Taller than the card so the scroll drift never shows an edge. */}
        <div aria-hidden="true" data-speed="auto" className="absolute inset-x-0 -top-[6%] h-[112%]">
          <Image
            src={image}
            alt=""
            fill
            sizes={sizes}
            placeholder="blur"
            className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.04]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 via-40% to-transparent to-70% @md:via-black/45 @md:via-35% @md:to-65%"
        />
      </div>

      <div className="col-start-1 row-start-1 flex flex-col gap-4 self-end p-5 text-white @md:flex-row @md:items-end @md:justify-between @md:gap-[4cqw] @md:px-[5.4cqw] @md:pt-0 @md:pb-[3.2cqw]">
        <div className="@md:max-w-[62cqw]">
          <h3 className="font-display text-[clamp(1.375rem,5cqw,2.5rem)] leading-tight font-medium tracking-[-0.01em]">
            <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
              {name}
            </Link>
          </h3>
          <p className="mt-2 text-[clamp(0.8125rem,2.1cqw,1.0625rem)] leading-relaxed text-white/90 @md:mt-[1.4cqw]">
            {summary}
          </p>
        </div>
        <span
          aria-hidden="true"
          className="inline-flex shrink-0 items-center gap-2 text-[clamp(0.8125rem,2cqw,1rem)] font-medium underline decoration-1 underline-offset-4"
        >
          Project Detail
          <DropIcon
            gradient
            className="h-[1.15em] w-auto motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1"
          />
        </span>
      </div>
    </article>
  );
}
