import Link from "next/link";
import type { ComponentProps } from "react";

const base =
  "group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-medium whitespace-nowrap transition duration-200 ease-out";

// Gradient buttons: a light sheen sweeps across on hover (the before element), skipped for
// reduced-motion visitors.
const gradientButton = [
  "relative isolate overflow-hidden text-white shadow-[0_12px_32px_-10px_rgb(201_29_76_/_0.75)] hover:-translate-y-px hover:shadow-[0_16px_40px_-10px_rgb(250_97_67_/_0.7)] hover:brightness-110",
  "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:-z-10 before:w-1/3 before:-translate-x-full before:skew-x-[-20deg] before:bg-linear-to-r before:from-transparent before:via-white/35 before:to-transparent",
  "motion-safe:before:transition-transform motion-safe:before:duration-700 motion-safe:before:ease-out motion-safe:hover:before:translate-x-[400%]",
].join(" ");

const variants = {
  primary: `bg-brand-gradient ${gradientButton}`,
  /** Coral → crimson, for light sections. */
  "primary-reverse": `bg-brand-gradient-reverse ${gradientButton}`,
  secondary:
    "border border-white/15 bg-white/[0.03] text-light hover:border-white/30 hover:bg-white/[0.07]",
};

const sizes = {
  sm: "h-10 px-5 text-[13px] 2xl:h-12 2xl:px-7 2xl:text-sm",
  md: "h-12 px-6 text-sm sm:h-[3.25rem] sm:px-7 sm:text-[15px] 2xl:h-16 2xl:px-8 2xl:text-base",
};

type ButtonProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** Shows the brand drop icon after the label. */
  icon?: boolean;
};

// Call-to-action link styled as a button. Every CTA in the design navigates, so it renders a Link.
export function Button({
  variant = "primary",
  size = "md",
  icon = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      className={[base, variants[variant], sizes[size], className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
      {icon && (
        <DropIcon className="h-[1.1em] w-auto transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}

// The brand drop from the logo (from src/assets/images/drop-icon.svg, without its hidden
// embedded bitmap). Takes the current text colour, or the brand gradient with `gradient`.
export function DropIcon({ className, gradient = false }: { className?: string; gradient?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 18"
      fill={gradient ? "url(#drop-icon-gradient)" : "currentColor"}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* Same definition in every instance, so a shared id is safe. */}
      {gradient && (
        <defs>
          <linearGradient id="drop-icon-gradient" x1="0" y1="0" x2="16" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#c91d4c" />
            <stop offset="1" stopColor="#fa6143" />
          </linearGradient>
        </defs>
      )}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.80096 0C7.63523 1.10846 9.66733 3.44118 11.2748 5.71259H11.7335V5.93642H12.0339V6.13106H11.4841V8.6808H14.1382V8.97275H13.6765V9.27541H12.7981V11.3366H13.9779V11.6782H14.3785V11.9565H12.4957V13.3871H13.6734V13.6723H13.1396C12.6429 14.9225 11.7753 16.0012 10.6468 16.7717C9.51832 17.5422 8.1798 17.9697 6.80096 18C5.76046 17.9759 4.73873 17.7257 3.81085 17.2675C2.88296 16.8094 2.0725 16.1551 1.43903 15.3527C0.805553 14.5502 0.365156 13.6201 0.150201 12.6306C-0.0647552 11.641 -0.0488075 10.6173 0.196872 9.63452C0.883921 6.88916 5.44188 1.81401 6.80696 0H6.80096ZM15.2418 5.68144H14.4937V6.40841H15.2418V5.68144ZM11.7455 6.37922V8.43069H13.8567V6.37922H11.7455ZM13.7836 13.2061V12.1356H12.6819V13.2061H13.7836ZM15.3961 11.7123H14.6479V12.4392H15.3961V11.7123ZM14.667 9.51968H13.0515V11.0943H14.667V9.51968ZM16 7.23854H14.7811V8.4229H16V7.23854ZM10.4335 6.08824V6.81228H11.1816V6.08824H10.4335ZM8.0769 7.8098H9.76849V6.16609H8.0769V7.8098ZM9.50208 11.5186V8.73529H6.63771V11.5186H9.50208ZM10.6038 10.7663H12.2793V9.13722H10.6128V10.7663H10.6038ZM11.1115 13.3842V12.0071H9.69938V13.3842H11.1115Z"
      />
    </svg>
  );
}
