// One-time: adds the case studies built from the designs to Contentful, with their images,
// clients, and sections, all published:
// - Gulbaan (from the first, hard-coded build of the page). Its text is the content document's
//   (Website Content – Ink Pixel Studio.docx, 23 Oct 2026).
// - Terminal Gateway CRM (from CRM-terminalgateway-case-study.svg). Its text is the content
//   document's too (the design's had come from another agency's case study).
// - Cathy O’Bryan’s Books (from application-Cathy-O’Bryan’s-Books.svg). The design's copy,
//   except the parts copied from other projects (see that section below).
// - Four marketing case studies (13 Nov 2026, no designs): Pak Armoring, G&W Towers, NG Interiors &
//   Constructions, Aawaz Institute of Media Sciences (Star Azizi Builders removed 17 Nov 2026,
//   project head; its entries were deleted from Contentful). Developer-written copy
//   (no results, numbers, or quotes); stand-in social graphics except Pak Armoring's, which come
//   from its website (issue I18).
// Replace the placeholder text in Contentful before launch.
// Usage: npm run contentful:seed-case-studies
// (needs the model: migrations 0002 to 0005, 0009 for the card images, 0011 for the marketing
// sections)
// Everything has a fixed id, so running it again skips what already exists.
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
const images = new URL("../contentful/seed/", import.meta.url);

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
const link = (id, linkType = "Entry") => ({ sys: { type: "Link", linkType, id } });

// Uploads an image (a path inside contentful/seed/), creates the asset with a fixed id (skipped
// if it exists), waits for Contentful to process it, and publishes it. The description is the
// image's alt text.
async function upsertAsset(id, path, contentType, description) {
  if (await cma(`/assets/${id}`)) {
    console.log(`  exists, skipped: ${id}`);
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
        title: description,
        description,
        file: { contentType, fileName, uploadFrom: link(upload.sys.id, "Upload") },
      }),
    },
  });
  await cma(`/assets/${id}/files/${locale}/process`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(asset.sys.version) },
  });
  for (let attempt = 0; !asset.fields.file?.[locale]?.url; attempt++) {
    if (attempt === 30) throw new Error(`Contentful did not finish processing ${fileName}.`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    asset = await cma(`/assets/${id}`);
  }
  await cma(`/assets/${id}/published`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(asset.sys.version) },
  });
  console.log(`  uploaded and published: ${id}`);
}

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

// Adds fields an existing entry doesn't have yet (e.g. from a later migration) and publishes
// it. Fields it already has are left alone. Skipped if an editor has unpublished changes on it,
// so the script never publishes someone's draft.
async function addMissingFields(id, fields) {
  const entry = await cma(`/entries/${id}`);
  if (!entry) throw new Error(`Entry ${id} does not exist.`);
  const missing = Object.keys(fields).filter((key) => entry.fields[key] === undefined);
  if (!missing.length) {
    console.log(`  up to date, skipped: ${id}`);
    return;
  }
  if (entry.sys.version > (entry.sys.publishedVersion ?? 0) + 1) {
    console.warn(`  has unpublished changes, skipped: ${id} (add ${missing.join(", ")} in Contentful)`);
    return;
  }
  const updated = await cma(`/entries/${id}`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(entry.sys.version) },
    body: { fields: { ...entry.fields, ...localized(Object.fromEntries(missing.map((key) => [key, fields[key]]))) } },
  });
  await cma(`/entries/${id}/published`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(updated.sys.version) },
  });
  console.log(`  updated and published: ${id} (added ${missing.join(", ")})`);
}

// Rich Text: paragraphs, and a bullet list whose items are "Title: text" (the title in bold).
const text = (value, marks = []) => ({ nodeType: "text", value, marks, data: {} });
const paragraph = (value) => ({ nodeType: "paragraph", data: {}, content: [text(value)] });
const titledBullets = (items) => ({
  nodeType: "unordered-list",
  data: {},
  content: items.map(([title, value]) => ({
    nodeType: "list-item",
    data: {},
    content: [{ nodeType: "paragraph", data: {}, content: [text(title, [{ type: "bold" }]), text(`: ${value}`)] }],
  })),
});
const richText = (...blocks) => ({
  nodeType: "document",
  data: {},
  content: blocks.map((block) => (typeof block === "string" ? paragraph(block) : block)),
});

const assets = [
  ["gulbaan-logo", "gulbaan/logo.svg", "image/svg+xml", "Gulbaan"],
  ["gulbaan-hero", "gulbaan/hero.webp", "image/webp", "The Gulbaan website on a desktop monitor, with two product cards"],
  ["gulbaan-idea", "gulbaan/idea.webp", "image/webp", "The Gulbaan home page on a laptop"],
  ["gulbaan-challenges", "gulbaan/challenges.webp", "image/webp", "A bouquet of fresh flowers from the Gulbaan collection"],
  [
    "gulbaan-platform-features",
    "gulbaan/platform-features.webp",
    "image/webp",
    "A Gulbaan product page with the custom bouquet request form",
  ],
  ["gulbaan-insights", "gulbaan/insights.webp", "image/webp", "A client sitting cross-legged with a laptop"],
  ["gulbaan-what-we-did", "gulbaan/what-we-did.webp", "image/webp", "The full Gulbaan home page on a desktop monitor"],
  ["gulbaan-outcomes", "gulbaan/outcomes.webp", "image/webp", "Gulbaan website pages: checkout, catalogue, home, and product"],
  ["gulbaan-results", "gulbaan/results.webp", "image/webp", "The Gulbaan website on a desktop, laptop, tablet, and phone"],
];

const sections = [
  {
    id: "gulbaan-section-idea",
    title: "The Idea Behind Gulbaan",
    image: "gulbaan-idea",
    layout: "Image left",
    body: richText(
      "Gulbaan was conceived to revolutionize the online flower retailing landscape by making it more connected and accessible to enable customers to easily discover and order high-quality flowers online.",
      "The aim was to introduce the elegance of the traditional gift of flowers to a digital world with an easier way for customers to browse collections and select flowers for various occasions. Gulbaan's goal is to make the shopping process for their flowers easier by creating an engaging website to go with. It's a part of the platform's efforts to build on the idea of a seamless digital shopping experience with a touch of personalization that makes gifting flowers so special.",
    ),
  },
  {
    id: "gulbaan-section-challenges",
    title: "Challenges & Solutions",
    image: "gulbaan-challenges",
    layout: "Image right",
    body: richText(
      "Showcasing products is not enough to create an engaging online flower retail experience. Customers must have a seamless experience when navigating floral choices, comprehending their options and finalizing their purchase in a convenient manner. Gulbaan's digital experience had to look great when it came to showcasing flowers online and ensuring it was accessible for customers in Lahore and Islamabad to purchase flowers online.",
      "The focus was to develop a dedicated eCommerce solution, highlighting the floral line in a welcoming e-commerce environment. The platform focuses on product discovery, easy navigation, and a hassle-free ordering process, ensuring a seamless shopping experience and aiding customers in finding the flowers they desire to send.",
    ),
  },
  {
    id: "gulbaan-section-platform-features",
    title: "Platform Features",
    image: "gulbaan-platform-features",
    layout: "Image left",
    body: richText(
      "Gulbaan's online shopping experience brings essential features together to make flower discovery and ordering more convenient.",
      titledBullets([
        ["Floral Product Collection", "Explore a selection of fresh, premium flowers for different gifting needs."],
        ["Online Shopping Experience", "Browse products through a dedicated digital storefront."],
        ["Product Discovery", "Navigate floral options and find arrangements suited to different occasions."],
        ["Convenient Ordering", "Place flower orders through an accessible online shopping journey."],
        ["Location-Focused Service", "Shop for flower delivery services available across Lahore and Islamabad."],
        [
          "Digital Brand Experience",
          "Enjoy an online storefront designed to showcase Gulbaan's floral offerings and brand identity.",
        ],
      ]),
    ),
  },
  {
    id: "gulbaan-section-insights",
    title: "Insights from Client",
    image: "gulbaan-insights",
    layout: "Image right",
    body: richText(
      "The project is a testament to the significance of creating a traditional shopping experience accessible online. A flower delivery service like Gulbaan requires customers to have an online experience that is as pleasing to the eye, but as simple as buying real flowers. The success of the brand's fresh, high-quality flowers in Lahore and Islamabad sets a solid base for their digital presence.",
      "These priorities emphasize the importance of having an inviting storefront, good product presentation and a convenient customer journey. Gulbaan can enhance the online journey to mirror the emotional essence of gifting flowers, making it more personal and accessible.",
    ),
  },
  {
    id: "gulbaan-section-what-we-did",
    title: "What Did We Do?",
    image: "gulbaan-what-we-did",
    layout: "Image left",
    body: richText(
      "We concentrated on building Gulbaan's online presence in the realm of its floral products and delivery services. The strategy was to create a welcoming online environment for presenting products and facilitate a transparent and convenient shopping experience. The way the front page is set up to discover products and make it easy for customers to navigate the store encourages customers to learn about the flowers and progress to ordering.",
      "Gulbaan's digital experience was built to embody its brand identity and render online flower shopping accessible. With this work, people in Lahore and Islamabad have a dedicated channel to find out about the products and the flower retail and delivery service of the brand.",
    ),
  },
  {
    id: "gulbaan-section-outcomes",
    title: "The Outcomes",
    image: "gulbaan-outcomes",
    layout: "Image below",
    body: richText(
      "The online platform by Gulbaan provides an online hub for customers to buy fresh flowers. The floral service has taken its floral collection to an easily accessible online store, allowing customers to find their floral products without just using the traditional shopping method.",
      "The platform also provides Gulbaan with a digital platform to communicate its brand name, highlight its products and services and reach out to its customers in Lahore and Islamabad. As a product discovery and convenience-based shopping platform, Gulbaan can help facilitate its flower delivery service with an easier online experience that enhances the personal meaning of flowers.",
    ),
  },
  {
    id: "gulbaan-section-results",
    title: "The Results",
    image: "gulbaan-results",
    layout: "Image right",
    body: richText(
      "Overall, the Gulbaan project will lay the groundwork for a more user-friendly online flower shopping experience in the target markets. The brand's digital storefront is making the flowers more accessible to people, allowing them to browse what they have to offer and order digitally. It also helps to reinforce Gulbaan's digital identity by offering its service via a dedicated eCommerce channel.",
      "Although specific performance metrics like sales growth, conversion rates or customer acquisition outcomes were not disclosed, the project showcases the potential of a targeted digital shopping experience for a flower retail and delivery enterprise. Gulbaan is set to bring its high-quality floral collection to the customers who want a hassle-free option for sending flowers in Lahore and Islamabad.",
    ),
  },
];

