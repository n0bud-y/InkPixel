import { at, Bar, Canvas, delay, Glass, IconBadge, Paper, Toast } from "../../parts";

// Paid Advertising: a sponsored search ad and a social ad, an A/B test with the winning variant
// marked, the daily budget slider, a "Campaign live" toast, and a target badge. No spend or
// return figures, so nothing reads as a claimed result.

export function PaidAdsScene() {
  return (
    <Canvas>
      {/* The search ad. */}
      <Paper style={at(0, 40, 330, 130)} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="flex items-center gap-[1cqw] text-[1.5cqw]">
          <span className="font-semibold text-primary">Sponsored</span>
          <span className="text-primary/45">· your-site.com</span>
        </span>
        <span className="mt-[1cqw] block text-[2.2cqw] font-semibold text-[#3a4cc4]">Get a Free Quote Today</span>
        <Bar className="mt-[1.2cqw] w-full bg-primary/20" />
        <Bar className="mt-[0.8cqw] w-4/5 bg-primary/20" />
        <span className="mt-[1.4cqw] flex gap-[1.4cqw] text-[1.5cqw] text-[#3a4cc4]">
          <span>Pricing</span>
          <span>Our work</span>
          <span>Contact</span>
        </span>
      </Paper>

      {/* The social ad. */}
      <Paper style={{ ...at(30, 195, 220, 250), ...delay(-2.4) }} className="p-[1.8cqw] motion-safe:animate-drift">
        <span className="flex items-center gap-[1cqw]">
          <span className="size-[3.6cqw] rounded-full bg-primary" />
          <span className="space-y-[0.5cqw]">
            <Bar className="h-[1cqw] w-[10cqw] bg-primary/60" />
            <span className="block text-[1.3cqw] text-primary/45">Sponsored</span>
          </span>
        </span>
        <div className="relative mt-[1.4cqw] aspect-[4/3] overflow-hidden rounded-[1.4cqw] bg-brand-gradient">
          <span className="absolute -top-[3cqw] -right-[3cqw] size-[14cqw] rounded-full bg-white/15" />
          <span className="absolute inset-x-[1.6cqw] bottom-[1.6cqw] space-y-[0.8cqw]">
            <Bar className="h-[1.8cqw] w-4/5 bg-white" />
            <Bar className="h-[1.8cqw] w-1/2 bg-white" />
          </span>
        </div>
        <span className="mt-[1.4cqw] flex items-center justify-between rounded-[1cqw] bg-primary/[0.05] px-[1.4cqw] py-[1cqw]">
          <Bar className="w-[10cqw] bg-primary/40" />
          <span className="rounded-full bg-primary px-[1.4cqw] py-[0.5cqw] text-[1.3cqw] font-semibold text-white">Learn more</span>
        </span>
      </Paper>

      {/* The A/B test and budget. */}
      <Glass style={{ ...at(300, 130, 290, 270), ...delay(-1.2) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[2cqw] font-semibold text-white">A/B test</span>
        <div className="mt-[1.6cqw] grid grid-cols-2 gap-[1.4cqw]">
          {[
            { name: "A", height: "h-[9cqw]", win: false },
            { name: "B", height: "h-[14cqw]", win: true },
          ].map((variant, index) => (
            <div key={variant.name} className={`rounded-[1.4cqw] p-[1.4cqw] ${variant.win ? "bg-white/[0.08] ring-1 ring-coral/60" : "bg-white/[0.04]"}`}>
              <span className="flex items-center justify-between">
                <span className="text-[1.8cqw] font-semibold text-white">Ad {variant.name}</span>
                {variant.win && <span className="rounded-full bg-brand-gradient px-[1cqw] py-[0.3cqw] text-[1.2cqw] font-semibold text-white">Winner</span>}
              </span>
              <span className="mt-[1.4cqw] flex h-[14cqw] items-end">
                <span
                  className={`w-full rounded-[0.8cqw] ${variant.height} ${variant.win ? "bg-brand-gradient" : "bg-white/20"} motion-safe:animate-[rise_0.8s_var(--ease-out-soft)_both]`}
                  style={delay(0.6 + index * 0.4)}
                />
              </span>
            </div>
          ))}
        </div>
        <div className="mt-[2cqw] flex items-center justify-between text-[1.5cqw] text-light/60">
          <span>Daily budget</span>
          <span className="text-light/85">Optimised</span>
        </div>
        <span className="relative mt-[1cqw] block h-[0.9cqw] rounded-full bg-white/15">
          <span className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-brand-gradient" />
          <span className="absolute top-1/2 left-2/3 size-[2.6cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5cqw] border-coral bg-white" />
        </span>
      </Glass>

      <Toast label="Campaign live" detail="Search · Social · Display" style={at(320, 420)} wait={-0.8}>
        <path d="M4 10v4h3l6 4V6L7 10H4ZM16.5 9a4 4 0 0 1 0 6" />
      </Toast>

      <IconBadge style={at(420, 30, 70)} wait={-2.8}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="0.5" />
      </IconBadge>
    </Canvas>
  );
}
