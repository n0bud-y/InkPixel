import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudySocialFeedSection, ContentfulImage } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, type SectionTone } from "./CaseStudySection";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter((word) => /^[a-z0-9]/i.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

// The decorative like / comment / share / save row under each post.
function PostActions() {
  const icon = "size-[1.375rem] fill-none stroke-current stroke-[1.75] [stroke-linecap:round] [stroke-linejoin:round]";
  return (
    <div aria-hidden="true" className="flex items-center gap-4 px-4 py-3 text-primary/80">
      <svg viewBox="0 0 24 24" className={icon}>
        <path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" />
      </svg>
      <svg viewBox="0 0 24 24" className={icon}>
        <path d="M20 12a8 8 0 0 1-11.6 7.15L4 20l.85-4.4A8 8 0 1 1 20 12Z" />
      </svg>
      <svg viewBox="0 0 24 24" className={icon}>
        <path d="m21 3-9.5 9.5M21 3l-6.5 18-3-8.5L3 9.5 21 3Z" />
      </svg>
      <svg viewBox="0 0 24 24" className={`${icon} ml-auto`}>
        <path d="M6 3h12v18l-6-4.5L6 21V3Z" />
      </svg>
    </div>
  );
}

function Avatar({ name, avatar }: { name: string; avatar: ContentfulImage | null }) {
  if (avatar) {
    return (
      <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-coral/60">
        <Image
          src={avatar.url}
          width={avatar.width}
          height={avatar.height}
          alt=""
          unoptimized={avatar.isSvg}
          sizes="36px"
          className="size-full object-contain p-0.5"
        />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient-reverse font-display text-xs font-bold text-white"
    >
      {initials(name)}
    </span>
  );
}

// Social media posts as feed cards (account name, the post, the action row), three per row on
// desktop with the middle column lower, two on tablets with every second card lower, one on
// phones. Post images keep their own shape (square, 4:5, reels).
export function SocialFeedSection({
  id,
  tone,
  eyebrow,
  title,
  intro,
  accountName,
  avatar,
  platforms,
  posts,
}: Omit<CaseStudySocialFeedSection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;
  const dark = tone === "dark";

  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} eyebrow={eyebrow} title={title} intro={intro} centered />
        {platforms.length > 0 && (
          <ul data-reveal aria-label="Platforms" className="mt-[clamp(1.25rem,1.6vw,2rem)] flex flex-wrap justify-center gap-2.5">
            {platforms.map((platform) => (
              <li
                key={platform}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] tracking-[0.14em] uppercase",
                  dark ? "border border-white/10 bg-white/[0.06] text-light/85" : "bg-white text-primary/70 ring-1 ring-primary/10",
                ].join(" ")}
              >
                <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-gradient-reverse" />
                {platform}
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      <Reveal y={50} delay={0.1}>
        <ul className="mx-auto mt-[clamp(2.5rem,3.5vw,4.5rem)] grid max-w-[82rem] grid-cols-[minmax(0,1fr)] items-start gap-[clamp(1rem,1.6vw,2rem)] sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <li
              key={post.url}
              data-reveal
              className={[
                "mx-auto w-full max-w-[26rem]",
                index % 2 === 1 ? "sm:mt-[clamp(1.5rem,4vw,3rem)]" : "sm:mt-0",
                index % 3 === 1 ? "lg:mt-[clamp(2rem,4.2vw,5rem)]" : "lg:mt-0",
              ].join(" ")}
            >
              <article
                className={[
                  "overflow-hidden rounded-[1.25rem] bg-white text-primary",
                  dark ? "shadow-[0_30px_60px_-30px_rgb(0_0_0_/_0.7)]" : "shadow-[0_24px_50px_-28px_rgb(21_25_54_/_0.35)] ring-1 ring-primary/10",
                ].join(" ")}
              >
                {accountName && (
                  <header className="flex items-center gap-3 px-4 py-3">
                    <Avatar name={accountName} avatar={avatar} />
                    <span className="min-w-0 truncate text-sm font-semibold">{accountName}</span>
                    <span aria-hidden="true" className="ml-auto text-lg leading-none tracking-widest text-primary/50">
                      ···
                    </span>
                  </header>
                )}
                <Image
                  src={post.url}
                  width={post.width}
                  height={post.height}
                  alt={post.alt}
                  unoptimized={post.isSvg}
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw"
                  className="h-auto w-full"
                />
                <PostActions />
              </article>
            </li>
          ))}
        </ul>
      </Reveal>
    </CaseStudySectionFrame>
  );
}
