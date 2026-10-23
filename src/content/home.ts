// Home page content that is not in Contentful.
import type { StaticImageData } from "next/image";
import clientDrumond from "@/assets/images/testimonials/client-drumond.webp";
import clientGulbaan from "@/assets/images/testimonials/client-gulbaan.webp";
import clientIhr from "@/assets/images/testimonials/client-ihr.webp";
import clientPakArmoring from "@/assets/images/testimonials/client-pak-armoring.webp";
import clientReview from "@/assets/images/testimonials/client-review.webp";

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

// PLACEHOLDER: the same text and results on every slide; none of it is from these clients.
// Replace each with the client's own words and real figures, with their permission.
const placeholderReview: Pick<Testimonial, "quote" | "stats"> = {
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
// "home-testimonial-video"), with a still from it (11 s in) as the photo.
const videoTestimonial: Testimonial = {
  ...placeholderReview,
  client: "Client testimonial",
  image: clientReview,
  videoAssetId: "home-testimonial-video",
};

// The video first, then the clients' logo cards (from the project head, 23 Oct 2026). The
// review text and results on each are still the placeholder above (issue I8).
export const testimonials: Testimonial[] = [
  videoTestimonial,
  { ...placeholderReview, client: "IHR", image: clientIhr },
  { ...placeholderReview, client: "Gulbaan", image: clientGulbaan },
  { ...placeholderReview, client: "Drumond Auto Body", image: clientDrumond },
  { ...placeholderReview, client: "Pak Armoring", image: clientPakArmoring },
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
