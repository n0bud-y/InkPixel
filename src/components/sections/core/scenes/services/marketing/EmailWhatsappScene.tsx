import { at, Bar, Canvas, delay, Glass, Paper, Phone, Toast } from "../../parts";

// Email & WhatsApp Marketing: a newsletter, a WhatsApp chat with an offer and quick replies, the
// automated journey (welcome, tips, offer) lighting up step by step, and a "Campaign sent" toast.

const journey = ["Sign-up", "Welcome", "Tips", "Offer"];

export function EmailWhatsappScene() {
  return (
    <Canvas>
      {/* The newsletter. */}
      <Paper style={at(0, 30, 290, 340)} className="overflow-hidden motion-safe:animate-drift">
        <div className="flex items-center justify-between border-b border-primary/10 px-[2cqw] py-[1.4cqw]">
          <span className="space-y-[0.6cqw]">
            <Bar className="h-[1cqw] w-[12cqw] bg-primary/60" />
            <Bar className="h-[0.8cqw] w-[8cqw] bg-primary/25" />
          </span>
          <span className="text-[1.4cqw] text-primary/40">9:41</span>
        </div>
        <div className="p-[2.2cqw]">
          <span className="flex items-center gap-[0.8cqw]">
            <span className="size-[2.6cqw] rounded-[45%_45%_50%_50%] bg-brand-gradient" />
            <span className="font-display text-[2cqw] font-semibold">nova</span>
          </span>
          <div className="relative mt-[1.8cqw] aspect-[16/9] overflow-hidden rounded-[1.4cqw] bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]">
            <span className="absolute top-1/2 left-1/2 size-[10cqw] -translate-1/2 rounded-full bg-brand-gradient-reverse" />
          </div>
          <Bar className="mt-[1.8cqw] h-[2cqw] w-4/5 bg-primary/85" />
          <div className="mt-[1.2cqw] space-y-[0.8cqw]">
            <Bar className="w-full bg-primary/20" />
            <Bar className="w-5/6 bg-primary/20" />
          </div>
          <span className="mx-auto mt-[2cqw] flex h-[4cqw] w-[16cqw] items-center justify-center rounded-full bg-brand-gradient-reverse text-[1.6cqw] font-semibold text-white">
            Shop the offer
          </span>
        </div>
      </Paper>

      {/* The WhatsApp chat. */}
      <Phone style={{ ...at(320, 40, 180, 380), ...delay(-1.8) }} className="motion-safe:animate-drift">
        <div className="flex size-full flex-col bg-[#efe7de]">
          <div className="flex items-center gap-[1.2cqw] bg-[#075e54] px-[1.8cqw] pt-[5cqw] pb-[1.4cqw]">
            <span className="grid size-[4cqw] place-items-center rounded-full bg-primary">
              <span className="size-1/2 rounded-[45%_45%_50%_50%] bg-brand-gradient" />
            </span>
            <span className="space-y-[0.5cqw]">
              <Bar className="h-[1cqw] w-[10cqw] bg-white/90" />
              <span className="block text-[1.2cqw] text-white/70">Business account</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-[1.4cqw] p-[1.8cqw]">
            <div className="max-w-[85%] rounded-[1.4cqw] rounded-tl-none bg-white p-[1.4cqw] shadow-sm motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_0.5s_both]">
              <span className="block aspect-[16/9] rounded-[1cqw] bg-brand-gradient" />
              <Bar className="mt-[1cqw] w-full bg-primary/50" />
              <Bar className="mt-[0.7cqw] w-3/4 bg-primary/25" />
              <span className="mt-[0.6cqw] block text-right text-[1.1cqw] text-primary/40">10:00</span>
            </div>
            <div className="flex flex-col gap-[0.8cqw] motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_1.1s_both]">
              {["View offer", "Talk to us"].map((reply) => (
                <span key={reply} className="rounded-[1.2cqw] bg-white py-[1cqw] text-center text-[1.5cqw] font-semibold text-[#128c7e]">
                  {reply}
                </span>
              ))}
            </div>
            <div className="ml-auto max-w-[70%] rounded-[1.4cqw] rounded-tr-none bg-[#d9fdd3] p-[1.2cqw] motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_1.7s_both]">
              <Bar className="w-[12cqw] bg-primary/40" />
              <span className="mt-[0.5cqw] block text-right text-[1.1cqw] text-[#34b7f1]">✓✓</span>
            </div>
          </div>
        </div>
      </Phone>

      {/* The journey. */}
      <Glass style={{ ...at(30, 395, 290, 70), ...delay(-1) }} className="flex items-center gap-[1cqw] px-[2cqw] motion-safe:animate-drift">
        {journey.map((step, index) => (
          <span key={step} className="flex items-center gap-[1cqw]">
            {index > 0 && <span className="h-px w-[2.4cqw] bg-white/25" />}
            <span
              className={`rounded-full px-[1.2cqw] py-[0.6cqw] text-[1.4cqw] font-semibold motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both] ${
                index === journey.length - 1 ? "bg-brand-gradient text-white" : "bg-white/10 text-light/80"
              }`}
              style={delay(0.6 + index * 0.35)}
            >
              {step}
            </span>
          </span>
        ))}
      </Glass>

      <Toast label="Campaign sent" detail="Email and WhatsApp" style={at(400, 430)} wait={-2.6}>
        <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />
      </Toast>
    </Canvas>
  );
}
