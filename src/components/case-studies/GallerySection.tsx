import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { CSSProperties } from "react";
import type { CaseStudyGallerySection, ContentfulImage } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, type SectionTone } from "./CaseStudySection";
import { CompareSlider } from "./CompareSlider";
import { ReelList } from "./ReelList";

// "App Screens": a centred heading, then the screens four per row (two on phones), every second
// one sitting higher, as in the design.
export function GallerySection({
  id,
  tone,
  title,
  intro,
  images,
  videos,
}: Omit<CaseStudyGallerySection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;
  if (phoneGalleries.includes(id)) return <PhoneGallery headingId={headingId} tone={tone} title={title} intro={intro} images={images} />;
  const reels = reelGalleries[id];
  if (reels) return <ReelGallery headingId={headingId} tone={tone} title={title} intro={intro} images={images} videos={videos} {...reels} />;
  const pairs = beforeAfterGalleries[id];
  if (pairs) return <BeforeAfterGallery headingId={headingId} tone={tone} title={title} intro={intro} images={images} {...pairs} />;

  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} title={title} intro={intro} centered />
      </Reveal>
      <Reveal y={40} delay={0.1}>
        <ul className="mt-[clamp(2rem,3vw,3.5rem)] grid grid-cols-2 gap-x-[clamp(0.75rem,1.4vw,1.75rem)] gap-y-[clamp(1.5rem,2.8vw,3.5rem)] lg:grid-cols-4">
          {images.map((image, index) => (
            <li key={image.url} data-reveal className={`flex justify-center ${index % 2 === 0 ? "mt-[clamp(1.5rem,4.2vw,5rem)]" : ""}`}>
              <Image
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alt}
                unoptimized={image.isSvg}
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="h-auto w-full max-w-[24rem]"
              />
            </li>
          ))}
        </ul>
      </Reveal>
    </CaseStudySectionFrame>
  );
}

// Galleries of phone screenshots shown as phones (project head, 21 Nov 2026): Drumond's "Built for
// Phones First". Contentful entry ids.
const phoneGalleries = ["drm-mobile"];

// The caption under a phone: the page's name from its alt text ("Services page with the ZIP code
// check on a phone" → "Services").
const captionOf = (image: ContentfulImage) => image.alt.replace(/ on a phone$/i, "").split(/ page(?= |$)/i)[0];

// Each phone's tilt and drop on desktop, outer ones lower and tilted out (an arc).
const fan = (index: number, count: number) => {
  const middle = (count - 1) / 2;
  const offset = index - middle;
  return { "--tilt": `${(offset * 5).toFixed(1)}deg`, "--drop": `${(Math.abs(offset) * Math.abs(offset) * 1.6).toFixed(2)}rem` } as CSSProperties;
};

