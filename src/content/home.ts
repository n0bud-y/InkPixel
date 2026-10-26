// Home page content that is not in Contentful.
import type { StaticImageData } from "next/image";
import clientDrumond from "@/assets/images/testimonials/client-drumond.webp";
import clientGulbaan from "@/assets/images/testimonials/client-gulbaan.webp";
import clientIhr from "@/assets/images/testimonials/client-ihr.webp";
import clientPakArmoring from "@/assets/images/testimonials/client-pak-armoring.webp";

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

// "What Our Clients Say About Us": the line under the heading (content document, 23 Oct 2026).
export const testimonialsIntro =
  "We believe it's important to understand our clients' goals and make their ideas a reality, and this is where great digital solutions start. Understand how our Web Development, Software Solutions, AI Automation and Digital Services enable businesses to advance.";

// The clients' words, one per slide in order (content document, 23 Oct 2026; the project head
// confirmed they are from these clients). The first was the video slide's, removed on 26 Oct 2026
// (project head), and is unused now; the document also has a sixth, unused: "Ink Pixel Studios was
// able to leave a positive impression as they worked with us from our initial needs through to the
// final solution, seeing how our technology could then work for us."
const quotes = [
  "What Ink Pixel Studios did was exactly what we wanted and they were able to execute that exactly as our brand. They knew what we wanted, and they made it easy for us.",
  "We required a software solution that fit our business operations and Ink Pixel Studios was able to accommodate our needs and make it a viable solution because they took a personal approach to us.",
  "The team has made the process of developing the app smoother by keeping our end users and objectives in mind. We were impressed by their attention to detail and understanding of our goals.",
  "Ink Pixel Studios guided us through strategies we could use to streamline repetitive tasks by making them automated; their suggestions helped us to see how technology could play a role in our workflow.",
  "The collaborative nature of the team, their willingness to listen to our ideas, consider our feedback and strive to create a digital solution that fitted our business needs was what we valued the most.",
];

// PLACEHOLDER (issue I8): the same results on every slide; none of these figures is a client's.
// Replace each with the client's real figures, with their permission.
const placeholderStats: Testimonial["stats"] = [
  { prefix: "+", value: 150, suffix: "%", label: "Project satisfaction rate" },
  { value: 65, suffix: "%", label: "Lower Acquisition Costs" },
  { value: 3, suffix: "x", label: "Improved CRO" },
  { value: 94, suffix: "%", label: "Clients Exceed Targets" },
];

// The clients' logo cards (from the project head, 23 Oct 2026). The first slide, a stand-in video
// review (stock footage), was removed on 26 Oct 2026 (project head); a real client video can be
// added back as a slide with `videoAssetId` (a Contentful asset) and a still as its `image`.
export const testimonials: Testimonial[] = [
  { quote: [quotes[1]], stats: placeholderStats, client: "IHR", image: clientIhr },
  { quote: [quotes[2]], stats: placeholderStats, client: "Gulbaan", image: clientGulbaan },
  { quote: [quotes[3]], stats: placeholderStats, client: "Drumond Auto Body", image: clientDrumond },
  { quote: [quotes[4]], stats: placeholderStats, client: "Pak Armoring", image: clientPakArmoring },
];

export type ProcessStep = {
  title: string;
  description: string;
};

// The process section: its heading and line, then the five phases, then the outcome ("Live").
// Heading, line, and phases from the content document (23 Oct 2026).
export const processIntro = {
  title: "Built With Precision.",
  description:
    "Great technology requires great ideas. From strategic planning to secure engineering, thorough testing, continuous improvement, and more, we ensure that each solution is designed around your business goals, technical needs, security needs, and applicable industry standard.",
};

export const processSteps: ProcessStep[] = [
  {
    title: "Discover & Define",
    description:
      "Before defining the right solution, we grasp your business, user, problems, targets, and technical needs.",
  },
  {
    title: "Strategize & Architect",
    description:
      "Our experts prepare the product roadmap, technology architecture, workflows and security aspects essential for large-scale product development.",
  },
  {
    title: "Design & Develop",
    description:
      "Using an agile development process, we turn the approved strategy into easy-to-use designs and strong digital products.",
  },
  {
    title: "Test & Validate",
    description:
      "Each solution is thoroughly quality checked, performance tested, security tested, and validated for quality and reliability.",
  },
  {
    title: "Launch & Evolve",
    description:
      "We deploy, monitor, troubleshoot and continually enhance your product throughout your business and technology evolution.",
  },
];

export const processOutcome = {
  label: "Live",
  title: "Production & beyond",
  description:
    "From kickoff to launch in 12 weeks. Then we keep shipping with you, quarter after quarter.",
};
