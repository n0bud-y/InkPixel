import type { Metadata } from "next";
import { WorkListing } from "@/components/case-studies/WorkListing";
import { ContactCta } from "@/components/sections/home/ContactCta";
import { PageSchema } from "@/components/seo/PageSchema";
import { caseStudiesPage } from "@/content/case-studies-page";
import { getCaseStudies, type CaseStudySummary } from "@/contentful/queries/case-studies";
import { breadcrumbSchema, pageMetadataFromCms } from "@/lib/seo";

// From the page's Page SEO entry in Contentful; the content file's name and description otherwise.
export function generateMetadata(): Promise<Metadata> {
  return pageMetadataFromCms({ title: caseStudiesPage.name, description: caseStudiesPage.description, path: "/case-studies" });
}

// "Our Work": every case study from Contentful, with the service pills (WorkListing), then the
// home page's closing call to action. If Contentful is down, the list is empty.
export default async function CaseStudiesPage() {
  let caseStudies: CaseStudySummary[] = [];
  try {
    caseStudies = await getCaseStudies();
  } catch (error) {
    console.error("Case studies page: could not load the case studies.", error);
  }

  return (
    <>
      <PageSchema
        path="/case-studies"
        page={{ type: "CollectionPage", title: caseStudiesPage.name, description: caseStudiesPage.description }}
        items={[breadcrumbSchema([{ name: caseStudiesPage.name, path: "/case-studies" }])]}
      />
      <WorkListing caseStudies={caseStudies} />
      <ContactCta />
    </>
  );
}
