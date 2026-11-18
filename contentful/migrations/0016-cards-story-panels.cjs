// "Story panels" for case-study cards (20 Nov 2026, Pak Armoring's "Where We Helped" redesign):
// each card gets its own image (a new Images field, matched to the cards by order). On desktop the
// section locks to the screen; the cards are a numbered list on the left and one large panel on
// the right (that card's image and text) that changes as you scroll.
// Run once per environment: npm run contentful:migrate -- contentful/migrations/0016-cards-story-panels.cjs
// Content-model changes are only made through migration files like this one, never by hand.

module.exports = function (migration) {
  const cards = migration.editContentType("caseStudyCards");
  cards
    .editField("layout")
    .validations([
      { in: ["Timeline beside text", "Timeline beside text (pinned)", "Story panels", "Icon grid", "Around image", "Numbered steps"] },
    ]);
  cards
    .createField("images")
    .name("Images")
    .type("Array")
    .items({ type: "Link", linkType: "Asset", validations: [{ linkMimetypeGroup: ["image"] }] })
    .validations([{ size: { max: 9 } }]);
  cards.moveField("images").afterField("image");
  cards.changeFieldControl("images", "builtin", "assetGalleryEditor", {
    helpText: "Story panels only: one image per card, in the same order as the cards. The asset description is the alt text.",
  });
  cards.changeFieldControl("layout", "builtin", "dropdown", {
    helpText:
      "Timeline beside text: text and image on the left, cards on a line on the right. Story panels: on desktop the section locks to the screen, the cards are a numbered list on the left and one large panel on the right (that card's image, from Images, and its text) changes as you scroll; on phones, panels one under another. Icon grid: cards with an icon, three per row. Around image: cards on both sides of the image. Numbered steps: a zig-zag timeline, 01, 02… (Timeline beside text (pinned) is no longer used and shows as Timeline beside text.)",
  });
};
