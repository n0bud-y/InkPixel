// Service detail pages (/services/<slug>). Static content: edited here, not in Contentful.
// One entry per service page; a slug without an entry is a 404. The first page, Web
// Development, follows src/assets/design/Service Detail.svg. Titles can mark words with
// *asterisks* (shown in the brand gradient).
// PLACEHOLDER (issue I6): text marked "lorem" is the design's lorem ipsum, and the hero title,
// the meta description, and the estimator questions are stand-ins; replace them with real copy.
import type { StaticImageData } from "next/image";
import domainAutomotive from "@/assets/images/services/icons/domain-automotive.svg";
import domainBusiness from "@/assets/images/services/icons/domain-business.svg";
import domainEcommerce from "@/assets/images/services/icons/domain-ecommerce.svg";
import domainEducation from "@/assets/images/services/icons/domain-education.svg";
import domainEntertainment from "@/assets/images/services/icons/domain-entertainment.svg";
import domainFintech from "@/assets/images/services/icons/domain-fintech.svg";
import domainGovernment from "@/assets/images/services/icons/domain-government.svg";
import domainHealthcare from "@/assets/images/services/icons/domain-healthcare.svg";
import domainHospitality from "@/assets/images/services/icons/domain-hospitality.svg";
import domainLogistics from "@/assets/images/services/icons/domain-logistics.svg";
import domainNonProfit from "@/assets/images/services/icons/domain-non-profit.svg";
import domainRealEstate from "@/assets/images/services/icons/domain-real-estate.svg";
import domainSocialNetworking from "@/assets/images/services/icons/domain-social-networking.svg";
import domainTechIt from "@/assets/images/services/icons/domain-tech-it.svg";
import domainTravelTourism from "@/assets/images/services/icons/domain-travel-tourism.svg";
import statClutch from "@/assets/images/services/icons/stat-clutch.png";
import statGoodfirms from "@/assets/images/services/icons/stat-goodfirms.png";
import statProjects from "@/assets/images/services/icons/stat-projects.png";
import statWebExperts from "@/assets/images/services/icons/stat-web-experts.png";
import stepDesign from "@/assets/images/services/icons/step-design.svg";
import stepDevelop from "@/assets/images/services/icons/step-develop.svg";
import stepKickoff from "@/assets/images/services/icons/step-kickoff.svg";
import stepLaunch from "@/assets/images/services/icons/step-launch.svg";
import stepTechStack from "@/assets/images/services/icons/step-tech-stack.svg";
import stepTest from "@/assets/images/services/icons/step-test.svg";
import typeCms from "@/assets/images/services/icons/type-cms.svg";
import typeEcommerce from "@/assets/images/services/icons/type-ecommerce.svg";
import typeWebApps from "@/assets/images/services/icons/type-web-apps.svg";
import typeWebsites from "@/assets/images/services/icons/type-websites.svg";
import devices from "@/assets/images/services/web-development/devices.webp";
import estimatorPhoto from "@/assets/images/services/web-development/estimator-photo.webp";

const lorem =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London.";
const loremShort =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966.";

export type Link = { label: string; href: string };
export type IconItem = { title: string; text: string; icon: StaticImageData };

export type EstimatorQuestion = {
  /** The query parameter the answer is sent as (to /contact). */
  id: string;
  question: string;
  options: string[];
  /** Several answers allowed (checkboxes instead of radio buttons). */
  multiple?: boolean;
};

export type ServiceStat = { value: number; suffix: string; decimals?: number; label: string; icon: StaticImageData };

export type ServicePage = {
  slug: string;
  /** The service's name, e.g. in the browser tab. */
  name: string;
  /** Case studies with this service ticked in Contentful are its projects (the slugs in
   *  contentful/migrations/0002). */
  caseStudyService: string;
  description: string;
  hero: { title: string; text: string; button: Link };
  consultation: { title: string; text: string; button: Link };
  intro: { title: string; text: string[]; image: StaticImageData };
  offerings: { title: string; text: string; button: Link; items: { title: string; text: string }[] };
  types: { title: string; text: string; items: IconItem[]; button: Link };
  projects: { title: string; button: Link };
  estimator: { title: string; image: StaticImageData; questions: EstimatorQuestion[] };
  workflow: { title: string; text: string; steps: IconItem[]; button: Link };
  stats: ServiceStat[];
};

const contact = "/contact";

