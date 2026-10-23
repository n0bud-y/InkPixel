import type { ReactNode } from "react";
import figma from "@/assets/images/technologies/menu/figma.svg";
import { at, Bar, Canvas, delay, LogoTile, Toast } from "../../parts";

// UI/UX Design for Apps: a design canvas with the user flow (wireframe, then the finished
// sign-up and home screens joined by flow arrows), a teammate's cursor, a Figma tile, and a
// "Prototype ready" toast.

function Artboard({ label, x, wait, children }: { label: string; x: number; wait: number; children: ReactNode }) {
  return (
    <div className="absolute motion-safe:animate-drift" style={{ ...at(x, 120, 150, 290), ...delay(wait) }}>
      <span className="block text-[1.4cqw] text-light/55">{label}</span>
      <div className="mt-[0.8cqw] h-[calc(100%-2.4cqw)] overflow-hidden rounded-[2.2cqw] shadow-[0_3cqw_6cqw_-2cqw_rgb(0_0_0_/_0.6)]">{children}</div>
    </div>
  );
}

export function AppUiUxScene() {
  return (
    <Canvas>
      {/* The design canvas. */}
      <div className="absolute inset-[2%] rounded-[3cqw] border border-white/10 bg-[radial-gradient(circle,rgb(255_255_255_/_0.08)_1px,transparent_1px)] bg-[size:3cqw_3cqw]" />

      {/* Flow arrows between the screens. */}
      <svg viewBox="0 0 600 500" className="absolute inset-0 size-full overflow-visible">
        {["M180 260 C205 260 205 260 225 260", "M380 260 C405 260 405 260 425 260"].map((d) => (
          <g key={d}>
            <path d={d} fill="none" stroke="#fa6143" strokeWidth="2.5" strokeDasharray="5 5" className="motion-safe:animate-dash-travel" />
            <path d={d.replace(/^M(\d+) (\d+).* (\d+) (\d+)$/, "M$3 $4 l-8 -6 M$3 $4 l-8 6")} fill="none" stroke="#fa6143" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ))}
      </svg>

      <Artboard label="Wireframe" x={30} wait={-0.5}>
        <div className="size-full bg-white p-[1.8cqw]">
          <span className="block aspect-[4/3] rounded-[1cqw] border-[0.3cqw] border-dashed border-primary/25" />
          <Bar className="mt-[1.6cqw] h-[1.6cqw] w-4/5 bg-primary/20" />
          <Bar className="mt-[0.8cqw] w-full bg-primary/10" />
          <span className="mt-[1.6cqw] block h-[3.6cqw] rounded-[1cqw] border-[0.3cqw] border-primary/20" />
          <span className="mt-[1cqw] block h-[3.6cqw] rounded-[1cqw] border-[0.3cqw] border-primary/20" />
          <span className="mt-[1.6cqw] block h-[3.6cqw] rounded-full bg-primary/20" />
        </div>
      </Artboard>

      <Artboard label="Sign up" x={230} wait={-1.7}>
        <div className="size-full bg-[#fbf7f4] p-[1.8cqw]">
          <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.4cqw] bg-brand-gradient">
            <span className="size-[6cqw] rounded-[45%_45%_50%_50%] bg-white" />
          </div>
          <Bar className="mt-[1.6cqw] h-[1.6cqw] w-4/5 bg-primary/85" />
          <Bar className="mt-[0.8cqw] w-full bg-primary/20" />
          <span className="mt-[1.6cqw] block h-[3.6cqw] rounded-[1cqw] border border-primary/15 bg-white" />
          <span className="mt-[1cqw] block h-[3.6cqw] rounded-[1cqw] border border-coral bg-white ring-[0.4cqw] ring-coral/20" />
          <span className="mt-[1.6cqw] block h-[3.6cqw] rounded-full bg-brand-gradient-reverse" />
        </div>
      </Artboard>

      <Artboard label="Home" x={430} wait={-2.9}>
        <div className="size-full bg-[#fbf7f4] p-[1.8cqw]">
          <span className="flex items-center justify-between">
            <Bar className="h-[1.6cqw] w-1/2 bg-primary/85" />
            <span className="size-[3cqw] rounded-full bg-brand-gradient-reverse" />
          </span>
          <div className="mt-[1.4cqw] rounded-[1.4cqw] bg-primary p-[1.4cqw]">
            <Bar className="h-[1.4cqw] w-3/4 bg-white" />
            <span className="mt-[1.2cqw] block h-[2.6cqw] w-[8cqw] rounded-full bg-brand-gradient" />
          </div>
          {[0, 1, 2].map((row) => (
            <span key={row} className="mt-[1.1cqw] flex items-center gap-[1cqw] rounded-[1.1cqw] bg-white p-[1cqw]">
              <span className={`size-[3cqw] rounded-[0.8cqw] ${row === 0 ? "bg-coral" : "bg-primary/10"}`} />
              <Bar className="h-[0.9cqw] w-3/5 bg-primary/40" />
            </span>
          ))}
        </div>
      </Artboard>

      {/* A teammate's cursor. */}
      <div className="absolute motion-safe:animate-drift" style={{ ...at(330, 330), ...delay(-1.2) }}>
        <svg viewBox="0 0 24 24" className="size-[3.4cqw] fill-coral stroke-white" strokeWidth="1.5">
          <path d="M4 3l16 7-7 2-3 7L4 3Z" />
        </svg>
        <span className="ml-[2.4cqw] inline-block rounded-full bg-coral px-[1.2cqw] py-[0.4cqw] text-[1.4cqw] font-semibold text-white">Designer</span>
      </div>

      <Toast label="Prototype ready" detail="Clickable, ready to test" style={at(30, 425)} wait={-2.2}>
        <path d="M9 9l5 12 1.8-5.2L21 14 9 9ZM7.2 2.2 8 5.1M5.1 8l-2.9-.8M14 4.1 12 6.2M6.2 12l-2.1 2" />
      </Toast>

      <LogoTile logo={figma} label="Figma" style={at(440, 20)} wait={-0.6} />
    </Canvas>
  );
}
