import { at, Bar, Canvas, delay, Glass, Paper, Toast } from "../../parts";

// Document & Data Processing: a scanned invoice with a scan line passing over it and its fields
// boxed as they're found, the extracted data filling a table, the stack of documents waiting,
// and a "Data extracted" toast. Made-up vendor and amounts.

const fields = [
  { label: "Vendor", value: "Bright Supplies" },
  { label: "Invoice #", value: "BS-0981" },
  { label: "Date", value: "12 Oct 2026" },
  { label: "Total", value: "$1,240.00" },
];

export function DocumentProcessingScene() {
  return (
    <Canvas>
      {/* Documents waiting. */}
      <Paper style={{ ...at(40, 50, 250, 330), rotate: "-6deg" }} className="opacity-60" />
      <Paper style={{ ...at(30, 45, 250, 330), rotate: "-3deg" }} className="opacity-80" />

      {/* The invoice being read. */}
      <Paper style={at(20, 40, 250, 330)} className="overflow-hidden p-[2.4cqw] motion-safe:animate-drift">
        <div className="flex items-start justify-between">
          <span className="relative rounded-[0.6cqw] px-[0.6cqw] py-[0.3cqw]">
            <span className="absolute inset-0 rounded-[0.6cqw] border-[0.3cqw] border-coral bg-coral/10 motion-safe:animate-[rise_0.4s_var(--ease-out-soft)_0.8s_both]" />
            <Bar className="relative h-[1.8cqw] w-[13cqw] bg-primary/80" />
          </span>
          <span className="font-display text-[2.2cqw] font-semibold text-primary/70">INVOICE</span>
        </div>
        <div className="mt-[2cqw] space-y-[0.8cqw]">
          <Bar className="h-[0.9cqw] w-1/2 bg-primary/20" />
          <Bar className="h-[0.9cqw] w-2/5 bg-primary/20" />
        </div>
        <div className="mt-[2.4cqw] space-y-[1.1cqw] border-y border-primary/10 py-[1.6cqw]">
          {[0, 1, 2, 3].map((line) => (
            <span key={line} className="flex justify-between">
              <Bar className="h-[0.9cqw] w-[16cqw] bg-primary/20" />
              <Bar className="h-[0.9cqw] w-[5cqw] bg-primary/30" />
            </span>
          ))}
        </div>
        <span className="relative mt-[1.6cqw] ml-auto flex w-fit items-center gap-[1.2cqw] rounded-[0.6cqw] px-[0.8cqw] py-[0.4cqw]">
          <span className="absolute inset-0 rounded-[0.6cqw] border-[0.3cqw] border-coral bg-coral/10 motion-safe:animate-[rise_0.4s_var(--ease-out-soft)_2s_both]" />
          <Bar className="relative h-[1.2cqw] w-[5cqw] bg-primary/40" />
          <Bar className="relative h-[1.8cqw] w-[8cqw] bg-primary/85" />
        </span>
        {/* The scan line. */}
        <span className="absolute inset-x-0 top-0 h-[8cqw] bg-linear-to-b from-transparent to-coral/30 motion-safe:animate-scan">
          <span className="absolute inset-x-0 bottom-0 h-[0.4cqw] bg-coral shadow-[0_0_2cqw_0.4cqw_rgb(250_97_67_/_0.8)]" />
        </span>
      </Paper>

      {/* The extracted data. */}
      <Glass style={{ ...at(300, 120, 290, 220), ...delay(-1.8) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="flex items-center justify-between">
          <span className="text-[1.9cqw] font-semibold text-white">Extracted data</span>
          <span className="rounded-full bg-[#2fbf71]/15 px-[1.1cqw] py-[0.3cqw] text-[1.3cqw] font-semibold text-[#5be09a]">Verified</span>
        </span>
        <div className="mt-[1.4cqw] divide-y divide-white/[0.08] rounded-[1.2cqw] border border-white/10">
          {fields.map((field, index) => (
            <span
              key={field.label}
              className="flex items-center justify-between px-[1.4cqw] py-[1.1cqw] text-[1.6cqw] motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]"
              style={delay(0.8 + index * 0.4)}
            >
              <span className="text-light/55">{field.label}</span>
              <span className="font-semibold text-white">{field.value}</span>
            </span>
          ))}
        </div>
        <span className="mt-[1.4cqw] flex items-center gap-[0.8cqw] text-[1.4cqw] text-light/60">
          <span className="size-[1.2cqw] rounded-[0.3cqw] bg-[#2fbf71]" />
          Sent to accounting
        </span>
      </Glass>

      <Toast label="Data extracted" detail="PDFs, scans, and emails" style={at(330, 380)} wait={-1}>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6ZM14 3v6h6M8 13h8M8 17h5" />
      </Toast>
    </Canvas>
  );
}
