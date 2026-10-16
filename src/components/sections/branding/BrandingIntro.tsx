import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import type { BrandingPage } from "@/content/branding-page";

// "Digital Thinkers. Small Studios Build Awesome Design.", on white: the title (its last words in
// the brand gradient) beside a paragraph, then two pictures side by side (stacked on phones).
export function BrandingIntro({ intro }: { intro: BrandingPage["intro"] }) {
  const [wide, narrow] = intro.images;

  return (
    <section aria-labelledby="branding-intro-title" className="bg-white">
      <div className="container-site py-[clamp(4rem,6.5vw,7.8rem)]">
        <Reveal stagger={0.1} className="grid grid-cols-[minmax(0,1fr)] items-center gap-6 lg:grid-cols-[minmax(0,940fr)_minmax(0,720fr)] lg:gap-[clamp(2rem,6vw,8rem)]">
          <h2
            id="branding-intro-title"
            data-reveal
            className="font-display text-[clamp(2.25rem,4.15vw,5rem)] leading-[1.12] font-medium tracking-[-0.025em] text-primary"
          >
            {intro.title.map((line, index) => (
              <span key={index} className="block">
                {withAccent(line)}
              </span>
            ))}
          </h2>
          <p data-reveal className="max-w-[40em] text-[clamp(1rem,1.15vw,1.375rem)] leading-[1.85] text-primary/80">
            {intro.text}
          </p>
        </Reveal>

        <Reveal
          y={50}
          stagger={0.12}
          className="mt-[clamp(2.5rem,3vw,3.5rem)] grid grid-cols-[minmax(0,1fr)] gap-[clamp(1rem,2.8vw,3.4rem)] sm:grid-cols-[minmax(0,1010fr)_minmax(0,592fr)]"
        >
          {[
            { picture: wide, aspect: "aspect-[1010/673]" },
            { picture: narrow, aspect: "aspect-[1010/673] sm:aspect-[592/673]" },
          ].map(({ picture, aspect }) => (
            <div data-reveal key={picture.alt} className={`relative overflow-hidden rounded-[clamp(1rem,2.2vw,2.65rem)] ${aspect}`}>
              <Image
                src={picture.image}
                alt={picture.alt}
                fill
                sizes="(min-width: 40rem) 55vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out motion-safe:hover:scale-[1.03]"
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
