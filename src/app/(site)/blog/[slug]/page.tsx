import type { Metadata } from "next";

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: slug };
}

export default async function ArticlePage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold">Article: {slug}</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The article template comes in P3-11.
      </p>
    </div>
  );
}
