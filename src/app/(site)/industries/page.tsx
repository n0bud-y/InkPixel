import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Industries" };

export default function IndustriesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
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
