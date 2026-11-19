# inkpixelstudios.com — Site Review

**Date:** 20 Nov 2026 · **Scope:** all 61 public pages (from the sitemap, plus every internal link found), the unlinked placeholder routes, content, user experience, accessibility, SEO, and performance. Code reviewed at commit `568f86c`; performance measured on the live site.

## Summary

The site's technical foundation is solid:
- every page loads;
- there are no broken links or console errors;
- SEO basics are complete;
- nothing scrolls sideways on phones;
- the enquiry forms have a backup log and bot protection.

The real risks are **credibility and compliance**:
- placeholder "client results" and statistics that contradict each other;
- Google Analytics runs without the consent the Privacy Policy promises;
- the legal pages are unfinished.

The biggest technical weakness is **performance on mid-range phones**: heavy JavaScript and animation work.

| Priority | Count | Theme |
|---|---|---|
| 🔴 High | 6 | Placeholder/contradicting claims, cookie consent, legal text, mobile speed, layout shift |
| 🟠 Medium | 7 | Accessibility, unused files, placeholder pages, slow listing image, wording |
| 🟢 Low | 5 | Long search descriptions, 404 page, empty superlatives, keyboard scrolling, open content issues |

## Status after the first fixes (20 Nov 2026)

| # | Finding | Status |
|---|---|---|
| H1 | Placeholder client results on the home page | **Open.** Not chosen this round. Still the top credibility risk |
| H2 | Contradicting statistics | **Fixed.** 100+ projects everywhere; removed 500+ Professionals, the per-category 60+ Experts, 80% "Web development excellence" and 78% "Mobile app development impact". Still to confirm: 93% satisfaction, 10+ years, and the testimonial figures (H1) |
| H3 | Analytics vs. Privacy Policy | **Fixed by rewording.** The policy now describes Google Analytics and how to block it, instead of promising prior consent and a consent tool. A consent banner with Consent Mode v2 is still recommended for UK/EU visitors |
| H4 | Unfinished legal wording | **Open.** Needs the governing law and courts named (and ideally a lawyer) |
| H5 | Slow on mid-range phones | **Open.** Recommended first step: a Cloudflare Cache Rule for pages (no code change) |
| H6 | Layout shift on G&W Towers | **Fixed.** The hero image reserves its box (CLS 0.198 → 0.000; all six hero layouts 0–0.001, same image sizes as before) |
| M1 | Screen readers skip unrevealed content | Open |
| M2 | "(optional)" contrast on Contact | Open |
| M3 | 42.7 MB of unused files | **Fixed.** 7 files deleted |
| M4 | Placeholder pages reachable | Open |
| M5 | Lazy featured image on Our Work | **Fixed.** Preloaded (local largest paint 3.4 s, dev mode) |
| M6 | "no NDAs" wording | Open |
| M7 | Confirm form delivery | Open (one live test enquiry) |
| L1–L5 | Low-priority items | Open |

---

## 🔴 High priority

### H1. Placeholder "client results" on the home page
In "What Our Clients Say About Us", every testimonial slide shows four result figures:
- **+150% "Project satisfaction rate"**
- **65% Lower Acquisition Costs**
- **3x Improved CRO**
- **94% Clients Exceed Targets**

They are placeholders (issue I8), but visitors read them as real results for named clients (IHR, Gulbaan, Drumond, Pak Armoring). "+150% satisfaction rate" is also impossible as a metric.
**Why it matters:** invented results attached to real client names are the most damaging kind of claim if a client or prospect notices.
**Best solution:** hide the results row now (a code change in `src/content/home.ts` / `TestimonialCarousel`). Show figures per client only once each client approves real ones.

### H2. Statistics contradict each other
| Claim | Where |
|---|---|
| 100+ projects ("Digital projects shipped", "Successful Projects") | Home, About |
| **500+** Successful Projects | All 37 service pages |
| **500+ Professionals** | About |
| **60+ Experts** in *each* of Branding, Development, Marketing, Software, Applications, AI Automation | Every service page |
| 93% Client Satisfaction, 10+ Years | About |
| 80% "Web development excellence", 78% "Mobile app development impact" | Home |

A reader who visits two pages sees 100+ and 500+ projects. "500+ professionals" and "60+ experts per category" don't fit a studio of this size. "Web development excellence 80%" isn't a measurable thing.
**Best solution:** one set of real numbers, kept in one file and used everywhere. Until then, use "100+ projects" everywhere and remove "500+ Professionals", the per-category "60+ Experts", and the unmeasurable percentages.

