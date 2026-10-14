// Service categories and their services. Static content: edited here, not in Contentful.
// Used by the home page "Building The Future of Digital Products" section and the header's
// Services mega menu; reusable for the /services pages later. A category with no services
// shows a "coming soon" panel on the home page.
//
// PLACEHOLDER (issue I7): the descriptions outside Branding are stand-ins, and their icons
// were drawn in-house (src/assets/images/icons/<category>/); replace both when the real copy
// and the designer's icons arrive. Each service links to its own page, /services/<slug>; only
// Website Development is built so far (P3-07).
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
import brandGuidelines from "@/assets/images/icons/branding/brand-guidelines-brand-book.png";
import brandIdentity from "@/assets/images/icons/branding/brand-identity-logo-design.png";
import brandLaunch from "@/assets/images/icons/branding/brand-launch-implementation.png";
import socialMediaBranding from "@/assets/images/icons/branding/social-media-branding.png";
import stationeryDesign from "@/assets/images/icons/branding/stationery-design.png";
import websiteBranding from "@/assets/images/icons/branding/website-digital-branding.png";
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

export type Service = {
  title: string;
  description: string;
  icon: StaticImageData;
  /** The service's own page. */
  href: string;
};

export type ServiceCategory = {
  /** URL-safe id, also used for the tab. */
  slug: string;
  label: string;
  services: Service[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "branding",
    label: "Branding",
    services: [
      {
        title: "Brand Identity / Logo Design",
        description:
          "Primary logo, secondary logo, icon/mark, logo variations, black & white versions.",
        icon: brandIdentity,
        href: "/services/brand-identity-logo-design",
      },
      {
        title: "Brand Guidelines / Brand Book",
        description:
          "Logo usage, spacing, colors, typography, visual rules, do's & don'ts, brand consistency guide.",
        icon: brandGuidelines,
        href: "/services/brand-guidelines",
      },
      {
        title: "Stationery Design",
        description:
          "Business card, letterhead, envelope, email signature, invoice/quotation template.",
        icon: stationeryDesign,
        href: "/services/stationery-design",
      },
      {
        title: "Social Media Branding",
        description:
          "Profile/cover designs, social post templates, story templates, highlight covers, ad templates.",
        icon: socialMediaBranding,
        href: "/services/social-media-branding",
      },
      {
        title: "Website & Digital Branding",
        description:
          "Website visual direction, UI style, buttons/icons, web banners, landing-page branding.",
        icon: websiteBranding,
        href: "/services/digital-branding",
      },
      {
        title: "Brand Launch & Implementation",
        description:
          "Final asset organization, launch creatives, brand rollout across website/social/print and consistency check.",
        icon: brandLaunch,
        href: "/services/brand-launch",
      },
    ],
  },
  {
    slug: "development",
    label: "Development",
    services: [
      {
        title: "Website Development",
        description:
          "Business websites, landing pages, responsive layouts, contact forms, analytics setup.",
        icon: webDevelopment,
        href: "/services/web-development",
      },
      {
        title: "E-Commerce Development",
        description:
          "Online stores, product catalogs, cart & checkout, payment gateways, order management.",
        icon: ecommerceDevelopment,
        href: "/services/ecommerce-development",
      },
      {
        title: "CMS Development",
        description:
          "Custom and headless CMS builds, editable pages, content models, user roles, editor training.",
        icon: cmsDevelopment,
        href: "/services/cms-development",
      },
      {
        title: "Frontend Development",
        description:
          "Interfaces built from your designs, responsive layouts, animations, accessibility, speed.",
        icon: frontendDevelopment,
        href: "/services/frontend-development",
      },
      {
        title: "Backend & API Development",
        description:
          "Server logic, databases, REST/GraphQL APIs, authentication, third-party integrations.",
        icon: backendApi,
        href: "/services/backend-api-development",
      },
      {
        title: "Maintenance & Support",
        description:
          "Updates, security patches, backups, uptime monitoring, bug fixes, content changes.",
        icon: websiteMaintenance,
        href: "/services/website-maintenance",
      },
    ],
  },
  {
    slug: "marketing",
    label: "Marketing",
    services: [
      {
        title: "Social Media Marketing",
        description:
          "Content calendars, post & story creatives, community management, campaigns, monthly reports.",
        icon: socialMediaMarketing,
        href: "/services/social-media-marketing",
      },
      {
        title: "Search Engine Optimization (SEO)",
        description:
          "Keyword research, on-page optimization, technical audits, local SEO, ranking reports.",
        icon: seo,
        href: "/services/seo",
      },
      {
        title: "Paid Advertising",
        description:
          "Search and social ad campaigns, audience targeting, ad creatives, A/B tests, budget tracking.",
        icon: paidAdvertising,
        href: "/services/paid-advertising",
      },
      {
        title: "Content Marketing",
        description:
          "Blog articles, website copy, case studies, newsletters, video scripts, content strategy.",
        icon: contentMarketing,
        href: "/services/content-marketing",
      },
      {
        title: "Email & WhatsApp Marketing",
        description:
          "Campaign design, automated sequences, list segmentation, broadcast messages, reporting.",
        icon: emailWhatsappMarketing,
        href: "/services/email-whatsapp-marketing",
      },
      {
        title: "Analytics & Growth Strategy",
        description:
          "Tracking setup, dashboards, funnel & conversion analysis, growth experiments, roadmap.",
        icon: analyticsGrowth,
        href: "/services/analytics-growth-strategy",
      },
    ],
  },
  {
    slug: "software",
    label: "Software",
    services: [
      {
        title: "Custom Software Development",
        description:
          "Software built around your workflow: requirements, architecture, development, testing, deployment.",
        icon: customSoftware,
        href: "/services/custom-software-development",
      },
      {
        title: "ERP & CRM Systems",
        description:
          "Sales pipelines, customer records, finance, HR & operations modules, reports, user roles.",
        icon: erpCrm,
        href: "/services/erp-crm-systems",
      },
      {
        title: "POS & Inventory Software",
        description:
          "Point-of-sale apps, barcode scanning, stock tracking, multi-branch inventory, sales reports.",
        icon: posInventory,
        href: "/services/pos-inventory-software",
      },
      {
        title: "SaaS Product Development",
        description:
          "MVP to launch: multi-tenant setup, subscriptions & billing, admin panels, user onboarding.",
        icon: saasDevelopment,
        href: "/services/saas-development",
      },
      {
        title: "Software Integration & Migration",
        description:
          "API integrations, data migration, legacy system upgrades, cloud moves, data checks.",
        icon: softwareIntegration,
        href: "/services/software-integration-migration",
      },
      {
        title: "QA, Testing & Support",
        description:
          "Manual & automated testing, bug tracking, performance and security checks, release support.",
        icon: qaTesting,
        href: "/services/qa-testing",
      },
    ],
  },
  {
    slug: "applications",
    label: "Applications",
    services: [
      {
        title: "Web Applications & PWAs",
        description:
          "Dashboards, customer portals, booking systems, installable web apps, offline support.",
        icon: webApplications,
        href: "/services/web-applications",
      },
      {
        title: "iOS App Development",
        description:
          "Native iPhone & iPad apps, App Store submission, updates for new iOS versions.",
        icon: iosApp,
        href: "/services/ios-app-development",
      },
      {
        title: "Cross-Platform Apps",
        description:
          "One codebase for iOS & Android, native device features, shared logic, store releases.",
        icon: crossPlatformApps,
        href: "/services/cross-platform-apps",
      },
      {
        title: "Android App Development",
        description:
          "Native Android apps, Google Play publishing, testing across devices and OS versions.",
        icon: androidApp,
        href: "/services/android-app-development",
      },
      {
        title: "UI/UX Design for Apps",
        description:
          "User research, wireframes, app flows, interactive prototypes, final screens, design systems.",
        icon: appUiUxDesign,
        href: "/services/app-ui-ux-design",
      },
      {
        title: "App Maintenance & Scaling",
        description:
          "OS updates, crash monitoring, performance tuning, new features, server scaling.",
        icon: appMaintenance,
        href: "/services/app-maintenance",
      },
    ],
  },
  {
    slug: "ai-automation",
    label: "AI Automation",
    services: [
      {
        title: "Business Process Automation",
        description:
          "Workflow mapping, automated approvals, data entry & reporting, connections between your tools.",
        icon: businessProcessAutomation,
        href: "/services/business-process-automation",
      },
      {
        title: "AI Chatbots & Virtual Assistants",
        description:
          "Website & WhatsApp chatbots, support assistants, lead capture, answers from your own content.",
        icon: aiChatbots,
        href: "/services/ai-chatbots",
      },
      {
        title: "AI Content & Marketing Automation",
        description:
          "AI-assisted copy & visuals, scheduled posting, personalized emails, campaign automation.",
        icon: aiMarketingAutomation,
        href: "/services/ai-marketing-automation",
      },
      {
        title: "Document & Data Processing",
        description:
          "Invoice & form data extraction, OCR, data cleaning, classification, automatic reports.",
        icon: documentDataProcessing,
        href: "/services/document-data-processing",
      },
      {
        title: "Custom AI Agents & Integrations",
        description:
          "Task-specific AI agents, LLM integrations, internal knowledge assistants, API connections.",
        icon: aiAgents,
        href: "/services/ai-agents",
      },
      {
        title: "AI Consulting & Training",
        description:
          "AI readiness review, use-case planning, tool selection, team workshops & training.",
        icon: aiConsulting,
        href: "/services/ai-consulting",
      },
    ],
  },
];
