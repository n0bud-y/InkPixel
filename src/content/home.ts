// Home page content that is not in Contentful.
import type { StaticImageData } from "next/image";
import pakArmoring from "@/assets/images/pak-armoring.webp";
import client1 from "@/assets/images/testimonials/client-1.webp";
import clientReview from "@/assets/images/testimonials/client-review.webp";

export type FeaturedProject = {
  name: string;
  summary: string;
  href: string;
  image: StaticImageData;
};

// The first card in the home page's project stack (FeaturedWork), before the case studies
// from Contentful. PLACEHOLDER: Pak Armoring is not a Contentful case study yet, so its page
// (/case-studies/pak-armoring) does not exist; add it to Contentful to give it one, then remove
// this entry.
export const featuredProject: FeaturedProject = {
  name: "Pak Armoring (Pvt) Ltd",
  summary:
    "Meeting the evolving security and mobility requirements of Pakistan's law enforcement agencies and Armed Forces.",
  href: "/case-studies/pak-armoring",
  image: pakArmoring,
};

export type TestimonialStat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export type Testimonial = {
  /** Shown to screen readers; also the photo's alt text. */
  client: string;
  image: StaticImageData;
  /** The testimonial text: one entry per paragraph. */
  quote: string[];
  /**
   * Id of the testimonial's video in Contentful (an asset, e.g. an MP4), so the file can be
   * replaced there. The play button only appears when this is set and the asset is published.
   */
  videoAssetId?: string;
  stats: TestimonialStat[];
};

const placeholderTestimonial: Testimonial = {
  client: "Client testimonial",
  image: client1,
  quote: [
    "We believe great design should do more than grab attention – it should drive growth. That's why every project we take on blends creativity with strategy, helping our clients increase conversions, lower acquisition costs, and scale faster.",
    "Our clients' success stories speak louder than we ever could.",
  ],
  stats: [
    { prefix: "+", value: 150, suffix: "%", label: "Project satisfaction rate" },
    { value: 65, suffix: "%", label: "Lower Acquisition Costs" },
    { value: 3, suffix: "x", label: "Improved CRO" },
    { value: 94, suffix: "%", label: "Clients Exceed Targets" },
  ],
};

// PLACEHOLDER (issue I8): stock footage standing in for a client's video (Contentful asset
// "home-testimonial-video"), with a still from it (11 s in) as the photo; same text and results
// as the others.
const videoTestimonial: Testimonial = {
  ...placeholderTestimonial,
  image: clientReview,
  videoAssetId: "home-testimonial-video",
};

// PLACEHOLDER: the design shows 6 testimonials; none is a real client's yet (stock photo from
// the design, stock video). Replace each entry with a real client's photo, video, and results,
// with their permission.
export const testimonials: Testimonial[] = [
  videoTestimonial,
  ...Array.from({ length: 5 }, () => placeholderTestimonial),
];

export type ProcessStep = {
  title: string;
  description: string;
};

// "Our Process": the six phases, then the outcome ("Live").
export const processSteps: ProcessStep[] = [
  {
    title: "Discovery",
    description:
      "Workshops, audits and stakeholder interviews to map the problem and the opportunity.",
  },
  {
    title: "Define",
    description:
      "Strategy, scope, success metrics. We commit to a thesis before we commit to pixels.",
  },
  {
    title: "Design",
    description: "Prototypes, design systems and copy. Validated with users at every milestone.",
  },
  {
    title: "Build",
    description: "Two-week sprints, demos every Friday. Production-quality code from week one.",
  },
  {
    title: "Launch",
    description:
      "Migration, training, comms. We treat go-live as the start of the relationship, not the end.",
  },
  {
    title: "Iterate",
    description: "Analytics, experiments, ongoing roadmap. We grow with you, quarter over quarter.",
  },
];

export const processOutcome = {
  label: "Live",
  title: "Production & beyond",
  description:
    "From kickoff to launch in 12 weeks. Then we keep shipping with you, quarter after quarter.",
};
