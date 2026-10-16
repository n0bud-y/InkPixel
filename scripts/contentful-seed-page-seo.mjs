// One-time: adds a Page SEO entry, published, for each page whose content is in code, with the
// meta title and description the site used until then (most descriptions are stand-ins, issue
// I9: edit them in Contentful). The site falls back to the same text when an entry is missing.
// Usage: npm run contentful:seed-page-seo
// (needs the model: migration 0007)
// Every entry has a fixed id, so running it again skips what already exists.

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
  return response.status === 204 ? null : response.json();
}

const locale = (await cma("/locales")).items.find((item) => item.default).code;
const localized = (fields) =>
  Object.fromEntries(
    Object.entries(fields)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, { [locale]: value }]),
  );

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

// [id suffix, page, address, meta title, meta description]
const pages = [
  [
    "home",
    "Home",
    "/",
    "Ink Pixel Studios | Software & Digital Studio in Karachi",
    "Ink Pixel Studios is a digital studio in Karachi building websites, apps, custom software, brands, and AI automation for businesses worldwide.",
  ],
  [
    "about",
    "About",
    "/about",
    "About | Ink Pixel Studios",
    "Ink Pixel Studios is a software and digital solutions company in Karachi, Pakistan: the people, the values, and the way we work.",
  ],
  [
    "services",
    "Services",
    "/services",
    "Services | Ink Pixel Studios",
    "Branding, web and app development, custom software, marketing, and AI automation: the services Ink Pixel Studios offers, from first idea to launch.",
  ],
  [
    "web-development",
    "Web Development (service)",
    "/services/development/web-development",
    "Web Development | Ink Pixel Studios",
    "Websites, online stores, web apps, and content-managed sites, designed, built, tested, and looked after by Ink Pixel Studios.",
  ],
  [
    "industries",
    "Industries",
    "/industries",
    "Industries | Ink Pixel Studios",
    "How Ink Pixel Studios builds software and digital products for fintech, healthcare, real estate, logistics, and e-commerce businesses.",
  ],
  [
    "technologies",
    "Technologies",
    "/technologies",
    "Technologies | Ink Pixel Studios",
    "The technologies Ink Pixel Studios builds with: web and mobile frameworks, cloud platforms, databases, and AI tools.",
  ],
  [
    "case-studies",
    "Case studies",
    "/case-studies",
    "Case studies | Ink Pixel Studios",
    "Projects by Ink Pixel Studios: the challenge, what we built, and the results, from e-commerce sites and CRM platforms to mobile apps.",
  ],
  [
    "blog",
    "Blog",
    "/blog",
    "Blog | Ink Pixel Studios",
    "Articles from the Ink Pixel Studios team on design, development, product, and growth.",
  ],
  [
    "contact",
    "Contact",
    "/contact",
    "Contact | Ink Pixel Studios",
    "Tell Ink Pixel Studios about your project. Email info@inkpixelstudios.com or visit our office on Shahra-e-Faisal, Karachi; we reply within a working day.",
  ],
  [
    "privacy-policy",
    "Privacy policy",
    "/privacy-policy",
    "Privacy policy | Ink Pixel Studios",
    "How Ink Pixel Studios collects, uses, and protects personal data on this website.",
  ],
  ["terms", "Terms", "/terms", "Terms | Ink Pixel Studios", "The terms of use of the Ink Pixel Studios website."],
];

console.log(`Seeding space ${spaceId}, environment "${environmentId}" (locale ${locale})`);
for (const [id, name, path, title, description] of pages) {
  if (title.length > 60 || description.length > 160) throw new Error(`${path}: title or description too long`);
  await upsert(`page-seo-${id}`, "pageSeo", { name, path, title, description });
}
