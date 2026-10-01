import type { Metadata } from "next";

export async function generateMetadata(
  props: PageProps<"/case-studies/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: slug };
}

export default async function CaseStudyPage(props: PageProps<"/case-studies/[slug]">) {
  const { slug } = await props.params;
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <h1 className="text-4xl font-semibold">Case study: {slug}</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The case study template comes in P3-10.
      </p>
    </div>
  );
}
