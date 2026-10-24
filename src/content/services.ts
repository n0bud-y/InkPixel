// Service categories and their services. Static content: edited here, not in Contentful.
// Used by the home page "Building The Future of Digital Products" section and the header's
// Services mega menu; each category's description and photo are for the Services page
// (/services). A category with no services shows a "coming soon" panel on the home page.
//
// PLACEHOLDER (issue I7): the descriptions outside Branding are stand-ins, and their icons
// were drawn in-house (src/assets/images/icons/<category>/); replace both when the real copy
// and the designer's icons arrive. Each category has its own page, /services/<category>
// (src/content/core-pages.ts), and each service its own page under it,
// /services/<category>/<service> (src/content/service-pages.ts); only Branding and Website
// Development have real content so far, the rest are dummy pages (issue I12).
import type { StaticImageData } from "next/image";
import aiAgents from "@/assets/images/icons/ai-automation/ai-agents.svg";
import aiChatbots from "@/assets/images/icons/ai-automation/ai-chatbots.svg";
import aiConsulting from "@/assets/images/icons/ai-automation/ai-consulting.svg";
import aiMarketingAutomation from "@/assets/images/icons/ai-automation/ai-marketing-automation.svg";
import businessProcessAutomation from "@/assets/images/icons/ai-automation/business-process-automation.svg";
import documentDataProcessing from "@/assets/images/icons/ai-automation/document-data-processing.svg";
import androidApp from "@/assets/images/icons/applications/android-app-development.svg";
import appMaintenance from "@/assets/images/icons/applications/app-maintenance.svg";
import appUiUxDesign from "@/assets/images/icons/applications/app-ui-ux-design.svg";
import crossPlatformApps from "@/assets/images/icons/applications/cross-platform-apps.svg";
import iosApp from "@/assets/images/icons/applications/ios-app-development.svg";
import webApplications from "@/assets/images/icons/applications/web-applications.svg";
import brandGuidelines from "@/assets/images/icons/branding/brand-guidelines-brand-book.svg";
import brandIdentity from "@/assets/images/icons/branding/brand-identity-logo-design.svg";
import brandLaunch from "@/assets/images/icons/branding/brand-launch-implementation.svg";
import socialMediaBranding from "@/assets/images/icons/branding/social-media-branding.svg";
import stationeryDesign from "@/assets/images/icons/branding/stationery-design.svg";
import websiteBranding from "@/assets/images/icons/branding/website-digital-branding.svg";
import backendApi from "@/assets/images/icons/development/backend-api-development.svg";
import cmsDevelopment from "@/assets/images/icons/development/cms-development.svg";
import ecommerceDevelopment from "@/assets/images/icons/development/ecommerce-development.svg";
import frontendDevelopment from "@/assets/images/icons/development/frontend-development.svg";
import webDevelopment from "@/assets/images/icons/development/web-development.svg";
import websiteMaintenance from "@/assets/images/icons/development/website-maintenance.svg";
import analyticsGrowth from "@/assets/images/icons/marketing/analytics-growth-strategy.svg";
import contentMarketing from "@/assets/images/icons/marketing/content-marketing.svg";
import emailWhatsappMarketing from "@/assets/images/icons/marketing/email-whatsapp-marketing.svg";
import paidAdvertising from "@/assets/images/icons/marketing/paid-advertising.svg";
import seo from "@/assets/images/icons/marketing/seo.svg";
import socialMediaMarketing from "@/assets/images/icons/marketing/social-media-marketing.svg";
import customSoftware from "@/assets/images/icons/software/custom-software-development.svg";
import erpCrm from "@/assets/images/icons/software/erp-crm-systems.svg";
import posInventory from "@/assets/images/icons/software/pos-inventory-software.svg";
import qaTesting from "@/assets/images/icons/software/qa-testing.svg";
import saasDevelopment from "@/assets/images/icons/software/saas-development.svg";
import softwareIntegration from "@/assets/images/icons/software/software-integration-migration.svg";
import categoryBranding from "@/assets/images/services/categories/branding.webp";
import categoryDevelopment from "@/assets/images/services/categories/development.webp";
import categoryMarketing from "@/assets/images/services/categories/marketing.webp";
import categorySoftware from "@/assets/images/services/categories/software.webp";
import categoryApplications from "@/assets/images/services/categories/applications.webp";
import categoryAiAutomation from "@/assets/images/services/categories/ai-automation.webp";