const webDevelopment: ServicePage = {
  slug: "web-development",
  name: "Web Development",
  caseStudyService: "development",
  // Stand-in.
  description:
    "Websites, online stores, web apps, and content-managed sites, designed, built, tested, and looked after by Ink Pixel Studios.",
  hero: {
    // Stand-in: the design repeats the About page's title.
    title: "Web Development Services Built to Grow Your Business",
    text: "We build powerful digital experiences through smart technology, creative design, and strategic thinking—helping businesses grow, scale, and stand out in a digital-first world.",
    button: { label: "Explore Our Work", href: "/case-studies" },
  },
  // The design's form waits for the lead pipeline (P3-14); until then the card links to contact.
  consultation: {
    title: "Book a Free *Consultation*",
    text: "Tell us what you're working on. We'll come back within a working day.",
    button: { label: "Schedule A Call", href: contact },
  },
  intro: {
    title: "Web Development for Multi-Channel Visibility",
    text: [`${lorem} ${loremShort}`], // lorem
    image: devices,
  },
  offerings: {
    title: "Web Development Services for Novel, *Best-Functioning Websites*",
    text: lorem, // lorem
    button: { label: "Start with a Free Consultation", href: contact },
    items: [
      { title: "UI/UX Web Design", text: lorem },
      { title: "Frontend Development", text: lorem },
      { title: "Backend Development", text: lorem },
      { title: "Full Stack Development", text: lorem },
      { title: "No/Low Code Development", text: lorem },
    ],
  },
  types: {
    title: "Custom Web Development Services to Broaden Business Prospects",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley.", // lorem
    items: [
      { title: "Websites", text: loremShort, icon: typeWebsites },
      { title: "E-Commerce", text: loremShort, icon: typeEcommerce },
      { title: "Web Applications", text: loremShort, icon: typeWebApps },
      { title: "Content Management System", text: loremShort, icon: typeCms },
    ],
    button: { label: "Discuss Project Scope", href: contact },
  },
  projects: {
    title: "Our Web Development Projects, Ground-Up Launches to Makeovers",
    button: { label: "View Portfolio", href: "/case-studies" },
  },
  estimator: {
    title: "Estimate Your Web Development Cost in Seconds",
    image: estimatorPhoto,
    // The first question is the design's; the rest are stand-ins.
    questions: [
      {
        id: "type",
        question: "What type of website do you need?",
        options: ["Business / Corporate Website", "E-Commerce Store", "Web Portal / Dashboard", "Landing Page / Campaign Site"],
      },
      {
        id: "pages",
        question: "How many pages will it have?",
        options: ["1–5 pages", "6–15 pages", "16–30 pages", "More than 30"],
      },
      {
        id: "design",
        question: "Do you have designs ready?",
        options: ["Yes, ready to build", "Some ideas or a brand guide", "No, we need design too"],
      },
      {
        id: "features",
        question: "Which features do you need?",
        options: ["Online payments", "User accounts / logins", "Blog or CMS", "Integrations (CRM, ERP, APIs)", "More than one language"],
        multiple: true,
      },
      {
        id: "timeline",
        question: "When do you need it?",
        options: ["Within a month", "1–3 months", "3–6 months", "Just exploring"],
      },
    ],
  },
  workflow: {
    title: "Our Simple, Frictionless Web Development Workflow",
    // To check: may be copied from another agency's site (issue I6).
    text: "We use lean, agile methodology for collaborative development and faster turnarounds. Join the ranks of the 100s of companies we helped with our optimized and result-driven web development process.",
    steps: [
      {
        title: "Kick-Off with Project Idea",
        text: "We align your vision with market reality through deep scope analysis and strategic expert consulting.",
        icon: stepKickoff,
      },
      {
        title: "Decide Tech Stack",
        text: "Select high-performance, future-proof frameworks and tools optimized specifically for your unique project requirements and goals.",
        icon: stepTechStack,
      },
      {
        title: "Design",
        text: "Our UI/UX specialists craft immersive, user-centric interfaces that blend aesthetic beauty with seamless, intuitive navigation.",
        icon: stepDesign,
      },
      {
        title: "Develop",
        text: "Pro developers engineer robust backend systems and dynamic features using clean, scalable, and high-quality code.",
        icon: stepDevelop,
      },
      {
        title: "Test",
        text: "We execute rigorous quality assurance and debugging cycles to ensure a flawless, high-performance user experience.",
        icon: stepTest,
      },
      {
        title: "Launch & Maintain",
        text: "Deploy with confidence and evolve through continuous updates, security patches, and proactive performance monitoring support.",
        icon: stepLaunch,
      },
    ],
    button: { label: "Talk To Our Experts", href: contact },
  },
  // As in the design (project head decision, 10 Oct 2026; home and About say 100+ projects).
  stats: [
    { value: 60, suffix: "+", label: "Web Experts", icon: statWebExperts },
    { value: 500, suffix: "+", label: "Successful Projects", icon: statProjects },
    { value: 5, suffix: "", decimals: 1, label: "GoodFirms Rating", icon: statGoodfirms },
    { value: 4.8, suffix: "", decimals: 1, label: "Clutch Rating", icon: statClutch },
  ],
};

export const servicePages: ServicePage[] = [webDevelopment];

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}

export type Domain = { label: string; icon: StaticImageData };

// "Our Domain Diversity": the industries the studio works in (the same on every service page).
export const domains: Domain[] = [
  { label: "eCommerce", icon: domainEcommerce },
  { label: "Fintech", icon: domainFintech },
  { label: "Healthcare", icon: domainHealthcare },
  { label: "Education", icon: domainEducation },
  { label: "Social Networking", icon: domainSocialNetworking },
  { label: "Hospitality", icon: domainHospitality },
  { label: "Entertainment", icon: domainEntertainment },
  { label: "Government", icon: domainGovernment },
  { label: "Real Estate", icon: domainRealEstate },
  { label: "Business", icon: domainBusiness },
  { label: "Logistics", icon: domainLogistics },
  { label: "Tech & IT", icon: domainTechIt },
  { label: "Non-Profit", icon: domainNonProfit },
  { label: "Automotive", icon: domainAutomotive },
  { label: "Travel & Tourism", icon: domainTravelTourism },
];
