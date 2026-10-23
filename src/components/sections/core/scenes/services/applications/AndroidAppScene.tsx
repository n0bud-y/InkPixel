import kotlin from "@/assets/images/technologies/menu/kotlin.svg";
import { at, Bar, Canvas, delay, LogoTile, Paper, Toast } from "../../parts";

// Android App Development: an Android phone (punch-hole camera, a Material-style app bar, cards,
// a floating action button, the bottom navigation), the app's Google Play listing, a home-screen
// widget, a Kotlin tile, and a "Live on Google Play" toast.

export function AndroidAppScene() {
  return (
    <Canvas>
      {/* The phone: squarer corners and a punch-hole camera. */}
      <div className="absolute motion-safe:animate-drift" style={at(180, 10, 200, 440)}>
        <div className="size-full rounded-[3.6cqw] border border-white/15 bg-[#0b0e24] p-[1.1cqw] shadow-[0_4cqw_8cqw_-2cqw_rgb(0_0_0_/_0.7)]">
          <div className="relative size-full overflow-hidden rounded-[2.8cqw] bg-[#fdf8f6]">
            <span className="absolute top-[1.3cqw] left-1/2 size-[1.8cqw] -translate-x-1/2 rounded-full bg-[#0b0e24]" />
            {/* App bar. */}
            <div className="flex items-center gap-[1.6cqw] bg-brand-gradient-reverse px-[2cqw] pt-[5cqw] pb-[1.8cqw] text-white">
              <span className="flex flex-col gap-[0.5cqw]">
                <span className="h-[0.3cqw] w-[2.4cqw] rounded-full bg-white" />
                <span className="h-[0.3cqw] w-[2.4cqw] rounded-full bg-white" />
                <span className="h-[0.3cqw] w-[2.4cqw] rounded-full bg-white" />
              </span>
              <Bar className="h-[1.6cqw] w-[14cqw] bg-white" />
            </div>
            <div className="space-y-[1.4cqw] p-[1.8cqw]">
              {[0, 1, 2].map((card) => (
                <div key={card} className="flex items-center gap-[1.4cqw] rounded-[1.6cqw] bg-white p-[1.4cqw] shadow-[0_0.8cqw_1.8cqw_-0.8cqw_rgb(21_25_54_/_0.25)]">
                  <span className={`size-[6cqw] shrink-0 rounded-[1.2cqw] ${card === 0 ? "bg-brand-gradient" : "bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]"}`} />
                  <span className="flex-1 space-y-[0.8cqw]">
                    <Bar className="w-4/5 bg-primary/60" />
                    <Bar className="h-[0.9cqw] w-1/2 bg-primary/20" />
                  </span>
                </div>
              ))}
            </div>
            {/* Floating action button. */}
            <span className="absolute right-[2cqw] bottom-[9cqw] grid size-[6.4cqw] place-items-center rounded-[1.8cqw] bg-primary text-[3.4cqw] leading-none text-white shadow-[0_1.2cqw_2.4cqw_-0.8cqw_rgb(0_0_0_/_0.5)]">
              +
            </span>
            {/* Bottom navigation. */}
            <div className="absolute inset-x-0 bottom-0 flex justify-around bg-white px-[1.4cqw] pt-[1.4cqw] pb-[2cqw]">
              {[0, 1, 2, 3].map((tab) => (
                <span key={tab} className="flex flex-col items-center gap-[0.5cqw]">
                  <span className={`h-[2.8cqw] w-[5cqw] rounded-full ${tab === 0 ? "bg-coral/25" : ""} grid place-items-center`}>
                    <span className={`size-[1.8cqw] rounded-[0.5cqw] ${tab === 0 ? "bg-crimson" : "bg-primary/25"}`} />
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The Google Play listing. */}
      <Paper style={{ ...at(390, 50, 205, 175), ...delay(-1.8) }} className="p-[2cqw] motion-safe:animate-drift">
        <div className="flex items-center gap-[1.4cqw]">
          <span className="grid size-[7cqw] shrink-0 place-items-center rounded-[2cqw] bg-brand-gradient">
            <span className="size-1/2 rounded-[45%_45%_50%_50%] bg-white" />
          </span>
          <span className="min-w-0 flex-1">
            <Bar className="h-[1.4cqw] w-full bg-primary/80" />
            <Bar className="mt-[0.8cqw] h-[0.9cqw] w-2/3 bg-[#01875f]/60" />
          </span>
        </div>
        <span className="mt-[1.8cqw] flex h-[4cqw] items-center justify-center rounded-[1cqw] bg-[#01875f] text-[1.6cqw] font-semibold text-white">Install</span>
        <span className="mt-[1.4cqw] grid grid-cols-3 gap-[0.8cqw]">
          {[0, 1, 2].map((shot) => (
            <span key={shot} className="aspect-[9/16] rounded-[0.8cqw] bg-linear-to-b from-[#ffd9cf] to-[#f7c3d2]" />
          ))}
        </span>
      </Paper>

      {/* A home-screen widget. */}
      <Paper style={{ ...at(0, 110, 165, 150), ...delay(-0.9) }} className="bg-brand-gradient p-[2cqw] text-white motion-safe:animate-drift">
        <span className="text-[1.5cqw] font-semibold text-white/80">Widget</span>
        <span className="mt-[1cqw] block font-display text-[3.6cqw] leading-none font-semibold">3 tasks</span>
        <div className="mt-[1.6cqw] space-y-[0.8cqw]">
          <Bar className="w-full bg-white/70" />
          <Bar className="w-3/4 bg-white/40" />
        </div>
      </Paper>

      <Toast label="Live on Google Play" detail="Phones and tablets" style={at(10, 320)} wait={-2.2}>
        <path d="M5 3.5v17l9-8.5-9-8.5ZM5 3.5l12 7-3 2.5M5 20.5l12-7-3-2.5" />
      </Toast>

      <LogoTile logo={kotlin} label="Kotlin" style={at(430, 280)} wait={-3} />
    </Canvas>
  );
}
