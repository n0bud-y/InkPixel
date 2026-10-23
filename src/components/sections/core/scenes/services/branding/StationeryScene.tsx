import { at, Bar, Canvas, delay, Paper, Toast } from "../../parts";

// Stationery Design: a letterhead, an envelope, and a business card (its navy front and white
// back), an email signature, and a "Print-ready files" toast.

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-[0.8cqw] ${className}`}>
      <span className="size-[2.6cqw] rounded-[45%_45%_50%_50%] bg-brand-gradient" />
      <span className="font-display text-[2cqw] leading-none font-semibold tracking-[-0.03em]">nova</span>
    </span>
  );
}

export function StationeryScene() {
  return (
    <Canvas>
      {/* The letterhead. */}
      <Paper style={{ ...at(20, 20, 250, 340), rotate: "-4deg" }} className="flex flex-col p-[2.6cqw] motion-safe:animate-drift">
        <div className="flex items-start justify-between">
          <Logo className="text-primary" />
          <span className="space-y-[0.6cqw] text-right">
            <Bar className="ml-auto h-[0.8cqw] w-[10cqw] bg-primary/25" />
            <Bar className="ml-auto h-[0.8cqw] w-[7cqw] bg-primary/25" />
          </span>
        </div>
        <span className="mt-[2cqw] block h-[0.3cqw] w-full bg-brand-gradient" />
        <div className="mt-[3cqw] space-y-[1.1cqw]">
          <Bar className="w-1/3 bg-primary/50" />
          <Bar className="!mt-[2cqw] w-full bg-primary/20" />
          <Bar className="w-full bg-primary/20" />
          <Bar className="w-11/12 bg-primary/20" />
          <Bar className="w-full bg-primary/20" />
          <Bar className="w-3/5 bg-primary/20" />
        </div>
        <svg viewBox="0 0 120 30" className="mt-auto h-[5cqw] w-[18cqw] overflow-visible">
          <path
            d="M2 22 C12 4 20 30 30 16 S44 6 52 18 S70 28 80 12 S100 14 118 10"
            pathLength={1}
            fill="none"
            stroke="#151936"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1"
            className="motion-safe:animate-draw"
            style={delay(0.8)}
          />
        </svg>
        <Bar className="mt-[0.6cqw] h-[0.8cqw] w-[14cqw] bg-primary/30" />
      </Paper>

      {/* The envelope. */}
      <Paper style={{ ...at(250, 30, 330, 190), ...delay(-1.6) }} className="overflow-hidden motion-safe:animate-drift">
        <svg viewBox="0 0 330 190" preserveAspectRatio="none" className="absolute inset-0 size-full">
          <path d="M0 0 L165 105 L330 0" fill="none" stroke="#151936" strokeOpacity="0.12" strokeWidth="1.5" />
        </svg>
        <Logo className="absolute top-[2cqw] left-[2.4cqw] text-primary" />
        <span className="absolute right-[3cqw] bottom-[3cqw] space-y-[0.8cqw]">
          <Bar className="w-[16cqw] bg-primary/40" />
          <Bar className="w-[12cqw] bg-primary/20" />
          <Bar className="w-[14cqw] bg-primary/20" />
        </span>
      </Paper>

      {/* The business card: back, then front. */}
      <Paper style={{ ...at(300, 250, 230, 135), rotate: "6deg", ...delay(-2.6) }} className="flex flex-col justify-end p-[2.2cqw] motion-safe:animate-drift">
        <Bar className="h-[1.8cqw] w-1/2 bg-primary/85" />
        <Bar className="mt-[0.8cqw] h-[1cqw] w-1/3 bg-crimson/60" />
        <div className="mt-[2cqw] space-y-[0.7cqw]">
          <Bar className="h-[0.8cqw] w-3/5 bg-primary/25" />
          <Bar className="h-[0.8cqw] w-1/2 bg-primary/25" />
        </div>
      </Paper>
      <div className="absolute motion-safe:animate-drift" style={{ ...at(250, 300, 230, 135), rotate: "-5deg", ...delay(-0.9) }}>
        <div className="relative grid size-full place-items-center overflow-hidden rounded-[1.6cqw] bg-primary shadow-[0_3cqw_6cqw_-2cqw_rgb(0_0_0_/_0.7)]">
          <span className="absolute -top-[6cqw] -right-[5cqw] size-[18cqw] rounded-full bg-crimson/50 blur-[3cqw]" />
          <Logo className="relative text-white" />
        </div>
      </div>

      <Toast label="Print-ready files" detail="PDF · CMYK · bleed" style={at(30, 400)} wait={-1.3}>
        <path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7v-7Z" />
      </Toast>
    </Canvas>
  );
}
