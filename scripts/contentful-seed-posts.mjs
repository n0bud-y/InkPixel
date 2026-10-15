// Adds the three sample posts from the design (with their categories, cover photos, and a sample
// author) to Contentful and publishes them, so the home page "From the studio." cards and the
// blog pages have content to show. The bodies use every kind of block an article can have
// (headings, lists, a quote, a divider, an image, links), so each part of the article page can
// be checked.
// PLACEHOLDER content: replace or delete these posts (and the sample author) in Contentful before
// launch.
// Usage: npm run contentful:seed-posts   (needs the blog model: 0001-blog-model.cjs)
// Entries and assets have fixed ids, so running it again skips what already exists. Sample posts
// from the first version of this script (one placeholder paragraph, repeated) are brought up to
// date; a post an editor has changed is left alone.

import { readFile } from "node:fs/promises";

const {
  CONTENTFUL_SPACE_ID: spaceId,
  CONTENTFUL_ENVIRONMENT: environmentId = "master",
  CONTENTFUL_MANAGEMENT_TOKEN: token,
} = process.env;

if (!spaceId || !token) {
  console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN in .env.local.");
  process.exit(1);
}

const base = `https://api.contentful.com/spaces/${spaceId}/environments/${environmentId}`;
const images = new URL("../src/assets/images/", import.meta.url);

async function cma(path, { method = "GET", body, headers = {} } = {}) {
  const response = await fetch(base + path, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/vnd.contentful.management.v1+json",
      ...headers,
    },
    body: body && JSON.stringify(body),
  });
  if (response.status === 404 && method === "GET") return null;
  if (!response.ok) {
    throw new Error(`${method} ${path} failed: ${response.status} ${await response.text()}`);
  }
  return response.status === 204 ? null : response.json();
}

const locale = (await cma("/locales")).items.find((item) => item.default).code;
const localized = (fields) =>
  Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, { [locale]: value }]));
const link = (id, linkType = "Entry") => ({ sys: { type: "Link", linkType, id } });

// Uploads an image from src/assets/images with a fixed id (skipped if it exists), waits for
// Contentful to process it, and publishes it. The description is the image's alt text. An image
// left unpublished by an interrupted run is finished.
async function upsertAsset(id, path, description) {
  const existing = await cma(`/assets/${id}`);
  if (existing?.sys.publishedVersion) {
    console.log(`  exists, skipped: ${id}`);
    return;
  }
  if (existing) {
    await publishWhenProcessed(existing, path);
    return;
  }
  const fileName = path.split("/").pop();
  const uploadResponse = await fetch(`https://upload.contentful.com/spaces/${spaceId}/uploads`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/octet-stream" },
    body: await readFile(new URL(path, images)),
  });
  if (!uploadResponse.ok) {
    throw new Error(`Upload of ${fileName} failed: ${uploadResponse.status} ${await uploadResponse.text()}`);
  }
  const upload = await uploadResponse.json();

  let asset = await cma(`/assets/${id}`, {
    method: "PUT",
    body: {
      fields: localized({
        title: `${description} (PLACEHOLDER)`,
        description,
        file: { contentType: "image/webp", fileName, uploadFrom: link(upload.sys.id, "Upload") },
      }),
    },
  });
  await cma(`/assets/${id}/files/${locale}/process`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(asset.sys.version) },
  });
  await publishWhenProcessed(asset, path);
}

async function publishWhenProcessed(asset, path) {
  const { id } = asset.sys;
  for (let attempt = 0; !asset.fields.file?.[locale]?.url; attempt++) {
    if (attempt === 30) throw new Error(`Contentful did not finish processing ${path}.`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    asset = await cma(`/assets/${id}`);
  }
  await cma(`/assets/${id}/published`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(asset.sys.version) },
  });
  console.log(`  uploaded and published: ${id}`);
}

// Creates the entry with a fixed id and publishes it. Returns false if it already exists.
async function create(id, contentType, fields) {
  if (await cma(`/entries/${id}`)) return false;
  const entry = await cma(`/entries/${id}`, {
    method: "PUT",
    headers: { "X-Contentful-Content-Type": contentType },
    body: { fields: localized(fields) },
  });
  await cma(`/entries/${id}/published`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(entry.sys.version) },
  });
  console.log(`  created and published: ${id}`);
  return true;
}

async function upsert(id, contentType, fields) {
  if (!(await create(id, contentType, fields))) console.log(`  exists, skipped: ${id}`);
}

// The first version of this script's sample body: one paragraph, repeated.
const FIRST_SAMPLE_TEXT = "This is placeholder text for a sample article.";

