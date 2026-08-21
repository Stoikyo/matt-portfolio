# matthewgrant.co - technical punch list

Audit date: 11 Aug 2026. Repo: `matt-portfolio`. Host: Vercel.

Ordered by value-per-effort. Phases 1-2 are safe to do independently of any
content work. Phase 3 changes URLs, so it should land before new case study
content is written.

---

## Phase 0 - Remove `maincode/` (do first, unblocks nothing else)

Job application page. Not to remain live or viewable.

Verified safe to delete: zero inbound references anywhere in the repo, absent
from `sitemap.xml` / `llms.txt` / `robots.txt`, and the only asset it uses is
the shared `mg_favicon.png` (nothing is orphaned by removal).

```bash
git rm -r maincode
git commit -m "Remove maincode application page"
```

Add to `vercel.json` redirects so the shared URL doesn't 404:

```json
{ "source": "/maincode", "destination": "/", "permanent": true }
```

Two caveats:

- It is currently **publicly reachable**. `noindex, nofollow` keeps it out of
  search results but is not access control - anyone holding the URL can open it
  today.
- **Git history retains it.** The repo is public, so after the delete commit the
  file is still readable at that path in history. If the content needs to be
  genuinely gone rather than just off the live site, either rewrite history
  (`git filter-repo --path maincode --invert-paths`) or make the repo private.
  If "not on the live site" is sufficient, the plain delete is enough.

## Phase 1 - Asset weight (highest impact, no structural risk)

Current total: **23MB** in `assets/`. Target: under 3MB.

| File | Current | Action |
|---|---|---|
| `motoru-recommendations.mp4` | 6.2MB | Re-encode H.264 CRF 28, cap width 1280. Add `preload="none"` + poster image. |
| `ev-picker-landing-page.png` | 3.2MB | → WebP, max 1600px wide |
| `original-homepage-design-motoru.png` | 2.3MB | → WebP, max 1600px wide |
| `eofy-page-motoru.png` | 2.0MB | → WebP, max 1600px wide |
| `your-personal-ev-picker-report.pdf` | 1.6MB | Linearise / recompress, or host externally |
| `car-part-fit-checker-results-page.png` | 1.5MB | → WebP, max 1600px wide |
| `aice-aice-baby.png` | 1.4MB | → WebP |
| `matt-headshot.png` | 508KB | → WebP, 2 sizes (400px, 800px). Above the fold on every page. |
| `railplan-assistant-1..4.png` | 516KB-284KB | → WebP |

Notes:
- Keep PNG originals out of the deployed tree, or add a `.vercelignore`.
- Logos/icons under ~50KB can stay as-is.
- Use `<picture>` with WebP + PNG fallback only if you care about very old
  browsers; otherwise WebP alone is fine in 2026.

## Phase 2 - Mechanical fixes

1. **Add `width` and `height` to all 38 `<img>` tags.** Currently zero have
   them. Intrinsic dimensions, not display size - CSS handles display.
   Directly fixes cumulative layout shift.
2. **Add `loading="lazy"`** to the remaining below-fold images. Coverage is
   currently partial (e.g. `motoru.html` has 4 images, 2 lazy).
3. **Delete `package-lock.json`** - there is no `package.json`. It references
   eslint and sharp and is an orphan. (If Phase 4 goes ahead, a real
   `package.json` replaces it.)
4. **Remove `maincode/`** - decided. See Phase 0.
5. **Update `README.md`** - "Rebuild in progress; this change primes a PR for
   the next iteration" is stale.
6. **Add JSON-LD** to `ai-overview.html` (missing; present on 10 of 12 pages).

## Phase 3 - URL standardisation

Move to trailing-slash directories throughout. `vercel.json` already has the
`evpicker.html` redirect as precedent.

| From | To |
|---|---|
| `/projects/supplie.html` | `/projects/supplie/` |
| `/projects/motoru.html` | `/projects/motoru/` |
| `/projects/fun.html` | `/projects/fun/` |
| `/services/ai-consulting-automation.html` | `/services/ai-consulting-automation/` |
| `/services/rapid-ai-prototyping.html` | `/services/rapid-ai-prototyping/` |
| `/ai-overview.html` | `/ai-overview/` |

For each move:
- Add a `permanent: true` redirect to `vercel.json`
- Update `<link rel="canonical">` and all `og:url` / `twitter` meta
- Update every internal link (including prev/next links between case studies)
- Update `sitemap.xml` and `llms.txt`
- Fix relative asset paths - depth changes from `../assets/` to `../../assets/`
  for files moving from `projects/x.html` to `projects/x/index.html`

Also in `sitemap.xml`: all `lastmod` values are hardcoded `2026-03-30` /
`2026-06-30`. Consider whether `/projects/dfw/privacy-policy.html` belongs in
the sitemap at all - it's an app support page, not portfolio content.

## Phase 4 - Design tokens (the consistency fix)

