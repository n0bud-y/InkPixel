// The header's Technologies menu (desktop mega menu and the phone menu): technologies by group,
// each with its logo. Display only, no links. Add, remove, rename, or reorder them here.
//
// PLACEHOLDER: a starting list of common technologies, to be replaced with the studio's own stack.
// Logos: Devicon (MIT, github.com/devicons/devicon), except Shopify and Contentful from Simple
// Icons (CC0), coloured in their brand colours. React Native uses React's logo.
//
// Separate from technologies.ts, whose keys are the technologies editors pick in Contentful for
// case-study tech stacks.
import type { StaticImageData } from "next/image";
import angular from "@/assets/images/technologies/menu/angular.svg";
import aws from "@/assets/images/technologies/menu/aws.svg";
import contentful from "@/assets/images/technologies/menu/contentful.svg";
import css3 from "@/assets/images/technologies/menu/css3.svg";
import django from "@/assets/images/technologies/menu/django.svg";
import docker from "@/assets/images/technologies/menu/docker.svg";
import dotnet from "@/assets/images/technologies/menu/dotnet.svg";
import express from "@/assets/images/technologies/menu/express.svg";
import figma from "@/assets/images/technologies/menu/figma.svg";
import firebase from "@/assets/images/technologies/menu/firebase.svg";
import flutter from "@/assets/images/technologies/menu/flutter.svg";
import github from "@/assets/images/technologies/menu/github.svg";
import googlecloud from "@/assets/images/technologies/menu/googlecloud.svg";
import html5 from "@/assets/images/technologies/menu/html5.svg";
import javascript from "@/assets/images/technologies/menu/javascript.svg";
import kotlin from "@/assets/images/technologies/menu/kotlin.svg";
import laravel from "@/assets/images/technologies/menu/laravel.svg";
import mongodb from "@/assets/images/technologies/menu/mongodb.svg";
import mysql from "@/assets/images/technologies/menu/mysql.svg";
import nestjs from "@/assets/images/technologies/menu/nestjs.svg";
import nextjs from "@/assets/images/technologies/menu/nextjs.svg";
import nodejs from "@/assets/images/technologies/menu/nodejs.svg";
import php from "@/assets/images/technologies/menu/php.svg";
import postgresql from "@/assets/images/technologies/menu/postgresql.svg";
import python from "@/assets/images/technologies/menu/python.svg";
import react from "@/assets/images/technologies/menu/react.svg";
import redis from "@/assets/images/technologies/menu/redis.svg";
import shopify from "@/assets/images/technologies/menu/shopify.svg";
import swift from "@/assets/images/technologies/menu/swift.svg";
import tailwindcss from "@/assets/images/technologies/menu/tailwindcss.svg";
import typescript from "@/assets/images/technologies/menu/typescript.svg";
import vercel from "@/assets/images/technologies/menu/vercel.svg";
import vuejs from "@/assets/images/technologies/menu/vuejs.svg";
import woocommerce from "@/assets/images/technologies/menu/woocommerce.svg";
import wordpress from "@/assets/images/technologies/menu/wordpress.svg";

export type TechnologyGroup = {
  label: string;
  /** One line above the group's technologies in the menu. */
  description: string;
  items: { name: string; logo: StaticImageData }[];
};

export const technologyMenu = {
  /** Under the groups, beside the button. */
  callout: "Have a stack in mind?",
  button: { label: "Book a free call", href: "/contact" },
  groups: [
    {
      label: "Frontend",
      description: "Fast, accessible interfaces for websites and web apps.",
      items: [
        { name: "HTML5", logo: html5 },
        { name: "CSS3", logo: css3 },
        { name: "JavaScript", logo: javascript },
        { name: "TypeScript", logo: typescript },
        { name: "React", logo: react },
        { name: "Next.js", logo: nextjs },
        { name: "Vue.js", logo: vuejs },
        { name: "Angular", logo: angular },
        { name: "Tailwind CSS", logo: tailwindcss },
      ],
    },
    {
      label: "Backend",
      description: "Secure APIs, business logic, and integrations that scale.",
      items: [
        { name: "Node.js", logo: nodejs },
        { name: "Express", logo: express },
        { name: "NestJS", logo: nestjs },
        { name: "Python", logo: python },
        { name: "Django", logo: django },
        { name: "PHP", logo: php },
        { name: "Laravel", logo: laravel },
        { name: ".NET", logo: dotnet },
      ],
    },
    {
      label: "Mobile",
      description: "Native and cross-platform apps for iOS and Android.",
      items: [
        { name: "React Native", logo: react },
        { name: "Flutter", logo: flutter },
        { name: "Swift", logo: swift },
        { name: "Kotlin", logo: kotlin },
      ],
    },
    {
      label: "Databases",
      description: "Reliable storage for everything from records to real-time data.",
      items: [
        { name: "MySQL", logo: mysql },
        { name: "PostgreSQL", logo: postgresql },
        { name: "MongoDB", logo: mongodb },
        { name: "Redis", logo: redis },
        { name: "Firebase", logo: firebase },
      ],
    },
    {
      label: "CMS & E-commerce",
      description: "Content and online stores your team can manage themselves.",
      items: [
        { name: "WordPress", logo: wordpress },
        { name: "Shopify", logo: shopify },
        { name: "WooCommerce", logo: woocommerce },
        { name: "Contentful", logo: contentful },
      ],
    },
    {
      label: "Cloud & Tools",
      description: "Hosting, deployment, and the tools behind how we build.",
      items: [
        { name: "AWS", logo: aws },
        { name: "Google Cloud", logo: googlecloud },
        { name: "Docker", logo: docker },
        { name: "Vercel", logo: vercel },
        { name: "GitHub", logo: github },
        { name: "Figma", logo: figma },
      ],
    },
  ] satisfies TechnologyGroup[],
};
