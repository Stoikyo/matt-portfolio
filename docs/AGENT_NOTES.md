# AGENT_NOTES

Working rules for this repo, for AI agents and humans.

Read `/CLAUDE.md` first for purpose and audience. Read `docs/design-system.md`
before any CSS work. This file covers structure, editing rules and code
expectations.

> **This document was rewritten in Aug 2026.** The previous version required
> every page to be self-contained with a single inline `<style>` block and
> banned all build tooling. Those rules produced ~2,000 lines of duplicated CSS
> and design tokens declared twelve times. They are reversed below. If you find
> older guidance repeating them, this file supersedes it.

---

## 1. Structure

```
CLAUDE.md                 — purpose, audience, hard constraints
README.md                 — public repo info
docs/AGENT_NOTES.md       — this file
docs/design-system.md     — tokens; source of truth for visual decisions
index.html                — homepage
projects/<name>/          — case studies, trailing-slash directories
services/<name>/          — service pages
assets/css/               — tokens.css, base.css, component CSS
assets/js/                — site-nav.js, project-tabs.js
assets/img/               — imagery
vercel.json               — redirects
sitemap.xml, robots.txt, llms.txt
```

Target structure once Eleventy lands (punch list Phase 5):

```
src/_includes/layouts/    — base, case-study, service
src/_includes/partials/   — nav, footer
src/_data/projects.json   — drives homepage cards AND prev/next links
```

---

## 2. Editing rules

Before changing pages, read `/CLAUDE.md` and `docs/design-system.md`.

**You may:**
- Refactor HTML for better semantics and accessibility.
- Adjust layout and component structure within the token set.
- Extract repeated CSS into shared files.
- Update copy, links and content when asked.
- Add build tooling **only** where the punch list calls for it (Eleventy).

**You must not:**
- Introduce frameworks — React, Vue, Next.js, Tailwind, Bootstrap.
- Add heavy JavaScript or external JS dependencies.
- Use raw values where a token exists. See `docs/design-system.md`.
- Use `#0d6efd` or `rgba(13, 110, 253, …)`. The accent is `#e90067`.
- Drop the Content-Security-Policy from any page.
- Ship an `<img>` without `alt`, `width` and `height`.
- Remove core homepage sections — nav, hero, services, projects, about,
  contact, footer — unless asked.
- Change a URL without adding a redirect (see §5).
- **Invent outcomes, metrics, client names or testimonials.** Mark placeholders
  clearly and flag them.

Keep changes minimal and reversible. Preserve class names where practical so
diffs stay readable. Comment anything experimental.

---

## 3. Code expectations

**HTML** — semantic elements. One `<h1>`, logical heading descent. IDs present
for every in-page anchor. Skip-to-content link on the homepage.

**CSS** — shared files, not inline blocks. Token references, not raw values.
Shallow selectors, manageable specificity. Mobile-first media queries.

**JavaScript** — progressive enhancement only; the site must work without it.
No external libraries. Shared behaviour goes in `assets/js/`, not per-page
inline scripts.

**Performance** — images as WebP, sized to their display context. `loading="lazy"`
below the fold. Explicit dimensions on everything to prevent layout shift.

---

## 4. Page requirements

**Homepage:** nav with anchor links, hero stating who this is for, services,
projects, about/working-style, contact CTA, footer.

**Case studies** (`projects/<name>/`):
- Two-tab structure — `Overview` and `How it was built`. Narrative belongs in
  Overview. If technical content isn't ready, render
  `Technical breakdown coming soon.`
- Reuse `assets/css/project-tabs.css` and `assets/js/project-tabs.js`. Follow
  the contract: `data-project-tabs`, `role="tablist"`, `role="tab"`,
  `role="tabpanel"`. Default to Overview; no URL/hash mutation on tab click.
- Structure: Problem → Approach → Outcome → My role.
- **Every case study needs site navigation and a footer CTA.** Case study pages
  currently dead-end with only a back link — a known bug, fixed by shared
  layouts in Phase 5. Don't reproduce it on new pages.

**Service pages** (`services/<name>/`): what you get, timeline, how I work,
relevant project links, FAQ, contact CTA.

---

## 5. URLs and redirects

Trailing-slash directories: `/projects/name/`, not `/projects/name.html`.

Any URL change requires **all** of:
1. `permanent: true` redirect in `vercel.json`
2. `<link rel="canonical">` updated
3. `og:url` and Twitter meta updated
4. All internal links updated, including case study prev/next
5. `sitemap.xml` and `llms.txt` updated
6. Relative asset paths checked — depth changes when a file moves from
   `projects/x.html` to `projects/x/index.html`

---

## 6. Exempt pages

Some pages aren't portfolio content and don't move through the phases above.

- **`projects/dfw/privacy-policy.html`** — privacy policy for DFW (Down For
  Workouts), a separate Android app. App-support/compliance content, not a
  case study. Its URL may be registered in a Play Console listing, so it
  keeps its `.html` path with no Phase 3 trailing-slash migration and no
  redirect. Excluded from Phase 5 Eleventy templating — it doesn't fit the
  case-study or service layouts and isn't worth a template of its own. It is
  not listed in `sitemap.xml` or `llms.txt`. The only work it still receives
  is the Phase 4 colour fix (`#0d6efd` → `#e90067`, the stale focus-ring
  `rgba(13, 110, 253, …)` → `--focus-ring`) — everything else about it stays
  as-is.

---

## 7. Commits

Small and purposeful. Don't bundle unrelated changes — copy tweaks and CSS
refactors go in separate commits. Prefer a small clearly-described change over
a large redesign.
