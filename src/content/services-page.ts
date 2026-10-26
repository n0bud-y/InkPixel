// The Services overview page (/services), from Service.svg. Static content: edited here, not in
// Contentful. The services themselves (categories, descriptions, photos) are in services.ts; the
// page's meta title and description are in its Contentful Page SEO entry.
import type { StaticImageData } from "next/image";
import apple from "@/assets/images/services/featured/apple.svg";
import cmswire from "@/assets/images/services/featured/cmswire.svg";
import goodfirms from "@/assets/images/services/featured/goodfirms.svg";
import inc from "@/assets/images/services/featured/inc.svg";
import topSoftwareCompanies from "@/assets/images/services/featured/top-software-companies.svg";
import yec from "@/assets/images/services/featured/yec.svg";
import { serviceCategories } from "@/content/services";

export type FeaturedLogo = { name: string; logo: StaticImageData };

export const servicesPage = {
  hero: {
    title: "Elevate Your Enterprise with Breakthrough Solutions",
    text: "We build powerful digital experiences through smart technology, creative design, and strategic thinking—helping businesses grow, scale, and stand out in a digital-first world.",
    // Stand-in (issue I10): the design's button says "Explore The App".
    button: { label: "Explore Our Work", href: "/case-studies" },
  },
  // The design's form comes with the lead pipeline (P3-14); until then the card links to the
  // contact page, as on the service pages.
  consultation: {
    title: "Book a Free *Consultation*",
    text: "Tell us what you're working on. We'll come back within a working day.",
    button: { label: "Schedule A Call", href: "/contact" },
  },
  featured: {
    title: "We're Featured In",
    // The design's logos, confirmed as the studio's own coverage (15 Oct 2026). Each SVG is the
    // logo in its 245 × 83 box from the design.
    logos: [
      { name: "Apple", logo: apple },
      { name: "Inc.", logo: inc },
      { name: "CMSWire", logo: cmswire },
      { name: "Top Software Companies", logo: topSoftwareCompanies },
      { name: "YEC", logo: yec },
      { name: "GoodFirms", logo: goodfirms },
    ] satisfies FeaturedLogo[],
  },
  categories: {
    title: "Empowering Your Business with Next-Gen Digital Solutions",
    text: "From custom software and high-impact applications to advanced AI automation, we provide end-to-end services to scale your enterprise.",
  },
  capabilities: {
    // The title in two halves, left and right of the drop.
    title: { start: ["Take a Look", "at What"], end: ["We Can Do", "For You"] },
    // Every service (services.ts), each linking to its page, in three rows of two core services
    // (26 Oct 2026; was the design's nine labels, which weren't links).
    items: serviceCategories.flatMap((category) =>
      category.services.map((service) => ({ label: service.title, href: service.href })),
    ),
  },
};
