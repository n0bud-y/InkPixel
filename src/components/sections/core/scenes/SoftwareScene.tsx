import type { ReactNode } from "react";
import { at, Bar, Canvas, delay, Glass, LineIcon } from "./parts";

// Software: a central platform joined to its modules (CRM, ERP, POS, Inventory) by lines with
// dashes travelling along them, a small orders table, and a "systems in sync" status.

const modules: { label: string; x: number; y: number; icon: ReactNode }[] = [
  {
    label: "CRM",
    x: 18,
    y: 70,
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.5M17.5 14a5 5 0 0 1 3 5" />
      </>
    ),
  },
  {
    label: "ERP",
    x: 428,
    y: 60,
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 16v-4M12 16V8M16 16v-6" />
      </>
    ),
  },
  {
    label: "POS",
    x: 8,
    y: 300,
    icon: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18M7 15h3" />
      </>
    ),
  },
  {
    label: "Inventory",
    x: 418,
    y: 290,
    icon: (
      <>
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="m4 7.5 8 4.5 8-4.5M12 12v9" />
      </>
    ),
  },
];

// Module cards are 154 × 70; the platform's centre is (300, 222).
const centre = { x: 300, y: 222 };
const link = ({ x, y }: { x: number; y: number }) => {
  const end = { x: x + 77, y: y + 35 };
  const bend = (centre.x + end.x) / 2;
  return `M${centre.x} ${centre.y} C${bend} ${centre.y} ${bend} ${end.y} ${end.x} ${end.y}`;
};

export function SoftwareScene() {
  return (
    <Canvas>
      <svg viewBox="0 0 600 500" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="sw-line" x1="0" x2="1">
            <stop offset="0" stopColor="#c91d4c" />
            <stop offset="1" stopColor="#fa6143" />
          </linearGradient>
        </defs>
        {modules.map((module, index) => (
          <g key={module.label}>
            <path d={link(module)} fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="2" strokeDasharray="5 7" />
            <path
              d={link(module)}
              pathLength={1}
              fill="none"
              stroke="url(#sw-line)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="0.08 0.92"
              className="motion-safe:animate-dash-travel"
              style={delay(-index * 0.65)}
            />
          </g>
        ))}
      </svg>

      {/* The platform. */}
      <div className="absolute" style={at(225, 150, 150, 150)}>
        <span className="absolute inset-[-12%] rounded-[4cqw] bg-crimson/30 blur-[3cqw] motion-safe:animate-glow-pulse" />
        <div className="relative grid size-full place-items-center rounded-[3.6cqw] bg-brand-gradient text-white shadow-[0_3cqw_7cqw_-2cqw_rgb(201_29_76_/_0.85)] ring-1 ring-white/25">
          <div className="text-center">
            <LineIcon className="mx-auto size-[8cqw]">
              <path d="m12 3 9 5-9 5-9-5 9-5Z" />
              <path d="m3 12.5 9 5 9-5M3 17l9 5 9-5" />
            </LineIcon>
            <p className="mt-[0.8cqw] text-[2cqw] font-semibold">Core platform</p>
          </div>
        </div>
      </div>

      {modules.map((module, index) => (
        <div key={module.label} className="absolute" style={at(module.x, module.y, 154, 70)}>
          <Glass className="inset-0 flex items-center gap-[1.6cqw] px-[2cqw] motion-safe:animate-drift" style={delay(-index * 1.1)}>
            <span className="grid size-[5.2cqw] shrink-0 place-items-center rounded-[1.4cqw] bg-white/[0.08] text-coral">
              <LineIcon className="size-[3cqw]">{module.icon}</LineIcon>
            </span>
            <span>
              <span className="block text-[2.3cqw] font-semibold text-white">{module.label}</span>
              <span className="mt-[0.6cqw] flex items-center gap-[0.7cqw] text-[1.4cqw] text-light/60">
                <span className="size-[1cqw] rounded-full bg-[#5ee0a8]" />
                Synced
              </span>
            </span>
          </Glass>
        </div>
      ))}

      {/* "All systems in sync". */}
      <div className="absolute" style={at(196, 46, 210)}>
        <div className="flex items-center justify-center gap-[1.2cqw] rounded-full border border-white/10 bg-white/[0.06] px-[1.8cqw] py-[1.1cqw] text-[1.8cqw] text-light/80 backdrop-blur-md">
          <span className="relative flex size-[1.4cqw]">
            <span className="absolute inset-0 rounded-full bg-[#5ee0a8]/70 motion-safe:animate-ping" />
            <span className="relative size-full rounded-full bg-[#5ee0a8]" />
          </span>
          All systems in sync
        </div>
      </div>

      {/* An orders table. */}
      <Glass style={{ ...at(160, 352, 280, 128), ...delay(-2.4) }} className="overflow-hidden motion-safe:animate-drift">
        <div className="flex items-center justify-between border-b border-white/10 px-[2cqw] py-[1.3cqw]">
          <span className="text-[1.9cqw] font-semibold text-white">Orders</span>
          <span className="flex gap-[0.6cqw]">
            <Bar className="w-[4cqw] bg-white/15" />
            <Bar className="w-[2.5cqw] bg-white/15" />
          </span>
        </div>
        {[
          ["bg-[#5ee0a8]", "w-3/5"],
          ["bg-coral", "w-2/5"],
          ["bg-[#5ee0a8]", "w-1/2"],
        ].map(([dot, width], row) => (
          <div key={row} className="flex items-center gap-[1.6cqw] border-b border-white/[0.06] px-[2cqw] py-[1.2cqw] last:border-0">
            <span className={`size-[1.3cqw] shrink-0 rounded-full ${dot}`} />
            <Bar className={`${width} bg-white/20`} />
            <Bar className="ml-auto w-[6cqw] bg-white/10" />
          </div>
        ))}
      </Glass>
    </Canvas>
  );
}
