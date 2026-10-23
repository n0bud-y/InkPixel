import { at, Bar, Canvas, delay, Glass, LineIcon, Paper, Toast } from "../../parts";

// Content Marketing: an article (cover, headline, reading time, paragraphs, a pull quote), the
// content plan with each piece's status, a video with its play button, and an "Article
// published" toast.

const plan = [
  { title: "How to choose a CMS", status: "Published", tone: "bg-[#2fbf71]/15 text-[#5be09a]" },
  { title: "10 branding mistakes", status: "In review", tone: "bg-coral/15 text-coral" },
  { title: "Case study video", status: "Editing", tone: "bg-white/10 text-light/70" },
  { title: "Newsletter #12", status: "Draft", tone: "bg-white/10 text-light/70" },
];

export function ContentMarketingScene() {
  return (
    <Canvas>
      {/* The article. */}
      <Paper style={at(0, 30, 330, 360)} className="overflow-hidden motion-safe:animate-drift">
        <div className="relative h-[16cqw] overflow-hidden bg-linear-to-br from-[#2a2f63] to-primary">
          <span className="absolute -top-[4cqw] right-[10%] size-[16cqw] rounded-full bg-coral/60 blur-[2.4cqw]" />
          <span className="absolute -bottom-[6cqw] left-[15%] size-[14cqw] rounded-full bg-crimson/60 blur-[2.4cqw]" />
        </div>
        <div className="p-[2.4cqw]">
          <span className="font-mono text-[1.3cqw] tracking-[0.14em] text-crimson uppercase">Guide · 6 min read</span>
          <Bar className="mt-[1.2cqw] h-[2.4cqw] w-full bg-primary/85" />
          <Bar className="mt-[0.8cqw] h-[2.4cqw] w-3/4 bg-primary/85" />
          <div className="mt-[1.8cqw] space-y-[0.9cqw]">
            <Bar className="w-full bg-primary/20" />
            <Bar className="w-11/12 bg-primary/20" />
            <Bar className="w-full bg-primary/20" />
          </div>
          <div className="mt-[1.8cqw] border-l-[0.5cqw] border-coral pl-[1.6cqw]">
            <Bar className="h-[1.6cqw] w-full bg-primary/60" />
            <Bar className="mt-[0.8cqw] h-[1.6cqw] w-2/3 bg-primary/60" />
          </div>
        </div>
      </Paper>

      {/* The content plan. */}
      <Glass style={{ ...at(290, 50, 300, 230), ...delay(-2) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[2cqw] font-semibold text-white">Content plan</span>
        <div className="mt-[1.6cqw] space-y-[1.2cqw]">
          {plan.map((item, index) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-[1.4cqw] text-[1.6cqw] motion-safe:animate-[rise_0.6s_var(--ease-out-soft)_both]"
              style={delay(0.5 + index * 0.25)}
            >
              <span className="truncate text-light/80">{item.title}</span>
              <span className={`shrink-0 rounded-full px-[1.1cqw] py-[0.3cqw] text-[1.3cqw] font-semibold ${item.tone}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </Glass>

      {/* A video. */}
      <Paper style={{ ...at(360, 300, 220, 150), ...delay(-1.2) }} className="overflow-hidden motion-safe:animate-drift">
        <div className="relative grid h-full place-items-center bg-brand-gradient">
          <span className="absolute -right-[3cqw] -bottom-[4cqw] size-[14cqw] rounded-full bg-white/15" />
          <span className="grid size-[7cqw] place-items-center rounded-full bg-white text-crimson shadow-[0_1.5cqw_3cqw_-1cqw_rgb(0_0_0_/_0.5)]">
            <LineIcon className="size-[3.4cqw] translate-x-[0.3cqw] fill-crimson">
              <path d="M7 5v14l11-7L7 5Z" />
            </LineIcon>
          </span>
          <span className="absolute inset-x-[1.6cqw] bottom-[1.4cqw] h-[0.6cqw] rounded-full bg-white/30">
            <span className="block h-full w-2/5 rounded-full bg-white" />
          </span>
        </div>
      </Paper>

      <Toast label="Article published" detail="Shared to blog and social" style={at(30, 410)} wait={-0.8}>
        <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
      </Toast>
    </Canvas>
  );
}