// Brings a sample post up to date: adds the fields it doesn't have yet and, while its body is
// still the first version's placeholder, replaces the body. Skipped if an editor has unpublished
// changes on it, so the script never publishes someone's draft.
async function updateSample(id, fields) {
  const entry = await cma(`/entries/${id}`);
  if (entry.sys.version > (entry.sys.publishedVersion ?? 0) + 1) {
    console.warn(`  has unpublished changes, skipped: ${id}`);
    return;
  }
  const firstSample = JSON.stringify(entry.fields.body ?? "").includes(FIRST_SAMPLE_TEXT);
  const keys = Object.keys(fields).filter((key) => entry.fields[key] === undefined || (key === "body" && firstSample));
  if (!keys.length) {
    console.log(`  up to date, skipped: ${id}`);
    return;
  }
  for (const key of keys) entry.fields[key] = { [locale]: fields[key] };
  const updated = await cma(`/entries/${id}`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(entry.sys.version) },
    body: { fields: entry.fields },
  });
  await cma(`/entries/${id}/published`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(updated.sys.version) },
  });
  console.log(`  updated (${keys.join(", ")}) and published: ${id}`);
}

// --- Rich text ----------------------------------------------------------------------------------

const text = (value, marks = []) => ({ nodeType: "text", value, marks: marks.map((type) => ({ type })), data: {} });
// Inline links sit between text nodes, as the Contentful editor writes them.
const inline = (parts) => {
  const nodes = parts.map((part) => (typeof part === "string" ? text(part) : part));
  return nodes.flatMap((node, index) =>
    node.nodeType === "text" ? [node] : [...(index === 0 ? [text("")] : []), node, ...(index === nodes.length - 1 ? [text("")] : [])],
  );
};
const p = (...parts) => ({ nodeType: "paragraph", data: {}, content: inline(parts) });
const h = (level, value) => ({ nodeType: `heading-${level}`, data: {}, content: [text(value)] });
const list = (nodeType, items) => ({
  nodeType,
  data: {},
  content: items.map((item) => ({ nodeType: "list-item", data: {}, content: [p(item)] })),
});
const ul = (...items) => list("unordered-list", items);
const ol = (...items) => list("ordered-list", items);
const quote = (value) => ({ nodeType: "blockquote", data: {}, content: [p(value)] });
const hr = { nodeType: "hr", data: {}, content: [] };
const a = (uri, value) => ({ nodeType: "hyperlink", data: { uri }, content: [text(value)] });
const postLink = (id, value) => ({ nodeType: "entry-hyperlink", data: { target: link(id) }, content: [text(value)] });
const image = (id) => ({ nodeType: "embedded-asset-block", data: { target: link(id, "Asset") }, content: [] });
const doc = (...content) => ({ nodeType: "document", data: {}, content });

const sampleNote = p(
  text("This is a sample article that shows how posts look on the site. Replace it in Contentful with a real article, or delete it.", ["italic"]),
);

// --- Content ------------------------------------------------------------------------------------

const categories = [
  { id: "category-engineering", title: "Engineering", slug: "engineering" },
  { id: "category-design", title: "Design", slug: "design" },
  { id: "category-growth", title: "Growth", slug: "growth" },
];

const assets = [
  { id: "sample-post-cover-development", path: "services/categories/development.webp", description: "A developer typing code on a desktop computer" },
  { id: "sample-post-cover-branding", path: "services/categories/branding.webp", description: "Brand identity work on a desk: a logo on screen, business cards, and a mood board on a tablet" },
  { id: "sample-post-cover-marketing", path: "services/categories/marketing.webp", description: "Two people going over charts on a laptop and printed reports" },
  { id: "sample-post-image-software", path: "services/categories/software.webp", description: "Code on a monitor and a tablet, with a hand-drawn flowchart beside the keyboard" },
  { id: "person-ink-pixel-team-photo", path: "brand-drop.webp", description: "Ink Pixel Studios logo mark" },
];

const author = {
  id: "person-ink-pixel-team",
  fields: {
    name: "Ink Pixel Studios Team",
    role: "Designers, developers, and strategists",
    bio: "Sample author for the sample articles. Replace with each article's real author in Contentful.",
    photo: link("person-ink-pixel-team-photo", "Asset"),
  },
};

