import { at, Bar, Canvas, delay, Glass, IconBadge, LineIcon, Phone, Toast } from "../../parts";

// Social Media Marketing: a week's content calendar with posts landing in their slots, a post
// on a phone with its likes, comments, and shares, a "Post scheduled" toast, and heart, chat,
// and share badges. No figures, so nothing reads as a claimed result.

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
// Which days have a post, and its colour: [day, row, colour].
const slots: [number, number, string][] = [
  [0, 0, "bg-brand-gradient"],
  [1, 1, "bg-coral"],
  [2, 0, "bg-white/80"],
  [3, 1, "bg-brand-gradient-reverse"],
  [4, 0, "bg-coral"],
  [1, 2, "bg-white/80"],
  [3, 2, "bg-crimson"],
];

export function SocialMediaMarketingScene() {
  return (
    <Canvas>
      {/* The content calendar. */}
      <Glass style={at(0, 40, 360, 260)} className="p-[2.4cqw] motion-safe:animate-drift">
        <div className="flex items-center justify-between">
          <span className="text-[2.1cqw] font-semibold text-white">Content calendar</span>
          <span className="rounded-full bg-white/[0.08] px-[1.4cqw] py-[0.5cqw] text-[1.4cqw] text-light/70">This week</span>
        </div>
        <div className="mt-[1.8cqw] grid grid-cols-5 gap-[1cqw]">
          {days.map((day) => (
            <span key={day} className="text-center text-[1.4cqw] text-light/50">
              {day}
            </span>
          ))}
          {Array.from({ length: 15 }, (_, cell) => {
            const day = cell % 5;
            const row = Math.floor(cell / 5);
            const slot = slots.find(([d, r]) => d === day && r === row);
            return (
              <span key={cell} className="relative h-[7cqw] rounded-[1.2cqw] bg-white/[0.04]">
                {slot && (
                  <span
                    className={`absolute inset-[0.7cqw] rounded-[0.9cqw] ${slot[2]} motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]`}
                    style={delay(0.4 + slots.indexOf(slot) * 0.2)}
                  >
                    <Bar className="absolute right-[0.8cqw] bottom-[0.8cqw] left-[0.8cqw] h-[0.7cqw] bg-primary/30" />
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </Glass>

      {/* The post. */}
      <Phone style={{ ...at(360, 60, 190, 400), ...delay(-1.8) }} className="motion-safe:animate-drift">
        <div className="size-full bg-white px-[1.8cqw] pt-[5cqw]">
          <div className="flex items-center gap-[1.2cqw]">
            <span className="grid size-[4.4cqw] place-items-center rounded-full bg-primary">
              <span className="size-1/2 rounded-[45%_45%_50%_50%] bg-brand-gradient" />
            </span>
            <span className="flex-1 space-y-[0.7cqw]">
              <Bar className="w-3/5 bg-primary/70" />
              <Bar className="h-[0.9cqw] w-2/5 bg-primary/25" />
            </span>
          </div>
          <div className="relative mt-[1.8cqw] aspect-square overflow-hidden rounded-[1.6cqw] bg-brand-gradient p-[2cqw]">
            <span className="absolute -right-[4cqw] -bottom-[4cqw] size-[16cqw] rounded-full bg-white/15" />
            <span className="absolute inset-x-[2cqw] bottom-[2cqw] space-y-[0.9cqw]">
              <Bar className="h-[2cqw] w-full bg-white" />
              <Bar className="h-[2cqw] w-2/3 bg-white" />
            </span>
          </div>
          <div className="mt-[1.8cqw] flex items-center gap-[2.4cqw] text-primary/60">
            <LineIcon className="size-[3.2cqw] fill-crimson text-crimson motion-safe:animate-pulse">
              <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
            </LineIcon>
            <LineIcon className="size-[3.2cqw]">
              <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z" />
            </LineIcon>
            <LineIcon className="size-[3.2cqw]">
              <path d="M4 12v7h16v-7M12 4v11M7.5 8.5 12 4l4.5 4.5" />
            </LineIcon>
          </div>
          <div className="mt-[1.4cqw] space-y-[0.8cqw]">
            <Bar className="w-full bg-primary/20" />
            <Bar className="w-3/4 bg-primary/20" />
          </div>
        </div>
      </Phone>

      <Toast label="Post scheduled" detail="Tuesday · 10:00" style={at(30, 330)} wait={-1}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4M9 15l2 2 4-4" />
      </Toast>

      <IconBadge style={at(60, 420, 56)} wait={-0.6}>
        <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
      </IconBadge>
      <IconBadge style={at(150, 430, 50)} wait={-2.2}>
        <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z" />
      </IconBadge>
      <IconBadge style={at(235, 410, 58)} wait={-3.4}>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
      </IconBadge>
    </Canvas>
  );
}
