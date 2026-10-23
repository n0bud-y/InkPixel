import figma from "@/assets/images/technologies/menu/figma.svg";
import { at, Canvas, delay, Glass, LogoTile, Paper, Toast } from "../../parts";

// Brand Identity / Logo Design: an artboard with a logo mark drawing in over its construction
// circles (pen handles at its points) and the wordmark, the logo's colour, reversed, and
// one-colour versions, a "Logo approved" toast, and a Figma tile.

// The mark, on a 100 × 100 grid: a drop with a cut-out circle.
const drop = "M50 8 C50 8 82 44 82 63 A32 32 0 0 1 18 63 C18 44 50 8 50 8 Z";

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path d={drop} fill="currentColor" />
      <circle cx="50" cy="63" r="12" fill="var(--mark-hole, white)" />
    </svg>
  );
}

export function BrandIdentityScene() {
  return (
    <Canvas>
      {/* The artboard. */}
      <Paper style={at(0, 30, 380, 340)} className="overflow-hidden motion-safe:animate-drift">
        <div className="flex items-center justify-between border-b border-primary/10 px-[2cqw] py-[1.3cqw] text-[1.5cqw] text-primary/50">
          <span>Logo · Primary</span>
          <span className="font-mono">100%</span>
        </div>
        <div className="relative grid h-[calc(100%-4.4cqw)] place-items-center bg-[radial-gradient(circle,rgb(21_25_54_/_0.08)_1px,transparent_1px)] bg-[size:3cqw_3cqw]">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 100 100" className="size-[24cqw] overflow-visible">
              <defs>
                <linearGradient id="bi-mark" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0" stopColor="#fa6143" />
                  <stop offset="1" stopColor="#c91d4c" />
                </linearGradient>
              </defs>
              {/* Construction circles. */}
              <circle cx="50" cy="63" r="32" fill="none" stroke="#c91d4c" strokeOpacity="0.25" strokeDasharray="2 2" />
              <circle cx="50" cy="63" r="12" fill="none" stroke="#c91d4c" strokeOpacity="0.25" strokeDasharray="2 2" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#c91d4c" strokeOpacity="0.15" />
              {/* The mark fills in once its outline is drawn. */}
              <path d={drop} fill="url(#bi-mark)" className="motion-safe:animate-[rise_0.8s_var(--ease-out-soft)_2s_both]" />
              <circle cx="50" cy="63" r="12" fill="white" className="motion-safe:animate-[rise_0.8s_var(--ease-out-soft)_2s_both]" />
              <path
                d={drop}
                pathLength={1}
                fill="none"
                stroke="#c91d4c"
                strokeWidth="1.5"
                strokeDasharray="1"
                className="motion-safe:animate-draw"
                style={delay(0.3)}
              />
              {/* Pen handles at the points. */}
              {[
                [50, 8],
                [82, 63],
                [18, 63],
              ].map(([x, y]) => (
                <rect key={`${x}-${y}`} x={x - 2.5} y={y - 2.5} width="5" height="5" fill="white" stroke="#c91d4c" strokeWidth="1" />
              ))}
              <line x1="82" y1="44" x2="82" y2="80" stroke="#c91d4c" strokeOpacity="0.5" />
              <circle cx="82" cy="44" r="1.8" fill="#c91d4c" />
              <circle cx="82" cy="80" r="1.8" fill="#c91d4c" />
            </svg>
            <span className="mt-[2cqw] font-display text-[5cqw] leading-none font-semibold tracking-[-0.04em] text-primary">nova</span>
          </div>
        </div>
      </Paper>

      {/* The versions. */}
      <Glass style={{ ...at(330, 215, 260, 190), ...delay(-2) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[2cqw] font-semibold text-white">Logo versions</span>
        <div className="mt-[1.8cqw] grid grid-cols-3 gap-[1.4cqw]">
          <span className="grid aspect-square place-items-center rounded-[1.4cqw] bg-white">
            <Mark className="size-1/2 text-crimson" />
          </span>
          <span className="grid aspect-square place-items-center rounded-[1.4cqw] bg-brand-gradient [--mark-hole:#e2394d]">
            <Mark className="size-1/2 text-white" />
          </span>
          <span className="grid aspect-square place-items-center rounded-[1.4cqw] bg-[#0b0e24] [--mark-hole:#0b0e24]">
            <Mark className="size-1/2 text-white" />
          </span>
        </div>
        <div className="mt-[1.6cqw] flex justify-between text-[1.4cqw] text-light/55">
          <span>Colour</span>
          <span>Reversed</span>
          <span>One colour</span>
        </div>
      </Glass>

      <Toast label="Logo approved" detail="Final files exported" style={at(30, 400)} wait={-1.2}>
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </Toast>
      <LogoTile logo={figma} label="Figma" style={at(430, 60)} wait={-0.6} />
    </Canvas>
  );
}
