import Image from "next/image";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServicePage } from "@/content/service-pages";

// "Custom … Services to …": centred title and text, then the kinds of work in columns (an icon in
// a white disc, title, text) divided by thin lines, then a button. Two columns on tablets, one on
// phones (no dividers there).
export function ServiceTypes({ page }: { page: ServicePage }) {
  const { types } = page;

  return (
    <section aria-labelledby="types-title" className="bg-primary">
      <div className="container-site py-[clamp(4rem,5.6vw,6.75rem)]">
        <Reveal>
          <SectionHeading
            id="types-title"
            align="center"
            descriptionTone="bright"
            title={withAccent(types.title)}
            description={types.text}
            className="max-w-[88rem] [&_p]:max-w-[56em] [&_p]:text-[clamp(0.9375rem,0.95vw,1.125rem)]"
          />
        </Reveal>

        <Reveal
          stagger={0.1}
          className="mt-[clamp(3rem,4vw,5rem)] grid grid-cols-[minmax(0,1fr)] gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {types.items.map((item, index) => (
            <div
              key={item.title}
              data-reveal
              className={`group flex flex-col items-center px-[clamp(0.5rem,1.6vw,2rem)] text-center text-white ${index > 0 ? "lg:border-l lg:border-white/40" : ""} ${index % 2 ? "sm:max-lg:border-l sm:max-lg:border-white/40" : ""}`}
            >
              <span className="grid size-[clamp(5rem,6.25vw,7.5rem)] place-items-center rounded-full bg-white shadow-[0_0_0_clamp(1rem,1.6vw,2rem)_rgb(255_255_255_/_0.025)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1.5">
                <Image src={item.icon} alt="" className="size-[48%]" />
              </span>
              <h3 className="mt-[clamp(1.75rem,3.4vw,4rem)] font-display text-[clamp(1.125rem,1.15vw,1.375rem)] leading-snug font-semibold">
                {item.title}
              </h3>
              <p className="mt-[clamp(1rem,1.4vw,1.75rem)] max-w-[18em] text-[clamp(0.9375rem,0.95vw,1.125rem)] leading-[1.45] text-white/90">
                {item.text}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-[clamp(3rem,3.3vw,4rem)] text-center">
          <Magnetic>
            <Button href={types.button.href} icon>
              {types.button.label}
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
