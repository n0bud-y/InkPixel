// Case study: an optional card image for the project cards on service pages (e.g. the product on
// a device over a coloured shape). Without it, the card shows the hero image.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0009-case-study-card-image.cjs
// Content-model changes are only made through migration files like this one, never by hand.

module.exports = function (migration) {
  const caseStudy = migration.editContentType("caseStudy");

  caseStudy
    .createField("cardImage")
    .name("Card image")
    .type("Link")
    .linkType("Asset")
    .validations([{ linkMimetypeGroup: ["image"] }]);
  caseStudy.moveField("cardImage").afterField("cardPoints");
  caseStudy.changeFieldControl("cardImage", "builtin", "assetLinkEditor", {
    helpText:
      "Optional: the image on the project card on service pages, e.g. the product on a laptop or phones over a coloured shape, on a transparent background. Without it, the card shows the hero image. The description is its alt text.",
  });
};
