import type { Metadata } from "next";
import { ProductListing } from "@/components/products/ProductListing";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { PageSchema } from "@/components/seo/PageSchema";
import { productsPage } from "@/content/products-page";
import { getProducts, type ProductSummary } from "@/contentful/queries/products";
import { breadcrumbSchema, itemListSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; the content file's name and description otherwise.
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({ title: productsPage.name, description: productsPage.description, path: "/products" });
}

// "Products": every product from Contentful (ProductListing), then the home page's closing call
// to action. If Contentful is down, the list is empty.
export default async function ProductsPage() {
  let products: ProductSummary[] = [];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Products page: could not load the products.", error);
  }

  return (
    <>
      <PageSchema
        path="/products"
        page={{ type: "CollectionPage", title: productsPage.name, description: productsPage.description }}
        items={[
          itemListSchema(
            productsPage.name,
            products.map(({ name, href }) => ({ name, path: href })),
          ),
          breadcrumbSchema([{ name: productsPage.name, path: "/products" }]),
        ]}
      />
      <ProductListing products={products} />
      <ContactCta />
    </>
  );
}
