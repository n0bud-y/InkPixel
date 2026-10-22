import Image, { type StaticImageData } from "next/image";
import type { CSSProperties, ReactNode } from "react";

// Building blocks for the core service heroes' illustrations (CoreHero). Each scene is drawn on a
// 600 × 500 canvas that scales with its width: positions are percentages of the canvas (`at`),
// and sizes inside it use `cqw` (1cqw = 1% of the canvas width), so the whole picture scales as
// one. Every scene is decorative (aria-hidden on the canvas).

/** Where something sits on the 600 × 500 canvas: its left and top, and its width and height
 *  (each left out to size to the content). */
export const at = (x: number, y: number, width?: number, height?: number): CSSProperties => ({
  left: `${(x / 600) * 100}%`,
  top: `${(y / 500) * 100}%`,
  ...(width === undefined ? {} : { width: `${(width / 600) * 100}%` }),
  ...(height === undefined ? {} : { height: `${(height / 500) * 100}%` }),
});

/** A delay for a looping or entrance animation, so elements move out of step. */
export const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

// The canvas: 6:5, a size container for the cqw units.
export function Canvas({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className="@container relative mx-auto aspect-[6/5] w-full max-w-[44rem] select-none lg:max-w-[52rem]">
      {children}
    </div>
  );
}

// A dark glass card (on navy).
export function Glass({ className = "", style, children }: { className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div
      style={style}
      className={`absolute rounded-[2.4cqw] border border-white/10 bg-[#1d2147]/80 shadow-[0_3cqw_6cqw_-2cqw_rgb(0_0_0_/_0.55)] backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

// A white card.
export function Paper({ className = "", style, children }: { className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div
      style={style}
      className={`absolute rounded-[2.4cqw] bg-white text-primary shadow-[0_3cqw_7cqw_-2cqw_rgb(0_0_0_/_0.6)] ${className}`}
    >
      {children}
    </div>
  );
}

// The three dots of a window's title bar.
export function WindowDots() {
  return (
    <span className="flex gap-[0.9cqw]">
      <span className="size-[1.4cqw] rounded-full bg-crimson" />
      <span className="size-[1.4cqw] rounded-full bg-coral" />
      <span className="size-[1.4cqw] rounded-full bg-white/30" />
    </span>
  );
}

// A grey placeholder bar (text in a wireframe).
export function Bar({ className = "" }: { className?: string }) {
  return <span className={`block h-[1.2cqw] rounded-full ${className}`} />;
}

// A line icon (24 × 24, stroked in the current colour).
export function LineIcon({ className = "", children }: { className?: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {children}
    </svg>
  );
}

// A floating white tile with a technology's logo and an optional label.
export function LogoTile({
  logo,
  label,
  style,
  wait = 0,
}: {
  logo: StaticImageData;
  label?: string;
  style: CSSProperties;
  wait?: number;
}) {
  return (
    <div className="absolute" style={style}>
      <div
        className="flex items-center gap-[1.2cqw] rounded-[1.8cqw] bg-white p-[1.4cqw] pr-[2cqw] shadow-[0_2.5cqw_5cqw_-1.5cqw_rgb(0_0_0_/_0.55)] motion-safe:animate-drift"
        style={delay(wait)}
      >
        <Image src={logo} alt="" className="size-[4.4cqw] shrink-0 object-contain" />
        {label && <span className="text-[2.1cqw] font-semibold whitespace-nowrap text-primary">{label}</span>}
      </div>
    </div>
  );
}

// A floating round badge with a line icon in the brand gradient.
export function IconBadge({ style, wait = 0, children }: { style: CSSProperties; wait?: number; children: ReactNode }) {
  return (
    <div className="absolute" style={style}>
      <div
        className="grid aspect-square w-full place-items-center rounded-full bg-brand-gradient text-white shadow-[0_2.5cqw_5cqw_-1.5cqw_rgb(201_29_76_/_0.8)] motion-safe:animate-drift"
        style={delay(wait)}
      >
        <LineIcon className="size-1/2">{children}</LineIcon>
      </div>
    </div>
  );
}
