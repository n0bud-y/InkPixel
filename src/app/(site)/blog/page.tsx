import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
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
