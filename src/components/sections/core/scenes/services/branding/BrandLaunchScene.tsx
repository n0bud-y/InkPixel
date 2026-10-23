import { at, Canvas, delay, Glass, LineIcon, Toast } from "../../parts";

// Brand Launch & Implementation: the new mark at the centre, rolling out along lines to the
// website, social, print, email, signage, and packaging, a rollout checklist filling up, and a
// "We're live" toast.

// The channels around the mark, on the 600 × 500 canvas (centre of each pill), with icon paths.
const channels: { x: number; y: number; label: string; icon: string }[] = [
  { x: 120, y: 80, label: "Website", icon: "M3 5h18v14H3zM3 9h18" },
  { x: 300, y: 50, label: "Social", icon: "M18 8a3 3 0 1 0-3-3M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8.6 13.5l6.8 4M15.4 6.5l-6.8 4" },
  { x: 480, y: 80, label: "Print", icon: "M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z" },
  { x: 90, y: 260, label: "Email", icon: "M4 6h16v12H4zM4 7l8 6 8-6" },
  { x: 510, y: 260, label: "Signage", icon: "M12 3v18M5 6h12l2 2.5L17 11H5zM7 14h10" },
  { x: 300, y: 330, label: "Packaging", icon: "M21 8 12 3 3 8v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v8" },
];

const centre = { x: 300, y: 185 };

export function BrandLaunchScene() {
  return (
    <Canvas>
      {/* Lines from the mark to each channel, with the brand travelling along them. */}
      <svg viewBox="0 0 600 500" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="bl-line" x1="0" x2="1">
            <stop offset="0" stopColor="#c91d4c" />
            <stop offset="1" stopColor="#fa6143" />
          </linearGradient>
        </defs>
        {channels.map((channel, index) => {
          const d = `M${centre.x} ${centre.y} L${channel.x} ${channel.y}`;
          return (
            <g key={channel.label}>
              <path d={d} stroke="white" strokeOpacity="0.12" strokeWidth="2" strokeDasharray="4 6" />
              <path
                d={d}
                pathLength={1}
                fill="none"
                stroke="url(#bl-line)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0.14 0.86"
                className="motion-safe:animate-dash-travel"
                style={delay(-index * 0.45)}
              />
            </g>
          );
        })}
      </svg>

      {/* The mark. */}
      <div className="absolute" style={at(centre.x - 70, centre.y - 70, 140, 140)}>
        <div className="relative grid size-full place-items-center rounded-full bg-white shadow-[0_3cqw_8cqw_-2cqw_rgb(201_29_76_/_0.7)]">
          <span className="absolute inset-[-2.4cqw] rounded-full border border-coral/40 motion-safe:animate-ping [animation-duration:2.6s]" />
          <span className="size-[9cqw] rounded-[45%_45%_50%_50%] bg-brand-gradient" />
        </div>
      </div>

      {channels.map((channel, index) => (
        <div key={channel.label} className="absolute -translate-x-1/2 -translate-y-1/2" style={at(channel.x, channel.y)}>
          <div
            className="flex items-center gap-[1.1cqw] rounded-full bg-white py-[0.9cqw] pr-[1.8cqw] pl-[0.9cqw] shadow-[0_2.5cqw_5cqw_-1.5cqw_rgb(0_0_0_/_0.55)] motion-safe:animate-drift"
            style={delay(-index * 0.8)}
          >
            <span className="grid size-[3.2cqw] place-items-center rounded-full bg-brand-gradient text-white">
              <LineIcon className="size-[1.9cqw]">
                <path d={channel.icon} />
              </LineIcon>
            </span>
            <span className="text-[1.8cqw] font-semibold whitespace-nowrap text-primary">{channel.label}</span>
          </div>
        </div>
      ))}

      {/* The rollout checklist. */}
      <Glass style={{ ...at(340, 385, 250, 100), ...delay(-1.6) }} className="p-[2cqw] motion-safe:animate-drift">
        <div className="flex items-center justify-between text-[1.8cqw]">
          <span className="font-semibold text-white">Rollout</span>
          <span className="text-light/60">6 of 6 channels</span>
        </div>
        {/* The bar fills from left to right. */}
        <svg viewBox="0 0 100 4" preserveAspectRatio="none" className="mt-[1.4cqw] block h-[1.2cqw] w-full">
          <defs>
            <linearGradient id="bl-bar" gradientUnits="userSpaceOnUse" x1="0" x2="100">
              <stop offset="0" stopColor="#c91d4c" />
              <stop offset="1" stopColor="#fa6143" />
            </linearGradient>
          </defs>
          <line x1="2" y1="2" x2="98" y2="2" stroke="white" strokeOpacity="0.1" strokeWidth="4" strokeLinecap="round" />
          <line
            x1="2"
            y1="2"
            x2="98"
            y2="2"
            pathLength={1}
            stroke="url(#bl-bar)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="1"
            className="motion-safe:animate-draw"
            style={delay(0.6)}
          />
        </svg>
      </Glass>

      <Toast label="We’re live!" detail="New brand, everywhere" style={at(20, 400)} wait={-0.8}>
        <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.7-.8.7-2.1-.1-2.9a2.2 2.2 0 0 0-2.9-.1ZM12 15l-3-3a22 22 0 0 1 2-4A12.9 12.9 0 0 1 22 2c0 2.7-.8 7.5-6 11a22.4 22.4 0 0 1-4 2ZM9 12H4s.6-3 2-4c1.6-1.1 5 0 5 0M12 15v5s3-.6 4-2c1.1-1.6 0-5 0-5" />
      </Toast>
    </Canvas>
  );
}
