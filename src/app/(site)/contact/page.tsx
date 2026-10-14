import type { Metadata } from "next";
import { PageSchema } from "@/components/seo/PageSchema";
import { breadcrumbSchema, officeSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback (stand-in description, issue I9).
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: "Contact",
    description:
      "Tell Ink Pixel Studios about your project. Email info@inkpixelstudios.com or visit our office on Shahra-e-Faisal, Karachi; we reply within a working day.",
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <PageSchema path="/contact" items={[breadcrumbSchema([{ name: "Contact", path: "/contact" }]), officeSchema()]} />
      <h1 className="text-4xl font-semibold">Contact</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The contact form comes in P3-14; leads are emailed to the sales
        inbox (P3-15).
      </p>
    </div>
  );
}
