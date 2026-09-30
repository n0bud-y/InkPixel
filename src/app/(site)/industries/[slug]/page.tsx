import type { Metadata } from "next";

export async function generateMetadata(
  props: PageProps<"/industries/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: slug };
}

export default async function IndustryPage(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold">Industry: {slug}</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. Industry details and related case studies come in P3-08.
      </p>
    </div>
  );
}
