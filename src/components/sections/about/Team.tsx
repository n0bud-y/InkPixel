import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/content/about";
import { TeamCarousel } from "./TeamCarousel";

// "Meet The People Behind Ink Pixel Studios": the team's portrait cards (the pink backdrop is
// part of each photo) in an auto-sliding row with dots (TeamCarousel). Four cards per view on
// desktop; on phones and tablets one card and part of the next.
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
          <TeamCarousel names={team.members.map((member) => member.name)}>
            {team.members.map((member, index) => (
              <li
                key={member.name}
                // Only the first view cascades in; the rest start off screen.
                data-reveal={index < 4 ? "" : undefined}
                className="w-[min(70vw,20rem)] shrink-0 snap-start text-center lg:w-[calc((100%-3*var(--gap))/4)]"
              >
                <Image
                  src={member.photo}
                  alt={`${member.name}, ${member.role}`}
                  sizes="(min-width: 1024px) 21vw, 70vw"
                  className="h-auto w-full"
                />
                <p className="mt-[clamp(0.75rem,1vw,1.25rem)] font-display text-[clamp(1.0625rem,1.2vw,1.4375rem)] leading-tight font-semibold text-primary">
                  {member.name}
                </p>
                <p className="mt-1.5 text-[clamp(0.8125rem,0.8vw,0.9375rem)] text-primary/75">{member.role}</p>
              </li>
            ))}
          </TeamCarousel>
        </Reveal>
      </div>
    </section>
  );
}

