import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback (stand-in description, issue I9).
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: "Industries",
    description:
      "How Ink Pixel Studios builds software and digital products for fintech, healthcare, real estate, logistics, and e-commerce businesses.",
    path: "/industries",
  });
}

export default function IndustriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <JsonLd items={[breadcrumbSchema([{ name: "Industries", path: "/industries" }])]} />
      <h1 className="text-4xl font-semibold">Industries</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. Industries are listed from Contentful in P3-08.
      </p>
      <Link href="/industries/example" className="mt-6 inline-block underline">
        Example industry
      </Link>
    </div>
  );
}
