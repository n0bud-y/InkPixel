import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback (stand-in description, issue I9).
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: "Services",
    description:
      "Branding, web and app development, custom software, marketing, and AI automation: the services Ink Pixel Studios offers, from first idea to launch.",
    path: "/services",
  });
}

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <JsonLd items={[breadcrumbSchema([{ name: "Services", path: "/services" }])]} />
      <h1 className="text-4xl font-semibold">Services</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. Services are listed from Contentful in P3-07.
      </p>
      <Link href="/services/web-development" className="mt-6 inline-block underline">
        Web Development
      </Link>
    </div>
  );
}
