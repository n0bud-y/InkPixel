// A SWOT analysis section for case studies (20 Nov 2026, project head): the client's Strengths,
// Weaknesses, Opportunities, and Threats when the work started, shown as a 2×2 matrix right
// under the banner. Write it only from facts on the case study and the client's public pages;
// each weakness and threat should point to what the studio did about it.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0018-case-study-swot.cjs
// Content-model changes are only made through migration files like this one, never by hand.

const points = (field, name) => {
  field
    .name(name)
    .type("Array")
    .required(true)
    .items({ type: "Symbol", validations: [{ size: { max: 220 } }] })
    .validations([{ size: { min: 1, max: 4 } }]);
};

module.exports = function (migration) {
  const swot = migration
    .createContentType("caseStudySwot")
    .name("Case study: SWOT analysis")
    .description("A case-study section: Strengths, Weaknesses, Opportunities, and Threats as a 2×2 matrix.")
    .displayField("title");
  swot.createField("eyebrow").name("Eyebrow").type("Symbol").validations([{ size: { max: 40 } }]);
  swot.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 120 } }]);
  swot.createField("intro").name("Intro").type("Text").validations([{ size: { max: 400 } }]);
  points(swot.createField("strengths"), "Strengths");
  points(swot.createField("weaknesses"), "Weaknesses");
  points(swot.createField("opportunities"), "Opportunities");
  points(swot.createField("threats"), "Threats");
  swot.changeFieldControl("eyebrow", "builtin", "singleLine", { helpText: "Small label above the title, e.g. SWOT Analysis." });
  swot.changeFieldControl("title", "builtin", "singleLine", { helpText: "Wrap words in *asterisks* to show them in the accent gradient." });
  for (const field of ["strengths", "weaknesses", "opportunities", "threats"]) {
    swot.changeFieldControl(field, "builtin", "listInput", {
      helpText: "1–4 short points, one per line (up to 220 characters each). Facts only; no numbers the client hasn't approved.",
    });
  }

  migration
    .editContentType("caseStudy")
    .editField("sections")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [
        {
          linkContentType: [
            "caseStudySection",
            "caseStudyTechStack",
            "caseStudyFeatureGrid",
            "caseStudyShowcase",
            "caseStudyCards",
            "caseStudyGallery",
            "caseStudyTestimonials",
            "caseStudyCallToAction",
            "caseStudyBrandBoard",
            "caseStudySocialFeed",
            "caseStudyFunnel",
            "caseStudyResults",
            "caseStudyVideos",
            "caseStudySwot",
          ],
        },
      ],
    });
};
