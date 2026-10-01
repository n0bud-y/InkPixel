import Image from "next/image";
import background from "@/assets/images/section-background-shape.webp";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/content/home";
import { TestimonialCarousel } from "./TestimonialCarousel";

// "What Our Clients Say About Us": the carousel lays out the whole section; the heading and
// the action are fixed, everything else (quote, photo/video, results) changes per slide.
export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="relative isolate overflow-hidden bg-primary">
      {/* Navy with a soft glow. Scaled up 2% to hide the thin light border in the source image. */}
      <Image src={background} alt="" fill sizes="100vw" className="-z-10 scale-[1.02] object-cover" />

      <div className="container-site pt-[clamp(4rem,5.9vw,7.1rem)] pb-[clamp(3rem,3.3vw,4rem)]">
        <Reveal>
          <TestimonialCarousel
            testimonials={testimonials}
            heading={
              <SectionHeading
                id="testimonials-title"
                size="fluid"
                title={
                  <>
                    What Our Clients
                    <br /> Say About Us
                  </>
                }
              />
            }
            action={
              <Magnetic>
                <Button href="/case-studies" variant="primary-reverse" icon>
                  View All Projects
                </Button>
              </Magnetic>
            }
          />
        </Reveal>
      </div>
    </section>
  );
}
