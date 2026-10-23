import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { privacyPolicy } from "@/content/legal";
import { pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback.
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: privacyPolicy.name,
    description: privacyPolicy.description,
    path: privacyPolicy.path,
  });
}

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicy} />;
}
