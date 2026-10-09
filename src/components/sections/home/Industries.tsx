import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries } from "@/content/industries";
import { IndustryTabs } from "./IndustryTabs";

// "Industry-Specific Solutions For Every Business Need": heading + intro, then the industry
// tabs (industry list on the left, its solutions on the right). Navy on the home page; cream
// (`tone="onLight"`) on the About page, where it sits between two navy sections.
export function Industries({ tone = "onDark" }: { tone?: "onDark" | "onLight" }) {
  const light = tone === "onLight";

  return (
    <section
      aria-labelledby="industries-title"
      className={`relative isolate overflow-hidden ${light ? "bg-[#fffdfa]" : "bg-primary"}`}
    >
      <div className="container-site pt-[clamp(4rem,5.5vw,6.6rem)] pb-[clamp(4rem,7vw,8.5rem)]">
        <Reveal className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,950fr)_minmax(0,657fr)] lg:gap-x-[1.3vw]">
          <div className="@container">
            <SectionHeading
              id="industries-title"
              size="fluid-wide"
              tone={tone}
              title={
                <>
                  Industry-Specific Solutions
                  <br className="max-sm:hidden" /> For Every Business Need
                </>
              }
            />
          </div>
          <p
            data-reveal
            className={`text-[clamp(0.9375rem,0.99vw,1.1875rem)] leading-[1.63] lg:pt-[1.2vw] ${light ? "text-primary" : "text-white"}`}
          >
            Behind every project is a multidisciplinary team of strategists, researchers, designers,
            developers, and problem solvers working toward the same goal. Instead of handing work
            from one disconnected vendor to another, we bring the disciplines together.
          </p>
        </Reveal>

        <Reveal y={60} start="top 80%" className="mt-[clamp(2.5rem,2.9vw,3.5rem)]">
          <IndustryTabs industries={industries} tone={tone} />
        </Reveal>
      </div>
    </section>
  );
}
