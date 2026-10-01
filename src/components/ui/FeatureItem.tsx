import Image, { type StaticImageData } from "next/image";

type FeatureItemProps = {
  icon: StaticImageData;
  title: string;
  description: string;
  className?: string;
};

// Icon + title + short description, centred. Text colour comes from the parent.
export function FeatureItem({ icon, title, description, className }: FeatureItemProps) {
  return (
    <div className={["group flex flex-col items-center text-center", className].filter(Boolean).join(" ")}>
      {/* Decorative: the title says what the icon shows. Lifts slightly on hover. */}
      <Image
        src={icon}
        alt=""
        width={96}
        height={96}
        className="size-[clamp(3.5rem,5vw,6rem)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:scale-105"
      />
      <h3 className="mt-5 text-[clamp(1rem,1.02vw,1.25rem)] leading-snug font-semibold">{title}</h3>
      <p className="mt-2 max-w-[20rem] text-[13px] leading-normal text-white/90">{description}</p>
    </div>
  );
}
