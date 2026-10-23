import { at, Bar, Canvas, delay, Glass, LineIcon, Paper, Toast } from "../../parts";

// AI Content & Marketing Automation: an AI writer turning a brief into three ad variations
// (typing in), a generated campaign image, the posts queued to each channel, and a "3
// variations ready" toast.

const sparkle = "M12 3c.4 4.2 2.8 6.6 7 7-4.2.4-6.6 2.8-7 7-.4-4.2-2.8-6.6-7-7 4.2-.4 6.6-2.8 7-7Z";
const variations = ["Summer’s here. So is 20% off.", "Your new favourite, now on sale.", "Treat yourself: deals end Sunday."];
const queue = [
  { channel: "Instagram", time: "Mon 09:00" },
  { channel: "Email", time: "Tue 10:30" },
  { channel: "Facebook", time: "Wed 18:00" },
];

export function AiContentScene() {
  return (
    <Canvas>
      {/* The AI writer. */}
      <Glass style={at(0, 30, 360, 270)} className="p-[2.4cqw] motion-safe:animate-drift">
        <span className="flex items-center gap-[1.2cqw]">
          <span className="grid size-[4cqw] place-items-center rounded-[1.1cqw] bg-brand-gradient text-white">
            <LineIcon className="size-[2.4cqw]">
              <path d={sparkle} />
            </LineIcon>
          </span>
          <span className="text-[2cqw] font-semibold text-white">AI writer</span>
        </span>
        <div className="mt-[1.8cqw] rounded-[1.2cqw] bg-white/[0.06] p-[1.4cqw] text-[1.5cqw] text-light/60">
          <span className="font-semibold text-light/85">Brief:</span> summer sale ad, friendly, under 40 characters
        </div>
        <div className="mt-[1.6cqw] space-y-[1cqw]">
          {variations.map((text, index) => (
            <div key={text} className="flex items-center gap-[1.2cqw] rounded-[1.2cqw] border border-white/10 p-[1.2cqw]">
              <span className="grid size-[2.6cqw] shrink-0 place-items-center rounded-full bg-white/10 text-[1.3cqw] font-semibold text-coral">{index + 1}</span>
              <span className="w-fit text-[1.6cqw] whitespace-pre text-white motion-safe:animate-type" style={delay(0.6 + index * 0.9)}>
                {text}
              </span>
            </div>
          ))}
        </div>
      </Glass>

      {/* The generated image. */}
      <Paper style={{ ...at(380, 30, 210, 230), ...delay(-1.6) }} className="p-[1.6cqw] motion-safe:animate-drift">
        <div className="relative aspect-square overflow-hidden rounded-[1.4cqw] bg-linear-to-br from-[#ffc48a] via-coral to-crimson">
          <span className="absolute top-[18%] left-[20%] size-[12cqw] rounded-full bg-white/70 blur-[0.6cqw]" />
          <span className="absolute -right-[4cqw] -bottom-[6cqw] size-[22cqw] rounded-full bg-primary/40" />
          <span className="absolute -bottom-[4cqw] left-[10%] h-[10cqw] w-[30cqw] rounded-[50%] bg-[#ffd9cf]/80" />
          <span className="absolute top-[1cqw] right-[1cqw] flex items-center gap-[0.5cqw] rounded-full bg-white/90 px-[1cqw] py-[0.3cqw] text-[1.2cqw] font-semibold text-crimson">
            <LineIcon className="size-[1.5cqw]">
              <path d={sparkle} />
            </LineIcon>
            Generated
          </span>
        </div>
        <Bar className="mt-[1.4cqw] w-3/4 bg-primary/30" />
      </Paper>

      {/* The queue. */}
      <Paper style={{ ...at(300, 290, 290, 150), ...delay(-2.6) }} className="p-[2cqw] motion-safe:animate-drift">
        <span className="text-[1.8cqw] font-semibold">Scheduled</span>
        <div className="mt-[1.2cqw] space-y-[0.9cqw]">
          {queue.map((item, index) => (
            <span
              key={item.channel}
              className="flex items-center justify-between rounded-[1cqw] bg-primary/[0.04] px-[1.3cqw] py-[0.8cqw] text-[1.5cqw] motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]"
              style={delay(2.4 + index * 0.3)}
            >
              <span className="flex items-center gap-[0.9cqw] font-medium">
                <span className="size-[1.4cqw] rounded-full bg-brand-gradient" />
                {item.channel}
              </span>
              <span className="text-primary/50">{item.time}</span>
            </span>
          ))}
        </div>
      </Paper>

      <Toast label="3 variations ready" detail="Pick one or test them all" style={at(20, 350)} wait={-1}>
        <path d={sparkle} />
      </Toast>
    </Canvas>
  );
}
