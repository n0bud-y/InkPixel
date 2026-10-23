import aws from "@/assets/images/technologies/menu/aws.svg";
import vercel from "@/assets/images/technologies/menu/vercel.svg";
import { at, Bar, Browser, Canvas, delay, Glass, LogoTile, Toast } from "../../parts";

// SaaS Product Development: the product's dashboard (workspace, usage, active users rising),
// its pricing plans with "Pro" picked, a "New sign-up" toast, and AWS and Vercel tiles. No
// revenue figures.

const plans = [
  { name: "Starter", picked: false },
  { name: "Pro", picked: true },
  { name: "Team", picked: false },
];
const users = "M0 70 C30 66 50 58 80 56 S130 44 160 38 S210 22 240 16";

export function SaasScene() {
  return (
    <Canvas>
      <Browser url="app.your-product.com" style={at(0, 40, 380, 290)} className="motion-safe:animate-drift">
        <div className="flex">
          <div className="w-[10cqw] shrink-0 space-y-[1.4cqw] border-r border-primary/10 p-[1.6cqw]">
            <span className="block size-[3.4cqw] rounded-[1cqw] bg-brand-gradient" />
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className={`block h-[1.1cqw] rounded-full ${item === 0 ? "w-full bg-crimson/70" : "w-3/4 bg-primary/20"}`} />
            ))}
          </div>
          <div className="min-w-0 flex-1 p-[2cqw]">
            <Bar className="h-[1.8cqw] w-1/2 bg-primary/85" />
            <div className="mt-[1.8cqw] grid grid-cols-2 gap-[1.2cqw]">
              {["Active users", "Usage this month"].map((label, index) => (
                <div key={label} className="rounded-[1.2cqw] bg-primary/[0.04] p-[1.3cqw]">
                  <span className="block text-[1.3cqw] text-primary/55">{label}</span>
                  {index === 0 ? (
                    <svg viewBox="0 0 240 80" className="mt-[0.8cqw] h-[6cqw] w-full overflow-visible">
                      <path
                        d={users}
                        pathLength={1}
                        fill="none"
                        stroke="#c91d4c"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray="1"
                        className="motion-safe:animate-draw"
                        style={delay(0.5)}
                      />
                    </svg>
                  ) : (
                    <span className="mt-[1.6cqw] block">
                      <span className="block h-[1.4cqw] rounded-full bg-primary/10">
                        <span className="block h-full w-3/5 rounded-full bg-brand-gradient" />
                      </span>
                      <Bar className="mt-[1.2cqw] h-[0.9cqw] w-2/3 bg-primary/20" />
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-[1.6cqw] space-y-[1cqw]">
              {[0, 1, 2].map((row) => (
                <span key={row} className="flex items-center gap-[1.2cqw] rounded-[1cqw] border border-primary/10 p-[1cqw]">
                  <span className="size-[2.6cqw] rounded-full bg-primary/10" />
                  <Bar className="w-1/3 bg-primary/40" />
                  <span className="ml-auto rounded-full bg-[#2fbf71]/15 px-[1cqw] py-[0.2cqw] text-[1.2cqw] font-semibold text-[#1f9e5a]">Active</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Browser>

      {/* The pricing plans. */}
      <Glass style={{ ...at(320, 200, 270, 200), ...delay(-2) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[1.9cqw] font-semibold text-white">Choose a plan</span>
        <div className="mt-[1.6cqw] grid grid-cols-3 gap-[1cqw]">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[1.2cqw] p-[1.2cqw] text-center ${plan.picked ? "bg-brand-gradient text-white shadow-[0_1.5cqw_3cqw_-1cqw_rgb(201_29_76_/_0.8)]" : "bg-white/[0.06] text-light/75"}`}
            >
              <span className="block text-[1.5cqw] font-semibold">{plan.name}</span>
              <span className="mx-auto mt-[1cqw] block space-y-[0.6cqw]">
                <Bar className={`mx-auto h-[0.8cqw] w-4/5 ${plan.picked ? "bg-white/70" : "bg-white/20"}`} />
                <Bar className={`mx-auto h-[0.8cqw] w-3/5 ${plan.picked ? "bg-white/70" : "bg-white/20"}`} />
                <Bar className={`mx-auto h-[0.8cqw] w-2/3 ${plan.picked ? "bg-white/70" : "bg-white/20"}`} />
              </span>
              <span className={`mt-[1.4cqw] block rounded-full py-[0.6cqw] text-[1.2cqw] font-semibold ${plan.picked ? "bg-white text-crimson" : "bg-white/10"}`}>
                Select
              </span>
            </div>
          ))}
        </div>
      </Glass>

      <Toast label="New sign-up" detail="Pro plan · 14-day trial" style={at(20, 380)} wait={-1}>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20a6.5 6.5 0 0 1 13 0M19 8v6M16 11h6" />
      </Toast>

      <LogoTile logo={aws} label="AWS" style={at(440, 50)} wait={-0.6} />
      <LogoTile logo={vercel} label="Vercel" style={at(450, 125)} wait={-2.6} />
    </Canvas>
  );
}
