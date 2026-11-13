// Case-study sections for marketing work (branding, social media, campaigns, lead generation; the
// five marketing case studies, 13 Nov 2026): a brand board, a social feed, a funnel, and results.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0011-case-study-marketing-sections.cjs
// Content-model changes are only made through migration files like this one, never by hand.

const PLATFORMS = ["Facebook", "Instagram", "LinkedIn", "TikTok", "YouTube"];

const image = [{ linkMimetypeGroup: ["image"] }];
const accentHelp = "Wrap words in *asterisks* to show them in the accent gradient.";

// Eyebrow, title, and intro, shared by the four sections.
function heading(contentType) {
  contentType.createField("eyebrow").name("Eyebrow").type("Symbol").validations([{ size: { max: 40 } }]);
  contentType.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 120 } }]);
  contentType.createField("intro").name("Intro").type("Text").validations([{ size: { max: 600 } }]);
  contentType.changeFieldControl("eyebrow", "builtin", "singleLine", { helpText: "Small label above the title, e.g. Brand Identity." });
  contentType.changeFieldControl("title", "builtin", "singleLine", { helpText: accentHelp });
}

// A list of items (title + text, the caseStudyItem type from 0005).
function items(contentType, id, name, { min, max }, helpText) {
  contentType
    .createField(id)
    .name(name)
    .type("Array")
    .required(true)
    .items({ type: "Link", linkType: "Entry", validations: [{ linkContentType: ["caseStudyItem"] }] })
    .validations([{ size: { min, max } }]);
  contentType.changeFieldControl(id, "builtin", "entryLinksEditor", { helpText });
}

module.exports = function (migration) {
  // Brand board: the client's logo, colours, typefaces, and tagline.
  const brandBoard = migration
    .createContentType("caseStudyBrandBoard")
    .name("Case study: brand board")
    .description("A case-study section showing a brand identity: logo, colour palette, typefaces, and tagline.")
    .displayField("title");
  heading(brandBoard);
  brandBoard.createField("logo").name("Logo").type("Link").linkType("Asset").validations(image);
  brandBoard
    .createField("colours")
    .name("Colours")
    .type("Array")
    .required(true)
    .items({
      type: "Symbol",
      validations: [
        {
          regexp: { pattern: "^.{1,30} #[0-9A-Fa-f]{6}$" },
          message: "A name, a space, and a hex colour, e.g. Armor Green #1C3220",
        },
      ],
    })
    .validations([{ size: { min: 2, max: 6 } }]);
  brandBoard
    .createField("typefaces")
    .name("Typefaces")
    .type("Array")
    .items({ type: "Symbol", validations: [{ size: { max: 40 } }] })
    .validations([{ size: { max: 3 } }]);
  brandBoard.createField("tagline").name("Tagline").type("Symbol").validations([{ size: { max: 80 } }]);
  brandBoard.changeFieldControl("logo", "builtin", "assetLinkEditor", {
    helpText: "SVG, or PNG/WebP with a transparent background. Only a logo the client has approved for use.",
  });
  brandBoard.changeFieldControl("colours", "builtin", "tagEditor", {
    helpText: "2–6 colours, each a name and a hex code, e.g. Armor Green #1C3220. Shown as swatches, in this order.",
  });
  brandBoard.changeFieldControl("typefaces", "builtin", "tagEditor", {
    helpText: "Optional: the brand's typefaces by name, e.g. Montserrat.",
  });
  brandBoard.changeFieldControl("tagline", "builtin", "singleLine", { helpText: "Optional: the brand's tagline or slogan." });

  // Social feed: post images shown as feed cards.
  const socialFeed = migration
    .createContentType("caseStudySocialFeed")
    .name("Case study: social feed")
    .description("A case-study section with social media posts shown as feed cards, and the platforms they ran on.")
    .displayField("title");
  heading(socialFeed);
  socialFeed.createField("accountName").name("Account name").type("Symbol").validations([{ size: { max: 60 } }]);
  socialFeed.createField("avatar").name("Avatar").type("Link").linkType("Asset").validations(image);
  socialFeed.createField("platforms").name("Platforms").type("Array").items({ type: "Symbol", validations: [{ in: PLATFORMS }] });
  socialFeed
    .createField("posts")
    .name("Posts")
    .type("Array")
    .required(true)
    .items({ type: "Link", linkType: "Asset", validations: image })
    .validations([{ size: { min: 3, max: 12 } }]);
  socialFeed.changeFieldControl("accountName", "builtin", "singleLine", {
    helpText: "Shown at the top of every post card, e.g. the client's page name.",
  });
  socialFeed.changeFieldControl("avatar", "builtin", "assetLinkEditor", {
    helpText: "Optional small square image beside the account name (e.g. the logo). Without it, the name's initials are shown.",
  });
  socialFeed.changeFieldControl("platforms", "builtin", "checkbox", { helpText: "Shown as labels above the posts." });
  socialFeed.changeFieldControl("posts", "builtin", "assetGalleryEditor", {
    helpText: "3–12 post images, three per row on desktop. Any shape (square, 4:5, 9:16 reels); the middle column sits lower.",
  });

  // Funnel: the stages of a campaign, from awareness to conversion.
  const funnel = migration
    .createContentType("caseStudyFunnel")
    .name("Case study: funnel")
    .description("A case-study section with a campaign or lead-generation funnel: 3–6 stages, widest first.")
    .displayField("title");
  heading(funnel);
  items(funnel, "stages", "Stages", { min: 3, max: 6 }, "In order, from the top of the funnel (e.g. Awareness) to the bottom (e.g. Conversion).");

  // Results: numbers with labels.
  const results = migration
    .createContentType("caseStudyResults")
    .name("Case study: results")
    .description("A case-study section with result numbers. Use only real figures the client has approved for publication.")
    .displayField("title");
  heading(results);
  items(
    results,
    "metrics",
    "Metrics",
    { min: 1, max: 6 },
    "Each item: the number as its title (e.g. +150%, 3.2x, 1200+) and the label as its text. Only real figures the client has approved.",
  );

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
          ],
        },
      ],
    });
};
