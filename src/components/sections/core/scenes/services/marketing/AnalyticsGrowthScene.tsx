import { at, Canvas, delay, Glass, Paper, Toast } from "../../parts";

// Analytics & Growth Strategy: a funnel (visitors to customers) filling in, the channel mix as a
// donut, a growth plan with its next steps, and a "Weekly report ready" toast. No figures, so
// nothing reads as a claimed result.

const funnel = [
  { label: "Visitors", width: "w-full" },
  { label: "Leads", width: "w-3/4" },
  { label: "Qualified", width: "w-1/2" },
  { label: "Customers", width: "w-1/3" },
];

// The donut's slices: [share of the circle, colour].
const slices: [number, string][] = [
  [0.38, "#c91d4c"],
  [0.27, "#fa6143"],
  [0.2, "#ffc48a"],
  [0.15, "#ffffff"],
];
// Where each slice starts: the shares before it.
const starts = slices.map((_, index) => slices.slice(0, index).reduce((sum, [share]) => sum + share, 0));

const plan = [
  { step: "Fix checkout drop-off", done: true },
  { step: "Launch referral offer", done: true },
  { step: "Test new landing page", done: false },
];

export function AnalyticsGrowthScene() {
  return (
    <Canvas>
      {/* The funnel. */}
      <Glass style={at(0, 40, 340, 250)} className="p-[2.4cqw] motion-safe:animate-drift">
        <div className="flex items-center justify-between">
          <span className="text-[2.1cqw] font-semibold text-white">Conversion funnel</span>
          <span className="rounded-full bg-white/[0.08] px-[1.4cqw] py-[0.5cqw] text-[1.4cqw] text-light/70">This month</span>
        </div>
        <div className="mt-[2cqw] space-y-[1.2cqw]">
          {funnel.map((stage, index) => (
            <div key={stage.label} className="flex items-center gap-[1.6cqw]">
              <span className="w-[11cqw] shrink-0 text-[1.6cqw] text-light/70">{stage.label}</span>
              <span className="flex-1">
                <span
                  className={`mx-auto block h-[4cqw] ${stage.width} rounded-[1cqw] bg-brand-gradient motion-safe:animate-[rise_0.7s_var(--ease-out-soft)_both]`}
                  style={{ ...delay(0.4 + index * 0.25), opacity: 1 - index * 0.15 }}
                />
              </span>
            </div>
          ))}
        </div>
      </Glass>

      {/* The channel mix. */}
      <Paper style={{ ...at(360, 30, 230, 230), ...delay(-1.6) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[1.9cqw] font-semibold">Channel mix</span>
        <div className="mt-[1.4cqw] flex items-center gap-[2cqw]">
          <svg viewBox="0 0 42 42" className="size-[13cqw] -rotate-90">
            <circle cx="21" cy="21" r="15.9" fill="none" stroke="#151936" strokeOpacity="0.06" strokeWidth="7" />
            {slices.map(([share, colour], index) => (
                <circle
                  key={colour}
                  cx="21"
                  cy="21"
                  r="15.9"
                  fill="none"
                  stroke={colour === "#ffffff" ? "#151936" : colour}
                  strokeOpacity={colour === "#ffffff" ? 0.25 : 1}
                  strokeWidth="7"
                  pathLength={1}
                  strokeDasharray={`${share - 0.01} ${1 - share + 0.01}`}
                  strokeDashoffset={-starts[index]}
                  className="motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both]"
                  style={delay(0.6 + index * 0.2)}
                />
            ))}
          </svg>
          <span className="space-y-[0.9cqw] text-[1.4cqw] text-primary/70">
            {["Search", "Social", "Email", "Direct"].map((channel, index) => (
              <span key={channel} className="flex items-center gap-[0.8cqw]">
                <span className="size-[1.3cqw] rounded-full" style={{ background: index === 3 ? "rgb(21 25 54 / 0.25)" : slices[index][1] }} />
                {channel}
              </span>
            ))}
          </span>
        </div>
      </Paper>

      {/* The growth plan. */}
      <Paper style={{ ...at(250, 290, 330, 150), ...delay(-2.6) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[1.9cqw] font-semibold">Growth plan · next 90 days</span>
        <div className="mt-[1.4cqw] space-y-[1cqw]">
          {plan.map((item) => (
            <span key={item.step} className="flex items-center gap-[1.2cqw] text-[1.6cqw]">
              <span
                className={`grid size-[2.6cqw] shrink-0 place-items-center rounded-full ${item.done ? "bg-brand-gradient text-white" : "border border-primary/25"}`}
              >
                {item.done && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-[1.6cqw]">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                )}
              </span>
              <span className={item.done ? "text-primary/50 line-through decoration-primary/30" : "font-medium text-primary"}>{item.step}</span>
            </span>
          ))}
        </div>
      </Paper>

      <Toast label="Weekly report ready" detail="Insights and next steps" style={at(20, 320)} wait={-0.9}>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </Toast>
    </Canvas>
  );
}