const posts = [
  {
    id: "sample-post-boring-databases",
    title: "Why we still reach for boring databases in 2026",
    slug: "why-we-still-reach-for-boring-databases",
    category: "category-engineering",
    publishedDate: "2026-03-01",
    excerpt:
      "New databases arrive every year. For most products, a well-known relational database is still the right first choice. Here's why, and when we make an exception.",
    coverImage: "sample-post-cover-development",
    body: doc(
      p("Every new project starts with the same question: where does the data live? The exciting answer changes every year. The answer we keep coming back to doesn't."),
      h(2, "What we mean by boring"),
      p("Boring doesn't mean old or slow. It means a tool whose failure modes are well known, whose documentation answers the hard questions, and that the next developer on the project already knows."),
      ul(
        "Decades of production use, so the edge cases are written down",
        "Mature backup, restore, and replication tools",
        "Plenty of people who can run it at three in the morning",
        "Hosting on every major cloud, with no lock-in",
      ),
      h(2, "Where the time actually goes"),
      p(
        "On most products, the database is not the bottleneck. Slow pages usually come from a missing index or a query that runs once per row, and ",
        text("EXPLAIN ANALYZE", ["code"]),
        " finds those in minutes. ",
        a("https://www.postgresql.org/docs/current/using-explain.html", "The PostgreSQL documentation"),
        " covers it well.",
      ),
      image("sample-post-image-software"),
      h(3, "A short checklist before choosing something new"),
      ol(
        "Name the problem the current database can't solve",
        "Prove it with a test on real data, not a benchmark",
        "Count who on the team can run the new tool",
        "Plan how you would move back if it doesn't work out",
      ),
      quote("The best database for a new product is usually the one the team can debug quickly."),
      h(2, "When we do reach for something new"),
      p(
        "Sometimes the problem really is different: search across millions of documents, time series at high volume, or real-time sync on mobile. Then we add the specialised tool next to the main database, not instead of it. The same thinking applies to design work; see ",
        postLink("sample-post-design-systems", "the case for design systems before brand systems"),
        ".",
      ),
      hr,
      sampleNote,
    ),
  },
  {
    id: "sample-post-design-systems",
    title: "The case for design systems before brand systems",
    slug: "design-systems-before-brand-systems",
    category: "category-design",
    publishedDate: "2026-02-01",
    excerpt:
      "When a new product needs both a brand and a design system, we build the design system first. The parts people touch come before the logo.",
    coverImage: "sample-post-cover-branding",
    body: doc(
      p("A brand system decides how a company looks and sounds. A design system decides how its product works. When a new product needs both, we start with the second."),
      h(2, "Start with the parts people touch"),
      p("Visitors meet a product through its buttons, forms, and navigation long before they notice the logo. Getting those parts consistent early saves time on every screen that follows."),
      ul(
        "Type sizes and spacing that work from phone to desktop",
        "Colours with enough contrast to read comfortably",
        "Buttons, inputs, and messages with every state designed",
        "Components named the same way in design and in code",
      ),
      h(2, "How the brand catches up"),
      p("Once the components are in place, the brand becomes a layer on top: colours, type, imagery, and tone of voice. Because the components already exist, a brand change updates the whole product at once."),
      quote("A design system is a promise that the next screen will feel like the last one."),
      h(3, "What we hand over"),
      ol("A component library in the design tool", "The same components in code, documented", "Guidelines for when to use each one"),
      p(
        "Curious how this connects to growth? Read ",
        postLink("sample-post-growth-experiments", "three growth experiments we're running this quarter"),
        ".",
      ),
      hr,
      sampleNote,
    ),
  },
  {
    id: "sample-post-growth-experiments",
    title: "Three growth experiments we're running this quarter",
    slug: "three-growth-experiments-this-quarter",
    category: "category-growth",
    publishedDate: "2026-01-01",
    excerpt:
      "Three small, measurable experiments, from a shorter enquiry form to a monthly email, and how we judge whether each one worked.",
    coverImage: "sample-post-cover-marketing",
    body: doc(
      p("Growth is easier to reason about as a set of small, measurable experiments than as one big redesign. Here is how we set up three of them."),
      h(2, "1. A shorter enquiry form"),
      p("Every field on a form is a reason to leave. The first experiment asks only for a name, an email, and a message, then follows up with the rest."),
      h(2, "2. Case studies on service pages"),
      p("Visitors reading about a service want proof that it works. Showing related projects on each service page puts that proof where the question is asked."),
      h(2, "3. A monthly insight email"),
      p("Most visitors are not ready to start a project on their first visit. A short monthly email keeps the studio in mind until they are."),
      h(3, "How we measure each one"),
      ul(
        "One clear goal per experiment, agreed before it starts",
        "Enough time to see a real difference, not just noise",
        "A written result, whether it worked or not",
      ),
      quote("An experiment that fails clearly teaches more than one that half works."),
      p(
        "For the engineering side of keeping things simple, see ",
        postLink("sample-post-boring-databases", "why we still reach for boring databases"),
        ".",
      ),
      hr,
      sampleNote,
    ),
  },
];

console.log(`Seeding space ${spaceId}, environment "${environmentId}" (locale ${locale})`);
for (const { id, title, slug } of categories) await upsert(id, "category", { title, slug });
for (const { id, path, description } of assets) await upsertAsset(id, path, description);
await upsert(author.id, "person", author.fields);

// The posts link to each other; on a first run, a link to a post not created yet works once it is.
for (const { id, title, slug, category, publishedDate, excerpt, coverImage, body } of posts) {
  const fields = {
    excerpt,
    coverImage: link(coverImage, "Asset"),
    author: link(author.id),
    body,
  };
  const created = await create(id, "post", { title, slug, category: link(category), publishedDate, ...fields });
  if (!created) await updateSample(id, fields);
}
console.log("Done.");
