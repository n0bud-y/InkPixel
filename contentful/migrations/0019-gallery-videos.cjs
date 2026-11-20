// Videos for a gallery (21 Nov 2026, NG Interiors' TikTok reels): a gallery can have a video for
// each image, in the same order. Where the page shows a gallery as reels, the image is the cover and
// a click plays its video on the page, with sound. Galleries without videos are unchanged.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0019-gallery-videos.cjs
// Content-model changes are only made through migration files like this one, never by hand.

module.exports = function (migration) {
  const gallery = migration.editContentType("caseStudyGallery");
  gallery
    .createField("videos")
    .name("Videos")
    .type("Array")
    .items({ type: "Link", linkType: "Asset", validations: [{ linkMimetypeGroup: ["video"] }] })
    .validations([{ size: { max: 12 } }]);
  gallery.moveField("videos").afterField("images");
  gallery.changeFieldControl("videos", "builtin", "assetLinksEditor", {
    helpText:
      "Optional: a video for each image, in the same order (MP4, H.264 with AAC sound, under ~3 MB each). Only used where the page shows the gallery as reels; the image is the video's cover.",
  });
};
