// The Branding page (/services/branding), from Service Branding.svg. Static content: edited here,
// not in Contentful. Images were exported from the design; the six services, their descriptions,
// and icons are the mega menu's (services.ts); "Industry-Specific Solutions" is the home page's
// section; its projects are the case studies with "branding" ticked in Contentful; the page's
// meta title and description can be set in its Contentful Page SEO entry.
//
// PLACEHOLDER (issue I11): the intro paragraph is the design's lorem ipsum, and the hero line and
// the "Branding Services" line are the design's own (the latter is about websites); replace them
// with the real copy.
import type { StaticImageData } from "next/image";
import gulbaanLogo from "@/assets/images/about/clients/gulbaan.webp";
import introMockups from "@/assets/images/services/branding/intro-brand-mockups.webp";
import introSketch from "@/assets/images/services/branding/intro-branding-sketch.webp";
import drumondLogo from "@/assets/images/services/branding/logo-drumond.webp";
import ihrLogo from "@/assets/images/services/branding/logo-ihr.webp";
import pakArmoringLogo from "@/assets/images/services/branding/logo-pak-armoring.webp";
import { serviceCategories } from "@/content/services";

type Picture = { image: StaticImageData; alt: string };

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London.";

export const brandingPage = {
  /** The page's name, e.g. in the browser tab and the breadcrumb. */
  name: "Branding",
  /** The search description when the Page SEO entry has none (stand-in, issue I9). */
  description:
    "Brand identity and logo design, brand guidelines, stationery, and social media and digital branding by Ink Pixel Studios, a design studio in Karachi.",
  /** Case studies with this service ticked in Contentful are the page's projects. */
  caseStudyService: "branding",

  hero: {
    title: "Where Creativity Meets World",
    text: "Envisioning a realm where the alchemy of thought transmutes into the gold of reality, where we sculpt dreams into digital monuments of inspiration.",
    button: { label: "Schedule a Free Call", href: "/contact" },
    // Clients' logos floating around the title (approved for use, see about.ts).
    logos: {
      pakArmoring: { image: pakArmoringLogo, alt: "Pak Armoring" },
      drumond: { image: drumondLogo, alt: "Drumond Auto Body" },
      ihr: { image: ihrLogo, alt: "InHouse Recruitment (IHR)" },
      gulbaan: { image: gulbaanLogo, alt: "Gulbaan" },
    },
  },

  intro: {
    /** Lines of the title; accented words are in *stars*. */
    title: ["Digital Thinkers.", "Small Studios *Build*", "*Awesome Design.*"],
    text: lorem,
    images: [
      { image: introSketch, alt: "A notebook page sketching a brand: logo, design, value, strategy, and trust" },
      { image: introMockups, alt: "A brand identity applied to a mug, stationery, a van, a shirt, a jacket, and a cap" },
    ] satisfies Picture[],
  },

  // The design repeated "Social Media Branding" on every card; these are the six services.
  services: {
    title: "Branding Services",
    text: "Build high-performance websites and digital platforms tailored for your business growth.",
    items: serviceCategories.find((category) => category.slug === "branding")?.services ?? [],
  },

  // The design's title said "Web Development Projects".
  projects: {
    title: "Our Branding Projects, Ground-Up Launches to Makeovers",
    button: { label: "View Portfolio", href: "/case-studies" },
  },
};

export type BrandingPage = typeof brandingPage;
