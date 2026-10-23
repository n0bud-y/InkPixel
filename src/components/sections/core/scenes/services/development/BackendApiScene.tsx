import nodejs from "@/assets/images/technologies/menu/nodejs.svg";
import postgresql from "@/assets/images/technologies/menu/postgresql.svg";
import { at, Canvas, delay, Glass, LineIcon, LogoTile } from "../../parts";

// Backend & API Development: an API request typing out and its JSON response, the services
// behind it (gateway, orders, database, cache, webhooks) joined by lines with data travelling
// along them, and Node.js and PostgreSQL tiles.

// Request and response lines as coloured pieces: [text, colour class].
const lines: [string, string][][] = [
  [["GET", "text-[#9be3c2]"], [" /api/v1/orders", "text-light/85"], ["?status=paid", "text-[#ffc48a]"]],
  [["Authorization:", "text-[#ff7aa2]"], [" Bearer ••••••", "text-light/50"]],
  [],
  [["200 OK", "text-[#9be3c2]"], [" · 42 ms", "text-light/45"]],
  [["{", "text-light/70"]],
  [['  "id"', "text-coral"], [": ", "text-light/50"], ["1042", "text-[#ffc48a]"], [",", "text-light/50"]],
  [['  "status"', "text-coral"], [": ", "text-light/50"], ['"paid"', "text-[#9be3c2]"], [",", "text-light/50"]],
  [['  "total"', "text-coral"], [": ", "text-light/50"], ["218.00", "text-[#ffc48a]"]],
  [["}", "text-light/70"]],
];

// The services, on the 600 × 500 canvas: [x, y, label, icon paths].
const nodes: { x: number; y: number; label: string; icon: string }[] = [
  { x: 20, y: 300, label: "API gateway", icon: "M4 6h16M4 12h16M4 18h16M8 6v12" },
  { x: 225, y: 345, label: "Orders", icon: "M6 3h12v18l-3-2-3 2-3-2-3 2V3ZM9 8h6M9 12h6" },
  { x: 425, y: 300, label: "Database", icon: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3ZM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" },
  { x: 425, y: 420, label: "Cache", icon: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z" },
  { x: 40, y: 420, label: "Webhooks", icon: "M8 17a4 4 0 1 1 1.5-7.7L12 4M16 17h-6M16 17a4 4 0 1 0-.1-4.6L12 4" },
];

// The links between them (centres of the pills), drawn on the same canvas.
const links = [
  "M95 324 C150 324 180 369 230 369",
  "M370 369 C400 369 410 324 430 324",
  "M370 369 C400 369 410 444 430 444",
  "M125 444 C170 444 200 380 235 375",
];

export function BackendApiScene() {
  return (
    <Canvas>
      {/* The request and response. */}
      <Glass style={at(0, 20, 400, 255)} className="overflow-hidden bg-[#121534]/90 motion-safe:animate-drift">
        <div className="flex items-center gap-[2cqw] border-b border-white/10 px-[2.2cqw] py-[1.5cqw]">
          <span className="flex gap-[0.9cqw]">
            <span className="size-[1.4cqw] rounded-full bg-crimson" />
            <span className="size-[1.4cqw] rounded-full bg-coral" />
            <span className="size-[1.4cqw] rounded-full bg-white/30" />
          </span>
          <span className="rounded-[0.8cqw] bg-white/[0.07] px-[1.4cqw] py-[0.5cqw] font-mono text-[1.6cqw] text-light/70">orders.http</span>
        </div>
        <div className="px-[2.2cqw] py-[1.8cqw] font-mono text-[1.75cqw] leading-[1.7]">
          {lines.map((line, index) => (
            <div key={index} className="w-fit whitespace-pre motion-safe:animate-type" style={delay(0.4 + index * 0.25)}>
              {line.length === 0 ? " " : line.map(([text, color], part) => <span key={part} className={color}>{text}</span>)}
            </div>
          ))}
        </div>
      </Glass>

      {/* Data moving between the services. */}
      <svg viewBox="0 0 600 500" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="be-link" x1="0" x2="1">
            <stop offset="0" stopColor="#c91d4c" />
            <stop offset="1" stopColor="#fa6143" />
          </linearGradient>
        </defs>
        {links.map((d, index) => (
          <g key={d}>
            <path d={d} fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="2" />
            <path
              d={d}
              pathLength={1}
              fill="none"
              stroke="url(#be-link)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="0.12 0.88"
              className="motion-safe:animate-dash-travel"
              style={delay(-index * 0.6)}
            />
          </g>
        ))}
      </svg>

      {nodes.map((node, index) => (
        <div key={node.label} className="absolute" style={at(node.x, node.y)}>
          <div
            className="flex items-center gap-[1.2cqw] rounded-full bg-white py-[1cqw] pr-[2cqw] pl-[1cqw] shadow-[0_2.5cqw_5cqw_-1.5cqw_rgb(0_0_0_/_0.55)] motion-safe:animate-drift"
            style={delay(-index * 0.9)}
          >
            <span className="grid size-[3.4cqw] place-items-center rounded-full bg-brand-gradient text-white">
              <LineIcon className="size-[2cqw]">
                <path d={node.icon} />
              </LineIcon>
            </span>
            <span className="text-[1.8cqw] font-semibold whitespace-nowrap text-primary">{node.label}</span>
          </div>
        </div>
      ))}

      <LogoTile logo={nodejs} label="Node.js" style={at(430, 40)} wait={-0.8} />
      <LogoTile logo={postgresql} label="PostgreSQL" style={at(425, 130)} wait={-2.6} />
    </Canvas>
  );
}