console.log(`Seeding space ${spaceId}, environment "${environmentId}" (locale ${locale})`);

for (const [id, path, contentType, description] of assets) {
  await upsertAsset(id, path, contentType, description);
}

await upsert("client-gulbaan", "client", {
  name: "Gulbaan",
  logo: link("gulbaan-logo", "Asset"),
  logoApproved: true,
  logoApproval: "Confirmed by the project head on 8 Oct 2026",
});

await upsert("gulbaan-tech-web", "techStackGroup", {
  label: "Web Architecture",
  technologies: ["bigcommerce", "nodejs"],
});
await upsert("gulbaan-tech-tools", "techStackGroup", { label: "Tools & Testing", technologies: ["figma"] });
await upsert("gulbaan-tech-stack", "caseStudyTechStack", {
  title: "Tech Stack Used",
  groups: [link("gulbaan-tech-web"), link("gulbaan-tech-tools")],
});

for (const { id, title, image, layout, body } of sections) {
  await upsert(id, "caseStudySection", { title, body, image: link(image, "Asset"), layout });
}

// Page order: the tech stack sits between "The Outcomes" and "The Results", as in the design.
const sectionOrder = [...sections.slice(0, 6).map(({ id }) => id), "gulbaan-tech-stack", sections[6].id];

await upsert("case-study-gulbaan", "caseStudy", {
  title: "Gulbaan",
  slug: "gulbaan",
  client: link("client-gulbaan"),
  excerpt: "A flower retail and delivery service offering fresh, premium flowers across Lahore and Islamabad.",
  heroHeading: "A flower retail and delivery service offering fresh, premium flowers across Lahore and Islamabad.",
  heroText:
    "Gulbaan is a flower retail and delivery company that delivers fresh and quality flower arrangements to people all around Lahore and Islamabad. Gulbaan is made for those who want to celebrate special occasions, express emotions, and make someone's day brighter, providing a convenient solution to explore and order flowers online.",
  heroImage: link("gulbaan-hero", "Asset"),
  sections: sectionOrder.map((id) => link(id)),
  industries: ["ecommerce"],
  services: ["development"],
  region: "Pakistan",
});

// Terminal Gateway CRM, with the content document's text. Industries and services are left empty
// until confirmed.

const terminalGatewayAssets = [
  ["tg-hero", "crm-terminal-gateway/hero.webp", "image/webp", "Terminal Gateway CRM screens: dashboard, inbox, projects, and analytics"],
  ["tg-intro", "crm-terminal-gateway/intro.webp", "image/webp", "Terminal Gateway dashboard overview, inbox, and projects"],
  ["tg-idea", "crm-terminal-gateway/idea.webp", "image/webp", "Terminal Gateway customer feedback survey"],
  ["tg-challenge", "crm-terminal-gateway/challenge.webp", "image/webp", "Terminal Gateway project planner calendar"],
  ["tg-solution", "crm-terminal-gateway/solution.webp", "image/webp", "Terminal Gateway event page with a live video session"],
  ["tg-screens", "crm-terminal-gateway/screens.webp", "image/webp", "Terminal Gateway screens: projects, My Drive, and inbox"],
  [
    "tg-impact",
    "crm-terminal-gateway/impact.webp",
    "image/webp",
    "Terminal Gateway analytics: leads, customer sentiment, customer distribution, and audience demographics",
  ],
  ["tg-apps", "crm-terminal-gateway/apps.webp", "image/webp", "Five Terminal Gateway screens around My Drive"],
];

const terminalGatewaySections = [
  {
    id: "tg-section-intro",
    title: "Introduction",
    image: "tg-intro",
    layout: "Image right",
    body: richText(
      "Terminal Gateway CRM is a complete business management solution for consolidating the critical business functions into a single workspace. The platform's development is designed to integrate customer relationship management, sales tracking, project management, team communication, and file storage, providing a more streamlined and efficient approach for businesses to manage their daily operations. Integrated tools and a unified dashboard simplify the way teams access vital information, coordinate tasks and track business activity without the constant need to switch to a different app. The aim is to make processes easier and give a comprehensive overview of the business at a single glance.",
    ),
  },
  {
    id: "tg-section-idea",
    title: "The Idea Behind Terminal Gateway",
    image: "tg-idea",
    layout: "Image left",
    body: richText(
      "The concept behind Terminal Gateway was to come up with a single CRM system that brings together all moving parts of a business. Customer conversations, sales leads, project deadlines, team files and performance data can often be in different tools, making it difficult to manage information consistently. These are the critical capabilities combined in a reachable environment: Terminal Gateway. The platform aims to seamlessly integrate customer management, collaboration, and project organization to keep teams connected, ensure visibility of all their work, and streamline business activities with a more efficient digital experience.",
    ),
  },
  {
    id: "tg-section-challenge",
    title: "The Challenge",
    image: "tg-challenge",
    layout: "Image right",
    body: richText(
      "As a business expands, there are countless demands on the business owner to manage customer connections, sales schedules, deadlines, internal communications and documents, all at once. These tasks become fragmented across separate applications, which can lead to increased time spent looking for information, switching between tools and coordinating updates. This disintegration can be harder to manage and keep track of customer communications and project progress. The problem was to overcome the typical operational challenges with a centralized business management system that gathers all the information needed and simplifies everyday business workflow.",
    ),
  },
  {
    id: "tg-section-solution",
    title: "The Solution",
    image: "tg-solution",
    layout: "Image left",
    body: richText(
      "These challenges are overcome with Terminal Gateway's single CRM and business management platform, bringing together customer data, sales activity, team communication, project workflows, shared files and customer analytics. It offers a dashboard view of key business activity and a centralized inbox, allowing teams to keep conversations organized in one place. Task coordination and deadlines are facilitated with project boards, templates and a common calendar and the shared file space of My Drive is used for team files. Customer Analytics gives an added layer of visibility and includes information on customer sentiment, distribution and demographics. These characteristics make for a more cohesive environment in which to run the day-to-day business.",
    ),
  },
  {
    id: "tg-section-impact",
    title: "The Impact of Terminal Gateway",
    image: "tg-impact",
    layout: "Image right",
    body: richText(
      "By making businesses more connected, Terminal Gateway offers a better approach to organizing everyday operations. This integration streamlines the process of customer conversations, sales visibility, project planning, file storage, and customer analytics, all of which reduce the need to navigate between multiple tools. Teams will be able to locate pertinent information more quickly, collaborate on projects using shared workflows, and have a better sense of what is happening. Additionally, its centralized system establishes an environment for greater uniformity in collaboration and smart company choices. Instead of using fragmented systems, businesses can have one integrated workspace to help them manage their work day to day and future operational requirements.",
    ),
  },
  {
    id: "tg-section-closing",
    title: "One Platform For The Whole Business",
    image: "tg-apps",
    layout: "Image right",
    body: richText(
      "Terminal Gateway integrates CRM, sales, communications, project management, file storage and customer analytics all in one place.",
      "With a single, unified workspace, businesses can gain access to the tools and information they need for managing customer relationships and coordinating internal work.",
    ),
  },
];

for (const [id, path, contentType, description] of terminalGatewayAssets) {
  await upsertAsset(id, path, contentType, description);
}

await upsertAsset("tg-logo", "crm-terminal-gateway/logo.png", "image/png", "Terminal Gateway");
const terminalGatewayLogo = {
  logo: link("tg-logo", "Asset"),
  logoApproved: true,
  logoApproval: "Confirmed by the project head on 22 Oct 2026",
};
await upsert("client-terminal-gateway", "client", { name: "Terminal Gateway", ...terminalGatewayLogo });
// Spaces seeded before the logo was added (22 Oct 2026) get it added here.
await addMissingFields("client-terminal-gateway", terminalGatewayLogo);

for (const { id, title, image, layout, body } of terminalGatewaySections) {
  await upsert(id, "caseStudySection", { title, body, image: link(image, "Asset"), layout });
}
await upsert("tg-showcase-screens", "caseStudyShowcase", {
  name: "Terminal Gateway screens",
  image: link("tg-screens", "Asset"),
});
// The document's six features each have a title too; a card holds one line of up to 160
// characters, so the cards show the descriptions.
await upsert("tg-features", "caseStudyFeatureGrid", {
  title: "Six Features of the Terminal Gateway CRM",
  items: [
    "View revenue, leads, deals, and team activity from one dashboard for a clearer overview of business operations.",
    "Bring chats, messages, and customer conversations into one accessible inbox to simplify communication management.",
    "Organize projects, manage workflows, and use ready-made templates to help teams structure their work efficiently.",
    "Coordinate events, track important deadlines, and keep team schedules organized through a shared planning calendar.",
    "Keep business files in a shared digital workspace so team members can access and organize important documents.",
    "Explore customer sentiment, distribution, and audience demographics to better understand customer patterns and business audiences.",
  ],
});

// The hero image cut into one layer per screenshot (from the flattened design image), back to
// front, so each screen can float on its own. Each layer is the full size of the hero image.
const heroLayerScreens = ["Interval Chat", "Ask AI", "All Contacts", "Dashboard", "Extensions Logs", "Inbox", "Project boards"];
for (const [index, screen] of heroLayerScreens.entries()) {
  await upsertAsset(
    `tg-hero-layer-${index + 1}`,
    `crm-terminal-gateway/hero-layer-${index + 1}.webp`,
    "image/webp",
    `Terminal Gateway hero layer ${index + 1}: ${screen} screen`,
  );
}
const heroLayers = heroLayerScreens.map((_, index) => link(`tg-hero-layer-${index + 1}`, "Asset"));

// The image on its project card on service pages (from the project head, 22 Oct 2026).
await upsertAsset(
  "tg-card",
  "crm-terminal-gateway/card.webp",
  "image/webp",
  "Terminal Gateway CRM on a laptop, showing the My Drive screen",
);
const terminalGatewayCard = { cardImage: link("tg-card", "Asset") };

// Page order, as in the design: four text + image sections, the screens, the features, then two
// more text + image sections.
const [intro, idea, challenge, solution, impact, closing] = terminalGatewaySections.map(({ id }) => id);

