import { CountUp } from "@/components/motion/CountUp";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const stats = [
  { value: 93, suffix: "%", label: "Project satisfaction rate" },
  { value: 80, suffix: "%", label: "Web development excellence" },
  { value: 100, suffix: "+", label: "Digital projects shipped" },
  { value: 78, suffix: "%", label: "Mobile app development impact" },
];

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="bg-light text-primary">
      <div className="container-site grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 2xl:py-24">
        <Reveal>
          <h2
            id="stats-title"
            data-reveal
            className="font-display text-[clamp(2.25rem,4.1vw,5rem)] leading-[1.05] font-medium tracking-[-0.025em]"
          >
            Innovation
            <br />
            Delivered
          </h2>
          <div data-reveal className="mt-8 2xl:mt-10">
            <Magnetic>
              <Button href="/contact" icon>
                Become Our Next Success Story
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        {/* Label before value in the markup (required by <dl>); shown value-first. */}
        <Reveal stagger={0.12}>
          <dl className="grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-10 lg:grid-cols-[auto_auto] lg:justify-center lg:gap-x-12 lg:gap-y-12 xl:gap-x-20">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                data-reveal
                className="flex flex-col-reverse justify-end gap-3 border-l border-primary/25 pl-4 sm:pl-6"
              >
                <dt className="text-sm leading-snug text-primary/85 sm:text-[15px] 2xl:text-lg">
                  {stat.label}
                </dt>
                <dd className="font-display text-[clamp(3rem,5.2vw,6.5rem)] leading-none font-medium tracking-[-0.03em]">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    delay={index * 150}
                    className="bg-brand-gradient bg-clip-text text-transparent"
                  />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
