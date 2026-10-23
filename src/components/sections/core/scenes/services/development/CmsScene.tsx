import contentful from "@/assets/images/technologies/menu/contentful.svg";
import wordpress from "@/assets/images/technologies/menu/wordpress.svg";
import { at, Bar, Canvas, delay, LineIcon, LogoTile, Paper, Phone, Toast } from "../../parts";

// CMS Development: a content editor (content types on the left; a title being typed, rich text,
// and an image field), the page live on a phone beside it, a "Published" toast, and WordPress
// and Contentful tiles.

const types = ["Pages", "Posts", "Media", "Forms"];

export function CmsScene() {
  return (
    <Canvas>
      <Paper style={at(0, 40, 410, 320)} className="flex overflow-hidden motion-safe:animate-drift">
        {/* Content types. */}
        <div className="w-[13cqw] shrink-0 bg-primary px-[1.4cqw] py-[2cqw]">
          <span className="block h-[2cqw] w-[8cqw] rounded-full bg-brand-gradient" />
          <div className="mt-[2.4cqw] space-y-[0.8cqw]">
            {types.map((type, index) => (
              <span
                key={type}
                className={`flex items-center gap-[1cqw] rounded-[1cqw] px-[1cqw] py-[0.9cqw] text-[1.5cqw] ${index === 0 ? "bg-white/10 text-white" : "text-light/55"}`}
              >
                <span className={`size-[1.6cqw] rounded-[0.5cqw] ${index === 0 ? "bg-coral" : "bg-white/20"}`} />
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* The entry. */}
        <div className="flex min-w-0 flex-1 flex-col p-[2.2cqw]">
          <span className="text-[1.4cqw] font-semibold tracking-[0.1em] text-primary/45 uppercase">Title</span>
          <span className="mt-[0.8cqw] flex h-[4.4cqw] items-center rounded-[1cqw] border border-primary/15 px-[1.4cqw] text-[1.9cqw] font-semibold">
            <span className="w-fit whitespace-pre motion-safe:animate-type" style={delay(0.6)}>
              Summer collection
            </span>
            <span className="ml-[0.3cqw] h-[2.4cqw] w-[0.4cqw] bg-coral motion-safe:animate-pulse" />
          </span>

          <span className="mt-[1.8cqw] text-[1.4cqw] font-semibold tracking-[0.1em] text-primary/45 uppercase">Body</span>
          <div className="mt-[0.8cqw] rounded-[1cqw] border border-primary/15">
            <div className="flex gap-[1.6cqw] border-b border-primary/10 px-[1.4cqw] py-[0.9cqw] text-[1.6cqw] text-primary/55">
              <span className="font-bold">B</span>
              <span className="italic">I</span>
              <span className="underline">U</span>
              <LineIcon className="size-[2cqw]">
                <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L12 6.3M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
              </LineIcon>
            </div>
            <div className="space-y-[0.9cqw] p-[1.4cqw]">
              <Bar className="w-full bg-primary/20" />
              <Bar className="w-11/12 bg-primary/20" />
              <Bar className="w-3/5 bg-primary/20" />
            </div>
          </div>

          <div className="mt-[1.8cqw] flex items-center gap-[1.4cqw]">
            <span className="h-[6cqw] w-[9cqw] rounded-[1cqw] bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]" />
            <span className="space-y-[0.8cqw]">
              <Bar className="w-[12cqw] bg-primary/30" />
              <Bar className="h-[0.9cqw] w-[8cqw] bg-primary/15" />
            </span>
          </div>

          <div className="mt-auto flex items-center justify-end gap-[1.6cqw] pt-[1.6cqw]">
            <span className="text-[1.5cqw] text-primary/45">Draft saved</span>
            <span className="rounded-full bg-brand-gradient-reverse px-[2.4cqw] py-[1cqw] text-[1.6cqw] font-semibold text-white">Publish</span>
          </div>
        </div>
      </Paper>

      {/* The page, live. */}
      <Phone style={{ ...at(440, 150, 145, 300), ...delay(-2.2) }} className="motion-safe:animate-drift">
        <div className="size-full bg-white px-[1.8cqw] pt-[4.4cqw]">
          <div className="aspect-[4/3] rounded-[1.6cqw] bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]" />
          <Bar className="mt-[1.8cqw] h-[1.8cqw] w-full bg-primary/85" />
          <Bar className="mt-[0.8cqw] h-[1.8cqw] w-2/3 bg-primary/85" />
          <div className="mt-[1.6cqw] space-y-[0.8cqw]">
            <Bar className="w-full bg-primary/20" />
            <Bar className="w-11/12 bg-primary/20" />
            <Bar className="w-3/5 bg-primary/20" />
          </div>
          <span className="mt-[2cqw] block h-[3.2cqw] w-[11cqw] rounded-full bg-brand-gradient-reverse" />
        </div>
      </Phone>

      <Toast label="Published" detail="Live on your site" style={at(40, 395)} wait={-1.4}>
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </Toast>

      <LogoTile logo={wordpress} label="WordPress" style={at(430, 30)} wait={-0.8} />
      <LogoTile logo={contentful} label="Contentful" style={at(265, 420)} wait={-3.2} />
    </Canvas>
  );
}