await upsert("case-study-crm-terminal-gateway", "caseStudy", {
  title: "Terminal Gateway CRM",
  slug: "crm-terminal-gateway",
  client: link("client-terminal-gateway"),
  excerpt: "An all-in-one CRM that brings contacts, sales, projects, communication, and files into one dashboard.",
  heroHeading: "Run Your Entire Business From One Powerful CRM.",
  heroImage: link("tg-hero", "Asset"),
  heroLayers,
  heroLayout: "Centered",
  ...terminalGatewayCard,
  sections: [intro, idea, challenge, solution, "tg-showcase-screens", "tg-features", impact, closing].map((id) => link(id)),
});
// Spaces seeded before the hero layers existed (0004) get them added here.
await addMissingFields("case-study-crm-terminal-gateway", { heroLayers });
// Spaces seeded before the card images (0009, 22 Oct 2026) get them added here.
await addMissingFields("case-study-crm-terminal-gateway", terminalGatewayCard);

// Cathy O’Bryan’s Books (from application-Cathy-O’Bryan’s-Books.svg). The copy is the design's,
// except where it came from another project: the hero eyebrow ("Swipe, Watch, Order"),
// "Web Interface for Restaurant Partners", the "$1.2M in revenue" result, a second testimonial
// from another company, and the closing panel (which named another agency and its "50+ food
// delivery platforms") were replaced or left out. Cathy approved her quote in writing
// (confirmed by the project head on 9 Oct 2026).
const cathyAssets = [
  ["cathy-img-hero", "hero.webp", "The Cathy O’Bryan app: book cards, the home screen, the author profile, the gallery, and sign-in"],
  ["cathy-img-about", "about.webp", "The app’s home screen: Good Morning, Jessica, with featured books"],
  ["cathy-img-screen-1", "screen-1.webp", "Opening screen with a wall of Cathy O’Bryan’s book covers"],
  ["cathy-img-screen-2", "screen-2.webp", "Sign-in screen: Log In To Dive Into Your Next Adventure"],
  ["cathy-img-screen-3", "screen-3.webp", "Home screen featuring A Chance Encounter and Top This Week"],
  ["cathy-img-screen-4", "screen-4.webp", "Home screen featuring Growing Up In The Cold War"],
  ["cathy-img-screen-5", "screen-5.webp", "Book page for Lost in Texas with a reader review and About The Book"],
  ["cathy-img-screen-6", "screen-6.webp", "Author profile with Cathy O’Bryan’s photo and biography"],
  ["cathy-img-screen-7", "screen-7.webp", "Gallery with paintings and illustrations categories"],
  ["cathy-img-screen-8", "screen-8.webp", "Artwork overview with artist, size, and location"],
  ["cathy-img-problem", "problem.webp", "Four app screens: book page, author profile, gallery, and artwork overview"],
  ["cathy-img-results", "results.webp", "The app’s home screen with featured books and Top This Week"],
  ["cathy-img-cta", "cta.webp", "Three app screens: the gallery, the home screen, and a chapter in the reader"],
];
for (const [id, fileName, description] of cathyAssets) {
  await upsertAsset(id, `cathy-obryans-books/${fileName}`, "image/webp", description);
}
const asset = (id) => link(id, "Asset");

// Items: cards, facts, and the highlight box. [id, title, text]
const cathyItems = [
  ["cathy-fact-industry", "Industry", "Books, Art & Entertainment"],
  ["cathy-fact-platform", "Platform", "iOS & Android Mobile App"],
  ["cathy-fact-core", "Core Experience", "Reading & Digital Library"],
  ["cathy-fact-additional", "Additional Experience", "Art Gallery & Author Portfolio"],
  ["cathy-services", "Services Provided", "Custom Mobile App Development, Integrated Secure Payment Gateway, Social Features"],
  ["cathy-problem-1", "Content Organization & Navigation", "Multiple books, reading content, author information, and artwork needed to be organized into a simple and intuitive experience."],
  ["cathy-problem-2", "Immersive Reading Experience", "Readers needed a distraction-free interface that made longer chapters comfortable to read directly on mobile devices."],
  ["cathy-problem-3", "Visual Presentation of Artwork", "Original paintings and illustrations required a gallery experience that preserved their visual impact while remaining easy to browse."],
  ["cathy-solution-1", "Unified Book Discovery", "A centralized home screen was designed to feature books, recommended titles, and popular content within an easy-to-browse interface."],
  ["cathy-solution-2", "Dedicated Digital Reader", "A clean, dark reading interface provides readers with a comfortable environment for exploring chapters and stories."],
  ["cathy-solution-3", "Interactive Art Gallery", "Paintings and illustrations are presented through dedicated gallery categories with detailed artwork views and information."],
  ["cathy-result-1", "One Creative Ecosystem", "Books, artwork, author information, and reading experiences are now available through a single platform."],
  // PLACEHOLDER: the design claimed "$1.2M in revenue generated within the first quarter after launch".
  ["cathy-result-2", "Unified Book Discovery", "Featured books, recommended titles, and popular reads now sit together on one home screen."],
  ["cathy-result-3", "Improved Content Discovery", "Users can move naturally between featured books, recommendations, author information, and artwork."],
  ["cathy-result-4", "More Engaging Reading", "A dedicated reader interface gives users a focused and comfortable way to experience Cathy’s stories."],
  ["cathy-result-5", "Stronger Author Connection", "Readers can learn more about Cathy’s life, books, artwork, and creative journey beyond individual publications."],
  ["cathy-result-6", "Rich Visual Experience", "The gallery transforms Cathy’s artwork into an interactive digital portfolio accessible directly through the app."],
  ["cathy-step-1", "Discovery & Content Planning", "We organized the author’s books, artwork, biography, and reading content to determine the ideal application structure."],
  ["cathy-step-2", "UX Strategy & Information Architecture", "User journeys were mapped to make books, chapters, profiles, libraries, and galleries easily accessible."],
  ["cathy-step-3", "UI/UX Design", "A premium dark interface was developed around Cathy’s existing book covers and artwork, allowing the content itself to remain the visual focus."],
  ["cathy-step-4", "Book & Reader Integration", "Book information and chapter-reading functionality were structured into an intuitive mobile reading experience."],
  ["cathy-step-5", "Gallery Experience", "Dedicated painting and illustration galleries were developed with individual artwork detail views."],
  ["cathy-step-6", "Testing & Optimization", "Every core interaction was refined for readability, usability, smooth navigation, and consistent performance across mobile screens."],
];
for (const [id, title, text] of cathyItems) await upsert(id, "caseStudyItem", { title, text });
const items = (prefix) => cathyItems.filter(([id]) => id.startsWith(prefix)).map(([id]) => link(id));

await upsertAsset("cathy-logo", "cathy-obryans-books/logo.png", "image/png", "Cathy O’Bryan");
const cathyLogo = {
  logo: asset("cathy-logo"),
  logoApproved: true,
  logoApproval: "Confirmed by the project head on 22 Oct 2026",
};
await upsert("client-cathy-obryan", "client", { name: "Cathy O’Bryan", ...cathyLogo });
// Spaces seeded before the logo was added (22 Oct 2026) get it added here.
await addMissingFields("client-cathy-obryan", cathyLogo);

await upsert("cathy-about", "caseStudySection", {
  title: "About The *Cathy O’Bryan* App",
  body: richText(
    "The Cathy O’Bryan App was created as a dedicated digital space where readers and art enthusiasts can discover Cathy’s creative world in one place. From browsing her published books and reading chapters to exploring original paintings and illustrations, the platform combines literature and visual art into an immersive mobile experience.",
  ),
  image: asset("cathy-img-about"),
  layout: "Image right",
  facts: items("cathy-fact-"),
  highlight: link("cathy-services"),
});
await upsert("cathy-gallery", "caseStudyGallery", {
  title: "*App Screens*",
  intro:
    "A thoughtfully designed interface that makes discovering books, reading stories, exploring artwork, and learning about the author simple and engaging.",
  images: cathyAssets.filter(([id]) => id.startsWith("cathy-img-screen-")).map(([id]) => asset(id)),
});
await upsert("cathy-problem", "caseStudyCards", {
  eyebrow: "The Problem",
  title: "The Thoughtful Tech Hurdles We Faced",
  intro:
    "Cathy’s creative work spans multiple areas, including novels, personal storytelling, paintings, and illustrations. The primary challenge was creating one digital experience that could showcase all of these elements without making the app feel crowded or difficult to navigate.",
  layout: "Timeline beside text",
  image: asset("cathy-img-problem"),
  items: items("cathy-problem-"),
});
await upsert("cathy-solution", "caseStudyCards", {
  eyebrow: "Our Solution",
  title: "*Innovative Solutions* That Transformed Content Into a Seamless Experience",
  layout: "Icon grid",
  items: items("cathy-solution-"),
});
await upsert("cathy-results", "caseStudyCards", {
  title: "The *Results* We Delivered",
  layout: "Around image",
  image: asset("cathy-img-results"),
  items: items("cathy-result-"),
});
await upsert("cathy-process", "caseStudyCards", {
  title: "How We Brought *Cathy O’Bryan’s* Creative World to Life",
  intro:
    "From initial brainstorming to successful launch, our comprehensive process blends creativity, strategy, and technology to bring app vision to life, ensuring seamless user experiences at every step.",
  layout: "Numbered steps",
  items: items("cathy-step-"),
});
await upsert("cathy-tech-group", "techStackGroup", {
  label: "Tech stack",
  technologies: ["getstream", "stripe", "tensorflow", "postgresql", "react"],
});
await upsert("cathy-tech-stack", "caseStudyTechStack", {
  title: "Tech Stack Behind The *Cathy O’Bryan Digital Experience*",
  layout: "Tiles",
  groups: [link("cathy-tech-group")],
});
await upsert("cathy-testimonial", "testimonial", {
  quote:
    "The goal was to create more than a traditional book app. We wanted readers to experience the stories, artwork, and personality behind the author through one beautifully connected digital platform.",
  name: "Cathy O’Bryan",
  role: "Author & Artist",
});
await upsert("cathy-testimonials", "caseStudyTestimonials", {
  title: "Hear Directly From Our Clients",
  subtitle: "Real stories, real success with us",
  testimonials: [link("cathy-testimonial")],
});
// PLACEHOLDER copy: the design's panel named another agency and its "50+ food delivery platforms".
await upsert("cathy-cta", "caseStudyCallToAction", {
  title: "*Your Story* Deserves a Beautiful App. Let’s Build Yours Next!",
  text: "From books and artwork to communities and commerce, we design and build mobile apps that bring your work closer to the people who love it.",
  buttonLabel: "Get Free Consultation Today!",
  buttonLink: "/contact",
  image: asset("cathy-img-cta"),
});

