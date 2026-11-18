// Uploaded video files in the case-study video section (19 Nov 2026, G&W Towers' promo film): next
// to YouTube links, the section can hold videos uploaded to Contentful (e.g. vertical reels), each
// played on the page with the browser's own player. YouTube links become optional; the page
// shows the section once it has at least one video of either kind.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0014-case-study-video-files.cjs
// Content-model changes are only made through migration files like this one, never by hand.

module.exports = function (migration) {
  const videos = migration.editContentType("caseStudyVideos");
  videos.editField("videos").required(false);
  videos
    .createField("files")
    .name("Video files")
    .type("Array")
    .items({ type: "Link", linkType: "Asset", validations: [{ linkMimetypeGroup: ["video"] }] })
    .validations([{ size: { max: 6 } }]);
  videos.moveField("files").afterField("videos");
  videos.changeFieldControl("files", "builtin", "assetGalleryEditor", {
    helpText:
      "Optional: up to 6 uploaded videos (MP4, H.264, under ~5 MB each; vertical reels work best). The asset's description is the video's caption. Shown before the YouTube videos.",
  });
};
