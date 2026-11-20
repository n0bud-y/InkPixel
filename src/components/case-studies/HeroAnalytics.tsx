// Decorative dashboard cards floating around a case study's banner image, like the illustrated
// dashboards on the service pages' banners (project head, 20 Nov 2026). Decoration only: no
// numbers or results (we never show figures a client hasn't approved), hidden from screen readers,
// shown from tablets up (on phones they would cover the image), still for reduced motion. The
// labels follow the services ticked on the case study.

type Labels = { line: string; bars: string; ring: string; live: string };

const labelsFor = (services: string[]): Labels => {
  if (services.includes("marketing")) return { line: "Engagement", bars: "Content calendar", ring: "Campaigns", live: "Campaign live" };
  if (services.includes("development") || services.includes("software") || services.includes("applications"))
    return { line: "Traffic", bars: "Page speed", ring: "Performance", live: "Site live" };
  if (services.includes("ai-automation")) return { line: "Automations", bars: "Workflows", ring: "Accuracy", live: "Running" };
  return { line: "Brand reach", bars: "Brand assets", ring: "Consistency", live: "Brand live" };
};

const card =
  "absolute rounded-2xl border border-primary/5 bg-white/95 p-3 shadow-[0_24px_50px_-22px_rgb(10_12_30_/_0.55)] backdrop-blur-sm motion-safe:animate-float";
const label = "font-mono text-[10px] tracking-[0.14em] text-primary/55 uppercase";

export function HeroAnalytics({ services }: { services: string[] }) {
  const labels = labelsFor(services);
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 hidden md:block">
      {/* A rising line chart. */}
      <div className={`${card} top-[4%] -left-[4%] w-[clamp(9rem,11vw,12.5rem)]`} style={{ animationDelay: "-0.4s" }}>
        <p className={label}>{labels.line}</p>
        <svg viewBox="0 0 120 44" className="mt-2 h-auto w-full">
          <defs>
            <linearGradient id="hero-analytics-line" x1="0" x2="1">
              <stop offset="0" stopColor="#fa6143" />
              <stop offset="1" stopColor="#c91d4c" />
            </linearGradient>
            <linearGradient id="hero-analytics-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#fa6143" stopOpacity="0.25" />
              <stop offset="1" stopColor="#fa6143" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M2 38 L20 32 L36 34 L52 24 L68 26 L84 15 L100 17 L118 6 L118 44 L2 44Z" fill="url(#hero-analytics-fill)" />
          <path d="M2 38 L20 32 L36 34 L52 24 L68 26 L84 15 L100 17 L118 6" fill="none" stroke="url(#hero-analytics-line)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="118" cy="6" r="3.5" fill="#c91d4c" />
        </svg>
      </div>

      {/* Bars. */}
      <div className={`${card} top-[8%] -right-[3%] w-[clamp(8rem,9.5vw,11rem)]`} style={{ animationDelay: "-1.6s" }}>
        <p className={label}>{labels.bars}</p>
        <div className="mt-2.5 flex h-10 items-end gap-1.5">
          {[45, 70, 55, 85, 65, 100].map((height, index) => (
            <span
              key={index}
              className={`flex-1 rounded-t-[3px] ${index === 5 ? "bg-brand-gradient" : "bg-primary/12"}`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* A progress ring. */}
      <div className={`${card} bottom-[14%] -left-[6%] flex items-center gap-3 pr-4`} style={{ animationDelay: "-2.6s" }}>
        <svg viewBox="0 0 36 36" className="size-11 -rotate-90">
          <circle cx="18" cy="18" r="14" fill="none" stroke="rgb(21 25 54 / 0.08)" strokeWidth="4" />
          <circle cx="18" cy="18" r="14" fill="none" stroke="url(#hero-analytics-line)" strokeWidth="4" strokeLinecap="round" strokeDasharray="66 88" />
        </svg>
        <p className={label}>{labels.ring}</p>
      </div>

      {/* A "live" chip. */}
      <div
        className="absolute right-[2%] bottom-[5%] flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[13px] font-medium text-white shadow-[0_20px_40px_-18px_rgb(10_12_30_/_0.8)] motion-safe:animate-float"
        style={{ animationDelay: "-1s" }}
      >
        <span className="relative flex size-2.5">
          <span className="absolute inset-0 rounded-full bg-[#3ddc84] motion-safe:animate-ping" />
          <span className="relative size-2.5 rounded-full bg-[#3ddc84]" />
        </span>
        {labels.live}
      </div>
    </div>
  );
}
