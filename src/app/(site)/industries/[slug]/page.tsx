import type { Metadata } from "next";
import { PageSchema } from "@/components/seo/PageSchema";
import { industries } from "@/content/industries";
import { breadcrumbSchema, pageMetadataFromCms, titleFromSlug } from "@/lib/seo";

// The industry's name and description from src/content/industries.ts, for the metadata of this
// placeholder page (the page itself comes in P3-08).
function industryFor(slug: string) {
  const industry = industries.find((item) => item.slug === slug);
  const name = industry?.label ?? titleFromSlug(slug);
  return {
    name,
    description: industry?.description ?? `${name}: software and digital products by Ink Pixel Studios.`,
  };
}

export async function generateMetadata(
  props: PageProps<"/industries/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const { name, description } = industryFor(slug);
  // A Page SEO entry in Contentful for this address takes over, if editors add one.
  return pageMetadataFromCms({ title: name, description, path: `/industries/${slug}` });
}

export default async function IndustryPage(props: PageProps<"/industries/[slug]">) {
  const { slug } = await props.params;
  const { name } = industryFor(slug);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <PageSchema
        path={`/industries/${slug}`}
        items={[
          breadcrumbSchema([
            { name: "Industries", path: "/industries" },
            { name, path: `/industries/${slug}` },
          ]),
        ]}
      />
      <h1 className="text-4xl font-semibold">Industry: {slug}</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. Industry details and related case studies come in P3-08.
      </p>
    </div>
  );
}
