import type { Graph, Thing } from "schema-dts";

// Structured data for search engines (schema.org JSON-LD), built with the helpers in
// src/lib/seo.ts. "<" is escaped so no text can end the script tag (Next.js JSON-LD guide).
export function JsonLd({ items }: { items: Thing[] }) {
  const graph: Graph = { "@context": "https://schema.org", "@graph": items };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
