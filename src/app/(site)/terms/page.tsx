import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { termsAndConditions } from "@/content/legal";
import { pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback.
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: termsAndConditions.name,
    description: termsAndConditions.description,
    path: termsAndConditions.path,
  });
}

export default function TermsPage() {
  return <LegalPage document={termsAndConditions} />;
}
