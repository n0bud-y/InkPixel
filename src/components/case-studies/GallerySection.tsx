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
