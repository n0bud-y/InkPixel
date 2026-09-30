import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold">Services</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. Services are listed from Contentful in P3-07.
      </p>
      <Link href="/services/example" className="mt-6 inline-block underline">
        Example service
      </Link>
    </div>
  );
}
