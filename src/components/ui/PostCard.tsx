import Link from "next/link";
import type { PostSummary } from "@/contentful/queries/posts";
import { ArrowUpRightIcon } from "./icons";

// "Mar 2026" (shown in capitals). UTC, so the server and every visitor see the same month.
const monthYear = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" });

// Article card: category and date at the top, title, reading time and arrow at the bottom.
// The whole card is one link (the title link's ::after covers it). Text and spacing scale
// with the card's own width (container queries), so it fits any column.
// Hover: the card lifts and brightens, a soft brand glow appears, the arrow nudges.
export function PostCard({ title, href, category, publishedDate, readingMinutes }: PostSummary) {
  return (
    <article
      className={[
        "@container group relative isolate grid aspect-[532/386] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-light",
        "transition-[translate,background-color,border-color,box-shadow] duration-500 ease-out hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_28px_60px_-30px_rgb(0_0_0_/_0.7)] motion-safe:hover:-translate-y-1",
        "before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(120%_90%_at_0%_0%,rgb(201_29_76_/_0.2),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-coral",
      ].join(" ")}
    >
      <div className="flex flex-col p-[7.5cqw]">
        <div className="flex items-center justify-between gap-4 font-mono text-[clamp(0.6875rem,2.7cqw,0.9375rem)] leading-none tracking-[0.14em] uppercase">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-[3.2cqw] py-[2.8cqw] text-light/80">
            {category}
          </span>
          <time dateTime={publishedDate} className="text-light/45">
            {monthYear.format(new Date(publishedDate))}
          </time>
        </div>

        <h3 className="mt-auto pt-[6cqw] font-display text-[clamp(1.25rem,6cqw,2.125rem)] leading-[1.12] font-medium tracking-[-0.01em] text-balance">
          <Link href={href} className="outline-none after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        </h3>

        <div className="mt-[4.5cqw] flex items-center justify-between text-[clamp(0.8125rem,3cqw,1rem)] text-light/55">
          <span>{readingMinutes} min read</span>
          <ArrowUpRightIcon className="size-[clamp(0.875rem,2.9cqw,1rem)] text-light/70 transition-[translate,color] duration-300 ease-out group-hover:text-coral motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}
