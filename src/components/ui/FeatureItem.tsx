import Image, { type StaticImageData } from "next/image";

type FeatureItemProps = {
  icon: StaticImageData;
  title: string;
  description: string;
  /** "white" shows the icon as is; "gradient" paints it in the brand gradient (CSS mask). */
  iconTone?: "white" | "gradient";
  /** md: services grid; lg: larger icon and bolder title (industry solutions). */
  size?: "md" | "lg";
  className?: string;
};

const sizes = {
  md: {
    icon: "size-[clamp(3.5rem,5vw,6rem)]",
    title: "mt-5 text-[clamp(1rem,1.02vw,1.25rem)] font-semibold",
    description: "mt-2 text-[13px] leading-normal",
  },
  lg: {
    icon: "size-16 lg:size-[clamp(3.5rem,4.7vw,5.75rem)]",
    title: "mt-5 text-[clamp(1rem,1.15vw,1.375rem)] font-bold font-display tracking-[-0.01em]",
    description: "mt-1.5 text-[13px] leading-[1.3] 2xl:text-sm",
  },
};

const lift =
  "motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:scale-105";

// Icon + title + short description, centred. Text colour comes from the parent.
// The icon is decorative (the title says what it shows) and lifts slightly on hover.
export function FeatureItem({
  icon,
  title,
  description,
  iconTone = "white",
  size = "md",
  className,
}: FeatureItemProps) {
  return (
    <div className={["group flex flex-col items-center text-center", className].filter(Boolean).join(" ")}>
      {iconTone === "gradient" ? (
        // The white icon's shape cuts out a gradient-filled box, so no extra icon files are needed.
        <span
          aria-hidden="true"
          className={`block bg-brand-gradient ${sizes[size].icon} ${lift}`}
          style={{
            maskImage: `url(${icon.src})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskImage: `url(${icon.src})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
          }}
        />
      ) : (
        <Image src={icon} alt="" width={96} height={96} className={`${sizes[size].icon} ${lift}`} />
      )}
      <h3 className={`leading-snug ${sizes[size].title}`}>{title}</h3>
      <p className={`max-w-[20rem] text-white/90 ${sizes[size].description}`}>
        {description}
      </p>
    </div>
  );
}
