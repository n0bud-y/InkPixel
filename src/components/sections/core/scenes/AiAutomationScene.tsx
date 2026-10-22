import type { ReactNode } from "react";
import { at, Canvas, delay, Glass, LineIcon } from "./parts";

// AI Automation: a chat with an AI assistant (a request, its reply, and it typing), beside a
// workflow (a trigger, the AI step, an action) joined by a line with dashes travelling down it.

const sparkle = <path d="M12 3c.4 4.2 2.8 6.6 7 7-4.2.4-6.6 2.8-7 7-.4-4.2-2.8-6.6-7-7 4.2-.4 6.6-2.8 7-7ZM19 15.5c.2 1.6 1 2.4 2.5 2.5-1.5.1-2.3.9-2.5 2.5-.2-1.6-1-2.4-2.5-2.5 1.5-.1 2.3-.9 2.5-2.5Z" />;

const steps: { label: string; text: string; icon: ReactNode; ai?: boolean }[] = [
  { label: "Trigger", text: "New email", icon: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6L13 3Z" /> },
  { label: "AI step", text: "Sort & draft a reply", icon: sparkle, ai: true },
  { label: "Action", text: "Update the CRM", icon: <path d="m5 12.5 4.5 4.5L19 7.5" /> },
];

export function AiAutomationScene() {
  return (
    <Canvas>
      {/* The chat. */}
      <Glass style={at(0, 30, 360, 400)} className="flex flex-col overflow-hidden motion-safe:animate-drift">
        <div className="flex items-center gap-[1.6cqw] border-b border-white/10 px-[2.4cqw] py-[1.8cqw]">
          <span className="grid size-[5cqw] place-items-center rounded-full bg-brand-gradient text-white">
            <LineIcon className="size-[2.8cqw]">{sparkle}</LineIcon>
          </span>
          <span>
            <span className="block text-[2.1cqw] font-semibold text-white">Assistant</span>
            <span className="mt-[0.3cqw] flex items-center gap-[0.7cqw] text-[1.5cqw] text-light/60">
              <span className="size-[1cqw] rounded-full bg-[#5ee0a8]" />
              Online
            </span>
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-[1.8cqw] px-[2.4cqw] py-[2.4cqw] text-[1.85cqw] leading-snug">
          <p
            className="max-w-[80%] self-end rounded-[2cqw] rounded-br-[0.6cqw] bg-white/[0.1] px-[2cqw] py-[1.4cqw] text-light/90 motion-safe:animate-rise"
            style={delay(0.4)}
          >
            Summarise today&apos;s new leads and draft the replies.
          </p>
          <p
            className="max-w-[85%] rounded-[2cqw] rounded-bl-[0.6cqw] bg-white px-[2cqw] py-[1.4cqw] text-primary motion-safe:animate-rise"
            style={delay(1.1)}
          >
            Done. The leads are sorted by priority, and a reply is drafted for each one.
          </p>
          <p
            className="w-fit max-w-[85%] rounded-[2cqw] rounded-bl-[0.6cqw] bg-white px-[2cqw] py-[1.4cqw] text-primary motion-safe:animate-rise"
            style={delay(1.8)}
          >
            Want me to send them for your review?
          </p>
          <span
            className="flex w-fit gap-[0.8cqw] rounded-[2cqw] bg-white/[0.1] px-[2cqw] py-[1.6cqw] motion-safe:animate-rise"
            style={delay(2.4)}
          >
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="size-[1.2cqw] rounded-full bg-light/70 motion-safe:animate-pulse" style={delay(dot * 0.25)} />
            ))}
          </span>
        </div>

        <div className="m-[2cqw] mt-0 flex items-center gap-[1.4cqw] rounded-full bg-white/[0.07] py-[1cqw] pr-[1cqw] pl-[2cqw]">
          <span className="flex-1 text-[1.7cqw] text-light/40">Ask anything…</span>
          <span className="grid size-[4.4cqw] place-items-center rounded-full bg-brand-gradient text-white">
            <LineIcon className="size-[2.4cqw]">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </LineIcon>
          </span>
        </div>
      </Glass>

      {/* The workflow: a line down the middle, the steps on it. */}
      <svg viewBox="0 0 600 500" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <linearGradient id="ai-line" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#fa6143" />
            <stop offset="1" stopColor="#c91d4c" />
          </linearGradient>
        </defs>
        <path d="M494 90 V410" stroke="white" strokeOpacity="0.15" strokeWidth="2" strokeDasharray="5 7" />
        <path
          d="M494 90 V410"
          pathLength={1}
          stroke="url(#ai-line)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="0.08 0.92"
          className="motion-safe:animate-dash-travel"
        />
      </svg>
      {steps.map((step, index) => (
        <div key={step.label} className="absolute" style={at(394, 50 + index * 160, 200, 84)}>
          <div
            className={`flex size-full items-center gap-[1.6cqw] rounded-[2.2cqw] px-[1.8cqw] shadow-[0_2.5cqw_5cqw_-1.5cqw_rgb(0_0_0_/_0.55)] motion-safe:animate-drift ${step.ai ? "bg-brand-gradient text-white" : "bg-white text-primary"}`}
            style={delay(-index * 1.3)}
          >
            <span
              className={`grid size-[5.2cqw] shrink-0 place-items-center rounded-[1.4cqw] ${step.ai ? "bg-white/20" : "bg-crimson/10 text-crimson"}`}
            >
              <LineIcon className="size-[3cqw]">{step.icon}</LineIcon>
            </span>
            <span className="min-w-0">
              <span className={`block font-mono text-[1.4cqw] tracking-[0.12em] uppercase ${step.ai ? "text-white/80" : "text-primary/50"}`}>
                {step.label}
              </span>
              <span className="mt-[0.3cqw] block text-[1.95cqw] leading-tight font-semibold">{step.text}</span>
            </span>
          </div>
        </div>
      ))}

      {/* Sparkles. */}
      {[
        { style: at(340, 0, 34), wait: 0 },
        { style: at(560, 470, 26), wait: -1.8 },
      ].map(({ style, wait }, index) => (
        <div key={index} className="absolute text-coral" style={style}>
          <div className="motion-safe:animate-drift" style={delay(wait)}>
            <LineIcon className="w-full fill-coral">{sparkle}</LineIcon>
          </div>
        </div>
      ))}
    </Canvas>
  );
}
