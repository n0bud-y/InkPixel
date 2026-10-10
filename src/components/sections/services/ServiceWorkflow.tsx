import Image from "next/image";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServicePage } from "@/content/service-pages";

// Peach-to-pink card with a 1px coral → pink border (two backgrounds: the fill inside the
// padding box, the border gradient behind it).
const cardStyle = {
  background:
    "linear-gradient(to right, #fdf0ec, #fbe8ee) padding-box, linear-gradient(132deg, #fa6143, #ec9db3) border-box",
};

// "Our … Workflow": centred title and text, the numbered steps as cards with an icon (three
// columns on desktop, two on tablets, one on phones), then a button.
export function ServiceWorkflow({ page }: { page: ServicePage }) {
  const { workflow } = page;

  return (
    <section aria-labelledby="workflow-title" className="bg-[#f9f9f9]">
      <div className="container-site py-[clamp(4rem,4.2vw,5rem)]">
        <Reveal>
          <SectionHeading
            id="workflow-title"
            tone="onLight"
            align="center"
            descriptionTone="bright"
            title={withAccent(workflow.title)}
            description={workflow.text}
            className="max-w-[84rem] [&_h2]:mx-auto [&_h2]:max-w-[16em] [&_p]:max-w-[64em] [&_p]:text-[clamp(0.9375rem,1vw,1.1875rem)]"
          />
        </Reveal>

        <Reveal y={40} stagger={0.08} className="mx-auto mt-[clamp(2rem,1.9vw,2.25rem)] max-w-[98.5rem]">
          <ol className="grid grid-cols-[minmax(0,1fr)] gap-[clamp(1rem,1.3vw,1.6rem)] sm:grid-cols-2 lg:grid-cols-3">
            {workflow.steps.map((step, index) => (
              <li
                key={step.title}
                data-reveal
                style={cardStyle}
                className="group relative rounded-[1.25rem] border border-transparent px-[clamp(1.25rem,1.8vw,2.2rem)] pt-[clamp(1.5rem,2.2vw,2.6rem)] pb-[clamp(1.5rem,1.7vw,2rem)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgb(201_29_76_/_0.5)]"
              >
                <Image
                  src={step.icon}
                  alt=""
                  className="absolute top-[clamp(1.25rem,1.8vw,2.1rem)] right-[clamp(1.25rem,1.8vw,2.1rem)] size-[clamp(2.25rem,2.5vw,3rem)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:-translate-y-1"
                />
                <p aria-hidden="true" className="text-[clamp(1.125rem,1.3vw,1.5625rem)] leading-none font-light text-[#314252]/45">
                  {String(index + 1).padStart(2, "0")}
                </p>
                {/* Right padding keeps long titles clear of the icon. */}
                <h3 className="mt-[clamp(0.75rem,1vw,1.25rem)] w-fit bg-brand-gradient-reverse bg-clip-text pr-[3em] font-display text-[clamp(1.375rem,1.6vw,1.9rem)] leading-tight font-semibold tracking-[-0.03em] text-transparent">
                  {step.title}
                </h3>
                <p className="mt-[clamp(0.75rem,1.2vw,1.5rem)] text-[clamp(0.875rem,0.85vw,1rem)] leading-[1.6] text-[#6b6a78]">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mt-[clamp(2.5rem,3vw,3.6rem)] text-center">
          <Magnetic>
            <Button href={workflow.button.href} variant="primary-reverse" size="sm">
              {workflow.button.label}
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
