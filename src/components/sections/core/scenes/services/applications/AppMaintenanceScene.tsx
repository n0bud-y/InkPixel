import firebase from "@/assets/images/technologies/menu/firebase.svg";
import { at, Bar, Canvas, delay, Glass, LogoTile, Phone, Toast } from "../../parts";

// App Maintenance & Scaling: a phone showing the "Update available" sheet, the release's notes,
// app health (stability, speed, servers scaling up with demand), a Firebase tile, and a
// "Version 2.4 rolled out" toast. No crash or uptime figures.

const notes = ["Faster checkout", "Dark mode", "Bug fixes"];
const load = [30, 42, 38, 55, 70, 64, 82, 76];

export function AppMaintenanceScene() {
  return (
    <Canvas>
      <Phone style={at(30, 30, 190, 410)} className="motion-safe:animate-drift">
        <div className="relative size-full bg-[#fbf7f4] px-[2cqw] pt-[5.4cqw]">
          <Bar className="h-[1.8cqw] w-1/2 bg-primary/85" />
          {[0, 1, 2].map((row) => (
            <span key={row} className="mt-[1.6cqw] flex items-center gap-[1.2cqw] rounded-[1.4cqw] bg-white p-[1.2cqw]">
              <span className="size-[4cqw] rounded-[1cqw] bg-primary/10" />
              <Bar className="w-1/2 bg-primary/30" />
            </span>
          ))}
          {/* The update sheet. */}
          <div className="absolute inset-x-0 bottom-0 rounded-t-[3cqw] bg-white px-[2.2cqw] pt-[1.6cqw] pb-[3cqw] shadow-[0_-2cqw_4cqw_-2cqw_rgb(21_25_54_/_0.3)] motion-safe:animate-[rise_0.8s_var(--ease-out-soft)_0.6s_both]">
            <span className="mx-auto block h-[0.6cqw] w-[7cqw] rounded-full bg-primary/15" />
            <span className="mt-[1.8cqw] flex items-center gap-[1.2cqw]">
              <span className="grid size-[5cqw] place-items-center rounded-[1.4cqw] bg-brand-gradient">
                <span className="size-1/2 rounded-[45%_45%_50%_50%] bg-white" />
              </span>
              <span>
                <span className="block text-[1.8cqw] font-semibold text-primary">Update available</span>
                <span className="block text-[1.4cqw] text-primary/55">Version 2.4</span>
              </span>
            </span>
            <span className="mt-[1.8cqw] flex h-[4cqw] items-center justify-center rounded-full bg-brand-gradient-reverse text-[1.6cqw] font-semibold text-white">
              Update now
            </span>
          </div>
        </div>
      </Phone>

      {/* Release notes. */}
      <Glass style={{ ...at(260, 40, 210, 165), ...delay(-1.6) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="flex items-center justify-between">
          <span className="text-[1.9cqw] font-semibold text-white">What’s new</span>
          <span className="rounded-full bg-white/[0.08] px-[1.1cqw] py-[0.3cqw] font-mono text-[1.3cqw] text-light/70">v2.4</span>
        </span>
        <div className="mt-[1.4cqw] space-y-[1.1cqw]">
          {notes.map((note, index) => (
            <span
              key={note}
              className="flex items-center gap-[1.1cqw] text-[1.6cqw] text-light/80 motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]"
              style={delay(0.8 + index * 0.3)}
            >
              <span className="size-[1.2cqw] rounded-full bg-coral" />
              {note}
            </span>
          ))}
        </div>
      </Glass>

      {/* App health. */}
      <Glass style={{ ...at(260, 225, 330, 200), ...delay(-2.8) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[1.9cqw] font-semibold text-white">App health</span>
        <div className="mt-[1.4cqw] grid grid-cols-2 gap-[1.2cqw]">
          {[
            ["Stability", "Stable"],
            ["Load time", "Fast"],
          ].map(([label, status]) => (
            <span key={label} className="rounded-[1.2cqw] bg-white/[0.06] p-[1.2cqw]">
              <span className="block text-[1.3cqw] text-light/55">{label}</span>
              <span className="mt-[0.4cqw] flex items-center gap-[0.8cqw] text-[1.8cqw] font-semibold text-white">
                <span className="size-[1.2cqw] rounded-full bg-[#2fbf71]" />
                {status}
              </span>
            </span>
          ))}
        </div>
        <span className="mt-[1.6cqw] flex justify-between text-[1.3cqw] text-light/55">
          <span>Servers scaling with demand</span>
          <span>Auto</span>
        </span>
        <span className="mt-[0.8cqw] flex h-[6cqw] items-end gap-[0.8cqw]">
          {load.map((height, index) => (
            <span
              key={index}
              className="flex-1 rounded-[0.5cqw] bg-brand-gradient motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both]"
              style={{ height: `${height}%`, ...delay(0.6 + index * 0.1) }}
            />
          ))}
        </span>
      </Glass>

      <Toast label="Version 2.4 rolled out" detail="iOS and Android" style={at(240, 440)} wait={-1}>
        <path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />
      </Toast>

      <LogoTile logo={firebase} label="Firebase" style={at(480, 60)} wait={-0.6} />
    </Canvas>
  );
}
