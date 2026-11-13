import Image from "next/image";
import type { CSSProperties } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { CaseStudySocialFeedSection, ContentfulImage } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, type SectionTone } from "./CaseStudySection";

type FeedProps = Omit<CaseStudySocialFeedSection, "type"> & { tone: SectionTone };
type Account = { name: string | null; avatar: ContentfulImage | null };

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
    <div aria-hidden="true" className="flex shrink-0 items-center gap-4 px-4 py-3 text-primary/80">
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

function PostHeader({ account }: { account: Account }) {
  if (!account.name) return null;
  return (
    <header className="flex shrink-0 items-center gap-3 px-4 py-3">
      <Avatar name={account.name} avatar={account.avatar} />
      <span className="min-w-0 truncate text-sm font-semibold">{account.name}</span>
      <span aria-hidden="true" className="ml-auto text-lg leading-none tracking-widest text-primary/50">
        ···
      </span>
    </header>
  );
}

// One post as a feed card: account row, the image at its own shape, the action row.
function PostCard({
  post,
  account,
  tone,
  sizes,
  hidden = false,
}: {
  post: ContentfulImage;
  account: Account;
  tone: SectionTone;
  sizes: string;
  /** A repeated copy (the carousel's second run): hidden from screen readers. */
  hidden?: boolean;
}) {
  return (
    <article
      aria-hidden={hidden || undefined}
      className={[
        "overflow-hidden rounded-[1.25rem] bg-white text-primary",
        tone === "dark" ? "shadow-[0_30px_60px_-30px_rgb(0_0_0_/_0.7)]" : "shadow-[0_24px_50px_-28px_rgb(21_25_54_/_0.35)] ring-1 ring-primary/10",
      ].join(" ")}
    >
      <PostHeader account={account} />
      <Image
        src={post.url}
        width={post.width}
        height={post.height}
        alt={hidden ? "" : post.alt}
        unoptimized={post.isSvg}
        sizes={sizes}
        className="h-auto w-full"
      />
      <PostActions />
    </article>
  );
}

// Three per row on desktop with the middle column lower, two on tablets with every second card
// lower, one on phones.
function GridFeed({ posts, account, tone }: { posts: ContentfulImage[]; account: Account; tone: SectionTone }) {
  return (
    <ul className="mx-auto grid max-w-[82rem] grid-cols-[minmax(0,1fr)] items-start gap-[clamp(1rem,1.6vw,2rem)] sm:grid-cols-2 lg:grid-cols-3">
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
          <PostCard post={post} account={account} tone={tone} sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw" />
        </li>
      ))}
    </ul>
  );
}

