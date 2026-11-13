// Layout choices so case studies don't all look alike (13 Nov 2026): two more hero layouts (Dark,
// Editorial), and a layout for the social feed, funnel, and brand board sections (0011).
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0012-case-study-layout-variants.cjs
// Content-model changes are only made through migration files like this one, never by hand.

function layout(contentType, values, helpText) {
  contentType.createField("layout").name("Layout").type("Symbol").validations([{ in: values }]);
  contentType.moveField("layout").afterField("intro");
  contentType.changeFieldControl("layout", "builtin", "dropdown", { helpText });
}

module.exports = function (migration) {
  const caseStudy = migration.editContentType("caseStudy");
  caseStudy.editField("heroLayout").validations([{ in: ["Split", "Centered", "Light", "Dark", "Editorial"] }]);
  caseStudy.changeFieldControl("heroLayout", "builtin", "dropdown", {
    helpText:
      "Split (or empty): logo, heading, and text beside the image, on white. Centered: white heading on the brand gradient with an arch, image below; no hero text. Light: eyebrow, heading, text, and button centred on cream, image below. Dark: logo, eyebrow, heading, text, and button beside the image, on navy with a crimson glow. Editorial: eyebrow and a very large heading on white, the text and button beside it, the image across the page below.",
  });

  layout(
    migration.editContentType("caseStudySocialFeed"),
    ["Grid", "Phones", "Spotlight", "Carousel", "Collage"],
    "Grid (or empty): three per row, middle column lower. Phones: the first three posts in phone frames, the middle one larger. Spotlight: the first post large, the next four beside it. Carousel: a row that moves slowly sideways (still for visitors who prefer less motion). Collage: overlapping, slightly turned cards (a grid on phones).",
  );
  layout(
    migration.editContentType("caseStudyFunnel"),
    ["Funnel", "Journey"],
    "Funnel (or empty): the heading beside bands that narrow from top to bottom. Journey: the heading above, the stages left to right on a line with numbered points (top to bottom on phones).",
  );
  layout(
    migration.editContentType("caseStudyBrandBoard"),
    ["Board", "Wide"],
    "Board (or empty): the heading and tagline beside a board with the logo, colours, and typefaces. Wide: the heading above, the logo beside tall colour stripes across the page, the tagline large below.",
  );
};
