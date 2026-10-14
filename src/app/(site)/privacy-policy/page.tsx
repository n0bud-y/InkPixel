import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback (stand-in description, issue I9).
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: "Privacy policy",
    description:
      "How Ink Pixel Studios collects, uses, and protects personal data on this website.",
    path: "/privacy-policy",
  });
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <JsonLd items={[breadcrumbSchema([{ name: "Privacy policy", path: "/privacy-policy" }])]} />
      <h1 className="text-4xl font-semibold">Privacy policy</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The privacy policy (static legal text) must be added before launch.
      </p>
    </div>
  );
}
