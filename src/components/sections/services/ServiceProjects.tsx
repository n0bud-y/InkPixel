import Image from "next/image";
import Link from "next/link";
import { HorizontalPin } from "@/components/motion/HorizontalPin";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServicePage } from "@/content/service-pages";
import { getServiceCaseStudies, type CaseStudyCard } from "@/contentful/queries/case-studies";

// "Our … Projects": the case studies with this service ticked in Contentful, as numbered cards
// in a row that runs off the screen's right edge. Desktop (motion allowed): the section locks
// while the cards slide in (HorizontalPin); phones, tablets, and reduced motion: a
// sideways-scrolling row. Hidden when there are no such case studies (or Contentful is down).
export async function ServiceProjects({ page }: { page: ServicePage }) {
  let projects: CaseStudyCard[] = [];
  try {
    projects = await getServiceCaseStudies(page.caseStudyService);
  } catch (error) {
    console.error(`Service page "${page.slug}": could not load its case studies.`, error);
  }
  if (projects.length === 0) return null;

  return (
    <HorizontalPin aria-labelledby="projects-title" className="relative isolate overflow-hidden bg-[#e7e7ea] bg-grid-light">
      <div className="container-site py-[clamp(4rem,4.2vw,5rem)] group-data-[pinned=true]/hpin:py-[clamp(3rem,3.5vw,4.5rem)]">
        <Reveal className="text-center">
          <SectionHeading
            id="projects-title"
            tone="onLight"
            align="center"
            title={withAccent(page.projects.title)}
            className="max-w-[82rem]"
          />
          <div data-reveal className="mt-5">
            <Link
              href={page.projects.button.href}
              className="inline-flex h-[clamp(2.5rem,2.6vw,3.1rem)] items-center rounded-full border-2 border-crimson/80 px-[clamp(1.25rem,1.6vw,1.9rem)] text-[clamp(0.875rem,0.95vw,1.125rem)] font-semibold text-crimson transition-colors duration-200 hover:border-crimson hover:bg-crimson hover:text-white"
            >
              {page.projects.button.label}
            </Link>
          </div>
        </Reveal>

        <Reveal y={40} stagger={0.12} className="mt-[clamp(1.5rem,1.3vw,1.75rem)]">
          <ul
            data-horizontal-track
            className="relative -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-[clamp(0.75rem,1.05vw,1.25rem)] overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0 lg:pb-0 group-data-[pinned=true]/hpin:overflow-visible"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} number={index + 1} />
            ))}
          </ul>
        </Reveal>
      </div>
    </HorizontalPin>
  );
}

function ProjectCard({ project, number }: { project: CaseStudyCard; number: number }) {
  const name = project.client?.name ?? project.title;
  const logo = project.client?.logo;

  return (
    <li
      data-reveal
      className="w-[min(86vw,40rem)] shrink-0 snap-start rounded-[1.25rem] border border-[#ef8b8b]/80 bg-linear-to-br from-[#fbe7e3] to-[#f6dfe6] p-[clamp(1.25rem,1.5vw,1.75rem)] lg:w-[62.9vw]"
    >
      <h3 className="flex w-fit gap-[clamp(1rem,1.6vw,2rem)] bg-brand-gradient-reverse bg-clip-text font-display text-[clamp(1.5rem,2.05vw,2.5rem)] leading-tight font-semibold text-transparent">
        <span aria-hidden="true">{number}.</span>
        {name}
      </h3>
      {project.highlight && (
        <p className="mt-[clamp(0.75rem,1vw,1.25rem)] w-fit max-w-full rounded-[0.6rem] bg-brand-gradient px-[clamp(0.75rem,0.9vw,1.1rem)] py-[clamp(0.5rem,0.65vw,0.8rem)] font-display text-[clamp(1rem,1.2vw,1.4rem)] leading-snug font-semibold text-white">
          {project.highlight}
        </p>
      )}

      <div className="mt-[clamp(1.25rem,1.6vw,2rem)] grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,660fr)_minmax(0,425fr)] lg:gap-[clamp(1.5rem,2.4vw,3rem)] lg:pl-[clamp(0.75rem,1.2vw,1.4rem)]">
        <div>
          <p className="text-[clamp(0.9375rem,0.9vw,1.0625rem)] leading-[2] text-primary/90">{project.excerpt}</p>
          {project.points.length > 0 && (
            <ul className="mt-[clamp(1rem,1.4vw,1.75rem)] space-y-2">
              {project.points.map((point) => (
                <li key={point} className="flex items-center gap-3 text-[clamp(0.9375rem,0.9vw,1.0625rem)] text-primary/90">
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="size-[1.05em] shrink-0 text-crimson">
                    <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M6.5 10.2l2.3 2.3 4.7-4.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-[clamp(1.5rem,2.1vw,2.5rem)]">
            <Button href={project.href} size="sm">
              View case study<span className="sr-only">: {name}</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          {logo && (
            <Image
              src={logo.url}
              width={logo.width}
              height={logo.height}
              alt={`${project.client?.name} logo`}
              unoptimized={logo.isSvg}
              sizes="10rem"
              className="h-[clamp(2.5rem,3.7vw,4.5rem)] w-auto max-w-[60%] object-contain"
            />
          )}
          <Image
            src={project.image.url}
            width={project.image.width}
            height={project.image.height}
            alt={project.image.alt}
            unoptimized={project.image.isSvg}
            sizes="(min-width: 1024px) 23vw, 86vw"
            className="h-auto max-h-[clamp(14rem,18vw,22rem)] w-full object-contain"
          />
        </div>
      </div>
    </li>
  );
}