// The first three posts on phone screens (the middle one larger and in front), side by side;
// on phones they scroll sideways. Any further posts follow as a row of smaller cards.
function PhonesFeed({ posts, account, tone }: { posts: ContentfulImage[]; account: Account; tone: SectionTone }) {
  const phones = posts.slice(0, 3);
  const rest = posts.slice(3);
  return (
    <>
      <ul className="-mx-[var(--gutter,1rem)] flex snap-x snap-mandatory items-center gap-5 overflow-x-auto px-[var(--gutter,1rem)] pb-4 sm:mx-0 sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0 lg:gap-0">
        {phones.map((post, index) => {
          const middle = index === 1;
          return (
            <li
              key={post.url}
              data-reveal
              className={[
                "w-[68vw] max-w-[19rem] shrink-0 snap-center sm:w-[30%] sm:max-w-[21rem]",
                middle ? "z-10 lg:w-[27%] lg:max-w-[24rem]" : "lg:w-[23%] lg:opacity-95",
                !middle && index === 0 ? "lg:mr-[-2%] lg:-rotate-6" : "",
                !middle && index === 2 ? "lg:ml-[-2%] lg:rotate-6" : "",
              ].join(" ")}
            >
              <div className="rounded-[2.6rem] bg-[#0b0d1f] p-2.5 shadow-[0_50px_90px_-40px_rgb(0_0_0_/_0.75),inset_0_0_0_2px_#2a2d48]">
                <div className="flex aspect-[9/19] flex-col overflow-hidden rounded-[2.1rem] bg-white text-primary">
                  <div aria-hidden="true" className="flex h-9 shrink-0 items-end justify-center pb-1.5">
                    <span className="h-5 w-20 rounded-full bg-[#0b0d1f]" />
                  </div>
                  <PostHeader account={account} />
                  <div className="relative min-h-0 flex-1">
                    <Image
                      src={post.url}
                      alt={post.alt}
                      fill
                      unoptimized={post.isSvg}
                      sizes="(min-width: 1024px) 24rem, 68vw"
                      className="object-cover"
                    />
                  </div>
                  <PostActions />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {rest.length > 0 && (
        <ul className="mx-auto mt-[clamp(2.5rem,4vw,4.5rem)] grid max-w-[64rem] grid-cols-2 gap-[clamp(0.75rem,1.2vw,1.5rem)] sm:grid-cols-3">
          {rest.map((post) => (
            <li key={post.url} data-reveal>
              <PostCard post={post} account={account} tone={tone} sizes="(min-width: 640px) 20rem, 45vw" />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

// The first post large on the left, the next four in two rows beside it (stacked on phones).
function SpotlightFeed({ posts, account, tone }: { posts: ContentfulImage[]; account: Account; tone: SectionTone }) {
  const [lead, ...others] = posts;
  return (
    <div className="mx-auto grid max-w-[84rem] grid-cols-[minmax(0,1fr)] items-start gap-[clamp(1rem,1.6vw,2rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div data-reveal className="relative">
        <span className="absolute top-[4.5rem] left-4 z-10 rounded-full bg-brand-gradient-reverse px-3.5 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white uppercase shadow-lg">
          Featured
        </span>
        <PostCard post={lead} account={account} tone={tone} sizes="(min-width: 1024px) 44vw, 92vw" />
      </div>
      <ul className="grid grid-cols-2 gap-[clamp(0.75rem,1.2vw,1.5rem)]">
        {others.slice(0, 4).map((post) => (
          <li key={post.url} data-reveal>
            <PostCard post={post} account={account} tone={tone} sizes="(min-width: 1024px) 19vw, 45vw" />
          </li>
        ))}
      </ul>
    </div>
  );
}

// A row of posts across the full width that moves slowly to the left and loops (the list is
// repeated once, hidden from screen readers); it pauses while the pointer is over it. For visitors
// who prefer less motion it stands still and scrolls sideways instead.
function CarouselFeed({ posts, account, tone }: { posts: ContentfulImage[]; account: Account; tone: SectionTone }) {
  const sizes = "(min-width: 1024px) 21rem, 70vw";
  const card = "w-[clamp(15rem,21vw,21rem)] shrink-0 pr-[clamp(1rem,1.6vw,2rem)]";
  return (
    <div
      data-reveal
      className="relative left-1/2 w-screen -translate-x-1/2 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] motion-safe:overflow-x-hidden"
    >
      <style href="case-study-feed-marquee" precedence="default">
        {"@keyframes case-study-feed-marquee{to{transform:translateX(-50%)}}"}
      </style>
      <div
        className="flex w-max items-start py-6 hover:[animation-play-state:paused] motion-safe:animate-[case-study-feed-marquee_var(--duration)_linear_infinite]"
        style={{ "--duration": `${posts.length * 7}s` } as CSSProperties}
      >
        <ul className="flex items-start">
          {posts.map((post) => (
            <li key={post.url} className={card}>
              <PostCard post={post} account={account} tone={tone} sizes={sizes} />
            </li>
          ))}
        </ul>
        <ul aria-hidden="true" className="flex items-start motion-reduce:hidden">
          {posts.map((post) => (
            <li key={post.url} className={card}>
              <PostCard post={post} account={account} tone={tone} sizes={sizes} hidden />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Turned, overlapping cards, three per row (a plain grid on phones and tablets); the one under the
// pointer straightens and comes to the front.
const collage = [
  { r: "-7deg", x: "6%", y: "2rem" },
  { r: "3deg", x: "0%", y: "-0.5rem" },
  { r: "-2deg", x: "-6%", y: "3rem" },
  { r: "5deg", x: "4%", y: "-2.5rem" },
  { r: "-4deg", x: "-2%", y: "0rem" },
  { r: "6deg", x: "-8%", y: "-3rem" },
];

function CollageFeed({ posts, account, tone }: { posts: ContentfulImage[]; account: Account; tone: SectionTone }) {
  return (
    <ul className="mx-auto grid max-w-[76rem] grid-cols-2 items-start gap-[clamp(0.75rem,1.6vw,2rem)] lg:grid-cols-3 lg:gap-0 lg:px-[4%]">
      {posts.map((post, index) => {
        const place = collage[index % collage.length];
        return (
          <li
            key={post.url}
            data-reveal
            style={{ "--r": place.r, "--x": place.x, "--y": place.y } as CSSProperties}
            className="relative transition-transform duration-500 ease-out hover:z-20 lg:[transform:translate(var(--x),var(--y))_rotate(var(--r))] lg:hover:[transform:translate(var(--x),var(--y))_rotate(0deg)_scale(1.04)]"
          >
            <PostCard post={post} account={account} tone={tone} sizes="(min-width: 1024px) 24rem, 45vw" />
          </li>
        );
      })}
    </ul>
  );
}

// Social media posts in one of five layouts (Grid, Phones, Spotlight, Carousel, Collage), under a
// centred heading and the platforms they ran on.
export function SocialFeedSection({ id, tone, eyebrow, title, intro, layout, accountName, avatar, platforms, posts }: FeedProps) {
  const headingId = `section-${id}-title`;
  const dark = tone === "dark";
  const account = { name: accountName, avatar };
  const feeds = { grid: GridFeed, phones: PhonesFeed, spotlight: SpotlightFeed, carousel: CarouselFeed, collage: CollageFeed };
  const Feed = feeds[layout];

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

      <Reveal y={50} delay={0.1} className={layout === "collage" ? "mt-[clamp(2.5rem,5vw,6rem)] lg:mb-[clamp(1rem,2vw,3rem)]" : "mt-[clamp(2.5rem,3.5vw,4.5rem)]"}>
        <Feed posts={posts} account={account} tone={tone} />
      </Reveal>
    </CaseStudySectionFrame>
  );
}
