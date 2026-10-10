import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { domains } from "@/content/service-pages";

// "Our Domain Diversity": the industries the studio works in, as icons with labels in a grid
// (five per row on desktop, three on tablets, two on phones).
export function DomainDiversity() {
  return (
    <section aria-labelledby="domains-title" className="bg-[#f9f9f9]">
      <div className="container-site py-[clamp(4rem,5vw,6rem)]">
        <Reveal>
          <SectionHeading id="domains-title" tone="onLight" align="center" title="Our Domain Diversity" />
        </Reveal>
        <Reveal stagger={0.04} className="mx-auto mt-[clamp(2.5rem,5.2vw,6.25rem)] max-w-[92rem]">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-[clamp(2.5rem,6.4vw,7.75rem)] sm:grid-cols-3 lg:grid-cols-5">
            {domains.map((domain) => (
              <li key={domain.label} data-reveal className="group flex flex-col items-center gap-[clamp(0.5rem,0.7vw,0.9rem)] text-center">
                <Image
                  src={domain.icon}
                  alt=""
                  className="size-[clamp(2.75rem,3.35vw,4rem)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1"
                />
                <span className="text-[clamp(0.9375rem,1.15vw,1.375rem)] text-[#314252]">{domain.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
