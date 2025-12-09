# Front-end Design Guide (High Level)

This document defines the visual direction for the `matt-portfolio` site.

The goal is a **clean, modern, and friendly portfolio** that can support different Designer Engineer / product design / front-end applications over time. Layouts may evolve, but the look and feel should stay consistent with these principles.

---

## 1. Overall principles

- **Fun, confident, experimental**, but calm and professional.
- **Content-first** – copy and case studies matter more than decoration.
- **Single-page story** – the page should read as one continuous narrative, top to bottom.
- **Production-ready feel** – it should look like something you’d be happy to ship to real users.

When in doubt: simpler, clearer, fewer things on screen.

---

## 2. Layout & spacing

- Design **mobile-first**, then enhance for larger screens.
- Use a **centred content column** with a comfortable max-width (around 1040–1200px).
- Maintain consistent vertical rhythm:
  - Clear separation between sections (hero, about, projects, contact).
  - Inside a section, group related content tightly; separate unrelated content with space.
- Cards and components can change layout over time (e.g. one vs two columns), but:
  - Padding should remain generous.
  - Alignment should be clean (prefer left alignment for text).
  - Elements within a section should feel like part of the same family.

---

## 3. Typography

Current default:

- **Headings**: Fredoka (via Google Fonts).
- **Body & UI text**: Inter (via Google Fonts).

If fonts are changed in the future, keep the same roles: a slightly more characterful display face for headings and a very readable sans for body.

Guidelines:

- Use a clear hierarchy:
  - One `<h1>` for the main page title.
  - `<h2>` for section titles (About, Selected work, Contact).
  - `<h3>` or smaller for sub-headings inside sections (e.g. “Problem”, “Approach”).
- Body text:
  - Comfortable size (not tiny), with relaxed line-height (~1.5–1.7).
  - Left-aligned for longer paragraphs.
- Limit the number of font sizes and weights; avoid over-styling.

---

## 4. Colour & theme

- **Theme**:
  - Light background (off-white / very light grey).
  - Card surfaces with subtle borders or very soft shadows.
- **Accent colour**:
  - A single primary blue for:
    - Primary buttons.
    - Key links and highlights.
  - Secondary elements (borders, labels) should use neutral greys.

Guidelines:

- Maintain strong contrast for text (body text should always be easy to read).
- Avoid introducing multiple bright accent colours unless there is a clear, deliberate reason.
- Keep backgrounds mostly flat; use gradients and textures sparingly, if at all.

---

## 5. Components (patterns, not strict templates)

These patterns describe intent, not fixed layouts. Components can be re-arranged as long as they keep their role and clarity.

### Navigation bar

- Sticky bar at the top.
- Left: name and role (e.g. “Matt Grant — Product Design & Front-end”).
- Right: anchor links to main sections (About, Projects, Contact).
- Background: light, with a subtle divider below.
- Links should have clear hover and focus states.

### Hero / intro

- First section in the main content.
- Contains:
  - An eyebrow / label line (e.g. “Designer Engineer portfolio”).
  - A large, confident heading.
  - 1–2 concise paragraphs explaining what this page is and how you work.
  - Optional “hats” line summarising your roles.
  - 2–4 bullet points highlighting impact or strengths.
  - Primary and secondary CTAs (e.g. view projects, email).

### About

- Section that explains how you work and what you bring.
  - May use one or two columns on desktop; stacks to a single column on mobile.
  - Should include:
    - Short narrative copy (who you are, how you approach work).
    - A concise summary block (e.g. current snapshot, how you like to work, where you’re useful).

### Projects

- Section listing 2–4 key projects.
- Each project should be a clear, scannable card with:
  - Title.
  - Metadata (type, year, tech) as small labels or text.
  - Short labelled lines for: Problem, Approach, Outcome, My role.
  - Optional screenshot area or link.
  - CTA buttons for “Live demo” and/or “Code / repo” if applicable.

Projects can be laid out in a vertical stack or simple grid, but they should be easy to skim and visually consistent.

### Contact

- Section inviting the reader to get in touch.
  - Should include:
    - A short, direct CTA (e.g. “Let’s talk about what you’re building.”).
    - A primary “Email me” button.
    - A small details list (email, LinkedIn, GitHub, availability).

### Footer

- Simple line with © year and name, plus a “Back to top” link.

---

## 6. Interaction & motion

- Use smooth scrolling for in-page anchors where supported.
- All interactive elements (nav links, buttons, etc.) must have:
  - Hover states.
  - Visible focus states (do not remove outlines).
- Motion should be subtle and purposeful:
  - Small colour or elevation changes on hover.
  - No large continuous animations or parallax.

---

## 7. Accessibility & readability

- Maintain semantic HTML and logical heading levels.
- Ensure keyboard navigation works.
- Maintain sufficient colour contrast for text and UI elements.
- Do not rely on colour alone to convey meaning.

---

## 8. Flexibility & evolution

- Layouts, grouping, and component arrangements may change over time as the portfolio evolves.
- New sections (e.g. skills, writing, experiments) can be added if needed, as long as:
  - The core story (who you are, selected work, contact) stays clear.
  - The visual language in this document is respected.
- If major visual changes are required (new theme, new typography, etc.), update this guide first and then adjust `index.html` to match.
