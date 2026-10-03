# Brand Portfolio Platform

> **Living project brief.** This is the single place to learn what the project is, what has been decided, and what is still open. It is updated whenever new information arrives; every change is recorded in the [Project log](#project-log).

**Last updated:** 3 Oct 2026 · **Current phase:** Phase 1 — Foundation (started 30 Sep 2026; Phase 0 decisions still open) · **Code:** home page built from the Figma design (every section and the site footer); blog posts load from Contentful; other pages are placeholders — see [Getting started](#getting-started-developers)

---

## At a glance

| | |
|---|---|
| **What** | The company's brand portfolio and lead-generation website |
| **Project name** | _TBD_ (repository and package: `inkpixel`) |
| **Client** | Internal — our own office/brand |
| **Project head** | _add name_ — owns architecture, tech stack, scope, and sign-offs |
| **Reference site** | [tekrevol.com](https://www.tekrevol.com/) — for scope and feel, not to copy |
| **Audience** | Prospective clients, national and international |
| **Quality bar** | Production-grade |
| **Top priorities** | SEO, speed, scalability, server-rendered HTML |
| **Estimated timeline** | ~12 weeks from kickoff + 2 weeks hypercare (kickoff date _TBD_) |

---

## What we are building

- **Case studies (portfolio):** listing with filters (industry, service, region) and a detailed page per project with results, metrics, testimonials, gallery, and video.
- **Services and industries:** overview and detail pages, each linked to related case studies.
- **Company:** about, leadership, awards, offices / international network, careers (optional).
- **Blog:** articles, categories, authors.
- **Contact and lead capture:** a form that never silently loses a lead; each enquiry is emailed to the sales inbox (and sent to a CRM, if one is adopted).
- **CMS for the marketing team (Contentful):** editors publish **case studies and blog posts** without developers, with live preview.
- **Static pages:** home, services, industries, about, contact, and legal pages keep their content in the code. Changing their text needs a developer and a deploy.
- **Built in from day one:** technical SEO, structured data, performance budgets, accessibility (WCAG 2.2 AA), cookie consent, and analytics.

Full page list and URL rules: [architecture plan §5](architecture-plan.md#5-information-architecture-and-urls).

---

## Goals and targets

| Goal | Target |
|---|---|
| Speed (real users, mobile) | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 |
| Speed (Lighthouse, every template) | Mobile ≥ 90 (stretch 95), desktop ≥ 95 |
| SEO | Lighthouse SEO 100; valid structured data; no rankings lost in migration |
| Accessibility | WCAG 2.2 AA |
| Editor autonomy | Publish a case study or blog post with no developer; live within 60 s |
| Leads | No lead silently lost; sales notified within 1 minute |

Details: [architecture plan §2](architecture-plan.md#2-goals-and-measurable-targets).

---

## Tech stack

### Decided

| Layer | Choice | Decided by | Date |
|---|---|---|---|
| Framework | **Next.js (App Router) with React** — one application; React is the component layer inside Next.js | Project head | 30 Sep 2026 |
| CMS | **Contentful** — replaces Sanity. Editors use the Contentful web app with Live Preview | Project head | 30 Sep 2026 |
| Content split | **Contentful holds only case studies and blog posts** (with their authors, categories, clients, testimonials, and metrics). Every other page is static content in the code | Project head | 30 Sep 2026 |
| Database | **None — Postgres dropped.** Contentful is the only data store. Leads are emailed, never stored (confirmed 30 Sep) | Project head | 30 Sep 2026 |
| Framework version | **Next.js 16.3.7** (App Router, Turbopack), **React 19.2.8**, all pinned to exact versions | Project head (scaffold) | 30 Sep 2026 |
| Language | **TypeScript 5**, `strict` mode; import alias `@/*` → `src/*` | Project head (scaffold) | 30 Sep 2026 |
| Source folder | **`src/`** — all application code lives under `src/` | Project head | 30 Sep 2026 |
| Package manager | **npm** (the plan originally proposed pnpm) | Project head | 30 Sep 2026 |
| Styling | **Tailwind CSS v4** through the `@tailwindcss/postcss` plugin; design tokens go in `@theme` in `src/app/globals.css` | Project head (scaffold) | 30 Sep 2026 |
| Linting | **ESLint 9** (flat config) with `eslint-config-next` (Core Web Vitals + TypeScript rules) | Project head (scaffold) | 30 Sep 2026 |
| Environment variables | **`@t3-oss/env-nextjs` + Zod** in `src/env.ts`; missing or empty values fail the build | Project head | 30 Sep 2026 |
| Content access | **Contentful GraphQL Content API**, called with `fetch` from server-only code (`src/contentful/client.ts`); no Contentful SDK | Project head | 30 Sep 2026 |
| Content types | Created **when the case-study and blog pages are built**, as migration scripts — not by hand in the web app | Project head | 1 Oct 2026 |
| Animation | **GSAP** (with ScrollTrigger, ScrollSmoother, `@gsap/react`) for scroll, tab, and hover animation, plus smooth (inertia) scrolling; CSS for the hero entrance and the header. Motion (Framer Motion) is not used | Project head | 2 Oct 2026 |
| Static-page images | Files in **`src/assets/images/`**, statically imported with `next/image`. Case-study and blog images stay in Contentful; video goes to Mux | Project head | 1 Oct 2026 |

### Proposed — awaiting project-head confirmation

From the [v2 architecture plan §4](architecture-plan.md#4-tech-stack--one-decision-per-layer). A row moves to **Decided** once confirmed.

| Layer | Proposal |
|---|---|
| Runtime | Node.js 24 LTS (Next.js 16 needs ≥ 20.9) |
| Rendering | Static pages; case studies and blog posts refresh instantly on publish (Cache Components) |
| UI primitives | shadcn/ui (on top of Tailwind) |
| Content tooling | Contentful migration scripts for content types; TypeScript types generated from the GraphQL schema (`graphql-codegen`) — both set up with the content types |
| Images / video | `next/image` (Vercel optimisation) for Contentful images / Mux for video |
| Forms and protection | Server Actions + Zod + React Hook Form; Cloudflare Turnstile; Vercel Firewall rate-limit rule |
| Leads | Emailed to a shared sales inbox (Resend) with an auto-reply to the visitor; never stored in Contentful. CRM optional (D3) — HubSpot's free CRM if sales wants one |
| Hosting | Vercel Pro |
| Analytics and consent | GA4 via GTM (after consent), Vercel Speed Insights, cookie-consent platform + Google Consent Mode v2 |
| Monitoring | Sentry, uptime monitor |
| Testing | Vitest, Playwright + axe, Lighthouse CI |
| Code quality | Prettier, Husky + lint-staged, Conventional Commits (commitlint), Renovate |

---

## Open decisions

These change the architecture or timeline. Each needs an answer by the end of Phase 0. Full context and defaults: [architecture plan §1](architecture-plan.md#1-decisions-needed-before-design-sign-off).

| # | Question | Status | Answer |
|---|---|---|---|
| D1 | Languages/markets at launch and within 12 months? Any right-to-left (Arabic, Urdu)? | Open | — |
| D2 | Existing site/domain with search traffic to migrate? | Open | — |
| D3 | Does the sales team use a CRM (a tool to track leads and deals, e.g., HubSpot, Zoho)? If not, do they want one? Default: launch with email to a shared sales inbox | Open | — |
| D4 | Any company rule on hosting or data location? | Open | — |
| D5 | Monthly SaaS budget? | Open | — |
| D6 | Team size and target launch date? | Open | — |
| D7 | Are Figma designs ready, or does design start now? | Open | — |
| D8 | Who edits content, and how many people? | Open | — |

---

## Team

| Role | Name | Responsibilities |
|---|---|---|
| Project head | _add name_ | Architecture, ADRs, scope, sign-offs, security review |
| UI/UX designer | _TBD_ | Figma, design tokens, motion specs |
| Frontend developer A | _TBD_ | Design system, layout, motion, performance |
| Frontend developer B | _TBD_ | CMS, data layer, lead pipeline, SEO plumbing |
| Content & SEO | _TBD_ | Keywords, copy, case studies, client approvals, redirects |
| QA (part-time) | _TBD_ | Testing, cross-browser, accessibility |
| Marketing owner | _TBD_ | Editor training, tags/analytics, content sign-off |

---

## Timeline and milestones

Week numbers count from kickoff (Week 1). Real dates are added once kickoff is set. Task-level detail: [execution plan](execution-plan.md).

| Milestone | Target week | Status |
|---|---|---|
| M0 Kickoff | W1 | Not started |
| M1 Decisions D1–D8 closed, ADRs approved | W2 | Not started |
| M2 Foundation live (CI, previews, CMS) | W3 | Not started |
| M3 Design sign-off | W3 | Not started |
| M4 Design system complete | W5 | Not started |
| M5 Feature complete | W9 | Not started |
| M6 Content complete | W10 | Not started |
| M7 Go / no-go | W11 | Not started |
| M8 Go-live | W12 | Not started |
| M9 Hypercare ends | W14 | Not started |

---

## Documents

| Document | Purpose |
|---|---|
| [README.md](README.md) | This file — living project brief and log |
| [/README.md](../README.md) | Repository front page; points here |
| [/AGENTS.md](../AGENTS.md) | Rules for AI coding assistants (`CLAUDE.md` includes it). `next dev` rewrites only the block between the `nextjs-agent-rules` markers; project rules go below it |
| [docs/architecture-plan.md](architecture-plan.md) | Architecture and tech decisions (the *what* and *why*) |
| [docs/execution-plan.md](execution-plan.md) | Tasks, owners, milestones, launch runbook (the *how*, *who*, *when*) |
| `Brand Portfolio Project Architecture & Execution Plan.pdf` | Original v1 plan (no longer in the project folder), superseded by the two documents above |
| `docs/adr/` | Architecture Decision Records (to be written in Phase 0) |

---

## Getting started (developers)

Covers the skeleton and the Contentful connection. It grows as Phase 1 adds tooling (task P1-12).

### Prerequisites

- **Node.js 24 LTS** (Next.js 16 needs at least 20.9)
- **npm** (comes with Node.js)
- **Contentful API keys** for the project's space — ask the project head

### Setup

```bash
npm install
cp .env.example .env.local     # PowerShell: Copy-Item .env.example .env.local
# fill in the values in .env.local (see Environment variables below)
npm run dev                    # http://localhost:3000
```

### Environment variables

Declared and validated in `src/env.ts`. Local values go in `.env.local`, which git ignores; never commit it or paste its values into chats or tickets. `.env.example` lists every variable without values.

| Variable | What it is | Where to find it |
|---|---|---|
| `CONTENTFUL_SPACE_ID` | The Contentful space | Contentful → gear icon → API keys → the "Website" key |
| `CONTENTFUL_ENVIRONMENT` | Contentful environment to read; defaults to `master` | Leave as `master` |
| `CONTENTFUL_DELIVERY_TOKEN` | Content Delivery API token — published content | Same API key page |
| `CONTENTFUL_PREVIEW_TOKEN` | Content Preview API token — drafts, draft mode only | Same API key page |
| `CONTENTFUL_MANAGEMENT_TOKEN` | Content Management API token — **only** for the `contentful:*` scripts (content-model migrations, sample posts). The website never reads it, and it is not in `src/env.ts`. Only developers who run migrations need it; later it lives in CI secrets only | Contentful → avatar → Account settings → CMA tokens → Create personal access token, then **Authorize** it for the InkPixel organization (without that, every request fails with `OrganizationAccessGrantRequired`) |

Once pages read from Contentful, a missing or empty value stops the build with a clear error. More variables (email, Turnstile, Sentry) are added as each service is connected.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with Turbopack (the default bundler in Next.js 16) |
| `npm run build` | Production build |
| `npm run start` | Serves the production build |
| `npm run lint` | Runs ESLint directly. `next lint` no longer exists in Next.js 16 |
| `npx tsc --noEmit` | Type check (no script yet; CI adds one in P1-08). Run it after `npm run dev` or `npm run build`, which generate the route types it reads from `.next/` |
| `npm run contentful:migrate -- contentful/migrations/<file>.cjs` | Applies one content-model migration to the space and environment in `.env.local`. Shows the planned changes and asks before applying. Needs `CONTENTFUL_MANAGEMENT_TOKEN` |
| `npm run contentful:seed-posts` | One-time: adds the three sample posts from the design (and their categories) and publishes them. Safe to run again (skips what exists). **Sample content — replace or delete before launch** |

### Project layout

Target structure: [architecture plan §7](architecture-plan.md#7-folder-structure). Empty folders hold a `.gitkeep` until code arrives.

| Path | Contents |
|---|---|
| `src/app/` | Routes. `layout.tsx` is the root layout (fonts, site metadata); `not-found.tsx`, `global-error.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts` |
| `src/app/(site)/` | Every public page; its `layout.tsx` adds the header, footer, and skip link. Pages are placeholders until Phase 3 |
| `src/app/api/` | Contentful webhook (`revalidate`) and draft-mode routes — stubs that answer 501 until P3-03 / P3-04 |
| `src/components/` | `layout/` (Header, Footer); `ui/`, `sections/`, `case-studies/`, `motion/`, `seo/` for later phases |
| `src/contentful/` | `client.ts` — the server-only GraphQL client (caches published content); `queries/` — typed fetchers, e.g. `posts.ts` (`getLatestPosts`); `generated/` comes with GraphQL type generation |
| `src/assets/images/` | Photos and images for the static pages (see [Media](#media-where-files-go)) |
| `src/lib/site.ts` | Site name, URL, email, tagline, office address, header menu, and footer link columns (`footerNav`: sitemap, services, legal) |
| `src/content/` | Static content as typed data, e.g. `services.ts` (service categories and their services), `home.ts` (featured project — placeholder until case studies come from Contentful), `industries.ts` (industries and their solutions; also meant for the `/industries` pages), `faq.ts` (questions and answers) — edit copy here, not inside components. The studio email is `siteConfig.email` in `src/lib/site.ts` |
| `src/assets/design/` | Local design references (e.g. the full Figma export `Home.svg`, 16.7 MB). **Git-ignored** — never committed |
| `src/env.ts` | Environment variable validation |
| `src/server/` | Server-only code (lead emails, Turnstile) — Phase 3 |
| `contentful/migrations/` | Content types as code, numbered and run in order: `0001-blog-model.cjs` (category, person, seo, post). Case-study types come with the case-study pages |
| `scripts/` | Developer scripts: `contentful-migrate.mjs`, `contentful-seed-posts.mjs` |
| `e2e/` | Playwright tests (P1-09) |
| `public/` | Static files served from `/`. Favicons and small SVGs only — no photos or video |
| `docs/` | Project brief, architecture plan, execution plan, `adr/` |
| `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs` | Next.js, Tailwind (PostCSS), and ESLint configuration |

### Content: what lives where

| Content | Source | Who changes it |
|---|---|---|
| Case studies, blog posts, categories, authors, clients, testimonials, metrics | Contentful | Editors, in the Contentful web app |
| Home, services, industries, about, contact, legal pages, menus | Code (`src/content/…`, `src/app/(site)/…`, `src/lib/site.ts`) | Developers, through a pull request |

- Server code reads Contentful with `contentfulQuery()` from `src/contentful/client.ts`. Never import it into client components.
- **Caching:** published content is fetched when the site is built and refreshed in the background every hour (`revalidate`, default 3600 s); each query also gets cache `tags` (e.g. `post`) so the publish webhook (P3-03) can refresh it straight away. Draft mode (`preview: true`) is never cached.
- **Blog content types** are defined in `0001-blog-model.cjs`: **category**, **person** (authors), **seo**, and **post** (title, slug, excerpt, category, author, published/updated dates, cover image, body, seo). Reading time is calculated from the body, so editors don't enter it. Case-study types come with the case-study pages.
- **Never change the content model by hand** in the Contentful web app. Add a new numbered file in `contentful/migrations/` and run it with `npm run contentful:migrate`.
- **A section that reads Contentful hides itself if Contentful fails or has no entries**, so the rest of the page still builds. The server log says why: a **warning** while the content type doesn't exist yet (run the migration), an **error** for anything else (Contentful down, wrong token). Errors include Contentful's own message (`ContentfulError` in `client.ts`). The home page "From the studio." section shows the 3 newest posts.

### Media: where files go

| Media | Where | How it is used |
|---|---|---|
| Case-study and blog images (hero, gallery, cover, author photos, client logos) | Contentful → **Media** tab, uploaded by editors. The asset's **Description** is the alt text — always fill it in | `next/image`, loaded from Contentful's image server |
| Static-page images (home, services, industries, about, contact) | **`src/assets/images/`** in the repository | Imported in code, then passed to `next/image` (example below) |
| Video (hero, case-study video) | **Mux** | Mux player. Never in Git or `public/` |
| Favicon and app icons | `src/app/` (`favicon.ico`, `icon.png`, `apple-icon.png`) | Picked up by Next.js automatically |
| Small SVGs and fixed files that need a stable URL | `public/` | Referenced from `/` (e.g. `/logo.svg`). No photos or video |

Rules for `src/assets/images/`:

- **Compress before adding:** JPEG or WebP for photos, PNG only when transparency is needed, SVG for logos and icons. Keep each file under ~500 KB and no wider than about 2560 px. Vercel creates the smaller sizes and modern formats automatically.
- **Name files** in lowercase with hyphens, grouped by page if it helps: `home/hero.jpg`, `about/team-photo.jpg`.
- **Import, don't link.** A static import lets Next.js read the image's width and height at build time, so the page does not jump while it loads:

```tsx
import Image from "next/image";
import hero from "@/assets/images/home/hero.jpg";

<Image src={hero} alt="Describe what the image shows" preload />
```

Use `preload` only for the one main image at the top of a page (the LCP image); other images above the fold can use `loading="eager"`. The older `priority` prop is deprecated in Next.js 16. Always write a real `alt` text.

### Styling with Tailwind CSS v4

- Tailwind v4 has **no `tailwind.config.js`**. It is set up in CSS: `src/app/globals.css` starts with `@import "tailwindcss";`, and `postcss.config.mjs` loads `@tailwindcss/postcss`.
- **Design tokens** (colours, fonts, spacing, radius) go in the `@theme` block in `src/app/globals.css`. Each token becomes a CSS variable and a utility class; for example, `--color-background` gives `bg-background`.
- Brand values live in `:root` in `src/app/globals.css` and are mapped to Tailwind in `@theme inline`. Change a colour in `:root` and every class that uses it follows.

| Token | Value | Tailwind classes |
|---|---|---|
| Navy (page background) | `#151936` | `bg-primary`, `text-primary` (also `bg-background`) |
| Light (main text) | `#F6EFEB` | `text-light`, `bg-light` (also `text-foreground`); softer text with opacity, e.g. `text-light/70` |
| Crimson | `#C91D4C` | `text-crimson`, `bg-crimson` |
| Coral | `#FA6143` | `text-coral`, `bg-coral` |
| Brand gradient | crimson → coral | `bg-brand-gradient` |
| Headings font | Bricolage Grotesque | `font-display` |
| Body font | Inter | `font-sans` (the default) |
| Label font | JetBrains Mono | `font-mono` — small labels only |

- **Page width:** wrap section content in `container-site`, which keeps the same side margins as the header (they scale with the 1920px design frame).
- **Fonts** are loaded in `src/app/layout.tsx` with `next/font/google` (self-hosted). Don't add Google Fonts `<link>` or `@import` tags.
- **Shared UI:** `Button` (gradient `primary` or outline `secondary`, optional drop `icon`) and `Eyebrow` (small pill label) in `src/components/ui/`.
- **More shared UI** in `src/components/ui/`: `SectionHeading` (section title + description, centred or left, for dark or light sections), `FeatureItem` (icon + title + description), and `Tabs` / `TabList` / `Tab` / `TabPanel` — accessible, unstyled tabs (arrow keys, Home/End; inactive panels stay in the HTML for SEO). Style tabs with `data-[state=active]:…`.
- **`Accordion`** (`src/components/ui/`): questions and answers, one open at a time (FAQ). Built on `<details>`, so it works without JavaScript, answers stay in the HTML, and find-in-page opens the matching answer. Takes `items` (question + answer lines), a group `name`, and `defaultOpen`.
- **`Eyebrow tone="light"`**: white pill with a soft shadow and grey text, for cream sections ("● 08 · FAQ").
- **`PostCard`** (`src/components/ui/`): blog article card — category pill, month, title, reading time, arrow; the whole card is one link and it scales with its own width (container queries). Takes a `PostSummary` from `getLatestPosts()`. Reusable on the blog listing.
- **`icons.tsx`** (`src/components/ui/`): small decorative icons, e.g. `ArrowUpRightIcon` ("All articles", cards).
- **Light sections:** `SectionHeading` takes `tone="onLight"`, `size="lg"` (≈84px titles), and `eyebrowTone="brand"` (coral → crimson pill). `Button variant="primary-reverse"` is the coral → crimson button used on light backgrounds (`bg-brand-gradient-reverse`).
- **`SectionHeading` paragraphs:** `description` takes one string or an array (blank line between paragraphs); `descriptionTone="bright"` makes them full white/navy instead of slightly softened.
- **`SectionHeading size="fluid"`**: like `lg`, but the size also follows its column (needs an `@container` ancestor), so a long first line such as "What Our Clients" never wraps onto a third line at laptop widths. Bricolage draws relatively wider letters at small sizes, which is why a plain `vw` size is not enough in narrow columns. **`size="fluid-wide"`** is the same for a much longer first line (~12em, e.g. "Industry-Specific Solutions").
- **Check headings with a scrollbar:** on Windows the scrollbar narrows the page by ~17px, but `vw` sizes ignore it. A heading that only just fits can wrap there even when it fits in a test browser without scrollbars.
- **`FeatureItem` options:** `iconTone="gradient"` paints a white icon in the brand gradient (CSS mask, so no extra icon files); `size="lg"` gives a bigger icon and a bolder Bricolage title (industry solutions). Defaults (`white`, `md`) are the services grid.
- **`CountUp`** takes a `prefix` (e.g. `"+"` for "+150%").
- **`ProjectCard`**: project image with a dark fade, name, summary, and "Project Detail"; the whole card is one link. Its text and spacing scale with the card's own width (container queries), so it works at any column width. `DropIcon gradient` draws the drop in the brand gradient.
- **Backgrounds:** `bg-grid` draws the faint square grid used on dark sections.
- **Icons from Figma:** check exported "SVG" icons before using them — Figma often wraps a PNG inside the SVG (the branding icons were 48–139 KB each). Extract them to small PNGs or ask for true vector exports.
- **Counters:** `CountUp` in `src/components/motion/` counts from 0 to a number the first time it scrolls into view, e.g. `<CountUp value={93} suffix="%" delay={150} />`. The page HTML always holds the real number (for search engines and screen readers), and visitors who prefer reduced motion see the final value straight away. It uses plain browser APIs, not GSAP.

### Animation (GSAP)

| Piece | Where | What it does |
|---|---|---|
| GSAP setup | `src/lib/gsap.ts` | Registers the plugins once. **Always import GSAP from `@/lib/gsap`**, never from `"gsap"` directly, and only in client components |
| `SmoothScroll` | `src/components/motion/` | Inertia scrolling (ScrollSmoother) around `main` + footer in `src/app/(site)/layout.tsx`. Off on touch screens and for reduced motion. Enables parallax: add `data-speed="auto"` (or e.g. `0.8`) to an element |
| `Reveal` | `src/components/motion/` | Fades a block up when it scrolls into view, once. Mark children with `data-reveal` to cascade them one by one |
| `Magnetic` | `src/components/motion/` | Wrap a button so it eases toward the cursor (desktop mouse only) |
| Hero entrance | `globals.css` (`animate-rise`, `animate-line-up`, `animate-hero-zoom`) | CSS, so it starts on the first frame without waiting for JavaScript |
| Service tabs | `src/components/sections/home/ServiceTabs.tsx` | The highlight slides between tabs; its gradient is recalculated so it always matches the panel with no seam |
| Industry tabs | `src/components/sections/home/IndustryTabs.tsx` | On desktop a soft band (from the screen's left edge) slides to the chosen industry and its solutions cascade in. Before JavaScript runs, the active row draws the band itself |
| Closing CTA | `src/components/sections/home/ContactCta.tsx`, `globals.css` (`animate-glow-pulse`, `animate-gradient-flow`) | The label, both heading lines, the paragraph and the buttons rise in one after another (`Reveal`); the orange → pink gradient slowly flows through "next thing you ship." (a 200%-wide gradient whose position moves); the two crimson glows pulse gently, half a cycle apart, and are pulled toward the pointer (below). CSS loops use `motion-safe:`, so reduced motion shows the design still. To offset a looping animation, set `animationDelay` inline: the `animate-*` shorthand resets a delay class |
| Pointer pull | `src/components/motion/PointerParallax.tsx` | Background layers pulled toward the pointer (GSAP), used for the closing CTA's "magnetic glows": each layer eases toward the pointer by its `data-strength` (0–1; negative pushes away), stretches a little along the direction of movement like liquid, and springs back when the pointer leaves. Mark layers `data-pointer-layer` and make each one a zero-size anchor at the visual's centre with the visual inside, so its CSS animations keep working. Mouse and trackpad only; off for reduced motion |
| FAQ answers | `src/components/ui/Accordion.tsx` | Answers slide open and closed; opening one slides the other shut, and the "+" turns into "×" |
| Pinned section | `src/components/sections/home/ProcessTimeline.tsx` | Locks "Our Process" to the screen and scrolls the timeline inside it (ScrollTrigger `pin` + `scrub`). Sets `data-pinned="true"` on the section; layout changes for the locked state use `group-data-[pinned=true]/process:` classes, so nothing changes without JavaScript. Desktop + motion allowed only. One card at a time is active (the Live style + a bigger dot): it follows the locked scroll from the first card to Live; when not locked, the card crossing the screen middle is active |

Rules:
- **Respect reduced motion.** Wrap GSAP code in `gsap.matchMedia()` with `MOTION_OK` (or check it), and prefix CSS animations with `motion-safe:`. Content must be fully visible without animation and without JavaScript.
- **Animate only `transform` and `opacity`** (and colours); never width, height, top, or margin.
- **Fixed elements stay outside `SmoothScroll`** (the header already is). `position: sticky` does not work inside it.
- **Don't call `scrollIntoView()` or plain `focus()` on elements inside the smooth-scrolling content** — it scrolls the hidden wrapper instead of the page. Use `window.scrollTo()` (or ScrollSmoother's `scrollTo`) and `focus({ preventScroll: true })`.
- **Size:** GSAP adds roughly 50–64 KB of gzipped JavaScript to the home page (234 KB total). Keep new effects inside the existing plugins.

### Next.js 16 note

Next.js 16 differs from older versions and from what many tutorials show. Before using a Next.js API, check the docs bundled with the installed version in `node_modules/next/dist/docs/`.

---

## Project log

Newest first. Every new fact, decision, or change to the project is recorded here.

| Date | Update | Source |
|---|---|---|
| 3 Oct 2026 | **Privacy page moved to `/privacy-policy`** (project head decision, following the architecture plan's routes); the footer's "Privacy" link points there. `/terms` unchanged; `/cookie-policy` still to come (P3-12) | Project head |
| 3 Oct 2026 | **Design polish from project-head review (2–3 Oct), not logged earlier:** services box shorter (less padding); the active service tab's highlight no longer shows a seam or edge lines on zoomed or scaled screens (exact sub-pixel placement); "Our Process" left column vertically centred while the section is locked; the gradient tick badge now marks whichever step is active (other steps show the small dot), and the timeline line starts and ends exactly on the markers; Industries section shorter (smaller industry names, icon circles, and solution icons) with a right margin so text never touches the highlight band; Insights cards line up with the page margin on phones; Contentful errors now include Contentful's own message, and a missing content type logs a warning instead of an error | Project head |
| 3 Oct 2026 | **Closing CTA: "magnetic glows" added** (project head request: a GSAP background effect that follows the pointer). The two glows are pulled toward the pointer, stretch a little as it moves, and spring back when it leaves (`PointerParallax`); the gradient flow, glow pulse and scroll reveal stay. Tested: pull lands exactly on target, spring-back on leave, nothing moves with reduced motion; no page errors | Project head |
| 3 Oct 2026 | **Footer rebuilt from the design** ("Let's make something great."): big gradient closing line, studio tagline, Sitemap, Services and Contact columns (email + Karachi office address), copyright row with Privacy and Terms; the old logo and menu row removed. Content in `src/lib/site.ts` (`footerNav`, `siteConfig.tagline`, `siteConfig.address`). **Project head decisions:** aligned to the same left edge as the header and every section (the design's footer sits 74px further right); each service links to its own page (`/services/<slug>`, placeholders until P3-07); placeholder `/privacy` and `/terms` pages added (**legal text needed before launch**). Matches the design export at 1920px within 1px (footer 1130px tall); checked at 1366, tablet and phone widths | Project head |
| 3 Oct 2026 | **Closing CTA animation changed again: "gradient text + glows"** (project head decision: the living glows didn't fit either). The heading rises line by line on scroll, the gradient flows slowly through "next thing you ship.", and the two glows pulse gently; no cursor effect. CSS only (plus the existing `Reveal`); `LivingGlows.tsx` deleted. Tested with and without reduced motion, at 1920, 1366 and phone widths | Project head |
| 3 Oct 2026 | **Closing CTA animation changed: water ripples replaced by "living glows"** (project head decision: the ripples didn't fit the theme). The design's two glows now drift and breathe, and a soft coral light follows the cursor (`LivingGlows`); `WaterRipples.tsx` deleted. Tested: drift pauses off screen, the light follows and fades, reduced motion keeps the design still | Project head |
| 3 Oct 2026 | **Home closing CTA built** ("Let's build the next thing you ship."), after Insights: plum background with two crimson glows, gradient second line, "Start a project" (→ `/contact`) and an email button. **Water ripple effect** (project head request): moving the cursor sends ripples across the background; a click or tap makes a bigger one (`WaterRipples`, WebGL). The email button uses `info@inkpixelstudios.com` (`siteConfig.email`) instead of the design's `hello@tfgsolutions.pk`; project head decision. Checked against the design export at 1920px (section 634px vs 636px, background within a few colour units), at 1366 and phone widths, and with reduced motion (effect off) | Project head |
| 3 Oct 2026 | **Home "From the studio." (Insights) section built, reading blog posts from Contentful** (project head decision: connect Contentful now instead of placeholder data). Blog content model added as a migration (`contentful/migrations/0001-blog-model.cjs`: category, person, seo, post) with `npm run contentful:migrate`; three sample posts from the design via `npm run contentful:seed-posts` (**sample content — replace or delete before launch**). New `CONTENTFUL_MANAGEMENT_TOKEN`, used only by these scripts (`contentful-migration` added as a dev dependency). The section shows the 3 newest posts (category, month, title, reading time calculated from the body), refreshed hourly, and hides itself if Contentful fails or has no posts. Label "09 · Insights" (the design says 08; FAQ is now 08). Cards link to `/blog/<slug>`, placeholder pages until P3-11. **Run on `master` (3 Oct):** migration `0001` applied and the 3 sample posts published, after the management token was authorized for the InkPixel organization (new tokens need **Authorize** on the CMA tokens page, or Contentful answers `OrganizationAccessGrantRequired`). Checked against the design at 1920px (section 853px vs 858px), and at 1366 and phone widths | Project head |
| 2 Oct 2026 | **Home FAQ section built** ("Common questions."), after Industries: five questions, one answer open at a time, with an email prompt (`info@inkpixelstudios.com`, now `siteConfig.email`). Label changed to **"08 · FAQ"** (the design says 09, but Insights, which comes after it, is 08); project head decision. The email link uses brand crimson with a light underline instead of the design's lighter red, so it is readable at every size. **Placeholders:** answers 2–5 are drafts (the design only shows the first) — they are promises to clients, so the studio must confirm or rewrite them in `src/content/faq.ts` before launch. Checked against the design export at 1920px (section 834px vs 832px), and at 1366, 1024, and phone widths; click, keyboard, find-in-page, reduced motion, and no-JavaScript tested | Project head |
| 2 Oct 2026 | **Home "Industry-Specific Solutions" section built**: five industries (Fintech, Healthcare, Real estate, Logistics, Ecommerce) as tabs; the chosen industry's solutions show in a 2-column grid with gradient icons. On phones and tablets the industries become a sideways-scrolling row of pills. Content in `src/content/industries.ts`. **Placeholders:** every industry shows the six Branding services (as the design does) until each has its own solutions; Ecommerce reuses the Logistics icon until its own icon arrives. Checked against the design export at 1920px (section 1320px vs 1321px), and at 1366, 1024, and phone widths, with and without a scrollbar; click and arrow-key switching tested | Project head |
| 2 Oct 2026 | **Hero title set to Bold (700)** — "We make / brand / that earns / its place." (was Regular 400, matching the original Figma); project head decision. Checked at 1920px and on phones: no line wraps | Project head |
| 2 Oct 2026 | **Our Process: the highlight now moves card by card while scrolling** — the Live style (peach → pink, coral border, bigger dot) is applied to one phase at a time, from 01 to Live, and back when scrolling up; Live is only highlighted when reached (or without JavaScript). Tested on desktop (locked) and phone | Project head |
| 2 Oct 2026 | **Home "Our Process" section built** (03 · Process): six phases + "Live" timeline. On desktop (≥1024px, motion allowed) the section **locks to the screen** (100dvh) while the timeline scrolls inside it, then unlocks once the Live card is fully visible (GSAP ScrollTrigger pin + scrub; tested at 1920×1080 and 1366×768). Phones, tablets, reduced motion, and no-JS get a normal list. Copy fixes from the design: "Transparent", "products that execute", "not the end", eyebrow "03 · Process". Network background extracted from the design export and baked at 12% (12 KB) | Project head |
| 2 Oct 2026 | **Testimonials: the paragraphs are now each testimonial's quote** and change with the slide (`quote` in `src/content/home.ts`); the heading and "View All Projects" stay fixed. Fixed the heading wrapping onto 3 lines at 1280–1366px — it now stays on 2 lines at every width (checked 390–2560px) | Project head |
| 2 Oct 2026 | **Home testimonials section built** ("What Our Clients Say About Us"): carousel with a client photo/video card, 4 counting results, and 6 dots (keyboard and screen-reader accessible, no auto-rotation). **Placeholders:** the 6 testimonials are copies of one, with a stock photo from the design — replace with real clients (photo/video, results, written consent) in `src/content/home.ts`. The play button appears only when a testimonial has a `video` URL. Portrait and the transparent brand drop extracted from the design export; the opaque `grident-drop-icon.webp` removed | Project head |
| 2 Oct 2026 | **Home "Ideas Engineered Into Impact" section built** (02 · Capabilities) with the featured project card (Pak Armoring). The featured project is **static placeholder data** in `src/content/home.ts` until case studies come from Contentful. Checked against the full design export at 1920px (section 763px vs 767px). `src/assets/design/` (Figma exports) git-ignored | Project head |
| 2 Oct 2026 | **Decided: GSAP for animation, with smooth scrolling.** Service tabs: the active-tab colour seam fixed — a sliding highlight whose gradient is recalculated to match the panel (tested: colour difference ≤ 2/255 at the join on every tab). Services cascade in on tab switch. Scroll reveals on headings, stats, and services; hero entrance (CSS) and photo parallax; magnetic CTA buttons with a sheen; icon lift and menu hover pill. All respect reduced motion. GSAP adds ~50–64 KB gzipped JS (home page 234 KB total) — at/over the plan's +60 KB guideline, pending project-head sign-off | Project head |
| 2 Oct 2026 | **Home services section built** ("Building The Future of Digital Products"): tabs for six service categories with a 3×2 service grid. New reusable UI: `Tabs`, `SectionHeading`, `FeatureItem`, `bg-grid`. Service content lives in `src/content/services.ts`. **Branding** is complete; Development, Marketing, Software, Applications, and AI Automation show "coming soon" until their content and icons arrive. Branding icons converted from bitmap-in-SVG exports (~490 KB) to small PNGs (41 KB) | Project head |
| 1 Oct 2026 | **Home stats section built** ("Innovation Delivered"): four stats — 93% project satisfaction, 80% web development excellence, 100+ digital projects shipped, 78% mobile app development impact — that count up from 0 when scrolled into view (`CountUp`, no animation library). Scrolled header set back to 85% navy so the menu stays readable over light sections. **Known issue, deferred by the project head:** at ~1024px wide the header menu is too tight and "Our Work" wraps (issue I1 in the execution plan) | Project head |
| 1 Oct 2026 | **Header and home hero built from the Figma design** (1920px frame). Fonts self-hosted with `next/font`: Bricolage Grotesque (headings), Inter (body), JetBrains Mono (labels) — font budget raised to 3 families. Colour tokens in `globals.css` (navy `#151936`, light `#F6EFEB`, crimson `#C91D4C`, coral `#FA6143`, brand gradient). Menu: Home, About, Services, Industries, Technologies (new page), Insights (`/blog`), Our Work (`/case-studies`). Hero banner converted to WebP (1.2 MB → 28 KB) | Project head |
| 1 Oct 2026 | **Decided: static-page images live in `src/assets/images/`** and are imported with `next/image`. Case-study and blog images stay in Contentful; video goes to Mux. Media section added to Getting started | Project head |
| 1 Oct 2026 | **Contentful connected:** API keys created in the space; delivery and preview tokens tested against the GraphQL API. **Decided:** content types are created when the case-study and blog pages are built, as migration scripts. Docs updated; architecture plan → v2.4 | Project head |
| 30 Sep 2026 | **Decided: Contentful only for case studies and blog posts.** Home, services, industries, about, contact, and legal pages are static content in code; the `/[slug]` CMS-page route is removed. Leads stay email-only. Also decided: **npm** (not pnpm) and the **`src/`** folder. Skeleton pages built; `src/env.ts` and the Contentful GraphQL client added. First commit pushed | Project head |
| 30 Sep 2026 | **Rule for AI assistants** (in `AGENTS.md`): ask the project head and wait for a yes before creating, changing, or deleting anything, including commands that change the project | Project head |
| 30 Sep 2026 | **Codebase scaffolded** with `create-next-app`: Next.js 16.3.7, React 19.2.8, TypeScript (strict), App Router, Turbopack, **Tailwind CSS v4**, ESLint 9 (flat config). These move to **Decided**. Two differences from the plan flagged for a decision: npm instead of pnpm, and no `src/` folder. First version of Getting started written; root `README.md` replaced with a pointer to this file. Architecture plan → v2.3 | Project head |
| 30 Sep 2026 | **Execution started:** Phase 1 (Foundation) begun, in parallel with the open Phase 0 decisions. Project head runs the setup commands step by step | Project head |
| 30 Sep 2026 | **Decided: no database — Postgres dropped.** Contentful is the only data store. Leads are emailed to a shared sales inbox; CRM is optional (D3). Proposed: Vercel Firewall rate limiting instead of Upstash. Architecture plan → v2.2 | Project head |
| 30 Sep 2026 | **Proposed:** drop the SQL database entirely. Leads go to the CRM plus an email copy to sales; small Postgres table only if there is no CRM. Awaiting project-head confirmation | Recommendation |
| 30 Sep 2026 | **CMS decided: Contentful.** Sanity dropped. Architecture plan updated to v2.1; execution plan tasks updated | Project head |
| 30 Sep 2026 | README moved into `docs/`; links updated | Project head |
| 30 Sep 2026 | README (living brief) and [execution plan](execution-plan.md) created | Project head request |
| 30 Sep 2026 | v1 plan (PDF) reviewed; [v2 architecture plan](architecture-plan.md) written with one decision per layer, fixed folder structure, and new workstreams | Review |
| 30 Sep 2026 | Framework decided: **Next.js + React** | Project head |
| 30 Sep 2026 | Project received from the office. Brand portfolio site in the style of tekrevol.com; case studies; national/international reach. Priorities: scalability, SEO, speed, server-side rendering. Phase: planning only, nothing installed | Project head |

---

## How this file is maintained

- Any new information about the project updates the relevant section above **and** adds a dated row to the Project log.
- **Decided** and **Proposed** stay separate. A proposal becomes a decision only when the project head confirms it.
- If an update affects scope, timeline, or architecture, the matching section in the architecture plan or execution plan is updated at the same time.
