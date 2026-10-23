import { at, Bar, Browser, Canvas, delay, Paper, Phone, Toast } from "../../parts";

// Website Development: one site on a desktop browser, a tablet, and a phone (the layout
// reflowing for each), a "Performance: Good" gauge drawing in, and a "Site is live" toast.

// The site's page, shared by the three screens; `columns` is how many cards fit in a row.
function Site({ columns }: { columns: 1 | 2 | 3 }) {
  return (
    <div className="p-[2cqw]">
      <div className="flex items-center justify-between">
        <span className="h-[2.2cqw] w-[8cqw] rounded-full bg-brand-gradient" />
        {columns === 3 ? (
          <span className="flex items-center gap-[1.4cqw]">
            <Bar className="w-[4.5cqw] bg-primary/15" />
            <Bar className="w-[4.5cqw] bg-primary/15" />
            <Bar className="w-[4.5cqw] bg-primary/15" />
            <span className="h-[2.6cqw] w-[8cqw] rounded-full bg-primary" />
          </span>
        ) : (
          <span className="flex flex-col gap-[0.6cqw]">
            <Bar className="h-[0.6cqw] w-[3.4cqw] bg-primary/40" />
            <Bar className="h-[0.6cqw] w-[3.4cqw] bg-primary/40" />
          </span>
        )}
      </div>
      <div className="relative mt-[2cqw] overflow-hidden rounded-[1.6cqw] bg-linear-to-br from-[#2a2f63] to-primary p-[2.4cqw]">
        <span className="absolute -top-[4cqw] -right-[3cqw] size-[16cqw] rounded-full bg-coral/60 blur-[2.4cqw]" />
        <span className="absolute -bottom-[5cqw] left-[20%] size-[12cqw] rounded-full bg-crimson/60 blur-[2.4cqw]" />
        <span className="relative block space-y-[1cqw]">
          <Bar className="h-[2cqw] w-4/5 bg-white" />
          <Bar className="h-[2cqw] w-3/5 bg-white/85" />
          <Bar className="w-2/3 bg-white/35" />
          <span className="!mt-[1.8cqw] block h-[3cqw] w-[11cqw] rounded-full bg-brand-gradient-reverse" />
        </span>
      </div>
      <div className={`mt-[1.8cqw] grid gap-[1.4cqw] ${columns === 3 ? "grid-cols-3" : columns === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
        {Array.from({ length: columns === 1 ? 2 : columns }, (_, card) => (
          <div key={card} className="rounded-[1.2cqw] bg-primary/[0.04] p-[1.3cqw]">
            <span className="block size-[2.8cqw] rounded-[0.8cqw] bg-brand-gradient opacity-80" />
            <Bar className="mt-[1.1cqw] w-full bg-primary/15" />
            <Bar className="mt-[0.7cqw] w-2/3 bg-primary/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function WebDevelopmentScene() {
  return (
    <Canvas>
      <Browser url="your-business.com" style={at(0, 60, 400, 300)} className="motion-safe:animate-drift">
        <Site columns={3} />
      </Browser>

      {/* The tablet. */}
      <div className="absolute motion-safe:animate-drift" style={{ ...at(330, 140, 170, 230), ...delay(-1.8) }}>
        <div className="size-full rounded-[3cqw] border border-white/15 bg-[#0b0e24] p-[1cqw] shadow-[0_4cqw_8cqw_-2cqw_rgb(0_0_0_/_0.7)]">
          <div className="size-full overflow-hidden rounded-[2.2cqw] bg-white">
            <Site columns={2} />
          </div>
        </div>
      </div>

      <Phone style={{ ...at(475, 210, 115, 240), ...delay(-3) }} className="motion-safe:animate-drift">
        <div className="size-full bg-white pt-[3cqw]">
          <Site columns={1} />
        </div>
      </Phone>

      {/* The performance gauge. */}
      <Paper style={{ ...at(40, 385, 205), ...delay(-1) }} className="flex items-center gap-[1.8cqw] p-[1.8cqw] motion-safe:animate-drift">
        <svg viewBox="0 0 48 48" className="size-[7cqw] shrink-0 -rotate-90">
          <defs>
            <linearGradient id="wd-gauge" x1="0" x2="1">
              <stop offset="0" stopColor="#c91d4c" />
              <stop offset="1" stopColor="#fa6143" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="6" />
          <circle
            cx="24"
            cy="24"
            r="19"
            fill="none"
            stroke="url(#wd-gauge)"
            strokeWidth="6"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="0.92 1"
            className="motion-safe:animate-draw"
            style={delay(0.6)}
          />
        </svg>
        <span>
          <span className="block text-[1.6cqw] text-primary/55">Performance</span>
          <span className="block text-[2.4cqw] font-semibold">Good</span>
        </span>
      </Paper>

      <Toast label="Site is live" detail="your-business.com" style={at(250, 8)} wait={-2.4}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
      </Toast>
    </Canvas>
  );
}
