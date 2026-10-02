// Home page content that is not in Contentful.
import type { StaticImageData } from "next/image";
import pakArmoring from "@/assets/images/pak-armoring.webp";
import client1 from "@/assets/images/testimonials/client-1.webp";

export type FeaturedProject = {
  name: string;
  summary: string;
  href: string;
  image: StaticImageData;
};

// PLACEHOLDER: case studies come from Contentful (featured flag). Replace this with a query
// for the featured case study once the case-study content types exist (P3-01, P3-06).
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
  /** Video file URL (e.g. MP4). The play button only appears when this is set. */
  video?: string;
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

// PLACEHOLDER: the design shows 6 testimonials; only one exists so far (with a stock photo
// from the design). Replace each entry with a real client's photo, video, and results, with
// their permission.
export const testimonials: Testimonial[] = Array.from({ length: 6 }, () => placeholderTestimonial);

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
