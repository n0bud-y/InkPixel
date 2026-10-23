import { at, Bar, Canvas, delay, Glass, Paper, Toast } from "../../parts";

// Search Engine Optimization: a search results page with your site rising into the top spot,
// keyword positions moving up, an organic traffic line drawing in, and a "Rankings rising" toast.
// Made-up keywords and no traffic figures, so nothing reads as a claimed result.

const keywords = ["web design agency", "custom software", "app developers"];
const traffic = "M0 120 C40 116 70 104 100 106 S160 88 190 80 S250 60 280 52 S340 22 400 12";

export function SeoScene() {
  return (
    <Canvas>
      {/* The results page. */}
      <Paper style={at(0, 30, 370, 330)} className="p-[2.4cqw] motion-safe:animate-drift">
        <div className="flex items-center gap-[1.4cqw] rounded-full border border-primary/15 px-[1.8cqw] py-[1.2cqw]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-[2.4cqw] text-primary/45">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <span className="text-[1.8cqw] text-primary/80">web design agency</span>
        </div>
        <div className="mt-[2cqw] flex flex-col gap-[1.4cqw]">
          {/* Your site, rising to the top. */}
          <div className="order-first rounded-[1.4cqw] bg-crimson/[0.06] p-[1.6cqw] ring-1 ring-crimson/25 motion-safe:animate-[rise_1s_var(--ease-out-soft)_0.8s_both]">
            <span className="flex items-center gap-[1cqw]">
              <span className="size-[2.4cqw] rounded-full bg-brand-gradient" />
              <span className="text-[1.5cqw] text-primary/60">your-site.com</span>
              <span className="ml-auto rounded-full bg-brand-gradient px-[1.2cqw] py-[0.3cqw] text-[1.4cqw] font-semibold text-white">#1</span>
            </span>
            <Bar className="mt-[1cqw] h-[1.8cqw] w-4/5 bg-crimson/80" />
            <Bar className="mt-[0.8cqw] w-full bg-primary/20" />
          </div>
          {[0, 1, 2].map((result) => (
            <div key={result} className="px-[1.6cqw]">
              <span className="flex items-center gap-[1cqw]">
                <span className="size-[2.4cqw] rounded-full bg-primary/10" />
                <Bar className="h-[1cqw] w-[12cqw] bg-primary/20" />
              </span>
              <Bar className="mt-[1cqw] h-[1.6cqw] w-3/5 bg-[#3a4cc4]/50" />
              <Bar className="mt-[0.8cqw] w-11/12 bg-primary/15" />
            </div>
          ))}
        </div>
      </Paper>

      {/* Keywords and traffic. */}
      <Glass style={{ ...at(320, 170, 270, 260), ...delay(-2) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[2cqw] font-semibold text-white">Keyword positions</span>
        <div className="mt-[1.4cqw] space-y-[1.1cqw]">
          {keywords.map((keyword, index) => (
            <div key={keyword} className="flex items-center justify-between text-[1.6cqw]">
              <span className="text-light/75">{keyword}</span>
              <span
                className="flex items-center gap-[0.5cqw] rounded-full bg-[#2fbf71]/15 px-[1.1cqw] py-[0.3cqw] font-semibold text-[#5be09a] motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both]"
                style={delay(0.6 + index * 0.3)}
              >
                ↑ Rising
              </span>
            </div>
          ))}
        </div>
        <span className="mt-[2cqw] block text-[1.5cqw] text-light/55">Organic traffic</span>
        <svg viewBox="0 0 400 130" className="mt-[0.8cqw] h-auto w-full overflow-visible">
          <defs>
            <linearGradient id="seo-line" x1="0" x2="1">
              <stop offset="0" stopColor="#c91d4c" />
              <stop offset="1" stopColor="#fa6143" />
            </linearGradient>
            <linearGradient id="seo-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#fa6143" stopOpacity="0.35" />
              <stop offset="1" stopColor="#fa6143" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${traffic} L400 130 L0 130 Z`} fill="url(#seo-area)" className="motion-safe:animate-[rise_1.6s_var(--ease-out-soft)_0.8s_both]" />
          <path
            d={traffic}
            pathLength={1}
            fill="none"
            stroke="url(#seo-line)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="1"
            className="motion-safe:animate-draw"
            style={delay(0.6)}
          />
        </svg>
      </Glass>

      <Toast label="Rankings rising" detail="Your key search terms" style={at(30, 395)} wait={-1}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4M8 11l2 2 4-4" />
      </Toast>
    </Canvas>
  );
}
