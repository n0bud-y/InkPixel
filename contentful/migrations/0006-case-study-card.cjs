// Case study: optional card fields for the project cards on service pages (a highlight line and
// up to three short points). The card also uses the title, excerpt, hero image, and client logo.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0006-case-study-card.cjs
// Content-model changes are only made through migration files like this one, never by hand.

module.exports = function (migration) {
  const caseStudy = migration.editContentType("caseStudy");

  caseStudy
    .createField("cardHighlight")
    .name("Card highlight")
    .type("Symbol")
    .validations([{ size: { max: 100 } }]);
  caseStudy.moveField("cardHighlight").afterField("excerpt");
  caseStudy.changeFieldControl("cardHighlight", "builtin", "singleLine", {
    helpText:
      "Optional: one line shown in a coloured bar on the project card on service pages (e.g. \"Helping a growing community stay connected and ready to scale\"). Up to 100 characters.",
  });

  caseStudy
    .createField("cardPoints")
    .name("Card points")
    .type("Array")
    .items({ type: "Symbol", validations: [{ size: { max: 60 } }] })
    .validations([{ size: { max: 3 } }]);
  caseStudy.moveField("cardPoints").afterField("cardHighlight");
  caseStudy.changeFieldControl("cardPoints", "builtin", "tagEditor", {
    helpText:
      "Optional: up to three short results or facts, shown with ticks on the project card (e.g. \"40+ stores on one platform\"). Up to 60 characters each; only true, approved numbers.",
  });
};
