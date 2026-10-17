// The case studies listing (/case-studies, "Our Work" in the menu). There is no design for it; it
// follows the Insights page (navy hero, pills, a wide card, then a grid). The case studies come
// from Contentful; this is the page's own text.
//
// PLACEHOLDER (issue I9): the meta description is a stand-in.
export const caseStudiesPage = {
  /** The page's name, e.g. in the browser tab and the breadcrumb. */
  name: "Case studies",
  description:
    "Projects by Ink Pixel Studios: the challenge, what we built, and the results, from e-commerce sites and CRM platforms to mobile apps.",
  eyebrow: "Case studies",
  /** Accented words are in *stars*. */
  title: "Our *Work*",
  intro:
    "Brands, products, and platforms we've designed and built, from first idea to launch. Pick a service to see the work behind it.",
  filter: { label: "Filter by service", all: "All work" },
  button: "View case study",
  empty: "No case studies here yet. Check back soon.",
};
