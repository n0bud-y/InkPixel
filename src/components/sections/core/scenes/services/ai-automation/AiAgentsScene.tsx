import { at, Canvas, delay, Glass, LineIcon, Toast } from "../../parts";

// Custom AI Agents & Integrations: an agent given a goal, working through its plan (steps
// ticking off, the current one in progress), the tools it's connected to (CRM, email, calendar,
// spreadsheet) with requests travelling to them, and a "Task complete" toast.

const plan = ["Find leads who asked for a quote", "Check each one in the CRM", "Draft a personal follow-up", "Book calls in the calendar"];

// The tools, on the 600 × 500 canvas (centre of each pill).
const tools: { x: number; y: number; label: string; icon: string }[] = [
  { x: 480, y: 70, label: "CRM", icon: "M9 8a3 3 0 1 0 6 0 3 3 0 0 0-6 0M4 20a8 8 0 0 1 16 0" },
  { x: 520, y: 180, label: "Email", icon: "M4 6h16v12H4zM4 7l8 6 8-6" },
  { x: 520, y: 290, label: "Calendar", icon: "M3 5h18v16H3zM3 10h18M8 3v4M16 3v4" },
  { x: 480, y: 400, label: "Sheets", icon: "M4 4h16v16H4zM4 10h16M4 15h16M10 4v16" },
];
const hub = { x: 360, y: 235 };

export function AiAgentsScene() {
  return (
    <Canvas>
      {/* Requests to the tools. */}
      <svg viewBox="0 0 600 500" className="absolute inset-0 size-full overflow-visible">
        {tools.map((tool, index) => {
          const d = `M${hub.x} ${hub.y} C${hub.x + 60} ${hub.y} ${tool.x - 80} ${tool.y} ${tool.x - 40} ${tool.y}`;
          return (
            <g key={tool.label}>
              <path d={d} fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="2" />
              <path
                d={d}
                pathLength={1}
                fill="none"
                stroke="#fa6143"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0.15 0.85"
                className="motion-safe:animate-dash-travel"
                style={delay(-index * 0.65)}
              />
            </g>
          );
        })}
      </svg>

      {/* The agent. */}
      <Glass style={at(0, 70, 370, 300)} className="p-[2.4cqw] motion-safe:animate-drift">
        <span className="flex items-center gap-[1.4cqw]">
          <span className="grid size-[5.4cqw] place-items-center rounded-[1.6cqw] bg-brand-gradient text-white shadow-[0_1.5cqw_3cqw_-1cqw_rgb(201_29_76_/_0.8)]">
            <LineIcon className="size-[3.2cqw]">
              <rect x="4" y="8" width="16" height="11" rx="3" />
              <path d="M12 4v4M9 13h.01M15 13h.01M2 13v2M22 13v2" />
            </LineIcon>
          </span>
          <span>
            <span className="block text-[2cqw] font-semibold text-white">Sales follow-up agent</span>
            <span className="flex items-center gap-[0.7cqw] text-[1.4cqw] text-[#5be09a]">
              <span className="size-[1.1cqw] rounded-full bg-[#2fbf71] motion-safe:animate-pulse" />
              Working
            </span>
          </span>
        </span>
        <div className="mt-[2cqw] rounded-[1.2cqw] bg-white/[0.06] p-[1.4cqw] text-[1.5cqw] text-light/70">
          <span className="font-semibold text-light/90">Goal:</span> follow up with every new quote request today.
        </div>
        <div className="mt-[2cqw] space-y-[1.3cqw]">
          {plan.map((step, index) => {
            const done = index < 3;
            return (
              <span
                key={step}
                className="flex items-center gap-[1.3cqw] text-[1.6cqw] motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]"
                style={delay(0.5 + index * 0.45)}
              >
                {done ? (
                  <span className="grid size-[2.8cqw] shrink-0 place-items-center rounded-full bg-brand-gradient text-[1.3cqw] text-white">✓</span>
                ) : (
                  <span className="size-[2.8cqw] shrink-0 rounded-full border-[0.4cqw] border-white/20 border-t-coral motion-safe:animate-spin" />
                )}
                <span className={done ? "text-light/85" : "font-semibold text-white"}>{step}</span>
              </span>
            );
          })}
        </div>
      </Glass>

      {tools.map((tool, index) => (
        <div key={tool.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={at(tool.x, tool.y)}>
          <div
            className="flex items-center gap-[1.1cqw] rounded-full bg-white py-[0.9cqw] pr-[1.8cqw] pl-[0.9cqw] shadow-[0_2.5cqw_5cqw_-1.5cqw_rgb(0_0_0_/_0.55)] motion-safe:animate-drift"
            style={delay(-index * 0.8)}
          >
            <span className="grid size-[3.2cqw] place-items-center rounded-full bg-brand-gradient text-white">
              <LineIcon className="size-[1.9cqw]">
                <path d={tool.icon} />
              </LineIcon>
            </span>
            <span className="text-[1.8cqw] font-semibold whitespace-nowrap text-primary">{tool.label}</span>
          </div>
        </div>
      ))}

      <Toast label="Task complete" detail="Calls booked in your calendar" style={at(30, 400)} wait={-2}>
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </Toast>
    </Canvas>
  );
}
