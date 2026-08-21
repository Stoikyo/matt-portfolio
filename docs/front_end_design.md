# front_end_design.md

## Purpose

Design principles for matthewgrant.co. This document sets **direction and
intent**. It does not specify values — those live in `docs/design-system.md`,
which is the source of truth for colour, spacing, type, radius and elevation.

If a design decision requires bending these principles, update this document
first.

> **Rewritten Aug 2026.** The previous version specified a blue accent
> (`#0d6efd`) that the site has never used, named Fredoka as the heading font
> (the site uses Bricolage Grotesque), and described a single-page
> portfolio aimed only at design roles. Both were stale. The blue is the direct
> cause of the off-brand focus rings found across the site.

---

## What the site is

A portfolio and services site serving two audiences roughly equally:
prospective clients for freelance and consulting work, and hiring teams for UX
design, product design, AI engineering/design, and founder roles.

**One positioning, not four.** The through-line is: *takes an ambiguous problem
and gets a working thing in front of real users, fast.* Audiences differ in the
evidence they want — engagement shape for clients, depth and history for hiring
teams — not in the claim being made. Resist writing parallel pitches; it
produces mush.

The site should read quickly, show how Matt thinks, and feel like it was built
by someone who cares about design and engineering equally.

---

## Principles

1. **Clarity over cleverness.** Everything scans. No decoration that makes
   reading harder.

2. **Typography does the heavy lifting.** Headings carry the hierarchy. Body
   copy is comfortable — sensible line length and line height.

3. **One mental model.** Sections stack vertically in a single main column.
   Repeated patterns behave identically wherever they appear.

4. **Minimal, confident UI.** Few variants — one card treatment, one primary
   button, one secondary. Avoid UI for its own sake: extra borders, panels,
   badges.

5. **Mobile first.** Decisions start small and scale up. Nothing should depend
   on large-screen behaviour to make sense.

6. **Fast.** Weight is a design concern, not an engineering afterthought. Images
   compressed and correctly sized; nothing decorative that costs a megabyte.

7. **Accessible by default.** Visible focus, sufficient contrast, semantic HTML
   before visual polish.

8. **Consistency is enforced, not remembered.** Every visual decision comes from
   the token set. A new raw value means the scale needs a considered addition —
   not a one-off.

---

## Visual character

Warm and confident rather than clinical. The background is a soft off-white
with warmth in it, not a cold grey. The accent is a strong pink (`#e90067`) used
sparingly and with intent — primary actions, key links, focus states. Greys
carry structure, never emphasis.

Headings use Bricolage Grotesque: tall, condensed and confident, doing most of the visual
work. Body uses Inter, quiet and readable.

Cards are soft-radius with a light border and subtle shadow. Generous internal
spacing, but not wasteful. The same card treatment applies everywhere —
projects, services, snapshots.

Do not introduce additional brand colours without a clear reason.

---

## Content responsibilities

**Hero** — states what Matt does and why the page exists, in a way that lands
for both a prospective client and a hiring manager. One or two clear CTAs.

**Services** — two offers: AI consulting/automation, and rapid prototyping.
Each should let a prospect self-qualify on scope and engagement shape.

**Projects** — case studies following Problem → Approach → Outcome → My role.
Outcomes need evidence: what was tested, with whom, what happened. Live demo and
code links where they exist.

**About** — how Matt works, not a life story. A compact snapshot of where he's
most useful.

**Contact** — one clear CTA, key links, and a current availability signal.

---

## What this document should not do

- Lock in pixel values, padding or grid configurations — that's
  `docs/design-system.md`.
- Describe class names, component APIs or file structure — that's
  `docs/AGENT_NOTES.md`.
- Attempt to cover every CSS decision.
