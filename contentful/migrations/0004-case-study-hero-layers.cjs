// Case study: optional hero layers, the hero image cut into pieces (e.g. one per screenshot)
// that each float gently on the page.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0004-case-study-hero-layers.cjs
// Content-model changes are only made through migration files like this one, never by hand.

module.exports = function (migration) {
  const caseStudy = migration.editContentType("caseStudy");
  caseStudy
    .createField("heroLayers")
    .name("Hero layers")
    .type("Array")
    .items({ type: "Link", linkType: "Asset", validations: [{ linkMimetypeGroup: ["image"] }] })
    .validations([{ size: { max: 10 } }]);
  caseStudy.moveField("heroLayers").afterField("heroImage");
  caseStudy.changeFieldControl("heroLayers", "builtin", "assetLinksEditor", {
    helpText:
      "Optional: the hero image cut into pieces (e.g. one per screenshot), each a transparent image exactly the size of the hero image, from back to front. When set, they replace the hero image on the page and each one floats gently. The hero image is still used for sharing and cards.",
  });
};
