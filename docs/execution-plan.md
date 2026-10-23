# Execution Plan — Brand Portfolio Platform

| | |
|---|---|
| **Status** | Draft — kickoff date _TBD_ |
| **Owner** | Project Head |
| **Last updated** | 22 Oct 2026 |
| **Companion** | [architecture-plan.md](architecture-plan.md) covers *what* we build and *why*. This document covers *how*, *who*, and *when* |

---

## 1. How to use this document

- **Weeks** are counted from kickoff: W1 is the kickoff week. When kickoff is set, add real dates to the milestone table (§3).
- **Every task** has an ID, an owner role, dependencies, an output, and a status. Each task ID becomes one issue on the project board.
- **Status values:** `Not started` · `In progress` · `Blocked` · `Done`.
- **Update statuses every Friday** before the weekly status report (§7).

**Owner abbreviations**

| Code | Role |
|---|---|
| PH | Project head |
| DS | UI/UX designer |
| FA | Frontend developer A — design system, layout, motion, performance |
| FB | Frontend developer B — CMS, data, lead pipeline, SEO plumbing |
| CS | Content & SEO |
| QA | QA (part-time from Phase 3) |
| MK | Marketing owner |

---

## 2. Planning assumptions

The 12-week timeline assumes the defaults below. If any of them change, re-plan §3 and §4.

| Assumption | Source | If it changes |
|---|---|---|
| Team as listed above, available full-time (QA part-time) | D6 default | Fewer developers → roughly +3–4 weeks |
| Design starts from scratch | D7 default | Designs ready → Phase 0 shrinks to ~1 week |
| English at launch, locale-ready routing | D1 default | Multilingual at launch → +2–3 weeks (translation, RTL, QA) |
| Vercel hosting; Contentful CMS | D4 default; Contentful decided 30 Sep 2026 | AWS-mandated hosting → +1–2 weeks of infrastructure work |
| Contentful holds only case studies and blog posts; every other page is static content in code | Project head, 30 Sep 2026 | Moving a page type into Contentful → +2–4 days per page type |
| No database; leads are emailed to a shared sales inbox; no CRM at launch | Postgres dropped 30 Sep 2026; D3 default | Sales adopts a CRM → +1–2 days to integrate it |
| Existing site with search traffic will be replaced | D2 default | No existing site → drop migration tasks |

---

## 3. Milestones and gates

A milestone is only **Done** when the gate owner signs off against the criteria.

| ID | Milestone | Week | Date | Gate owner | Criteria | Status |
|---|---|---|---|---|---|---|
| M0 | Kickoff | W1 | _TBD_ | PH | Team assigned; owners named for D1–D8; tool access requested | Not started |
| M1 | Decisions closed | W2 | _TBD_ | PH | D1–D8 answered in README; ADRs 1–8 approved | Not started |
| M2 | Foundation live | W3 | _TBD_ | PH | CI green; preview URL per PR; Contentful connected (delivery + preview); performance baseline recorded | Not started |
| M3 | Design sign-off | W3 | _TBD_ | MK + PH | Figma for every template at 3 breakpoints, including motion specs | Not started |
| M4 | Design system complete | W5 | _TBD_ | DS + PH | Component gallery matches Figma; zero critical axe issues | Not started |
| M5 | Feature complete | W9 | _TBD_ | PH | Case-study and blog templates on Contentful; static templates complete; lead pipeline complete; editor acceptance test passed | Not started |
| M6 | Content complete | W10 | _TBD_ | MK | Case studies and posts in Contentful; static-page copy merged in code; client approvals on file | Not started |
| M7 | Go / no-go | W11 | _TBD_ | PH + MK + management | Launch checklist (architecture plan §16) all green | Not started |
| M8 | Go-live | W12 | _TBD_ | PH | Runbook (§8) completed; no error spike in 48 h | Not started |
| M9 | Hypercare ends | W14 | _TBD_ | PH | No open critical issues; handover to business-as-usual | Not started |

---

## 4. Timeline at a glance

| Workstream | W1 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | W9 | W10 | W11 | W12 | W13–14 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Phase 0 — Discovery & design | ■ | ■ | ■ | | | | | | | | | | |
| Phase 1 — Foundation | | ■ | ■ | | | | | | | | | | |
| Phase 2 — Design system | | | ■ | ■ | ■ | | | | | | | | |
| Phase 3 — Templates & features | | | | | ■ | ■ | ■ | ■ | ■ | | | | |
| Content workstream | ■ | ■ | ■ | ■ | ■ | ■ | ■ | ■ | ■ | ■ | | | |
| SEO & migration | ■ | ■ | ■ | | | | | | ■ | ■ | ■ | ■ | ■ |
| Phase 4 — Hardening & QA | | | | | | | | | ■ | ■ | ■ | | |
| Phase 5 — Launch | | | | | | | | | | | | ■ | |
| Phase 6 — Hypercare | | | | | | | | | | | | | ■ |

**Critical path:** decisions (M1) → designs (M3) → design system (M4) → templates (M5) → QA → launch. The parallel risk is **content**: case studies and client approvals take longer than code on almost every agency project.

---

## 5. Task breakdown

### Phase 0 — Discovery & design (W1–W3)

| ID | Task | Owner | Depends on | Output | Status |
|---|---|---|---|---|---|
| P0-01 | Kickoff: goals, KPIs, scope, roles, cadence | PH | — | Kickoff notes; responsibility matrix | Not started |
| P0-02 | Get answers to D1–D8; record them in the README | PH | P0-01 | Decisions logged | Not started |
| P0-03 | Accounts and access with 2FA: GitHub, Vercel, Contentful, Resend, domain registrar (incl. SPF/DKIM/DMARC records), shared sales inbox, Google (GA4, GTM, Search Console), CRM if adopted | PH | P0-02 | Access list | Not started |
| P0-04 | Collect brand assets: logo, guidelines, fonts, colours, imagery | DS | P0-01 | Brand kit | Not started |
| P0-05 | Audit existing site: URL inventory, traffic, backlinks (if D2) | CS | P0-01 | URL inventory sheet | Not started |
| P0-06 | Keyword research per service and industry | CS | P0-01 | Keyword map | Not started |
| P0-07 | Finalise sitemap / information architecture | PH + CS + DS | P0-06 | Approved sitemap | Not started |
| P0-08 | Scope sign-off, prioritised Must / Should / Could / Won't | PH + MK | P0-07 | Signed scope | Not started |
| P0-09 | Content model draft (Contentful content types, architecture plan §6) | FB | P0-07 | Content model document | Not started |
| P0-10 | Wireframes for every template | DS | P0-07 | Wireframes | Not started |
| P0-11 | High-fidelity Figma at 3 breakpoints, including motion specs | DS | P0-10, P0-04 | Figma file | Not started |
| P0-12 | Developer review of designs and motion for feasibility and performance | FA | P0-11 | Review notes, agreed changes | Not started |
| P0-13 | Write ADRs 1–8 (architecture plan §18) | PH | P0-02 | `docs/adr/*` | Not started |
| P0-14 | Contentful plan check on the official pricing page: users (D8), locales (D1), environments, content types, API calls, bandwidth, commercial use; choose plan within budget (D5) | PH | P0-02 | Plan decision | Not started |

### Phase 1 — Foundation (W2–W3)

