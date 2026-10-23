import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal/LegalPage";
import { refundPolicy } from "@/content/legal";
import { pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback.
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: refundPolicy.name,
    description: refundPolicy.description,
    path: refundPolicy.path,
  });
}

export default function RefundPolicyPage() {
  return <LegalPage document={refundPolicy} />;
}