// The screenshots inside phone frames (notch, side buttons), fanned in an arc over a brand glow
// and a dotted arc, each with a numbered caption; they rise in one after another, and a phone
// straightens and lifts on hover. Phones and tablets: a row to swipe through (keyboard-scrollable).
function PhoneGallery({
  headingId,
  tone,
  title,
  intro,
  images,
}: {
  headingId: string;
  tone: SectionTone;
  title: string;
  intro: string | null;
  images: ContentfulImage[];
}) {
  const dark = tone === "dark";
  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} title={title} intro={intro} centered />
      </Reveal>
      <div className="relative mt-[clamp(2.5rem,4vw,5rem)]">
        {/* The glow and the dotted arc behind the phones (desktop). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[10%] left-1/2 -z-10 hidden h-[80%] w-[70%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(250_97_67_/_0.28),transparent)] lg:block"
        />
        <svg aria-hidden="true" viewBox="0 0 1000 300" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-[6%] top-[4%] -z-10 hidden h-[38%] w-[88%] lg:block">
          <path d="M10 290 Q500 -120 990 290" fill="none" stroke="rgb(250 97 67 / 0.45)" strokeWidth="2" strokeDasharray="2 12" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>

        <Reveal y={60} stagger={0.12}>
          <ul
            role="region"
            aria-label="Pages on a phone"
            tabIndex={0}
            className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pt-2 pb-6 outline-offset-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-coral sm:-mx-8 sm:px-8 lg:mx-0 lg:justify-center lg:gap-[clamp(0.5rem,1.4vw,2rem)] lg:overflow-visible lg:px-0 lg:pt-6 lg:pb-[3rem]"
          >
            {images.map((image, index) => (
              <li key={image.url} data-reveal className="w-[62vw] max-w-[17rem] shrink-0 snap-center sm:w-[40vw] lg:w-[clamp(11.5rem,15vw,17rem)]" style={fan(index, images.length)}>
                <div className="group transition-transform duration-500 ease-out lg:[transform:translateY(var(--drop))_rotate(var(--tilt))] lg:hover:[transform:translateY(calc(var(--drop)-1.25rem))_rotate(0deg)]">
                  {/* The phone. */}
                  <div className="relative rounded-[2.4rem] bg-[#0b0d1f] p-[0.55rem] shadow-[0_50px_90px_-40px_rgb(0_0_0_/_0.85),inset_0_0_0_2px_#2a2d48] transition-shadow duration-500 group-hover:shadow-[0_60px_100px_-40px_rgb(201_29_76_/_0.6),inset_0_0_0_2px_#3a3e63]">
                    <span aria-hidden="true" className="absolute top-[18%] -left-[3px] h-10 w-[3px] rounded-l bg-[#2a2d48]" />
                    <span aria-hidden="true" className="absolute top-[30%] -left-[3px] h-14 w-[3px] rounded-l bg-[#2a2d48]" />
                    <span aria-hidden="true" className="absolute top-[24%] -right-[3px] h-16 w-[3px] rounded-r bg-[#2a2d48]" />
                    <div className="relative overflow-hidden rounded-[1.9rem] bg-white">
                      <span aria-hidden="true" className="absolute top-2 left-1/2 z-10 h-[1.35rem] w-[34%] -translate-x-1/2 rounded-full bg-[#0b0d1f]" />
                      <Image
                        src={image.url}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                        unoptimized={image.isSvg}
                        sizes="(min-width: 1024px) 16vw, (min-width: 640px) 40vw, 62vw"
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                  {/* The caption. */}
                  <p
                    className={`mx-auto mt-5 flex w-fit items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium ${dark ? "bg-white/[0.06] text-light/85 ring-1 ring-white/10" : "bg-white text-primary shadow-[0_10px_24px_-14px_rgb(21_25_54_/_0.4)] ring-1 ring-primary/10"}`}
                  >
                    <span className="font-mono text-[11px] text-coral">{String(index + 1).padStart(2, "0")}</span>
                    {captionOf(image)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </CaseStudySectionFrame>
  );
}

// Galleries of video covers from a client's social account, shown as reels (project head, 21 Nov
// 2026): NG Interiors' TikTok videos, which we film, edit, and post; each plays on the page when
// the gallery has its video (0019). Contentful entry id → account.
const reelGalleries: Record<string, { handle: string; profile: string; platform: string }> = {
  "ng-work": { handle: "@nginteriorsconstructions", profile: "https://www.tiktok.com/@nginteriorsconstructions", platform: "TikTok" },
};

// The reels (`ReelList`), then a link to the account itself.
function ReelGallery({
  headingId,
  tone,
  title,
  intro,
  images,
  videos,
  handle,
  profile,
  platform,
}: {
  headingId: string;
  tone: SectionTone;
  title: string;
  intro: string | null;
  images: ContentfulImage[];
  videos: CaseStudyGallerySection["videos"];
  handle: string;
  profile: string;
  platform: string;
}) {
  const dark = tone === "dark";
  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} title={title} intro={intro} centered />
      </Reveal>
      <div className="relative mt-[clamp(2.5rem,4vw,5rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -z-10 hidden h-[70%] w-[80%] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_29_76_/_0.3),transparent)] lg:block"
        />
        <Reveal y={60} stagger={0.12}>
          <ReelList images={images} videos={videos} handle={handle} platform={platform} />
        </Reveal>
      </div>
      <Reveal className="mt-[clamp(1.5rem,2.5vw,3rem)] flex justify-center">
        <a
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-colors duration-300 ${
            dark ? "bg-white/[0.08] text-white ring-1 ring-white/15 hover:bg-white/15" : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          See {handle} on {platform}
          <span aria-hidden="true">↗</span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </Reveal>
    </CaseStudySectionFrame>
  );
}

