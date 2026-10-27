// Products (26 Oct 2026, project head): the studio's own products, at /products (the list) and
// /products/<slug> (each product's page). A content type of its own, separate from case studies;
// a product's page is built from the same section blocks as a case study's (text + image,
// numbered features, wide image, cards, gallery, testimonials, call to action, tech stack).
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0010-product-model.cjs
// Content-model changes are only made through migration files like this one, never by hand.

const image = [{ linkMimetypeGroup: ["image"] }];

module.exports = function (migration) {
  const product = migration
    .createContentType("product")
    .name("Product")
    .description("A product of the studio's own, at /products/<slug>: a hero, then sections in order.")
    .displayField("name");

  product.createField("name").name("Name").type("Symbol").required(true).validations([{ size: { max: 80 } }]);
  product
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([
      { unique: true },
      {
        regexp: { pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
        message: "Lowercase letters, numbers, and hyphens only, e.g. terminal-gateway-crm.",
      },
    ]);
  product.createField("tagline").name("Tagline").type("Symbol").validations([{ size: { max: 120 } }]);
  product.createField("excerpt").name("Excerpt").type("Text").required(true).validations([{ size: { max: 300 } }]);
  product.createField("logo").name("Logo").type("Link").linkType("Asset").validations(image);
  product.createField("cardImage").name("Card image").type("Link").linkType("Asset").required(true).validations(image);
  product
    .createField("heroLayout")
    .name("Hero layout")
    .type("Symbol")
    .validations([{ in: ["Split", "Centered", "Light"] }]);
  product.createField("heroEyebrow").name("Hero eyebrow").type("Symbol").validations([{ size: { max: 60 } }]);
  product
    .createField("heroHeading")
    .name("Hero heading")
    .type("Symbol")
    .required(true)
    .validations([{ size: { max: 140 } }]);
  product.createField("heroText").name("Hero text").type("Text").validations([{ size: { max: 500 } }]);
  product.createField("heroButtonLabel").name("Hero button label").type("Symbol").validations([{ size: { max: 40 } }]);
  product.createField("heroButtonLink").name("Hero button link").type("Symbol");
  product.createField("heroImage").name("Hero image").type("Link").linkType("Asset").required(true).validations(image);
  product
    .createField("heroLayers")
    .name("Hero image layers")
    .type("Array")
    .items({ type: "Link", linkType: "Asset", validations: image })
    .validations([{ size: { max: 10 } }]);
  product
    .createField("sections")
    .name("Sections")
    .type("Array")
    .required(true)
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
          ],
        },
      ],
    })
    .validations([{ size: { min: 1, max: 20 } }]);
  product.createField("seo").name("SEO").type("Link").linkType("Entry").validations([{ linkContentType: ["seo"] }]);

  product.changeFieldControl("name", "builtin", "singleLine", {
    helpText: "The product's name, for cards, the breadcrumb, and the browser tab, e.g. Terminal Gateway CRM.",
  });
  product.changeFieldControl("slug", "builtin", "slugEditor", {
    trackingFieldId: "name",
    helpText: "Part of the URL (/products/<slug>). Don't change it after publishing; ask a developer for a redirect.",
  });
  product.changeFieldControl("tagline", "builtin", "singleLine", {
    helpText: "A short line on the product's card, e.g. All-in-one CRM.",
  });
  product.changeFieldControl("excerpt", "builtin", "multipleLine", {
    helpText: "One or two sentences for the product's card and search results.",
  });
  product.changeFieldControl("logo", "builtin", "assetLinkEditor", {
    helpText: "Optional: shown on the product's card (transparent PNG or SVG).",
  });
  product.changeFieldControl("cardImage", "builtin", "assetLinkEditor", {
    helpText: "The picture on the product's card on /products.",
  });
  product.changeFieldControl("heroLayout", "builtin", "dropdown", {
    helpText: "Split: heading beside the image. Centered: heading on the brand gradient, image below. Light: on cream, image below. Empty = Split.",
  });
  product.changeFieldControl("heroHeading", "builtin", "singleLine", {
    helpText: "The page's main heading. Put *stars* around words to show them in the brand gradient.",
  });
  product.changeFieldControl("heroLayers", "builtin", "assetLinksEditor", {
    helpText: "Optional: the hero image cut into layers (back to front, each the hero image's size), shown floating instead of it.",
  });
  product.changeFieldControl("heroButtonLink", "builtin", "singleLine", {
    helpText: "e.g. the product's website. The button shows only with both a label and a link.",
  });
  product.changeFieldControl("sections", "builtin", "entryLinksEditor", {
    helpText: "In page order. They alternate navy and white automatically, starting with navy.",
  });
};
