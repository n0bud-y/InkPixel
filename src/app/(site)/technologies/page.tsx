import type { Metadata } from "next";

export const metadata: Metadata = { title: "Technologies" };

export default function TechnologiesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <h1 className="text-4xl font-semibold">Technologies</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. Static content; the design for this page comes later.
      </p>
    </div>
  );
}
