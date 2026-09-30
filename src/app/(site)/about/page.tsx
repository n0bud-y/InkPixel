import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold">About</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. Story, leadership, awards, and offices come in P3-13.
      </p>
    </div>
  );
}
