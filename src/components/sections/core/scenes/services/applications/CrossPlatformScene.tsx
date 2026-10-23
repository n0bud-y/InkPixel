import flutter from "@/assets/images/technologies/menu/flutter.svg";
import react from "@/assets/images/technologies/menu/react.svg";
import { at, Bar, Canvas, delay, Glass, LogoTile, Phone } from "../../parts";

// Cross-Platform Apps: one codebase (a code card) splitting into the same app on an iPhone and
// an Android phone, with Flutter and React Native tiles.

const code: [string, string][][] = [
  [["class", "text-[#ff7aa2]"], [" HomeScreen", "text-coral"]],
  [["  build", "text-[#ffc48a]"], ["() {", "text-light/80"]],
  [["    return", "text-[#ff7aa2]"], [" Column(", "text-light/80"]],
  [["      ProductCard", "text-coral"], ["(),", "text-light/80"]],
  [["    );", "text-light/80"]],
  [["  }", "text-light/80"]],
];

// The app's screen, the same on both phones; `android` changes only the system details.
function AppScreen({ android = false }: { android?: boolean }) {
  return (
    <div className="relative size-full bg-[#fbf7f4] px-[1.8cqw] pt-[5cqw]">
      <span className="flex items-center justify-between">
        <Bar className="h-[1.8cqw] w-1/2 bg-primary/85" />
        <span className="size-[3.6cqw] rounded-full bg-brand-gradient-reverse" />
      </span>
      <div className="relative mt-[1.6cqw] overflow-hidden rounded-[1.8cqw] bg-brand-gradient p-[1.6cqw]">
        <span className="absolute -right-[3cqw] -bottom-[3cqw] size-[11cqw] rounded-full bg-white/15" />
        <Bar className="h-[1.6cqw] w-4/5 bg-white" />
        <Bar className="mt-[0.8cqw] h-[1.6cqw] w-1/2 bg-white" />
        <span className="mt-[1.4cqw] block h-[2.8cqw] w-[9cqw] rounded-full bg-white" />
      </div>
      <div className="mt-[1.4cqw] grid grid-cols-2 gap-[1cqw]">
        {[0, 1, 2, 3].map((card) => (
          <span key={card} className="rounded-[1.2cqw] bg-white p-[1cqw] shadow-[0_0.8cqw_1.6cqw_-0.8cqw_rgb(21_25_54_/_0.25)]">
            <span className="block aspect-square rounded-[0.8cqw] bg-linear-to-br from-[#ffd9cf] to-[#f7c3d2]" />
            <Bar className="mt-[0.8cqw] h-[0.8cqw] w-4/5 bg-primary/40" />
          </span>
        ))}
      </div>
      {android ? (
        <span className="absolute inset-x-0 bottom-[1.2cqw] flex justify-center gap-[5cqw] text-primary/40">
          <span className="size-[1.6cqw] rotate-45 border-b-[0.35cqw] border-l-[0.35cqw] border-current" />
          <span className="size-[1.8cqw] rounded-full border-[0.35cqw] border-current" />
          <span className="size-[1.6cqw] rounded-[0.3cqw] border-[0.35cqw] border-current" />
        </span>
      ) : (
        <span className="absolute bottom-[1.4cqw] left-1/2 h-[0.6cqw] w-[11cqw] -translate-x-1/2 rounded-full bg-primary/80" />
      )}
    </div>
  );
}

export function CrossPlatformScene() {
  return (
    <Canvas>
      {/* One codebase. */}
      <Glass style={at(170, 0, 260, 165)} className="overflow-hidden bg-[#121534]/90 motion-safe:animate-drift">
        <div className="flex items-center justify-between border-b border-white/10 px-[2cqw] py-[1.2cqw]">
          <span className="font-mono text-[1.5cqw] text-light/70">one codebase</span>
          <span className="rounded-full bg-brand-gradient px-[1.2cqw] py-[0.3cqw] text-[1.2cqw] font-semibold text-white">iOS + Android</span>
        </div>
        <div className="px-[2cqw] py-[1.4cqw] font-mono text-[1.6cqw] leading-[1.6]">
          {code.map((line, index) => (
            <div key={index} className="w-fit whitespace-pre motion-safe:animate-type" style={delay(0.3 + index * 0.25)}>
              {line.map(([text, color], part) => (
                <span key={part} className={color}>
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </Glass>

      {/* Splitting to both platforms. */}
      <svg viewBox="0 0 600 500" className="absolute inset-0 size-full overflow-visible">
        {["M300 165 C300 200 190 190 175 225", "M300 165 C300 200 410 190 425 225"].map((d, index) => (
          <g key={d}>
            <path d={d} fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="4 6" />
            <path
              d={d}
              pathLength={1}
              fill="none"
              stroke="#fa6143"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="0.15 0.85"
              className="motion-safe:animate-dash-travel"
              style={delay(-index * 1.3)}
            />
          </g>
        ))}
      </svg>

      <Phone style={{ ...at(85, 225, 165, 270), ...delay(-0.8) }} className="motion-safe:animate-drift">
        <AppScreen />
      </Phone>
      <Phone style={{ ...at(350, 225, 165, 270), ...delay(-2.4) }} className="motion-safe:animate-drift">
        <AppScreen android />
      </Phone>

      <LogoTile logo={flutter} label="Flutter" style={at(450, 40)} wait={-0.4} />
      <LogoTile logo={react} label="React Native" style={at(10, 60)} wait={-1.9} />
    </Canvas>
  );
}
