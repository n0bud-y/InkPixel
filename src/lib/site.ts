// Site-wide settings. Static content: edited in code, not in Contentful.
export const siteConfig = {
  name: "Ink Pixel Studios",
  description: "Brand portfolio, services, and case studies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
