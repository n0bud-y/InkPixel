import type { Metadata } from "next";
import { PageSchema } from "@/components/seo/PageSchema";
import { breadcrumbSchema, pageMetadataFromCms, titleFromSlug } from "@/lib/seo";

// Until the category archive reads the category from Contentful (P3-11), its name comes from
// the address. A Page SEO entry in Contentful for this address takes over, if editors add one.
export async function generateMetadata(
  props: PageProps<"/blog/category/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const name = titleFromSlug(slug);
  return pageMetadataFromCms({
    title: `Category: ${name}`,
    description: `Articles about ${name.toLowerCase()} from the Ink Pixel Studios blog.`,
    path: `/blog/category/${slug}`,
  });
}

export default async function CategoryPage(props: PageProps<"/blog/category/[slug]">) {
  const { slug } = await props.params;
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 pb-16">
      <PageSchema
        path={`/blog/category/${slug}`}
        items={[
          breadcrumbSchema([
            { name: "Blog", path: "/blog" },
            { name: `Category: ${titleFromSlug(slug)}`, path: `/blog/category/${slug}` },
          ]),
        ]}
      />
      <h1 className="text-4xl font-semibold">Category: {slug}</h1>
      <p className="mt-4 text-foreground/70">
        Placeholder. The category archive comes in P3-11.
      </p>
    </div>
  );
}