// Before-and-after galleries (project head, 21 Nov 2026): the images in pairs, before then after.
// The pairs listed in `compare` were shot from the same spot, so they get a large drag-to-compare
// slider, first (their photos without printed labels: the slider labels them); the rest show side
// by side, with the labels printed on the studio's posts. Contentful entry id → the slider pairs (0-based) and
// each pair's name.
const beforeAfterGalleries: Record<string, { compare: number[]; names: string[] }> = {
  "ng-before-after": { compare: [0], names: ["A house", "A bedroom", "Another bedroom"] },
};

function BeforeAfterGallery({
  headingId,
  tone,
  title,
  intro,
  images,
  compare,
  names,
}: {
  headingId: string;
  tone: SectionTone;
  title: string;
  intro: string | null;
  images: ContentfulImage[];
  compare: number[];
  names: string[];
}) {
  const dark = tone === "dark";
  const pairs = Array.from({ length: Math.floor(images.length / 2) }, (_, index) => ({
    index,
    name: names[index] ?? null,
    before: images[index * 2],
    after: images[index * 2 + 1],
  }));
  const sliders = pairs.filter((pair) => compare.includes(pair.index));
  const sideBySide = pairs.filter((pair) => !compare.includes(pair.index));

  return (
    <CaseStudySectionFrame headingId={headingId} tone={tone}>
      <Reveal>
        <CaseStudyHeading id={headingId} tone={tone} title={title} intro={intro} centered />
      </Reveal>
      {sliders.map((pair) => (
        <Reveal key={pair.before.url} y={40} className="mx-auto mt-[clamp(2.5rem,4vw,4.5rem)] max-w-[34rem]">
          <CompareSlider before={pair.before} after={pair.after} name={pair.name} dark={dark} />
        </Reveal>
      ))}
      {sideBySide.length > 0 && (
        <Reveal y={40} stagger={0.12}>
          <ul className="mt-[clamp(2.5rem,4vw,4.5rem)] grid gap-[clamp(1.5rem,2.4vw,2.5rem)] lg:grid-cols-2">
            {sideBySide.map((pair) => (
              <li
                key={pair.before.url}
                data-reveal
                className={`group rounded-[1.75rem] p-3 transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-1 ${
                  dark ? "bg-white/[0.05] ring-1 ring-white/10" : "bg-white shadow-[0_24px_60px_-40px_rgb(21_25_54_/_0.55)] ring-1 ring-primary/10"
                }`}
              >
                <div className="relative grid grid-cols-2 gap-3">
                  {/* The studio's posts carry their own Before / After labels. */}
                  {[pair.before, pair.after].map((image) => (
                    <div key={image.url} className="relative overflow-hidden rounded-[1.25rem]">
                      <Image
                        src={image.url}
                        width={image.width}
                        height={image.height}
                        alt={image.alt}
                        unoptimized={image.isSvg}
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  ))}
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 grid size-11 -translate-1/2 place-items-center rounded-full border-4 border-white bg-brand-gradient-reverse text-white shadow-[0_12px_24px_-8px_rgb(201_29_76_/_0.7)] transition-transform duration-700 ease-out group-hover:rotate-[360deg]"
                  >
                    <svg viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[2.5]">
                      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                {pair.name && <p className={`mt-3 px-2 pb-1 font-display text-[17px] font-semibold ${dark ? "text-white" : "text-primary"}`}>{pair.name}</p>}
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </CaseStudySectionFrame>
  );
}