| ID | Task | Owner | Depends on | Output | Status |
|---|---|---|---|---|---|
| P1-01 | Create repository: branch protection, PR template, CODEOWNERS | PH | P0-03 | Repository | Not started |
| P1-02 | Scaffold Next.js 16.3.x (TypeScript strict, App Router, `src/`, Tailwind v4). Scaffold in place (`create-next-app` tolerates `docs/`; remove other stray root files first) and replace the generated root `README.md` with a pointer to `docs/README.md`. **30 Sep:** scaffolded (Next.js 16.3.7, TS strict, App Router, Tailwind v4, ESLint), moved into `src/`, root README replaced | FA | P1-01 | Running app | Done |
| P1-03 | Tooling (npm): ESLint (flat config), Prettier, Husky + lint-staged, commitlint. ESLint flat config came with the scaffold | FA | P1-02 | Pre-commit checks | Not started |
| P1-04 | `env.ts` validation and `.env.example`. **30 Sep:** done for the Contentful variables; others are added as each service is connected | FB | P1-02 | Validated env vars | Done |
| P1-05 | Vercel project: preview protection, env vars per environment, noindex outside production | PH | P1-02 | Preview URL per PR | Not started |
| P1-06 | Contentful space, API keys (delivery, preview), GraphQL client (`src/contentful/client.ts`). **1 Oct:** done; both tokens tested. Migration tooling, the `dev` environment, the management token, and type generation moved to P3-01, with the content types | FB | P1-02, P0-14 | Contentful connected | Done |
| P1-07 | Sentry for client and server errors | FB | P1-05 | Error reporting | Not started |
| P1-08 | CI: typecheck, lint, unit tests, build | FA | P1-03 | Required checks | Not started |
| P1-09 | Playwright + axe + Lighthouse CI against the preview URL; record the performance baseline | FA | P1-05, P1-08 | Budgets in CI | Not started |
| P1-10 | Skeleton routes per the folder structure (architecture plan §7) with placeholder content. **30 Sep:** all public routes, header/footer, 404/error pages, sitemap/robots/manifest, API stubs | FA + FB | P1-02 | Navigable skeleton | Done |
| P1-11 | Renovate; pin `next`, `react`, `react-dom` versions (already pinned exactly by the scaffold) | PH | P1-01 | Dependency updates | Not started |
| P1-12 | Fill in the `docs/README.md` "Getting started" section. **1 Oct:** setup, environment variables, project layout, content sources, Tailwind v4 written; tooling to add after P1-03 | FA | P1-10 | Setup guide | In progress |

### Phase 2 — Design system (W3–W5)

| ID | Task | Owner | Depends on | Output | Status |
|---|---|---|---|---|---|
| P2-01 | Design tokens into Tailwind `@theme`: colour, type scale, spacing, radius, shadow | FA | P0-11 | `globals.css` tokens | Not started |
| P2-02 | Fonts via `next/font` (≤ 3 families, subset). **1 Oct:** Bricolage Grotesque, Inter, JetBrains Mono | FA | P2-01 | Font setup | Done |
| P2-03 | Theme shadcn primitives: Button, Input, Textarea, Select, Dialog, Sheet, Tabs, Accordion, Badge | FA | P2-01 | `components/ui` | Not started |
| P2-04 | Header, footer, mobile navigation, skip link | FA | P2-03 | `components/layout` | Not started |
| P2-05 | Motion primitives with reduced-motion support. **2 Oct:** done with GSAP — `Reveal` (with stagger), `Magnetic`, `SmoothScroll`, plus `CountUp` (no library) and CSS hero entrance | FA | P2-01 | `components/motion` | Done |
| P2-06 | Section blocks as static UI: Hero, LogoWall, Stats, CTA, Testimonials, CaseStudyGrid, FAQ, RichText. **3 Oct:** built while building the home page — Hero, Stats, Testimonials (carousel), CTA, FAQ (`Accordion`), Process timeline, service and industry tabs, `ProjectCard`, `PostCard`, `SectionHeading`, `FeatureItem`, `Eyebrow`, `Button`. Still to do: LogoWall, CaseStudyGrid, RichText | FA + FB | P2-03 | `components/sections` | In progress |
| P2-07 | Component gallery (development-only route or Storybook) | FA | P2-06 | Gallery | Not started |
| P2-08 | Design QA against Figma at 3 breakpoints; accessibility pass | DS + QA | P2-07 | Signed-off components (M4) | Not started |

### Phase 3 — Templates & features (W5–W9)

