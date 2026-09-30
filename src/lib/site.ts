// Site-wide settings. Placeholders until the Contentful `siteSettings` entry
// replaces them in Phase 3.
export const siteConfig = {
  name: "InkPixel",
  description: "Brand portfolio, services, and case studies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const mainNav = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
