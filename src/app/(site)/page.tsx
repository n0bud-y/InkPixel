import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { Hero } from "@/components/sections/home/Hero";
import { ServicesShowcase } from "@/components/sections/home/ServicesShowcase";
import { Stats } from "@/components/sections/home/Stats";
import { Testimonials } from "@/components/sections/home/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesShowcase />
      <FeaturedWork />
      <Testimonials />
    </>
  );
}
