# Execution Plan — Brand Portfolio Platform

| | |
|---|---|
| **Status** | Draft — kickoff date _TBD_ |
| **Owner** | Project Head |
| **Last updated** | 30 Sep 2026 |
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
| M5 | Feature complete | W9 | _TBD_ | PH | Every template on the CMS; lead pipeline complete; editor acceptance test passed | Not started |
| M6 | Content complete | W10 | _TBD_ | MK | All launch content in the CMS; client approvals on file | Not started |
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
| P1-02 | Scaffold Next.js 16.3.x (TypeScript strict, App Router, `src/`, Tailwind v4). Scaffold in place (`create-next-app` tolerates `docs/`; remove other stray root files first) and replace the generated root `README.md` with a pointer to `docs/README.md` | FA | P1-01 | Running app | Not started |
| P1-03 | Tooling: pnpm, ESLint (flat config), Prettier, Husky + lint-staged, commitlint | FA | P1-02 | Pre-commit checks | Not started |
| P1-04 | `env.ts` validation and `.env.example` | FB | P1-02 | Validated env vars | Not started |
| P1-05 | Vercel project: preview protection, env vars per environment, noindex outside production | PH | P1-02 | Preview URL per PR | Not started |
| P1-06 | Contentful space, environments (`master`, `dev`), API tokens (delivery, preview, management in CI only), migration tooling, GraphQL type generation | FB | P1-02, P0-14 | Contentful connected | Not started |
| P1-07 | Sentry for client and server errors | FB | P1-05 | Error reporting | Not started |
| P1-08 | CI: typecheck, lint, unit tests, build | FA | P1-03 | Required checks | Not started |
| P1-09 | Playwright + axe + Lighthouse CI against the preview URL; record the performance baseline | FA | P1-05, P1-08 | Budgets in CI | Not started |
| P1-10 | Skeleton routes per the folder structure (architecture plan §7) with placeholder content | FA + FB | P1-02 | Navigable skeleton | Not started |
| P1-11 | Renovate; pin `next`, `react`, `react-dom` versions | PH | P1-01 | Dependency updates | Not started |
| P1-12 | Fill in the `docs/README.md` "Getting started" section | FA | P1-10 | Setup guide | Not started |

### Phase 2 — Design system (W3–W5)

| ID | Task | Owner | Depends on | Output | Status |
|---|---|---|---|---|---|
| P2-01 | Design tokens into Tailwind `@theme`: colour, type scale, spacing, radius, shadow | FA | P0-11 | `globals.css` tokens | Not started |
| P2-02 | Fonts via `next/font` (≤ 2 families, subset) | FA | P2-01 | Font setup | Not started |
| P2-03 | Theme shadcn primitives: Button, Input, Textarea, Select, Dialog, Sheet, Tabs, Accordion, Badge | FA | P2-01 | `components/ui` | Not started |
| P2-04 | Header, footer, mobile navigation, skip link | FA | P2-03 | `components/layout` | Not started |
| P2-05 | Motion primitives (Reveal, Stagger, Counter) with `LazyMotion` and reduced-motion support | FA | P2-01 | `components/motion` | Not started |
| P2-06 | Section blocks as static UI: Hero, LogoWall, Stats, CTA, Testimonials, CaseStudyGrid, FAQ, RichText | FA + FB | P2-03 | `components/sections` | Not started |
| P2-07 | Component gallery (development-only route or Storybook) | FA | P2-06 | Gallery | Not started |
| P2-08 | Design QA against Figma at 3 breakpoints; accessibility pass | DS + QA | P2-07 | Signed-off components (M4) | Not started |

### Phase 3 — Templates & features (W5–W9)

| ID | Task | Owner | Depends on | Output | Status |
|---|---|---|---|---|---|
| P3-01 | Final Contentful content types as migration scripts, including `redirect`, `siteSettings`, `seo`, section types | FB | P0-09 | Migrations | Not started |
| P3-02 | Typed GraphQL query layer with `'use cache'` + `cacheTag` | FB | P3-01 | `contentful/queries` | Not started |
| P3-03 | `/api/revalidate` for Contentful publish/unpublish webhooks, verified with the signing secret | FB | P3-02 | Instant refresh on publish | Not started |
| P3-04 | Draft mode + Contentful Live Preview (preview URLs configured per content type) | FB | P3-02 | Editor preview | Not started |
| P3-05 | `next/image` for Contentful assets; Rich Text renderer; Mux video component | FB + FA | P3-01 | Media and rich-text components | Not started |
| P3-06 | Home template | FA | P2-06, P3-02 | Page | Not started |
| P3-07 | Services: listing + detail | FA | P3-02 | Pages | Not started |
| P3-08 | Industries: listing + detail | FA | P3-02 | Pages | Not started |
| P3-09 | Case studies listing with client-side filters and URL state | FA | P3-02 | Page | Not started |
| P3-10 | Case study detail + generated OG image | FA | P3-02 | Page | Not started |
| P3-11 | Blog: listing, category, article + OG image | FA | P3-02 | Pages | Not started |
| P3-12 | CMS page-builder route `/[slug]` (legal, landing pages) | FB | P2-06, P3-02 | Page | Not started |
| P3-13 | About and Contact pages; SVG office map | FA | P3-02 | Pages | Not started |
| P3-14 | Contact form: Server Action, Zod, React Hook Form, Turnstile, honeypot; Vercel Firewall rate-limit rule | FB | P3-13 | Secure form | Not started |
| P3-15 | Lead delivery: Resend email to the shared sales inbox (Reply-To = visitor) + visitor auto-reply; error with fallback address if sending fails; Sentry alerts without personal data; CRM integration only if D3 says so | FB | P3-14 | Lead pipeline | Not started |
| P3-16 | Metadata, canonical, JSON-LD per template; `sitemap.ts`; `robots.ts` | FB | P3-06 → P3-13 | SEO plumbing | Not started |
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
| C-05 | Service and industry copy, aligned with the keyword map | CS | P0-06 | Final copy | Not started |
| C-06 | Home and About copy; leadership bios and photos | CS + DS | P0-07 | Final copy and photos | Not started |
| C-07 | Photography and video: produce or source | DS | C-01 | Media library | Not started |
| C-08 | Migrate existing blog posts or write 3–5 launch articles | CS | P0-05 | Articles | Not started |
| C-09 | Legal pages: privacy, cookies, terms — with legal review | PH | P3-18 | Approved legal copy | Not started |
| C-10 | Editor training session | FB + MK | P3-19 | Trained editors | Not started |
| C-11 | Enter all launch content into the CMS (M6) | CS | C-04 → C-09, C-10 | Content live in CMS | Not started |
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
- [ ] All copy and media come from the CMS (only UI labels are hard-coded)
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

---

## 10. Execution log

Newest first.

| Date | Update |
|---|---|
| 30 Sep 2026 | Postgres dropped: no database. Leads emailed to a shared sales inbox; CRM optional; Upstash replaced by a Vercel Firewall rule. Updated assumptions, P0-03, P3-14, P3-15, runbook, R8 |
| 30 Sep 2026 | CMS switched to Contentful (Sanity dropped); SQL database removed from the plan. Updated P0-03, P0-09, P1-06, P3-01 → P3-05, P3-15, P3-19, runbook; added P0-14, R7, R8 |
| 30 Sep 2026 | Execution plan created. Kickoff date not yet set; all tasks `Not started` |
