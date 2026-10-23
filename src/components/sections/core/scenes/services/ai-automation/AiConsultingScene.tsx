import { at, Canvas, delay, Glass, Paper, Toast } from "../../parts";

// AI Consulting & Training: an opportunity map (ideas plotted by impact and effort, the quick
// wins highlighted), the roadmap from assessment to scale, a team training session, and an "AI
// roadmap ready" toast.

// Ideas on the map: [x %, y % from the top, quick win?, label].
const ideas: [number, number, boolean, string][] = [
  [22, 22, true, "Support replies"],
  [34, 38, true, "Invoice entry"],
  [70, 26, false, "Forecasting"],
  [62, 68, false, "Custom model"],
  [26, 72, false, ""],
  [80, 60, false, ""],
];
const phases = [
  { name: "Assess", when: "Weeks 1–2" },
  { name: "Pilot", when: "Weeks 3–8" },
  { name: "Scale", when: "Month 3+" },
];

export function AiConsultingScene() {
  return (
    <Canvas>
      {/* The opportunity map. */}
      <Paper style={at(0, 30, 330, 300)} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[2cqw] font-semibold">Where AI helps most</span>
        <div className="relative mt-[1.6cqw] aspect-[4/3] rounded-[1.2cqw] border border-primary/10">
          <span className="absolute inset-x-0 top-1/2 border-t border-dashed border-primary/15" />
          <span className="absolute inset-y-0 left-1/2 border-l border-dashed border-primary/15" />
          <span className="absolute inset-[0_50%_50%_0] rounded-tl-[1.2cqw] bg-coral/[0.08]" />
          <span className="absolute top-[1cqw] left-[1.2cqw] text-[1.3cqw] font-semibold text-crimson">Quick wins</span>
          {ideas.map(([x, y, win, label], index) => (
            <span
              key={index}
              className="absolute flex -translate-1/2 items-center gap-[0.6cqw] motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]"
              style={{ left: `${x}%`, top: `${y}%`, ...delay(0.5 + index * 0.2) }}
            >
              <span className={`shrink-0 rounded-full ${win ? "size-[2.6cqw] bg-brand-gradient shadow-[0_0.6cqw_1.2cqw_-0.4cqw_rgb(201_29_76_/_0.8)]" : "size-[2cqw] bg-primary/25"}`} />
              {label && <span className={`text-[1.3cqw] whitespace-nowrap ${win ? "font-semibold text-primary" : "text-primary/50"}`}>{label}</span>}
            </span>
          ))}
        </div>
        <span className="mt-[1cqw] flex justify-between text-[1.3cqw] text-primary/45">
          <span>Less effort</span>
          <span>More effort</span>
        </span>
      </Paper>

      {/* The roadmap. */}
      <Glass style={{ ...at(345, 60, 250, 170), ...delay(-1.6) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[1.9cqw] font-semibold text-white">AI roadmap</span>
        <div className="mt-[2cqw] grid grid-cols-3 gap-[1cqw]">
          {phases.map((phase, index) => (
            <span key={phase.name} className="motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]" style={delay(0.8 + index * 0.35)}>
              <span className={`block h-[0.9cqw] rounded-full ${index === 0 ? "bg-brand-gradient" : index === 1 ? "bg-coral/60" : "bg-white/15"}`} />
              <span className="mt-[1.2cqw] block text-[1.7cqw] font-semibold text-white">{phase.name}</span>
              <span className="block text-[1.3cqw] text-light/55">{phase.when}</span>
            </span>
          ))}
        </div>
      </Glass>

      {/* Team training. */}
      <Paper style={{ ...at(345, 260, 250, 150), ...delay(-2.6) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="flex items-center justify-between">
          <span className="text-[1.8cqw] font-semibold">Team training</span>
          <span className="rounded-full bg-crimson/10 px-[1.1cqw] py-[0.3cqw] text-[1.3cqw] font-semibold text-crimson">Live</span>
        </span>
        <span className="mt-[1.6cqw] flex -space-x-[1.2cqw]">
          {["bg-crimson", "bg-coral", "bg-primary", "bg-[#ffc48a]", "bg-[#3a4cc4]"].map((tone) => (
            <span key={tone} className={`size-[4.4cqw] rounded-full ring-[0.5cqw] ring-white ${tone}`} />
          ))}
          <span className="grid size-[4.4cqw] place-items-center rounded-full bg-primary/10 text-[1.4cqw] font-semibold text-primary ring-[0.5cqw] ring-white">+8</span>
        </span>
        <span className="mt-[1.4cqw] block text-[1.5cqw] text-primary/60">Using AI tools safely at work</span>
      </Paper>

      <Toast label="AI roadmap ready" detail="Prioritised by impact" style={at(20, 380)} wait={-1}>
        <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6ZM9 3v15M15 6v15" />
      </Toast>
    </Canvas>
  );
}
