import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { DrivesUs } from "@/components/sections/about/DrivesUs";
import { Team } from "@/components/sections/about/Team";
import { TrustedBy } from "@/components/sections/about/TrustedBy";
import { VisitUs } from "@/components/sections/about/VisitUs";
import { WhoWeAre } from "@/components/sections/about/WhoWeAre";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { Faq } from "@/components/sections/home/Faq";
import { Industries } from "@/components/sections/home/Industries";
import { Insights } from "@/components/sections/home/Insights";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ink Pixel Studios is a software and digital solutions company in Karachi, Pakistan: the people, the values, and the way we work.",
  alternates: { canonical: "/about" },
};

// About: static content in src/content/about.ts. Industries, Insights, and the FAQ are the
// home page's sections (Industries on cream here, between two navy sections).
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <TrustedBy />
      <WhoWeAre />
      <Team />
      <DrivesUs />
      <Industries tone="onLight" />
      <Insights eyebrow="08 · Insights" />
      <Faq eyebrow="09 · FAQ" />
      <VisitUs />
      <ContactCta />
    </>
  );
}
