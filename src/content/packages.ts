// Service packages (20 Nov 2026, project head): four packages per core service, each building on
// the one before. One file holds all 24; one template renders any service's page
// (/services/<core>/packages), and /packages lists the six.
//
// The pages are not linked anywhere on the site yet and are kept out of search (noindex, not in
// the sitemap) until the project head approves them: set `packagesLive` to true to index them.
//
// PRICES: `price` is in PKR; null shows "Get a quote" (package 4 always shows "Custom quote").
// Every price is null until the studio sets them. Fill in a number, e.g. `price: 80000`, and it
// shows as "PKR 80,000" with its billing label, and goes into the page's structured data.
//
// Sub-services are referred to by the last part of their address in src/content/services.ts
// (e.g. "brand-identity-logo-design"); their titles, icons, links, and descriptions come from
// there, so they stay in step with the rest of the site.

/** True once the packages pages may be indexed and listed in the sitemap. */
export const packagesLive = false;

export type Billing = "one-time" | "per month" | "starting from";

export type Package = {
  /** Used in the contact link (?package=) and in the page's anchors. */
  slug: string;
  name: string;
  tagline: string;
  /** One line on who it suits. */
  bestFor: string;
  /** PKR; null = "Get a quote". Ignored for the custom package (always "Custom quote"). */
  price: number | null;
  billing: Billing;
  /** Every sub-service this package covers (it includes the previous package's, plus more). */
  includedSubServices: string[];
  /** Package 1: everything it includes. Packages 2–4: what it adds to the previous one. */
  deliverables: string[];
  timeline: string;
  revisions: string;
  support: string;
  ctaLabel: string;
  popular?: boolean;
  /** Package 4: priced per project. */
  custom?: boolean;
};

export type ServicePackages = {
  /** The core service's slug (src/content/services.ts). */
  service: string;
  intro: string;
  /** One line for the /packages hub card. */
  hubLine: string;
  /** A short line under the packages about how billing works for this service. */
  billingNote: string;
  packages: [Package, Package, Package, Package];
  /** The comparison table: per sub-service, what each package gives ("✓", "—", or a short note). */
  comparison: Record<string, [string, string, string, string]>;
  steps: { title: string; text: string }[];
  faq: { question: string; answer: string[] }[];
};

/** The contact page with the service and package chosen. */
export const packageContactLink = (service: string, pkg: string) => `/contact?service=${service}&package=${pkg}`;

/** "PKR 80,000", "Custom quote", or "Get a quote". */
export function priceLabel(pkg: Package) {
  if (pkg.custom) return "Custom quote";
  if (pkg.price == null) return "Get a quote";
  return `PKR ${pkg.price.toLocaleString("en-US")}`;
}

/** The billing line under the price. */
export function billingLabel(pkg: Package) {
  if (pkg.custom) return "Scoped per project";
  return { "one-time": "One-time", "per month": "Per month", "starting from": "Starting from" }[pkg.billing];
}

// Answers shared by every service's FAQ, with the service's own details filled in.
const paymentAnswer = [
  "Work starts once the advance payment is received. The split between the advance and the rest is set out in your quote before you commit.",
];
const upgradeAnswer = (unit: string) => [
  `Yes. Each package includes everything in the one before it, so moving up only adds the difference. Tell us and we'll quote the upgrade from the ${unit} you're on.`,
];

