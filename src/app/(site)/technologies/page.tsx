import type { Metadata } from "next";
import { PageSchema } from "@/components/seo/PageSchema";
import { breadcrumbSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback (stand-in description, issue I9).
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: "Technologies",
    description:
      "The technologies Ink Pixel Studios builds with: web and mobile frameworks, cloud platforms, databases, and AI tools.",
    path: "/technologies",
  });
}

export default function TechnologiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <PageSchema path="/technologies" items={[breadcrumbSchema([{ name: "Technologies", path: "/technologies" }])]} />
      <h1 className="text-4xl font-semibold">Technologies</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. Static content; the design for this page comes later.
      </p>
    </div>
  );
}
