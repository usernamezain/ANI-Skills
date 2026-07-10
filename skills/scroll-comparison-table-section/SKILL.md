---
name: scroll-comparison-table-section
description: Build a feature-comparison section (plans/products side by side) where rows reveal progressively on scroll and a sticky header row stays visible while scrolling through a long table. Use whenever the user wants a "comparison table", "feature comparison", "compare plans", "vs table", or "side-by-side comparison section".
---

# Scroll Comparison Table Section

## Structure

```html
<section class="compare">
  <table class="compare-table">
    <thead class="compare-head">
      <tr><th>Feature</th><th>Starter</th><th>Pro</th><th>Team</th></tr>
    </thead>
    <tbody>
      <tr class="compare-row reveal"><td>Projects</td><td>3</td><td>Unlimited</td><td>Unlimited</td></tr>
      <tr class="compare-row reveal"><td>Team seats</td><td>1</td><td>5</td><td>Unlimited</td></tr>
      <tr class="compare-row reveal"><td>Priority support</td><td>—</td><td>✓</td><td>✓</td></tr>
      <tr class="compare-row reveal"><td>Custom domain</td><td>—</td><td>—</td><td>✓</td></tr>
    </tbody>
  </table>
</section>
```
```css
.compare-table { width: 100%; border-collapse: collapse; }
.compare-head th { position: sticky; top: 0; background: #0a0a0a; padding: 16px; z-index: 2; }
.compare-row td { padding: 16px; border-top: 1px solid rgba(255,255,255,0.1); }
```
`position: sticky` on the `<thead>` requires the *table's scroll container* (not necessarily the whole page) to be the one scrolling — if the table is short enough to fit the viewport this sticky header only matters within a scrollable wrapper (`.compare { max-height: 80vh; overflow-y: auto; }`) for long tables; for a normal page-length table, a page-level sticky nav is usually a better use of "sticky," and this table doesn't need `position: sticky` at all — only add it if the table itself scrolls independently.

## Row-by-row reveal on scroll

```js
gsap.from(".compare-row", {
  opacity: 0, x: -20, duration: 0.5, stagger: 0.08, ease: "power3.out",
  scrollTrigger: { trigger: ".compare-table", start: "top 80%" }
});
```

## Highlight the recommended column on scroll into view (draws eye to "Pro")

```js
gsap.to(".compare-table td:nth-child(3), .compare-table th:nth-child(3)", {
  backgroundColor: "rgba(124,58,237,0.12)",
  duration: 0.6,
  scrollTrigger: { trigger: ".compare-table", start: "top 75%" }
});
```

## Notes for the agent

- Only use `position: sticky` on the header row if the table has its own internal scroll container (`overflow-y: auto` with a `max-height`) — applying it to a `<thead>` inside a normally-flowing page has no visible effect since the whole page, not the table, is the scroll context.
- For mobile, long comparison tables usually need a horizontal-scroll wrapper (`overflow-x: auto`) around `.compare-table` with `white-space: nowrap` cells, or convert to a stacked-card layout below a breakpoint — don't let columns get so narrow they're unreadable.
- Keep semantic `<table>` markup (not styled `<div>` grids) for accessibility and correct screen-reader row/column announcement.
