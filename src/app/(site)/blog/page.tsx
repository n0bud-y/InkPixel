import type { Metadata } from "next";
import Link from "next/link";
import { PageSchema } from "@/components/seo/PageSchema";
import { breadcrumbSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback (stand-in description, issue I9).
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: "Blog",
    description:
      "Articles from the Ink Pixel Studios team on design, development, product, and growth.",
    path: "/blog",
  });
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <PageSchema path="/blog" items={[breadcrumbSchema([{ name: "Blog", path: "/blog" }])]} />
      <h1 className="text-4xl font-semibold">Blog</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. Articles are listed from Contentful in P3-11.
      </p>
      <ul className="mt-6 space-y-2">
        <li>
          <Link href="/blog/example" className="underline">
            Example article
          </Link>
        </li>
        <li>
          <Link href="/blog/category/example" className="underline">
            Example category
          </Link>
        </li>
      </ul>
    </div>
  );
}
