import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/content/about";

// "Meet The People Behind Ink Pixel Studios": the team's portrait cards (the pink backdrop is
// part of each exported photo), four in a row on desktop. Phones and tablets: a
// sideways-scrolling row. The design's carousel dots are left out while everyone fits on screen.
export function Team() {
  return (
    <section aria-labelledby="team-title" className="bg-white">
      <div className="container-site py-[clamp(4rem,6.25vw,7.5rem)]">
        <Reveal className="text-center">
          <SectionHeading
            id="team-title"
            tone="onLight"
            align="center"
            title={withAccent(team.title)}
            description={team.intro}
            descriptionTone="bright"
            className="[&_h2]:text-balance"
          />
        </Reveal>

        <Reveal y={50} stagger={0.1} className="mt-[clamp(2.5rem,3vw,3.5rem)]">
          <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-[clamp(1rem,1.3vw,1.6rem)] lg:overflow-visible lg:px-0 lg:pb-0">
            {team.members.map((member) => (
              <li key={member.name} data-reveal className="w-[min(70vw,20rem)] shrink-0 snap-start text-center lg:w-auto">
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  sizes="(min-width: 1024px) 20vw, 70vw"
                  className="h-auto w-full"
                />
                <p className="mt-[clamp(0.75rem,1vw,1.25rem)] font-display text-[clamp(1.0625rem,1.2vw,1.4375rem)] leading-tight font-semibold text-primary">
                  {member.name}
                </p>
                <p className="mt-1.5 text-[clamp(0.8125rem,0.8vw,0.9375rem)] text-primary/75">{member.role}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
