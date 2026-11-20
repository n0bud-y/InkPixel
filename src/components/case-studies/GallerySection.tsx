import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { CSSProperties } from "react";
import type { CaseStudyGallerySection, ContentfulImage } from "@/contentful/queries/case-studies";
import { CaseStudyHeading, CaseStudySectionFrame, type SectionTone } from "./CaseStudySection";

// "App Screens": a centred heading, then the screens four per row (two on phones), every second
// one sitting higher, as in the design.
export function GallerySection({
  id,
  tone,
  title,
  intro,
  images,
}: Omit<CaseStudyGallerySection, "type"> & { tone: SectionTone }) {
  const headingId = `section-${id}-title`;
  if (phoneGalleries.includes(id)) return <PhoneGallery headingId={headingId} tone={tone} title={title} intro={intro} images={images} />;
  const reels = reelGalleries[id];
  if (reels) return <ReelGallery headingId={headingId} tone={tone} title={title} intro={intro} images={images} {...reels} />;

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
// 2026): NG Interiors' TikTok videos, which we film, edit, and post. Contentful entry id → account.
const reelGalleries: Record<string, { handle: string; profile: string; platform: string }> = {
  "ng-work": { handle: "@nginteriorsconstructions", profile: "https://www.tiktok.com/@nginteriorsconstructions", platform: "TikTok" },
};

const reelIcon = "size-6 drop-shadow-[0_2px_6px_rgb(0_0_0_/_0.5)]";

// Each cover as a vertical reel: the platform and reel number on top, the like / comment / share
// rail (icons only: no counts we can't vouch for), the account and the cover's caption at the
// bottom, and a play button. They rise in one after another, every second one lower (desktop); on
// hover a reel lifts, the cover zooms, and the progress bar runs. Phones: a row to swipe through.
// Then a link to the account itself.
function ReelGallery({
  headingId,
  tone,
  title,
  intro,
  images,
  handle,
  profile,
  platform,
}: {
  headingId: string;
  tone: SectionTone;
  title: string;
  intro: string | null;
  images: ContentfulImage[];
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
          <ul
            role="region"
            aria-label={`Videos on ${platform}`}
            tabIndex={0}
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pt-2 pb-6 outline-offset-4 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-coral sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-[clamp(1rem,1.6vw,2rem)] lg:overflow-visible lg:px-0 lg:pb-[clamp(2rem,3vw,3.5rem)]"
          >
            {images.map((image, index) => (
              <li
                key={image.url}
                data-reveal
                className={`w-[68vw] max-w-[18rem] shrink-0 snap-center sm:w-[42vw] lg:w-auto lg:max-w-none ${index % 2 === 1 ? "lg:pt-[clamp(2rem,3vw,3.5rem)]" : ""}`}
              >
                <figure className="group relative isolate aspect-[9/16] overflow-hidden rounded-[1.75rem] bg-[#0b0d1f] shadow-[0_40px_80px_-40px_rgb(0_0_0_/_0.9)] ring-1 ring-white/10 transition-[translate,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_50px_90px_-35px_rgb(201_29_76_/_0.7)]">
                  <Image
                    src={image.url}
                    width={image.width}
                    height={image.height}
                    alt={image.alt}
                    unoptimized={image.isSvg}
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 68vw"
                    className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(0_0_0_/_0.45),transparent_22%,transparent_55%,rgb(0_0_0_/_0.85))]"
                  />

                  {/* Top: the platform and the reel number. */}
                  <span aria-hidden="true" className="absolute top-4 left-4 rounded-full bg-black/40 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">
                    {platform}
                  </span>
                  <span aria-hidden="true" className="absolute top-4 right-4 font-mono text-[12px] text-white/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Play. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 grid size-16 -translate-1/2 place-items-center rounded-full bg-white/20 ring-1 ring-white/40 backdrop-blur-md transition-transform duration-500 ease-out group-hover:scale-110"
                  >
                    <span className="absolute inset-0 rounded-full bg-white/25 opacity-0 group-hover:opacity-100 motion-safe:group-hover:animate-ping" />
                    <svg viewBox="0 0 24 24" className="relative ml-1 size-7 fill-white">
                      <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
                    </svg>
                  </span>

                  {/* The rail. */}
                  <span aria-hidden="true" className="absolute right-3 bottom-[5.5rem] flex flex-col items-center gap-4">
                    <svg viewBox="0 0 24 24" className={`${reelIcon} fill-white transition-colors duration-300 group-hover:fill-[#fe2c55]`}>
                      <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.6 4.5c2.1 0 3.6 1.2 5.4 3.2 1.8-2 3.3-3.2 5.4-3.2 3.6 0 5.7 3.8 4.2 7.3C19.5 16.4 12 21 12 21Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className={`${reelIcon} fill-white`}>
                      <path d="M12 3C6.5 3 2 6.9 2 11.7c0 2.6 1.3 4.9 3.4 6.5L4.6 21.5l3.9-2c1.1.3 2.3.5 3.5.5 5.5 0 10-3.9 10-8.7S17.5 3 12 3Z" />
                    </svg>
                    <svg viewBox="0 0 24 24" className={`${reelIcon} fill-white`}>
                      <path d="M13 4.5v4C6.5 9 3.5 13.5 3 19.5c2-3.2 5-4.7 10-4.7v4.2l8-7.3-8-7.2Z" />
                    </svg>
                  </span>

                  {/* Bottom: the account and the caption (the cover's alt text, so hidden from screen readers). */}
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 p-4 pr-12 pb-5 text-white">
                    <span className="flex items-center gap-2 text-[13px] font-semibold">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gradient text-[10px] font-bold">NG</span>
                      <span className="truncate">{handle}</span>
                    </span>
                    <span className="mt-2 line-clamp-2 block text-[13px] leading-snug text-white/85">{image.alt}</span>
                  </span>
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20">
                    <span className="block h-full origin-left scale-x-[0.12] bg-brand-gradient transition-transform duration-[4s] ease-linear group-hover:scale-x-100" />
                  </span>
                </figure>
              </li>
            ))}
          </ul>
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