// The image on its project card on service pages (from the project head, 22 Oct 2026).
await upsertAsset(
  "cathy-card",
  "cathy-obryans-books/card.webp",
  "image/webp",
  "The Cathy O’Bryan app on two phones: the book covers and the sign-in screen",
);
const cathyCard = { cardImage: asset("cathy-card") };

await upsert("case-study-cathy-obryans-books", "caseStudy", {
  title: "Cathy O’Bryan’s Books",
  slug: "cathy-obryans-books",
  client: link("client-cathy-obryan"),
  excerpt: "A mobile app that brings Cathy O’Bryan’s books, stories, and artwork together in one reading and gallery experience.",
  heroLayout: "Light",
  heroEyebrow: "Read · Explore · Discover",
  heroHeading: "The Digital Experience That Brought *Cathy O’Bryan’s Books & Art Together*",
  heroText:
    "A personalized mobile platform designed to connect readers with Cathy O’Bryan’s books, stories, artwork, and creative journey through one seamless digital experience.",
  // The button shows once it has a link too (e.g. the app's store page).
  heroButtonLabel: "Explore The App",
  heroImage: asset("cathy-img-hero"),
  ...cathyCard,
  sections: [
    "cathy-about",
    "cathy-gallery",
    "cathy-problem",
    "cathy-solution",
    "cathy-results",
    "cathy-process",
    "cathy-tech-stack",
    "cathy-testimonials",
    "cathy-cta",
  ].map((id) => link(id)),
  services: ["applications"],
});
// Spaces seeded before the card images (0009, 22 Oct 2026) get them added here.
await addMissingFields("case-study-cathy-obryans-books", cathyCard);

// Marketing case studies (branding, social media, campaigns, lead generation), added 13 Nov 2026
// without designs. Each page: overview, brand identity (a brand board where the real logo is
// available, otherwise cards), social feed, funnel, approach steps, call to action. The copy
// describes the work only: no results, numbers, or quotes until the client supplies and approves
// them (add a "Case study: results" section then). Images in contentful/seed/<slug>/: Pak
// Armoring's posts, logo, and photo come from pakarmoring.com, and the Pak Armoury screenshots from
// pakarmoury.com; every other graphic is a stand-in designed in the site's style (issue I18).

const services = ["branding", "marketing"];
const servicesProvided = "Branding, Social Media Marketing, Paid Campaigns, Lead Generation";
const engagement = "Branding · Social · Campaigns · Lead Gen";
const reviewStep = [
  "Review & Refine",
  "Campaigns are reviewed regularly, with budget moved to the ads and audiences that bring the best enquiries.",
];

const marketingCaseStudies = [
  {
    key: "ng",
    slug: "ng-interiors-constructions",
    industries: ["real-estate"],
    title: "NG Interiors & Constructions",
    client: {
      id: "client-ng-interiors",
      name: "NG Interiors & Constructions",
      website: "https://www.facebook.com/nailagulistanofficial",
    },
    excerpt:
      "Branding, social media, and lead-generation campaigns for NG Interiors & Constructions, an interior design and construction company in Karachi.",
    cardHighlight: "Turning admirers of the work into consultation requests",
    heroHeading: "A Warmer Brand for *NG Interiors & Constructions*",
    heroText:
      "NG Interiors & Constructions designs and builds homes and spaces in Karachi. We shaped a warm, consistent brand for its social media and ran campaigns that turn admirers of its work into consultation requests.",
    heroAlt: "NG Interiors social media posts on a phone and cards, with a lead form",
    overview: {
      paragraphs: [
        "Interior design is a visual business: people decide whether they like a studio by scrolling through its work. A feed that looks scattered makes even beautiful projects look ordinary.",
        "We gave NG Interiors & Constructions one calm, warm look across its channels, planned content around ideas, process, and finished spaces, and ran campaigns that invite people to book a consultation.",
      ],
      industry: "Interiors & Construction",
      channels: "Facebook, Instagram",
    },
    brandCards: {
      title: "Warm, Calm, and *Unmistakably NG*",
      intro: "Earthy terracotta, soft sand, and an elegant serif give the brand the same feeling as the spaces it creates.",
      items: [
        ["Visual Language", "Warm neutrals and elegant type that let the work stand out."],
        ["Content Pillars", "Design ideas, behind-the-scenes process, and finished spaces."],
        ["Tone of Voice", "Friendly and expert, like advice from a designer you trust."],
      ],
    },
    social: {
      title: "A Feed That Feels Like *Home*",
      intro:
        "Design tips, process, and invitations to book a consultation, arranged into a feed that looks as considered as the spaces themselves.",
    },
    funnel: {
      title: "From Inspiration to *Consultation*",
      intro: "Homeowners take time to choose a designer, so the campaigns stay with them from the first idea to the first meeting.",
      stages: [
        ["Inspire", "Design ideas and finished spaces reach homeowners planning a change."],
        ["Educate", "Process and tips posts show how a project runs from concept to completion."],
        ["Capture", "Consultation forms collect details about each space."],
        ["Consult", "The team follows up and books a design consultation."],
      ],
    },
    steps: [
      ["Discovery", "We learned which projects and clients NG Interiors wants more of."],
      ["Brand Look", "A warm visual system for posts, stories, and ads."],
      ["Content Calendar", "Ideas, process, and finished-space posts planned month by month."],
      ["Campaign Setup", "Consultation ads and forms aimed at homeowners planning a project."],
      reviewStep,
    ],
    cta: {
      title: "Your Work Is Beautiful. Let’s Make Your *Feed* Match.",
      text: "We design social content and run campaigns that help design and build studios win the projects they want.",
    },
  },
  {
    key: "aawaz",
    slug: "aawaz-institute",
    title: "Aawaz Institute of Media Sciences",
    client: {
      id: "client-aawaz-institute",
      name: "Aawaz Institute of Media Sciences",
      website: "https://www.facebook.com/aawazprofessional",
    },
    excerpt:
      "Branding, social media, and admissions campaigns for Aawaz Institute of Media Sciences, a media training institute in Karachi.",
    cardHighlight: "Turning curious followers into enrolment enquiries",
    heroHeading: "Giving *Aawaz Institute* a Louder Voice",
    heroText:
      "Aawaz Institute of Media Sciences trains people for careers in media. We built a bold brand for its social channels and ran admissions campaigns that turn curious followers into enrolment enquiries.",
    heroAlt: "Aawaz Institute social media posts on a phone and cards, with a lead form",
    overview: {
      paragraphs: [
        "Choosing a course is a big decision for students and their families. They want to see the studio, the teachers, and what students learn before they enquire.",
        "We gave Aawaz Institute a bold, energetic look across its channels, planned content around courses and studio life, and ran campaigns timed around admissions, with simple forms for students to ask for details.",
      ],
      industry: "Media Education",
      channels: "Facebook, Instagram",
    },
    brandCards: {
      title: "Bold, Bright, and *On Air*",
      intro: "Deep plum, sunny yellow, and a heavy headline font give the institute the energy of a live studio.",
      items: [
        ["Visual Language", "Strong colours and big type that stand out in a busy feed."],
        ["Content Pillars", "Courses, workshops, studio life, and admissions."],
        ["Tone of Voice", "Encouraging and direct, written for students taking their first step into media."],
      ],
    },
    social: {
      title: "Content That *Speaks Up*",
      intro: "Course highlights, workshop announcements, and admissions calls, made to be noticed by students scrolling between classes.",
    },
    funnel: {
      title: "From Follower to *Student*",
      intro: "Admissions campaigns guide students from first hearing about the institute to talking with the admissions team.",
      stages: [
        ["Discover", "Admissions ads reach students interested in media careers."],
        ["Explore", "Course and workshop posts show what students will learn and do."],
        ["Enquire", "Lead forms and free counselling sessions make the next step easy."],
        ["Enrol", "The admissions team follows up with every enquiry."],
      ],
    },
    steps: [
      ["Discovery", "We learned what students and parents ask before choosing a media course."],
      ["Brand Look", "A bold visual system for posts, stories, and ads."],
      ["Content Calendar", "Course, workshop, and studio posts planned around the admissions calendar."],
      ["Campaign Setup", "Admissions ads and enquiry forms aimed at prospective students."],
      reviewStep,
    ],
    cta: {
      title: "Filling Your Next *Intake*? Let’s Talk.",
      text: "We plan and run social media and admissions campaigns for schools, institutes, and training centres.",
    },
  },
];

// Alt texts of the designed posts (the headlines on them), from the render script's copy.
const designedPostAlts = {
  ng: [
    "Interiors That Feel Like Home",
    "From Concept to Completion",
    "Every detail, considered.",
    "Plan Your Dream Space",
    "Warm Neutrals, Lasting Calm",
    "Spaces Made for Living",
  ],
  aawaz: [
    "Find Your Voice",
    "Learn From the Studio Floor",
    "Every great story starts with a voice.",
    "Free Counselling Session",
    "Voice-Over Basics",
    "On Air Starts Here",
  ],
};

// Each page's own layout (13 Nov 2026, second round, so they don't look alike): hero, section
// order, and the layout of each section. Keys are the case studies' `key`s.
const pagePlans = {
  ng: {
    hero: { heroLayout: "Light", heroEyebrow: "Design · Build · Grow", heroButtonLabel: "Book a Consultation", heroButtonLink: "/contact" },
    overviewLayout: "Image below",
    brandCards: { layout: "Icon grid" },
    feedLayout: "Carousel",
    funnelLayout: "Funnel",
    approach: { layout: "Numbered steps" },
    order: ["overview", "brand", "social", "approach", "funnel", "cta"],
    // The project head's poster (20 Nov 2026): the hero and card image.
    poster: "Social media post, story card, quote card, and lead form for NG Interiors, around a phone showing the post Interiors That Feel Like Home",
  },
  aawaz: {
    hero: { heroLayout: "Dark", heroEyebrow: "Admissions Campaigns", heroButtonLabel: "Start Your Project", heroButtonLink: "/contact" },
    overviewLayout: "Image right",
    // The timeline's image is the project card image (already uploaded).
    brandCards: { layout: "Timeline beside text", image: "card" },
    feedLayout: "Grid",
    funnelLayout: "Journey",
    order: ["overview", "board", "social", "funnel", "brand", "cta"],
    // The project head's poster (20 Nov 2026): the hero and card image.
    poster: "Social media post, course card, quote card, and lead form for Aawaz Institute, around a phone showing the post Find Your Voice",
  },
};

