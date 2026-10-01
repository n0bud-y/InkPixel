import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  /** Id of the <h2>; the section points to it with aria-labelledby. */
  id: string;
  title: ReactNode;
  /** One paragraph, or several (a blank line between them). */
  description?: string | string[];
  eyebrow?: ReactNode;
  eyebrowTone?: "glass" | "brand";
  /** "bright" = full white/navy paragraphs; "muted" = slightly softened. */
  descriptionTone?: "muted" | "bright";
  align?: "left" | "center";
  /** "onDark" for navy sections, "onLight" for cream sections. */
  tone?: "onDark" | "onLight";
  /** md ≈ 70px and lg ≈ 84px at 1920, both scaling down with the viewport. "fluid" ≈ lg but
   *  also shrinks with its column (needs an @container ancestor), so a long first line never wraps. */
  size?: "md" | "lg" | "fluid";
  className?: string;
};

const titleSizes = {
  md: "text-[clamp(2.25rem,3.65vw,4.375rem)] leading-[1.08]",
  lg: "text-[clamp(2.5rem,4.25vw,5.125rem)] leading-[1.02]",
  // Bricolage draws relatively wider letters at small sizes (optical sizing), so the size is a
  // line fitted to keep a ~7em first line within 97% of the column at any width.
  fluid: "text-[clamp(2.25rem,min(calc(15.1cqw_-_6.2px),4.25vw),5.125rem)] leading-[1.02]",
};

const descriptionSizes = {
  md: "text-[clamp(0.9375rem,1.05vw,1.25rem)] leading-[1.9]",
  lg: "text-[clamp(1rem,1.17vw,1.4rem)] leading-[1.85]",
  fluid: "text-[clamp(1rem,1.17vw,1.4rem)] leading-[1.85]",
};

// Section title + optional eyebrow and description. Sizes follow the 1920px design frame.
// Children marked data-reveal cascade in when wrapped in <Reveal>.
export function SectionHeading({
  id,
  title,
  description,
  eyebrow,
  eyebrowTone = "glass",
  align = "left",
  tone = "onDark",
  size = "md",
  descriptionTone = "muted",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={[centered ? "mx-auto text-center" : "", className].filter(Boolean).join(" ")}>
      {eyebrow && (
        <div data-reveal className="mb-6">
          <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        id={id}
        data-reveal
        className={[
          "font-display font-medium tracking-[-0.025em]",
          titleSizes[size],
          tone === "onDark" ? "text-white" : "text-primary",
        ].join(" ")}
      >
        {title}
      </h2>
      {(Array.isArray(description) ? description : description ? [description] : []).map(
        (paragraph, index) => (
          <p
            key={index}
            data-reveal
            className={[
              index === 0 ? "mt-5" : "mt-[1lh]",
              "max-w-[44em]",
              descriptionSizes[size],
              centered ? "mx-auto" : "",
              tone === "onDark"
                ? descriptionTone === "bright" ? "text-white" : "text-light/80"
                : descriptionTone === "bright" ? "text-primary" : "text-primary/85",
            ].join(" ")}
          >
            {paragraph}
          </p>
        ),
      )}
    </div>
  );
}
