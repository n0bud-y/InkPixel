# Brand Portfolio Platform

> **Living project brief.** This is the single place to learn what the project is, what has been decided, and what is still open. It is updated whenever new information arrives; every change is recorded in the [Project log](#project-log).

**Last updated:** 30 Sep 2026 · **Current phase:** Phase 1 — Foundation (started 30 Sep 2026; Phase 0 decisions still open) · **Code:** scaffolded (Next.js 16.3.7 + Tailwind CSS v4), runs locally — see [Getting started](#getting-started-developers)

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
- **CMS for the marketing team (Contentful):** editors publish case studies, blog posts, and landing pages without developers, with live preview.
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
| Editor autonomy | Publish a case study with no developer; live within 60 s |
| Leads | No lead silently lost; sales notified within 1 minute |

Details: [architecture plan §2](architecture-plan.md#2-goals-and-measurable-targets).

---

## Tech stack

### Decided

| Layer | Choice | Decided by | Date |
|---|---|---|---|
| Framework | **Next.js (App Router) with React** — one application; React is the component layer inside Next.js | Project head | 30 Sep 2026 |
| CMS | **Contentful** — replaces Sanity. Editors use the Contentful web app with Live Preview | Project head | 30 Sep 2026 |
| Database | **None — Postgres dropped.** Contentful is the only data store | Project head | 30 Sep 2026 |
| Framework version | **Next.js 16.3.7** (App Router, Turbopack), **React 19.2.8**, all pinned to exact versions | Project head (scaffold) | 30 Sep 2026 |
| Language | **TypeScript 5**, `strict` mode; import alias `@/*` | Project head (scaffold) | 30 Sep 2026 |
| Styling | **Tailwind CSS v4** through the `@tailwindcss/postcss` plugin; design tokens go in `@theme` in `app/globals.css` | Project head (scaffold) | 30 Sep 2026 |
| Linting | **ESLint 9** (flat config) with `eslint-config-next` (Core Web Vitals + TypeScript rules) | Project head (scaffold) | 30 Sep 2026 |

### Scaffold vs. plan — needs a decision

The scaffold differs from the architecture plan in two places. Both are cheap to change now and expensive later.

| Item | Plan says | Scaffold has | Options |
|---|---|---|---|
| Package manager | pnpm ([§4](architecture-plan.md#4-tech-stack--one-decision-per-layer)) | npm (`package-lock.json`) | Keep npm and update the plan and CI, or switch to pnpm in task P1-03 |
| Source folder | `src/` ([§7](architecture-plan.md#7-folder-structure) and every path in the plans) | `app/` at the repository root; `@/*` points to `./*` | Keep the root layout and drop `src/` from the plans, or move `app/` into `src/` and point `@/*` to `./src/*` |

### Proposed — awaiting project-head confirmation

From the [v2 architecture plan §4](architecture-plan.md#4-tech-stack--one-decision-per-layer). A row moves to **Decided** once confirmed.

| Layer | Proposal |
|---|---|
| Runtime | Node.js 24 LTS (Next.js 16 needs ≥ 20.9) |
| Rendering | Static pages + instant refresh on CMS publish (Cache Components) |
| UI primitives | shadcn/ui (on top of Tailwind) |
| Animation | Motion (formerly Framer Motion); GSAP only if the design needs it — never both |
| Content access | Contentful GraphQL API with generated TypeScript types; content model as code (migration scripts) |
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

First version, covering the scaffold only. It will grow as Phase 1 adds Contentful, environment variables, and tooling (task P1-12).

### Prerequisites

- **Node.js 24 LTS** (Next.js 16 needs at least 20.9)
- **npm** (comes with Node.js). This may change to pnpm; see [Scaffold vs. plan](#scaffold-vs-plan--needs-a-decision)

### Setup

```bash
npm install
npm run dev        # http://localhost:3000
```

No environment variables are needed yet.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with Turbopack (the default bundler in Next.js 16) |
| `npm run build` | Production build |
| `npm run start` | Serves the production build |
| `npm run lint` | Runs ESLint directly. `next lint` no longer exists in Next.js 16 |
| `npx tsc --noEmit` | Type check (no script yet; CI adds one in P1-08) |

### Project layout

| Path | Contents |
|---|---|
| `app/` | App Router routes. `layout.tsx` is the root layout (loads the Geist fonts with `next/font`); `page.tsx` is the home page; `globals.css` holds Tailwind and the design tokens |
| `public/` | Static files served from `/`. Favicons and small SVGs only — no photos or video |
| `docs/` | Project brief, architecture plan, execution plan |
| `next.config.ts` | Next.js configuration (empty so far) |
| `postcss.config.mjs` | Loads the Tailwind PostCSS plugin |
| `eslint.config.mjs` | ESLint flat config |

### Styling with Tailwind CSS v4

- Tailwind v4 has **no `tailwind.config.js`**. It is set up in CSS: `app/globals.css` starts with `@import "tailwindcss";`, and `postcss.config.mjs` loads `@tailwindcss/postcss`.
- **Design tokens** (colours, fonts, spacing, radius) go in the `@theme` block in `app/globals.css`. Each token becomes a CSS variable and a utility class; for example, `--color-background` gives `bg-background`.
- The current tokens (`background`, `foreground`, Geist fonts) are template placeholders. Task P2-01 replaces them with the tokens from the Figma designs.

### Next.js 16 note

Next.js 16 differs from older versions and from what many tutorials show. Before using a Next.js API, check the docs bundled with the installed version in `node_modules/next/dist/docs/`.

---

## Project log

Newest first. Every new fact, decision, or change to the project is recorded here.

| Date | Update | Source |
|---|---|---|
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
