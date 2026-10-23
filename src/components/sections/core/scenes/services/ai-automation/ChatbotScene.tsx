import { at, Bar, Browser, Canvas, delay, IconBadge, LineIcon, Paper, Toast } from "../../parts";

// AI Chatbots & Virtual Assistants: a website with its chat widget open (the assistant greets,
// the visitor picks a quick reply, it answers with a product and a booking button), the channels
// it also answers on, an "Always on" card, and a "Call booked" toast.

export function ChatbotScene() {
  return (
    <Canvas>
      {/* The website behind. */}
      <Browser url="your-store.com" style={at(0, 40, 360, 300)} className="opacity-90 motion-safe:animate-drift">
        <div className="p-[2.2cqw]">
          <div className="flex items-center justify-between">
            <span className="h-[2.2cqw] w-[8cqw] rounded-full bg-brand-gradient" />
            <span className="flex gap-[1.4cqw]">
              <Bar className="w-[4.5cqw] bg-primary/15" />
              <Bar className="w-[4.5cqw] bg-primary/15" />
            </span>
          </div>
          <div className="mt-[2.4cqw] grid grid-cols-2 gap-[2cqw]">
            <div className="space-y-[1.1cqw] pt-[1cqw]">
              <Bar className="h-[2.2cqw] w-full bg-primary/80" />
              <Bar className="h-[2.2cqw] w-3/4 bg-primary/80" />
              <Bar className="w-full bg-primary/15" />
              <span className="!mt-[1.8cqw] block h-[3.4cqw] w-[11cqw] rounded-full bg-brand-gradient-reverse" />
            </div>
            <span className="aspect-[4/3] rounded-[1.6cqw] bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]" />
          </div>
          <div className="mt-[2.4cqw] grid grid-cols-3 gap-[1.4cqw]">
            {[0, 1, 2].map((card) => (
              <span key={card} className="h-[8cqw] rounded-[1.2cqw] bg-primary/[0.04]" />
            ))}
          </div>
        </div>
      </Browser>

      {/* The chat widget. */}
      <Paper style={{ ...at(250, 70, 250, 350), ...delay(-1.6) }} className="flex flex-col overflow-hidden motion-safe:animate-drift">
        <div className="flex items-center gap-[1.2cqw] bg-primary px-[1.8cqw] py-[1.6cqw] text-white">
          <span className="relative grid size-[4.4cqw] place-items-center rounded-full bg-brand-gradient">
            <LineIcon className="size-[2.4cqw]">
              <path d="M12 3c.4 4.2 2.8 6.6 7 7-4.2.4-6.6 2.8-7 7-.4-4.2-2.8-6.6-7-7 4.2-.4 6.6-2.8 7-7Z" />
            </LineIcon>
            <span className="absolute right-0 bottom-0 size-[1.3cqw] rounded-full bg-[#2fbf71] ring-[0.3cqw] ring-primary" />
          </span>
          <span>
            <span className="block text-[1.8cqw] font-semibold">Assistant</span>
            <span className="block text-[1.3cqw] text-light/60">Replies instantly</span>
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-[1.2cqw] bg-[#fbf7f4] p-[1.6cqw] text-[1.5cqw] leading-snug">
          <span className="max-w-[85%] rounded-[1.4cqw] rounded-tl-none bg-white p-[1.2cqw] shadow-sm motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_0.4s_both]">
            Hi! Looking for something in particular?
          </span>
          <span className="flex flex-wrap gap-[0.8cqw] motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_0.9s_both]">
            {["Track my order", "Gift ideas"].map((reply, index) => (
              <span key={reply} className={`rounded-full border px-[1.2cqw] py-[0.5cqw] ${index === 1 ? "border-crimson bg-crimson text-white" : "border-crimson/40 text-crimson"}`}>
                {reply}
              </span>
            ))}
          </span>
          <span className="max-w-[90%] rounded-[1.4cqw] rounded-tl-none bg-white p-[1.2cqw] shadow-sm motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_1.5s_both]">
            These are popular this week:
            <span className="mt-[1cqw] flex items-center gap-[1cqw] rounded-[1cqw] bg-primary/[0.04] p-[0.9cqw]">
              <span className="size-[4.4cqw] shrink-0 rounded-[0.8cqw] bg-brand-gradient" />
              <span className="flex-1 space-y-[0.6cqw]">
                <Bar className="h-[0.9cqw] w-full bg-primary/50" />
                <Bar className="h-[0.9cqw] w-1/2 bg-primary/25" />
              </span>
            </span>
          </span>
          {/* Typing. */}
          <span className="flex w-fit gap-[0.6cqw] rounded-[1.4cqw] bg-white px-[1.4cqw] py-[1.1cqw] shadow-sm motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_2s_both]">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="size-[1cqw] rounded-full bg-primary/40 motion-safe:animate-pulse" style={delay(dot * 0.2)} />
            ))}
          </span>
        </div>
      </Paper>

      {/* Channels. */}
      <IconBadge style={at(520, 80, 60)} wait={-0.4}>
        <path d="M3 21l1.6-4.7A8.5 8.5 0 1 1 7.7 19.4L3 21Z" />
      </IconBadge>
      <IconBadge style={at(525, 170, 52)} wait={-1.8}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
      </IconBadge>
      <IconBadge style={at(520, 250, 58)} wait={-3}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21" />
      </IconBadge>

      <Paper style={{ ...at(30, 365, 175), ...delay(-0.8) }} className="flex items-center gap-[1.2cqw] p-[1.6cqw] motion-safe:animate-drift">
        <span className="font-display text-[3.4cqw] leading-none font-semibold text-crimson">24/7</span>
        <span className="text-[1.5cqw] leading-tight text-primary/60">Always on, in every channel</span>
      </Paper>

      <Toast label="Call booked" detail="Handed to your team" style={at(330, 440)} wait={-2.4}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" />
      </Toast>
    </Canvas>
  );
}
