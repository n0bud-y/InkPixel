import type { Metadata } from "next";

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  return { title: slug };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <h1 className="text-4xl font-semibold">Service: {slug}</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. Service details come from Contentful in P3-07.
      </p>
    </div>
  );
}
