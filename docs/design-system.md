# Design system

The single source of truth for visual decisions. If a value isn't here, it
doesn't go in the CSS — extend this document first.

Implemented in `assets/css/tokens.css`, declared once on `:root`.

---

## Why this exists

The site previously had 24 tokens covering colour, radius, shadow and
max-width — but **no spacing scale and no type scale**. New UI drifted because
there was no token to reach for; a raw px value was the only option. The audit
found 25 distinct spacing values, 23 distinct font sizes, and 62 hardcoded hex
values outside `:root`.

---

## Global Styles

Every page must include the global image reset:

```css
img {
  max-width: 100%;
  height: auto;
}
```

Image `width` and `height` attributes and this CSS reset are a pair. The
attributes reserve the intrinsic aspect ratio to prevent layout shift; the CSS
lets images scale down responsively without using the attribute height as a
fixed rendered height. Never add one without the other.

Fixed-format image containers, such as square project-card thumbnails, may add
a scoped override when the image is deliberately controlled by the container.

---

## Colour

```css
--bg:             #f4f1ec;  /* page background, warm off-white */
--card:           #ffffff;  /* raised surfaces */
--surface-hover:  #ede9e3;  /* hover state on cards and ghost buttons */
--surface-alt:    #f0ede7;  /* subtle alternate panel */
--text:           #0f172a;
--muted:          #64748b;  /* meta labels, captions */
--line:           #e2e8f0;  /* borders and dividers */
--accent:         #e90067;  /* primary — pink */
--accent-strong:  #cc005a;  /* hover/active on accent */
```

**The accent is `#e90067`.** An earlier version of the design guide specified
`#0d6efd` (blue). That was wrong. It is why focus rings across the site use
`rgba(13, 110, 253, …)`. Treat any occurrence of that blue as a bug.

`--surface-hover` and `--surface-alt` replace four near-identical untokenised
off-whites found in the audit (`#ede9e3`, `#f0ede7`, `#ebe8e1`, `#f8f8f6`).

Do not add brand colours without a clear reason. Greys carry structure, not
emphasis.

---

## Spacing

4px base. Use these and nothing else.

```css
--space-1:   4px;
--space-2:   8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-30: 120px;
```

Migration notes — the audit found these off-scale values in use:

| Found | Maps to | Confidence |
|---|---|---|
| 6px | `--space-2` (8px) | safe |
| 10px | `--space-3` (12px) | safe |
| 11px | `--space-3` (12px) | safe |
| 14px | `--space-4` (16px) | **check visually** — 49 uses, some will be deliberate |
| 18px | `--space-5` (20px) | check |
| 22px | `--space-6` (24px) | safe |
| 28px | `--space-8` (32px) | check |
| 52px | `--space-12` (48px) | safe |
| 56px, 60px | `--space-16` (64px) | safe |
| 72px | `--space-20` (80px) | safe |
| 88px | `--space-24` (96px) | safe |

14px is the one to be careful with — it's the second most common value on the
site and rounding all 49 instances blindly will shift layouts.

---

## Typography

Headings: **Bricolage Grotesque** (via Google Fonts, opsz 12..96, weights
400/600/800). Body: **Inter** (400–700), system sans fallback.

### Resolved font stack history

The heading stack previously included an unloaded `Bloc` fallback in 23 places:

```css
font-family: 'Bloc', 'Bricolage Grotesque', system-ui, sans-serif;
```

**`Bloc` is never loaded.** There is no `@font-face` rule, no local font file in
the repo, and it was absent from the Google Fonts request, which asked only for
`Bricolage Grotesque` and `Inter`. Visitors silently fell back to Bricolage
Grotesque unless they had Bloc installed locally, which could change rendering.

Headings now standardise on `'Bricolage Grotesque', system-ui, sans-serif`.

### Static scale

```css
--text-xs:   12px;  /* eyebrows, meta labels — use sparingly */
--text-sm:   14px;  /* captions, secondary UI */
--text-base: 16px;  /* body copy */
--text-lg:   18px;  /* lead paragraphs */
--text-xl:   20px;
--text-2xl:  24px;
--text-3xl:  32px;
```

The audit found 13px, 15px and 17px in use across ~20 instances. Collapse into
neighbours, but check each — some may be deliberate optical adjustments rather
than drift.

### Fluid headings

One formula per level. The audit found six near-duplicate `clamp()` values,
including `clamp(40px, 7vw, 60px)` and `clamp(40px, 7vw, 58px)` — a 2px
difference that was almost certainly accidental.

```css
--text-hero: clamp(40px, 7vw, 60px);  /* h1 */
--text-h2:   clamp(24px, 3.6vw, 32px);
--text-h3:   clamp(20px, 2.4vw, 24px);
```

Oversized display type (the `clamp(76px, 12vw, 120px)` on the fun page) is a
deliberate one-off. Keep it scoped to that page and comment it.

### Rules

- One `<h1>` per page. Logical descent — no skipped levels.
- Body line-height 1.6; headings 1.15–1.25.
- Body line length capped around 70 characters.

---

## Radius

```css
--radius-sm:   8px;
--radius:     12px;
--radius-pill: 999px;
```

`var(--radius)` already existed and is used 26 times, but `8px` was hardcoded
20 times alongside one-offs at 2, 6, 10, 11, 14 and 16px. Those one-offs go.
Circular avatars keep `50%`.

---

## Elevation

```css
--shadow:       0 10px 30px rgba(15, 23, 42, 0.08);
--shadow-hover: 0 12px 30px rgba(15, 23, 42, 0.10);
```

Two levels only. Cards rest at `--shadow` and lift to `--shadow-hover`.

---

## Focus

```css
--focus-ring: 0 0 0 3px rgba(233, 0, 103, 0.28);
```

**One focus treatment, everywhere.** The audit found four different
spread/opacity combinations, all built on the wrong blue. Every interactive
element gets `--focus-ring` on `:focus-visible`. Never remove focus styling
without a documented replacement.

---

## Components

Define once; extend with modifiers. `.button` was previously defined six
separate times across different files, and `.card`, `.service-card`,
`.project-card` and `.snapshot-card` were four independent card treatments
that happened to match. Nothing enforced that.

### Buttons

- `.button` — base. Pill (`--radius-pill`), `--space-3` / `--space-4` padding.
- `.button.primary` — solid `--accent`, white label.
- `.button.secondary` — outline, `--surface-hover` fill on hover.

Three variants maximum. `.button.contact-cta` currently exists as a fourth —
fold it into `.primary` with a layout modifier rather than a new variant.

### Cards

One base `.card`: `--card` background, `--line` border, `--radius`,
`--shadow`, generous internal padding. `.project-card`, `.service-card` and
`.snapshot-card` become modifiers that only change layout, never the surface
treatment.

---

## Layout

```css
--max-width: 900px;  /* case studies and prose */
```

Mobile first. Single main column, sections stacked vertically. No layout should
depend on large-screen behaviour to make sense.

---

## Accessibility

- Contrast: 4.5:1 body text, 3:1 large text and UI boundaries.
  `--muted` (#64748b) on `--bg` (#f4f1ec) passes for body size — verify before
  using it smaller than `--text-sm`.
- White on `--accent` passes at body size. Verify any new accent pairing.
- Visible focus on everything interactive.
- Semantic HTML before visual polish.
