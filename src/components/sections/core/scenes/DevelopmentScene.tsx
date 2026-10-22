import nextjs from "@/assets/images/technologies/menu/nextjs.svg";
import nodejs from "@/assets/images/technologies/menu/nodejs.svg";
import react from "@/assets/images/technologies/menu/react.svg";
import { at, Bar, Canvas, delay, Glass, LineIcon, LogoTile, Paper, WindowDots } from "./parts";

// Development: a code editor typing out a page, a browser window showing the site it builds,
// and floating React, Next.js, and Node.js tiles.

// Code lines as coloured pieces: [text, colour class].
const code: [string, string][][] = [
  [["import", "text-[#ff7aa2]"], [" { Hero } ", "text-light/85"], ["from", "text-[#ff7aa2]"], [' "@/ui"', "text-[#ffc48a]"]],
  [],
  [["export default function", "text-[#ff7aa2]"], [" Page", "text-coral"], ["() {", "text-light/85"]],
  [["  return", "text-[#ff7aa2]"], [" (", "text-light/85"]],
  [["    <", "text-light/50"], ["Hero", "text-coral"], [" title", "text-[#ffc48a]"], ["=", "text-light/50"], ['"Launch day"', "text-[#9be3c2]"], [" />", "text-light/50"]],
  [["  );", "text-light/85"]],
  [["}", "text-light/85"]],
];

export function DevelopmentScene() {
  return (
    <Canvas>
      {/* The code editor. */}
      <Glass style={at(10, 30, 420, 300)} className="overflow-hidden bg-[#121534]/90 motion-safe:animate-drift">
        <div className="flex items-center gap-[2cqw] border-b border-white/10 px-[2.2cqw] py-[1.6cqw]">
          <WindowDots />
          <span className="rounded-[0.8cqw] bg-white/[0.07] px-[1.4cqw] py-[0.5cqw] font-mono text-[1.6cqw] text-light/70">app/page.tsx</span>
        </div>
        <div className="flex gap-[2.4cqw] px-[2.2cqw] py-[2cqw] font-mono text-[1.85cqw] leading-[1.75]">
          <div className="text-right text-light/25">
            {code.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
          <div className="min-w-0">
            {code.map((line, index) => (
              <div key={index} className="w-fit whitespace-pre motion-safe:animate-type" style={delay(0.5 + index * 0.35)}>
                {line.length === 0 ? " " : line.map(([text, color], part) => <span key={part} className={color}>{text}</span>)}
                {index === 4 && (
                  <span className="ml-[0.3cqw] inline-block h-[2.2cqw] w-[0.5cqw] translate-y-[0.4cqw] bg-coral motion-safe:animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Glass>

      {/* The site it builds. */}
      <Paper style={{ ...at(250, 200, 340, 260), ...delay(-2) }} className="overflow-hidden motion-safe:animate-drift">
        <div className="flex items-center gap-[1.6cqw] border-b border-primary/10 bg-primary/[0.03] px-[1.8cqw] py-[1.3cqw]">
          <WindowDots />
          <span className="flex-1 rounded-full bg-primary/[0.06] px-[1.6cqw] py-[0.4cqw] text-[1.5cqw] text-primary/50">your-site.com</span>
        </div>
        <div className="p-[2.2cqw]">
          <div className="flex items-center justify-between">
            <span className="h-[2.4cqw] w-[9cqw] rounded-full bg-brand-gradient" />
            <span className="flex gap-[1.4cqw]">
              <Bar className="w-[5cqw] bg-primary/15" />
              <Bar className="w-[5cqw] bg-primary/15" />
              <Bar className="w-[5cqw] bg-primary/15" />
            </span>
          </div>
          <div className="mt-[2.6cqw] grid grid-cols-[1.2fr_1fr] items-center gap-[2.4cqw]">
            <div className="space-y-[1.3cqw]">
              <Bar className="h-[2.4cqw] w-full bg-primary/80" />
              <Bar className="h-[2.4cqw] w-3/4 bg-primary/80" />
              <Bar className="w-full bg-primary/15" />
              <Bar className="w-5/6 bg-primary/15" />
              <span className="mt-[1.8cqw] block h-[3.6cqw] w-[13cqw] rounded-full bg-brand-gradient-reverse" />
            </div>
            <div className="aspect-[4/3] rounded-[1.6cqw] bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]">
              <div className="grid size-full place-items-center">
                <span className="size-[6cqw] rounded-full bg-white/70 shadow-[0_1cqw_2cqw_-0.5cqw_rgb(201_29_76_/_0.5)]" />
              </div>
            </div>
          </div>
          <div className="mt-[2.6cqw] grid grid-cols-3 gap-[1.6cqw]">
            {[0, 1, 2].map((card) => (
              <div key={card} className="rounded-[1.2cqw] bg-primary/[0.04] p-[1.4cqw]">
                <span className="block size-[3cqw] rounded-[0.8cqw] bg-brand-gradient opacity-80" />
                <Bar className="mt-[1.2cqw] w-full bg-primary/15" />
                <Bar className="mt-[0.8cqw] w-2/3 bg-primary/10" />
              </div>
            ))}
          </div>
        </div>
      </Paper>

      {/* "Build passed". */}
      <div className="absolute" style={at(40, 360, 190)}>
        <div className="flex items-center gap-[1.4cqw] rounded-full bg-white px-[1.8cqw] py-[1.3cqw] shadow-[0_2.5cqw_5cqw_-1.5cqw_rgb(0_0_0_/_0.55)] motion-safe:animate-drift" style={delay(-1.2)}>
          <span className="grid size-[3.4cqw] place-items-center rounded-full bg-brand-gradient text-white">
            <LineIcon className="size-[2.2cqw]">
              <path d="m5 12.5 4.5 4.5L19 7.5" />
            </LineIcon>
          </span>
          <span className="text-[2cqw] font-semibold whitespace-nowrap text-primary">Build passed</span>
        </div>
      </div>

      <LogoTile logo={react} label="React" style={at(452, 40)} wait={-0.6} />
      <LogoTile logo={nextjs} label="Next.js" style={at(460, 120)} wait={-2.2} />
      <LogoTile logo={nodejs} label="Node.js" style={at(60, 430)} wait={-3.4} />
    </Canvas>
  );
}