// JSON with object keys sorted, so equal values compare equal whatever order Contentful returns.
const stable = (value) =>
  JSON.stringify(value, (_, inner) =>
    inner && typeof inner === "object" && !Array.isArray(inner)
      ? Object.fromEntries(Object.entries(inner).sort(([a], [b]) => a.localeCompare(b)))
      : inner,
  );

// Creates the entry if it doesn't exist; otherwise brings the given fields up to date and
// republishes it, but only while it is still as this script published it (published once, no
// draft changes), so an editor's work in Contentful is never overwritten. `force`: a rewrite
// the project head asked for, so entries this script already updated are updated again; an
// entry with unpublished changes (a draft) is still never touched. A field given as null is
// removed from the entry.
async function ensure(id, contentType, fields, { force = false } = {}) {
  const entry = await cma(`/entries/${id}`);
  if (!entry) return upsert(id, contentType, Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== null)));
  const changed = Object.keys(fields).filter((key) => {
    if (fields[key] === undefined) return false;
    if (fields[key] === null) return entry.fields[key] !== undefined;
    return stable(entry.fields[key]?.[locale]) !== stable(fields[key]);
  });
  if (!changed.length) {
    console.log(`  up to date, skipped: ${id}`);
    return;
  }
  const draft = entry.sys.version > (entry.sys.publishedVersion ?? 0) + 1;
  if (draft || (!force && (entry.sys.publishedCounter ?? 0) > 1)) {
    console.warn(`  edited in Contentful, skipped: ${id} (would change ${changed.join(", ")})`);
    return;
  }
  const next = { ...entry.fields };
  for (const key of changed) {
    if (fields[key] === null) delete next[key];
    else next[key] = { [locale]: fields[key] };
  }
  const updated = await cma(`/entries/${id}`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(entry.sys.version) },
    body: { fields: next },
  });
  await cma(`/entries/${id}/published`, {
    method: "PUT",
    headers: { "X-Contentful-Version": String(updated.sys.version) },
  });
  console.log(`  updated and published: ${id} (${changed.join(", ")})`);
}

for (const study of marketingCaseStudies) {
  const { key, slug, client } = study;
  const plan = pagePlans[key];
  const id = (name) => `${key}-${name}`;
  const asset = (name) => link(id(name), "Asset");

  // Images.
  await upsertAsset(id("img-hero"), `${slug}/hero.webp`, "image/webp", study.heroAlt);
  await upsertAsset(id("img-card"), `${slug}/card.webp`, "image/webp", `${study.title} social media posts`);
  const [overviewPath, overviewAlt] = study.overview.image ?? [
    `${slug}/overview.webp`,
    `${client.name}'s social media profile on a phone, with posts beside it`,
  ];
  await upsertAsset(id("img-overview"), overviewPath, "image/webp", overviewAlt);
  const postAlts = study.social.posts ?? designedPostAlts[key].map((headline) => `Social media post: ${headline}`);
  for (const [index, alt] of postAlts.entries()) {
    await upsertAsset(id(`img-post-${index + 1}`), `${slug}/post-${index + 1}.webp`, "image/webp", alt);
  }

  // Client, with its logo where there is an approved one.
  const clientFields = { name: client.name, website: client.website };
  if (client.logo) {
    await upsertAsset(id("logo"), client.logo[0], "image/webp", client.logo[1]);
    Object.assign(clientFields, {
      logo: asset("logo"),
      logoApproved: true,
      logoApproval: "Shown on the About page; approved by the project head on 13 Nov 2026",
    });
  }
  await upsert(client.id, "client", clientFields);

  // Overview: text, facts, and the services box.
  const facts = [
    ["Industry", study.overview.industry],
    ["Location", "Karachi, Pakistan"],
    ["Channels", study.overview.channels],
    ["Engagement", plan.engagement ?? engagement],
  ];
  for (const [index, [title, text]] of facts.entries()) await ensure(id(`fact-${index + 1}`), "caseStudyItem", { title, text });
  await ensure(id("services"), "caseStudyItem", { title: "Services Provided", text: plan.servicesProvided ?? servicesProvided });
  await ensure(id("overview"), "caseStudySection", {
    eyebrow: "Overview",
    title: `About *${client.name}*`,
    body: richText(...study.overview.paragraphs),
    image: asset("img-overview"),
    layout: plan.overviewLayout,
    facts: facts.map((_, index) => link(id(`fact-${index + 1}`))),
    highlight: link(id("services")),
  });

  // Brand identity: a brand board with the real logo and its colours, or cards.
  if (study.brandBoard) {
    await ensure(id("brand"), "caseStudyBrandBoard", {
      eyebrow: "Brand Identity",
      ...study.brandBoard,
      layout: plan.brandLayout,
      logo: asset("logo"),
    });
  } else {
    const { title, intro } = study.brandCards;
    const items = plan.brandCards.extraItem ? [...study.brandCards.items, plan.brandCards.extraItem] : study.brandCards.items;
    for (const [index, [itemTitle, text]] of items.entries()) {
      await ensure(id(`brand-${index + 1}`), "caseStudyItem", { title: itemTitle, text });
    }
    let image;
    if (plan.brandCards.image === "card") image = asset("img-card");
    else if (plan.brandCards.image) {
      await upsertAsset(id("img-brand"), plan.brandCards.image[0], "image/webp", plan.brandCards.image[1]);
      image = asset("img-brand");
    }
    await ensure(id("brand"), "caseStudyCards", {
      eyebrow: "Brand Identity",
      title,
      intro,
      layout: plan.brandCards.layout,
      image,
      items: items.map((_, index) => link(id(`brand-${index + 1}`))),
    });
  }

  // Social feed.
  let avatar;
  if (study.social.avatar === "logo") avatar = asset("logo");
  else if (study.social.avatar) {
    await upsertAsset(id("avatar"), study.social.avatar[0], "image/webp", study.social.avatar[1]);
    avatar = asset("avatar");
  }
  await ensure(id("social"), "caseStudySocialFeed", {
    eyebrow: "Social Media Marketing",
    title: study.social.title,
    intro: study.social.intro,
    layout: plan.feedLayout,
    accountName: client.name,
    avatar,
    platforms: ["Facebook", "Instagram"],
    posts: postAlts.slice(0, plan.feedPosts ?? postAlts.length).map((_, index) => asset(`img-post-${index + 1}`)),
  });

  // Funnel.
  for (const [index, [title, text]] of study.funnel.stages.entries()) {
    await ensure(id(`stage-${index + 1}`), "caseStudyItem", { title, text });
  }
  await ensure(id("funnel"), "caseStudyFunnel", {
    eyebrow: "Campaigns & Lead Generation",
    title: study.funnel.title,
    intro: study.funnel.intro,
    layout: plan.funnelLayout,
    stages: study.funnel.stages.map((_, index) => link(id(`stage-${index + 1}`))),
  });

  // Approach steps (only on the pages whose plan has them; the others keep the entries unused).
  for (const [index, [title, text]] of study.steps.entries()) await ensure(id(`step-${index + 1}`), "caseStudyItem", { title, text });
  let approachImage;
  if (plan.approach?.image) {
    await upsertAsset(id("img-approach"), plan.approach.image[0], "image/webp", plan.approach.image[1]);
    approachImage = asset("img-approach");
  }
  await ensure(id("approach"), "caseStudyCards", {
    eyebrow: "Our Approach",
    title: `How We Worked With *${client.name}*`,
    intro: "Branding, social media, campaigns, and lead generation, planned together so each one strengthens the others.",
    layout: plan.approach?.layout ?? "Numbered steps",
    image: approachImage,
    items: study.steps.map((_, index) => link(id(`step-${index + 1}`))),
  });

  // Page-specific sections.
  if (key === "aawaz") {
    await upsertAsset(
      id("img-board"),
      "aawaz-institute/campaign-board.webp",
      "image/webp",
      "Aawaz Institute admissions campaign: a story on a phone, a sponsored post, and the counselling lead form",
    );
    await ensure(id("board"), "caseStudyShowcase", { name: "Aawaz admissions campaign", image: asset("img-board") });
  }

  // The poster, where there is one: the hero and card image instead of the first ones.
  if (plan.poster) await upsertAsset(id("img-poster"), `${slug}/poster.webp`, "image/webp", plan.poster);
  const cover = plan.poster ? "img-poster" : null;

  // Call to action.
  await ensure(id("cta"), "caseStudyCallToAction", {
    title: study.cta.title,
    text: study.cta.text,
    buttonLabel: "Start Your Project",
    buttonLink: "/contact",
  });

  await ensure(`case-study-${slug}`, "caseStudy", {
    title: study.title,
    slug,
    client: link(client.id),
    excerpt: plan.excerpt ?? study.excerpt,
    cardHighlight: study.cardHighlight,
    cardPoints: plan.cardPoints ?? ["Brand identity & social media", "Paid campaigns", "Lead generation"],
    cardImage: asset(cover ?? "img-card"),
    heroHeading: study.heroHeading,
    heroText: study.heroText,
    heroImage: asset(cover ?? "img-hero"),
    ...plan.hero,
    sections: plan.order.map((name) => link(id(name))),
    industries: study.industries,
    services: plan.services ?? services,
    region: "Pakistan",
  }, { force: Boolean(cover) });
}

