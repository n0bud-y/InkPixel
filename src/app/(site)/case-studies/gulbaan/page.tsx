import type { Metadata } from "next";
import { GulbaanChallengesSection } from "@/components/case-studies/GulbaanChallengesSection";
import { GulbaanHero } from "@/components/case-studies/GulbaanHero";
import { GulbaanIdeaSection } from "@/components/case-studies/GulbaanIdeaSection";
import { GulbaanInsightsSection } from "@/components/case-studies/GulbaanInsightsSection";
import { GulbaanOutcomesSection } from "@/components/case-studies/GulbaanOutcomesSection";
import { GulbaanPlatformFeaturesSection } from "@/components/case-studies/GulbaanPlatformFeaturesSection";
import { GulbaanResultsSection } from "@/components/case-studies/GulbaanResultsSection";
import { GulbaanTechStackSection } from "@/components/case-studies/GulbaanTechStackSection";
import { GulbaanWhatWeDidSection } from "@/components/case-studies/GulbaanWhatWeDidSection";
import { ContactCta } from "@/components/sections/home/ContactCta";

export const metadata: Metadata = {
  title: "Gulbaan Case Study",
  description:
    "A flower retail and delivery service offering fresh, premium flowers across Lahore and Islamabad.",
};

export default function GulbaanCaseStudyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Banner / Hero Section */}
      <GulbaanHero />

      {/* The Idea Behind Gulbaan Section */}
      <GulbaanIdeaSection />

      {/* Challenges & Solutions Section */}
      <GulbaanChallengesSection />

      {/* Platform Features Section */}
      <GulbaanPlatformFeaturesSection />

      {/* Insights from Client Section */}
      <GulbaanInsightsSection />

      {/* What Did We Do Section */}
      <GulbaanWhatWeDidSection />

      {/* The Outcomes Section */}
      <GulbaanOutcomesSection />

      {/* Tech Stack Used Section */}
      <GulbaanTechStackSection />

      {/* The Results Section */}
      <GulbaanResultsSection />

      {/* Closing Contact CTA */}
      <ContactCta />
    </main>
  );
}
