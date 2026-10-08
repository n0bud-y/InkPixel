import { ContactCta } from "@/components/sections/home/ContactCta";
import { Faq } from "@/components/sections/home/Faq";
import { FeaturedWork } from "@/components/sections/home/FeaturedWork";
import { Hero } from "@/components/sections/home/Hero";
import { Industries } from "@/components/sections/home/Industries";
import { Insights } from "@/components/sections/home/Insights";
import { Process } from "@/components/sections/home/Process";
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
      <Process />
      <Industries />
      <Faq />
      <Insights />
      <ContactCta />
    </>
  );
} 