import type { Metadata } from "next";

export async function generateMetadata(
  props: PageProps<"/blog/category/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: `Category: ${slug}` };
}

export default async function CategoryPage(props: PageProps<"/blog/category/[slug]">) {
  const { slug } = await props.params;
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <h1 className="text-4xl font-semibold">Category: {slug}</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The category archive comes in P3-11.
      </p>
    </div>
  );
}
