import type { ComponentType } from "react";
import { coreHero, type CorePage } from "@/content/core-pages";
import { SceneHero } from "./SceneHero";
import { AiAutomationScene } from "./scenes/AiAutomationScene";
import { ApplicationsScene } from "./scenes/ApplicationsScene";
import { DevelopmentScene } from "./scenes/DevelopmentScene";
import { MarketingScene } from "./scenes/MarketingScene";
import { SoftwareScene } from "./scenes/SoftwareScene";

// Each core service's illustration (drawn in code; see scenes/parts.tsx).
const scenes: Record<string, ComponentType> = {
  development: DevelopmentScene,
  marketing: MarketingScene,
  software: SoftwareScene,
  applications: ApplicationsScene,
  "ai-automation": AiAutomationScene,
};

// The hero of every core service page except Branding (which has its own, BrandingHero): the
// split hero (SceneHero) with the "<Core> Services" pill and the core service's illustration.
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