export type Service = {
  title: string;
  /** One short line: the Services mega menu and the phone menu. */
  description: string;
  /** A sentence or two (from the content document, 23 Oct 2026): the home page's service tabs,
   *  the core pages' service cards, and the service pages' "Broaden …" lists. */
  summary: string;
  icon: StaticImageData;
  /** The service's own page. */
  href: string;
};

export type ServiceCategory = {
  /** URL-safe id, also used for the tab. */
  slug: string;
  label: string;
  /** One line about the category (Services page). */
  description: string;
  /** The category's photo (Services page). */
  image: StaticImageData;
  /** The category's own page, /services/<slug> (the Services page links its photo there; without
   *  one, to its first service). */
  href?: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "branding",
    label: "Branding",
    href: "/services/branding",
    description:
      "Build a unique brand voice, stunning visual identity, and lasting market presence.",
    image: categoryBranding,
    services: [
      {
        title: "Brand Identity / Logo Design",
        description:
          "Primary logo, secondary logo, icon/mark, logo variations, black & white versions.",
        summary:
          "Ink Pixel Studios creates a memorable impression with your brand identity design and creative logo design services.",
        icon: brandIdentity,
        href: "/services/branding/brand-identity-logo-design",
      },
      {
        title: "Brand Guidelines / Brand Book",
        description:
          "Logo usage, spacing, colors, typography, visual rules, do's & don'ts, brand consistency guide.",
        summary:
          "Create a visual identity by providing detailed brand guidelines for logo usage, color schemes, typography and brand elements.",
        icon: brandGuidelines,
        href: "/services/branding/brand-guidelines",
      },
      {
        title: "Stationery Design",
        description:
          "Business card, letterhead, envelope, email signature, invoice/quotation template.",
        summary:
          "Create a good first impression with branded business stationery, business cards, letterheads, envelopes, and more.",
        icon: stationeryDesign,
        href: "/services/branding/stationery-design",
      },
      {
        title: "Social Media Branding",
        description:
          "Profile/cover designs, social post templates, story templates, highlight covers, ad templates.",
        summary:
          "Develop a consistent and recognizable online brand identity by using consistent templates, profile pictograms, and graphics on social media platforms.",
        icon: socialMediaBranding,
        href: "/services/branding/social-media-branding",
      },
      {
        title: "Website & Digital Branding",
        description:
          "Website visual direction, UI style, buttons/icons, web banners, landing-page branding.",
        summary:
          "Develop a unified digital identity through website branding, with visual elements, typography, colors and digital assets that are associated with your identity.",
        icon: websiteBranding,
        href: "/services/branding/digital-branding",
      },
      {
        title: "Brand Launch & Implementation",
        description:
          "Final asset organization, launch creatives, brand rollout across website/social/print and consistency check.",
        summary:
          "Whether you need help with establishing your visual presence on multiple platforms or creating and editing the assets you'll need for your marketing campaign, we have you covered.",
        icon: brandLaunch,
        href: "/services/branding/brand-launch",
      },
    ],
  },
  {
    slug: "development",
    label: "Development",
    href: "/services/development",
    description:
      "Build high-performance websites and digital platforms tailored for your business growth.",
    image: categoryDevelopment,
    services: [
      {
        title: "Website Development",
        description:
          "Business websites, landing pages, responsive layouts, contact forms, analytics setup.",
        summary:
          "We develop responsive business websites that are engaging and informative, convey your brand message and provide seamless web browsing experience across devices.",
        icon: webDevelopment,
        href: "/services/development/web-development",
      },
      {
        title: "E-Commerce Development",
        description:
          "Online stores, product catalogs, cart & checkout, payment gateways, order management.",
        summary:
          "We provide eCommerce website development solutions that enable businesses to create an online store that is easy to navigate, showcases products, and offers a smooth shopping experience.",
        icon: ecommerceDevelopment,
        href: "/services/development/ecommerce-development",
      },
      {
        title: "CMS Development",
        description:
          "Custom and headless CMS builds, editable pages, content models, user roles, editor training.",
        summary:
          "With our CMS development services, you can easily manage, update and organize the content on your website without having to be an expert in technical matters.",
        icon: cmsDevelopment,
        href: "/services/development/cms-development",
      },
      {
        title: "Frontend Development",
        description:
          "Interfaces built from your designs, responsive layouts, animations, accessibility, speed.",
        summary:
          "We build engaging, responsive frontend interfaces using modern web technologies to ensure your website looks great and works smoothly across devices.",
        icon: frontendDevelopment,
        href: "/services/development/frontend-development",
      },
      {
        title: "Backend & API Development",
        description:
          "Server logic, databases, REST/GraphQL APIs, authentication, third-party integrations.",
        summary:
          "Our backend development and API integration services power your website behind the scenes, managing databases, business logic, user authentication, and communication between applications.",
        icon: backendApi,
        href: "/services/development/backend-api-development",
      },
      {
        title: "Maintenance & Support",
        description:
          "Updates, security patches, backups, uptime monitoring, bug fixes, content changes.",
        summary:
          "Our website maintenance and support services at Ink Pixel Studios ensure your website remains secure, reliable, and functioning smoothly, keeping your business online.",
        icon: websiteMaintenance,
        href: "/services/development/website-maintenance",
      },
    ],
  },
  {
    slug: "marketing",
    label: "Marketing",
    href: "/services/marketing",
    description:
      "Boost your conversions with targeted campaigns, SEO, and powerful social media marketing.",
    image: categoryMarketing,
    services: [
      {
        title: "Social Media Marketing",
        description:
          "Content calendars, post & story creatives, community management, campaigns, monthly reports.",
        summary:
          "Ink Pixel Studios is dedicated to helping businesses create meaningful connections online through innovative social media marketing solutions designed for businesses and their audience.",
        icon: socialMediaMarketing,
        href: "/services/marketing/social-media-marketing",
      },
      {
        title: "Search Engine Optimization (SEO)",
        description:
          "Keyword research, on-page optimization, technical audits, local SEO, ranking reports.",
        summary:
          "Get your website optimized for search engines to boost its visibility, covering keyword research, on page optimization, technical optimization and content optimization.",
        icon: seo,
        href: "/services/marketing/seo",
      },
      {
        title: "Paid Advertising",
        description:
          "Search and social ad campaigns, audience targeting, ad creatives, A/B tests, budget tracking.",
        summary:
          "Connect with target audiences via relevant paid advertising like Google Ads and social media ads based on business goals, reach, frequency, and targets.",
        icon: paidAdvertising,
        href: "/services/marketing/paid-advertising",
      },
      {
        title: "Content Marketing",
        description:
          "Blog articles, website copy, case studies, newsletters, video scripts, content strategy.",
        summary:
          "Engage customers with the right content marketing services, such as blogs, website content, social media and useful brand resources.",
        icon: contentMarketing,
        href: "/services/marketing/content-marketing",
      },
      {
        title: "Email & WhatsApp Marketing",
        description:
          "Campaign design, automated sequences, list segmentation, broadcast messages, reporting.",
        summary:
          "Improve customer relations by engaging them with tailored email marketing and WhatsApp marketing messages, which convey updates and offers and cultivate leads.",
        icon: emailWhatsappMarketing,
        href: "/services/marketing/email-whatsapp-marketing",
      },
      {
        title: "Analytics & Growth Strategy",
        description:
          "Tracking setup, dashboards, funnel & conversion analysis, growth experiments, roadmap.",
        summary:
          "Ink Pixel Studios' data-driven analytics and growth strategy services assist businesses in making intelligent decisions and fostering sustainable growth.",
        icon: analyticsGrowth,
        href: "/services/marketing/analytics-growth-strategy",
      },
    ],
  },
  {
    slug: "software",
    label: "Software",
    href: "/services/software",
    description:
      "Streamline your operations with robust software, CRM systems, and inventory solutions.",
    image: categorySoftware,
    services: [
      {
        title: "Custom Software Development",
        description:
          "Software built around your workflow: requirements, architecture, development, testing, deployment.",
        summary:
          "Ink Pixel Studios specializes in delivering bespoke custom software solutions that enable businesses to streamline their operations, address unique challenges, and boost productivity.",
        icon: customSoftware,
        href: "/services/software/custom-software-development",
      },
      {
        title: "ERP & CRM Systems",
        description:
          "Sales pipelines, customer records, finance, HR & operations modules, reports, user roles.",
        summary:
          "We create bespoke ERP and CRM solutions to streamline processes between departments, centralize business operations and manage customer relationships.",
        icon: erpCrm,
        href: "/services/software/erp-crm-systems",
      },
      {
        title: "POS & Inventory Software",
        description:
          "Point-of-sale apps, barcode scanning, stock tracking, multi-branch inventory, sales reports.",
        summary:
          "The POS and inventory management software streamlines business operations, enabling seamless transactions, inventory tracking, and sales management through a digital system.",
        icon: posInventory,
        href: "/services/software/pos-inventory-software",
      },
      {
        title: "SaaS Product Development",
        description:
          "MVP to launch: multi-tenant setup, subscriptions & billing, admin panels, user onboarding.",
        summary:
          "We develop scalable Software as a Service (SaaS) applications that enable companies to offer digital products and services on cloud-based, easily accessible platforms.",
        icon: saasDevelopment,
        href: "/services/software/saas-development",
      },
      {
        title: "Software Integration & Migration",
        description:
          "API integrations, data migration, legacy system upgrades, cloud moves, data checks.",
        summary:
          "Our software integration and migration services ensure seamless data transfer, link existing systems and support businesses to new platforms with minimal disruption.",
        icon: softwareIntegration,
        href: "/services/software/software-integration-migration",
      },
      {
        title: "QA, Testing & Support",
        description:
          "Manual & automated testing, bug tracking, performance and security checks, release support.",
        summary:
          "Whether it's functional testing and performance testing, compatibility checks, or tracking bugs and providing continuous support, we help minimize technical problems and enhance the user experience.",
        icon: qaTesting,
        href: "/services/software/qa-testing",
      },
    ],
  },
  {
    slug: "applications",
    label: "Applications",
    href: "/services/applications",
    description:
      "Deliver engaging user experiences with intuitive Android and iOS mobile applications.",
    image: categoryApplications,
    services: [
      {
        title: "Web Applications & PWAs",
        description:
          "Dashboards, customer portals, booking systems, installable web apps, offline support.",
        summary:
          "Ink Pixel Studios creates scalable web app development and Progressive Web Apps (PWAs) to assist businesses in providing a seamless digital experience across devices.",
        icon: webApplications,
        href: "/services/applications/web-applications",
      },
      {
        title: "iOS App Development",
        description:
          "Native iPhone & iPad apps, App Store submission, updates for new iOS versions.",
        summary:
          "We create robust and efficient iOS apps optimized for iPhone and iPad, featuring intuitive design, dependable performance, and integration with the Apple ecosystem.",
        icon: iosApp,
        href: "/services/applications/ios-app-development",
      },
      {
        title: "Cross-Platform Apps",
        description:
          "One codebase for iOS & Android, native device features, shared logic, store releases.",
        summary:
          "We're experts in app development across multiple platforms, offering you apps that work on both iOS and Android with a shared codebase as much as possible.",
        icon: crossPlatformApps,
        href: "/services/applications/cross-platform-apps",
      },
      {
        title: "Android App Development",
        description:
          "Native Android apps, Google Play publishing, testing across devices and OS versions.",
        summary:
          "We create custom Android applications that are optimized for performance, usability and user-friendliness on Android devices that have the required compatibility.",
        icon: androidApp,
        href: "/services/applications/android-app-development",
      },
      {
        title: "UI/UX Design for Apps",
        description:
          "User research, wireframes, app flows, interactive prototypes, final screens, design systems.",
        summary:
          "Our UI/UX design for mobile application is focused on intuitive navigation, clear layouts and user journeys to make the applications easier to use.",
        icon: appUiUxDesign,
        href: "/services/applications/app-ui-ux-design",
      },
      {
        title: "App Maintenance & Scaling",
        description:
          "OS updates, crash monitoring, performance tuning, new features, server scaling.",
        summary:
          "Our app scaling solutions can handle growing users, data growth, and changing business requirements without impacting the user experience as your business expands.",
        icon: appMaintenance,
        href: "/services/applications/app-maintenance",
      },
    ],
  },
  {
    slug: "ai-automation",
    label: "AI Automation",
    href: "/services/ai-automation",
    description:
      "Automate business processes and scale faster with cutting-edge AI chatbots and smart systems.",
    image: categoryAiAutomation,
    services: [
      {
        title: "Business Process Automation",
        description:
          "Workflow mapping, automated approvals, data entry & reporting, connections between your tools.",
        summary:
          "We at Ink Pixel Studios aim to make business life easier with custom Business Process Automation (BPA) services that eliminate manual processes, enhance accuracy and boost productivity.",
        icon: businessProcessAutomation,
        href: "/services/ai-automation/business-process-automation",
      },
      {
        title: "AI Chatbots & Virtual Assistants",
        description:
          "Website & WhatsApp chatbots, support assistants, lead capture, answers from your own content.",
        summary:
          "Use intelligent AI chatbots and virtual assistants to automate customer support, answer common questions, and give prompt assistance.",
        icon: aiChatbots,
        href: "/services/ai-automation/ai-chatbots",
      },
      {
        title: "Marketing Automation",
        description:
          "AI-assisted copy & visuals, scheduled posting, personalized emails, campaign automation.",
        summary:
          "Find smart ways to create content, build campaigns and automate repetitive marketing with AI-based content and marketing automation tools.",
        icon: aiMarketingAutomation,
        href: "/services/ai-automation/ai-marketing-automation",
      },
      {
        title: "Document & Data Processing",
        description:
          "Invoice & form data extraction, OCR, data cleaning, classification, automatic reports.",
        summary:
          "Minimize manual workload and process document handling, data extraction, classification and information processing with AI driven data solutions.",
        icon: documentDataProcessing,
        href: "/services/ai-automation/document-data-processing",
      },
      {
        title: "Custom AI Agents & Integrations",
        description:
          "Task-specific AI agents, LLM integrations, internal knowledge assistants, API connections.",
        summary:
          "Create intelligent custom AI agents which can complete specific tasks and communicate with other business tools and software.",
        icon: aiAgents,
        href: "/services/ai-automation/ai-agents",
      },
      {
        title: "AI Consulting & Training",
        description:
          "AI readiness review, use-case planning, tool selection, team workshops & training.",
        summary:
          "We offer AI Strategy Consulting, Automation Planning, Tool Selection, Employee Training, and guidance for integrating AI into existing operations.",
        icon: aiConsulting,
        href: "/services/ai-automation/ai-consulting",
      },
    ],
  },
];