// Pak Armoring as a client story (19 Nov 2026, project head: the marketing pages read like ads; tell
// the business, its problem, and where we helped, with real images and video). What we did, as
// confirmed by the project head: its website (pakarmoring.com), its vehicle videos for YouTube,
// its Facebook and Instagram, and media production; its YouTube channel is @pakarmoringofficial,
// which we handle (project head, 19 Nov 2026). No ads or lead generation, no branding. The
// problem is written from what is public (the product and its buyers), not as a claim about the
// company's past. The site's /about-us, /products, and /customize-now pages were found hacked on
// 19 Nov 2026 (gambling spam), so nothing here shows or links to them. Old entries from the
// marketing layout (pak-brand, pak-funnel, pak-stage-*, pak-approach, pak-step-*, pak-services,
// pak-website-pages) are no longer on the page and are left unlinked.
{
  const id = (name) => `pak-${name}`;
  const asset = (name) => link(id(name), "Asset");
  const rewrite = { force: true };

  // Real media: reels and the glass-test photo from pakarmoring.com, two real thumbnails from its
  // YouTube channel in the hero, the logo from the site. Website screenshots can be added later.
  const reels = [
    "Reel: an armored pickup in the workshop yard",
    "Reel: a van interior with leather captain seats and a starlit ceiling",
    "Reel: an armored Toyota Hilux with a roof turret",
    "Reel: Toyota Fortuner now fully armored, on the road",
    "Reel: close-up of an armored vehicle's roof turret",
    "Reel: the underside of an armored vehicle in the workshop",
  ];
  for (const [index, alt] of reels.entries()) {
    await upsertAsset(id(`img-post-${index + 1}`), `pak-armoring/post-${index + 1}.webp`, "image/webp", alt);
  }
  await upsertAsset(id("logo"), "pak-armoring/logo.webp", "image/webp", "Pak Armoring");
  await upsertAsset(id("img-overview"), "pak-armoring/glass-test.webp", "image/webp", "Bulletproof glass after a ballistic test, with three stopped rounds");
  await upsertAsset(id("img-card"), "pak-armoring/card.webp", "image/webp", "Pak Armoring reels from the workshop");
  await upsertAsset(id("img-story-hero"), "pak-armoring/story-hero.webp", "image/webp", "The Pak Armoring website on a laptop and a phone, with one of its YouTube vehicle films");
  // Pak Armoring's own poster (from the project head, 19 Nov 2026): the hero and card image.
  await upsertAsset(id("img-poster"), "pak-armoring/poster.webp", "image/webp", "Pak Armoring's shield logo above a line-up of its armored vehicles, from SUVs and pickups to an APC and a bus");
  // The banner video (20 Nov 2026, project head): 15 s of its armored vehicles, re-encoded without
  // sound (1600 px, H.264 CRF 29, 3.2 MB); the still is its last shot, three vehicles lined up.
  await upsertAsset(id("video-hero"), "pak-armoring/hero-video.mp4", "video/mp4", "Pak Armoring's armored vehicles on the move");
  await upsertAsset(id("img-hero-still"), "pak-armoring/hero-still.webp", "image/webp", "Three Pak Armoring vehicles lined up, lights on: two armored pickups and an armored personnel carrier");

  await upsert("client-pak-armoring", "client", {
    name: "Pak Armoring",
    website: "https://www.pakarmoring.com",
    logo: asset("logo"),
    logoApproved: true,
    logoApproval: "Shown on the About page; approved by the project head on 13 Nov 2026",
  });

  // 1. The business.
  const facts = [
    ["Industry", "Vehicle Armoring & Security"],
    ["Location", "Karachi, Pakistan"],
    ["Range", "30+ armored models"],
    ["Our work", "Website · Video · Social media · Media production"],
  ];
  for (const [index, [title, text]] of facts.entries()) await ensure(id(`fact-${index + 1}`), "caseStudyItem", { title, text }, rewrite);
  await ensure(
    id("overview"),
    "caseStudySection",
    {
      eyebrow: "The Business",
      title: "Who *Pak Armoring* Is",
      body: richText(
        "Pak Armoring (Pvt) Ltd is a vehicle armoring company in Korangi Industrial Area, Karachi. It armors cars, SUVs, pickups, vans, and buses, and builds its own armored vehicles, such as the BAAZ, for law enforcement.",
        "Its range runs to more than thirty models: armored versions of the Toyota Land Cruiser, Fortuner, and Hilux, cash-in-transit vans, ambulances, coach buses, and a security tower, for individuals, companies, and law-enforcement agencies.",
      ),
      image: asset("img-overview"),
      layout: "Image right",
      facts: facts.map((_, index) => link(id(`fact-${index + 1}`))),
      highlight: null,
    },
    rewrite,
  );

  // 2. The problem.
  const problems = [
    ["Is the protection real?", "Buyers want to see the steel, the ballistic glass, and the testing, not only read that a vehicle is protected."],
    ["Which vehicle is right?", "With more than thirty models, a family, a bank, and a police force each need to find the one that fits them."],
    ["Can this company be trusted?", "A company that people trust with their safety has to look established wherever they check it: its website, YouTube, and social media."],
  ];
  for (const [index, [title, text]] of problems.entries()) await ensure(id(`problem-${index + 1}`), "caseStudyItem", { title, text }, rewrite);
  await ensure(
    id("problem"),
    "caseStudyCards",
    {
      eyebrow: "The Problem",
      title: "Buyers Need *Proof* Before They Call",
      intro:
        "An armored vehicle is a large, careful purchase. Before anyone gets in touch, they want answers to three questions, and a phone call alone can't show them.",
      layout: "Icon grid",
      items: problems.map((_, index) => link(id(`problem-${index + 1}`))),
    },
    rewrite,
  );

  // 3. Where we helped.
  const help = [
    [
      "Website",
      // The domain is left out while pakarmoring.com is hacked (it redirects to a marketplace for
      // hacking tools, found 20 Nov 2026; issue I20). Put it back once the site is clean.
      "A page for every vehicle, grouped into civilian, law-enforcement, and special products, and guides such as How Bulletproof Glass Works and How to Choose the Right Vehicle Armoring Company.",
    ],
    ["YouTube", "We handle its channel, @pakarmoringofficial: launch films for vehicles such as the BAAZ and the ZULFIQAR APC, walkthroughs, and live-fire tests that show the protection working."],
    ["Facebook & Instagram", "Short reels from the workshop: finished vehicles, interiors, and armoring in progress."],
    ["Media production", "Photo and video shoots of vehicles, interiors, and ballistic tests, used on the website, YouTube, and social media."],
  ];
  for (const [index, [title, text]] of help.entries()) await ensure(id(`help-${index + 1}`), "caseStudyItem", { title, text }, rewrite);
  // One real image per place (Story panels, 0016; project head, 20 Nov 2026): vehicles from the
  // website (downloaded 13 Nov, before the hack), the BAAZ film and the live-fire trial from its
  // YouTube channel, and a workshop reel.
  await upsertAsset(id("img-help-website"), "pak-armoring/help-website.webp", "image/webp", "Armored vehicles from the Pak Armoring website: Lexus LX 570, Toyota Tundra, Range Rover, Toyota Hiace, Mercedes-Benz, and Nissan Patrol");
  await upsertAsset(id("img-help-youtube"), "pak-armoring/help-youtube.webp", "image/webp", "Thumbnail of the YouTube film Baaz, Pakistan's ultimate armored beast");
  await upsertAsset(id("img-help-media"), "pak-armoring/help-media.webp", "image/webp", "Thumbnail of the YouTube film of an armored vehicle under live-fire trials");
  await ensure(
    id("help"),
    "caseStudyCards",
    {
      eyebrow: "Where We Helped",
      title: "Four Places We *Worked*",
      intro: "Each one answers a different question a buyer has, so together they show the work before the first call.",
      layout: "Story panels",
      image: null,
      images: [asset("img-help-website"), asset("img-help-youtube"), asset("img-post-4"), asset("img-help-media")],
      items: help.map((_, index) => link(id(`help-${index + 1}`))),
    },
    rewrite,
  );

  // 4. The videos (Pak Armoring's own YouTube channel).
  await ensure(
    id("videos"),
    "caseStudyVideos",
    {
      eyebrow: "The Videos",
      title: "Vehicle *Films* for YouTube",
      intro: "From Pak Armoring's YouTube channel, @pakarmoringofficial, which we handle: vehicle launches, walkthroughs, and live-fire tests.",
      videos: [
        "https://www.youtube.com/watch?v=AGk8EU5dTTM",
        "https://www.youtube.com/watch?v=DjR49HRM1l8",
        "https://www.youtube.com/watch?v=DqtmlAun2HM",
        "https://www.youtube.com/watch?v=PSall-ZH__I",
        "https://www.youtube.com/watch?v=TgtGLOJrujc",
        "https://www.youtube.com/watch?v=MfJr9qo1Dt4",
        "https://www.youtube.com/watch?v=znkCltQrWNM",
      ],
    },
    rewrite,
  );

  // 5. Facebook & Instagram: the real reels.
  await ensure(
    id("social"),
    "caseStudySocialFeed",
    {
      eyebrow: "Facebook & Instagram",
      title: "Reels From the *Workshop*",
      intro: "Short videos of real vehicles, shot in Pak Armoring's workshop and edited for the feed.",
      layout: "Phones",
      accountName: "Pak Armoring",
      avatar: asset("logo"),
      platforms: ["Facebook", "Instagram"],
      posts: reels.map((_, index) => asset(`img-post-${index + 1}`)),
    },
    rewrite,
  );

  // 7. How we did it.
  const steps = [
    ["Learning the range", "We went through every vehicle, category, and type of buyer to plan the website and the content."],
    ["Website structure", "Civilian, law-enforcement, and special products became the main categories, with a page for each vehicle and guides for buyers."],
    ["Shooting", "Vehicles, interiors, and ballistic tests were filmed and photographed at the workshop."],
    ["Editing for each channel", "Longer films for YouTube, short reels for Facebook and Instagram, and photos for the website."],
    ["Publishing", "New builds go on the website, YouTube, and social media as they leave the workshop."],
  ];
  for (const [index, [title, text]] of steps.entries()) await ensure(id(`how-${index + 1}`), "caseStudyItem", { title, text }, rewrite);
  await ensure(
    id("how"),
    "caseStudyCards",
    {
      eyebrow: "How We Did It",
      title: "From the Workshop to the *Screen*",
      layout: "Numbered steps",
      items: steps.map((_, index) => link(id(`how-${index + 1}`))),
    },
    rewrite,
  );

  // 8. Also built: the Pak Armoury website (project head, 13 Nov 2026).
  await upsertAsset(id("img-website"), "pak-armoring/website.webp", "image/webp", "The Pak Armoury website: the Pistols and About pages, and the home page on a phone");
  await ensure(id("website-fact-1"), "caseStudyItem", { title: "Website", text: "pakarmoury.com" });
  await ensure(id("website-fact-2"), "caseStudyItem", { title: "Pages", text: "Home, About, Products, Contact" });
  await ensure(
    id("website"),
    "caseStudySection",
    {
      eyebrow: "Also Built",
      title: "The *Pak Armoury* Website",
      body: richText(
        "We also designed and built the website for Pak Armoury, an arms and ammunition store in Karachi with a tradition going back to 1950. The site presents the store's history and its range clearly, on every screen.",
        titledBullets([
          ["Product catalogue", "Pistols, revolvers, shotguns, rifles, air guns, and ammunition, each with its own page."],
          ["The store's story", "An About page that tells the store's history since 1950."],
          ["Easy contact", "The phone number in the header of every page, and a contact page."],
          ["Mobile-friendly", "Pages that adapt to phones, tablets, and desktops."],
        ]),
      ),
      image: asset("img-website"),
      layout: "Image left",
      facts: [link(id("website-fact-1")), link(id("website-fact-2"))],
    },
    rewrite,
  );

  // 9. Call to action, plain.
  await ensure(
    id("cta"),
    "caseStudyCallToAction",
    {
      title: "Working on Something *Similar*?",
      text: "Tell us what you make and who buys it, and we'll talk it through.",
      buttonLabel: "Get in Touch",
      buttonLink: "/contact",
    },
    rewrite,
  );

  await ensure(
    "case-study-pak-armoring",
    "caseStudy",
    {
      title: "Pak Armoring",
      slug: "pak-armoring",
      client: link("client-pak-armoring"),
      excerpt:
        "How we built Pak Armoring's website, produced its vehicle films, and ran its Facebook and Instagram, so buyers of armored vehicles can see the work before they call.",
      cardHighlight: "Website, video, and social media for an armored vehicle maker",
      cardPoints: ["Website", "Vehicle films on YouTube", "Facebook & Instagram"],
      cardImage: asset("img-poster"),
      heroHeading: "Pak Armoring: Website, Video, and *Social Media* for an Armored Vehicle Maker",
      heroText:
        "Pak Armoring (Pvt) Ltd armors cars, SUVs, vans, and buses in Karachi. We built its website, produced its vehicle films, and ran its Facebook and Instagram, so buyers can see the work before they get in touch.",
      heroEyebrow: "Website · Video · Social Media",
      heroButtonLabel: "Start Your Project",
      heroButtonLink: "/contact",
      heroImage: asset("img-hero-still"),
      heroVideo: asset("video-hero"),
      sections: ["overview", "problem", "help", "videos", "social", "how", "website", "cta"].map((name) => link(id(name))),
      services: ["development", "marketing"],
      region: "Pakistan",
    },
    rewrite,
  );
}

