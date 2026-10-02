// Industries and their solutions. Static content: edited here, not in Contentful.
// Used by the home page "Industry-Specific Solutions" section; reusable for /industries.
import type { StaticImageData } from "next/image";
import fintech from "@/assets/images/icons/industries/fintech.png";
import healthcare from "@/assets/images/icons/industries/healthcare.png";
import logistics from "@/assets/images/icons/industries/logistics.png";
import realEstate from "@/assets/images/icons/industries/real-estate.png";
import { serviceCategories, type Service } from "./services";

export type Industry = {
  /** URL-safe id, also used for the tab. */
  slug: string;
  label: string;
  description: string;
  icon: StaticImageData;
  solutions: Service[];
};

// PLACEHOLDER: the design shows the Branding services for every industry. Replace each
// industry's solutions with its own once that content exists.
const placeholderSolutions = serviceCategories[0].services;

export const industries: Industry[] = [
  {
    slug: "fintech",
    label: "Fintech",
    description:
      "Our fintech solutions simplify complex financial processes and strengthen security to help businesses drive operational efficiency.",
    icon: fintech,
    solutions: placeholderSolutions,
  },
  {
    slug: "healthcare",
    label: "Healthcare",
    description:
      "We build healthcare solutions that streamline operations, elevate patient care, and ensure industry compliance.",
    icon: healthcare,
    solutions: placeholderSolutions,
  },
  {
    slug: "real-estate",
    label: "Real estate",
    description:
      "We empower real estate businesses with strategies that increase property value and streamline transactions.",
    icon: realEstate,
    solutions: placeholderSolutions,
  },
  {
    slug: "logistics",
    label: "Logistics",
    description:
      "We transform logistics with technology, optimizing supply chains and ensuring efficient, cost-effective deliveries.",
    icon: logistics,
    solutions: placeholderSolutions,
  },
  {
    slug: "ecommerce",
    label: "Ecommerce",
    description:
      "We specialize in crafting unique eCommerce solutions that drive conversions and elevate customer experiences.",
    // PLACEHOLDER icon: the design reuses the Logistics icon until an Ecommerce icon exists.
    icon: logistics,
    solutions: placeholderSolutions,
  },
];
