import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <h1 className="text-4xl font-semibold">Contact</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The contact form comes in P3-14; leads are emailed to the sales
        inbox (P3-15).
      </p>
    </div>
  );
}
