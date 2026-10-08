// Case-study additions for the CRM Terminal Gateway design: a hero layout (Split or Centered)
// and two section types, numbered features and a wide image.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0003-case-study-sections.cjs
// Content-model changes are only made through migration files like this one, never by hand.

const image = [{ linkMimetypeGroup: ["image"] }];

module.exports = function (migration) {
  // Section: a title, an intro, and numbered feature cards (01, 02, …).
  const featureGrid = migration
    .createContentType("caseStudyFeatureGrid")
    .name("Case study: numbered features")
    .description("A case-study section: title, intro, and numbered feature cards.")
    .displayField("title");
  featureGrid.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 80 } }]);
  featureGrid.createField("intro").name("Intro").type("Text").validations([{ size: { max: 600 } }]);
  featureGrid
    .createField("items")
    .name("Features")
    .type("Array")
    .required(true)
    .items({ type: "Symbol", validations: [{ size: { max: 160 } }] })
    .validations([{ size: { min: 2, max: 9 } }]);
  featureGrid.changeFieldControl("intro", "builtin", "multipleLine", { helpText: "Shown centred under the title." });
  featureGrid.changeFieldControl("items", "builtin", "tagEditor", {
    helpText: "One feature per item (press Enter), in order; they are numbered 01, 02… automatically.",
  });

  // Section: one wide image and no text, e.g. a band of app screens.
  const showcase = migration
    .createContentType("caseStudyShowcase")
    .name("Case study: wide image")
    .description("A case-study section with one image across the full width and no text.")
    .displayField("name");
  showcase.createField("name").name("Name").type("Symbol").required(true);
  showcase.createField("image").name("Image").type("Link").linkType("Asset").required(true).validations(image);
  showcase.changeFieldControl("name", "builtin", "singleLine", {
    helpText: "Only shown in Contentful, e.g. Terminal Gateway screens.",
  });
  showcase.changeFieldControl("image", "builtin", "assetLinkEditor", {
    helpText: "Fills the full width of the screen: 1920 px wide, transparent PNG or WebP. The asset description is the alt text.",
  });

  const caseStudy = migration.editContentType("caseStudy");
  caseStudy
    .createField("heroLayout")
    .name("Hero layout")
    .type("Symbol")
    .validations([{ in: ["Split", "Centered"] }]);
  caseStudy.moveField("heroLayout").afterField("heroImage");
  caseStudy.changeFieldControl("heroLayout", "builtin", "dropdown", {
    helpText:
      "Split (or empty): logo, heading, and text on the left, image on the right, on white. Centered: white heading on the brand gradient with an arch, image below; the hero text is not shown.",
  });
  caseStudy.editField("sections").items({
    type: "Link",
    linkType: "Entry",
    validations: [
      { linkContentType: ["caseStudySection", "caseStudyTechStack", "caseStudyFeatureGrid", "caseStudyShowcase"] },
    ],
  });
};
