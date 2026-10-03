// Site-wide settings. Static content: edited in code, not in Contentful.
export const siteConfig = {
  name: "Ink Pixel Studios",
  description: "Brand portfolio, services, and case studies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "info@inkpixelstudios.com",
  /** Short line about the studio (footer). */
  tagline: "A digital studio building software, brands and experiences from Karachi for the world.",
  address: "Office 308, 3rd Floor, Anum Empire, Shahra-e-Faisal, Jinnah Housing Society Karachi, 74200",
};

// "Insights" is the blog and "Our Work" the case studies; the URLs stay descriptive for SEO.
export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/technologies", label: "Technologies" },
  { href: "/blog", label: "Insights" },
  { href: "/case-studies", label: "Our Work" },
] as const;

export const contactCta = { href: "/contact", label: "Get in touch" } as const;

// Footer link columns. Each service has its own page (/services/<slug>, built in P3-07).
export const footerNav = {
  sitemap: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Work" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services/web-development", label: "Web Development" },
    { href: "/services/mobile-apps", label: "Mobile Apps" },
    { href: "/services/ai-automation", label: "AI & Automation" },
    { href: "/services/ui-ux-design", label: "UI/UX Design" },
    { href: "/services/cloud-devops", label: "Cloud / DevOps" },
    { href: "/services/branding", label: "Branding" },
    { href: "/services/public-sector", label: "Public Sector" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
} as const;
