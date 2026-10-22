import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { NextSteps } from "@/components/sections/contact/NextSteps";
import type { Estimator, ServiceChoice } from "@/components/sections/contact/ProjectForm";
import { Faq } from "@/components/sections/home/Faq";
import { PageSchema } from "@/components/seo/PageSchema";
import { contactPage } from "@/content/contact-page";
import { servicePages, servicePlace } from "@/content/service-pages";
import { serviceCategories } from "@/content/services";
import { breadcrumbSchema, officeSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; the content file's name and description otherwise.
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({ title: contactPage.name, description: contactPage.description, path: "/contact" });
}

// Every service page's cost estimator, so the form can write out the answers a visitor brings
// from one (/contact?service=<service page>&…).
const estimators: Record<string, Estimator> = Object.fromEntries(
  servicePages.flatMap((page) => {
    const place = servicePlace(page.slug);
    if (!place) return [];
    const questions = Object.fromEntries(page.estimator.questions.map(({ id, question }) => [id, question]));
    return [[page.slug, { name: page.name, core: place.core.slug, questions }]];
  }),
);

// The core services as chips, each with its first service's icon.
const services: ServiceChoice[] = serviceCategories.map(({ slug, label, services: items }) => ({
  slug,
  label,
  icon: items[0].icon.src,
}));

// Contact: the hero, the form card (ContactSection), what happens next, and the FAQ. Text in
// src/content/contact-page.ts. No closing call to action: this page is where it leads.
export default function ContactPage() {
  return (
    <>
      <PageSchema path="/contact" items={[breadcrumbSchema([{ name: contactPage.name, path: "/contact" }]), officeSchema()]} />
      <ContactHero />
      <ContactSection services={services} estimators={estimators} />
      <NextSteps />
      <Faq eyebrow={contactPage.faqEyebrow} />
    </>
  );
}
