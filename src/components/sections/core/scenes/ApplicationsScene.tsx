import flutter from "@/assets/images/technologies/menu/flutter.svg";
import kotlin from "@/assets/images/technologies/menu/kotlin.svg";
import swift from "@/assets/images/technologies/menu/swift.svg";
import { at, Bar, Canvas, delay, LineIcon, LogoTile, Paper, Phone } from "./parts";

// Applications: two phones (a light app screen in front, a dark one behind), a notification,
// an in-app "rate your experience" prompt, and iOS, Android, and Flutter tiles.

// The bottom tab bar: four icons, the first active.
function TabBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`absolute inset-x-0 bottom-0 flex items-center justify-around px-[2cqw] py-[2cqw] ${dark ? "bg-white/[0.04]" : "bg-white"}`}>
      {[0, 1, 2, 3].map((tab) => (
        <span key={tab} className="flex flex-col items-center gap-[0.6cqw]">
          <span className={`size-[3cqw] rounded-[0.9cqw] ${tab === 0 ? "bg-brand-gradient" : dark ? "bg-white/15" : "bg-primary/15"}`} />
          {tab === 0 && <span className="size-[0.8cqw] rounded-full bg-crimson" />}
        </span>
      ))}
    </div>
  );
}

export function ApplicationsScene() {
  return (
    <Canvas>
      {/* Behind: a dark screen with a chart. */}
      <Phone style={{ ...at(330, 50, 170, 360), rotate: "7deg" }} className="opacity-90">
        <div className="size-full bg-[#14183a] px-[2cqw] pt-[5cqw]">
          <Bar className="w-1/2 bg-white/60" />
          <Bar className="mt-[1cqw] h-[1cqw] w-1/3 bg-white/20" />
          <div className="mt-[2.6cqw] flex h-[16cqw] items-end gap-[1cqw] rounded-[2cqw] bg-white/[0.05] p-[1.6cqw]">
            {[40, 65, 50, 85, 70, 100].map((height, index) => (
              <span key={index} className="flex-1 rounded-[0.6cqw] bg-brand-gradient opacity-90" style={{ height: `${height}%` }} />
            ))}
          </div>
          {[0, 1].map((row) => (
            <div key={row} className="mt-[1.8cqw] flex items-center gap-[1.4cqw] rounded-[1.6cqw] bg-white/[0.05] p-[1.4cqw]">
              <span className="size-[3.4cqw] rounded-full bg-white/15" />
              <Bar className="w-1/2 bg-white/25" />
            </div>
          ))}
          <TabBar dark />
        </div>
      </Phone>

      {/* In front: a light home screen. */}
      <Phone style={{ ...at(175, 20, 190, 410), ...delay(-1.5) }} className="motion-safe:animate-drift">
        <div className="size-full bg-[#fbf7f4] px-[2.2cqw] pt-[5.4cqw]">
          <div className="flex items-center justify-between">
            <div className="space-y-[0.9cqw]">
              <Bar className="h-[1cqw] w-[10cqw] bg-primary/30" />
              <Bar className="h-[1.8cqw] w-[16cqw] bg-primary/85" />
            </div>
            <span className="size-[4.6cqw] rounded-full bg-brand-gradient-reverse ring-[0.5cqw] ring-white" />
          </div>
          <div className="relative mt-[2.4cqw] overflow-hidden rounded-[2.2cqw] bg-brand-gradient p-[2cqw] text-white">
            <span className="absolute -right-[3cqw] -bottom-[4cqw] size-[13cqw] rounded-full bg-white/15" />
            <Bar className="h-[1cqw] w-1/3 bg-white/70" />
            <Bar className="mt-[1.2cqw] h-[1.8cqw] w-4/5 bg-white" />
            <Bar className="mt-[0.9cqw] h-[1.8cqw] w-3/5 bg-white" />
            <span className="mt-[2cqw] block h-[3.2cqw] w-[11cqw] rounded-full bg-white" />
          </div>
          {[0, 1, 2].map((row) => (
            <div key={row} className="mt-[1.6cqw] flex items-center gap-[1.4cqw] rounded-[1.6cqw] bg-white p-[1.4cqw] shadow-[0_1cqw_2cqw_-1cqw_rgb(21_25_54_/_0.25)]">
              <span className={`size-[4cqw] shrink-0 rounded-[1.2cqw] ${row === 1 ? "bg-coral/80" : "bg-primary/10"}`} />
              <span className="flex-1 space-y-[0.8cqw]">
                <Bar className="w-3/4 bg-primary/60" />
                <Bar className="h-[0.9cqw] w-1/2 bg-primary/20" />
              </span>
            </div>
          ))}
          <TabBar />
        </div>
      </Phone>

      {/* A notification. */}
      <Paper style={{ ...at(0, 70, 220), ...delay(-0.7) }} className="flex items-center gap-[1.6cqw] p-[1.6cqw] motion-safe:animate-drift">
        <span className="grid size-[5.4cqw] shrink-0 place-items-center rounded-[1.4cqw] bg-brand-gradient text-white">
          <LineIcon className="size-[3cqw]">
            <path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9ZM10 20a2 2 0 0 0 4 0" />
          </LineIcon>
        </span>
        <span className="min-w-0">
          <span className="block text-[2cqw] font-semibold whitespace-nowrap">New order received</span>
          <span className="mt-[0.4cqw] block text-[1.6cqw] text-primary/55">Just now</span>
        </span>
      </Paper>

      {/* Rate your experience. */}
      <Paper style={{ ...at(20, 330, 200), ...delay(-2.9) }} className="p-[1.8cqw] motion-safe:animate-drift">
        <span className="block text-[1.9cqw] font-semibold">Rate your experience</span>
        <span className="mt-[1cqw] flex gap-[0.6cqw]">
          {[0, 1, 2, 3, 4].map((star) => (
            <svg key={star} viewBox="0 0 24 24" className={`size-[3.2cqw] ${star < 4 ? "fill-coral" : "fill-primary/15"}`}>
              <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
            </svg>
          ))}
        </span>
      </Paper>

      <LogoTile logo={swift} label="iOS" style={at(486, 20)} wait={-0.4} />
      <LogoTile logo={kotlin} label="Android" style={at(476, 200)} wait={-2} />
      <LogoTile logo={flutter} label="Flutter" style={at(470, 400)} wait={-3.2} />
    </Canvas>
  );
}
