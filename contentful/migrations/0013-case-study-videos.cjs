// A case-study section with the client's YouTube videos (19 Nov 2026, the case studies rewritten
// as client stories with real media). The page shows each video's thumbnail and title; the video
// player loads only when someone clicks one.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0013-case-study-videos.cjs
// Content-model changes are only made through migration files like this one, never by hand.

const YOUTUBE = "^https://(www\\.)?(youtube\\.com/(watch\\?v=|shorts/|embed/)|youtu\\.be/)[A-Za-z0-9_-]{11}";

module.exports = function (migration) {
  const videos = migration
    .createContentType("caseStudyVideos")
    .name("Case study: videos")
    .description("A case-study section with YouTube videos: the first one large, the rest beside or under it.")
    .displayField("title");
  videos.createField("eyebrow").name("Eyebrow").type("Symbol").validations([{ size: { max: 40 } }]);
  videos.createField("title").name("Title").type("Symbol").required(true).validations([{ size: { max: 120 } }]);
  videos.createField("intro").name("Intro").type("Text").validations([{ size: { max: 600 } }]);
  videos
    .createField("videos")
    .name("YouTube videos")
    .type("Array")
    .required(true)
    .items({
      type: "Symbol",
      validations: [{ regexp: { pattern: YOUTUBE }, message: "A YouTube link, e.g. https://www.youtube.com/watch?v=hQDrZYgqMzE" }],
    })
    .validations([{ size: { min: 1, max: 8 } }]);
  videos.changeFieldControl("eyebrow", "builtin", "singleLine", { helpText: "Small label above the title, e.g. The Videos." });
  videos.changeFieldControl("title", "builtin", "singleLine", { helpText: "Wrap words in *asterisks* to show them in the accent gradient." });
  videos.changeFieldControl("videos", "builtin", "tagEditor", {
    helpText:
      "1–8 YouTube links, in order; the first is shown large. Titles come from YouTube. Use only the client's own public videos, or videos you made for them.",
  });

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
            "caseStudyVideos",
          ],
        },
      ],
    });
};
