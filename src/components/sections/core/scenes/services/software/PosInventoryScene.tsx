import { at, Bar, Canvas, delay, Glass, Paper, Toast } from "../../parts";

// POS & Inventory Software: a till on a tablet (product tiles, the order, "Charge"), a receipt
// printing out, stock levels with one item running low, and a "Stock synced" toast.

const tiles = ["from-[#ffd9cf] to-[#f7c3d2]", "from-[#2a2f63] to-[#5b3a6e]", "from-[#fa6143] to-[#c91d4c]", "from-[#ffe7c2] to-[#ffc48a]", "from-[#d8f3e5] to-[#9be3c2]", "from-[#ffd9cf] to-[#fa6143]"];
const stock = [
  { item: "Coffee beans", level: "w-4/5", low: false },
  { item: "Paper cups", level: "w-1/6", low: true },
  { item: "Oat milk", level: "w-3/5", low: false },
];

export function PosInventoryScene() {
  return (
    <Canvas>
      {/* The till. */}
      <div className="absolute motion-safe:animate-drift" style={at(0, 40, 400, 280)}>
        <div className="size-full rounded-[3cqw] border border-white/15 bg-[#0b0e24] p-[1.2cqw] shadow-[0_4cqw_8cqw_-2cqw_rgb(0_0_0_/_0.7)]">
          <div className="grid size-full grid-cols-[1.5fr_1fr] overflow-hidden rounded-[2cqw] bg-white">
            <div className="grid grid-cols-3 content-start gap-[1.2cqw] p-[1.8cqw]">
              {tiles.map((tint, index) => (
                <span key={index} className="rounded-[1.2cqw] bg-primary/[0.04] p-[0.9cqw]">
                  <span className={`block aspect-square rounded-[0.9cqw] bg-linear-to-br ${tint}`} />
                  <Bar className="mt-[0.8cqw] h-[0.9cqw] w-4/5 bg-primary/40" />
                </span>
              ))}
            </div>
            <div className="flex flex-col bg-primary/[0.04] p-[1.8cqw]">
              <span className="text-[1.7cqw] font-semibold">Order</span>
              <div className="mt-[1.2cqw] space-y-[1cqw]">
                {[0, 1, 2].map((line) => (
                  <span key={line} className="flex items-center justify-between">
                    <Bar className="w-[9cqw] bg-primary/30" />
                    <Bar className="w-[3.6cqw] bg-primary/45" />
                  </span>
                ))}
              </div>
              <span className="mt-auto flex h-[4.4cqw] items-center justify-center rounded-[1.2cqw] bg-brand-gradient-reverse text-[1.7cqw] font-semibold text-white">
                Charge
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The receipt, printing. */}
      <div className="absolute overflow-hidden" style={at(410, 20, 150, 250)}>
        <Paper
          style={{ position: "relative" }}
          className="rounded-t-none! px-[1.8cqw] pt-[1.8cqw] pb-[3cqw] motion-safe:animate-[rise_1.6s_var(--ease-out-soft)_0.4s_both]"
        >
          <span className="mx-auto block size-[3cqw] rounded-[45%_45%_50%_50%] bg-brand-gradient" />
          <div className="mt-[1.4cqw] space-y-[0.9cqw] border-y border-dashed border-primary/20 py-[1.4cqw]">
            {[0, 1, 2, 3].map((line) => (
              <span key={line} className="flex justify-between">
                <Bar className="h-[0.9cqw] w-[9cqw] bg-primary/25" />
                <Bar className="h-[0.9cqw] w-[3cqw] bg-primary/35" />
              </span>
            ))}
          </div>
          <span className="mt-[1.2cqw] flex justify-between">
            <Bar className="w-[6cqw] bg-primary/60" />
            <Bar className="w-[4cqw] bg-primary/70" />
          </span>
          <span className="mx-auto mt-[1.8cqw] flex h-[3cqw] w-4/5 gap-[0.3cqw]">
            {Array.from({ length: 18 }, (_, bar) => (
              <span key={bar} className={`h-full bg-primary ${bar % 3 === 0 ? "w-[0.5cqw]" : "w-[0.25cqw]"}`} />
            ))}
          </span>
        </Paper>
      </div>

      {/* Stock levels. */}
      <Glass style={{ ...at(300, 330, 290, 150), ...delay(-2) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[1.9cqw] font-semibold text-white">Stock levels</span>
        <div className="mt-[1.4cqw] space-y-[1.3cqw]">
          {stock.map((row) => (
            <div key={row.item}>
              <span className="flex justify-between text-[1.4cqw]">
                <span className="text-light/75">{row.item}</span>
                {row.low && <span className="font-semibold text-coral">Reorder</span>}
              </span>
              <span className="mt-[0.6cqw] block h-[0.9cqw] rounded-full bg-white/10">
                <span className={`block h-full rounded-full ${row.level} ${row.low ? "bg-coral motion-safe:animate-pulse" : "bg-brand-gradient"}`} />
              </span>
            </div>
          ))}
        </div>
      </Glass>

      <Toast label="Stock synced" detail="Till, online store, warehouse" style={at(20, 350)} wait={-1}>
        <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12a9 9 0 0 1 15.5-6.2M18 2v4h-4M6 22v-4h4" />
      </Toast>
    </Canvas>
  );
}
