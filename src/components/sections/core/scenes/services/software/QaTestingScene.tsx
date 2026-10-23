import { at, Canvas, delay, Glass, Paper, Toast } from "../../parts";

// QA, Testing & Support: a test run ticking through its checks, a bug report marked fixed, the
// browsers and devices it was tested on, and a "Ready to release" toast.

const tests = ["Sign up and log in", "Add to cart", "Checkout and payment", "Password reset", "Mobile menu", "Contact form"];
const devices = ["Chrome", "Safari", "Firefox", "iPhone", "Android", "iPad"];

export function QaTestingScene() {
  return (
    <Canvas>
      {/* The test run. */}
      <Glass style={at(0, 30, 335, 290)} className="overflow-hidden bg-[#121534]/90 motion-safe:animate-drift">
        <div className="flex items-center justify-between border-b border-white/10 px-[2.2cqw] py-[1.5cqw]">
          <span className="font-mono text-[1.6cqw] text-light/70">test run</span>
          <span className="rounded-full bg-[#2fbf71]/15 px-[1.2cqw] py-[0.3cqw] font-mono text-[1.4cqw] text-[#5be09a]">passing</span>
        </div>
        <div className="space-y-[1.2cqw] px-[2.2cqw] py-[2cqw] font-mono text-[1.65cqw]">
          {tests.map((test, index) => (
            <div
              key={test}
              className="flex items-center gap-[1.4cqw] text-light/85 motion-safe:animate-type"
              style={delay(0.4 + index * 0.35)}
            >
              <span className="text-[#5be09a]">✓</span>
              {test}
              <span className="ml-auto text-light/35">{(index * 37 + 120) % 400} ms</span>
            </div>
          ))}
        </div>
      </Glass>

      {/* The bug report. */}
      <Paper style={{ ...at(350, 60, 245, 180), ...delay(-1.8) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="flex items-center justify-between">
          <span className="font-mono text-[1.5cqw] text-primary/50">BUG-214</span>
          <span className="rounded-full bg-[#2fbf71]/15 px-[1.1cqw] py-[0.3cqw] text-[1.3cqw] font-semibold text-[#1f9e5a] motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_2.4s_both]">
            Fixed
          </span>
        </span>
        <span className="mt-[1.2cqw] block text-[1.9cqw] font-semibold">Coupon not applied on mobile</span>
        <span className="mt-[1.4cqw] flex flex-wrap gap-[0.8cqw]">
          {["High", "Checkout", "iOS"].map((tag, index) => (
            <span key={tag} className={`rounded-full px-[1.1cqw] py-[0.3cqw] text-[1.3cqw] ${index === 0 ? "bg-coral/15 font-semibold text-crimson" : "bg-primary/[0.05] text-primary/60"}`}>
              {tag}
            </span>
          ))}
        </span>
        <span className="mt-[1.6cqw] flex items-center gap-[1cqw] text-[1.4cqw] text-primary/55">
          <span className="size-[2.6cqw] rounded-full bg-brand-gradient" />
          Retested and closed
        </span>
      </Paper>

      {/* Browsers and devices. */}
      <Glass style={{ ...at(342, 270, 255, 160), ...delay(-2.8) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[1.9cqw] font-semibold text-white">Tested on</span>
        <div className="mt-[1.4cqw] grid grid-cols-3 gap-[1cqw]">
          {devices.map((device, index) => (
            <span
              key={device}
              className="flex items-center gap-[0.8cqw] rounded-[1cqw] bg-white/[0.06] px-[1cqw] py-[0.8cqw] text-[1.4cqw] text-light/80 motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]"
              style={delay(0.8 + index * 0.15)}
            >
              <span className="grid size-[2cqw] shrink-0 place-items-center rounded-full bg-brand-gradient text-[1.1cqw] text-white">✓</span>
              {device}
            </span>
          ))}
        </div>
      </Glass>

      <Toast label="Ready to release" detail="All checks passed" style={at(30, 360)} wait={-1}>
        <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </Toast>
    </Canvas>
  );
}
