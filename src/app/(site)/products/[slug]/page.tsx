import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyHero } from "@/components/case-studies/CaseStudyHero";
import { PageSections } from "@/components/case-studies/PageSections";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { PageSchema } from "@/components/seo/PageSchema";
import { productsPage } from "@/content/products-page";
import { getProduct, getProducts, type Product } from "@/contentful/queries/products";
import { breadcrumbSchema, pageMetadata, productSchema, toShareImage } from "@/lib/seo";

// Sections that use the design's larger image, by product (as on the case study pages).
const largerImage: Record<string, string[]> = { "terminal-gateway-crm": ["The Challenge"] };

// Meta title, description, canonical URL, and share image: the product's SEO entry in Contentful
// (its title used as typed), or the product's name, excerpt, address, and hero image.
function seoOf(product: Product) {
  const { seo } = product;
  return {
    title: seo.title ? { absolute: seo.title } : product.name,
    description: seo.description ?? product.excerpt,
    path: `/products/${product.slug}`,
    canonical: seo.canonical,
    image: toShareImage(seo.image ?? product.heroImage),
  };
}

// Every published product is built ahead of time; one published later renders on its first
// visit and is then cached like the rest.
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) return {};
  return pageMetadata({ ...seoOf(product), noIndex: product.seo.noIndex });
}

// A product from Contentful: the hero, its sections in order (alternating navy and white,
// starting with navy), then the closing call to action. Built like a case study's page.
export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const seo = seoOf(product);

  return (
    <>
      <PageSchema
        path={seo.path}
        page={{ type: "WebPage", title: seo.title, description: seo.description }}
        custom={product.seo.jsonLd}
        items={[
          breadcrumbSchema([
            { name: productsPage.name, path: "/products" },
            { name: product.name, path: seo.path },
          ]),
          productSchema({ name: product.name, description: seo.description, path: seo.path, image: seo.image.url }),
        ]}
      />
      <CaseStudyHero
        layout={product.heroLayout}
        eyebrow={product.heroEyebrow}
        heading={product.heroHeading}
        text={product.heroText}
        button={product.heroButton}
        image={product.heroImage}
        layers={product.heroLayers}
        client={product.logo ? { name: product.name, logo: product.logo } : null}
      />
      <PageSections sections={product.sections} largerImage={largerImage[product.slug] ?? []} />
      <ContactCta />
    </>
  );
}