### H3. Google Analytics without consent; Privacy Policy promises consent
`src/app/layout.tsx` loads Google Analytics (G-N33JLE8FFM) for every visitor. The Privacy Policy says *"Non-essential cookies will only be installed … following the proper consent"* and mentions a *"consent-management tool"*. There is no consent banner. Clients and visitors now include the UK (IHR) and US, where consent rules apply.
**Best solution:** a small, on-brand cookie banner using **Google Consent Mode v2**:
- analytics storage is denied by default;
- it's granted only on "Accept";
- the choice is remembered;
- a "Cookie settings" link in the footer reopens the banner.

That makes the policy true without losing analytics. Consent Mode still sends cookieless pings.

### H4. Legal pages are unfinished (issue I15)
- Terms §20: *"governed by the laws of the jurisdiction identified in the final published version of this policy"*. No jurisdiction is named.
- Refund Policy: *"As a general proposed policy:"*. That's draft wording on a live policy.

**Best solution:** name the governing law and courts (e.g. Pakistan, courts of Karachi) and remove "proposed". Ideally have a lawyer review all three policies.

### H5. Slow on mid-range phones
Measured on the live site, simulating a mid-range phone (4× slower CPU, slow 4G, like Lighthouse mobile):

| Page | First paint | Largest paint | Main-thread blocking |
|---|---|---|---|
| Home | 4.3–5.2 s | 5.2–5.7 s | 1.9–2.7 s |
| About | 8.8–9.6 s | 8.8–9.6 s | 3.9–9.3 s |
| Web Development | 6.7 s | 6.7 s | 4.4 s |
| Our Work | 3.9 s | 6.4 s | 1.5 s |
| Contact | 3.9 s | 6.3 s | 2.4 s |

Desktop is fine: first paint 1.8–2.7 s, blocking 0.2–1.5 s.

**Causes:**
- Every page loads about **270 KB compressed (870 KB unpacked) of JavaScript**: React (198 KB), GSAP with ScrollTrigger and ScrollSmoother (~120 KB) and a Contentful chunk (61 KB), with many animated client components hydrating at once.
- Not the server: it answers in 0.5–0.9 s and Next's cache hits.
- Cloudflare is in front but **does not cache pages** (`cf-cache-status: DYNAMIC`), so every visit goes to the cPanel server.

**Best solutions, in order of value for effort:**
1. **Cloudflare Cache Rule** for HTML, bypassing `/api/*`, `/_next/data` and Contentful preview. The app already sends `s-maxage=3600, stale-while-revalidate`. Visitors would get pages from Cloudflare's edge in ~50 ms instead of 0.5–0.9 s. No code change; done in the Cloudflare dashboard.
2. **Lighter animations on phones**: skip ScrollSmoother, pinned and parallax effects below 1024 px (simple fades instead), and load GSAP only for the sections that use it.
3. **Find out why a Contentful client chunk (61 KB) ships to browsers.** Contentful content should render on the server only.
4. Re-measure after each step. Target: largest paint under 2.5 s, blocking under 600 ms.

