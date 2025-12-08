# Front-end Design Guide (High Level)

This file sets the **visual direction** for the `matt-portfolio` site. Layouts and components are free to evolve, but changes should stay consistent with these rules.

---

## 1. Overall principles

- **Fun, confident, experimental — but calm and readable.**
- **Content-first** single-page narrative; copy and projects lead the design.
- **Production-ready feel** without visual noise.

When in doubt: simpler, clearer, fewer things on screen at once.

---

## 2. Layout & spacing

- **Mobile-first**, centred column with comfortable max-width (~1040–1200px).
- Generous white space between sections; let content breathe.
- Inside sections, group related items tightly and separate unrelated items with space.
- Grids may reflow freely; maintain consistent gaps and a shared family look.

---

## 3. Typography

- System fonts only: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- Clear hierarchy with 3–4 sizes (h1, h2, h3, body).
- Relaxed line-height for readability; left-align longer copy.
- Limit font-weight/size variations; every new style should earn its keep.

---

## 4. Colour & theme

- **Light background** (off-white or very light grey).
- **Cards** use subtle borders or light fills; no heavy slabs.
- **Primary accent:** clean blue (Tailwind-style), used for key actions/links.
- Muted greys for secondary text and meta; maintain strong contrast overall.

---

## 5. Shapes, cards & components

- Soft, rounded rectangles; gentle shadows or light borders.
- Buttons: simple, rounded; primary = filled blue, secondary = outline/ghost.
- Tags/chips: small, neutral pills for metadata.
- Project cards: grid on desktop, stacked on mobile.

---

## 6. Interaction & motion

- Smooth scrolling to anchors.
- Clear hover/focus states on all interactive elements; keep motion minimal and purposeful.

---

## 7. Accessibility & readability

- Logical heading levels (one h1, then h2/h3 in order).
- Keyboard-friendly navigation and visible focus states.
- Strong enough colour contrast; don’t rely on colour alone for meaning.

---

## 8. Dos & Don’ts

**Do:** use this guide and `AGENT_NOTES.md` as constraints; keep design decisions consistent; refine spacing/layout over time; keep the page easy to skim.

**Don’t:** add new fonts or external assets; pile on colours or heavy decoration; over-animate; drift from the light, minimal direction.
