import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold">{siteConfig.name}</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder home page. Sections come from Contentful in Phase 3.
      </p>
    </div>
  );
}
