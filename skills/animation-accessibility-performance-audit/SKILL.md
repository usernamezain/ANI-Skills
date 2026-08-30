---
name: ui:animation-audit
description: Audit and fix an animated site's accessibility (prefers-reduced-motion, keyboard/focus, screen-reader compatibility with split text and hover-only reveals) and performance budget (Lighthouse/CLS/long-tasks) before calling it finished. Use as a final pass after building any animated portfolio or section, or whenever the user asks to "make it accessible", "check performance", "improve Lighthouse score", or "fix accessibility issues".
---

# Animation Accessibility & Performance Audit

Heavily animated sites fail accessibility and performance audits in predictable, fixable ways. This is the checklist to run as a final pass, with the specific fix for each common failure.

## 1. `prefers-reduced-motion` — the single highest-impact fix

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
This CSS-only global override catches most simple CSS animations/transitions, but **GSAP timelines are not affected by CSS media queries** — they must be gated in JS too:
```js
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  gsap.set(".reveal", { opacity: 1, y: 0, clearProps: "all" }); // show final state instantly, skip the animation entirely
} else {
  gsap.from(".reveal", { y: 40, opacity: 0, duration: 0.8, scrollTrigger: { trigger: ".reveal", start: "top 85%" } });
}
```
For ambient/decorative-only motion (glow drift, marquee, cursor trail, parallax) — disable it entirely under reduced-motion rather than just shortening it; for *functional* motion (an accordion opening, a page transition) — keep it but make it instant/very short rather than removing it, since the state change itself still needs to communicate.

## 2. Screen-reader compatibility for split-text animations

Split-character/word text (from `text-motion-typography`) breaks screen reader announcement if left as-is — verify every instance follows this pattern:
```html
<h1 aria-label="Design that moves people.">
  <span aria-hidden="true"><span class="char">D</span><span class="char">e</span>...</span>
</h1>
```
Audit: search the codebase for any `splitText()` usage and confirm the parent has `aria-label` with the full plain string and the split container has `aria-hidden="true"`. This is the most commonly missed accessibility fix in animated portfolios.

## 3. Keyboard and focus audit

- Every hover-only interactive element (portfolio preview, tilt card, team card info reveal) needs a `:focus-visible` equivalent state, not just `:hover` — test by tabbing through the page with a mouse unplugged (or DevTools focus emulation).
- Custom cursor implementations must not interfere with native focus rings — verify `outline` isn't accidentally suppressed globally (`* { outline: none }` is a common but harmful shortcut); if a custom focus style is wanted, replace it deliberately rather than removing it.
- Modals/overlays (page transitions, mobile nav) must trap focus while open and return focus to the triggering element on close.
- Accordion (`smooth-accordion-faq-section`) and tabs (`stagger-reveal-blog-cards-section` filters) must be operable via Enter/Space and arrow keys where the pattern conventionally expects it (ARIA APG accordion/tabs patterns).

## 4. Performance budget checks

Run Lighthouse (mobile, throttled) and check specifically:
- **CLS (Cumulative Layout Shift)** — should be near 0. Common causes in animated sites: images/video without `aspect-ratio` reserved, web fonts swapping in and reflowing text after entrance animations already started (fix: use `font-display: optional` or delay entrance animations until `document.fonts.ready`), preloaders that remove themselves and cause a layout jump.
- **TBT (Total Blocking Time) / long tasks** — check for large synchronous work on load (e.g. building a huge three.js particle geometry, or running many `ScrollTrigger.create()` calls) blocking the main thread before first interaction; defer non-critical heavy setup with `requestIdleCallback` where reasonable.
- **LCP (Largest Contentful Paint)** — for hero sections with video/three.js backgrounds, ensure the actual LCP element (usually the hero heading or poster image) isn't delayed behind heavy JS initialization; load the visual foundation first, layer animation on top after.

## 5. GPU layer sanity check

Open DevTools → Layers panel (or Rendering → "Layer borders") and confirm the number of composited layers is reasonable — dozens of unnecessary layers from leftover `will-change` (per `buttery-smooth-120fps-performance`) increase GPU memory pressure and can *cause* the jank they were meant to prevent. Audit: search for `will-change` declarations that are permanent in CSS rather than toggled on/off around the actual animation.

## 6. Report format

Report as a pass/fail list with the specific fix applied, e.g.:
```
prefers-reduced-motion: FAIL → FIXED (added JS gate around 6 ScrollTrigger reveals + CSS override)
Split-text screen reader: FAIL → FIXED (added aria-label to 2 hero headings)
CLS: 0.21 → FIXED (added aspect-ratio to video-hero-bg, now 0.02)
Keyboard focus on portfolio grid: FAIL — no keyboard-accessible preview equivalent, needs follow-up
```

## Critical correctness rules

1. CSS `prefers-reduced-motion` overrides do not touch GSAP/JS-driven animation — always add the explicit `matchMedia` JS gate as well.
2. Never globally suppress focus outlines without providing a deliberate replacement — this is an accessibility regression disguised as a style choice.
3. Treat this audit as mandatory before considering an animated build "done," not an optional polish pass — several of these (reduced-motion, CLS, keyboard access) are baseline requirements, not extras.
