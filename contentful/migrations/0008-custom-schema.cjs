// Custom schema (P3-16): a JSON-LD field on Page SEO and SEO, so the SEO team can paste each
// page's structured data (schema.org). It replaces the site's automatic schema of the same @type
// on that page; empty, the automatic schema stays. The site skips anything that isn't an object
// with an @type (src/lib/seo.ts).
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0008-custom-schema.cjs
// Content-model changes are only made through migration files like this one, never by hand.

const helpText =
  'Optional: JSON-LD pasted without the <script> tags, one { } or several in [ ]. Replaces the site\'s own schema of the same "@type". Must match what the page shows; no review stars about the studio itself.';

module.exports = function (migration) {
  for (const id of ["pageSeo", "seo"]) {
    const type = migration.editContentType(id);
    type.createField("jsonLd").name("Custom schema (JSON-LD)").type("Object");
    type.changeFieldControl("jsonLd", "builtin", "objectEditor", { helpText });
  }
};
