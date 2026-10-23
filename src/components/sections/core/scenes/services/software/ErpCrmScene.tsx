import { at, Bar, Canvas, delay, Glass, IconBadge, Paper, Toast } from "../../parts";

// ERP & CRM Systems: a sales pipeline (deal cards across Lead, Proposal, and Won), a customer's
// record (tags and an activity timeline), an invoice raised from the deal, a "Deal won" toast, and
// a team badge. Made-up names and no amounts.

const stages = [
  { title: "Lead", deals: 3, tone: "bg-primary/20" },
  { title: "Proposal", deals: 2, tone: "bg-coral" },
  { title: "Won", deals: 2, tone: "bg-[#2fbf71]" },
];
const activity = ["Call booked", "Proposal sent", "Invoice paid"];

export function ErpCrmScene() {
  return (
    <Canvas>
      {/* The pipeline. */}
      <Paper style={at(0, 30, 330, 260)} className="p-[2.2cqw] motion-safe:animate-drift">
        <div className="flex items-center justify-between">
          <span className="text-[2.1cqw] font-semibold">Sales pipeline</span>
          <span className="rounded-full bg-primary/[0.05] px-[1.4cqw] py-[0.5cqw] text-[1.4cqw] text-primary/55">All deals</span>
        </div>
        <div className="mt-[1.8cqw] grid grid-cols-3 gap-[1.2cqw]">
          {stages.map((stage, index) => (
            <div key={stage.title}>
              <span className="flex items-center gap-[0.8cqw] text-[1.5cqw] font-semibold text-primary/65">
                <span className={`size-[1.2cqw] rounded-full ${stage.tone}`} />
                {stage.title}
              </span>
              <div className="mt-[1cqw] space-y-[1cqw]">
                {Array.from({ length: stage.deals }, (_, deal) => (
                  <div
                    key={deal}
                    className={`rounded-[1.1cqw] border border-primary/10 p-[1.1cqw] ${
                      index === 2 && deal === 0 ? "bg-[#2fbf71]/[0.07] motion-safe:animate-[rise_0.8s_var(--ease-out-soft)_1s_both]" : "bg-white"
                    }`}
                  >
                    <span className="flex items-center gap-[0.8cqw]">
                      <span className="size-[2.4cqw] rounded-full bg-brand-gradient opacity-80" />
                      <Bar className="h-[0.9cqw] flex-1 bg-primary/40" />
                    </span>
                    <Bar className="mt-[0.8cqw] h-[0.8cqw] w-2/3 bg-primary/15" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Paper>

      {/* The customer. */}
      <Glass style={{ ...at(345, 150, 245, 230), ...delay(-2) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <div className="flex items-center gap-[1.4cqw]">
          <span className="grid size-[5cqw] place-items-center rounded-full bg-brand-gradient font-display text-[2cqw] font-semibold text-white">AK</span>
          <span>
            <span className="block text-[1.9cqw] font-semibold text-white">Acme Kitchens</span>
            <span className="block text-[1.4cqw] text-light/55">Customer since 2024</span>
          </span>
        </div>
        <div className="mt-[1.4cqw] flex gap-[0.8cqw]">
          {["Wholesale", "Priority"].map((tag) => (
            <span key={tag} className="rounded-full bg-white/[0.08] px-[1.2cqw] py-[0.4cqw] text-[1.3cqw] text-light/75">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-[1.8cqw] space-y-[1.2cqw] border-l border-white/15 pl-[1.8cqw]">
          {activity.map((item, index) => (
            <span
              key={item}
              className="relative block text-[1.5cqw] text-light/80 motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both]"
              style={delay(0.6 + index * 0.35)}
            >
              <span className="absolute top-1/2 -left-[2.4cqw] size-[1.2cqw] -translate-y-1/2 rounded-full bg-coral" />
              {item}
            </span>
          ))}
        </div>
      </Glass>

      {/* The invoice. */}
      <Paper style={{ ...at(60, 310, 210, 140), ...delay(-1.2) }} className="p-[1.8cqw] motion-safe:animate-drift">
        <div className="flex items-center justify-between">
          <span className="text-[1.7cqw] font-semibold">Invoice</span>
          <span className="rounded-full bg-[#2fbf71]/15 px-[1cqw] py-[0.3cqw] text-[1.2cqw] font-semibold text-[#1f9e5a]">Paid</span>
        </div>
        <div className="mt-[1.4cqw] space-y-[0.8cqw]">
          {[0, 1, 2].map((line) => (
            <span key={line} className="flex justify-between">
              <Bar className="w-[12cqw] bg-primary/20" />
              <Bar className="w-[5cqw] bg-primary/30" />
            </span>
          ))}
        </div>
      </Paper>

      <Toast label="Deal won" detail="Invoice created automatically" style={at(300, 405)} wait={-0.8}>
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM17 6h3v2a3 3 0 0 1-3 3M7 6H4v2a3 3 0 0 0 3 3" />
      </Toast>

      <IconBadge style={at(470, 40, 70)} wait={-2.6}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.5M17.5 14a5 5 0 0 1 3 5" />
      </IconBadge>
    </Canvas>
  );
}
