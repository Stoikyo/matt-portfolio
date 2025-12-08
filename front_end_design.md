# Front-end Design Guide (High Level)

This file sets the **visual direction** for the `matt-portfolio` site.  
Layouts and components are free to evolve, but changes should stay consistent with these rules.

---

## 1. Overall principles

- **Fun, confident, experimental** – but still calm and professional.
- **Content-first** – copy, structure, and projects matter more than decoration.
- **Single-page story** – the page should read as one continuous narrative, not a collection of unrelated blocks.
- **Production-ready feel** – it should look like something you’d be happy to ship to real users.

When in doubt: simpler, clearer, fewer things on screen at once.

---

## 2. Layout & spacing

- Design **mobile-first**, then enhance for larger screens.
- Use a **centred content column** with generous side padding on all devices.
- Maintain a consistent vertical rhythm:
  - Sections separated by clear vertical space.
  - Inside a section, group related content tightly and separate unrelated content with space.
- Cards and containers are allowed to change shape/layout over time, but:
  - Keep padding comfortable.
  - Keep edges soft (rounded) and avoid harsh, cramped boxes.
- Grids (e.g. multiple projects) can reflow or change column counts over time, as long as:
  - Items feel like part of the same family.
  - There’s consistent gaps between them.

---

## 3. Typography

- Use system fonts only:

  `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

- Maintain a clear hierarchy:
  - One clear **page title** (h1).
  - Section titles as **h2**.
  - Subtitles / subheadings as **h3** or smaller.
- Body text:
  - Comfortable size (not tiny), with relaxed line-height.
  - Left-aligned by default for long copy.
- Limit the number of font sizes and weights; avoid endless variations.

Rule of thumb: if you add a new text style, ask “does this actually help hierarchy?”.

---

## 4. Colour & theme

- Keep a **dark or mid-dark background** with light text.
- Use **one primary accent colour** (teal / aqua is fine) for:
  - Primary actions (main buttons).
  - Important links and highlights.
- Keep the rest of the palette muted:
  - Greys and subtle shades for surfaces, borders, and dividers.
- Maintain good contrast:
  - Text must always be easily readable.
  - Don’t rely on very low-contrast text for essential information.

Avoid adding new strong accent colours unless there’s a clear, deliberate reason.

---

## 5. Shapes, cards & components

- Prefer **rounded rectangles** for cards and buttons, not sharp corners.
- Surfaces:
  - Use slight elevation or contrast between background and content cards.
  - Shadows and borders should be subtle, not loud.
- Buttons:
  - Should look obviously interactive.
  - Primary button: filled with accent colour.
  - Secondary button: outline or muted background.
- Tags/chips:
  - Small, pill-shaped labels.
  - Used for metadata (type, year, tech, etc.).
  - Lightweight, not dominant.

The exact layout of hero/about/projects/contact can change over time, but keep them visually coherent and related through these shapes and styles.

---

## 6. Interaction & motion

- Use **smooth scrolling** for in-page navigation.
- All interactive elements (links, buttons, nav items) must have:
  - Hover states.
  - Visible focus states (no removing outlines).
- Keep motion subtle:
  - Small colour or elevation shifts on hover.
  - Avoid big, constant animations or distracting effects.

If an animation doesn’t clearly help understanding or feedback, skip it.

---

## 7. Accessibility & readability

- Keep heading levels logical (one h1, then h2/h3 in order).
- Ensure keyboard navigation works for all interactive elements.
- Maintain sufficient colour contrast for text and key UI elements.
- Don’t encode meaning in colour alone; use text, icons, or layout as well where needed.

---

## 8. Dos & Don’ts

**Do:**

- Use this guide and `AGENT_NOTES.md` as constraints for future changes.
- Keep design decisions consistent across sections.
- Refine spacing and layout over time without changing the core visual language.
- Make it easy for a reviewer to skim and understand the page quickly.

**Don’t:**

- Introduce new fonts, frameworks, or wild visual styles.
- Add lots of new colours or heavy decorative elements.
- Over-animate the page.
- Turn the page into something unrecognisable from the current aesthetic.
