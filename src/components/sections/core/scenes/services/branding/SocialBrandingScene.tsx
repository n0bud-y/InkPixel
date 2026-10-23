import { at, Bar, Canvas, delay, Paper, Phone, Toast } from "../../parts";

// Social Media Branding: a profile on a phone (cover, logo avatar, highlight covers, and a grid
// of posts in one consistent template), a story template beside it, a post template, and a
// "Templates ready" toast.

// The grid's posts: alternating template styles, so the feed reads as one brand.
const posts = [
  "bg-brand-gradient",
  "bg-primary",
  "bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]",
  "bg-primary",
  "bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]",
  "bg-brand-gradient-reverse",
  "bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]",
  "bg-brand-gradient",
  "bg-primary",
];

function Avatar({ className = "" }: { className?: string }) {
  return (
    <span className={`grid place-items-center rounded-full bg-primary ring-[0.5cqw] ring-white ${className}`}>
      <span className="size-1/2 rounded-[45%_45%_50%_50%] bg-brand-gradient" />
    </span>
  );
}

export function SocialBrandingScene() {
  return (
    <Canvas>
      {/* The profile. */}
      <Phone style={at(170, 10, 200, 430)} className="motion-safe:animate-drift">
        <div className="size-full bg-white">
          <div className="relative h-[13cqw] bg-brand-gradient">
            <span className="absolute -right-[3cqw] -bottom-[6cqw] size-[16cqw] rounded-full bg-white/15" />
          </div>
          {/* relative: drawn over the cover, which is positioned. */}
          <div className="relative px-[2cqw]">
            <Avatar className="-mt-[4.5cqw] size-[9cqw]" />
            <Bar className="mt-[1.2cqw] h-[1.8cqw] w-1/2 bg-primary/85" />
            <Bar className="mt-[0.8cqw] h-[1cqw] w-4/5 bg-primary/25" />
            <div className="mt-[1.6cqw] flex gap-[1.4cqw]">
              {["bg-crimson", "bg-coral", "bg-primary", "bg-[#f7c3d2]"].map((ring) => (
                <span key={ring} className={`grid size-[5.4cqw] place-items-center rounded-full p-[0.4cqw] ${ring}`}>
                  <span className="size-full rounded-full border-[0.5cqw] border-white bg-primary/[0.06]" />
                </span>
              ))}
            </div>
          </div>
          <div className="mt-[1.8cqw] grid grid-cols-3 gap-[0.4cqw]">
            {posts.map((tint, index) => (
              <span
                key={index}
                className={`relative aspect-square ${tint} motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both]`}
                style={delay(0.4 + index * 0.12)}
              >
                <span className="absolute inset-x-[1cqw] bottom-[1cqw] space-y-[0.5cqw]">
                  <Bar className={`h-[0.8cqw] w-4/5 ${tint.includes("ffd9cf") ? "bg-primary/60" : "bg-white/80"}`} />
                  <Bar className={`h-[0.8cqw] w-1/2 ${tint.includes("ffd9cf") ? "bg-primary/30" : "bg-white/40"}`} />
                </span>
              </span>
            ))}
          </div>
        </div>
      </Phone>

      {/* A story template. */}
      <div className="absolute motion-safe:animate-drift" style={{ ...at(405, 70, 150, 270), ...delay(-1.8) }}>
        <div className="relative size-full overflow-hidden rounded-[2.4cqw] bg-primary p-[2cqw] shadow-[0_3cqw_7cqw_-2cqw_rgb(0_0_0_/_0.6)]">
          <span className="absolute -top-[6cqw] -left-[4cqw] size-[18cqw] rounded-full bg-crimson/60 blur-[3cqw]" />
          <span className="absolute -right-[6cqw] bottom-[6cqw] size-[16cqw] rounded-full bg-coral/50 blur-[3cqw]" />
          <span className="relative flex gap-[0.6cqw]">
            <span className="h-[0.5cqw] flex-1 rounded-full bg-white" />
            <span className="h-[0.5cqw] flex-1 rounded-full bg-white/35" />
            <span className="h-[0.5cqw] flex-1 rounded-full bg-white/35" />
          </span>
          <span className="relative mt-[1.6cqw] flex items-center gap-[1cqw]">
            <Avatar className="size-[4cqw] ring-[0.3cqw]" />
            <Bar className="h-[1cqw] w-[8cqw] bg-white/70" />
          </span>
          <span className="absolute inset-x-[2cqw] bottom-[3cqw] space-y-[1cqw]">
            <Bar className="h-[2.4cqw] w-full bg-white" />
            <Bar className="h-[2.4cqw] w-3/4 bg-white" />
            <span className="!mt-[2cqw] block h-[3.6cqw] w-full rounded-full bg-white" />
          </span>
        </div>
      </div>

      {/* A post template. */}
      <Paper style={{ ...at(0, 120, 175, 210), ...delay(-2.8) }} className="p-[1.6cqw] motion-safe:animate-drift">
        <div className="relative aspect-square overflow-hidden rounded-[1.4cqw] bg-brand-gradient p-[1.6cqw]">
          <span className="absolute -right-[4cqw] -bottom-[4cqw] size-[14cqw] rounded-full bg-white/15" />
          <span className="font-mono text-[1.3cqw] tracking-[0.12em] text-white/80 uppercase">Tip #04</span>
          <span className="absolute inset-x-[1.6cqw] bottom-[1.6cqw] space-y-[0.8cqw]">
            <Bar className="h-[1.8cqw] w-full bg-white" />
            <Bar className="h-[1.8cqw] w-2/3 bg-white" />
          </span>
        </div>
        <span className="mt-[1.2cqw] flex items-center gap-[0.8cqw]">
          <Avatar className="size-[3cqw] ring-[0.3cqw]" />
          <Bar className="h-[1cqw] w-[9cqw] bg-primary/40" />
        </span>
      </Paper>

      <Toast label="Templates ready" detail="Posts · Stories · Covers" style={at(330, 400)} wait={-1}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </Toast>
    </Canvas>
  );
}
