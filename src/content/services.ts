// Service categories and their services. Static content: edited here, not in Contentful.
// Used by the home page "Building The Future of Digital Products" section; reusable for
// the /services pages later. A category with no services shows a "coming soon" panel.
import type { StaticImageData } from "next/image";
import brandGuidelines from "@/assets/images/icons/branding/brand-guidelines-brand-book.png";
import brandIdentity from "@/assets/images/icons/branding/brand-identity-logo-design.png";
import brandLaunch from "@/assets/images/icons/branding/brand-launch-implementation.png";
import socialMediaBranding from "@/assets/images/icons/branding/social-media-branding.png";
import stationeryDesign from "@/assets/images/icons/branding/stationery-design.png";
import websiteBranding from "@/assets/images/icons/branding/website-digital-branding.png";

export type Service = {
  title: string;
  description: string;
  icon: StaticImageData;
};

export type ServiceCategory = {
  /** URL-safe id, also used for the tab. */
  slug: string;
  label: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "branding",
    label: "Branding",
    services: [
      {
        title: "Brand Identity / Logo Design",
        description:
          "Primary logo, secondary logo, icon/mark, logo variations, black & white versions.",
        icon: brandIdentity,
      },
      {
        title: "Brand Guidelines / Brand Book",
        description:
          "Logo usage, spacing, colors, typography, visual rules, do's & don'ts, brand consistency guide.",
        icon: brandGuidelines,
      },
      {
        title: "Stationery Design",
        description:
          "Business card, letterhead, envelope, email signature, invoice/quotation template.",
        icon: stationeryDesign,
      },
      {
        title: "Social Media Branding",
        description:
          "Profile/cover designs, social post templates, story templates, highlight covers, ad templates.",
        icon: socialMediaBranding,
      },
      {
        title: "Website & Digital Branding",
        description:
          "Website visual direction, UI style, buttons/icons, web banners, landing-page branding.",
        icon: websiteBranding,
      },
      {
        title: "Brand Launch & Implementation",
        description:
          "Final asset organization, launch creatives, brand rollout across website/social/print and consistency check.",
        icon: brandLaunch,
      },
    ],
  },
  // Content and icons for these categories are still to come.
  { slug: "development", label: "Development", services: [] },
  { slug: "marketing", label: "Marketing", services: [] },
  { slug: "software", label: "Software", services: [] },
  { slug: "applications", label: "Applications", services: [] },
  { slug: "ai-automation", label: "AI Automation", services: [] },
];
