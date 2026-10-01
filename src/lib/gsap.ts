// GSAP set up in one place. Import GSAP from here (not from "gsap") so the plugins are
// always registered. Only import this file from client components.
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

/** Media query for visitors who have not asked for reduced motion. */
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";

export { gsap, ScrollSmoother, ScrollTrigger, useGSAP };
