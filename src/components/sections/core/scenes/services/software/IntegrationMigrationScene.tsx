import Image from "next/image";
import contentful from "@/assets/images/technologies/menu/contentful.svg";
import googlecloud from "@/assets/images/technologies/menu/googlecloud.svg";
import shopify from "@/assets/images/technologies/menu/shopify.svg";
import { at, Bar, Canvas, delay, Glass, Paper, Toast } from "../../parts";

// Software Integration & Migration: an old system (grey, dated) passing its records along a line
// into the new cloud platform, the migration's progress filling up, connected apps feeding the
// new platform, and a "Records verified" toast.

const apps = [
  { logo: shopify, label: "Shopify" },
  { logo: contentful, label: "Contentful" },
  { logo: googlecloud, label: "Google Cloud" },
];

export function IntegrationMigrationScene() {
  return (
    <Canvas>
      {/* The old system. */}
      <div className="absolute" style={at(0, 70, 190, 200)}>
        <div className="size-full rounded-[1.2cqw] border border-white/10 bg-[#2b2f45] p-[1.8cqw] opacity-80 shadow-[0_2cqw_4cqw_-1.5cqw_rgb(0_0_0_/_0.6)] grayscale">
          <span className="flex items-center gap-[0.8cqw] border-b border-white/10 pb-[1.2cqw]">
            <span className="size-[1.6cqw] bg-white/25" />
            <span className="font-mono text-[1.5cqw] text-light/60">LEGACY_DB</span>
          </span>
          <div className="mt-[1.4cqw] space-y-[0.9cqw] font-mono">
            {[0, 1, 2, 3, 4].map((row) => (
              <span key={row} className="flex gap-[1cqw]">
                <Bar className="h-[1cqw] w-[3cqw] rounded-none bg-white/25" />
                <Bar className="h-[1cqw] flex-1 rounded-none bg-white/15" />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Records moving across. */}
      <svg viewBox="0 0 600 500" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="im-line" gradientUnits="userSpaceOnUse" x1="190" x2="320">
            <stop offset="0" stopColor="#c91d4c" />
            <stop offset="1" stopColor="#fa6143" />
          </linearGradient>
        </defs>
        <path d="M190 170 H320" stroke="white" strokeOpacity="0.12" strokeWidth="2" strokeDasharray="4 6" />
        {[0, 1, 2].map((packet) => (
          <path
            key={packet}
            d="M190 170 H320"
            pathLength={1}
            fill="none"
            stroke="url(#im-line)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="0.08 0.92"
            className="motion-safe:animate-dash-travel"
            style={delay(-packet * 0.85)}
          />
        ))}
      </svg>

      {/* The new platform. */}
      <Paper style={{ ...at(320, 40, 270, 260), ...delay(-1.6) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="flex items-center gap-[1.2cqw]">
          <span className="grid size-[4cqw] place-items-center rounded-[1.2cqw] bg-brand-gradient text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-[2.4cqw]">
              <path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 8a4 4 0 0 1 0 10H7Z" />
            </svg>
          </span>
          <span className="text-[2cqw] font-semibold">New platform</span>
        </span>
        <span className="mt-[2cqw] flex justify-between text-[1.4cqw] text-primary/55">
          <span>Migrating records</span>
          <span>Almost done</span>
        </span>
        <svg viewBox="0 0 100 4" preserveAspectRatio="none" className="mt-[0.8cqw] block h-[1.2cqw] w-full">
          <defs>
            <linearGradient id="im-bar" gradientUnits="userSpaceOnUse" x1="0" x2="100">
              <stop offset="0" stopColor="#c91d4c" />
              <stop offset="1" stopColor="#fa6143" />
            </linearGradient>
          </defs>
          <line x1="2" y1="2" x2="98" y2="2" stroke="#151936" strokeOpacity="0.08" strokeWidth="4" strokeLinecap="round" />
          <line
            x1="2"
            y1="2"
            x2="88"
            y2="2"
            pathLength={1}
            stroke="url(#im-bar)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1"
            className="motion-safe:animate-draw"
            style={delay(0.5)}
          />
        </svg>
        <div className="mt-[2cqw] space-y-[1cqw]">
          {["Customers", "Orders", "Products"].map((table, index) => (
            <span
              key={table}
              className="flex items-center justify-between rounded-[1cqw] bg-primary/[0.04] px-[1.4cqw] py-[1cqw] text-[1.5cqw] motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]"
              style={delay(0.8 + index * 0.4)}
            >
              <span className="font-medium">{table}</span>
              <span className="font-semibold text-[#1f9e5a]">✓ Moved</span>
            </span>
          ))}
        </div>
      </Paper>

      {/* Connected apps. */}
      <Glass style={{ ...at(220, 330, 370, 90), ...delay(-2.6) }} className="flex items-center justify-around px-[2cqw] motion-safe:animate-drift">
        {apps.map((app) => (
          <span key={app.label} className="flex items-center gap-[1cqw]">
            <span className="grid size-[4.4cqw] place-items-center rounded-[1.2cqw] bg-white">
              <Image src={app.logo} alt="" className="size-[2.6cqw] object-contain" />
            </span>
            <span className="text-[1.5cqw] font-semibold text-light/85">{app.label}</span>
          </span>
        ))}
      </Glass>

      <Toast label="Records verified" detail="Checked against the old system" style={at(10, 300)} wait={-1}>
        <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </Toast>
    </Canvas>
  );
}
