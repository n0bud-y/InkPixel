import { at, Bar, Canvas, delay, Glass, IconBadge, Paper, Toast } from "./parts";

// Branding: a brand board (the logo mark drawing in beside its wordmark, the colour palette, and
// a type sample), a business card leaning on it, pen-tool and palette badges, and a "Brand system
// ready" toast. A made-up brand ("nova"), so nothing reads as a client's.

// The mark, on a 100 × 100 grid: a drop with a cut-out circle (as in the Brand Identity scene).
const drop = "M50 8 C50 8 82 44 82 63 A32 32 0 0 1 18 63 C18 44 50 8 50 8 Z";

const palette = [
  { name: "Crimson", hex: "#C91D4C", className: "bg-crimson" },
  { name: "Coral", hex: "#FA6143", className: "bg-coral" },
  { name: "Navy", hex: "#151936", className: "bg-[#151936] ring-1 ring-white/15" },
  { name: "Cream", hex: "#FFF7F2", className: "bg-[#fff7f2]" },
];

function Mark({ className = "", hole = "white" }: { className?: string; hole?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path d={drop} fill="currentColor" />
      <circle cx="50" cy="63" r="12" fill={hole} />
    </svg>
  );
}

export function BrandingScene() {
  return (
    <Canvas>
      {/* The brand board. */}
      <Glass style={at(10, 20, 400, 360)} className="p-[2.6cqw] motion-safe:animate-drift">
        <div className="flex items-center justify-between">
          <p className="text-[2.2cqw] font-semibold text-white">Brand board</p>
          <span className="rounded-full bg-white/[0.08] px-[1.6cqw] py-[0.6cqw] text-[1.5cqw] text-light/70">v1.0</span>
        </div>

        {/* The logo: the mark draws itself, then fills; the wordmark beside it. */}
        <div className="mt-[2.2cqw] flex items-center gap-[2.4cqw] rounded-[1.8cqw] bg-white p-[2.2cqw]">
          <svg viewBox="0 0 100 100" className="size-[12cqw] shrink-0 overflow-visible">
            <defs>
              <linearGradient id="br-mark" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#fa6143" />
                <stop offset="1" stopColor="#c91d4c" />
              </linearGradient>
            </defs>
            <path d={drop} fill="url(#br-mark)" className="motion-safe:animate-[rise_0.8s_var(--ease-out-soft)_1.6s_both]" />
            <circle cx="50" cy="63" r="12" fill="white" className="motion-safe:animate-[rise_0.8s_var(--ease-out-soft)_1.6s_both]" />
            <path
              d={drop}
              pathLength={1}
              fill="none"
              stroke="#c91d4c"
              strokeWidth="2"
              strokeDasharray="1"
              className="motion-safe:animate-draw"
              style={delay(0.3)}
            />
          </svg>
          <div className="min-w-0">
            <p className="font-display text-[6cqw] leading-none font-semibold tracking-[-0.04em] text-primary">nova</p>
            <Bar className="mt-[1.2cqw] h-[1cqw] w-[14cqw] bg-primary/20" />
          </div>
        </div>

        {/* The palette: swatches rise in one by one. */}
        <p className="mt-[2.2cqw] text-[1.5cqw] tracking-[0.12em] text-light/55 uppercase">Colour palette</p>
        <div className="mt-[1.2cqw] grid grid-cols-4 gap-[1.2cqw]">
          {palette.map((colour, index) => (
            <div
              key={colour.name}
              className="motion-safe:animate-[rise_0.7s_var(--ease-out-soft)_both]"
              style={delay(0.5 + index * 0.15)}
            >
              <span className={`block aspect-[4/3] rounded-[1.2cqw] ${colour.className}`} />
              <span className="mt-[0.7cqw] block text-[1.4cqw] font-medium text-white">{colour.name}</span>
              <span className="block font-mono text-[1.2cqw] text-light/50">{colour.hex}</span>
            </div>
          ))}
        </div>

        {/* Typography. */}
        <div className="mt-[2.2cqw] flex items-end gap-[2.4cqw] border-t border-white/10 pt-[2cqw]">
          <span className="font-display text-[8cqw] leading-[0.85] font-bold tracking-[-0.03em] text-white">Aa</span>
          <div className="flex-1 space-y-[0.9cqw] pb-[0.6cqw]">
            <p className="text-[1.5cqw] text-light/70">Display · Bold</p>
            <Bar className="h-[1cqw] w-4/5 bg-white/25" />
            <Bar className="h-[1cqw] w-3/5 bg-white/15" />
          </div>
        </div>
      </Glass>

      {/* A business card, leaning on the board (tilted outside, drifting inside). */}
      <div className="absolute rotate-[-7deg]" style={at(345, 245, 235, 140)}>
        <Paper style={{ inset: 0, ...delay(-2.2) }} className="flex flex-col justify-between overflow-hidden p-[2.2cqw] motion-safe:animate-drift">
          <div className="flex items-center gap-[1.2cqw]">
            <Mark className="size-[4.4cqw] text-crimson" />
            <span className="font-display text-[3cqw] leading-none font-semibold tracking-[-0.04em] text-primary">nova</span>
          </div>
          <div className="space-y-[0.8cqw]">
            <Bar className="h-[1.2cqw] w-1/2 bg-primary/70" />
            <Bar className="h-[1cqw] w-2/3 bg-primary/20" />
            <Bar className="h-[1cqw] w-2/5 bg-primary/20" />
          </div>
          <span className="absolute -right-[4cqw] -bottom-[4cqw] size-[13cqw] rounded-full bg-brand-gradient opacity-90" />
        </Paper>
      </div>

      {/* Pen tool and palette. */}
      <IconBadge style={at(460, 50, 68)} wait={-0.8}>
        <path d="M12 19l7-7 3 3-7 7-3-3Z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </IconBadge>
      <IconBadge style={at(470, 160, 56)} wait={-2.6}>
        <path d="M12 22a10 10 0 1 1 10-10c0 2.8-2.2 4-4 4h-2a2 2 0 0 0-1.6 3.2A2 2 0 0 1 12 22Z" />
        <circle cx="7.5" cy="10.5" r="1" />
        <circle cx="12" cy="7.5" r="1" />
        <circle cx="16.5" cy="10.5" r="1" />
      </IconBadge>

      <Toast label="Brand system ready" detail="Logo, colours, type, guidelines" style={at(30, 412)} wait={-1.4}>
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </Toast>
    </Canvas>
  );
}
