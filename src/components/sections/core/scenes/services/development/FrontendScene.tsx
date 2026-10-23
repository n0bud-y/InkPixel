import react from "@/assets/images/technologies/menu/react.svg";
import tailwindcss from "@/assets/images/technologies/menu/tailwindcss.svg";
import typescript from "@/assets/images/technologies/menu/typescript.svg";
import { at, Bar, Canvas, delay, Glass, LogoTile, Paper, Toast } from "../../parts";

// Frontend Development: a component library (buttons, a switch, a checkbox, a slider, an input,
// tags), a page laid out on a 12-column grid with the breakpoint ruler on "lg", an "Accessible"
// toast, and React, TypeScript, and Tailwind CSS tiles.

const breakpoints = ["sm", "md", "lg", "xl"];

export function FrontendScene() {
  return (
    <Canvas>
      {/* The component library. */}
      <Glass style={at(0, 30, 320, 285)} className="p-[2.4cqw] motion-safe:animate-drift">
        <div className="flex items-center justify-between">
          <span className="text-[2.1cqw] font-semibold text-white">Components</span>
          <span className="rounded-full bg-white/[0.08] px-[1.4cqw] py-[0.5cqw] font-mono text-[1.4cqw] text-light/70">v2.4</span>
        </div>
        <div className="mt-[2.2cqw] flex flex-wrap items-center gap-[1.4cqw]">
          <span className="rounded-full bg-brand-gradient-reverse px-[2.4cqw] py-[1cqw] text-[1.6cqw] font-semibold text-white">Primary</span>
          <span className="rounded-full border border-white/25 px-[2.4cqw] py-[1cqw] text-[1.6cqw] font-semibold text-white">Secondary</span>
        </div>
        <div className="mt-[2.2cqw] flex items-center gap-[2.4cqw]">
          {/* A switch, on. */}
          <span className="flex h-[3.2cqw] w-[6cqw] items-center justify-end rounded-full bg-brand-gradient p-[0.4cqw]">
            <span className="size-[2.4cqw] rounded-full bg-white" />
          </span>
          {/* A checkbox, ticked. */}
          <span className="grid size-[3.2cqw] place-items-center rounded-[0.8cqw] bg-coral text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-[2cqw]">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </svg>
          </span>
          {/* A slider. */}
          <span className="relative h-[0.9cqw] flex-1 rounded-full bg-white/15">
            <span className="absolute inset-y-0 left-0 w-3/5 rounded-full bg-brand-gradient" />
            <span className="absolute top-1/2 left-3/5 size-[2.8cqw] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.5cqw] border-coral bg-white" />
          </span>
        </div>
        <span className="mt-[2.2cqw] flex h-[4.4cqw] items-center rounded-[1.2cqw] border border-white/15 bg-white/[0.05] px-[1.6cqw]">
          <Bar className="w-2/5 bg-white/30" />
        </span>
        <div className="mt-[2cqw] flex flex-wrap gap-[1cqw]">
          {["Design tokens", "Dark mode", "Responsive"].map((tag) => (
            <span key={tag} className="rounded-full bg-white/[0.08] px-[1.4cqw] py-[0.6cqw] text-[1.4cqw] text-light/75">
              {tag}
            </span>
          ))}
        </div>
      </Glass>

      {/* The page on its grid. */}
      <Paper style={{ ...at(240, 170, 350, 255), ...delay(-2.2) }} className="overflow-hidden motion-safe:animate-drift">
        <div className="flex items-center gap-[1cqw] border-b border-primary/10 bg-primary/[0.03] px-[1.8cqw] py-[1.2cqw]">
          {breakpoints.map((point) => (
            <span
              key={point}
              className={`rounded-full px-[1.4cqw] py-[0.4cqw] font-mono text-[1.4cqw] ${point === "lg" ? "bg-primary text-white" : "text-primary/45"}`}
            >
              {point}
            </span>
          ))}
          <span className="ml-auto font-mono text-[1.4cqw] text-primary/40">1280px</span>
        </div>
        <div className="relative p-[2cqw]">
          {/* The 12 columns. */}
          <div aria-hidden="true" className="absolute inset-[2cqw] grid grid-cols-12 gap-[0.8cqw]">
            {Array.from({ length: 12 }, (_, column) => (
              <span key={column} className="rounded-[0.4cqw] bg-crimson/[0.06]" />
            ))}
          </div>
          <div className="relative grid grid-cols-12 gap-[0.8cqw]">
            <div className="col-span-7 space-y-[1cqw] py-[1cqw]">
              <Bar className="h-[2.2cqw] w-full bg-primary/85" />
              <Bar className="h-[2.2cqw] w-3/4 bg-primary/85" />
              <Bar className="w-5/6 bg-primary/20" />
              <span className="!mt-[1.6cqw] block h-[3.2cqw] w-[11cqw] rounded-full bg-brand-gradient-reverse" />
            </div>
            <div className="col-span-5 aspect-square rounded-[1.4cqw] bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]" />
            {[0, 1, 2].map((card) => (
              <div key={card} className="col-span-4 mt-[1cqw] rounded-[1.2cqw] border border-primary/10 bg-white p-[1.2cqw]">
                <span className="block size-[2.6cqw] rounded-[0.8cqw] bg-brand-gradient opacity-80" />
                <Bar className="mt-[1cqw] w-full bg-primary/15" />
              </div>
            ))}
          </div>
        </div>
      </Paper>

      <Toast label="Accessible" detail="Keyboard and screen readers" style={at(20, 350)} wait={-1.2}>
        <circle cx="12" cy="4.5" r="1.5" />
        <path d="M5 8.5 12 10l7-1.5M12 10v4.5M12 14.5 8.5 21M12 14.5l3.5 6.5" />
      </Toast>

      <LogoTile logo={react} label="React" style={at(370, 30)} wait={-0.6} />
      <LogoTile logo={typescript} label="TypeScript" style={at(440, 98)} wait={-2.4} />
      <LogoTile logo={tailwindcss} label="Tailwind CSS" style={at(40, 430)} wait={-3.6} />
    </Canvas>
  );
}
