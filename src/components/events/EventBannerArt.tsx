import Image, { type StaticImageData } from "next/image";

// Paw prints and sparkles around the banner image: [left %, top %, size rem, rotation deg, delay s].
const paws: [number, number, number, number, number][] = [
  [2, 8, 2.1, -20, 0],
  [88, 4, 1.6, 25, 1.2],
  [94, 46, 1.9, 10, 0.6],
  [-2, 58, 1.5, -35, 1.8],
  [48, 0, 1.3, 15, 2.4],
];
const sparkles: [number, number, number, number][] = [
  [14, 22, 1.1, 0],
  [80, 18, 0.9, 0.8],
  [62, 8, 0.7, 1.6],
  [6, 40, 0.8, 2.2],
  [97, 30, 1, 1.1],
];

function Paw({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <ellipse cx="12" cy="16.5" rx="5.2" ry="4.4" />
      <ellipse cx="5.6" cy="10.2" rx="2.1" ry="2.7" transform="rotate(-20 5.6 10.2)" />
      <ellipse cx="9.4" cy="6.2" rx="2.1" ry="2.8" transform="rotate(-6 9.4 6.2)" />
      <ellipse cx="14.6" cy="6.2" rx="2.1" ry="2.8" transform="rotate(6 14.6 6.2)" />
      <ellipse cx="18.4" cy="10.2" rx="2.1" ry="2.7" transform="rotate(20 18.4 10.2)" />
    </svg>
  );
}

// The event banner's picture (28 Nov 2026, project head): the cut-out artwork (judge, dogs, and
// partner logos) floating gently over a pulsing glow and two slowly turning rings, with paw prints
// drifting and sparkles twinkling around it, and floating badges: the date, "CACIB", and "All
// breeds". Decoration is hidden from screen readers; everything is still for reduced motion.
export function EventBannerArt({
  image,
  alt,
  day,
  month,
}: {
  image: StaticImageData;
  alt: string;
  day: string;
  month: string;
}) {
  return (
    <div className="relative motion-safe:animate-[rise_0.7s_var(--ease-out-soft)_both] motion-safe:[animation-delay:150ms]">
      {/* Glow and rings behind the artwork. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[40%] left-1/2 size-[92%] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(250_97_67_/_0.42),rgb(201_29_76_/_0.18)_55%,transparent)] motion-safe:animate-glow-pulse" />
        <div className="absolute top-[40%] left-1/2 size-[84%] -translate-1/2 rounded-full border-2 border-dashed border-white/15 motion-safe:animate-[spin_60s_linear_infinite]" />
        <div className="absolute top-[40%] left-1/2 size-[66%] -translate-1/2 rounded-full border border-coral/35 motion-safe:animate-[spin_45s_linear_infinite_reverse]">
          <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full bg-coral shadow-[0_0_16px_4px_rgb(250_97_67_/_0.7)]" />
        </div>
        {paws.map(([left, top, size, rotate, delay], index) => (
          <span
            key={index}
            className="absolute motion-safe:animate-drift"
            style={{ left: `${left}%`, top: `${top}%`, width: `${size}rem`, rotate: `${rotate}deg`, animationDelay: `-${delay}s` }}
          >
            <Paw className={`w-full ${index % 2 ? "fill-white/20" : "fill-coral/45"}`} />
          </span>
        ))}
        {sparkles.map(([left, top, size, delay], index) => (
          <svg
            key={index}
            viewBox="0 0 24 24"
            className="absolute fill-white motion-safe:animate-[twinkle_2.6s_ease-in-out_infinite]"
            style={{ left: `${left}%`, top: `${top}%`, width: `${size}rem`, animationDelay: `${delay}s` }}
          >
            <path d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0Z" />
          </svg>
        ))}
      </div>

      <Image
        src={image}
        alt={alt}
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="relative h-auto w-full drop-shadow-[0_40px_50px_rgb(0_0_0_/_0.55)] motion-safe:animate-drift"
      />

      {/* Floating badges. */}
      <span
        aria-hidden="true"
        className="absolute top-[3%] left-[44%] grid w-[clamp(4rem,6vw,5.25rem)] overflow-hidden rounded-2xl bg-white text-center text-primary shadow-[0_24px_44px_-16px_rgb(0_0_0_/_0.7)] motion-safe:animate-float"
      >
        <span className="bg-brand-gradient py-1 font-mono text-[12px] tracking-[0.16em] text-white uppercase">{month}</span>
        <span className="py-2 font-display text-[clamp(1.6rem,2.4vw,2.1rem)] leading-none font-semibold">{day}</span>
      </span>
      <span
        aria-hidden="true"
        className="absolute top-[22%] left-[52%] rounded-full bg-white/10 px-4 py-2 font-mono text-[12px] tracking-[0.16em] text-white uppercase ring-1 ring-white/25 backdrop-blur-md motion-safe:animate-float-fast"
      >
        ★ CACIB show
      </span>
      <span
        aria-hidden="true"
        className="absolute top-[52%] -left-[2%] hidden items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-[13px] font-semibold text-white shadow-[0_16px_30px_-12px_rgb(201_29_76_/_0.9)] motion-safe:animate-float sm:inline-flex"
        style={{ animationDelay: "-1.5s" }}
      >
        <Paw className="size-4 fill-white" />
        All breeds welcome
      </span>
    </div>
  );
}
