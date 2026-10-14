import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/contentful/queries/case-studies";
import { PageSchema } from "@/components/seo/PageSchema";
import { breadcrumbSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; this is the fallback (stand-in description, issue I9).
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({
    title: "Case studies",
    description:
      "Projects by Ink Pixel Studios: the challenge, what we built, and the results, from e-commerce sites and CRM platforms to mobile apps.",
    path: "/case-studies",
  });
}

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <PageSchema path="/case-studies" items={[breadcrumbSchema([{ name: "Case studies", path: "/case-studies" }])]} />
      <h1 className="text-4xl font-semibold">Case studies</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The filterable listing comes in P3-09.
      </p>
      {caseStudies.length > 0 && (
        <ul className="mt-8 flex flex-col gap-4">
          {caseStudies.map((caseStudy) => (
            <li key={caseStudy.slug}>
              <Link href={caseStudy.href} className="inline-block text-lg font-medium text-coral hover:underline">
                → {caseStudy.title} Case Study
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
