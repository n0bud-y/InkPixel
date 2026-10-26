import type { ComponentType } from "react";
import { coreHero, type CorePage } from "@/content/core-pages";
import { SceneHero } from "./SceneHero";
import { AiAutomationScene } from "./scenes/AiAutomationScene";
import { ApplicationsScene } from "./scenes/ApplicationsScene";
import { BrandingScene } from "./scenes/BrandingScene";
import { DevelopmentScene } from "./scenes/DevelopmentScene";
import { MarketingScene } from "./scenes/MarketingScene";
import { SoftwareScene } from "./scenes/SoftwareScene";

// Each core service's illustration (drawn in code; see scenes/parts.tsx).
const scenes: Record<string, ComponentType> = {
  branding: BrandingScene,
  development: DevelopmentScene,
  marketing: MarketingScene,
  software: SoftwareScene,
  applications: ApplicationsScene,
  "ai-automation": AiAutomationScene,
};

// The hero of every core service page (Branding too since 26 Oct 2026; it had the design's own,
// BrandingHero): the split hero (SceneHero) with the "<Core> Services" pill and the core
// service's illustration.
export function CoreHero({ slug, label, hero }: { slug: string; label: string; hero: CorePage["hero"] }) {
  const Scene = scenes[slug];

  return (
    <SceneHero
      eyebrow={coreHero.eyebrow(label)}
      title={hero.title}
      text={hero.text}
      button={hero.button}
      workHref={`/case-studies?service=${slug}`}
      scene={Scene && <Scene />}
    />
  );
}