// G&W Towers as a client story (19 Nov 2026, project head). What we did, as confirmed by the
// project head: video and media production, its TikTok (@gwtowers), Facebook and Instagram, and
// ads and lead generation. No branding. Facts come from its TikTok bio (a joint project of Godils &
// Wakeels in Clifton) and from the promo film we made (opposite Bar BQ Tonight, 3- and 4-bed
// apartments open on three sides, voice-controlled smart homes, a gym, bank financing, sea-facing
// views, ready by year-end). The film's booking number and price are only in the film itself.
// The problem is written from what is public, not as a claim about the project's past. Old
// entries from the marketing layout (gw-delivered, gw-brand*, gw-social, gw-funnel, gw-stage-*,
// gw-approach, gw-step-*, the designed posts) are no longer on the page and are left unlinked.
{
  const id = (name) => `gw-${name}`;
  const asset = (name) => link(id(name), "Asset");
  const rewrite = { force: true };

  // Real media: the promo film (from the project head) and stills from it.
  await upsertAsset(
    id("video-promo"),
    "gw-towers/promo.mp4",
    "video/mp4",
    "G&W Towers promo film: Clifton at night, the lobby, the apartments, the gym, and sea-facing views",
  );
  const scenes = [
    ["skyline", "Clifton at night from the tower: Prime location in Clifton"],
    ["lobby", "The G&W Towers sign in the lobby"],
    ["hall", "An apartment entrance: 3 & 4 bed luxury apartments"],
    ["gym", "The building's gym"],
    ["smart-home", "A living room: voice-controlled smart home"],
    ["bedroom", "A bedroom: bank financing available"],
    ["sea-view", "Sea-facing views from an upper floor"],
    ["welcome", "The G&W Towers logo over the view: ready to welcome you by year-end"],
  ];
  for (const [name, alt] of scenes) await upsertAsset(id(`img-scene-${name}`), `gw-towers/scene-${name}.webp`, "image/webp", alt);
  await upsertAsset(id("img-story-hero"), "gw-towers/story-hero.webp", "image/webp", "The G&W Towers promo film on a phone, with a bedroom and the sea-facing view beside it");
  await upsertAsset(id("img-story-card"), "gw-towers/story-card.webp", "image/webp", "Scenes from the G&W Towers promo film: the lobby, Clifton at night, and the sea view");
  // The project head's poster of the promo film (20 Nov 2026): the hero and card image.
  await upsertAsset(id("img-poster"), "gw-towers/poster.webp", "image/webp", "Three phones playing the G&W Towers promo: bank financing available, prime location in Clifton, and sea-facing views");

  // 1. The business.
  const facts = [
    ["Developers", "Godils & Wakeels"],
    ["Location", "Clifton, Karachi"],
    ["Homes", "3 & 4 bed apartments"],
    ["Our work", "Video · TikTok · Facebook & Instagram · Ads"],
  ];
  for (const [index, [title, text]] of facts.entries()) await ensure(id(`fact-${index + 1}`), "caseStudyItem", { title, text }, rewrite);
  await ensure(
    id("overview"),
    "caseStudySection",
    {
      eyebrow: "The Business",
      title: "Who *G&W Towers* Is",
      body: richText(
        "G&W Towers is a residential tower in Clifton, Karachi, launched jointly by Godils & Wakeels. It stands opposite the Bar BQ Tonight restaurant, with sea-facing views from its upper floors.",
        "It offers 3- and 4-bedroom apartments, open on three sides, with voice-controlled smart-home features, a gym, and bank financing, and is set to welcome its first residents by the end of the year.",
      ),
      image: asset("img-scene-lobby"),
      layout: "Image right",
      facts: facts.map((_, index) => link(id(`fact-${index + 1}`))),
      highlight: null,
    },
    rewrite,
  );

  // 2. The problem.
  const problems = [
    ["What is it like inside?", "Buyers want to see the rooms, the finishes, and the views, not only floor plans."],
    ["Why this project?", "Clifton has many towers on offer. A new one has to be recognised quickly, with its location and features clear at a glance."],
    ["How do I find out more?", "People who are interested need an easy way to ask about prices, financing, and a site visit."],
  ];
  for (const [index, [title, text]] of problems.entries()) await ensure(id(`problem-${index + 1}`), "caseStudyItem", { title, text }, rewrite);
  await ensure(
    id("problem"),
    "caseStudyCards",
    {
      eyebrow: "The Problem",
      title: "Buyers Need to *See It* Before They Visit",
      intro:
        "An apartment in Clifton is a large decision, and buyers compare many projects. Before they book a visit, they want answers a brochure alone can't give.",
      layout: "Icon grid",
      items: problems.map((_, index) => link(id(`problem-${index + 1}`))),
    },
    rewrite,
  );

  // 3. The problem and how we helped, place by place (project head, 20 Nov 2026: problem →
  // solution → where). Each card's text is two labelled lines (StoryPanels shows the labels).
  // The separate problem section above is no longer on the page.
  const help = [
    [
      "Video & media production",
      "Buyers want to see the rooms, finishes, and views before they visit, not only floor plans.",
      "We film the tower, the apartments, the gym, and the sea-facing views, and cut them into short vertical films.",
    ],
    [
      "TikTok",
      "Clifton has many towers on offer; a new one has to be noticed by the buyers scrolling past.",
      "We run @gwtowers with regular short videos of the project, so it stays in front of buyers in Karachi.",
    ],
    [
      "Facebook & Instagram",
      "Buyers need the key facts quickly: the location, sizes, price, financing, and the move-in date.",
      "We post the films on its pages with those details on screen, in the right format for each platform.",
    ],
    [
      "Ads & lead generation",
      "Interest is wasted if buyers don't know how to ask about prices or a site visit.",
      "We run ads aimed at buyers in Karachi, each with a clear way to call or message the sales team.",
    ],
  ];
  for (const [index, [title, problem, solution]] of help.entries()) {
    await ensure(id(`help-${index + 1}`), "caseStudyItem", { title, text: `The problem: ${problem}\nWhat we did: ${solution}` }, rewrite);
  }
  await ensure(
    id("help"),
    "caseStudyCards",
    {
      eyebrow: "Problem & Solution",
      title: "The Problem & How We *Helped*",
      intro: "An apartment in Clifton is a large decision. Here is what buyers need before they visit, and what we do about it, channel by channel.",
      // Story panels, one still from the promo film per card (project head, 20 Nov 2026).
      layout: "Story panels",
      image: null,
      images: ["skyline", "smart-home", "bedroom", "welcome"].map((name) => asset(`img-scene-${name}`)),
      items: help.map((_, index) => link(id(`help-${index + 1}`))),
    },
    rewrite,
  );

  // 4. The film.
  await ensure(
    id("film"),
    "caseStudyVideos",
    {
      eyebrow: "The Film",
      title: "A 20-Second *Tour*",
      intro:
        "One of the short promos we made: Clifton at night, the lobby, the apartments, the gym, and the sea-facing views, with the key details on screen.",
      files: [asset("video-promo")],
    },
    rewrite,
  );

  // 5. Scenes from the film.
  await ensure(
    id("scenes"),
    "caseStudyGallery",
    {
      title: "Scenes From the *Film*",
      intro: "Stills from the promo. Each scene answers one question a buyer has: where, what, how much, and when.",
      images: scenes.map(([name]) => asset(`img-scene-${name}`)),
    },
    rewrite,
  );

  // 6. How we did it.
  const steps = [
    ["Picking the message", "Location, apartment sizes, price, financing, and the move-in date: the details buyers ask about first."],
    ["Filming", "Clifton at night, the lobby, the apartments, the gym, and the views from the upper floors."],
    ["Editing for short video", "Vertical cuts with one clear line on screen per scene, and booking details throughout."],
    ["Publishing", "The films go out on TikTok, Facebook, and Instagram."],
    ["Campaigns", "Ads put the films in front of buyers in Karachi, and their enquiries go to the sales team."],
  ];
  for (const [index, [title, text]] of steps.entries()) await ensure(id(`how-${index + 1}`), "caseStudyItem", { title, text }, rewrite);
  await ensure(
    id("how"),
    "caseStudyCards",
    {
      eyebrow: "How We Did It",
      title: "From the Site to the *Feed*",
      layout: "Numbered steps",
      items: steps.map((_, index) => link(id(`how-${index + 1}`))),
    },
    rewrite,
  );

  // 7. Call to action, plain.
  await ensure(
    id("cta"),
    "caseStudyCallToAction",
    {
      title: "Marketing a *Property* Project?",
      text: "Tell us about it, and we'll talk through how to show it to the right buyers.",
      buttonLabel: "Get in Touch",
      buttonLink: "/contact",
    },
    rewrite,
  );

  await upsert("client-gw-towers", "client", { name: "G&W Towers", website: "https://www.facebook.com/gwtower" });
  await ensure(
    "case-study-gw-towers",
    "caseStudy",
    {
      title: "G&W Towers",
      slug: "gw-towers",
      client: link("client-gw-towers"),
      excerpt:
        "How we produce G&W Towers' promo films, run its TikTok, Facebook, and Instagram, and run the ads that bring buyer enquiries for its apartments in Clifton.",
      cardHighlight: "Video, social media, and ads for a new tower in Clifton",
      cardPoints: ["TikTok, Facebook & Instagram", "Promo films & media", "Ads & lead generation"],
      cardImage: asset("img-poster"),
      heroLayout: "Centered",
      heroHeading: "G&W Towers: Video, Social Media, and Ads for a New Tower in *Clifton*",
      heroText:
        "G&W Towers is a residential tower in Clifton, Karachi, by Godils & Wakeels. We produce its videos, run its TikTok, Facebook, and Instagram, and run the ads that bring buyer enquiries.",
      heroImage: asset("img-poster"),
      sections: ["overview", "help", "film", "scenes", "how", "cta"].map((name) => link(id(name))),
      industries: ["real-estate"],
      services: ["marketing"],
      region: "Pakistan",
    },
    rewrite,
  );
}

