// Core service pages (/services/<core>), one per category in src/content/services.ts. They share
// the Branding page's layout; Branding's own content is in src/content/branding-page.ts. Static
// content: edited here, not in Contentful. Each page's projects are the case studies with its
// core service ticked in Contentful; its meta title and description can be set in a Contentful
// Page SEO entry for its address.
//
// PLACEHOLDER (issue I12): the pages other than Branding are dummy pages made from their category
// in services.ts (name, description, services): a stand-in hero line, the intro is lorem ipsum,
// and the pictures are other pages' photos (the category's photo from the Services page and the
// office from the Branding hero). Give a page its own content here to replace it.
import type { StaticImageData } from "next/image";
import officePhoto from "@/assets/images/services/branding/hero-office.webp";
import { brandingPage, type BrandingPage } from "@/content/branding-page";
import { serviceCategories, type ServiceCategory } from "@/content/services";

export type CorePage = BrandingPage;

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London.";

// Stand-in hero lines and descriptions of the categories' photos (the Services page shows them
// without one). A hero line should break onto two lines like Branding's (about 26–30
// characters), or it runs into the floating logos.
const dummy: Record<string, { title: string; photoAlt: string }> = {
  development: { title: "Where Ideas Become Products", photoAlt: "A developer typing code on a desktop computer" },
  marketing: { title: "Where Brands Find Their People", photoAlt: "Two people going over charts on a laptop and printed reports" },
  software: { title: "Where Software Meets Business", photoAlt: "Code on a monitor and a tablet, with a hand-drawn flowchart beside the keyboard" },
  applications: { title: "Where Apps Meet Everyday Life", photoAlt: "Hands holding a phone with app screens floating around it" },
  "ai-automation": { title: "Where Busywork Runs Itself", photoAlt: "A woman with a headset working at a computer showing an AI dashboard" },
};

const office: { image: StaticImageData; alt: string } = {
  image: officePhoto,
  alt: "A team in an open-plan office with tall windows, in black and white",
};

function dummyCorePage(category: ServiceCategory): CorePage {
  const { title, photoAlt } = dummy[category.slug] ?? { title: category.label, photoAlt: category.label };
  return {
    name: category.label,
    description: category.description,
    caseStudyService: category.slug,
    hero: { ...brandingPage.hero, title, text: category.description },
    intro: {
      title: ["Digital Thinkers.", "Small Studios *Build*", "*Awesome Products.*"],
      text: lorem,
      images: [{ image: category.image, alt: photoAlt }, office],
    },
    services: {
      title: `${category.label} Services`,
      text: category.description,
      items: category.services,
    },
    projects: {
      title: `Our ${category.label} Projects, Ground-Up Launches to Makeovers`,
      button: brandingPage.projects.button,
    },
  };
}

export const corePages = serviceCategories.map((category) => ({
  category,
  content: category.slug === "branding" ? brandingPage : dummyCorePage(category),
}));

export function getCorePage(slug: string) {
  return corePages.find(({ category }) => category.slug === slug);
}
