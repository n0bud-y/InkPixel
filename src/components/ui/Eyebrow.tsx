import type { ReactNode } from "react";

const tones = {
  /** See-through pill with a crimson dot, for dark sections (hero). */
  glass: {
    pill: "border border-white/10 bg-white/[0.05] px-3.5 py-2 tracking-[0.13em] text-light/85 shadow-[0_8px_24px_-12px_rgb(0_0_0_/_0.6)] backdrop-blur-sm 2xl:px-4 2xl:py-2.5 2xl:text-xs",
    dot: "bg-crimson shadow-[0_0_10px_2px_rgb(201_29_76_/_0.6)]",
  },
  /** Coral → crimson pill with white text, for light sections, e.g. "● 02 · Capabilities". */
  brand: {
    pill: "bg-brand-gradient-reverse px-4 py-2.5 tracking-[0.2em] text-white shadow-[0_10px_24px_-10px_rgb(250_97_67_/_0.7)] 2xl:px-5 2xl:py-3.5 2xl:text-sm",
    dot: "bg-white",
  },
};

// Small pill label above a section heading, e.g. "● Studio · Karachi + Worldwide".
export function Eyebrow({
  children,
  tone = "glass",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <p
      className={[
        "inline-flex items-center gap-2.5 rounded-full font-mono text-[10px] leading-none font-medium uppercase",
        tones[tone].pill,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${tones[tone].dot}`} />
      {children}
    </p>
  );
}