**Root cause: the current 24 tokens cover only colour, radius, shadow and
max-width. There is no spacing scale and no type scale.** New UI drifts because
there is no token to reach for - a raw px value is the only option.

### Audit findings (maincode excluded)

**Spacing - 25 distinct px values** across `padding` / `margin` / `gap`:

```
12px ×72   8px ×68   10px ×51   14px ×49   24px ×38   6px ×35
20px ×34   28px ×26  16px ×17   32px ×15   96px ×13   40px ×10
48px ×9    64px ×8   120px ×7   18px ×5    11px ×5    4px ×4
52px ×3    22px ×3   80px ×2    72px ×2    88px ×1    60px ×1   56px ×1
```

A rough 4px rhythm exists, but 10/11/12/14px sitting side by side means each
component is a fresh guess.

**Type - 23 distinct sizes.** 14px dominates (×43) but 13px, 15px, 17px and 18px
all appear. Six different `clamp()` formulas for fluid headings, including
`clamp(40px, 7vw, 60px)` and `clamp(40px, 7vw, 58px)` - a 2px difference that is
almost certainly accidental.

**Radius token is bypassed.** `var(--radius)` ×26, but `8px` hardcoded ×20, plus
one-offs at 2, 6, 10, 11, 12, 14, 16px.

**Focus rings are off-brand and inconsistent.** All use
`rgba(13, 110, 253, …)` - Bootstrap blue `#0d6efd`, not the accent `#e90067` -
in four different spread/opacity combinations:

```
0 0 0 3px rgba(13,110,253,0.18)   ×8
0 0 0 2px rgba(13,110,253,0.15)   ×8
0 0 0 3px rgba(13,110,253,0.24)   ×1
0 0 0 2px rgba(13,110,253,0.12)   ×1
```

**Four untokenised near-identical off-whites** used as hover/surface states:
`#ede9e3`, `#f0ede7`, `#ebe8e1`, `#f8f8f6`.

**62 hardcoded hex values** outside `:root`, concentrated in `index.html` (27)
and `evpicker/index.html` (9).

### Work

1. **Extend the token set** in `assets/css/tokens.css`:
   - Spacing scale on a 4px base: `--space-1: 4px` … `--space-16: 96px`.
     Collapse 10/11px → 12px and 18px → 16px or 20px; check each visually.
   - Type scale: cap at ~7 steps (`--text-xs` 12px → `--text-3xl`). Collapse
     13/15/17px into neighbours.
   - One fluid heading formula per heading level, not six.
   - `--radius-sm` (8px), `--radius` (12px), `--radius-pill` (999px).
   - `--focus-ring`, built on the accent pink, used everywhere.
   - `--surface-hover` to replace the four off-whites.
2. **Convert hardcoded values to token references** - start with `index.html`,
   which holds ~44% of them.
3. **Consolidate components.** `.button` is currently defined 6 separate times
   across files; `.card`, `.service-card`, `.project-card` and `.snapshot-card`
   are four card treatments with no shared base. They match today; nothing
   enforces that they keep matching. Define once, extend with modifiers.
4. **Add `docs/design-system.md`** recording the scales and the rule: new UI uses
   tokens, and a new raw value means the scale needs a considered addition.

Do this before Phase 5 - the layouts should be built against a finished token
set, not refactored into one afterwards.

## Phase 5 - Templating (Eleventy)

Justification: ~2,000 lines of duplicated inline CSS across 12 files, design
tokens redeclared 12 times, and `<head>` blocks (CSP, fonts, meta, JSON-LD)
repeated in full on every page.

Inline `<style>` line counts:

```
index.html                                710
motoru.html                               401
evpicker/index.html                       359
ai-overview.html                          218
supplie.html                              184
rapid-ai-prototyping.html                 128
```

Against only 156 lines currently extracted into
`case-study-base.css` + `project-tabs.css`.

Proposed structure:

```
src/
  _includes/
    layouts/base.njk        - head, CSP, fonts, nav, footer
    layouts/case-study.njk  - extends base, adds tabs + prev/next
    layouts/service.njk
    partials/nav.njk
    partials/footer.njk
  _data/projects.json       - drives homepage cards AND prev/next links
  assets/css/tokens.css     - full token set from Phase 4, declared once
  assets/css/base.css
```

Output stays static HTML; Vercel config is unchanged.

**Fixes as a side effect: case study pages currently have no site navigation.**
`site-nav.js` is referenced only by `index.html`. Subpages get a logo and a
"← Back" link and nothing else - no route to Services or Contact from the
bottom of a case study. A shared layout puts the nav and a footer CTA on every
page in one change.

---

## Not broken - leave alone

Worth stating explicitly so none of this gets "fixed":

- Content-Security-Policy is present and sensible on all 12 pages
- 38/38 images have alt text
- One `<h1>` per page; heading hierarchy is clean
- Design tokens are identical across all 12 files (no drift except `maincode/`)
- `llms.txt` and `robots.txt` are present and correct
- Meta/OG/Twitter tags are complete and consistent
- `skip to content` link on the homepage