| ID | Task | Owner | Depends on | Output | Status |
|---|---|---|---|---|---|
| P3-01 | Contentful content types for case studies and blog as migration scripts (`caseStudy`, `post`, `category`, `person`, `client`, `testimonial`, `metric`, `seo`), done when those pages are built. Also: migration tooling, `dev` environment, management token (CI only), GraphQL type generation. **3 Oct:** blog half done — `0001-blog-model.cjs` (`category`, `person`, `seo`, `post`), `npm run contentful:migrate` (asks before applying), sample posts via `npm run contentful:seed-posts`; management token in `.env.local` for now. **8 Oct:** case-study half done — `0002-case-study-model.cjs` (`client`, `caseStudy`, `caseStudySection`, `caseStudyTechStack`, `techStackGroup`; sections instead of fixed fields, architecture plan §6); Gulbaan via `npm run contentful:seed-case-studies`. `0003-case-study-sections.cjs` (hero layout, `caseStudyFeatureGrid`, `caseStudyShowcase`) for the Terminal Gateway CRM design; `0004-case-study-hero-layers.cjs` (hero layers). **9 Oct:** `0005-case-study-app-sections.cjs` for the Cathy O’Bryan’s Books design (Light hero, `caseStudyItem`, `caseStudyCards`, `caseStudyGallery`, `testimonial`, `caseStudyTestimonials`, `caseStudyCallToAction`, facts, highlight box, tech stack tiles, five technologies). `metric` and the remaining planned fields come when a design uses them. **10 Oct:** `0006-case-study-card.cjs` (card highlight and card points, for the service pages' project cards). **15 Oct:** `0007-page-seo.cjs` (`pageSeo`, canonical URL on `seo`; P3-16); entries via `npm run contentful:seed-page-seo`. `0008-custom-schema.cjs` (custom JSON-LD on `pageSeo` and `seo`). Still to do: `dev` environment, CI runner, type generation | FB | P0-09 | Migrations | In progress |
| P3-02 | Typed GraphQL query layer with `'use cache'` + `cacheTag`. **3 Oct:** first query, `getLatestPosts()` (`src/contentful/queries/posts.ts`), using the fetch cache with tags for now (architecture plan §5); switch to `'use cache'` with the blog pages. **8 Oct:** `getCaseStudy()` and `getCaseStudies()` (`src/contentful/queries/case-studies.ts`), tags `caseStudy` and `caseStudy:<slug>` | FB | P3-01 | `contentful/queries` | In progress |
| P3-03 | `/api/revalidate` for Contentful publish/unpublish webhooks, verified with the signing secret | FB | P3-02 | Instant refresh on publish | Not started |
| P3-04 | Draft mode + Contentful Live Preview (preview URLs configured per content type) | FB | P3-02 | Editor preview | Not started |
| P3-05 | `next/image` for Contentful assets; Rich Text renderer; Mux video component. **8 Oct:** Contentful images through `next/image` (`images.ctfassets.net` for our space in `next.config.ts`); Rich Text renderer of our own (`src/contentful/rich-text.tsx`: paragraphs, marks, links, lists — `@contentful/rich-text-react-renderer` not installed). Still to do: Mux | FB + FA | P3-01 | Media and rich-text components | In progress |
| P3-06 | Home template (static content; featured case studies from Contentful). **1–2 Oct:** hero, stats, services, "Ideas Engineered Into Impact", testimonials, pinned "Our Process", "Industry-Specific Solutions", FAQ, "From the studio." (3 newest blog posts from Contentful), and closing CTA (line-by-line reveal, flowing gradient text, pulsing glows) sections built from Figma (services: Branding complete, other five categories "coming soon" until content arrives; featured project, testimonials, industry solutions, and FAQ answers 2–5 are placeholder data until real content arrives); more sections to come | FA | P2-06, P3-02 | Page | In progress |
| P3-07 | Services: listing + detail (static content in code). **10 Oct:** detail template built (`/services/[slug]`, content in `src/content/service-pages.ts`); first page Web Development, from `Service Detail.svg` (placeholder copy, issue I6); project cards from Contentful (case studies with the service ticked). **15 Oct:** `/services` overview built from `Service.svg` (content in `src/content/services-page.ts`; each category's description and photo in `services.ts`): the service hero, "We're Featured In" (press logos extracted from the design as SVGs, confirmed; the About page's awards), the six categories in alternating rows (pills link to each service's page, the arrow to the first one), "Take a Look at What We Can Do For You" with the capability pills gliding sideways (still for reduced motion), About's "Get In Touch", and the closing call to action. Issue I10. **16 Oct:** `/services/branding` built from `Service Branding.svg` (its own template; content in `src/content/branding-page.ts`): hero with clients' floating logos, the intro and two pictures, "Branding Services" (six cards from the mega menu's services; the card under the pointer fills with the gradient), the home "Industry-Specific Solutions" on cream, the projects row on navy (Gulbaan ticked "branding" in Contentful), and the closing call to action; the Services page's Branding arrow now leads there. Issue I11. **17 Oct:** service pages moved under their core service, `/services/<core>/<service>` (route `services/[core]/[service]`; the old `/services/web-development` redirects). **17 Oct (later):** every other core service and service page built as a dummy page (issue I12): core pages use the Branding template (`services/[core]`, content in `src/content/core-pages.ts`), services the Web Development one. **22 Oct:** the 5 dummy core pages got their own heroes (`CoreHero`: navy split hero with an illustration drawn in code per service; Branding keeps its own). Still to do: real content and designs for the 40 dummy pages | FA | P2-06 | Pages | In progress |
| P3-08 | Industries: listing + detail (static content; related case studies from Contentful) | FA | P2-06, P3-02 | Pages | Not started |
| P3-09 | Case studies listing with client-side filters and URL state. **17 Oct:** `/case-studies` ("Our Work") built without a design (project head request), following the Insights page: navy hero, service pills (only services that have case studies; `?service=branding` in the address, applied on load, replaced on click; the full list is in the HTML), the first case study as a wide card (ticked "Featured" in Contentful first, then the newest), the rest in a two-column grid, then the closing call to action. Text in `src/content/case-studies-page.ts`. Still to do: industry and region filters once case studies have those fields filled | FA | P3-02 | Page | In progress |
| P3-10 | Case study detail + generated OG image. **8 Oct:** template built at `/case-studies/[slug]` — hero, text + image and tech-stack sections from Contentful (alternating navy / white), metadata with SEO fallbacks; the white header on case-study pages. First case study: Gulbaan (placeholder copy, issue I2). Second: Terminal Gateway CRM, with a Centered hero, numbered features, and a wide image (placeholder copy, issue I3); its seven hero screenshots float (hero layers, `0004`). **9 Oct:** third, Cathy O’Bryan’s Books, with a Light hero, cards in four layouts, app screens, a testimonial (approved and published 9 Oct), and a call-to-action panel (`0005`; copied content replaced, issue I4). Still to do: OG image | FA | P3-02 | Page | In progress |
| P3-11 | Blog: listing, category, article + OG image. **15 Oct:** built in the site's style (no blog design): `/blog` ("Insights": hero, category pills, newest post featured, grid of 9, page numbers at `/blog/page/<n>`), `/blog/category/<slug>` (same, one category; paging too), and `/blog/<slug>` (header with breadcrumb, author, date, reading time, share buttons, cover; on white the text with every Rich Text block the post allows, a table of contents pinned beside it on desktop, share buttons, author card; related posts). Unknown posts and categories are 404s. BlogPosting schema; posts and categories in the sitemap. Share image: the SEO entry's, else the cover (no generated image) | FA | P3-02 | Pages | In progress |
| P3-12 | Legal pages as static routes: `/privacy-policy`, `/cookie-policy`, `/terms`. **3 Oct:** placeholder `/privacy-policy` and `/terms` pages added (linked from the footer); legal text and `/cookie-policy` still needed | FA | P2-04, C-09 | Pages | In progress |
| P3-13 | About and Contact pages (static content); SVG office map. **9 Oct:** About page built from `About.svg` (copy in `src/content/about.ts`; placeholder text, issue I5); the office map is a picture from the design that opens Google Maps, not an SVG map. **10 Oct:** awards row; "Who Are We" value cards (four) slide sideways while the section is pinned; the team row is an auto-slider with all 17 people from the live site. **15 Oct:** "Get in touch" (About, service pages, Services) rebuilt as the design's card: the form on white, and on the gradient the map (the design's plain map, `contact-map.webp`, with a label; opens Google Maps), address, phone, and email; social icons appear once `siteConfig.socialProfiles` has links. **22 Oct:** Contact page built without a design (site's own style): hero, the "Get in touch" card with a fuller form (pre-filled from the cost estimators; opens the visitor's email app until P3-14), "What Happens Next", and the FAQ; text in `src/content/contact-page.ts` (issue I14) | FA | P2-06 | Pages | Done |
| P3-14 | Contact form: Server Action, Zod, React Hook Form, Turnstile, honeypot; Vercel Firewall rate-limit rule. **15 Oct:** until this is done, the "Get in touch" form (`ContactForm`: name, email, message) opens the visitor's email app with the message written out, addressed to the studio; switch it to the Server Action here | FB | P3-13 | Secure form | Not started |
| P3-15 | Lead delivery: Resend email to the shared sales inbox (Reply-To = visitor) + visitor auto-reply; error with fallback address if sending fails; Sentry alerts without personal data; CRM integration only if D3 says so | FB | P3-14 | Lead pipeline | Not started |
| P3-16 | Metadata, canonical, JSON-LD per template; `sitemap.ts`; `robots.ts`. **10 Oct:** `sitemap.ts` lists only the main menu pages and contact; the service pages (`/services/web-development`) and case studies are added here. **15 Oct:** every page has a title, description, canonical, Open Graph and Twitter tags (`pageMetadata()` in `src/lib/seo.ts`); site address `https://inkpixelstudios.com` (`NEXT_PUBLIC_SITE_URL` overrides it); noindex outside production; JSON-LD per §8 (`Organization` + `WebSite` on every page, `BreadcrumbList` on inner pages, `Service`, `Article` for case studies, `ProfessionalService` on About and Contact), typed with `schema-dts`; site share image `src/app/opengraph-image.tsx` (case studies use their Contentful image); sitemap with the service and legal pages and every case study with its last-published date. Then, by manager decision, meta title, description, and canonical are **edited in Contentful** for every page: a Page SEO entry per page whose content is in code (migration `0007`, 11 entries seeded with `npm run contentful:seed-page-seo`), each case study's and post's own SEO entry (now with a canonical URL); the text in code is the fallback, also when Contentful is down. Blog posts' metadata comes from Contentful. The SEO team can also paste each page's own JSON-LD (Page SEO / SEO "Custom schema", migration `0008`); it replaces the automatic schema of the same `@type`. Still to do: `BlogPosting` with the blog template (P3-11), industry pages with P3-08, social profiles (`siteConfig.socialProfiles`), real descriptions (issue I9), instant updates via the publish webhook (P3-03; until then within the hour) | FB | P3-06 → P3-13 | SEO plumbing | In progress |
| P3-17 | 404 and error pages | FA | P2-04 | Pages | Not started |
| P3-18 | Consent banner; GTM/GA4 via `@next/third-parties`; Consent Mode v2; Speed Insights | FB | P0-03 | Analytics | Not started |
| P3-19 | Contentful editor setup: roles (editors cannot change the model), field help text, Live Preview, written editor guide | FB | P3-01 | Editor guide | Not started |
| P3-20 | Tests: unit (filters, validation), E2E (form, navigation, redirects) | QA + FA + FB | P3-09, P3-14 | Test suites | Not started |
| P3-21 | Editor acceptance test: publish a case study end-to-end, live within 60 s (M5) | MK + QA | P3-03, P3-19 | Pass / fail report | Not started |

### Content workstream (W1–W10, parallel)

| ID | Task | Owner | Depends on | Output | Status |
|---|---|---|---|---|---|
| C-01 | Shortlist 10–15 case studies | CS + PH | P0-01 | Shortlist | Not started |
| C-02 | Client approval tracker; send approval requests for logos, names, and work | CS | C-01 | Tracker with dates and approvers | Not started |
| C-03 | Brief per case study: challenge, solution, results, metrics, quotes | CS | C-01 | Briefs | Not started |
| C-04 | Write 6–8 case studies for launch (rest after launch) | CS | C-03 | Final copy | Not started |
| C-05 | Service and industry copy, aligned with the keyword map; handed to developers (static pages). **10 Oct:** the Web Development page is built and waits for its real copy (issue I6) | CS | P0-06 | Final copy | Not started |
| C-06 | Home and About copy; leadership bios and photos; handed to developers (static pages) | CS + DS | P0-07 | Final copy and photos | Not started |
| C-07 | Photography and video: produce or source | DS | C-01 | Media library | Not started |
| C-08 | Migrate existing blog posts or write 3–5 launch articles | CS | P0-05 | Articles | Not started |
| C-09 | Legal pages: privacy, cookies, terms — with legal review | PH | P3-18 | Approved legal copy | Not started |
| C-10 | Editor training session | FB + MK | P3-19 | Trained editors | Not started |
| C-11 | Enter launch case studies and blog posts into Contentful; confirm static-page copy is merged in code (M6) | CS | C-04 → C-09, C-10 | Content live | Not started |
| C-12 | Translations (only if D1 requires) | CS | C-11 | Translated content | Not started |

### Phase 4 — Hardening & QA (W9–W11)

| ID | Task | Owner | Depends on | Output | Status |
|---|---|---|---|---|---|
| P4-01 | Content QA: typos, links, images, alt text | CS + QA | C-11 | Fixed content | Not started |
| P4-02 | Cross-browser and device testing: Chrome, Safari (iOS and macOS), Firefox, Edge, Android | QA | M5 | Test report | Not started |
| P4-03 | WCAG 2.2 AA audit (keyboard, screen reader, contrast) and fixes | QA + FA | M5 | Audit report | Not started |
| P4-04 | Performance tuning with real content; all budgets green | FA | C-11 | Lighthouse report | Not started |
| P4-05 | Security headers; CSP in report-only mode, then enforced | FB + PH | M5 | Headers live | Not started |
| P4-06 | Security scan (OWASP ZAP baseline) and form abuse tests | QA + PH | P4-05 | Scan report | Not started |
| P4-07 | Implement redirect map; crawl old URLs against the preview deployment | CS + FB | P0-05 | One-hop 301s verified | Not started |
| P4-08 | Verify analytics and consent: events, conversions, consent states | MK + FB | P3-18 | Verified tracking | Not started |
| P4-09 | Schedule backups; test rollback | PH | M5 | Backup + rollback proven | Not started |
| P4-10 | Go / no-go review (M7) | PH + MK + management | P4-01 → P4-09 | Decision | Not started |

### Phase 5 — Launch (W12)

Follow the runbook in §8.

### Phase 6 — Hypercare & growth (W13 onward)

| ID | Task | Owner | Depends on | Output | Status |
|---|---|---|---|---|---|
| P6-01 | Daily checks for 2 weeks: Sentry, Search Console, leads, uptime | PH + FB | M8 | Daily notes | Not started |
| P6-02 | Triage the fix-forward backlog | PH | M8 | Prioritised backlog | Not started |
| P6-03 | Review field Core Web Vitals at 28 days | FA | M8 | Report | Not started |
| P6-04 | Monthly SEO report: indexing, rankings, traffic, leads | CS | M8 | Report | Not started |
| P6-05 | Post-launch roadmap: remaining case studies, conversion work, PostHog, i18n if planned | PH + MK | M9 | Roadmap | Not started |
| P6-06 | Project retrospective | PH | M9 | Lessons learned | Not started |

---

## 6. Definition of Done

A template or feature is **Done** only when all of these hold:

- [ ] Matches Figma at mobile, tablet, and desktop; designer approved
- [ ] Fully keyboard-accessible; zero critical axe issues; respects reduced motion
- [ ] Title, description, canonical, and JSON-LD present and correct
- [ ] Lighthouse budgets pass on the preview URL
- [ ] Case-study and blog content comes from Contentful; static-page copy sits in one place per page in code, not scattered through components
- [ ] Unit tests for logic; E2E test for user flows
- [ ] Code reviewed; CI green
- [ ] Forms work without JavaScript

---

## 7. Ways of working

### Cadence

| Meeting | When | Who | Output |
|---|---|---|---|
| Stand-up | Daily, 15 min | Delivery team | Blockers raised |
| Planning | Monday | Delivery team + PH | Week's tasks assigned |
| Status report | Friday | PH → stakeholders | Written report (template below) |
| Demo | Every 2 weeks | Team → MK + stakeholders | Feedback on the preview URL |
| Retrospective | Every 2 weeks | Delivery team | 1–3 improvements |

### Weekly status report template

```
Week N — <date>        Overall: Green / Amber / Red
Done this week:        <task IDs + one line each>
Next week:             <task IDs>
Milestones:            <next milestone, on track or not>
Risks / blockers:      <ID, owner, action needed, from whom>
Decisions needed:      <question, needed by date>
```

### Tracking

- One issue per task ID on a GitHub Projects (or Jira) board, with columns: Backlog → This week → In progress → In review → Done.
- Blocked for more than 2 days → escalate to PH. Anything that threatens a milestone date → PH informs stakeholders the same day.

### Change requests

1. Requester writes the change in one paragraph: what and why.
2. PH assesses the impact on scope, timeline, and cost within 2 working days.
3. Decision: **include before launch** (with the date impact stated) or **post-launch backlog**.
4. The decision is logged in the README Project log.

---

## 8. Launch runbook

### T − 7 days

- [ ] Content freeze (fixes only after this point)
- [ ] Final redirect crawl against the preview deployment passes
- [ ] Go / no-go meeting held (M7)

### T − 2 days

- [ ] Lower DNS TTL to 300 s
- [ ] Old site kept available for rollback (if D2)
- [ ] On-call person named for launch day and the following 48 hours

### T − 1 day

- [ ] Final production build from `main` passes CI
- [ ] Smoke test on the Vercel production URL (before the domain switch)
- [ ] Backup taken (Contentful space export)

### T − 0 (low-traffic window)

1. Assign the domain in Vercel and update DNS.
2. Confirm HTTPS certificate is issued and HSTS is set.
3. Smoke test: home, every template, Contentful Live Preview, and a real contact submission that reaches the sales inbox (and the CRM, if adopted).
4. Run the old-URL list: every URL returns a 301 to a 200 in one hop.
5. Check `robots.txt` and the sitemap: production is indexable.
6. Submit the sitemap to Google Search Console and Bing Webmaster Tools.
7. Verify analytics in real time, in both consent states.
8. Announce launch internally.

### Rollback

- **Application problem:** Vercel instant rollback to the previous deployment.
- **Domain or DNS problem:** revert DNS to the old site (low TTL makes this fast).
- **Decision owner:** PH. Roll back if the site is down, if contact submissions fail, or if redirects are broken at scale.

### T + 1 and T + 7

- [ ] Sentry, uptime, and lead counts checked
- [ ] Search Console coverage and crawl errors checked
- [ ] Rankings for top pages compared against the pre-launch baseline

---

## 9. Risk and issue log

Live register. Background on each risk is in [architecture plan §17](architecture-plan.md#17-risks).

| ID | Type | Description | Owner | Action | Status |
|---|---|---|---|---|---|
| R1 | Risk | Case-study content and client approvals arrive late | CS | Start in W1; launch with the 6–8 strongest | Open |
| R2 | Risk | Heavy animation and video hurt Core Web Vitals | FA | Budgets in CI from P1-09; dev review of motion in P0-12 | Open |
| R3 | Risk | i18n decided late | PH | Close D1 by M1 | Open |
| R4 | Risk | Rankings lost during migration | CS | Redirect map + crawl (P4-07) | Open |
| R5 | Risk | Scope creep | PH | Change-request process (§7) | Open |
| R6 | Risk | Framework security vulnerability | PH | Renovate + 48-hour critical-patch policy | Open |
| R7 | Risk | Contentful plan limits or cost (next tier ≈ $300/month) block editors or surprise the budget | PH | Plan check P0-14; monitor usage monthly | Open |
| R8 | Risk | Lead emails land in spam or get buried in an inbox | PH | Shared inbox; SPF/DKIM/DMARC; weekly check; revisit a CRM (D3) as volume grows | Open |
| R9 | Risk | Static-page copy changes need a developer, slowing marketing updates | PH | Copy in one place per page; move a page type into Contentful if edits become frequent | Open |
| I1 | Issue | Header menu is too tight at ~1024px wide; "Our Work" wraps onto two lines | FA | Deferred by PH (1 Oct). Options: show the menu button below 1280px, or tighten the menu between 1024 and 1280px | Open |
| I2 | Issue | Gulbaan case study has placeholder content: 6 of 8 sections are lorem ipsum, "The Idea Behind Gulbaan" describes another project (Al Hussaini Trading Company), the BigCommerce and Node.js logos are hand-drawn approximations, and its industry (`ecommerce`) and service (`development`) are unconfirmed | CS | Write the real copy in Contentful; replace the logos in `src/assets/images/technologies/` with official SVGs | Open |
| I3 | Issue | Terminal Gateway CRM case study has placeholder content. Its design's text was copied from another agency's case study (Tekrevol's "Project Impact / S.E.L.F app", incl. "480M downloads"), so the site uses stand-ins: renamed titles, six features read from the product screens, lorem ipsum paragraphs, and a neutral closing section. Industries and services are empty. 22 Oct: client logo added and approved (shown on the service pages' project cards), but the file is small (249×40 PNG) and looks soft on large screens | CS | Write the real copy in Contentful; confirm the features, industries, and services; ask the designer to remove the copied text from the design | Open |
| I4 | Issue | Cathy O’Bryan’s Books case study: parts of the design's copy came from other projects and were replaced or left out — the hero eyebrow "Swipe, Watch, Order" (now "Read · Explore · Discover"), "Web Interface for Restaurant Partners" (removed from Services Provided), the "$1.2M in revenue" result (now neutral text), a second testimonial ("Sophia Clark, DineSmart", left out), and the closing panel, which named Tekrevol and "50+ food delivery platforms" (rewritten). The "Explore The App" button has no link yet, so it is hidden. Industry not set (none of the code's industries fits). 22 Oct: client logo added and approved (shown on the service pages' project cards); the file is a small PNG (402×65) | CS | Confirm the stand-ins or supply real copy and a real result; add the app's store link to the hero button in Contentful; ask the designer to remove the copied text from the design | Open |
| I5 | Issue | About page placeholders: "What Drives Us Forward", the mission, vision, and values, and Monis Bari's bio are lorem ipsum. (The team intro, a stand-in until 10 Oct, is now the live site's line.) The awards row was added on 10 Oct, once the project head confirmed the awards are the studio's own. 15 Oct: the phone number (+1 818-422-9253) is now shown and in the structured data, and "Get in touch" has a form (opens the visitor's email app until P3-14) | CS + PH | Write the real copy in `src/content/about.ts`; the form sends from the site with P3-14 | Open |
| I6 | Issue | Web Development service page placeholders: most text is the design's lorem ipsum (intro, offerings, service types); the hero title, meta description, and estimator questions 2–5 are stand-ins (the design's hero repeated the About page's title, and its button said "Explore The App"); the workflow intro ("Join the ranks of the 100s of companies…") may be copied from another agency's site; the stats strip uses the design's numbers (500+ projects; home and About say 100+). Gulbaan's project card has no highlight or points yet. The consultation and contact forms wait for P3-14 | CS + PH | Write the real copy in `src/content/service-pages.ts`; confirm the estimator questions and the stats; fill in the card highlight and points in Contentful (only true, approved numbers); tick **Development** on other web case studies | Open |
| I7 | Issue | Services list (home "Building The Future of Digital Products" section and the header's Services menu): the descriptions of the 30 Development, Marketing, Software, Applications, and AI Automation services are developer-written stand-ins, and their icons were drawn in-house (`src/assets/images/icons/<category>/`), simpler than the designer's Branding icons. Each service links to its own page, `/services/<core>/<service>`; only Website Development exists | CS + DS | Write the real descriptions in `src/content/services.ts`; designer to supply icons in the Branding style; build the service pages (P3-07) | Open |
| I8 | Issue | Home testimonials ("What Our Clients Say About Us"): the first testimonial's video is stock footage standing in for a client video (Contentful asset `home-testimonial-video`, 21 s, portrait), with a still from it as the photo; its text and results are the same placeholders as the other five, which have the design's stock photo and no video. None of the six is a real client | CS + MK | Replace the video file in that Contentful asset with a real client's video (written consent on file), and each testimonial's photo, text, and results in `src/content/home.ts` | Open |
| I9 | Issue | Search descriptions are developer-written stand-ins (≤ 160 characters): the site default and home page (`siteConfig.description`, home title), Services, Industries, Technologies, Case studies, Blog, Contact, Privacy policy, and Terms. The studio has no social profiles in the structured data yet | CS | Write the real meta titles and descriptions in Contentful (Page SEO entries; the same text is the fallback in each page's code and `src/lib/site.ts`); add the profile links to `siteConfig.socialProfiles` | Open |
| I10 | Issue | Services overview (`Service.svg`): the hero button is a stand-in, "Explore Our Work" (the design's says "Explore The App", as on the Web Development page); the design's "AI Automation" row repeated Development's services, so the page uses the real AI Automation list; its "Get in touch" panel had placeholder details (lorem ipsum, an NYC address, a dummy phone and email), so the page uses the About page's "Get In Touch" instead. The "Featured In" logos (Apple, Inc., CMSWire, Top Software Companies, YEC, GoodFirms) were confirmed as the studio's own coverage on 15 Oct; keep proof on file | CS + PH | Confirm the hero copy and button; keep the coverage links on file | Open |
| I11 | Issue | Branding page (`Service Branding.svg`): the intro paragraph is the design's lorem ipsum; the hero line ("Envisioning a realm…") and the "Branding Services" line (about websites) are the design's own and need real copy. Fixed from the design: every service card said "Social Media Branding" (the page uses the six services) and the projects title said "Web Development Projects" (now "Branding Projects"). Gulbaan is the only case study ticked "branding" so far | CS + PH | Write the intro and the two lines in `src/content/branding-page.ts`; tick "branding" on other branding case studies in Contentful | Open |
| I12 | Issue | Dummy service pages (project head request, 17 Oct): 5 core pages (Development, Marketing, Software, Applications, AI Automation) and 35 service pages exist only as dummies made from `src/content/services.ts`: stand-in hero lines and titles, lorem ipsum, other pages' photos (category photos, the Branding office photo, the Web Development estimator photo), Web Development's workflow, stats, and type icons, generic estimator questions. They are indexed and in the sitemap (project head decision). 22 Oct: the 5 core pages no longer reuse Branding's hero (office photo, Branding clients' logos): each has its own (`CoreHero`, an illustration drawn in code; stand-in hero lines with an accent word); the rest of each core page is still dummy | CS + DS + PH | Write each page's content (core: `src/content/core-pages.ts`; service: its own entry in `src/content/service-pages.ts`, which replaces its dummy); photos and designs per page | Open |
| I13 | Issue | Header Technologies menu (22 Oct): its 35 technologies in six groups are a developer-chosen starting list of common technologies, not confirmed as the studio's stack | PH | Update the groups and technologies in `src/content/technology-menu.ts` (logos in `src/assets/images/technologies/menu/`) | Open |
| I14 | Issue | Contact page (22 Oct, no design): the budget ranges (Under $5,000 … More than $50,000) and the "What Happens Next" steps (incl. "a 30-minute call") are developer-written stand-ins; they read as promises and prices to clients. The meta description is a stand-in too (I9) | PH + CS | Confirm or rewrite them in `src/content/contact-page.ts` (or remove the budget field); a designer may want to design the page | Open |
| I15 | Issue | Privacy Policy and Terms and Conditions (22 Oct): the text is developer-written starting content for a studio like ours, not legal advice (e.g. no cookies or analytics today, Pakistan law and Karachi courts, replies to data requests within 30 days, children under 16) | PH + legal | Have it reviewed and rewritten in `src/content/legal.ts` before launch; set the "Last updated" dates; update the Privacy Policy when analytics or cookies are added | Open |
| I16 | Issue | Industry solutions (23 Oct): the six solutions per industry (e.g. Fintech: Digital Banking Apps, Payment Gateways, KYC & Onboarding …) are developer-written stand-ins, shown in the header Industries menu and in "Industry-Specific Solutions" (home and core service pages); they replaced the design’s placeholder (the Branding services under every industry) | PH | Confirm or rewrite them in `src/content/industries.ts` (six per industry keeps the grids even) | Open |

---

## 10. Execution log

Newest first.

| Date | Update |
|---|---|
| 23 Oct 2026 | Service heroes, batch 6 (AI Automation, 36 of 36): six scenes in `scenes/services/ai-automation/`; new `animate-scan` (globals.css) for the document scan line. Checked that every service slug in `services.ts` has a scene (36/36); `ServiceHero` now only on /services. Checked at 1440 and 390px, no console errors |
| 23 Oct 2026 | Service heroes, batch 5 (Applications, 30 of 36): six scenes in `scenes/services/applications/`, registered in `scenes/services/index.ts`. Checked at 1440 and 390px, no console errors |
| 23 Oct 2026 | Service heroes, batch 4 (Software, 24 of 36): six scenes in `scenes/services/software/`, registered in `scenes/services/index.ts`. Checked at 1440 and 390px, no console errors |
| 23 Oct 2026 | Service heroes, batch 3 (Marketing, 18 of 36): six scenes in `scenes/services/marketing/`, registered in `scenes/services/index.ts`. Checked at 1440 and 390px, no console errors |
| 23 Oct 2026 | Service heroes, batch 2 (Branding, 12 of 36): six scenes in `scenes/services/branding/`, registered in `scenes/services/index.ts`. Note for later scenes: an SVG gradient on a perfectly straight line needs `gradientUnits="userSpaceOnUse"` (a zero-height box hides it). Checked at 1440 and 390px |
| 23 Oct 2026 | Service heroes, batch 1 (Development, 6 of 36): `CoreHero` split into a generic `SceneHero` (eyebrow, accented title, line, page button + Our Work filtered by core, illustration; `compact` title for services); service scenes in `src/components/sections/core/scenes/services/<core>/`, registered by slug in `scenes/services/index.ts`; the service page uses `SceneHero` when a scene exists, else `ServiceHero`. New shared scene parts: `Phone` (moved from ApplicationsScene), `Browser`, `Toast`. Checked at 1440 and 390px (no overflow, no console errors) |
| 23 Oct 2026 | Footer: bottom padding `clamp(3.5rem,8.3vw,10rem)` → `clamp(1.5rem,1.75vw,2.125rem)` (same as above the copyright row) |
| 23 Oct 2026 | Header Industries and Technologies menus now use the Services menu’s tab layout (new shared `MenuTabs`: numbered tabs on the left, chosen by hover with a short delay, click/tap, or the arrow keys; the chosen tab’s content on the right; every panel rendered in one grid cell so the height stays steady and the icons are loaded before a tab is chosen). Technologies: group line + logo cards, 3 per row (group descriptions added to `technology-menu.ts`). Industries: icon and line + six solution cards, 2 per row. Each industry got its own six solutions with minimal Lucide icons (`src/assets/images/icons/solutions/`), also used by "Industry-Specific Solutions"; issue I16. Checked at 1100, 1440 and 1920px |
| 23 Oct 2026 | Footer: copyright row and legal links `#7d716c` → `#b9aea9` (readable on the navy), divider `border-white/6` → `/10` |
| 22 Oct 2026 | Service icons: the previous set restored (from commit 7c39b76) to `src/assets/images/icons/showcase/` and used by the home `ServicesShowcase` tabs and the core pages’ `BrandingServices` cards through `withShowcaseIcons` (`src/content/showcase-icons.ts`); menus and Contact chips keep the minimal Lucide set. Checked the home section, /services/development, and the mega menu at 1440px |
| 22 Oct 2026 | Service icons: the 36 icons in `src/assets/images/icons/<category>/` replaced with minimal Lucide line icons (lucide-static 0.460.0, 24px grid, white, stroke 1.5; Branding PNGs → SVGs, imports in `services.ts` updated; license notice added). Checked the mega menu, Branding cards, and Contact chips at 1440px |
| 22 Oct 2026 | Legal pages built: `/privacy-policy` (9 sections) and `/terms` (10 sections) from `src/content/legal.ts` through a shared `LegalPage` (navy hero, numbered sections on white, the blog’s `TableOfContents` with a new `label` prop: "On this page"; the studio’s contact details from `siteConfig`). Footer links renamed "Privacy Policy" and "Terms and Conditions"; the two Page SEO entries in Contentful renamed to match (and `contentful-seed-page-seo.mjs`). Placeholder text, issue I15. Checked at 1440 and 390px |
| 22 Oct 2026 | Fixed: a new page could open at its footer (shorter page after scrolling down) or visibly scroll up. `SmoothScroll` resets to the top on every pathname change (ScrollSmoother `scrollTop(0)`, or `window.scrollTo` without it), then `ScrollTrigger.clearScrollMemory()` + `refresh()` and resets again. Not on query or hash changes. Verified on desktop (motion and reduced motion) and phone |
| 22 Oct 2026 | "Get in touch" (VisitUs): office map enlarged to 3:2 (`OfficeMap` no longer fixes its shape; VisitUs passes `aspect-[3/2]`, the Contact page keeps `aspect-[516/214]`). Checked at 1920, 1366 and 390px |
| 22 Oct 2026 | Projects slider (core and service pages): Terminal Gateway and Cathy O’Bryan show new card images (device mockups over the brand shape, from the project head). Migration `0009-case-study-card-image.cjs` run on `master` adds an optional Card image to case studies (the card falls back to the hero image); seed script uploads and sets both. Production build and browser check at 1920, 1366 and 390px, no console errors |
| 22 Oct 2026 | Footer: the Sitemap, Services and Contact headings are now light (`text-light`) instead of dim grey, and slightly larger (13–15px), so they are readable on the navy |
| 22 Oct 2026 | Home "Ideas Engineered Into Impact": the placeholder Pak Armoring card removed (and its photo); the stack shows only the case studies from Contentful, and hides its cards if Contentful is down. Checked at 1920px and phone width |
| 22 Oct 2026 | Header: "Industries" became a mega menu like Technologies (no longer a link): the five industries as cards, display only; tap to expand in the phone menu. Shared `MegaMenu` frame and phone `ExpandableItem` for both menus. Checked at 1920, 1366, 1100px and phone width; issue I1 (menu tight at ~1024–1280px) slightly tighter |
| 22 Oct 2026 | Home testimonials carousel: drag or swipe the photo card (and swipe the quote on touch screens) to change slide; the card follows the pointer, short drags spring back, vertical scrolling unaffected. Checked with mouse and touch on a production build |
| 22 Oct 2026 | About hero: looping background video (red drop forming the Ink Pixel drop) instead of the photo; file in `src/assets/videos/`, imported for its URL through a new `*.mp4` asset rule in `next.config.ts`; poster frame and still for reduced motion. Checked at 1920, 1366, and 390px |
| 22 Oct 2026 | Float animation fixed (the committed timing `2npm s` was invalid, so no hero floated): Terminal Gateway's hero screens now float at 2 s each way (`animate-float-fast`, start times up to 0.65 s apart), the Branding hero's logos at 4 s. Checked in a production build (no cracks between layers) |
| 22 Oct 2026 | Core service pages: Development, Marketing, Software, Applications, and AI Automation got their own heroes (`CoreHero`, project head request) instead of Branding's: a navy split hero (pill, title with an accent word, line, "Schedule a Free Call" and "See Our Work" → Our Work filtered to the service) beside an illustration drawn in code (`src/components/sections/core/scenes/`): a code editor and the site it builds; a campaign dashboard and a social post; a core platform joined to CRM, ERP, POS, and Inventory; two app phones; an AI chat beside a workflow. Gentle CSS motion, still for reduced motion; no figures in the illustrations. Branding unchanged. Issue I12 updated. Checked on a production build at 1920, 1366, and 390px, with and without reduced motion |
| 22 Oct 2026 | Contact form made friendlier (`/contact` only): service and budget chips instead of dropdowns, boxed fields with inline errors, the estimator answers in a removable summary box, a confirmation panel with "Copy message" after Submit, a wider form side. Shared `ContactDetails` (map, address, phone, email, social) used by "Get in touch" and the Contact page; "Get in touch" unchanged elsewhere. Checked at 1920, 1366, and 390px |
| 22 Oct 2026 | Contact page built (P3-13 → Done): hero, "Get in touch" card with a fuller form (service and budget dropdowns; pre-filled from the service pages' cost estimators; opens the visitor's email app until P3-14), "What Happens Next", FAQ. Issue I14 logged. Checked on a production build at 1920px and phone width, including the estimator hand-off and the email Submit writes |
| 22 Oct 2026 | Technologies menu: branded scroll bar (`scrollbar-brand` in `globals.css`: slim crimson → coral thumb, no track) for when the menu scrolls on shorter screens. Checked at 1100×700 and 1366×600 |
| 22 Oct 2026 | Header: "Technologies" became a mega menu (desktop: hover, click, Enter, or tap; phone: tap to expand) showing 35 technologies in six groups with their logos (`src/content/technology-menu.ts`, `TechnologiesMenu`); no longer a link to `/technologies`. Shared open/close logic moved into `useHoverMenu` (Services menu unchanged). Issue I13 logged. Checked on a production build at 1920, 1366, 1100px and phone width |
| 22 Oct 2026 | Terminal Gateway and Cathy O’Bryan client logos added (files from the project head, in `contentful/seed/`), uploaded to Contentful, and approved on their client entries by `npm run contentful:seed-case-studies`; they now show on the projects slider of every core and service page. Issues I3 and I4 updated (small files, soft on large screens). Checked on a production build at 1920px and phone width |
| 17 Oct 2026 | Case studies listing (`/case-studies`, P3-09 → In progress) built without a design: navy hero, service filter pills with the choice in the address, a wide first card and a two-column grid (image on a light panel, number, services, title, excerpt), closing call to action. The listing query now also loads each case study's services and "Featured". Checked on a production build at 1440px and phone width: filtering, `?service=` on load, unknown values ignored, cards open their case study, no console errors |
| 17 Oct 2026 | Service and core pages: the projects section is a slider (← → buttons, dots, swipe; no auto-slide; same card width, the next card peeking in) instead of the pinned sideways row, and shows every case study, those ticked for the page's service first (`getProjectCards`). Checked on a production build at 1440px and phone width, light and navy |
| 17 Oct 2026 | All 42 service pages exist (project head request; architecture plan v2.18): the 5 other core pages on the Branding template (`services/[core]`, `src/content/core-pages.ts`) and the 35 other service pages on the Web Development template, as dummy pages made from `src/content/services.ts` (issue I12), indexed and in the sitemap. Every core service now has its link in `services.ts`, so the mega menu shows "Explore …" for each and the Services page arrows lead to the core pages. Footer Services column: the 6 core pages (4 links matched no page). Checked on a production build: all 42 addresses load, sitemap lists them, breadcrumbs include the core, wrong-core and unknown addresses 404; screenshots of Marketing, Software, and SEO |
| 17 Oct 2026 | Service pages moved under their core service (project head decision; architecture plan §5, v2.17): `/services/<core>/<service>`, e.g. `/services/development/web-development` (route `services/[core]/[service]`; a service at another core's address is a 404). All 36 links in `src/content/services.ts` and the footer's Web Development link updated; the sitemap, canonical, and breadcrumb (Services › core, once it has a page › service) follow. The old `/services/web-development` redirects permanently (308). The Web Development Page SEO entry's path updated in Contentful and in `scripts/contentful-seed-page-seo.mjs`. Also: the mega menu's six core services link to their pages (`/services/<core>`; only Branding exists, the rest 404 until built); the Branding Services section fits one screen on desktop. Checked on a production build: addresses, redirect, 404s, sitemap, and every service link in a browser |
| 16 Oct 2026 | Services structure confirmed by the project head and written down (architecture plan §5, v2.16): 6 core services × 6 services, core pages at `/services/<core>`, service pages at `/services/<service>`; the list in `src/content/services.ts` already matches it |
| 16 Oct 2026 | Branding page (`/services/branding`) built from `Service Branding.svg` (updated design of 16 Oct): hero with floating client logos, intro, "Branding Services" cards, "Industry-Specific Solutions" (cream), projects on navy, closing call to action. 8 images exported from the design to `src/assets/images/services/branding/`. Gulbaan ticked "branding" in Contentful. `ServiceProjects` gained a navy version; the Services page's Branding arrow leads to the new page. Issue I11 logged. Checked on a production build in a browser at 1920, 1440, and phone width |
| 15 Oct 2026 | Blog pages built (P3-11 → In progress): listing, categories, articles, and paging, all from Contentful and built ahead of time. The 3 sample posts updated in Contentful by `scripts/contentful-seed-posts.mjs` (run on `master`): excerpts, cover photos from the Services design, a body with headings, lists, a quote, a divider, an image, and links, and a sample author ("Ink Pixel Studios Team", not a real person). All still PLACEHOLDER, to replace before launch. Checked on a production build in a browser, desktop and phone |
| 15 Oct 2026 | "Get in touch" (About, service pages, Services) rebuilt to the design: one card, a form (name, email, message; Submit opens the visitor's email app until P3-14) on white, and on the gradient a short line, the map with the studio's label (opens Google Maps), address, phone, and email; social icons show once links are added to `siteConfig.socialProfiles`. Phone number +1 818-422-9253 added to `siteConfig`, the page and the structured data (issue I5 updated). The framed map image replaced by the design's plain map. Checked in a browser on all three pages, desktop and phone |
| 15 Oct 2026 | Services overview page (`/services`) built from `Service.svg`: service hero, "We're Featured In" (six press logos from the design as SVGs, plus the About page's awards), the six service categories in alternating rows with their photos from the design (pills link to each service's page; the arrow to the category's first service), "Take a Look at What We Can Do For You" with three rows of capability pills gliding sideways (GSAP; stop under the pointer; still for reduced motion), About's "Get In Touch", and the closing call to action. P3-07 updated; issue I10 logged. Checked in the browser at 1440 and 390 wide, with and without reduced motion |
| 15 Oct 2026 | Custom schema per page (manager decision): migration `0008-custom-schema.cjs` run on `master` adds "Custom schema (JSON-LD)" to Page SEO and SEO; the SEO team pastes JSON-LD (without `<script>` tags), which replaces the automatic schema of the same `@type` on that page (`customSchema()`, `mergeSchema()` in `src/lib/seo.ts`, `<PageSchema>`); `Organization` and `WebSite` now come with each page's schema instead of the root layout. Checked on a production build: unchanged schema on all 15 pages with nothing pasted; with simulated pastes, same-type replacement, `@graph` and lists, junk items skipped and logged, and a pasted `</script>` stays escaped. Architecture plan → v2.15 |
| 15 Oct 2026 | Meta title, description, and canonical editable in Contentful for every page (manager decision): migration `0007-page-seo.cjs` run on `master` (new Page SEO type; canonical URL on SEO), 11 Page SEO entries created and published (`scripts/contentful-seed-page-seo.mjs`); pages read them by address (`src/contentful/queries/page-seo.ts`), case studies and posts read their own SEO entry; code text is the fallback. Checked on a production build: Contentful's text wins over the code's, the code's is used when Contentful is down, all 15 pages pass the audit. Architecture plan → v2.14 |
| 15 Oct 2026 | SEO on every page (P3-16 → In progress): titles, descriptions, canonicals, Open Graph and Twitter tags, noindex outside production, JSON-LD per architecture plan §8 (`src/lib/seo.ts`, `<JsonLd>`), a generated share image, and a fuller sitemap. Checked on a production build: all 15 pages have the right tags and structured data. Stand-in descriptions logged as issue I9. `schema-dts` added (dev dependency, types only) |
| 14 Oct 2026 | FAQ (home, About, service pages) rebuilt like "Our Process": numbered question cards on the red timeline (`FaqTimeline`). Desktop: the section locks while the scroll walks through the questions, opening each in turn; a click scrolls to that question's turn. Phones, tablets, and reduced motion: a normal list, click to open. Still `<details>`, so it works without JavaScript. The card, marker, and line styles moved to `src/components/ui/Timeline.tsx`, shared with Process (its HTML is unchanged) |
| 14 Oct 2026 | Home testimonials: first video testimonial, a stand-in (issue I8). The video is a Contentful asset (`home-testimonial-video`, uploaded and published; not in git), looked up by id (`src/contentful/queries/assets.ts`), so the file can be replaced in Contentful; its still is the card photo and poster. The player now fits portrait videos and only downloads the video once play is pressed (it had `autoPlay`) |
| 14 Oct 2026 | Home "Ideas Engineered Into Impact": the single featured card became a project stack, Pak Armoring first, then every published case study from Contentful, newest first. Desktop: the section locks while each card slides up over the last (`StackPin`), with a "01 / 04" counter and a progress bar; phones, tablets, and reduced motion: a sideways-scrolling row. `ProjectCard` takes Contentful images and no longer drifts with the scroll. Pak Armoring is still placeholder data, so its page does not exist yet |
| 14 Oct 2026 | Home "Building The Future of Digital Products": all six service categories filled in (36 services in `src/content/services.ts`, which the header's Services menu now reads too); the five new categories have stand-in descriptions and in-house icons (issue I7), so no tab shows "coming soon" any more |
| 14 Oct 2026 | Header: Services opens a mega menu on desktop (`ServicesMenu`) with six categories and 36 services (from `src/content/services.ts`); opens on hover, click, or Enter, closes with Esc; white panel on case studies. Each service links to its own page, `/services/<slug>`, so only Website Development works until the others are built (P3-07). Phone menu unchanged. The arrow makes the ~1024px menu (issue I1) slightly tighter |
| 10 Oct 2026 | First service page, Web Development (`/services/web-development`): template, static content, 29 icons and two photos from the design, cost estimator, project cards from Contentful (migration `0006` run). P3-07 → In progress; P3-01 updated; issue I6 logged. Architecture plan → v2.13 |
| 10 Oct 2026 | About: team row became an auto-slider (`TeamCarousel`; pause button removed by the project head) with all 17 people, photos, and the intro from the live site's About page. Issue I5 updated. Architecture plan → v2.12 |
| 10 Oct 2026 | About: fourth value card ("Long-Term Partnership", handshake icon) and narrower cards (about 2.75 on screen) |
| 10 Oct 2026 | About: "Who Are We" value cards became a pinned sideways slider (`HorizontalPin`) |
| 10 Oct 2026 | About: awards row added (confirmed as the studio's own); issue I5 updated |
| 9 Oct 2026 | About page built (static content, images from the design; home Industries in a cream version on it). P3-13 → In progress; issue I5 logged |
| 9 Oct 2026 | Cathy page re-checked after the last fixes; Cathy O’Bryan’s testimonial approved and published; CRM hero arch change (`size-full` removed) kept by the project head; docs brought up to date. P3-01 and P3-10 updated |
| 8–9 Oct 2026 | Third case study, Cathy O’Bryan’s Books: migration `0005` (Light hero, cards, screens, testimonials, call to action, facts, tech stack tiles), images exported from the design, added to the seed script; Contentful client ignores links to drafts. Issue I4 logged |
| 8 Oct 2026 | Terminal Gateway CRM hero animated: the flattened hero cut into seven floating layers; migration `0004` (hero layers), seed script updated. P3-10 updated |
| 8 Oct 2026 | Second case study, Terminal Gateway CRM: migration `0003` (Centered hero, numbered features, wide image), images exported from the design, added to the seed script. P3-01 and P3-10 updated; issue I3 logged |
| 8 Oct 2026 | Case studies on Contentful: migration `0002` (sections instead of fixed fields), `/case-studies/[slug]` template, Gulbaan seed script; the hard-coded Gulbaan page and its nine components removed; case-study layout made consistent with the home page; header back to a Server Component (phone-menu logo fixed). P3-01, P3-02 updated; P3-05 and P3-10 → In progress; issue I2 logged |
| 8 Oct 2026 | First Gulbaan case-study page built as a hard-coded page (not logged at the time); restructured the same day (row above) |
| 3 Oct 2026 | Privacy page renamed to `/privacy-policy` to match the planned routes. P2-06 and P3-12 → In progress. Design polish from the 2–3 Oct reviews logged (services tabs, Process timeline, Industries sizes, Insights phone margin, Contentful error messages) |
| 3 Oct 2026 | Closing CTA: magnetic glows (GSAP pointer pull, `PointerParallax`) added on top of the gradient-text animation |
| 3 Oct 2026 | Footer rebuilt from the design (site-wide). Placeholder `/privacy` and `/terms` pages added; legal text needed before launch. Service links point to `/services/<slug>` (P3-07) |
| 3 Oct 2026 | Closing CTA: animation changed to "gradient text + glows" (CSS); `LivingGlows` removed |
| 3 Oct 2026 | Closing CTA: water ripples replaced by drifting glows and a cursor light (`LivingGlows`) |
| 3 Oct 2026 | Home closing CTA built ("Let's build the next thing you ship.") with a cursor water-ripple effect (WebGL); P3-06 updated |
| 3 Oct 2026 | Home "From the studio." section built on Contentful: blog content model migration and sample-post seed script added and run on `master` (P3-01, P3-02 → In progress). Sample posts must be replaced before launch |
| 2 Oct 2026 | Home FAQ section built; P3-06 updated. Waiting on the studio to confirm FAQ answers 2–5 |
| 2 Oct 2026 | Home "Industry-Specific Solutions" section built; P3-06 updated. Waiting on each industry's own solutions and an Ecommerce icon |
| 2 Oct 2026 | Home "Our Process" section built (desktop: section locks while the timeline scrolls). P3-06 updated |
| 2 Oct 2026 | Home testimonials section built (carousel, video-ready). Waiting on real testimonials: client photos/videos, results, and written consent |
| 2 Oct 2026 | Home section 4 ("Ideas Engineered Into Impact") built; P3-06 updated. Featured project uses placeholder data until P3-01 |
| 2 Oct 2026 | GSAP adopted (smooth scroll, reveals, tab highlight, hovers); tab colour seam fixed. P2-05 → Done. JS size (~50–64 KB gz for GSAP) awaiting project-head sign-off against the +60 KB budget |
| 2 Oct 2026 | Home services section built (tabs, `src/content/services.ts`). P3-06 updated. Waiting on content and icons for five service categories |
| 1 Oct 2026 | Home stats section built with `CountUp` counters. P2-05 and P3-06 → In progress; issue I1 (header menu wraps at ~1024px) logged and deferred |
| 1 Oct 2026 | Contentful connected (P1-06 → Done). Content types are created with the case-study and blog pages (P3-01, which also takes migration tooling and type generation). P1-12 updated |
| 30 Sep 2026 | Content split: Contentful only for case studies and blog posts; other pages static. Updated assumptions, M5, M6, P3-01, P3-06 → P3-08, P3-12, P3-13, C-05, C-06, C-11, Definition of Done; added R9. npm and `src/` decided; P1-02, P1-04, P1-10 → Done |
| 30 Sep 2026 | Codebase scaffolded: Next.js 16.3.7, React 19.2.8, TypeScript strict, Tailwind CSS v4, ESLint 9. P1-02 and P1-12 → In progress; notes added to P1-03 and P1-11. Pending decisions: npm vs pnpm, `src/` folder |
| 30 Sep 2026 | Postgres dropped: no database. Leads emailed to a shared sales inbox; CRM optional; Upstash replaced by a Vercel Firewall rule. Updated assumptions, P0-03, P3-14, P3-15, runbook, R8 |
| 30 Sep 2026 | CMS switched to Contentful (Sanity dropped); SQL database removed from the plan. Updated P0-03, P0-09, P1-06, P3-01 → P3-05, P3-15, P3-19, runbook; added P0-14, R7, R8 |
| 30 Sep 2026 | Execution plan created. Kickoff date not yet set; all tasks `Not started` |
