import docker from "@/assets/images/technologies/menu/docker.svg";
import python from "@/assets/images/technologies/menu/python.svg";
import { at, Bar, Canvas, delay, Glass, LogoTile, Paper, Toast } from "../../parts";

// Custom Software Development: a made-to-measure business app (a task board with cards moving
// to "Done"), the project's sprint path from discovery to launch, a "Sprint shipped" toast, and
// Python and Docker tiles.

const columns = [
  { title: "To do", cards: 3 },
  { title: "In progress", cards: 2 },
  { title: "Done", cards: 2 },
];
const sprints = ["Discovery", "Prototype", "Build", "Launch"];

export function CustomSoftwareScene() {
  return (
    <Canvas>
      {/* The app. */}
      <Paper style={at(0, 40, 400, 300)} className="flex overflow-hidden motion-safe:animate-drift">
        <div className="w-[11cqw] shrink-0 bg-primary px-[1.4cqw] py-[2cqw]">
          <span className="block h-[2cqw] w-[6cqw] rounded-full bg-brand-gradient" />
          <div className="mt-[2.4cqw] space-y-[1.4cqw]">
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className={`block h-[1.2cqw] rounded-full ${item === 0 ? "w-full bg-coral" : "w-4/5 bg-white/20"}`} />
            ))}
          </div>
        </div>
        <div className="min-w-0 flex-1 p-[2cqw]">
          <div className="flex items-center justify-between">
            <Bar className="h-[1.8cqw] w-[14cqw] bg-primary/85" />
            <span className="flex -space-x-[1cqw]">
              {["bg-crimson", "bg-coral", "bg-primary"].map((tone) => (
                <span key={tone} className={`size-[3cqw] rounded-full ring-[0.4cqw] ring-white ${tone}`} />
              ))}
            </span>
          </div>
          <div className="mt-[2cqw] grid grid-cols-3 gap-[1.2cqw]">
            {columns.map((column, index) => (
              <div key={column.title} className="rounded-[1.2cqw] bg-primary/[0.04] p-[1cqw]">
                <span className="block text-[1.4cqw] font-semibold text-primary/60">{column.title}</span>
                <div className="mt-[1cqw] space-y-[0.9cqw]">
                  {Array.from({ length: column.cards }, (_, card) => (
                    <div
                      key={card}
                      className={`rounded-[0.9cqw] bg-white p-[1cqw] shadow-[0_0.6cqw_1.4cqw_-0.6cqw_rgb(21_25_54_/_0.3)] ${
                        index === 2 && card === 0 ? "motion-safe:animate-[rise_0.8s_var(--ease-out-soft)_1.2s_both]" : ""
                      }`}
                    >
                      <span className={`block h-[0.8cqw] w-[4cqw] rounded-full ${index === 2 ? "bg-[#2fbf71]" : card === 0 ? "bg-coral" : "bg-primary/20"}`} />
                      <Bar className="mt-[0.8cqw] h-[0.9cqw] w-full bg-primary/25" />
                      <Bar className="mt-[0.5cqw] h-[0.9cqw] w-2/3 bg-primary/15" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Paper>

      {/* The sprint path. */}
      <Glass style={{ ...at(260, 300, 330, 120), ...delay(-2) }} className="p-[2.2cqw] motion-safe:animate-drift">
        <span className="text-[1.9cqw] font-semibold text-white">Project roadmap</span>
        <div className="mt-[1.8cqw] flex items-center">
          {sprints.map((sprint, index) => (
            <span key={sprint} className="flex flex-1 items-center last:flex-none">
              <span className="flex flex-col items-center gap-[0.8cqw]">
                <span
                  className={`grid size-[3.2cqw] place-items-center rounded-full text-[1.3cqw] font-semibold motion-safe:animate-[rise_0.5s_var(--ease-out-soft)_both] ${
                    index < 3 ? "bg-brand-gradient text-white" : "border border-white/30 text-light/60"
                  }`}
                  style={delay(0.5 + index * 0.3)}
                >
                  {index + 1}
                </span>
                <span className="text-[1.3cqw] whitespace-nowrap text-light/70">{sprint}</span>
              </span>
              {index < sprints.length - 1 && <span className={`mx-[0.6cqw] mb-[2.6cqw] h-[0.3cqw] flex-1 rounded-full ${index < 2 ? "bg-coral" : "bg-white/15"}`} />}
            </span>
          ))}
        </div>
      </Glass>

      <Toast label="Sprint shipped" detail="New features live" style={at(20, 380)} wait={-1}>
        <path d="M21 8 12 3 3 8v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v8" />
      </Toast>

      <LogoTile logo={python} label="Python" style={at(440, 50)} wait={-0.6} />
      <LogoTile logo={docker} label="Docker" style={at(450, 130)} wait={-2.6} />
    </Canvas>
  );
}
