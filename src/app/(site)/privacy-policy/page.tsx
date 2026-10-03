import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <h1 className="text-4xl font-semibold">Privacy policy</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The privacy policy (static legal text) must be added before launch.
      </p>
    </div>
  );
}
