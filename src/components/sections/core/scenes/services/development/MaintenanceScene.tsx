import { at, Canvas, delay, Glass, IconBadge, Paper, Toast } from "../../parts";

// Maintenance & Support: a status page ("All systems operational", a 60-day uptime strip, each
// part's status), this week's care checklist ticking in, a "Ticket resolved" toast, and shield
// and wrench badges.

const parts = ["Website", "Checkout", "API", "Email"];
const checks = ["Daily backups", "Security patches", "Plugin updates", "SSL renewed"];

export function MaintenanceScene() {
  return (
    <Canvas>
      {/* The status page. */}
      <Paper style={at(0, 40, 365, 310)} className="p-[2.4cqw] motion-safe:animate-drift">
        <div className="flex items-center gap-[1.4cqw]">
          <span className="relative flex size-[2cqw]">
            <span className="absolute inset-0 rounded-full bg-[#2fbf71]/50 motion-safe:animate-ping" />
            <span className="relative size-[2cqw] rounded-full bg-[#2fbf71]" />
          </span>
          <span className="text-[2.3cqw] font-semibold">All systems operational</span>
        </div>
        <div className="mt-[2.4cqw] flex items-center justify-between text-[1.5cqw] text-primary/50">
          <span>Uptime · last 60 days</span>
          <span>Today</span>
        </div>
        <div className="mt-[1cqw] flex h-[5.4cqw] items-stretch gap-[0.35cqw]">
          {Array.from({ length: 40 }, (_, day) => (
            <span
              key={day}
              className={`flex-1 rounded-[0.4cqw] motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both] ${day === 23 ? "bg-coral/45" : "bg-brand-gradient"}`}
              style={delay(0.3 + day * 0.025)}
            />
          ))}
        </div>
        <div className="mt-[2.4cqw] divide-y divide-primary/[0.07] rounded-[1.4cqw] border border-primary/10">
          {parts.map((part) => (
            <div key={part} className="flex items-center justify-between px-[1.6cqw] py-[1.1cqw] text-[1.7cqw]">
              <span className="font-medium">{part}</span>
              <span className="flex items-center gap-[0.8cqw] text-primary/55">
                <span className="size-[1.2cqw] rounded-full bg-[#2fbf71]" />
                Operational
              </span>
            </div>
          ))}
        </div>
      </Paper>

      {/* This week's care. */}
      <Glass style={{ ...at(378, 200, 222, 205), ...delay(-2) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[2.1cqw] font-semibold text-white">This week</span>
        <ul className="mt-[1.6cqw] space-y-[1.3cqw]">
          {checks.map((check, index) => (
            <li
              key={check}
              className="flex items-center gap-[1.3cqw] text-[1.8cqw] text-light/85 motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both]"
              style={delay(0.8 + index * 0.35)}
            >
              <span className="grid size-[3cqw] shrink-0 place-items-center rounded-full bg-brand-gradient text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-[1.8cqw]">
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              {check}
            </li>
          ))}
        </ul>
      </Glass>

      <Toast label="Ticket resolved" detail="Support ticket #482" style={at(30, 395)} wait={-1.2}>
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />
      </Toast>

      <IconBadge style={at(440, 50, 70)} wait={-0.6}>
        <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </IconBadge>
      <IconBadge style={at(520, 130, 54)} wait={-2.8}>
        <path d="M12 8v4l2.5 2.5" />
        <circle cx="12" cy="12" r="8" />
      </IconBadge>
    </Canvas>
  );
}
