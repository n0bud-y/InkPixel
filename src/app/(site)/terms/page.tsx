import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback (stand-in description, issue I9).
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: "Terms",
    description:
      "The terms of use of the Ink Pixel Studios website.",
    path: "/terms",
  });
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <JsonLd items={[breadcrumbSchema([{ name: "Terms", path: "/terms" }])]} />
      <h1 className="text-4xl font-semibold">Terms</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The terms of use (static legal text) must be added before launch.
      </p>
    </div>
  );
}
