import { serviceCategories, type Service, type ServiceCategory } from "@/content/services";

/** A core service's sub-services by the last part of their address (as in src/content/packages.ts). */
export function subServicesOf(core: string): { category: ServiceCategory; bySlug: Map<string, Service> } | null {
  const category = serviceCategories.find((item) => item.slug === core);
  if (!category) return null;
  return {
    category,
    bySlug: new Map(category.services.map((service) => [service.href.split("/").pop() ?? service.href, service])),
  };
}
