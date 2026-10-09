import type { ReactNode } from "react";

// Case-study titles from Contentful can mark words with *asterisks*, e.g.
// "About The *Cathy O'Bryan* App": those words show in the coral → crimson gradient.
export function withAccent(text: string): ReactNode {
  const parts = text.split(/\*([^*]+)\*/);
  if (parts.length === 1) return text;
  return parts.map((part, index) =>
    index % 2 ? (
      <span key={index} className="bg-brand-gradient-reverse bg-clip-text text-transparent">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
