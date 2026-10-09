// Case-study additions for the app case-study design (Cathy O'Bryan's Books): a Light hero with
// an eyebrow and a button; facts and a highlight box on text + image sections; cards, screens,
// testimonials, and call-to-action sections; tech stack tiles; more technologies.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0005-case-study-app-sections.cjs
// Content-model changes are only made through migration files like this one, never by hand.

// All technologies in src/content/technologies.ts (0002 had the first three).
const TECHNOLOGIES = ["bigcommerce", "nodejs", "figma", "getstream", "stripe", "tensorflow", "postgresql", "react"];

const image = [{ linkMimetypeGroup: ["image"] }];
const link = { pattern: "^(/|https://)" };
const accentHelp = "Wrap words in *asterisks* to show them in the accent gradient.";
const items = (contentType, name, { min, max }, helpText) => {
  contentType
    .createField("items")
    .name(name)
    .type("Array")
    .required(true)
    .items({ type: "Link", linkType: "Entry", validations: [{ linkContentType: ["caseStudyItem"] }] })
    .validations([{ size: { min, max } }]);
  contentType.changeFieldControl("items", "builtin", "entryLinksEditor", { helpText });
};

module.exports = function (migration) {
  // Item: a title and a short text, used by cards, facts, and highlight boxes.
  const item = migration
    .createContentType("caseStudyItem")
    .name("Case study: item")
    .description("A title and a short text: a card, a fact (label and value), or a highlight box.")
    .displayField("title");
  item.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 80 } }]);
  item.createField("text").name("Text").type("Text").validations([{ size: { max: 400 } }]);
  item.changeFieldControl("text", "builtin", "multipleLine", { helpText: "For a fact, the value, e.g. iOS & Android Mobile App." });

  // Section: cards in one of four layouts.
  const cards = migration
    .createContentType("caseStudyCards")
    .name("Case study: cards")
    .description("A case-study section with an eyebrow, title, intro, and cards in one of four layouts.")
    .displayField("title");
  cards.createField("eyebrow").name("Eyebrow").type("Symbol").validations([{ size: { max: 40 } }]);
  cards.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 120 } }]);
  cards.createField("intro").name("Intro").type("Text").validations([{ size: { max: 600 } }]);
  cards
    .createField("layout")
    .name("Layout")
    .type("Symbol")
    .required(true)
    .validations([{ in: ["Timeline beside text", "Icon grid", "Around image", "Numbered steps"] }]);
  cards.createField("image").name("Image").type("Link").linkType("Asset").validations(image);
  items(cards, "Cards", { min: 2, max: 9 }, "In order. Around image: odd cards on the left, even cards on the right.");
  cards.changeFieldControl("eyebrow", "builtin", "singleLine", { helpText: "Small label above the title, e.g. The Problem." });
  cards.changeFieldControl("title", "builtin", "singleLine", { helpText: accentHelp });
  cards.changeFieldControl("layout", "builtin", "dropdown", {
    helpText:
      "Timeline beside text: text and image on the left, cards on a line on the right. Icon grid: cards with an icon, three per row. Around image: cards on both sides of the image. Numbered steps: a zig-zag timeline, 01, 02…",
  });
  cards.changeFieldControl("image", "builtin", "assetLinkEditor", {
    helpText: "Needed for Timeline beside text and Around image; not shown in the other layouts.",
  });

  // Section: a row of app screens.
  const gallery = migration
    .createContentType("caseStudyGallery")
    .name("Case study: screens")
    .description("A case-study section with a title, intro, and app screens in a staggered grid.")
    .displayField("title");
  gallery.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 120 } }]);
  gallery.createField("intro").name("Intro").type("Text").validations([{ size: { max: 600 } }]);
  gallery
    .createField("images")
    .name("Screens")
    .type("Array")
    .required(true)
    .items({ type: "Link", linkType: "Asset", validations: image })
    .validations([{ size: { min: 2, max: 12 } }]);
  gallery.changeFieldControl("title", "builtin", "singleLine", { helpText: accentHelp });
  gallery.changeFieldControl("images", "builtin", "assetGalleryEditor", {
    helpText: "Phone screens of the same size (transparent PNG or WebP), four per row; every second one sits higher.",
  });

  // Testimonial: a quote from a client.
  const testimonial = migration
    .createContentType("testimonial")
    .name("Testimonial")
    .description("A quote from a client. Publish only with the person's written approval.")
    .displayField("name");
  testimonial.createField("quote").name("Quote").type("Text").required(true).validations([{ size: { max: 600 } }]);
  testimonial.createField("name").name("Name").type("Symbol").required(true);
  testimonial.createField("role").name("Role").type("Symbol");
  testimonial.createField("company").name("Company").type("Symbol");
  testimonial.createField("photo").name("Photo").type("Link").linkType("Asset").validations(image);
  testimonial.changeFieldControl("quote", "builtin", "multipleLine", {
    helpText: "Their exact words. Publish only once they have approved it in writing; until then, keep it a draft.",
  });

  // Section: testimonials.
  const testimonials = migration
    .createContentType("caseStudyTestimonials")
    .name("Case study: testimonials")
    .description("A case-study section with testimonials. Hidden while none of them is published.")
    .displayField("title");
  testimonials.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 120 } }]);
  testimonials.createField("subtitle").name("Subtitle").type("Symbol").validations([{ size: { max: 120 } }]);
  testimonials
    .createField("testimonials")
    .name("Testimonials")
    .type("Array")
    .required(true)
    .items({ type: "Link", linkType: "Entry", validations: [{ linkContentType: ["testimonial"] }] })
    .validations([{ size: { min: 1, max: 6 } }]);
  testimonials.changeFieldControl("title", "builtin", "singleLine", { helpText: accentHelp });
  testimonials.changeFieldControl("testimonials", "builtin", "entryLinksEditor", {
    helpText: "Only published testimonials are shown; the section is hidden while none is.",
  });

  // Section: a call-to-action panel.
  const cta = migration
    .createContentType("caseStudyCallToAction")
    .name("Case study: call to action")
    .description("A case-study section: a panel with a title, text, a button, and an image at the bottom.")
    .displayField("title");
  cta.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 140 } }]);
  cta.createField("text").name("Text").type("Text").validations([{ size: { max: 400 } }]);
  cta.createField("buttonLabel").name("Button label").type("Symbol").validations([{ size: { max: 40 } }]);
  cta.createField("buttonLink").name("Button link").type("Symbol").validations([{ regexp: link, message: "A path like /contact, or a full https:// link" }]);
  cta.createField("image").name("Image").type("Link").linkType("Asset").validations(image);
  cta.changeFieldControl("title", "builtin", "singleLine", { helpText: accentHelp });
  cta.changeFieldControl("buttonLink", "builtin", "singleLine", { helpText: "e.g. /contact. The button shows only with both a label and a link." });
  cta.changeFieldControl("image", "builtin", "assetLinkEditor", { helpText: "Shown at the bottom of the panel, cut off by its edge." });

  // Text + image sections: an eyebrow, facts, and a highlight box.
  const section = migration.editContentType("caseStudySection");
  section.createField("eyebrow").name("Eyebrow").type("Symbol").validations([{ size: { max: 40 } }]);
  section.moveField("eyebrow").beforeField("title");
  section
    .createField("facts")
    .name("Facts")
    .type("Array")
    .items({ type: "Link", linkType: "Entry", validations: [{ linkContentType: ["caseStudyItem"] }] })
    .validations([{ size: { max: 6 } }]);
  section
    .createField("highlight")
    .name("Highlight box")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["caseStudyItem"] }]);
  section.changeFieldControl("facts", "builtin", "entryLinksEditor", {
    helpText: "Optional label + value pairs shown in two columns under the text, e.g. Platform: iOS & Android Mobile App.",
  });
  section.changeFieldControl("highlight", "builtin", "entryLinkEditor", {
    helpText: "Optional box under the facts, e.g. Services Provided.",
  });

  // Tech stack: cards (grouped, with labels) or tiles (logo + name, in a panel).
  const techStack = migration.editContentType("caseStudyTechStack");
  techStack.createField("layout").name("Layout").type("Symbol").validations([{ in: ["Cards", "Tiles"] }]);
  techStack.changeFieldControl("layout", "builtin", "dropdown", {
    helpText: "Cards (or empty): one card per group, with its label. Tiles: every technology as a tile in a panel (group labels are not shown).",
  });
  techStack.changeFieldControl("title", "builtin", "singleLine", { helpText: accentHelp });
  migration
    .editContentType("techStackGroup")
    .editField("technologies")
    .items({ type: "Symbol", validations: [{ in: TECHNOLOGIES }] });

  // Case study: the Light hero, with an eyebrow and a button.
  const caseStudy = migration.editContentType("caseStudy");
  caseStudy.editField("heroLayout").validations([{ in: ["Split", "Centered", "Light"] }]);
  caseStudy.createField("heroEyebrow").name("Hero eyebrow").type("Symbol").validations([{ size: { max: 40 } }]);
  caseStudy.createField("heroButtonLabel").name("Hero button label").type("Symbol").validations([{ size: { max: 40 } }]);
  caseStudy
    .createField("heroButtonLink")
    .name("Hero button link")
    .type("Symbol")
    .validations([{ regexp: link, message: "A path like /contact, or a full https:// link" }]);
  caseStudy.moveField("heroEyebrow").beforeField("heroHeading");
  caseStudy.moveField("heroButtonLabel").afterField("heroText");
  caseStudy.moveField("heroButtonLink").afterField("heroButtonLabel");
  caseStudy.changeFieldControl("heroLayout", "builtin", "dropdown", {
    helpText:
      "Split (or empty): logo, heading, and text beside the image, on white. Centered: white heading on the brand gradient with an arch, image below; no hero text. Light: eyebrow, heading, text, and button centred on cream, image below.",
  });
  caseStudy.changeFieldControl("heroHeading", "builtin", "singleLine", {
    helpText: `The page's main heading. ${accentHelp}`,
  });
  caseStudy.changeFieldControl("heroEyebrow", "builtin", "singleLine", { helpText: "Light hero only: small label above the heading." });
  caseStudy.changeFieldControl("heroButtonLink", "builtin", "singleLine", {
    helpText: "Light hero only, e.g. /contact. The button shows only with both a label and a link.",
  });
  caseStudy.editField("sections").items({
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
        ],
      },
    ],
  });
};
