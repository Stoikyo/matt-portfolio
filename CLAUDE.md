# CLAUDE.md

Read this first. Then read `docs/design-system.md` before touching any CSS, and
`docs/AGENT_NOTES.md` before changing page structure.

## What this is

Static portfolio and services site for Matt Grant. Melbourne, Australia.
Live at https://matthewgrant.co — deployed on Vercel from `main`.

## Who it's for

Two audiences, roughly equal weight:

1. **Prospective clients** — freelance and consulting work, mostly AI
   consulting/automation and rapid prototyping engagements.
2. **Hiring teams** — UX design, product design, AI engineering/design, and
   founder or founding-team roles.

**The positioning is single, not four-way.** The through-line across every
audience is: *takes an ambiguous problem and gets a working thing in front of
real users, fast.* Do not write four parallel pitches. Audience adaptation
happens through **which evidence is surfaced** — engagement shape and scope for
clients, work history and depth for hiring teams — not through different claims
about who Matt is.

## Current state

The site was hand-built as standalone HTML files, each with its own inline
`<style>` block. That approach is **being retired** — see "Direction" below.
Historic docs that mandate self-contained single-file pages are superseded by
this file.

Known state as of Aug 2026:
- ~2,000 lines of duplicated inline CSS across 12 pages
- Design tokens redeclared in every file
- No spacing scale and no type scale (main source of visual drift)
- Case study pages have no site navigation
- ~23MB of unoptimised image assets

## Direction

Work is sequenced in `docs/portfolio-punch-list.md`. Short version:

0. Remove `maincode/` — done
1. Compress assets (23MB → under 3MB)
2. Mechanical fixes — image dimensions, lazy loading, orphaned lockfile
3. Standardise URLs to trailing-slash directories
4. **Build the token set** (`docs/design-system.md`)
5. **Then** move to Eleventy layouts

Order matters: tokens before templating. Templating first would bake current
inconsistencies into shared components.

## Hard constraints

- **Accent colour is `#e90067`.** Pink. Not blue. Older docs specified
  `#0d6efd` — that was wrong and is the reason focus rings across the site are
  currently off-brand. If you find `#0d6efd` or `rgba(13, 110, 253, …)`
  anywhere, it is a bug.
- **Output stays static HTML.** Eleventy is permitted as a build step. React,
  Vue, Next.js and similar are not.
- **No CSS frameworks.** No Tailwind, no Bootstrap. Hand-written CSS against
  the token set.
- **No new raw values.** Spacing, type sizes, radii, colours and shadows come
  from tokens. If something genuinely isn't covered, add it to the scale in
  `docs/design-system.md` deliberately — don't inline a one-off.
- **Content-Security-Policy stays on every page.** It's currently correct on
  all of them; don't drop it when refactoring heads into a layout.
- **Every image needs `alt`, `width` and `height`.** Alt coverage is currently
  100%; keep it there.
- **Never invent project outcomes, metrics, client names or testimonials.** If
  a case study needs a number and you don't have it, leave a clearly marked
  placeholder and flag it. Fabricated proof on a portfolio is a serious
  problem, not a drafting shortcut.
- **Never imply Motoru and LeasePlease are connected.** Motoru ended in a
  co-founder split; LeasePlease is an independent build sharing no IP. Words
  like "became", "grew out of", "evolved into", "successor" are prohibited, as
  is any visual device linking them.

## Conventions

- Australian English in all copy ("optimise", "colour", "organisation").
- Em dashes in prose and headings, consistently — not hyphens.
- Sentence case for headings.
- URLs are trailing-slash directories: `/projects/name/`, not `/name.html`.
- Any URL change needs a `permanent: true` redirect in `vercel.json`, plus
  updates to `sitemap.xml`, `llms.txt`, canonical tags and OG meta.
- Small, purposeful commits. Don't bundle copy tweaks with CSS refactors.
