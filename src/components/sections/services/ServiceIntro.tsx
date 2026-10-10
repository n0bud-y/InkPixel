import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { ServicePage } from "@/content/service-pages";

// The image (devices showing a site) beside the service's opening title and text, on navy.
// Phones and tablets: text first, then the image.
export function ServiceIntro({ page }: { page: ServicePage }) {
  const { intro } = page;

  return (
    <section aria-labelledby="intro-title" className="bg-primary">
      <div className="container-site grid grid-cols-[minmax(0,1fr)] items-center gap-10 py-[clamp(4rem,4.2vw,5rem)] lg:grid-cols-[minmax(0,800fr)_minmax(0,740fr)] lg:gap-[clamp(2rem,4.8vw,6rem)]">
        <Reveal y={30} className="max-lg:order-last">
          <Image
            src={intro.image}
            alt=""
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="mx-auto h-auto w-full max-w-[47.5rem]"
          />
        </Reveal>
        <Reveal>
          <h2
            id="intro-title"
            data-reveal
            className="font-display text-[clamp(2rem,2.75vw,3.3rem)] leading-[1.15] font-bold tracking-[-0.03em] text-balance text-white"
          >
            {intro.title}
          </h2>
          {intro.text.map((paragraph, index) => (
            <p
              key={index}
              data-reveal
              className="mt-[clamp(1.25rem,1.7vw,2rem)] text-[clamp(0.9375rem,1vw,1.1875rem)] leading-[1.85] text-light/90"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
