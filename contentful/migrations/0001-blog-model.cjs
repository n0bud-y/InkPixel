// Blog content model (P3-01, blog half): category, person (authors), seo, post.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0001-blog-model.cjs
// Content-model changes are only made through migration files like this one, never by hand.

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
        message: "Lowercase letters, numbers, and hyphens only, e.g. design-systems-first",
      },
    ]);

const image = [{ linkMimetypeGroup: ["image"] }];

module.exports = function (migration) {
  // Category: e.g. Engineering. Shown on article cards; archive at /blog/category/<slug>.
  const category = migration
    .createContentType("category")
    .name("Category")
    .description("Blog category, e.g. Engineering.")
    .displayField("title");
  category.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 40 } }]);
  slug(category);
  category.changeFieldControl("slug", "builtin", "slugEditor", {
    trackingFieldId: "title",
    helpText: "Part of the URL (/blog/category/<slug>). Don't change it after publishing.",
  });

  // Person: blog authors.
  const person = migration
    .createContentType("person")
    .name("Person")
    .description("Blog author.")
    .displayField("name");
  person.createField("name").name("Name").type("Symbol").required(true);
  person.createField("role").name("Role").type("Symbol");
  person.createField("photo").name("Photo").type("Link").linkType("Asset").validations(image);
  person.createField("bio").name("Short bio").type("Text").validations([{ size: { max: 400 } }]);
  person
    .createField("links")
    .name("Profile links")
    .type("Array")
    .items({ type: "Symbol", validations: [{ regexp: { pattern: "^https://" }, message: "Full https:// links" }] });

  // SEO: search and sharing settings, linked from posts (and later case studies).
  const seo = migration
    .createContentType("seo")
    .name("SEO")
    .description("Search and social sharing settings. Leave a field empty to use the page's own title, excerpt, or image.")
    .displayField("title");
  seo.createField("title").name("Search title").type("Symbol").validations([{ size: { max: 60 } }]);
  seo.createField("description").name("Search description").type("Symbol").validations([{ size: { max: 160 } }]);
  seo.createField("image").name("Share image").type("Link").linkType("Asset").validations(image);
  seo.createField("noIndex").name("Hide from search engines").type("Boolean");
  seo.changeFieldControl("title", "builtin", "singleLine", { helpText: "Up to 60 characters." });
  seo.changeFieldControl("description", "builtin", "singleLine", { helpText: "Up to 160 characters." });
  seo.changeFieldControl("image", "builtin", "assetLinkEditor", { helpText: "1200 × 630 px." });

  // Post: an article at /blog/<slug>. Reading time is calculated from the body.
  const post = migration
    .createContentType("post")
    .name("Blog post")
    .description("Article at /blog/<slug>.")
    .displayField("title");
  post.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 120 } }]);
  slug(post);
  post.createField("excerpt").name("Excerpt").type("Text").validations([{ size: { max: 300 } }]);
  post
    .createField("category")
    .name("Category")
    .type("Link")
    .linkType("Entry")
    .required(true)
    .validations([{ linkContentType: ["category"] }]);
  post
    .createField("author")
    .name("Author")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["person"] }]);
  post.createField("publishedDate").name("Published date").type("Date").required(true);
  post.createField("updatedDate").name("Updated date").type("Date");
  post.createField("coverImage").name("Cover image").type("Link").linkType("Asset").validations(image);
  post
    .createField("body")
    .name("Body")
    .type("RichText")
    .required(true)
    .validations([
      { enabledMarks: ["bold", "italic", "underline", "code"], message: "Bold, italic, underline, and code only" },
      {
        enabledNodeTypes: [
          "heading-2",
          "heading-3",
          "heading-4",
          "ordered-list",
          "unordered-list",
          "hr",
          "blockquote",
          "embedded-asset-block",
          "hyperlink",
          "entry-hyperlink",
        ],
        message: "Headings 2–4, lists, quotes, dividers, images, and links only",
      },
    ]);
  post
    .createField("seo")
    .name("SEO")
    .type("Link")
    .linkType("Entry")
    .validations([{ linkContentType: ["seo"] }]);

  post.changeFieldControl("slug", "builtin", "slugEditor", {
    trackingFieldId: "title",
    helpText: "Part of the URL (/blog/<slug>). Don't change it after publishing; ask a developer for a redirect.",
  });
  post.changeFieldControl("excerpt", "builtin", "multipleLine", {
    helpText: "One or two sentences for the blog listing and search results.",
  });
  post.changeFieldControl("publishedDate", "builtin", "datePicker", {
    format: "dateonly",
    helpText: "Newest posts show first on the home page and the blog.",
  });
  post.changeFieldControl("updatedDate", "builtin", "datePicker", {
    format: "dateonly",
    helpText: "Only after a meaningful update.",
  });
  post.changeFieldControl("coverImage", "builtin", "assetLinkEditor", { helpText: "At least 1600 px wide." });
};
