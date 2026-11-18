// A video behind the case-study hero (20 Nov 2026, Pak Armoring's vehicle film): when a case study
// has one, its hero becomes a full-width banner with the video playing muted and looping behind the
// text, and the hero image is the still shown before it plays (and instead of it for visitors who
// prefer reduced motion or save data). The hero layout and layers are then not used.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0017-case-study-hero-video.cjs
// Content-model changes are only made through migration files like this one, never by hand.

module.exports = function (migration) {
  const caseStudy = migration.editContentType("caseStudy");
  caseStudy
    .createField("heroVideo")
    .name("Hero video")
    .type("Link")
    .linkType("Asset")
    .validations([{ linkMimetypeGroup: ["video"] }]);
  caseStudy.moveField("heroVideo").afterField("heroLayers");
  caseStudy.changeFieldControl("heroVideo", "builtin", "assetLinkEditor", {
    helpText:
      "Optional: a short video (MP4, H.264, no sound, under ~4 MB) played muted and looping behind the hero text. The hero image becomes its still, so use a frame from the video there.",
  });
};
