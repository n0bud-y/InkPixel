// One-time: adds the case studies built from the designs to Contentful, with their images,
// clients, and sections, all published:
// - Gulbaan (from the first, hard-coded build of the page). Its text is the content document's
//   (Website Content – Ink Pixel Studio.docx, 23 Oct 2026).
// - Terminal Gateway CRM (from CRM-terminalgateway-case-study.svg). Its text is the content
//   document's too (the design's had come from another agency's case study).
// - Cathy O’Bryan’s Books (from application-Cathy-O’Bryan’s-Books.svg). The design's copy,
//   except the parts copied from other projects (see that section below).
// Replace the placeholder text in Contentful before launch.
// Usage: npm run contentful:seed-case-studies
// (needs the model: migrations 0002 to 0005, and 0009 for the card images)
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

console.log("Done.");
