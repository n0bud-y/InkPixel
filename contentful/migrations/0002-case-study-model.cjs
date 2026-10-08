// Case-study content model (P3-01, case-study half): client, techStackGroup, caseStudyTechStack,
// caseStudySection, caseStudy. A case study is a hero plus an ordered list of sections, so each
// one can follow its own design (section titles and order differ between case studies).
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0002-case-study-model.cjs
// Content-model changes are only made through migration files like this one, never by hand.

// Values defined in code. Adding one means updating the code and a new migration together.
const INDUSTRIES = ["fintech", "healthcare", "real-estate", "logistics", "ecommerce"]; // src/content/industries.ts
const SERVICES = ["branding", "development", "marketing", "software", "applications", "ai-automation"]; // src/content/services.ts
const TECHNOLOGIES = ["bigcommerce", "nodejs", "figma"]; // src/content/technologies.ts

const slug = (contentType) =>
  contentType
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([
      { unique: true },
      {
        regexp: { pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
        message: "Lowercase letters, numbers, and hyphens only, e.g. gulbaan",
      },
    ]);

const image = [{ linkMimetypeGroup: ["image"] }];

const pickFrom = (values) => ({ type: "Symbol", validations: [{ in: values }] });

module.exports = function (migration) {
  // Client: the company a case study is for. Its logo is shown only once use is approved.
  const client = migration
    .createContentType("client")
    .name("Client")
    .description("Company a case study is for.")
    .displayField("name");
  client.createField("name").name("Name").type("Symbol").required(true);
  client.createField("logo").name("Logo").type("Link").linkType("Asset").validations(image);
  client
    .createField("website")
    .name("Website")
    .type("Symbol")
    .validations([{ regexp: { pattern: "^https://" }, message: "Full https:// link" }]);
  client.createField("logoApproved").name("Logo use approved").type("Boolean");
  client.createField("logoApproval").name("Approval details").type("Symbol");
  client.changeFieldControl("logo", "builtin", "assetLinkEditor", {
    helpText: "SVG, or PNG with a transparent background. The asset description is the alt text.",
  });
  client.changeFieldControl("logoApproved", "builtin", "boolean", {
    helpText: "The site shows the logo only when this is Yes. Needs the client's written approval.",
  });
  client.changeFieldControl("logoApproval", "builtin", "singleLine", {
    helpText: "When and who approved, e.g. 2026-10-08, Jane Doe (CEO), by email.",
  });

  // Tech stack group: one card in a tech stack section, e.g. "Web Architecture: BigCommerce, Node.js".
  const techStackGroup = migration
    .createContentType("techStackGroup")
    .name("Tech stack group")
    .description("One card in a case study's tech stack, e.g. Web Architecture.")
    .displayField("label");
  techStackGroup.createField("label").name("Label").type("Symbol").required(true).validations([{ size: { max: 40 } }]);
  techStackGroup
    .createField("technologies")
    .name("Technologies")
    .type("Array")
    .required(true)
    .items(pickFrom(TECHNOLOGIES))
    .validations([{ size: { min: 1, max: 6 } }]);
  techStackGroup.changeFieldControl("technologies", "builtin", "checkbox", {
    helpText: "Shown with their logos, in this order. A missing technology must be added by a developer.",
  });

  // Section: tech stack cards.
  const techStack = migration
    .createContentType("caseStudyTechStack")
    .name("Case study: tech stack")
    .description("A case-study section with technology cards.")
    .displayField("title");
  techStack.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 80 } }]);
  techStack
    .createField("groups")
    .name("Cards")
    .type("Array")
    .required(true)
    .items({ type: "Link", linkType: "Entry", validations: [{ linkContentType: ["techStackGroup"] }] })
    .validations([{ size: { min: 1, max: 6 } }]);
  techStack.changeFieldControl("title", "builtin", "singleLine", { helpText: "e.g. Tech Stack Used" });

  // Section: a title, text, and an image beside or below it.
  const section = migration
    .createContentType("caseStudySection")
    .name("Case study: text + image")
    .description("A case-study section: title, text, and an image beside or below it.")
    .displayField("title");
  section.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 80 } }]);
  section
    .createField("body")
    .name("Text")
    .type("RichText")
    .required(true)
    .validations([
      { enabledMarks: ["bold", "italic", "underline"], message: "Bold, italic, and underline only" },
      {
        enabledNodeTypes: ["unordered-list", "ordered-list", "hyperlink"],
        message: "Paragraphs, lists, and links only",
      },
    ]);
  section.createField("image").name("Image").type("Link").linkType("Asset").required(true).validations(image);
  section
    .createField("layout")
    .name("Layout")
    .type("Symbol")
    .required(true)
    .validations([{ in: ["Image left", "Image right", "Image below"] }]);
  section.changeFieldControl("image", "builtin", "assetLinkEditor", {
    helpText: "Transparent PNG or WebP, at most ~500 KB. The asset description is the alt text.",
  });
  section.changeFieldControl("layout", "builtin", "dropdown", {
    helpText: "On phones the image always comes after the text.",
  });

  // Case study: /case-studies/<slug>. Sections alternate navy and white automatically.
  const caseStudy = migration
    .createContentType("caseStudy")
    .name("Case study")
    .description("Project page at /case-studies/<slug>: a hero, then sections in order.")
    .displayField("title");
  caseStudy.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 80 } }]);
  slug(caseStudy);
  caseStudy
    .createField("client")
    .name("Client")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["client"] }]);
  caseStudy.createField("excerpt").name("Excerpt").type("Text").required(true).validations([{ size: { max: 300 } }]);
  caseStudy
    .createField("heroHeading")
    .name("Hero heading")
    .type("Symbol")
    .required(true)
    .validations([{ size: { max: 140 } }]);
  caseStudy.createField("heroText").name("Hero text").type("Text").validations([{ size: { max: 500 } }]);
  caseStudy.createField("heroImage").name("Hero image").type("Link").linkType("Asset").required(true).validations(image);
  caseStudy
    .createField("sections")
    .name("Sections")
    .type("Array")
    .required(true)
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["caseStudySection", "caseStudyTechStack"] }],
    })
    .validations([{ size: { min: 1, max: 20 } }]);
  caseStudy.createField("industries").name("Industries").type("Array").items(pickFrom(INDUSTRIES));
  caseStudy.createField("services").name("Services").type("Array").items(pickFrom(SERVICES));
  caseStudy.createField("region").name("Region").type("Symbol").validations([{ size: { max: 60 } }]);
  caseStudy
    .createField("year")
    .name("Year")
    .type("Integer")
    .validations([{ range: { min: 2000, max: 2100 } }]);
  caseStudy.createField("featured").name("Featured").type("Boolean");
  caseStudy
    .createField("seo")
    .name("SEO")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["seo"] }]);

  caseStudy.changeFieldControl("title", "builtin", "singleLine", {
    helpText: "Project name for cards and the browser tab, e.g. Gulbaan.",
  });
  caseStudy.changeFieldControl("slug", "builtin", "slugEditor", {
    trackingFieldId: "title",
    helpText: "Part of the URL (/case-studies/<slug>). Don't change it after publishing; ask a developer for a redirect.",
  });
  caseStudy.changeFieldControl("excerpt", "builtin", "multipleLine", {
    helpText: "One or two sentences for case-study cards and search results.",
  });
  caseStudy.changeFieldControl("heroHeading", "builtin", "singleLine", {
    helpText: "The big gradient line at the top of the page (the page's main heading).",
  });
  caseStudy.changeFieldControl("heroImage", "builtin", "assetLinkEditor", {
    helpText: "Shown beside the heading; loads first, so keep it under ~200 KB.",
  });
  caseStudy.changeFieldControl("sections", "builtin", "entryLinksEditor", {
    helpText: "In page order. They alternate navy and white automatically, starting with navy.",
  });
  caseStudy.changeFieldControl("industries", "builtin", "checkbox", { helpText: "For filters and industry pages." });
  caseStudy.changeFieldControl("services", "builtin", "checkbox", { helpText: "For filters and service pages." });
  caseStudy.changeFieldControl("region", "builtin", "singleLine", { helpText: "Country or region, e.g. Pakistan." });
  caseStudy.changeFieldControl("featured", "builtin", "boolean", {
    helpText: "Candidate for the home page's featured project (coming with the home page update).",
  });
};
