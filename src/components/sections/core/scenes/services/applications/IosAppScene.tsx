import firebase from "@/assets/images/technologies/menu/firebase.svg";
import swift from "@/assets/images/technologies/menu/swift.svg";
import { at, Bar, Canvas, delay, LogoTile, Paper, Phone, Toast } from "../../parts";

// iOS App Development: an iPhone with an iOS-style screen (large title, a widget, grouped
// lists), the app's App Store page (icon, "Get", stars), Face ID and widget cards, a Swift
// tile, a Firebase tile, and a "Submitted to the App Store" toast.

export function IosAppScene() {
  return (
    <Canvas>
      <Phone style={at(180, 10, 200, 440)} className="motion-safe:animate-drift">
        <div className="size-full bg-[#f2f2f7] px-[2cqw] pt-[6cqw]">
          <span className="block font-display text-[3.4cqw] leading-none font-bold tracking-[-0.03em] text-primary">Today</span>
          {/* The widget. */}
          <div className="relative mt-[1.8cqw] overflow-hidden rounded-[2.4cqw] bg-brand-gradient p-[2cqw] text-white">
            <span className="absolute -right-[3cqw] -bottom-[4cqw] size-[13cqw] rounded-full bg-white/15" />
            <Bar className="h-[1cqw] w-1/3 bg-white/70" />
            <Bar className="mt-[1.2cqw] h-[2cqw] w-4/5 bg-white" />
            <span className="mt-[1.6cqw] flex gap-[0.8cqw]">
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <span key={day} className={`h-[3.6cqw] flex-1 rounded-[0.7cqw] ${day < 5 ? "bg-white" : "bg-white/30"}`} />
              ))}
            </span>
          </div>
          {/* Grouped list. */}
          <div className="mt-[1.8cqw] divide-y divide-primary/[0.07] rounded-[2cqw] bg-white">
            {["bg-coral", "bg-[#3a4cc4]", "bg-[#2fbf71]", "bg-crimson"].map((tone) => (
              <span key={tone} className="flex items-center gap-[1.4cqw] px-[1.6cqw] py-[1.3cqw]">
                <span className={`size-[3.2cqw] rounded-[0.9cqw] ${tone}`} />
                <Bar className="w-1/2 bg-primary/45" />
                <span className="ml-auto text-[1.8cqw] text-primary/25">›</span>
              </span>
            ))}
          </div>
          <span className="absolute bottom-[1.6cqw] left-1/2 h-[0.6cqw] w-[12cqw] -translate-x-1/2 rounded-full bg-primary/80" />
        </div>
      </Phone>

      {/* The App Store page. */}
      <Paper style={{ ...at(390, 60, 205, 190), ...delay(-1.8) }} className="p-[2cqw] motion-safe:animate-drift">
        <div className="flex items-center gap-[1.4cqw]">
          <span className="grid size-[7cqw] shrink-0 place-items-center rounded-[1.8cqw] bg-brand-gradient shadow-[0_1cqw_2cqw_-0.8cqw_rgb(201_29_76_/_0.8)]">
            <span className="size-1/2 rounded-[45%_45%_50%_50%] bg-white" />
          </span>
          <span className="min-w-0 flex-1">
            <Bar className="h-[1.4cqw] w-full bg-primary/80" />
            <Bar className="mt-[0.8cqw] h-[0.9cqw] w-2/3 bg-primary/25" />
            <span className="mt-[1.2cqw] inline-block rounded-full bg-[#0a84ff] px-[1.8cqw] py-[0.5cqw] text-[1.4cqw] font-bold text-white">GET</span>
          </span>
        </div>
        <span className="mt-[1.8cqw] flex gap-[0.4cqw]">
          {[0, 1, 2, 3, 4].map((star) => (
            <svg key={star} viewBox="0 0 24 24" className="size-[2.4cqw] fill-coral">
              <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
            </svg>
          ))}
        </span>
        <span className="mt-[1.4cqw] grid grid-cols-3 gap-[0.8cqw]">
          {[0, 1, 2].map((shot) => (
            <span key={shot} className="aspect-[9/16] rounded-[1cqw] bg-linear-to-b from-[#ffd9cf] to-[#f7c3d2]" />
          ))}
        </span>
      </Paper>

      {/* Face ID. */}
      <Paper style={{ ...at(10, 90, 160), ...delay(-0.9) }} className="flex flex-col items-center p-[2cqw] text-center motion-safe:animate-drift">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className="size-[7cqw] text-crimson">
          <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2M9 9v1M15 9v1M12 9v4h-1M9 16s1 1 3 1 3-1 3-1" />
        </svg>
        <span className="mt-[1cqw] text-[1.7cqw] font-semibold">Face ID</span>
        <span className="text-[1.4cqw] text-primary/55">Secure sign-in</span>
      </Paper>

      <Toast label="Submitted" detail="To the App Store" style={at(10, 300)} wait={-2.2}>
        <path d="m22 2-7 20-4-9-9-4 20-7ZM22 2 11 13" />
      </Toast>

      <LogoTile logo={swift} label="Swift" style={at(420, 290)} wait={-3} />
      <LogoTile logo={firebase} label="Firebase" style={at(410, 365)} wait={-1.4} />
    </Canvas>
  );
}
