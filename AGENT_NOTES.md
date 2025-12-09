# AGENT_NOTES

These notes describe how AI agents and humans should work in this repo.

The goal of this project is a **single-page portfolio** for product design / front-end / “Designer Engineer” roles. It should be easy to read, fork, and edit. The code should stay simple and production-ready.

---

## 1. Files and structure

Core files:

- `index.html` – the actual site (HTML + CSS + minimal JS in a single file).
- `README.md` – public-facing repo info.
- `AGENT_NOTES.md` – these rules.
- `front_end_design.md` – visual design and UX principles.
- Optional:
  - `assets/` – images, SVGs, or other static assets, if needed.

**Do not** introduce build tools or a complex folder structure. This repo should remain a small, readable static site.

---

## 2. General guidelines

- Keep the project **company-agnostic**. The content may mention specific roles or applications, but the structure and docs should not hard-code any particular company.
- Aim for **clarity, stability, and small iterations**. Prefer small, well-defined changes over large rewrites.
- The page is primarily for **desktop and mobile web**, no special support for legacy browsers is required.

---

## 3. Editing rules for AI agents

When editing this repo:

1. **Always read** `AGENT_NOTES.md` and `front_end_design.md` before changing `index.html`.
2. Assume that:
   - `index.html` is the single source of truth for the site.
   - All styling lives inside a single `<style>` block in `index.html`.
   - Any JavaScript lives inside a single `<script>` block at the bottom of `index.html`.

3. You MAY:
   - Refactor HTML structure for better semantics and accessibility.
   - Adjust layout, spacing, and component structure while respecting the design guide.
   - Update copy, links, and content placeholders when explicitly asked.
   - Add small utility assets (e.g. SVGs) under an `assets/` folder.

4. You MUST NOT:
   - Add build tooling (no Webpack, Vite, parcel, etc.).
   - Introduce frameworks (no React, Vue, Tailwind, Bootstrap, etc.).
   - Create additional HTML entry points (keep it single-page).
   - Add heavy or unnecessary JavaScript.
   - Remove core sections of the page (navigation, hero/intro, about, projects, contact, footer) unless explicitly requested.

5. Keep changes **minimal and reversible**:
   - Avoid large CSS rewrites unless explicitly asked.
   - Preserve class names and structure where possible to keep diffs readable.
   - If a change is experimental or risky, leave a short comment explaining it.

---

## 4. HTML, CSS, and JS expectations

- **HTML**
  - Use semantic elements: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, etc.
  - Ensure heading levels are logical (one `<h1>`, then `<h2>`, `<h3>` as needed).
  - Accessible anchor links for navigation; ensure IDs exist for in-page links.

- **CSS**
  - Keep all CSS in a single `<style>` block in `index.html`.
  - Favour readability over clever hacks.
  - Avoid deeply nested selectors; keep specificity manageable.
  - Prefer CSS for smooth scrolling and simple states where possible.

- **JavaScript**
  - Only use JS for very small enhancements (e.g. current year in footer, smooth-scroll polyfill if needed).
  - Do not depend on external JS libraries.
  - Put all JS in one `<script>` block at the end of the `<body>`.

---

## 5. Layout and content flexibility

- The site should always have:
  - A top navigation bar with anchor links.
  - A hero/intro section that clearly states who this is for and what the reader will find.
  - An about/working-style section.
  - A projects/case-study section (2–4 key projects).
  - A contact/CTA section and a footer.

- Layouts can evolve:
  - Cards, grids, and columns can be rearranged as long as the reading order remains clear.
  - Sections can be merged or split to improve UX, as long as the above core content still exists.

- Design decisions (spacing, fonts, colour, etc.) should follow `front_end_design.md`. If a change requires bending those rules, update that document first.

---

## 6. Commit hygiene

For humans and agents:

- Make small, purposeful commits with clear messages.
- Avoid bundling unrelated changes together (e.g. copy tweaks + large CSS rewrite).
- When in doubt, prefer a smaller, clearly described change over a big redesign.
