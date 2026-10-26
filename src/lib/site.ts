// Site-wide settings. Static content: edited in code, not in Contentful.
export const siteConfig = {
  name: "Ink Pixel Studios",
  /** The default search description (home page, and pages without their own). Stand-in, issue I9. */
  description:
    "Ink Pixel Studios is a digital studio in Karachi building websites, apps, custom software, brands, and AI automation for businesses worldwide.",
  /** The live site's address, for canonical URLs, share links, the sitemap, and structured data,
   *  on every deployment (previews and the demo point to the live site). */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://inkpixelstudios.com",
  email: "info@inkpixelstudios.com",
  /** The phone number from the old site's About page (a US number), confirmed for the site on
   *  15 Oct 2026: as shown, and for tel: links. */
  phone: { display: "+1 818-422-9253", tel: "+18184229253" },
  /** Short line about the studio (footer). */
  tagline: "A digital studio building software, brands and experiences from Karachi for the world.",
  address: "Office 308, 3rd Floor, Anum Empire, Shahra-e-Faisal, Jinnah Housing Society Karachi, 74200",
  /** The same office, as structured data (schema.org) needs it. The position is the About page's
   *  map link (plus code V38J+R9 Karachi). */
  office: {
    streetAddress: "Office 308, 3rd Floor, Anum Empire, Shahra-e-Faisal, Jinnah Housing Society",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    postalCode: "74200",
    addressCountry: "PK",
    latitude: 24.86706,
    longitude: 67.08094,
  },
  /** The studio's social profiles (structured data `sameAs`). None yet: add LinkedIn,
   *  Instagram, Behance, Clutch, … here. */
  socialProfiles: [] as string[],
};

/** Parts of the site that can be switched off until they are ready. */
export const features = {
  /** The blog ("Insights"): off until launch posts are written (project head, 23 Oct 2026). Off,
   *  /blog pages show 404 and leave the sitemap, and the menu link and the Insights sections on
   *  Home, About, and the service pages are hidden. Set to true to bring it all back. */
  blog: false,
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
].filter(({ href }) => features.blog || href !== "/blog");

export const contactCta = { href: "/contact", label: "Get in touch" } as const;

// Footer link columns. Services: the six core service pages (/services/<core>, as in
// src/content/services.ts).
export const footerNav = {
  sitemap: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Work" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services/branding", label: "Branding" },
    { href: "/services/development", label: "Development" },
    { href: "/services/marketing", label: "Marketing" },
    { href: "/services/software", label: "Software" },
    { href: "/services/applications", label: "Applications" },
    { href: "/services/ai-automation", label: "AI Automation" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms and Conditions" },
    { href: "/refund-policy", label: "Refund Policy" },
  ],
} as const;
