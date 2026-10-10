import Image from "next/image";
import background from "@/assets/images/services/estimator-bg.webp";
import { Reveal } from "@/components/motion/Reveal";
import { withAccent } from "@/components/ui/accent";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ServicePage } from "@/content/service-pages";
import { EstimatorQuiz } from "./EstimatorQuiz";

// "Estimate Your … Cost in Seconds": the title over dark teal with faint rings, then a photo
// beside the step-by-step quiz (EstimatorQuiz). Phones and tablets: the quiz, then the photo.
export function CostEstimator({ page }: { page: ServicePage }) {
  const { estimator } = page;

  return (
    <section aria-labelledby="estimator-title" className="relative isolate overflow-hidden bg-[#0a293c]">
      <Image src={background} alt="" fill sizes="100vw" className="-z-10 object-cover" />
      <div className="container-site py-[clamp(4rem,4.2vw,5rem)]">
        <Reveal>
          <SectionHeading
            id="estimator-title"
            align="center"
            title={withAccent(estimator.title)}
            className="max-w-[66rem]"
          />
        </Reveal>

        <Reveal
          stagger={0.12}
          className="mt-[clamp(2rem,2.2vw,2.6rem)] grid grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,758fr)_minmax(0,808fr)] lg:gap-[clamp(2rem,3.9vw,4.6rem)]"
        >
          <div data-reveal className="max-lg:order-last">
            <Image
              src={estimator.image}
              alt=""
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[758/441] h-auto w-full rounded-sm object-cover"
            />
          </div>
          <div data-reveal>
            <EstimatorQuiz service={page.slug} questions={estimator.questions} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
