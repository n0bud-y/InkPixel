import type { ComponentType } from "react";
import { AiAgentsScene } from "./ai-automation/AiAgentsScene";
import { AiConsultingScene } from "./ai-automation/AiConsultingScene";
import { AiContentScene } from "./ai-automation/AiContentScene";
import { ChatbotScene } from "./ai-automation/ChatbotScene";
import { DocumentProcessingScene } from "./ai-automation/DocumentProcessingScene";
import { ProcessAutomationScene } from "./ai-automation/ProcessAutomationScene";
import { AndroidAppScene } from "./applications/AndroidAppScene";
import { AppMaintenanceScene } from "./applications/AppMaintenanceScene";
import { AppUiUxScene } from "./applications/AppUiUxScene";
import { CrossPlatformScene } from "./applications/CrossPlatformScene";
import { IosAppScene } from "./applications/IosAppScene";
import { WebAppsScene } from "./applications/WebAppsScene";
import { BrandGuidelinesScene } from "./branding/BrandGuidelinesScene";
import { BrandIdentityScene } from "./branding/BrandIdentityScene";
import { BrandLaunchScene } from "./branding/BrandLaunchScene";
import { DigitalBrandingScene } from "./branding/DigitalBrandingScene";
import { SocialBrandingScene } from "./branding/SocialBrandingScene";
import { StationeryScene } from "./branding/StationeryScene";
import { BackendApiScene } from "./development/BackendApiScene";
import { CmsScene } from "./development/CmsScene";
import { EcommerceScene } from "./development/EcommerceScene";
import { FrontendScene } from "./development/FrontendScene";
import { MaintenanceScene } from "./development/MaintenanceScene";
import { WebDevelopmentScene } from "./development/WebDevelopmentScene";
import { AnalyticsGrowthScene } from "./marketing/AnalyticsGrowthScene";
import { ContentMarketingScene } from "./marketing/ContentMarketingScene";
import { EmailWhatsappScene } from "./marketing/EmailWhatsappScene";
import { PaidAdsScene } from "./marketing/PaidAdsScene";
import { SeoScene } from "./marketing/SeoScene";
import { SocialMediaMarketingScene } from "./marketing/SocialMediaMarketingScene";
import { CustomSoftwareScene } from "./software/CustomSoftwareScene";
import { ErpCrmScene } from "./software/ErpCrmScene";
import { IntegrationMigrationScene } from "./software/IntegrationMigrationScene";
import { PosInventoryScene } from "./software/PosInventoryScene";
import { QaTestingScene } from "./software/QaTestingScene";
import { SaasScene } from "./software/SaasScene";

// Each service page's hero illustration (SceneHero), by the service's slug: all 36. A service
// without one (e.g. a new service) falls back to the previous hero (ServiceHero).
export const serviceScenes: Record<string, ComponentType> = {
  // Branding
  "brand-identity-logo-design": BrandIdentityScene,
  "brand-guidelines": BrandGuidelinesScene,
  "stationery-design": StationeryScene,
  "social-media-branding": SocialBrandingScene,
  "digital-branding": DigitalBrandingScene,
  "brand-launch": BrandLaunchScene,
  // Development
  "web-development": WebDevelopmentScene,
  "ecommerce-development": EcommerceScene,
  "cms-development": CmsScene,
  "frontend-development": FrontendScene,
  "backend-api-development": BackendApiScene,
  "website-maintenance": MaintenanceScene,
  // Marketing
  "social-media-marketing": SocialMediaMarketingScene,
  seo: SeoScene,
  "paid-advertising": PaidAdsScene,
  "content-marketing": ContentMarketingScene,
  "email-whatsapp-marketing": EmailWhatsappScene,
  "analytics-growth-strategy": AnalyticsGrowthScene,
  // Software
  "custom-software-development": CustomSoftwareScene,
  "erp-crm-systems": ErpCrmScene,
  "pos-inventory-software": PosInventoryScene,
  "saas-development": SaasScene,
  "software-integration-migration": IntegrationMigrationScene,
  "qa-testing": QaTestingScene,
  // Applications
  "web-applications": WebAppsScene,
  "ios-app-development": IosAppScene,
  "cross-platform-apps": CrossPlatformScene,
  "android-app-development": AndroidAppScene,
  "app-ui-ux-design": AppUiUxScene,
  "app-maintenance": AppMaintenanceScene,
  // AI Automation
  "business-process-automation": ProcessAutomationScene,
  "ai-chatbots": ChatbotScene,
  "ai-marketing-automation": AiContentScene,
  "document-data-processing": DocumentProcessingScene,
  "ai-agents": AiAgentsScene,
  "ai-consulting": AiConsultingScene,
};
