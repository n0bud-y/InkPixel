import { at, Bar, Canvas, delay, Glass, IconBadge, LineIcon, Paper } from "./parts";

// Marketing: a campaign dashboard with a rising line drawing in over bars, a social post, and
// floating search, email, and megaphone badges. No figures, so nothing reads as a claimed result.

// The chart's line and the area under it, on a 400 × 160 grid.
const line = "M0 135 C40 128 60 110 95 112 S150 92 185 86 S240 60 275 62 S335 30 400 14";
const bars = [62, 80, 70, 96, 88, 112, 104, 126];

export function MarketingScene() {
  return (
    <Canvas>
      {/* The dashboard. */}
      <Glass style={at(20, 40, 400, 290)} className="p-[2.6cqw] motion-safe:animate-drift">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[2.2cqw] font-semibold text-white">Campaign overview</p>
            <p className="mt-[0.4cqw] text-[1.6cqw] text-light/55">All channels</p>
          </div>
          <span className="rounded-full bg-white/[0.08] px-[1.6cqw] py-[0.6cqw] text-[1.5cqw] text-light/70">Last 30 days</span>
        </div>
        <div className="mt-[2cqw] flex gap-[1.6cqw]">
          {[
            ["Reach", "bg-coral"],
            ["Clicks", "bg-crimson"],
          ].map(([label, color]) => (
            <span key={label} className="flex items-center gap-[0.8cqw] text-[1.5cqw] text-light/70">
              <span className={`size-[1.3cqw] rounded-full ${color}`} />
              {label}
            </span>
          ))}
        </div>
        <svg viewBox="0 0 400 160" className="mt-[1.6cqw] h-auto w-full overflow-visible">
          <defs>
            <linearGradient id="mk-line" x1="0" x2="1">
              <stop offset="0" stopColor="#c91d4c" />
              <stop offset="1" stopColor="#fa6143" />
            </linearGradient>
            <linearGradient id="mk-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#fa6143" stopOpacity="0.35" />
              <stop offset="1" stopColor="#fa6143" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[40, 80, 120].map((y) => (
            <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="white" strokeOpacity="0.06" />
          ))}
          {bars.map((height, index) => (
            <rect key={index} x={14 + index * 48} y={160 - height} width="22" height={height} rx="5" fill="white" fillOpacity="0.07" />
          ))}
          <path d={`${line} L400 160 L0 160 Z`} fill="url(#mk-area)" className="motion-safe:animate-[rise_1.6s_var(--ease-out-soft)_0.6s_both]" />
          <path
            d={line}
            pathLength={1}
            fill="none"
            stroke="url(#mk-line)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1"
            className="motion-safe:animate-draw"
            style={delay(0.4)}
          />
          <circle cx="400" cy="14" r="7" fill="#fa6143" stroke="white" strokeWidth="3" />
        </svg>
      </Glass>

      {/* "Reach rising". */}
      <div className="absolute" style={at(300, 4, 170)}>
        <div className="flex items-center gap-[1.2cqw] rounded-full bg-white px-[1.6cqw] py-[1.2cqw] shadow-[0_2.5cqw_5cqw_-1.5cqw_rgb(0_0_0_/_0.55)] motion-safe:animate-drift" style={delay(-1.4)}>
          <span className="grid size-[3.2cqw] place-items-center rounded-full bg-brand-gradient text-white">
            <LineIcon className="size-[2cqw]">
              <path d="M4 16l5-5 4 4 7-7M14 8h6v6" />
            </LineIcon>
          </span>
          <span className="text-[2cqw] font-semibold whitespace-nowrap text-primary">Reach rising</span>
        </div>
      </div>

      {/* A social post. */}
      <Paper style={{ ...at(330, 190, 250, 290), ...delay(-2.5) }} className="p-[2cqw] motion-safe:animate-drift">
        <div className="flex items-center gap-[1.4cqw]">
          <span className="size-[4.6cqw] rounded-full bg-brand-gradient-reverse" />
          <div className="flex-1 space-y-[0.8cqw]">
            <Bar className="w-3/5 bg-primary/70" />
            <Bar className="h-[1cqw] w-2/5 bg-primary/20" />
          </div>
        </div>
        <div className="relative mt-[1.8cqw] aspect-[4/3] overflow-hidden rounded-[1.6cqw] bg-linear-to-br from-[#2a2f63] to-primary">
          <span className="absolute -top-[3cqw] -right-[3cqw] size-[16cqw] rounded-full bg-coral/70 blur-[2cqw]" />
          <span className="absolute -bottom-[4cqw] -left-[2cqw] size-[14cqw] rounded-full bg-crimson/70 blur-[2cqw]" />
          <span className="absolute inset-x-[2cqw] bottom-[2cqw] space-y-[0.9cqw]">
            <Bar className="h-[1.8cqw] w-4/5 bg-white" />
            <Bar className="h-[1.8cqw] w-1/2 bg-white/80" />
          </span>
        </div>
        <div className="mt-[1.8cqw] flex items-center gap-[2.4cqw] text-primary/60">
          <LineIcon className="size-[3cqw] fill-crimson text-crimson">
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
          </LineIcon>
          <LineIcon className="size-[3cqw]">
            <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z" />
          </LineIcon>
          <LineIcon className="size-[3cqw]">
            <path d="M4 12v7h16v-7M12 4v11M7.5 8.5 12 4l4.5 4.5" />
          </LineIcon>
        </div>
      </Paper>

      {/* Channels. */}
      <IconBadge style={at(0, 380, 64)} wait={-0.8}>
        <circle cx="11" cy="11" r="6" />
        <path d="m20 20-4.2-4.2" />
      </IconBadge>
      <IconBadge style={at(110, 420, 56)} wait={-2.6}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
      </IconBadge>
      <IconBadge style={at(220, 380, 60)} wait={-3.8}>
        <path d="M4 10v4h3l6 4V6L7 10H4ZM16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11" />
      </IconBadge>
    </Canvas>
  );
}
