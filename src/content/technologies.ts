// Technologies shown in case-study tech stacks. The keys are the values editors can pick in
// Contentful (Tech stack group → Technologies): add a technology here and in a new migration
// together (the current list is in contentful/migrations/0005-case-study-app-sections.cjs).
import type { StaticImageData } from "next/image";
import bigcommerce from "@/assets/images/technologies/bigcommerce.svg";
import figma from "@/assets/images/technologies/figma.svg";
import getstream from "@/assets/images/technologies/getstream.webp";
import nodejs from "@/assets/images/technologies/nodejs.svg";
import postgresql from "@/assets/images/technologies/postgresql.webp";
import react from "@/assets/images/technologies/react.webp";
import stripe from "@/assets/images/technologies/stripe.webp";
import tensorflow from "@/assets/images/technologies/tensorflow.webp";

export type Technology = {
  name: string;
  logo: StaticImageData;
};

// PLACEHOLDER logos: BigCommerce and Node.js are hand-drawn approximations from the first
// Gulbaan build (their text uses the visitor's system font). Replace them with official SVGs.
// GetStream.io, Stripe, TensorFlow, PostgreSQL, and React are app icons (94 px squares) taken
// from the Cathy O'Bryan's Books design.
export const technologies = {
  bigcommerce: { name: "BigCommerce", logo: bigcommerce },
  nodejs: { name: "Node.js", logo: nodejs },
  figma: { name: "Figma", logo: figma },
  getstream: { name: "GetStream.io", logo: getstream },
  stripe: { name: "Stripe", logo: stripe },
  tensorflow: { name: "TensorFlow", logo: tensorflow },
  postgresql: { name: "PostgreSQL", logo: postgresql },
  react: { name: "React", logo: react },
} satisfies Record<string, Technology>;

export type TechnologySlug = keyof typeof technologies;

export const isTechnologySlug = (value: string): value is TechnologySlug =>
  Object.hasOwn(technologies, value);
