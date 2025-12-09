# front_end_design.md

## Purpose

This repo contains a **single-page portfolio** for Matt Grant, aimed at Designer Engineer / product design / front-end roles.

The goal: a page that reads quickly, shows how I think, and feels like it was built by someone who cares about both design and engineering.

This document sets **design principles and foundations**. It should guide implementation, not prescribe exact layouts or components.

---

## Design principles

1. **Clarity over cleverness**  
   - Everything should be easy to scan.  
   - No decorative patterns that make reading harder.

2. **Typography is the main design tool**  
   - Headings do most of the visual heavy lifting.  
   - Body copy should be comfortable to read (line length, line height).

3. **One simple mental model**  
   - Sections are stacked vertically in a single main column.  
   - Repeated patterns (cards, headings, buttons) should behave consistently.

4. **Minimal, confident UI**  
   - Few variants: one card style, one primary button, one secondary/ghost.  
   - Avoid “UI for the sake of UI” (extra borders, panels, or badges).

5. **Mobile first**  
   - Layout decisions start from small screens and scale up.  
   - No layout should rely on large-screen tricks to make sense.

6. **Accessible by default**  
   - Respect sensible colour contrast.  
   - Focus states must be visible.  
   - Semantic HTML comes before visual polish.

---

## Visual foundations

These are **constraints**, not finished designs.

### Colour

- Light theme with a soft, neutral background.  
- Single primary accent: `#0d6efd` (blue).  
- Greys are quiet and used for structure, not drama.  
- Do not introduce extra brand colours without a clear reason.

### Typography

- Headings use **Fredoka** (bold, friendly, confident).  
- Body text uses **Inter** (or system sans fallback).  
- Hierarchy should be obvious:
  - Hero H1  
  - Section H2  
  - Card/Project H3  
- Avoid micro text except where it really adds value (eyebrows, meta labels).

### Components (at a principle level)

- **Cards**  
  - Soft radius, light border, subtle shadow.  
  - Internal spacing feels generous but not wasteful.  
  - Same card treatment across hero, about, projects, and contact.

- **Buttons**  
  - Primary: solid blue, pill-shaped, readable label.  
  - Secondary: outline/ghost with subtle hover fill.  
  - No more than these two variants.

---

## Content & structure

These are **content responsibilities**, not final layouts.

- **Hero**  
  - Clearly states what I do and why this page exists.  
  - Includes the “three hats” line (founder / product designer / front-end).  
  - One or two clear CTAs (view projects, email).

- **About**  
  - Explains how I work, not my whole life story.  
  - Includes a compact “snapshot” of where I’m most useful.

- **Projects**  
  - 2–3 mini case studies only.  
  - Each uses: **Problem → Approach → Outcome → My role**.  
  - Optional links for live demo / code where appropriate.

- **Contact**  
  - One clear CTA to email me.  
  - Simple list of key links (email, LinkedIn, GitHub, availability).

---

## What this document should NOT do

- It should **not** lock in exact padding, pixel values, or grid configurations.  
- It should **not** describe component APIs, class names, or file structures in detail.  
- It should **not** try to cover every CSS decision.

The actual HTML/CSS implementation will evolve through `index.html` and code review, as long as it honours these principles and foundations.
