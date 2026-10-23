import Image from "next/image";
import background from "@/assets/images/white-shadow-bg.webp";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { StackPin } from "@/components/motion/StackPin";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCaseStudies, type CaseStudySummary } from "@/contentful/queries/case-studies";

// "Ideas Engineered Into Impact": capabilities intro + every published case study from
// Contentful, newest first. Desktop (motion allowed): the section locks while the cards arrive
// one over another (StackPin), with a counter and a progress bar on the left; phones, tablets,
// and reduced motion: a sideways-scrolling row. If Contentful is down, only the intro shows.
export async function FeaturedWork() {
  let caseStudies: CaseStudySummary[] = [];
  try {
    caseStudies = await getCaseStudies();
  } catch (error) {
    console.error("Home page: could not load the case studies.", error);
  }
  const projects = caseStudies.map(({ title, excerpt, href, image }) => ({ name: title, summary: excerpt, href, image }));

  return (
    <StackPin
      aria-labelledby="featured-work-title"
      className="relative isolate overflow-hidden bg-white data-[pinned=true]:h-dvh"
    >
      {/* White background with the light grid and the soft shadow at the top. */}
      <Image
        src={background}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover object-top"
      />

      {/* While locked: fills the screen, content centred below the fixed header (h-24, 2xl:h-32). */}
      <div className="container-site grid grid-cols-[minmax(0,1fr)] items-center gap-10 py-[clamp(4rem,5.85vw,7rem)] lg:grid-cols-2 lg:gap-[clamp(2rem,2.3vw,3rem)] group-data-[pinned=true]/stack:h-full group-data-[pinned=true]/stack:pt-30 group-data-[pinned=true]/stack:pb-6 2xl:group-data-[pinned=true]/stack:pt-38">
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
          {/* Which card is on top, while the section is locked. */}
          <div
            data-reveal
            aria-hidden="true"
            className="mt-[clamp(2rem,3vw,3.5rem)] hidden items-center gap-5 font-mono text-[13px] tracking-[0.2em] text-primary/45 group-data-[pinned=true]/stack:flex 2xl:text-sm"
          >
            <span>
              <span data-stack-current className="text-primary">
                01
              </span>{" "}
              / {String(projects.length).padStart(2, "0")}
            </span>
            <span className="h-0.5 w-[clamp(7rem,9vw,11rem)] overflow-hidden rounded-full bg-primary/10">
              <span data-stack-bar className="block h-full w-full rounded-full bg-brand-gradient" />
            </span>
          </div>
        </Reveal>

        {projects.length > 0 && (
          <Reveal y={70} delay={0.1}>
            {/* A sideways-scrolling row; while locked, every card shares one grid cell. */}
            <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 group-data-[pinned=true]/stack:grid group-data-[pinned=true]/stack:overflow-visible group-data-[pinned=true]/stack:pb-0">
              {projects.map((project) => (
                <li
                  key={project.href}
                  data-stack-card
                  className="w-[min(85%,40rem)] shrink-0 snap-start only:w-full group-data-[pinned=true]/stack:col-start-1 group-data-[pinned=true]/stack:row-start-1 group-data-[pinned=true]/stack:w-full"
                >
                  <ProjectCard {...project} sizes="(min-width: 1024px) 42vw, 85vw" />
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </StackPin>
  );
}
