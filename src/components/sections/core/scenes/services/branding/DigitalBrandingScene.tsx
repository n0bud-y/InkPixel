import { at, Bar, Browser, Canvas, delay, Glass, LineIcon, Paper, Toast } from "../../parts";

// Website & Digital Branding: the brand carried onto a website (browser), a UI style kit (colour
// tokens, buttons, and an icon set), a web banner, and a "UI style guide" toast.

const icons = [
  "M3 11.5 12 4l9 7.5M5 10v10h14V10",
  "M4 6h16v12H4zM4 7l8 6 8-6",
  "M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z",
  "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4",
];

export function DigitalBrandingScene() {
  return (
    <Canvas>
      <Browser url="nova-studio.com" style={at(0, 40, 380, 280)} className="motion-safe:animate-drift">
        <div className="relative overflow-hidden bg-primary px-[2.4cqw] pt-[2cqw] pb-[3cqw]">
          <span className="absolute -top-[6cqw] -right-[4cqw] size-[22cqw] rounded-full bg-crimson/55 blur-[3cqw]" />
          <span className="absolute -bottom-[8cqw] left-[30%] size-[18cqw] rounded-full bg-coral/40 blur-[3cqw]" />
          <div className="relative flex items-center justify-between">
            <span className="flex items-center gap-[0.8cqw]">
              <span className="size-[2.6cqw] rounded-[45%_45%_50%_50%] bg-brand-gradient" />
              <span className="font-display text-[2cqw] font-semibold text-white">nova</span>
            </span>
            <span className="flex gap-[1.4cqw]">
              <Bar className="w-[4.5cqw] bg-white/30" />
              <Bar className="w-[4.5cqw] bg-white/30" />
              <Bar className="w-[4.5cqw] bg-white/30" />
            </span>
          </div>
          <div className="relative mt-[3.4cqw] max-w-[60%] space-y-[1.2cqw]">
            <Bar className="h-[2.6cqw] w-full bg-white" />
            <Bar className="h-[2.6cqw] w-3/4 bg-white" />
            <Bar className="w-full bg-white/35" />
            <span className="!mt-[2cqw] flex gap-[1cqw]">
              <span className="h-[3.4cqw] w-[11cqw] rounded-full bg-brand-gradient-reverse" />
              <span className="h-[3.4cqw] w-[9cqw] rounded-full border border-white/40" />
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-[1.4cqw] p-[2cqw]">
          {icons.slice(0, 3).map((icon) => (
            <div key={icon} className="rounded-[1.2cqw] bg-primary/[0.04] p-[1.3cqw]">
              <span className="grid size-[3.4cqw] place-items-center rounded-[0.9cqw] bg-brand-gradient text-white">
                <LineIcon className="size-[2cqw]">
                  <path d={icon} />
                </LineIcon>
              </span>
              <Bar className="mt-[1cqw] w-full bg-primary/15" />
            </div>
          ))}
        </div>
      </Browser>

      {/* The UI style kit. */}
      <Glass style={{ ...at(345, 165, 245, 225), ...delay(-2) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[2cqw] font-semibold text-white">UI kit</span>
        <div className="mt-[1.6cqw] flex gap-[1cqw]">
          {["bg-crimson", "bg-coral", "bg-primary ring-1 ring-white/20", "bg-light"].map((swatch, index) => (
            <span
              key={swatch}
              className={`h-[5cqw] flex-1 rounded-[1cqw] ${swatch} motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]`}
              style={delay(0.5 + index * 0.15)}
            />
          ))}
        </div>
        <div className="mt-[1.8cqw] flex gap-[1cqw]">
          <span className="rounded-full bg-brand-gradient-reverse px-[2cqw] py-[0.9cqw] text-[1.5cqw] font-semibold text-white">Button</span>
          <span className="rounded-full border border-white/30 px-[2cqw] py-[0.9cqw] text-[1.5cqw] font-semibold text-white">Button</span>
        </div>
        <div className="mt-[1.8cqw] grid grid-cols-4 gap-[1cqw]">
          {icons.map((icon) => (
            <span key={icon} className="grid aspect-square place-items-center rounded-[1cqw] bg-white/[0.07] text-coral">
              <LineIcon className="size-1/2">
                <path d={icon} />
              </LineIcon>
            </span>
          ))}
        </div>
      </Glass>

      {/* A web banner. */}
      <Paper style={{ ...at(270, 20, 260, 90), ...delay(-1.2) }} className="flex items-center gap-[1.6cqw] overflow-hidden bg-linear-to-r from-[#ffd9cf] to-[#f7c3d2] px-[2cqw] motion-safe:animate-drift">
        <span className="size-[4cqw] shrink-0 rounded-[45%_45%_50%_50%] bg-brand-gradient" />
        <span className="flex-1 space-y-[0.7cqw]">
          <Bar className="h-[1.6cqw] w-full bg-primary/85" />
          <Bar className="h-[1cqw] w-2/3 bg-primary/40" />
        </span>
        <span className="rounded-full bg-primary px-[1.6cqw] py-[0.8cqw] text-[1.4cqw] font-semibold text-white">Shop now</span>
      </Paper>

      <Toast label="UI style guide" detail="Colours · Type · Icons" style={at(30, 360)} wait={-1}>
        <circle cx="13.5" cy="6.5" r="1.5" />
        <circle cx="17.5" cy="10.5" r="1.5" />
        <circle cx="8.5" cy="7.5" r="1.5" />
        <path d="M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2 2 0 0 0-1.5 3.3A1.6 1.6 0 0 1 12 21Z" />
      </Toast>
    </Canvas>
  );
}
