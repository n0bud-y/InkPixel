import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { features } from "@/lib/site";

// Every /blog page (listing, posts, categories) shows 404 while the blog is switched off
// (`features.blog` in src/lib/site.ts).
export default function BlogLayout({ children }: { children: ReactNode }) {
  if (!features.blog) notFound();
  return children;
}
