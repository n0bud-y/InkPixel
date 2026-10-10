import Image from "next/image";
import { CountUp } from "@/components/motion/CountUp";
import { HorizontalPin } from "@/components/motion/HorizontalPin";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whoWeAre } from "@/content/about";

// White card with a 1px brand-gradient border; the first card is filled with the gradient.
const outlinedCard = { background: "linear-gradient(#fff, #fff) padding-box, var(--gradient-reverse) border-box" };

// "Who Are We": the intro on the left, four counting stats on the right, then the value cards
// in a row that runs off the screen's right edge. Desktop (motion allowed): the section locks
// while the cards slide in from the right (HorizontalPin), then the page scrolls on.
// Phones, tablets, and reduced motion: the cards are a sideways-scrolling row.
export function WhoWeAre() {
  return (
    <HorizontalPin aria-labelledby="who-title" className="relative isolate overflow-hidden bg-primary">
      {/* Less padding while locked, so the section fits on laptop screens below the header. */}
      <div className="container-site py-[clamp(4rem,6.25vw,7.5rem)] group-data-[pinned=true]/hpin:py-[clamp(3rem,4vw,5rem)]">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-[clamp(2rem,6vw,8rem)]">
          <Reveal>
            <SectionHeading
              id="who-title"
              title={withAccent(whoWeAre.title)}
              description={whoWeAre.text}
              descriptionTone="bright"
            />
          </Reveal>

          {/* Label before value in the markup (required by <dl>); shown value-first. */}
          <Reveal stagger={0.1}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10">
              {whoWeAre.stats.map((stat, index) => (
                <div key={stat.label} data-reveal className="flex items-center gap-[clamp(0.75rem,1.1vw,1.25rem)]">
                  <Image src={stat.icon} alt="" className="h-auto w-[clamp(2.75rem,3.6vw,4.25rem)] shrink-0" />
                  <div className="flex flex-col-reverse">
                    <dt className="mt-1 text-[clamp(0.875rem,1vw,1.1875rem)] text-light/90">{stat.label}</dt>
                    <dd className="font-display text-[clamp(1.75rem,2.8vw,3.4rem)] leading-none font-bold whitespace-nowrap text-white">
                      <CountUp value={stat.value} suffix={stat.suffix} delay={index * 150} />
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal y={40} stagger={0.12} className="mt-[clamp(3rem,4vw,5rem)]">
          {/* The track: a sideways-scrolling row, which overflows the page instead (and is moved
              by HorizontalPin) while the section is locked. */}
          <ul
            data-horizontal-track
            className="relative -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-[clamp(0.75rem,0.6vw,1rem)] overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:px-0 lg:pb-0 group-data-[pinned=true]/hpin:overflow-visible"
          >
            {whoWeAre.values.map((value, index) => {
              const filled = index === 0;
              return (
                <li
                  key={value.title}
                  data-reveal
                  className={`w-[min(82vw,26rem)] shrink-0 snap-start rounded-[1.25rem] border border-transparent px-[clamp(1.25rem,1.4vw,1.75rem)] py-[clamp(1.75rem,2.6vw,3.1rem)] lg:w-[33.2vw] ${filled ? "bg-brand-gradient-reverse" : ""}`}
                  style={filled ? undefined : outlinedCard}
                >
                  <span
                    className={`grid size-[clamp(3rem,3.4vw,4rem)] place-items-center rounded-xl shadow-[0_6px_16px_-6px_rgb(244_122_31_/_0.6)] ${filled ? "bg-white" : "border border-[#f47a1f] bg-[#f47a1f]/10"}`}
                  >
                    <Image src={value.icon} alt="" className="size-1/2" />
                  </span>
                  <h3
                    className={`mt-[clamp(1.25rem,1.9vw,2.25rem)] font-display text-[clamp(1.125rem,1.3vw,1.5625rem)] leading-tight font-bold ${filled ? "text-white" : "w-fit bg-brand-gradient bg-clip-text text-transparent"}`}
                  >
                    {value.title}
                  </h3>
                  <p
                    className={`mt-3 text-[clamp(0.9375rem,0.95vw,1.1875rem)] leading-[1.8] ${filled ? "text-white/95" : "text-[#444]"}`}
                  >
                    {value.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </HorizontalPin>
  );
}
