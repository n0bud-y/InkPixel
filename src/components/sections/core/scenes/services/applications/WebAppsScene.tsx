import { at, Bar, Browser, Canvas, delay, Paper, Phone, Toast } from "../../parts";

// Web Applications & PWAs: a web app in the browser (sidebar, cards, a chart), the same app
// installed on a phone's home screen with an "Add to Home Screen" prompt, a "Works offline"
// card, and an "Installed" toast.

const homeApps = ["bg-[#3a4cc4]", "bg-[#2fbf71]", "bg-[#ffc48a]", "bg-white/30", "bg-white/30", "bg-[#ff7aa2]", "bg-white/30", "bg-white/30"];

export function WebAppsScene() {
  return (
    <Canvas>
      <Browser url="app.your-company.com" style={at(0, 40, 390, 290)} className="motion-safe:animate-drift">
        <div className="flex">
          <div className="w-[11cqw] shrink-0 space-y-[1.4cqw] bg-primary p-[1.6cqw]">
            <span className="block size-[3.4cqw] rounded-[1cqw] bg-brand-gradient" />
            {[0, 1, 2, 3, 4].map((item) => (
              <span key={item} className={`block h-[1.1cqw] rounded-full ${item === 1 ? "w-full bg-coral" : "w-4/5 bg-white/20"}`} />
            ))}
          </div>
          <div className="min-w-0 flex-1 p-[2cqw]">
            <div className="grid grid-cols-3 gap-[1.2cqw]">
              {[0, 1, 2].map((card) => (
                <div key={card} className="rounded-[1.2cqw] bg-primary/[0.04] p-[1.2cqw]">
                  <Bar className="h-[0.9cqw] w-1/2 bg-primary/30" />
                  <Bar className={`mt-[1cqw] h-[2cqw] w-3/4 ${card === 0 ? "bg-crimson/80" : "bg-primary/70"}`} />
                </div>
              ))}
            </div>
            <div className="mt-[1.6cqw] flex h-[15cqw] items-end gap-[1cqw] rounded-[1.2cqw] bg-primary/[0.04] p-[1.4cqw]">
              {[45, 60, 40, 75, 55, 90, 70, 100].map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-[0.6cqw] bg-brand-gradient motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both]"
                  style={{ height: `${height}%`, ...delay(0.4 + index * 0.1) }}
                />
              ))}
            </div>
            <div className="mt-[1.4cqw] space-y-[0.9cqw]">
              <Bar className="w-full bg-primary/15" />
              <Bar className="w-4/5 bg-primary/15" />
            </div>
          </div>
        </div>
      </Browser>

      {/* Installed on a phone. */}
      <Phone style={{ ...at(400, 90, 175, 370), ...delay(-1.8) }} className="motion-safe:animate-drift">
        <div className="relative size-full bg-linear-to-b from-[#2a2f63] to-primary px-[2cqw] pt-[6cqw]">
          <div className="grid grid-cols-4 gap-[1.8cqw]">
            {homeApps.map((tone, index) => (
              <span key={index} className={`aspect-square rounded-[1.4cqw] ${tone}`} />
            ))}
            {/* The installed app. */}
            <span className="flex flex-col items-center gap-[0.6cqw] motion-safe:animate-[rise_0.7s_var(--ease-out-soft)_1.6s_both]">
              <span className="grid aspect-square w-full place-items-center rounded-[1.4cqw] bg-brand-gradient shadow-[0_1cqw_2cqw_-0.6cqw_rgb(201_29_76_/_0.9)]">
                <span className="size-1/2 rounded-[45%_45%_50%_50%] bg-white" />
              </span>
            </span>
          </div>
          {/* The install prompt. */}
          <div className="absolute inset-x-[1.6cqw] bottom-[2cqw] rounded-[2cqw] bg-white p-[1.8cqw] motion-safe:animate-[rise_0.7s_var(--ease-out-soft)_0.6s_both]">
            <span className="flex items-center gap-[1.2cqw]">
              <span className="grid size-[4.4cqw] shrink-0 place-items-center rounded-[1.2cqw] bg-brand-gradient">
                <span className="size-1/2 rounded-[45%_45%_50%_50%] bg-white" />
              </span>
              <span className="text-[1.6cqw] leading-tight font-semibold text-primary">Add to Home Screen</span>
            </span>
            <span className="mt-[1.4cqw] flex h-[3.6cqw] items-center justify-center rounded-full bg-brand-gradient-reverse text-[1.5cqw] font-semibold text-white">
              Install
            </span>
          </div>
        </div>
      </Phone>

      <Paper style={{ ...at(40, 365, 200), ...delay(-1) }} className="flex items-center gap-[1.4cqw] p-[1.6cqw] motion-safe:animate-drift">
        <span className="grid size-[4.6cqw] shrink-0 place-items-center rounded-[1.2cqw] bg-primary text-coral">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="size-[2.6cqw]">
            <path d="M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5.2-2.8M19 13a10 10 0 0 0-2-1.6M2 8.8a15 15 0 0 1 4.2-2.7M22 8.8A15 15 0 0 0 11 5.1M12 20h.01" />
          </svg>
        </span>
        <span>
          <span className="block text-[1.8cqw] font-semibold">Works offline</span>
          <span className="block text-[1.4cqw] text-primary/55">Syncs when you’re back</span>
        </span>
      </Paper>

      <Toast label="Installed" detail="Opens like a native app" style={at(260, 410)} wait={-2.4}>
        <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
      </Toast>
    </Canvas>
  );
}