### H6. Layout shift on the G&W Towers page (desktop)
Cumulative Layout Shift is **0.198** on `/case-studies/gw-towers`; Google's "good" limit is 0.1. It happens live and locally. During load the content below the hero jumps by about 600 px, so the hero visual doesn't reserve its height before it loads. Other pages: 0–0.013 (fine).
**Best solution:** give the hero image box a fixed aspect ratio (from the image's width and height) so the space is reserved before the image arrives, then re-measure.

---

## 🟠 Medium priority

### M1. Screen readers skip content until it scrolls into view
`src/components/motion/Reveal.tsx` animates with GSAP `autoAlpha: 0`, which sets `visibility: hidden` on every not-yet-revealed block. Hidden content is removed from the accessibility tree. That's why axe reports `aria-prohibited-attr` on the shared "Let's build the next thing you ship" section on every page: its heading is hidden, so the section loses its label.
**Best solution:** animate `opacity` instead of `autoAlpha`. It looks identical, and the content stays readable by assistive technology.

### M2. Low-contrast "(optional)" hints on the Contact form
The "(optional)" text next to Phone and Company has a contrast ratio of **2.88**; WCAG needs 4.5.
**Best solution:** `text-primary/45` → `text-primary/65`.

### M3. 42.7 MB of unused files in the repository and every deploy
| File | Size |
|---|---|
| `public/videos/Awards-2025-Highlights-Snippet.mp4` | 39.3 MB |
| `src/assets/images/gemini_generated_video_de9952eb.mp4` | 3.2 MB |
| `testimonials/client-1.webp`, `client-review.webp`, `Gemini_Generated_Image_…png`, `banner.webp`, `Screenshot_2026-10-22_…png` | 178 KB |

None is referenced in the code. The 39 MB video is also publicly downloadable.
**Best solution:** delete them. Keep `public/googlecec62e4ff607cb59.html`: it's the Google Search Console verification file.

### M4. Placeholder pages are reachable
`/industries`, `/industries/<any>` and `/technologies` show developer text: *"Placeholder. Industries are listed from Contentful in P3-08."*, *"Example industry"*, *"Static content; the design for this page comes later."* They're noindexed, out of the sitemap and not linked from the menus, but anyone who guesses the URL, or follows an old link, sees them.
**Best solution:** return a real 404 (or redirect to `/services`) until these pages are built.

### M5. The "Our Work" featured image loads lazily
On `/case-studies` the large featured card's image is the biggest element on screen, but it's lazy-loaded. Largest paint is **5.2 s on desktop**.
**Best solution:** add `preload` to the first card's image in `WorkFilter.tsx`.

### M6. "no NDAs" in the call to action on every page
*"We'll come back within a working day with a starting point — no NDAs, no sales decks."* Many business clients *require* an NDA, so this reads as "we won't sign one".
**Best solution:** *"…with a starting point. No sales decks, and happy to sign an NDA."*, or drop "no NDAs".

### M7. Forms: confirm live delivery
The form code is solid: it emails through the server's mail program, saves every enquiry to a backup log, and has bot and rate limits. But email delivery from cPanel can silently land in spam.
**Best solution:** send one test enquiry from the live site and confirm it arrives in the inbox (not spam). If it lands in spam, set the SMTP variables, or add SPF and DKIM for inkpixelstudios.com.

---

## 🟢 Low priority

- **L1. Search descriptions too long** (Google cuts them after about 160 characters): Designzhub360 (203), In-house Recruitment (183), Drumond Auto Body (176). Shorten their excerpts.
- **L2. 404 page is plain:** a heading and one link. Add the brand style, plus links to Services, Our Work and Contact.
- **L3. Empty superlatives:**
  - About: *"stands out as a leading software and digital solutions company in Pakistan"*.
  - Web Development: *"Join the ranks of the 100s of companies we helped"* (issue I6 notes it may be copied from another agency).
  - "cutting-edge" appears 10 times.

  Replace these with specific facts.
- **L4. Keyboard scrolling:** two horizontally scrolling strips (the logo row on About, a card row on Web Development) can't be reached with the keyboard. Make them focusable (`tabIndex={0}` with a label) or not scrollable.
- **L5. Open content issues from the execution plan:**
  - I5: About mission, vision, values and bio are stand-ins.
  - I13: the Technologies menu list isn't confirmed.
  - I14: the Contact "What Happens Next" steps are promises.
  - I16: the industry solutions are stand-ins.
  - I17: the FAQ names services not offered (blockchain, game development, cloud, DevOps, staff augmentation).

---

## ✅ What's working well

- All 61 pages return 200; **0 broken internal links**; social links correct.
- Every page has a **unique title and description**, exactly **one h1**, a **canonical** link, and an **Open Graph image**. All images have **alt text**.
- robots.txt and the sitemap are correct; placeholder pages are noindexed.
- **0 console or hydration errors** on all 61 pages.
- **No horizontal overflow** at phone width (390 px) on any page.
- axe accessibility checks: ~25 rules pass per page. The only violations are those listed above.
- Enquiry forms validated on the server, with a backup log, a honeypot, and a rate limit.
- Brotli compression, security headers, polyfills only for old browsers, smooth scrolling off on touch devices.
- Case-study pages: the story panels lock exactly one screen tall at 1920, 1440 and 1280 px.

## Not yet deployed

The live site is behind `main`. The Pak Armoring video banner needs the latest code deployed:
1. Push from VS Code.
2. `git pull origin main` on cPanel.
3. Restart.

## How this was checked

Headless Chrome on the local site (crawl, console, phone width, axe-core 4.10) and on the live site (web vitals with 4× CPU and slow-4G throttling, and the JavaScript and caching headers). Lighthouse itself wasn't run (the tool was blocked here), so the figures are equivalent measurements, not Lighthouse scores.
