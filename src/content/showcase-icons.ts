// The previous, more detailed service icons, kept for the home page's "Building The Future of
// Digital Products" tabs and the core service pages' service cards (project head decision,
// 22 Oct 2026). The menus and the Contact form use the minimal icons in services.ts.
import type { StaticImageData } from "next/image";
import aiAgents from "@/assets/images/icons/showcase/ai-automation/ai-agents.svg";
import aiChatbots from "@/assets/images/icons/showcase/ai-automation/ai-chatbots.svg";
import aiConsulting from "@/assets/images/icons/showcase/ai-automation/ai-consulting.svg";
import aiMarketingAutomation from "@/assets/images/icons/showcase/ai-automation/ai-marketing-automation.svg";
import analyticsGrowth from "@/assets/images/icons/showcase/marketing/analytics-growth-strategy.svg";
import androidApp from "@/assets/images/icons/showcase/applications/android-app-development.svg";
import appMaintenance from "@/assets/images/icons/showcase/applications/app-maintenance.svg";
import appUiUxDesign from "@/assets/images/icons/showcase/applications/app-ui-ux-design.svg";
import backendApi from "@/assets/images/icons/showcase/development/backend-api-development.svg";
import brandGuidelines from "@/assets/images/icons/showcase/branding/brand-guidelines-brand-book.png";
import brandIdentity from "@/assets/images/icons/showcase/branding/brand-identity-logo-design.png";
import brandLaunch from "@/assets/images/icons/showcase/branding/brand-launch-implementation.png";
import businessProcessAutomation from "@/assets/images/icons/showcase/ai-automation/business-process-automation.svg";
import cmsDevelopment from "@/assets/images/icons/showcase/development/cms-development.svg";
import contentMarketing from "@/assets/images/icons/showcase/marketing/content-marketing.svg";
import crossPlatformApps from "@/assets/images/icons/showcase/applications/cross-platform-apps.svg";
import customSoftware from "@/assets/images/icons/showcase/software/custom-software-development.svg";
import documentDataProcessing from "@/assets/images/icons/showcase/ai-automation/document-data-processing.svg";
import ecommerceDevelopment from "@/assets/images/icons/showcase/development/ecommerce-development.svg";
import emailWhatsappMarketing from "@/assets/images/icons/showcase/marketing/email-whatsapp-marketing.svg";
import erpCrm from "@/assets/images/icons/showcase/software/erp-crm-systems.svg";
import frontendDevelopment from "@/assets/images/icons/showcase/development/frontend-development.svg";
import iosApp from "@/assets/images/icons/showcase/applications/ios-app-development.svg";
import paidAdvertising from "@/assets/images/icons/showcase/marketing/paid-advertising.svg";
import posInventory from "@/assets/images/icons/showcase/software/pos-inventory-software.svg";
import qaTesting from "@/assets/images/icons/showcase/software/qa-testing.svg";
import saasDevelopment from "@/assets/images/icons/showcase/software/saas-development.svg";
import seo from "@/assets/images/icons/showcase/marketing/seo.svg";
import socialMediaBranding from "@/assets/images/icons/showcase/branding/social-media-branding.png";
import socialMediaMarketing from "@/assets/images/icons/showcase/marketing/social-media-marketing.svg";
import softwareIntegration from "@/assets/images/icons/showcase/software/software-integration-migration.svg";
import stationeryDesign from "@/assets/images/icons/showcase/branding/stationery-design.png";
import webApplications from "@/assets/images/icons/showcase/applications/web-applications.svg";
import webDevelopment from "@/assets/images/icons/showcase/development/web-development.svg";
import websiteBranding from "@/assets/images/icons/showcase/branding/website-digital-branding.png";
import websiteMaintenance from "@/assets/images/icons/showcase/development/website-maintenance.svg";
import type { Service } from "./services";

// By the service's page address.
const showcaseIcons: Record<string, StaticImageData> = {
  "/services/branding/brand-identity-logo-design": brandIdentity,
  "/services/branding/brand-guidelines": brandGuidelines,
  "/services/branding/stationery-design": stationeryDesign,
  "/services/branding/social-media-branding": socialMediaBranding,
  "/services/branding/digital-branding": websiteBranding,
  "/services/branding/brand-launch": brandLaunch,
  "/services/development/web-development": webDevelopment,
  "/services/development/ecommerce-development": ecommerceDevelopment,
  "/services/development/cms-development": cmsDevelopment,
  "/services/development/frontend-development": frontendDevelopment,
  "/services/development/backend-api-development": backendApi,
  "/services/development/website-maintenance": websiteMaintenance,
  "/services/marketing/social-media-marketing": socialMediaMarketing,
  "/services/marketing/seo": seo,
  "/services/marketing/paid-advertising": paidAdvertising,
  "/services/marketing/content-marketing": contentMarketing,
  "/services/marketing/email-whatsapp-marketing": emailWhatsappMarketing,
  "/services/marketing/analytics-growth-strategy": analyticsGrowth,
  "/services/software/custom-software-development": customSoftware,
  "/services/software/erp-crm-systems": erpCrm,
  "/services/software/pos-inventory-software": posInventory,
  "/services/software/saas-development": saasDevelopment,
  "/services/software/software-integration-migration": softwareIntegration,
  "/services/software/qa-testing": qaTesting,
  "/services/applications/web-applications": webApplications,
  "/services/applications/ios-app-development": iosApp,
  "/services/applications/cross-platform-apps": crossPlatformApps,
  "/services/applications/android-app-development": androidApp,
  "/services/applications/app-ui-ux-design": appUiUxDesign,
  "/services/applications/app-maintenance": appMaintenance,
  "/services/ai-automation/business-process-automation": businessProcessAutomation,
  "/services/ai-automation/ai-chatbots": aiChatbots,
  "/services/ai-automation/ai-marketing-automation": aiMarketingAutomation,
  "/services/ai-automation/document-data-processing": documentDataProcessing,
  "/services/ai-automation/ai-agents": aiAgents,
  "/services/ai-automation/ai-consulting": aiConsulting,
};

/** The services with their previous icons (a service without one keeps its own). */
export const withShowcaseIcons = (services: Service[]): Service[] =>
  services.map((service) => ({ ...service, icon: showcaseIcons[service.href] ?? service.icon }));
