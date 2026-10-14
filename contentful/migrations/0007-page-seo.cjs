// Page SEO (P3-16): search and sharing settings for the pages whose content is in code (home,
// About, Services, service pages, Industries, …), one entry per page address, so their meta
// title, meta description, and canonical URL can be changed without a developer. Case studies
// and blog posts keep their own linked SEO entry, which gets a canonical URL here too; its title
// is now used as typed, like Page SEO's.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0007-page-seo.cjs
// Content-model changes are only made through migration files like this one, never by hand.

const image = [{ linkMimetypeGroup: ["image"] }];
const canonical = [
  {
    regexp: { pattern: "^(https://|/)" },
    message: "A full https:// address, or a path on this site starting with /",
  },
];
const canonicalHelp =
  "Optional: the address search engines should treat as this page's main one. Leave empty to use the page's own address.";

module.exports = function (migration) {
  const pageSeo = migration
    .createContentType("pageSeo")
    .name("Page SEO")
    .description(
      "Search and sharing settings for one page whose content isn't in Contentful (home, About, Services, …). The site uses the entry whose address matches the page; a page without one uses the text in the code.",
    )
    .displayField("name");

  pageSeo.createField("name").name("Page").type("Symbol").required(true);
  pageSeo
    .createField("path")
    .name("Page address")
    .type("Symbol")
    .required(true)
    .validations([
      { unique: true },
      {
        regexp: { pattern: "^/([a-z0-9]+(-[a-z0-9]+)*(/[a-z0-9]+(-[a-z0-9]+)*)*)?$" },
        message: "A path like /about or /services/web-development; / is the home page",
      },
    ]);
  pageSeo.createField("title").name("Meta title").type("Symbol").required(true).validations([{ size: { max: 60 } }]);
  pageSeo
    .createField("description")
    .name("Meta description")
    .type("Symbol")
    .required(true)
    .validations([{ size: { max: 160 } }]);
  pageSeo.createField("canonical").name("Canonical URL").type("Symbol").validations(canonical);
  pageSeo.createField("image").name("Share image").type("Link").linkType("Asset").validations(image);
  pageSeo.createField("noIndex").name("Hide from search engines").type("Boolean");

  pageSeo.changeFieldControl("name", "builtin", "singleLine", {
    helpText: "Which page this is, for editors, e.g. About.",
  });
  pageSeo.changeFieldControl("path", "builtin", "singleLine", {
    helpText: "The page's address on the site, e.g. /about or /services/web-development. / is the home page.",
  });
  pageSeo.changeFieldControl("title", "builtin", "singleLine", {
    helpText:
      "The full title in search results and the browser tab, used exactly as typed, e.g. About Us | Ink Pixel Studios. Up to 60 characters.",
  });
  pageSeo.changeFieldControl("description", "builtin", "singleLine", {
    helpText: "The text under the title in search results and shared links. Up to 160 characters.",
  });
  pageSeo.changeFieldControl("canonical", "builtin", "singleLine", { helpText: canonicalHelp });
  pageSeo.changeFieldControl("image", "builtin", "assetLinkEditor", {
    helpText: "Optional: the picture shown when the page is shared, 1200 × 630 px. Empty: the site's own share image.",
  });
  pageSeo.changeFieldControl("noIndex", "builtin", "boolean", {
    helpText: "Yes keeps this page out of search results.",
  });

  // SEO (linked from case studies and blog posts).
  const seo = migration.editContentType("seo");
  seo.createField("canonical").name("Canonical URL").type("Symbol").validations(canonical);
  seo.moveField("canonical").afterField("description");
  seo.changeFieldControl("canonical", "builtin", "singleLine", { helpText: canonicalHelp });
  seo.changeFieldControl("title", "builtin", "singleLine", {
    helpText:
      "The full title in search results and the browser tab, used exactly as typed. Up to 60 characters. Empty: the case study's or post's own title.",
  });
};
