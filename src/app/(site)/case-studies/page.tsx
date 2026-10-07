import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Case studies" };

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <h1 className="text-4xl font-semibold">Case studies</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The filterable listing comes in P3-09.
      </p>
      <div className="mt-8 flex flex-col gap-4">
        <Link href="/case-studies/gulbaan" className="inline-block text-lg font-medium text-coral hover:underline">
          → Gulbaan Case Study
        </Link>
      </div>
    </div>
  );
}
