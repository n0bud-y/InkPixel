import Image from "next/image";
import background from "@/assets/images/white-shadow-bg.webp";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProject } from "@/content/home";

// "Ideas Engineered Into Impact": capabilities intro + the featured project.
export function FeaturedWork() {
  return (
    <section aria-labelledby="featured-work-title" className="relative isolate overflow-hidden bg-white">
      {/* White background with the light grid and the soft shadow at the top. */}
      <Image
        src={background}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-top"
      />

      <div className="container-site grid grid-cols-[minmax(0,1fr)] items-center gap-10 py-[clamp(4rem,5.85vw,7rem)] lg:grid-cols-2 lg:gap-[clamp(2rem,2.3vw,3rem)]">
        <Reveal>
          <SectionHeading
            id="featured-work-title"
            eyebrow="02 · Capabilities"
            eyebrowTone="brand"
            size="lg"
            tone="onLight"
            title={
              <>
                Ideas Engineered
                <br /> Into Impact
              </>
            }
            description="From startups finding product-market fit to enterprises modernizing at scale, we engineer digital products that perform in the market."
          />
          <div data-reveal className="mt-5 2xl:mt-4">
            <Magnetic>
              <Button href="/case-studies" variant="primary-reverse" icon>
                View All Projects
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal y={70} delay={0.1}>
          <ProjectCard
            {...featuredProject}
            sizes="(min-width: 1024px) 42vw, 100vw"
          />
        </Reveal>
      </div>
    </section>
  );
}
