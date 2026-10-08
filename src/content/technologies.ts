// Technologies shown in case-study tech stacks. The keys are the values editors can pick in
// Contentful (Tech stack group → Technologies): add a technology here and in a new migration
// together (the list is in contentful/migrations/0002-case-study-model.cjs).
import type { StaticImageData } from "next/image";
import bigcommerce from "@/assets/images/technologies/bigcommerce.svg";
import figma from "@/assets/images/technologies/figma.svg";
import nodejs from "@/assets/images/technologies/nodejs.svg";

export type Technology = {
  name: string;
  logo: StaticImageData;
};

// PLACEHOLDER logos: BigCommerce and Node.js are hand-drawn approximations from the first
// Gulbaan build (their text uses the visitor's system font). Replace them with official SVGs.
export const technologies = {
  bigcommerce: { name: "BigCommerce", logo: bigcommerce },
  nodejs: { name: "Node.js", logo: nodejs },
  figma: { name: "Figma", logo: figma },
} satisfies Record<string, Technology>;

export type TechnologySlug = keyof typeof technologies;

export const isTechnologySlug = (value: string): value is TechnologySlug =>
  Object.hasOwn(technologies, value);
