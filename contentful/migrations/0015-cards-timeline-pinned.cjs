// A fifth layout for case-study cards (20 Nov 2026, Pak Armoring's "Four Places We Worked"):
// "Timeline beside text (pinned)", the timeline layout that, on desktop, locks to the screen while
// the cards rise into their stack one by one as you scroll.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0015-cards-timeline-pinned.cjs
// Content-model changes are only made through migration files like this one, never by hand.

module.exports = function (migration) {
  const cards = migration.editContentType("caseStudyCards");
  cards
    .editField("layout")
    .validations([{ in: ["Timeline beside text", "Timeline beside text (pinned)", "Icon grid", "Around image", "Numbered steps"] }]);
  cards.changeFieldControl("layout", "builtin", "dropdown", {
    helpText:
      "Timeline beside text: text and image on the left, cards on a line on the right. Timeline beside text (pinned): the same, but on desktop the section locks to the screen and the cards rise into place one by one as you scroll. Icon grid: cards with an icon, three per row. Around image: cards on both sides of the image. Numbered steps: a zig-zag timeline, 01, 02…",
  });
};