export const servicePackages: ServicePackages[] = [
  // 1. Branding: one-time.
  {
    service: "branding",
    intro: "Four branding packages, from a first logo to a full brand rollout. Each one includes everything in the package before it.",
    hubLine: "From a first logo to a complete brand, guidelines, and launch.",
    billingNote: "One-time payment per package. Printing, signage production, and paid ads are not included.",
    packages: [
      {
        slug: "brand-starter",
        name: "Brand Starter",
        tagline: "A professional logo and the basics to use it.",
        bestFor: "New businesses that need a logo and business cards to get started.",
        price: null,
        billing: "one-time",
        includedSubServices: ["brand-identity-logo-design", "stationery-design"],
        deliverables: [
          "3 logo concepts, 1 chosen and refined",
          "Final logo in colour, black, and white versions",
          "Logo files in AI, SVG, PDF, PNG, and JPG",
          "Business card design, front and back",
          "Letterhead design",
          "Colour palette and font pairing on one page",
        ],
        timeline: "1–2 weeks",
        revisions: "2 rounds",
        support: "2 weeks after handover",
        ctaLabel: "Choose Brand Starter",
      },
      {
        slug: "brand-identity",
        name: "Brand Identity",
        tagline: "A logo system and the rules that keep it consistent.",
        bestFor: "Growing businesses that post on social media and need one consistent look.",
        price: null,
        billing: "one-time",
        includedSubServices: ["brand-identity-logo-design", "stationery-design", "brand-guidelines", "social-media-branding"],
        deliverables: [
          "Secondary logo and icon mark",
          "Brand guidelines: 15–20 page PDF (logo use, colours, type, do's and don'ts)",
          "Profile and cover designs for 3 social platforms",
          "6 social post templates",
          "4 story templates and 5 highlight covers",
        ],
        timeline: "2–3 weeks",
        revisions: "3 rounds",
        support: "1 month after handover",
        ctaLabel: "Choose Brand Identity",
      },
      {
        slug: "complete-brand",
        name: "Complete Brand",
        tagline: "Your brand across print, social, and your website.",
        bestFor: "Businesses launching or relaunching with a website and a full set of materials.",
        price: null,
        billing: "one-time",
        popular: true,
        includedSubServices: [
          "brand-identity-logo-design",
          "stationery-design",
          "brand-guidelines",
          "social-media-branding",
          "digital-branding",
        ],
        deliverables: [
          "Full stationery set: envelope, email signature, invoice and quotation templates",
          "Website UI kit: colours, type scale, buttons, form styles, and up to 20 icons",
          "Favicon and app icon set",
          "Web banners in 3 sizes and 1 landing-page header",
          "10 social post templates and 3 ad templates",
          "Brand guidelines extended to 25–30 pages, with digital rules",
        ],
        timeline: "3–5 weeks",
        revisions: "3 rounds",
        support: "2 months after handover",
        ctaLabel: "Choose Complete Brand",
      },
      {
        slug: "brand-launch",
        name: "Brand Launch",
        tagline: "A full brand, rolled out everywhere it appears.",
        bestFor: "Established businesses rebranding across locations, packaging, and channels.",
        price: null,
        billing: "one-time",
        custom: true,
        includedSubServices: [
          "brand-identity-logo-design",
          "stationery-design",
          "brand-guidelines",
          "social-media-branding",
          "digital-branding",
          "brand-launch",
        ],
        deliverables: [
          "Rebrand rollout plan across website, social, and print",
          "Signage and packaging design, scoped per project",
          "Launch campaign creatives for social media and ads",
          "Every brand asset organised in one shared library",
          "Consistency check across all channels after launch",
          "One brand lead and regular check-in calls",
        ],
        timeline: "Planned per project",
        revisions: "Agreed in scope",
        support: "3 months, then optional retainer",
        ctaLabel: "Request a quote",
      },
    ],
    comparison: {
      "brand-identity-logo-design": ["Logo", "Logo + icon mark", "Logo + icon mark", "Logo + icon mark"],
      "stationery-design": ["Card + letterhead", "Card + letterhead", "Full set", "Full set"],
      "brand-guidelines": ["—", "15–20 pages", "25–30 pages", "Full brand book"],
      "social-media-branding": ["—", "3 platforms", "3 platforms + ad templates", "Full"],
      "digital-branding": ["—", "—", "UI kit + banners", "Full"],
      "brand-launch": ["—", "—", "—", "Full rollout"],
    },
    steps: [
      { title: "Discovery", text: "A call and a short questionnaire about your business, customers, and competitors." },
      { title: "Direction", text: "A mood board and the creative direction, agreed before design starts." },
      { title: "Design", text: "Logo concepts, then the chosen one refined and applied to your materials." },
      { title: "Review", text: "Your feedback in the revision rounds your package includes." },
      { title: "Handover", text: "Final files in every format you need, organised and ready to use." },
    ],
    faq: [
      {
        question: "Which branding package should I choose?",
        answer: [
          "Brand Starter if you only need a logo and business cards. Brand Identity if you're active on social media. Complete Brand if you're also launching a website. Brand Launch if you're rebranding an established business.",
        ],
      },
      { question: "Can I upgrade later?", answer: upgradeAnswer("package") },
      {
        question: "What isn't included?",
        answer: [
          "Printing, signage production, packaging production, stock photos or fonts that need a licence, and paid ad budgets. We can recommend suppliers and prepare print-ready files.",
        ],
      },
      { question: "How long does it take?", answer: ["From 1–2 weeks for Brand Starter to 3–5 weeks for Complete Brand. Brand Launch is planned with you. Timelines start once we have your answers to the questionnaire."] },
      { question: "How does payment work?", answer: paymentAnswer },
      {
        question: "What counts as a revision round?",
        answer: [
          "One round is one set of combined feedback on a design, which we then update. Sending all your notes together in each round keeps the work moving.",
        ],
      },
    ],
  },

  // 2. Development: one-time build, optional monthly maintenance.
  {
    service: "development",
    intro: "Four website packages, from a five-page site to a custom platform. Each one includes everything in the package before it.",
    hubLine: "From a five-page website to an online store or a custom platform.",
    billingNote: "One-time payment per build. Maintenance after the included period is optional and billed monthly. Domain, hosting, and paid plugins are separate.",
    packages: [
      {
        slug: "starter-website",
        name: "Starter Website",
        tagline: "A fast, responsive website to get you online.",
        bestFor: "Small businesses and professionals who need a clear, credible website.",
        price: null,
        billing: "one-time",
        includedSubServices: ["web-development"],
        deliverables: [
          "Up to 5 pages, designed for your brand",
          "Responsive on phones, tablets, and desktops",
          "Contact form with email notifications",
          "WhatsApp and click-to-call buttons",
          "Basic SEO: page titles, descriptions, and a sitemap",
          "Google Analytics set up",
          "Images optimised for speed",
        ],
        timeline: "2–3 weeks",
        revisions: "2 rounds",
        support: "1 month of fixes",
        ctaLabel: "Choose Starter Website",
      },
      {
        slug: "business-website",
        name: "Business Website",
        tagline: "A bigger site you can update yourself.",
        bestFor: "Businesses that publish news, services, or offers regularly.",
        price: null,
        billing: "one-time",
        includedSubServices: ["web-development", "cms-development", "website-maintenance"],
        deliverables: [
          "Up to 10 pages",
          "Content management: edit text, images, and pages yourself",
          "Blog or news section",
          "1 recorded training session on the CMS",
          "3 months of maintenance: updates, backups, and security checks",
          "Monthly checks of forms and uptime",
        ],
        timeline: "3–5 weeks",
        revisions: "3 rounds",
        support: "3 months of maintenance",
        ctaLabel: "Choose Business Website",
      },
      {
        slug: "ecommerce-store",
        name: "E-Commerce Store",
        tagline: "An online store that takes orders and payments.",
        bestFor: "Businesses ready to sell products online with payments and delivery.",
        price: null,
        billing: "one-time",
        popular: true,
        includedSubServices: ["web-development", "cms-development", "website-maintenance", "ecommerce-development", "backend-api-development"],
        deliverables: [
          "Online store with up to 100 products added by us",
          "Product pages, categories, search, and filters",
          "Cart, checkout, and order confirmation emails",
          "1 payment gateway plus cash on delivery",
          "Order and stock management dashboard",
          "Shipping rates and delivery areas set up",
          "1 integration by API, e.g. a courier or your CRM",
        ],
        timeline: "5–8 weeks",
        revisions: "3 rounds",
        support: "3 months of maintenance",
        ctaLabel: "Choose E-Commerce Store",
      },
      {
        slug: "custom-platform",
        name: "Custom Platform",
        tagline: "A web platform built around how you work.",
        bestFor: "Businesses that need portals, dashboards, or systems beyond a standard website.",
        price: null,
        billing: "one-time",
        custom: true,
        includedSubServices: [
          "web-development",
          "cms-development",
          "website-maintenance",
          "ecommerce-development",
          "backend-api-development",
          "frontend-development",
        ],
        deliverables: [
          "Custom frontend designed for your users and workflows",
          "Custom backend, database, and admin panel",
          "Your own APIs and integrations with existing systems",
          "User accounts, roles, and permissions",
          "Staging site, testing, and a launch plan",
          "Ongoing maintenance plan with a monthly report",
        ],
        timeline: "Planned per project",
        revisions: "Agreed in scope",
        support: "Ongoing maintenance plan",
        ctaLabel: "Request a quote",
      },
    ],
    comparison: {
      "web-development": ["Up to 5 pages", "Up to 10 pages", "✓", "✓"],
      "ecommerce-development": ["—", "—", "Up to 100 products", "Custom"],
      "cms-development": ["—", "✓", "✓", "Custom"],
      "frontend-development": ["Theme-based", "Theme-based", "Theme-based", "Fully custom"],
      "backend-api-development": ["—", "—", "1 integration", "Custom APIs"],
      "website-maintenance": ["1 month", "3 months", "3 months", "Ongoing plan"],
    },
    steps: [
      { title: "Discovery", text: "We agree the pages, features, and content your site needs." },
      { title: "Design", text: "The layout and look of your key pages, approved before building." },
      { title: "Build", text: "Development on a staging site you can check as it comes together." },
      { title: "Test", text: "Phones, browsers, forms, speed, and payments checked before launch." },
      { title: "Launch", text: "Your site goes live on your domain, with support as your package includes." },
    ],
    faq: [
      {
        question: "Which website package should I choose?",
        answer: [
          "Starter Website for a simple, credible site. Business Website if you want to update content yourself. E-Commerce Store to sell online. Custom Platform for portals, dashboards, or systems.",
        ],
      },
      { question: "Can I upgrade later?", answer: upgradeAnswer("site") },
      {
        question: "What isn't included?",
        answer: [
          "Domain names, hosting, paid themes or plugins, payment gateway fees, and the copywriting for your pages unless agreed. We help you choose and set these up.",
        ],
      },
      { question: "How long does it take?", answer: ["From 2–3 weeks for a Starter Website to 5–8 weeks for an E-Commerce Store, once we have your content. Custom platforms are planned with you."] },
      { question: "How does payment work?", answer: [...paymentAnswer, "Maintenance after the included period is optional and billed monthly."] },
      {
        question: "What counts as a revision round?",
        answer: ["One round is one set of combined feedback on the design or the built pages, which we then update. Changes to the agreed scope are quoted separately."],
      },
    ],
  },

  // 3. Marketing: per month, ad budget separate.
  {
    service: "marketing",
    intro: "Four monthly marketing packages, from social media posting to full-funnel growth. Each one includes everything in the package before it.",
    hubLine: "Monthly social media, ads, SEO, and growth, with your ad budget kept separate.",
    billingNote: "Billed monthly. Your ad budget is separate and paid directly to the ad platforms.",
    packages: [
      {
        slug: "social-starter",
        name: "Social Starter",
        tagline: "Consistent, designed posts every month.",
        bestFor: "Businesses that need an active, professional social media presence.",
        price: null,
        billing: "per month",
        includedSubServices: ["social-media-marketing", "content-marketing"],
        deliverables: [
          "Management of 2 platforms, e.g. Facebook and Instagram",
          "12 designed posts a month",
          "8 stories a month",
          "Captions and hashtags for every post",
          "Monthly content calendar, approved before posting",
          "Monthly performance report",
        ],
        timeline: "First posts within 1–2 weeks",
        revisions: "2 rounds per monthly batch",
        support: "Working days, by WhatsApp and email",
        ctaLabel: "Choose Social Starter",
      },
      {
        slug: "growth",
        name: "Growth",
        tagline: "More content, plus ads that bring enquiries.",
        bestFor: "Businesses ready to run paid campaigns alongside regular posting.",
        price: null,
        billing: "per month",
        includedSubServices: ["social-media-marketing", "content-marketing", "paid-advertising"],
        deliverables: [
          "20 posts and 12 stories a month, on up to 3 platforms",
          "Up to 3 live Meta ad campaigns: setup, targeting, and optimisation",
          "4 ad creatives a month",
          "Comment and inbox handling during working hours",
          "Ad performance update every two weeks",
        ],
        timeline: "Ads live within 2 weeks",
        revisions: "2 rounds per monthly batch",
        support: "Working days, by WhatsApp and email",
        ctaLabel: "Choose Growth",
      },
      {
        slug: "performance",
        name: "Performance",
        tagline: "Social, ads, search, and messaging working together.",
        bestFor: "Businesses that want leads from social, Google, and their own lists.",
        price: null,
        billing: "per month",
        popular: true,
        includedSubServices: ["social-media-marketing", "content-marketing", "paid-advertising", "seo", "email-whatsapp-marketing"],
        deliverables: [
          "SEO: keyword plan and on-page fixes for up to 10 pages a month",
          "2 blog articles a month, 800–1,000 words each",
          "Google Business Profile management",
          "4 email or WhatsApp broadcasts a month",
          "Up to 5 live ad campaigns, including Google Ads",
          "Monthly strategy call",
        ],
        timeline: "Starts within 2 weeks; SEO work is ongoing",
        revisions: "2 rounds per monthly batch",
        support: "Working days, plus a monthly call",
        ctaLabel: "Choose Performance",
      },
      {
        slug: "full-funnel-growth",
        name: "Full-Funnel Growth",
        tagline: "Every channel, measured and improved each month.",
        bestFor: "Businesses with growth targets that need tracking, testing, and a plan.",
        price: null,
        billing: "per month",
        custom: true,
        includedSubServices: [
          "social-media-marketing",
          "content-marketing",
          "paid-advertising",
          "seo",
          "email-whatsapp-marketing",
          "analytics-growth-strategy",
        ],
        deliverables: [
          "Analytics dashboard with your key numbers",
          "Funnel and conversion tracking: pixels, events, and goals",
          "Landing-page and conversion-rate tests",
          "Lead nurturing sequences by email and WhatsApp",
          "Weekly strategy calls and a quarterly growth plan",
          "Content and ad volume set to your goals",
        ],
        timeline: "Planned with you",
        revisions: "Agreed in scope",
        support: "Dedicated manager, weekly calls",
        ctaLabel: "Request a quote",
      },
    ],
    comparison: {
      "social-media-marketing": ["2 platforms", "Up to 3 platforms", "Up to 3 platforms", "Custom"],
      seo: ["—", "—", "Up to 10 pages a month", "Full"],
      "paid-advertising": ["—", "Up to 3 campaigns", "Up to 5 campaigns", "Custom"],
      "content-marketing": ["12 posts + 8 stories", "20 posts + 12 stories", "+ 2 blog articles", "Custom"],
      "email-whatsapp-marketing": ["—", "—", "4 broadcasts", "+ automated sequences"],
      "analytics-growth-strategy": ["Monthly report", "Fortnightly ad updates", "Monthly strategy call", "Dashboards + weekly calls"],
    },
    steps: [
      { title: "Audit", text: "A review of your pages, past results, competitors, and goals." },
      { title: "Plan", text: "A monthly content calendar and, where included, the campaign plan." },
      { title: "Create", text: "Posts, stories, ad creatives, and articles, approved before they go out." },
      { title: "Run", text: "Publishing, campaigns, and community handling through the month." },
      { title: "Report", text: "Results each month and what we'll change next." },
    ],
    faq: [
      {
        question: "Which marketing package should I choose?",
        answer: [
          "Social Starter for regular, designed posting. Growth to add paid ads. Performance to add SEO and email or WhatsApp. Full-Funnel Growth when you want tracking, testing, and a growth plan across every channel.",
        ],
      },
      { question: "Can I upgrade later?", answer: upgradeAnswer("package") },
      {
        question: "Is the ad budget included?",
        answer: [
          "No. Your ad budget is separate and paid directly to Meta or Google, so you see exactly what's spent. The package covers our work: planning, creatives, setup, and optimisation.",
        ],
      },
      { question: "When will I see results?", answer: ["Posting and ads start within 1–2 weeks. Ads can bring enquiries soon after they go live; SEO builds over months. We report every month on what's working."] },
      { question: "How does payment work?", answer: ["Packages are billed monthly, in advance of each month's work."] },
      {
        question: "Can I approve posts before they go out?",
        answer: ["Yes. You approve each month's content calendar, with 2 rounds of changes per batch, before anything is published."],
      },
    ],
  },

  // 4. Software: project-based, starting from.
  {
    service: "software",
    intro: "Four software packages, from a configured POS to a SaaS platform. Each one includes everything in the package before it.",
    hubLine: "From POS and inventory to ERP, CRM, custom software, and SaaS.",
    billingNote: "Prices start from the figure shown; your final quote depends on the scope agreed in discovery. Servers and third-party licences are separate.",
    packages: [
      {
        slug: "business-essentials",
        name: "Business Essentials",
        tagline: "POS and inventory, set up for your shop.",
        bestFor: "Shops and outlets moving sales and stock off paper or spreadsheets.",
        price: null,
        billing: "starting from",
        includedSubServices: ["pos-inventory-software"],
        deliverables: [
          "POS for 1 outlet, set up with your products and prices",
          "Inventory with stock levels and low-stock alerts",
          "Sales, purchase, and stock reports",
          "Up to 5 user accounts with roles",
          "Receipt printer and barcode scanner set up",
          "Staff training session, on site or online",
        ],
        timeline: "2–4 weeks",
        revisions: "Configuration changes during setup",
        support: "1 month",
        ctaLabel: "Choose Business Essentials",
      },
      {
        slug: "business-systems",
        name: "Business Systems",
        tagline: "Sales, customers, and operations in one system.",
        bestFor: "Businesses with several outlets or teams that need shared records.",
        price: null,
        billing: "starting from",
        includedSubServices: ["pos-inventory-software", "erp-crm-systems", "software-integration-migration"],
        deliverables: [
          "CRM for leads, customers, and follow-ups",
          "ERP modules for accounts, purchasing, and HR basics (up to 3)",
          "Data moved from Excel or your old system (up to 3 sources)",
          "Up to 3 outlets or branches",
          "Up to 15 users",
          "Dashboard with your daily numbers",
        ],
        timeline: "4–8 weeks",
        revisions: "Changes agreed during setup",
        support: "3 months",
        ctaLabel: "Choose Business Systems",
      },
      {
        slug: "custom-software",
        name: "Custom Software",
        tagline: "Software shaped around your process.",
        bestFor: "Businesses whose workflows don't fit off-the-shelf software.",
        price: null,
        billing: "starting from",
        popular: true,
        includedSubServices: ["pos-inventory-software", "erp-crm-systems", "software-integration-migration", "custom-software-development", "qa-testing"],
        deliverables: [
          "Custom modules for your process, scoped in discovery",
          "Custom roles, approvals, and permissions",
          "Custom reports and exports to PDF and Excel",
          "Integration with up to 2 more systems, e.g. accounting, courier, or SMS",
          "Test plan with manual and automated tests",
          "Acceptance testing with your team before launch",
        ],
        timeline: "8–14 weeks",
        revisions: "Changes agreed per sprint",
        support: "3 months, then an optional plan",
        ctaLabel: "Choose Custom Software",
      },
      {
        slug: "saas-enterprise",
        name: "SaaS / Enterprise",
        tagline: "A product for many customers, built to scale.",
        bestFor: "Companies building a SaaS product or an enterprise-wide system.",
        price: null,
        billing: "starting from",
        custom: true,
        includedSubServices: [
          "pos-inventory-software",
          "erp-crm-systems",
          "software-integration-migration",
          "custom-software-development",
          "qa-testing",
          "saas-development",
        ],
        deliverables: [
          "Multi-tenant platform for many customer accounts",
          "Subscriptions, billing, and plan limits",
          "Customer onboarding and an admin console",
          "Cloud setup with monitoring and backups",
          "Security review and load testing",
          "Product roadmap and release plan",
        ],
        timeline: "Planned per project",
        revisions: "Agreed per sprint",
        support: "Ongoing support plan",
        ctaLabel: "Request a quote",
      },
    ],
    comparison: {
      "custom-software-development": ["—", "—", "Custom modules", "Full product"],
      "erp-crm-systems": ["—", "Up to 3 modules + CRM", "✓", "✓"],
      "pos-inventory-software": ["1 outlet, 5 users", "3 outlets, 15 users", "✓", "✓"],
      "saas-development": ["—", "—", "—", "Multi-tenant + billing"],
      "software-integration-migration": ["—", "Up to 3 data sources", "+ 2 integrations", "Custom"],
      "qa-testing": ["Setup checks", "Setup checks", "Manual + automated", "+ security & load tests"],
    },
    steps: [
      { title: "Discovery", text: "We map how your business works today and what the software must do." },
      { title: "Plan", text: "Scope, modules, data to move, and a timeline you approve." },
      { title: "Build", text: "Configuration or development in stages, with demos as each part is ready." },
      { title: "Test & train", text: "Testing with your data, then training for your team." },
      { title: "Go live", text: "Launch, data checks, and support for your first weeks." },
    ],
    faq: [
      {
        question: "Which software package should I choose?",
        answer: [
          "Business Essentials for POS and stock. Business Systems for CRM, ERP, and several outlets. Custom Software when your process needs its own modules. SaaS / Enterprise to build a product for many customers.",
        ],
      },
      { question: "Can I upgrade later?", answer: upgradeAnswer("system") },
      {
        question: "What isn't included?",
        answer: ["Hardware (printers, scanners, devices), servers or cloud hosting, third-party licences, and SMS or payment gateway fees. We list these in your quote."],
      },
      { question: "How long does it take?", answer: ["From 2–4 weeks for Business Essentials to 8–14 weeks for Custom Software. The plan from discovery sets your exact timeline."] },
      { question: "How does payment work?", answer: [...paymentAnswer, "Larger projects are usually split into milestones."] },
      {
        question: "Can you move our existing data?",
        answer: ["Yes, from Business Systems up. We move data from Excel or your old system, check it with you, and keep the original until you're happy."],
      },
    ],
  },

  // 5. Applications: project-based, starting from.
  {
    service: "applications",
    intro: "Four app packages, from a first MVP to a full app suite. Each one includes everything in the package before it.",
    hubLine: "From a first web app or MVP to native iOS and Android apps.",
    billingNote: "Prices start from the figure shown; your final quote depends on the features agreed in discovery. App store fees and hosting are separate.",
    packages: [
      {
        slug: "app-starter",
        name: "App Starter (MVP)",
        tagline: "Your idea, designed and launched as a web app.",
        bestFor: "Founders and businesses testing an idea with real users.",
        price: null,
        billing: "starting from",
        includedSubServices: ["app-ui-ux-design", "web-applications"],
        deliverables: [
          "Discovery workshop to define the MVP",
          "UI/UX design for up to 10 screens",
          "Clickable prototype to review before building",
          "Web app or installable PWA with up to 3 core features",
          "User sign-up and login",
          "Admin panel for basic content",
          "Hosting set up and launch",
        ],
        timeline: "6–8 weeks",
        revisions: "2 design rounds",
        support: "1 month",
        ctaLabel: "Choose App Starter",
      },
      {
        slug: "cross-platform-app",
        name: "Cross-Platform App",
        tagline: "One app for iPhone and Android.",
        bestFor: "Businesses that want to be in both app stores without two separate builds.",
        price: null,
        billing: "starting from",
        includedSubServices: ["app-ui-ux-design", "web-applications", "cross-platform-apps"],
        deliverables: [
          "iOS and Android app from one codebase (Flutter or React Native)",
          "Design extended to up to 20 screens",
          "Push notifications",
          "App Store and Google Play submission",
          "Analytics for screens and key actions",
        ],
        timeline: "8–12 weeks",
        revisions: "3 design rounds",
        support: "2 months",
        ctaLabel: "Choose Cross-Platform App",
      },
      {
        slug: "native-apps",
        name: "Native Apps",
        tagline: "Native iOS and Android apps, maintained after launch.",
        bestFor: "Apps that need the best performance and full use of device features.",
        price: null,
        billing: "starting from",
        popular: true,
        includedSubServices: [
          "app-ui-ux-design",
          "web-applications",
          "cross-platform-apps",
          "ios-app-development",
          "android-app-development",
          "app-maintenance",
        ],
        deliverables: [
          "Native iOS app (Swift) and native Android app (Kotlin)",
          "Up to 30 screens",
          "Offline mode for key features",
          "Device features such as camera, location, and in-app payments",
          "3 months of maintenance: OS updates, crash fixes, and small changes",
          "Monthly crash and performance report",
        ],
        timeline: "12–16 weeks",
        revisions: "3 design rounds",
        support: "3 months of maintenance",
        ctaLabel: "Choose Native Apps",
      },
      {
        slug: "enterprise-app-suite",
        name: "Enterprise App Suite",
        tagline: "Several apps and a platform, built to scale.",
        bestFor: "Organisations with customer apps, staff apps, and a web admin to run together.",
        price: null,
        billing: "starting from",
        custom: true,
        includedSubServices: [
          "app-ui-ux-design",
          "web-applications",
          "cross-platform-apps",
          "ios-app-development",
          "android-app-development",
          "app-maintenance",
        ],
        deliverables: [
          "App suite: customer app, staff app, and web admin",
          "Scaling plan: performance, load testing, and cloud setup",
          "Product analytics and reporting dashboards",
          "Ongoing maintenance and scaling plan",
          "Security review before launch",
          "One project lead and a release schedule",
        ],
        timeline: "Planned per project",
        revisions: "Agreed per sprint",
        support: "Ongoing maintenance and scaling",
        ctaLabel: "Request a quote",
      },
    ],
    comparison: {
      "web-applications": ["Web app or PWA", "✓", "✓", "Web admin + portals"],
      "ios-app-development": ["—", "Cross-platform", "Native", "Native"],
      "cross-platform-apps": ["—", "✓", "✓", "✓"],
      "android-app-development": ["—", "Cross-platform", "Native", "Native"],
      "app-ui-ux-design": ["Up to 10 screens", "Up to 20 screens", "Up to 30 screens", "Full design system"],
      "app-maintenance": ["1 month support", "2 months support", "3 months", "Ongoing + scaling"],
    },
    steps: [
      { title: "Discovery", text: "We agree the users, the core features, and what the first version must do." },
      { title: "Design", text: "App flows and screens, with a clickable prototype to try." },
      { title: "Build", text: "Development in sprints, with test builds on your phone as we go." },
      { title: "Test", text: "Devices, OS versions, and edge cases checked before release." },
      { title: "Launch", text: "Store submission or web launch, then support as your package includes." },
    ],
    faq: [
      {
        question: "Which app package should I choose?",
        answer: [
          "App Starter to test an idea with a web app. Cross-Platform App for both stores from one codebase. Native Apps for the best performance and device features. Enterprise App Suite for several apps and a platform.",
        ],
      },
      { question: "Can I upgrade later?", answer: upgradeAnswer("app") },
      {
        question: "What isn't included?",
        answer: ["Apple and Google developer account fees, hosting and cloud costs, paid APIs, and SMS or payment gateway fees. We set them up with you and list them in your quote."],
      },
      { question: "How long does it take?", answer: ["From 6–8 weeks for an App Starter to 12–16 weeks for Native Apps. App store review can add a few days."] },
      { question: "How does payment work?", answer: [...paymentAnswer, "App projects are usually split into milestones."] },
      {
        question: "Who owns the app and the code?",
        answer: ["You do, once the project is paid in full. The apps are published under your own App Store and Google Play accounts."],
      },
    ],
  },

  // 6. AI Automation: setup fee, starting from, plus optional monthly.
  {
    service: "ai-automation",
    intro: "Four AI automation packages, from a chatbot trained on your business to custom AI agents. Each one includes everything in the package before it.",
    hubLine: "From a chatbot trained on your FAQs to automated workflows and custom AI agents.",
    billingNote: "Setup fee from the figure shown, with optional monthly support. AI model, WhatsApp Business, and third-party tool fees are separate.",
    packages: [
      {
        slug: "ai-starter",
        name: "AI Starter",
        tagline: "A chatbot that answers your customers.",
        bestFor: "Businesses answering the same customer questions every day.",
        price: null,
        billing: "starting from",
        includedSubServices: ["ai-chatbots"],
        deliverables: [
          "AI chatbot on your website or WhatsApp (one channel)",
          "Trained on your FAQs, services, and prices (up to 50 Q&As or 20 pages)",
          "Hand-over to a person when needed",
          "Leads saved to a sheet or sent to your email",
          "2 weeks of tuning after launch",
        ],
        timeline: "1–2 weeks",
        revisions: "Tuning for 2 weeks after launch",
        support: "1 month",
        ctaLabel: "Choose AI Starter",
      },
      {
        slug: "automation-growth",
        name: "Automation Growth",
        tagline: "Leads followed up and routine work automated.",
        bestFor: "Teams losing time on follow-ups, reminders, and repeat admin.",
        price: null,
        billing: "starting from",
        includedSubServices: ["ai-chatbots", "ai-marketing-automation", "business-process-automation"],
        deliverables: [
          "Chatbot on 2 channels: website and WhatsApp",
          "Up to 3 lead follow-up sequences by WhatsApp and email",
          "Up to 3 workflows automated, e.g. bookings, order updates, or reminders",
          "Connections to your tools, e.g. Google Sheets, your CRM, or calendar",
          "Monthly report on conversations and leads",
        ],
        timeline: "3–4 weeks",
        revisions: "Changes during a 2-week tuning period",
        support: "2 months",
        ctaLabel: "Choose Automation Growth",
      },
      {
        slug: "ai-operations",
        name: "AI Operations",
        tagline: "Documents and data processed without manual entry.",
        bestFor: "Businesses handling invoices, forms, and reports by hand.",
        price: null,
        billing: "starting from",
        popular: true,
        includedSubServices: ["ai-chatbots", "ai-marketing-automation", "business-process-automation", "document-data-processing"],
        deliverables: [
          "Document processing for up to 3 document types, e.g. invoices, forms, or reports",
          "Extracted data sent to your sheet, ERP, or accounting tool",
          "Up to 6 workflows automated across teams",
          "Integrations with up to 5 systems",
          "Error checks and a review queue for unclear cases",
          "Walkthrough session for your staff",
        ],
        timeline: "4–8 weeks",
        revisions: "Changes during a 2-week tuning period",
        support: "3 months",
        ctaLabel: "Choose AI Operations",
      },
      {
        slug: "custom-ai",
        name: "Custom AI",
        tagline: "AI agents and a plan built for your business.",
        bestFor: "Companies ready to use AI across teams and systems.",
        price: null,
        billing: "starting from",
        custom: true,
        includedSubServices: [
          "ai-chatbots",
          "ai-marketing-automation",
          "business-process-automation",
          "document-data-processing",
          "ai-agents",
          "ai-consulting",
        ],
        deliverables: [
          "Custom AI agents that work in your systems, with approval steps",
          "Integrations built for your software",
          "AI readiness review and roadmap",
          "Team training workshops",
          "Monitoring, usage reports, and cost controls",
          "Ongoing improvement plan",
        ],
        timeline: "Planned per project",
        revisions: "Agreed in scope",
        support: "Ongoing support plan",
        ctaLabel: "Request a quote",
      },
    ],
    comparison: {
      "business-process-automation": ["—", "Up to 3 workflows", "Up to 6 workflows", "Custom"],
      "ai-chatbots": ["1 channel", "2 channels", "2 channels", "Custom"],
      "ai-marketing-automation": ["—", "Up to 3 sequences", "Up to 3 sequences", "Custom"],
      "document-data-processing": ["—", "—", "Up to 3 document types", "Custom"],
      "ai-agents": ["—", "—", "Up to 5 integrations", "Custom agents"],
      "ai-consulting": ["—", "—", "Staff walkthrough", "Roadmap + workshops"],
    },
    steps: [
      { title: "Discovery", text: "We look at your questions, workflows, and tools to find what's worth automating." },
      { title: "Design", text: "The flows, the data each one uses, and where a person stays in the loop." },
      { title: "Build", text: "Chatbots, automations, and integrations set up and connected." },
      { title: "Tune", text: "Testing with real questions and documents, then adjusting the answers." },
      { title: "Launch & report", text: "Go live, with reports on what the automations handle." },
    ],
    faq: [
      {
        question: "Which AI package should I choose?",
        answer: [
          "AI Starter if you mainly need a chatbot. Automation Growth to follow up leads and automate routine work. AI Operations to process documents and data. Custom AI for agents across your systems.",
        ],
      },
      { question: "Can I upgrade later?", answer: upgradeAnswer("setup") },
      {
        question: "What isn't included?",
        answer: ["AI model usage fees, WhatsApp Business API fees, and subscriptions to third-party tools. Most are small and based on use; we estimate them in your quote."],
      },
      { question: "How long does it take?", answer: ["From 1–2 weeks for AI Starter to 4–8 weeks for AI Operations, depending on how many systems are connected."] },
      { question: "How does payment work?", answer: [...paymentAnswer, "Monthly support after the included period is optional."] },
      {
        question: "Will the chatbot give wrong answers?",
        answer: ["It answers from the content you approve, and hands over to a person when it isn't sure. We tune it during the first weeks using real conversations."],
      },
    ],
  },
];

/** The packages for a core service, or undefined. */
export const getServicePackages = (service: string) => servicePackages.find((item) => item.service === service);
