import { at, Canvas, delay, Glass, LineIcon, Paper, Toast } from "../../parts";

// Business Process Automation: an invoice-approval process on a flow builder (form, AI check,
// a branch to the manager or straight to payment) with work moving along it, the run log
// filling with finished runs, and a "Process automated" toast.

const sparkle = "M12 3c.4 4.2 2.8 6.6 7 7-4.2.4-6.6 2.8-7 7-.4-4.2-2.8-6.6-7-7 4.2-.4 6.6-2.8 7-7Z";

// The flow's steps, on the 600 × 500 canvas (top-left of each card).
const nodes: { x: number; y: number; label: string; text: string; icon: string; ai?: boolean }[] = [
  { x: 20, y: 50, label: "Trigger", text: "Invoice received", icon: "M4 6h16v12H4zM4 7l8 6 8-6" },
  { x: 20, y: 170, label: "AI step", text: "Read & check it", icon: sparkle, ai: true },
  { x: 230, y: 110, label: "If over limit", text: "Manager approves", icon: "M9 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0M4 20a8 8 0 0 1 16 0" },
  { x: 230, y: 235, label: "Otherwise", text: "Schedule payment", icon: "M3 6h18v12H3zM3 10h18M7 15h3" },
];
const links = ["M110 120 V170", "M200 205 C215 205 215 145 230 145", "M200 215 C215 215 215 270 230 270"];
const runs = ["INV-2041", "INV-2042", "INV-2043", "INV-2044"];

export function ProcessAutomationScene() {
  return (
    <Canvas>
      {/* The flow builder. */}
      <div className="absolute inset-[0_2%_18%_0] rounded-[3cqw] border border-white/10 bg-[radial-gradient(circle,rgb(255_255_255_/_0.07)_1px,transparent_1px)] bg-[size:3cqw_3cqw]" />

      <svg viewBox="0 0 600 500" className="absolute inset-0 size-full overflow-visible">
        {links.map((d, index) => (
          <g key={d}>
            <path d={d} fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="2" />
            <path
              d={d}
              pathLength={1}
              fill="none"
              stroke="#fa6143"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="0.2 0.8"
              className="motion-safe:animate-dash-travel"
              style={delay(-index * 0.7)}
            />
          </g>
        ))}
      </svg>

      {nodes.map((node, index) => (
        <div key={node.text} className="absolute" style={at(node.x, node.y, 180)}>
          <div
            className={`flex items-center gap-[1.3cqw] rounded-[1.8cqw] p-[1.4cqw] shadow-[0_2.5cqw_5cqw_-1.5cqw_rgb(0_0_0_/_0.55)] motion-safe:animate-drift ${
              node.ai ? "bg-brand-gradient text-white" : "bg-white text-primary"
            }`}
            style={delay(-index * 0.9)}
          >
            <span className={`grid size-[4.4cqw] shrink-0 place-items-center rounded-[1.2cqw] ${node.ai ? "bg-white/20" : "bg-brand-gradient text-white"}`}>
              <LineIcon className="size-[2.6cqw]">
                <path d={node.icon} />
              </LineIcon>
            </span>
            <span className="min-w-0">
              <span className={`block text-[1.3cqw] tracking-[0.08em] uppercase ${node.ai ? "text-white/75" : "text-primary/50"}`}>{node.label}</span>
              <span className="block text-[1.8cqw] font-semibold whitespace-nowrap">{node.text}</span>
            </span>
          </div>
        </div>
      ))}

      {/* The run log. */}
      <Glass style={{ ...at(430, 40, 165, 250), ...delay(-1.6) }} className="p-[2cqw] motion-safe:animate-drift">
        <span className="text-[1.8cqw] font-semibold text-white">Runs today</span>
        <div className="mt-[1.4cqw] space-y-[1.1cqw]">
          {runs.map((run, index) => (
            <span
              key={run}
              className="flex items-center justify-between font-mono text-[1.4cqw] text-light/75 motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]"
              style={delay(0.6 + index * 0.45)}
            >
              {run}
              <span className="grid size-[2.2cqw] place-items-center rounded-full bg-[#2fbf71] text-[1.2cqw] text-white">✓</span>
            </span>
          ))}
        </div>
      </Glass>

      {/* Manual steps removed. */}
      <Paper style={{ ...at(300, 360, 290, 120), ...delay(-2.4) }} className="p-[2cqw] motion-safe:animate-drift">
        <span className="text-[1.7cqw] font-semibold">No more by hand</span>
        <div className="mt-[1cqw] space-y-[0.6cqw] text-[1.5cqw] text-primary/45 line-through decoration-crimson/60">
          <span className="block">Typing invoices into the system</span>
          <span className="block">Chasing approvals by email</span>
        </div>
      </Paper>

      <Toast label="Process automated" detail="Runs on its own, every day" style={at(20, 400)} wait={-1}>
        <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" />
      </Toast>
    </Canvas>
  );
}
