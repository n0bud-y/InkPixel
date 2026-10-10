# Execution Plan — Brand Portfolio Platform

| | |
|---|---|
| **Status** | Draft — kickoff date _TBD_ |
| **Owner** | Project Head |
| **Last updated** | 10 Oct 2026 |
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
| P3-01 | Contentful content types for case studies and blog as migration scripts (`caseStudy`, `post`, `category`, `person`, `client`, `testimonial`, `metric`, `seo`), done when those pages are built. Also: migration tooling, `dev` environment, management token (CI only), GraphQL type generation. **3 Oct:** blog half done — `0001-blog-model.cjs` (`category`, `person`, `seo`, `post`), `npm run contentful:migrate` (asks before applying), sample posts via `npm run contentful:seed-posts`; management token in `.env.local` for now. **8 Oct:** case-study half done — `0002-case-study-model.cjs` (`client`, `caseStudy`, `caseStudySection`, `caseStudyTechStack`, `techStackGroup`; sections instead of fixed fields, architecture plan §6); Gulbaan via `npm run contentful:seed-case-studies`. `0003-case-study-sections.cjs` (hero layout, `caseStudyFeatureGrid`, `caseStudyShowcase`) for the Terminal Gateway CRM design; `0004-case-study-hero-layers.cjs` (hero layers). **9 Oct:** `0005-case-study-app-sections.cjs` for the Cathy O’Bryan’s Books design (Light hero, `caseStudyItem`, `caseStudyCards`, `caseStudyGallery`, `testimonial`, `caseStudyTestimonials`, `caseStudyCallToAction`, facts, highlight box, tech stack tiles, five technologies). `metric` and the remaining planned fields come when a design uses them. **10 Oct:** `0006-case-study-card.cjs` (card highlight and card points, for the service pages' project cards). Still to do: `dev` environment, CI runner, type generation | FB | P0-09 | Migrations | In progress |
| P3-02 | Typed GraphQL query layer with `'use cache'` + `cacheTag`. **3 Oct:** first query, `getLatestPosts()` (`src/contentful/queries/posts.ts`), using the fetch cache with tags for now (architecture plan §5); switch to `'use cache'` with the blog pages. **8 Oct:** `getCaseStudy()` and `getCaseStudies()` (`src/contentful/queries/case-studies.ts`), tags `caseStudy` and `caseStudy:<slug>` | FB | P3-01 | `contentful/queries` | In progress |
| P3-03 | `/api/revalidate` for Contentful publish/unpublish webhooks, verified with the signing secret | FB | P3-02 | Instant refresh on publish | Not started |
| P3-04 | Draft mode + Contentful Live Preview (preview URLs configured per content type) | FB | P3-02 | Editor preview | Not started |
| P3-05 | `next/image` for Contentful assets; Rich Text renderer; Mux video component. **8 Oct:** Contentful images through `next/image` (`images.ctfassets.net` for our space in `next.config.ts`); Rich Text renderer of our own (`src/contentful/rich-text.tsx`: paragraphs, marks, links, lists — `@contentful/rich-text-react-renderer` not installed). Still to do: Mux | FB + FA | P3-01 | Media and rich-text components | In progress |
| P3-06 | Home template (static content; featured case studies from Contentful). **1–2 Oct:** hero, stats, services, "Ideas Engineered Into Impact", testimonials, pinned "Our Process", "Industry-Specific Solutions", FAQ, "From the studio." (3 newest blog posts from Contentful), and closing CTA (line-by-line reveal, flowing gradient text, pulsing glows) sections built from Figma (services: Branding complete, other five categories "coming soon" until content arrives; featured project, testimonials, industry solutions, and FAQ answers 2–5 are placeholder data until real content arrives); more sections to come | FA | P2-06, P3-02 | Page | In progress |
| P3-07 | Services: listing + detail (static content in code). **10 Oct:** detail template built (`/services/[slug]`, content in `src/content/service-pages.ts`); first page Web Development, from `Service Detail.svg` (placeholder copy, issue I6); project cards from Contentful (case studies with the service ticked). Still to do: the other services' content and designs (their footer links 404 until then), the `/services` listing | FA | P2-06 | Pages | In progress |
| P3-08 | Industries: listing + detail (static content; related case studies from Contentful) | FA | P2-06, P3-02 | Pages | Not started |
| P3-09 | Case studies listing with client-side filters and URL state | FA | P3-02 | Page | Not started |
| P3-10 | Case study detail + generated OG image. **8 Oct:** template built at `/case-studies/[slug]` — hero, text + image and tech-stack sections from Contentful (alternating navy / white), metadata with SEO fallbacks; the white header on case-study pages. First case study: Gulbaan (placeholder copy, issue I2). Second: Terminal Gateway CRM, with a Centered hero, numbered features, and a wide image (placeholder copy, issue I3); its seven hero screenshots float (hero layers, `0004`). **9 Oct:** third, Cathy O’Bryan’s Books, with a Light hero, cards in four layouts, app screens, a testimonial (approved and published 9 Oct), and a call-to-action panel (`0005`; copied content replaced, issue I4). Still to do: OG image | FA | P3-02 | Page | In progress |
| P3-11 | Blog: listing, category, article + OG image | FA | P3-02 | Pages | Not started |
| P3-12 | Legal pages as static routes: `/privacy-policy`, `/cookie-policy`, `/terms`. **3 Oct:** placeholder `/privacy-policy` and `/terms` pages added (linked from the footer); legal text and `/cookie-policy` still needed | FA | P2-04, C-09 | Pages | In progress |
| P3-13 | About and Contact pages (static content); SVG office map. **9 Oct:** About page built from `About.svg` (copy in `src/content/about.ts`; placeholder text, issue I5); the office map is a picture from the design that opens Google Maps, not an SVG map. **10 Oct:** awards row; "Who Are We" value cards (four) slide sideways while the section is pinned; the team row is an auto-slider with all 17 people from the live site. Still to do: Contact page | FA | P2-06 | Pages | In progress |
| P3-14 | Contact form: Server Action, Zod, React Hook Form, Turnstile, honeypot; Vercel Firewall rate-limit rule | FB | P3-13 | Secure form | Not started |
| P3-15 | Lead delivery: Resend email to the shared sales inbox (Reply-To = visitor) + visitor auto-reply; error with fallback address if sending fails; Sentry alerts without personal data; CRM integration only if D3 says so | FB | P3-14 | Lead pipeline | Not started |
| P3-16 | Metadata, canonical, JSON-LD per template; `sitemap.ts`; `robots.ts`. **10 Oct:** `sitemap.ts` lists only the main menu pages and contact; the service pages (`/services/web-development`) and case studies are added here | FB | P3-06 → P3-13 | SEO plumbing | Not started |
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
| I3 | Issue | Terminal Gateway CRM case study has placeholder content. Its design's text was copied from another agency's case study (Tekrevol's "Project Impact / S.E.L.F app", incl. "480M downloads"), so the site uses stand-ins: renamed titles, six features read from the product screens, lorem ipsum paragraphs, and a neutral closing section. Industries and services are empty | CS | Write the real copy in Contentful; confirm the features, industries, and services; ask the designer to remove the copied text from the design | Open |
| I4 | Issue | Cathy O’Bryan’s Books case study: parts of the design's copy came from other projects and were replaced or left out — the hero eyebrow "Swipe, Watch, Order" (now "Read · Explore · Discover"), "Web Interface for Restaurant Partners" (removed from Services Provided), the "$1.2M in revenue" result (now neutral text), a second testimonial ("Sophia Clark, DineSmart", left out), and the closing panel, which named Tekrevol and "50+ food delivery platforms" (rewritten). The "Explore The App" button has no link yet, so it is hidden. Industry not set (none of the code's industries fits) | CS | Confirm the stand-ins or supply real copy and a real result; add the app's store link to the hero button in Contentful; ask the designer to remove the copied text from the design | Open |
| I5 | Issue | About page placeholders: "What Drives Us Forward", the mission, vision, and values, and Monis Bari's bio are lorem ipsum. (The team intro, a stand-in until 10 Oct, is now the live site's line.) Left out: the phone number (818-422-9253, unconfirmed) and the contact form (comes with P3-14). The awards row was added on 10 Oct, once the project head confirmed the awards are the studio's own | CS + PH | Write the real copy in `src/content/about.ts`; add the phone number if wanted; add the form with P3-14 | Open |
| I6 | Issue | Web Development service page placeholders: most text is the design's lorem ipsum (intro, offerings, service types); the hero title, meta description, and estimator questions 2–5 are stand-ins (the design's hero repeated the About page's title, and its button said "Explore The App"); the workflow intro ("Join the ranks of the 100s of companies…") may be copied from another agency's site; the stats strip uses the design's numbers (500+ projects; home and About say 100+). Gulbaan's project card has no highlight or points yet. The consultation and contact forms wait for P3-14 | CS + PH | Write the real copy in `src/content/service-pages.ts`; confirm the estimator questions and the stats; fill in the card highlight and points in Contentful (only true, approved numbers); tick **Development** on other web case studies | Open |

---

## 10. Execution log

Newest first.

| Date | Update |
|---|---|
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
