import { at, Bar, Canvas, delay, Glass, Paper, Toast } from "../../parts";

// Brand Guidelines / Brand Book: an open brand book (colours with their codes on the left page,
// typography on the right), "Do" and "Don't" cards for the logo, and a "Brand book" toast.

const colours = [
  { name: "Crimson", code: "#C91D4C", swatch: "bg-crimson" },
  { name: "Coral", code: "#FA6143", swatch: "bg-coral" },
  { name: "Navy", code: "#151936", swatch: "bg-primary" },
  { name: "Cream", code: "#F6EFEB", swatch: "bg-light ring-1 ring-primary/10" },
];

export function BrandGuidelinesScene() {
  return (
    <Canvas>
      {/* The open book. */}
      <div className="absolute motion-safe:animate-drift" style={at(0, 40, 440, 300)}>
        <div className="grid size-full grid-cols-2 overflow-hidden rounded-[2.4cqw] shadow-[0_3cqw_7cqw_-2cqw_rgb(0_0_0_/_0.6)]">
          <div className="border-r border-primary/10 bg-white p-[2.4cqw]">
            <span className="font-mono text-[1.4cqw] tracking-[0.14em] text-crimson uppercase">03 · Colour</span>
            <div className="mt-[2cqw] space-y-[1.4cqw]">
              {colours.map((colour, index) => (
                <div
                  key={colour.name}
                  className="flex items-center gap-[1.4cqw] motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both]"
                  style={delay(0.4 + index * 0.2)}
                >
                  <span className={`size-[5cqw] shrink-0 rounded-[1.2cqw] ${colour.swatch}`} />
                  <span>
                    <span className="block text-[1.8cqw] font-semibold text-primary">{colour.name}</span>
                    <span className="block font-mono text-[1.4cqw] text-primary/50">{colour.code}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#fbf7f4] p-[2.4cqw]">
            <span className="font-mono text-[1.4cqw] tracking-[0.14em] text-crimson uppercase">04 · Type</span>
            <p className="mt-[1.4cqw] font-display text-[11cqw] leading-none font-semibold tracking-[-0.04em] text-primary">Aa</p>
            <div className="mt-[2cqw] space-y-[1.2cqw]">
              <Bar className="h-[2.4cqw] w-full bg-primary/85" />
              <Bar className="h-[1.8cqw] w-4/5 bg-primary/60" />
              <Bar className="w-full bg-primary/25" />
              <Bar className="w-5/6 bg-primary/25" />
              <Bar className="w-2/3 bg-primary/25" />
            </div>
            <span className="mt-[2.4cqw] block text-right font-mono text-[1.3cqw] text-primary/35">24</span>
          </div>
        </div>
      </div>

      {/* Do and don't. */}
      <Glass style={{ ...at(350, 250, 240, 170), ...delay(-2.2) }} className="p-[2cqw] motion-safe:animate-drift">
        <span className="text-[1.9cqw] font-semibold text-white">Logo use</span>
        <div className="mt-[1.4cqw] grid grid-cols-2 gap-[1.4cqw]">
          <div>
            <span className="grid aspect-[4/3] place-items-center rounded-[1.2cqw] border border-dashed border-white/25 bg-white/[0.04]">
              <span className="size-[5cqw] rounded-[45%_45%_50%_50%] bg-brand-gradient" />
            </span>
            <span className="mt-[0.9cqw] flex items-center gap-[0.6cqw] text-[1.4cqw] text-[#9be3c2]">✓ Clear space</span>
          </div>
          <div>
            <span className="grid aspect-[4/3] place-items-center rounded-[1.2cqw] bg-white/[0.04]">
              <span className="h-[3cqw] w-[9cqw] rounded-[45%_45%_50%_50%] bg-brand-gradient opacity-70" />
            </span>
            <span className="mt-[0.9cqw] flex items-center gap-[0.6cqw] text-[1.4cqw] text-[#ff7aa2]">✕ Don’t stretch</span>
          </div>
        </div>
      </Glass>

      <Paper style={{ ...at(455, 60, 130, 150), ...delay(-1.4) }} className="p-[1.8cqw] motion-safe:animate-drift">
        <span className="font-mono text-[1.3cqw] tracking-[0.14em] text-crimson uppercase">Tone</span>
        <div className="mt-[1.2cqw] space-y-[0.9cqw]">
          {["Warm", "Clear", "Bold"].map((word) => (
            <span key={word} className="block rounded-full bg-primary/[0.05] px-[1.4cqw] py-[0.6cqw] text-[1.6cqw] font-semibold text-primary">
              {word}
            </span>
          ))}
        </div>
      </Paper>

      <Toast label="Brand book" detail="48 pages · PDF" style={at(40, 395)} wait={-1}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15ZM4 20.5A2.5 2.5 0 0 0 6.5 21H20" />
      </Toast>
    </Canvas>
  );
}
