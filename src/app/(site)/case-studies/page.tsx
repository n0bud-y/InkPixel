import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/contentful/queries/case-studies";

export const metadata: Metadata = { title: "Case studies" };

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
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
