// One-time: adds the three sample posts from the design (and their categories) to Contentful
// and publishes them, so the home page "From the studio." cards have content.
// PLACEHOLDER content: replace or delete these posts in Contentful before launch.
// Usage: npm run contentful:seed-posts   (needs the blog model: 0001-blog-model.cjs)
// Entries have fixed ids, so running it again skips what already exists.

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
  return response.json();
}

const locale = (await cma("/locales")).items.find((item) => item.default).code;
const localized = (fields) =>
  Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, { [locale]: value }]));
const link = (id) => ({ sys: { type: "Link", linkType: "Entry", id } });

// Creates the entry with a fixed id (skipped if it exists) and publishes it.
async function upsert(id, contentType, fields) {
  if (await cma(`/entries/${id}`)) {
    console.log(`  exists, skipped: ${id}`);
    return;
  }
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
}

// Sample body: a repeated placeholder paragraph, long enough for the reading time in the
// design (about 200 words a minute).
const paragraph =
  "This is placeholder text for a sample article. It shows how a real post looks on the site: the title, category, date, and reading time on the home page cards, and later the full article layout. Replace this body with the real article in Contentful, or delete the post.";
const body = (minutes) => {
  const words = paragraph.split(/\s+/).length;
  const count = Math.ceil(((minutes - 0.5) * 200) / words);
  return {
    nodeType: "document",
    data: {},
    content: Array.from({ length: count }, () => ({
      nodeType: "paragraph",
      data: {},
      content: [{ nodeType: "text", value: paragraph, marks: [], data: {} }],
    })),
  };
};

const categories = [
  { id: "category-engineering", title: "Engineering", slug: "engineering" },
  { id: "category-design", title: "Design", slug: "design" },
  { id: "category-growth", title: "Growth", slug: "growth" },
];

const posts = [
  {
    id: "sample-post-boring-databases",
    title: "Why we still reach for boring databases in 2026",
    slug: "why-we-still-reach-for-boring-databases",
    category: "category-engineering",
    publishedDate: "2026-03-01",
    minutes: 6,
  },
  {
    id: "sample-post-design-systems",
    title: "The case for design systems before brand systems",
    slug: "design-systems-before-brand-systems",
    category: "category-design",
    publishedDate: "2026-02-01",
    minutes: 4,
  },
  {
    id: "sample-post-growth-experiments",
    title: "Three growth experiments we're running this quarter",
    slug: "three-growth-experiments-this-quarter",
    category: "category-growth",
    publishedDate: "2026-01-01",
    minutes: 5,
  },
];

console.log(`Seeding space ${spaceId}, environment "${environmentId}" (locale ${locale})`);
for (const { id, title, slug } of categories) await upsert(id, "category", { title, slug });
for (const { id, title, slug, category, publishedDate, minutes } of posts) {
  await upsert(id, "post", { title, slug, category: link(category), publishedDate, body: body(minutes) });
}
console.log("Done.");