// Drumond Auto Body (20 Nov 2026, project head): the website redesign, the only work we did for
// them (no social media). Rewritten the same day (project head: tell what we built, the problems
// in building it, and how we solved them; not a promotion of the client). The client stays in the
// background; facts about the job come from the client's brief (Website Redesign Brief v1.0) and
// what is on the new site (screenshots taken 20 Nov 2026 on its staging address; the project head
// says it launches soon, so the page treats it as live). Not built, so not claimed: the /links
// page, LocalBusiness schema, a WhatsApp link, reviews via the Places API (the site shows Google
// reviews through a widget), 301 redirects. No internal brief details (tag-manager IDs, drive
// links). Logo: the one on the About page.
{
  const id = (name) => `drm-${name}`;
  const asset = (name) => link(id(name), "Asset");
  const rewrite = { force: true };

  const images = [
    ["hero", "hero.webp", "The new Drumond Auto Body website: the home page in a browser and the Services page with its ZIP code check on a phone"],
    ["card", "card.webp", "The new Drumond Auto Body website on a laptop and a phone"],
    ["page-home", "page-home.webp", "Home page: Your car back to new. Without the runaround."],
    ["page-about", "page-about.webp", "About page, rebuilt as a long-form story"],
    ["page-insurance", "page-insurance.webp", "Insurance page: The insurance part? That's our job."],
    ["page-services", "page-services.webp", "Services page: #1 Body Shop in Framingham, with the ZIP code check"],
    ["page-team", "page-team.webp", "Our Team page with the team photo"],
    ["page-reviews", "page-reviews.webp", "Reviews page with Google reviews"],
    ["phone-home", "phone-home.webp", "Home page on a phone"],
    ["phone-services", "phone-services.webp", "Services page with the ZIP code check on a phone"],
    ["phone-insurance", "phone-insurance.webp", "Insurance page on a phone"],
    ["phone-team", "phone-team.webp", "Our Team page on a phone"],
  ];
  for (const [name, file, alt] of images) {
    await upsertAsset(id(name.startsWith("page-") ? `img-shot-${name.slice(5)}` : `img-${name}`), `drumond-auto-body/${file}`, "image/webp", alt);
  }
  await upsertAsset(id("logo"), "drumond-auto-body/logo.webp", "image/webp", "Drumond Auto Body");

  await upsert("client-drumond-auto-body", "client", {
    name: "Drumond Auto Body",
    website: "https://drumondautobody.com",
    logo: asset("logo"),
    logoApproved: true,
    logoApproval: "Shown on the About page; approved by the project head on 20 Nov 2026",
  });

  // 1. The project.
  const facts = [
    ["Client", "Auto body shop, Framingham, MA"],
    ["Platform", "WordPress + Elementor"],
    ["Scope", "6 pages, ZIP code check, Google reviews"],
    ["Our work", "Website design & development"],
  ];
  for (const [index, [title, text]] of facts.entries()) await ensure(id(`fact-${index + 1}`), "caseStudyItem", { title, text }, rewrite);
  await ensure(
    id("overview"),
    "caseStudySection",
    {
      eyebrow: "The Project",
      title: "A Detailed Brief, *Six Pages* to Build",
      body: richText(
        "Drumond Auto Body, a family-owned body shop in Framingham, Massachusetts, asked us to rebuild its website. It came with a detailed brief: six pages to build or rebuild, the exact words for each, and strict rules for how the site should look, read, and work on phones.",
        "Our job was to turn that brief into a working website, and to solve the parts that weren't simple pages: showing nearby towns that the shop serves, keeping the Google review count true, and making sure nothing changed on the live site until the client approved it.",
      ),
      image: asset("img-card"),
      layout: "Image right",
      facts: facts.map((_, index) => link(id(`fact-${index + 1}`))),
      highlight: null,
    },
    rewrite,
  );

  // 2. The problem and how we solved it, one by one.
  const solved = [
    [
      "services",
      "ZIP code service area",
      "The shop has one location but serves many towns, and visitors want to know right away if theirs is covered.",
      "A ZIP code check on the Services page: a custom WordPress endpoint finds the town, and the headline changes to “#1 Body Shop near” it, with the distance to the shop. Search engines still see the default headline.",
    ],
    [
      "reviews",
      "Review counts that stay true",
      "The old site showed review counts typed in by hand, so they were out of date wherever they appeared.",
      "Reviews now come straight from Google through one widget, on the home, services, and reviews pages, so the rating and count never need updating by hand.",
    ],
    [
      "insurance",
      "Insurance, explained",
      "A driver's first question after an accident is who deals with the insurance, and the old site had no page for it.",
      "We built a new Insurance page that walks through a claim step by step, with the direct repair program, the insurance carriers, and a list of common questions.",
    ],
    [
      "home",
      "One screen to act",
      "Visitors usually arrive stressed and on a phone, so the first screen has to tell them what to do.",
      "The new home page puts the promise, the estimate and call buttons, and the Google rating in the first screen, then the services, reviews, and insurance in plain words.",
    ],
    [
      "team",
      "Faces, not stock photos",
      "Nothing on the old site showed the people who work on the cars.",
      "We built an Our Team page around the real crew photo, and rebuilt the About page as a long-form story with the family's own words.",
    ],
  ];
  for (const [index, [, title, problem, solution]] of solved.entries()) {
    await ensure(id(`built-${index + 1}`), "caseStudyItem", { title, text: `The problem: ${problem}\nWhat we did: ${solution}` }, rewrite);
  }
  await ensure(
    id("built"),
    "caseStudyCards",
    {
      eyebrow: "Problem & Solution",
      title: "What We Had to *Solve*",
      intro: "Most of the brief was pages and words. These were the parts that needed more than a page.",
      layout: "Story panels",
      image: null,
      images: solved.map(([name]) => asset(`img-shot-${name}`)),
      items: solved.map((_, index) => link(id(`built-${index + 1}`))),
    },
    rewrite,
  );

  // 3. On phones.
  await ensure(
    id("mobile"),
    "caseStudyGallery",
    {
      title: "Built for *Phones* First",
      intro: "Most visitors arrive on a phone, so every page was laid out and checked at phone width: big buttons, call links that open the dialer, and the ZIP check usable with one thumb.",
      images: ["home", "services", "insurance", "team"].map((name) => asset(`img-phone-${name}`)),
    },
    rewrite,
  );

  // 4. How we worked.
  const steps = [
    ["Reading the brief", "We went through the brief page by page: the pages to build, the exact words, and the rules for tone, layout, and phones."],
    ["Staging first", "We set up a separate staging site, so the live website stayed untouched until the client approved each page."],
    ["Building the pages", "Home, About, Insurance, Services, Our Team, and Reviews, built on WordPress and Elementor, with the old service pages folded into one Services page."],
    ["The hard parts", "The ZIP code check with its own lookup endpoint, and Google reviews on the site."],
    ["Checking on phones", "Every page checked at phone width before review: buttons, forms, call links, and text."],
  ];
  for (const [index, [title, text]] of steps.entries()) await ensure(id(`how-${index + 1}`), "caseStudyItem", { title, text }, rewrite);
  await ensure(
    id("how"),
    "caseStudyCards",
    {
      eyebrow: "How We Worked",
      title: "From Brief to *Launch*",
      layout: "Numbered steps",
      items: steps.map((_, index) => link(id(`how-${index + 1}`))),
    },
    rewrite,
  );

  // 5. Call to action, plain.
  await ensure(
    id("cta"),
    "caseStudyCallToAction",
    {
      title: "Have a Detailed Brief? We'll *Build It*.",
      text: "Send us what you need, and we'll talk through how to build it.",
      buttonLabel: "Get in Touch",
      buttonLink: "/contact",
    },
    rewrite,
  );

  await ensure(
    "case-study-drumond-auto-body",
    "caseStudy",
    {
      title: "Drumond Auto Body",
      slug: "drumond-auto-body",
      client: link("client-drumond-auto-body"),
      excerpt:
        "How we rebuilt an auto body shop's website from a detailed brief: six pages, a ZIP code check that shows each visitor's town and distance, and Google reviews that stay current.",
      cardHighlight: "Website rebuild with a ZIP code service-area check",
      cardPoints: ["Six-page website rebuild", "ZIP code service-area check", "Live Google reviews"],
      cardImage: asset("img-card"),
      heroHeading: "Drumond Auto Body: Rebuilding a Body Shop Website With a *ZIP Code Service-Area Check*",
      heroText:
        "We rebuilt the website of a family-owned body shop in Framingham, MA from a detailed brief: six pages on WordPress and Elementor, a ZIP code check for the towns it serves, and Google reviews that stay current.",
      heroImage: asset("img-hero"),
      sections: ["overview", "built", "mobile", "how", "cta"].map((name) => link(id(name))),
      services: ["development"],
      region: "United States",
    },
    rewrite,
  );
}

console.log("Done.");
