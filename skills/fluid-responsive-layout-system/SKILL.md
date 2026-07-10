---
name: fluid-responsive-layout-system
description: Build truly fluid, precise responsive layouts using clamp()-based typography and spacing, container queries, and an intentional breakpoint strategy — instead of the common shortcut of just scaling a desktop design down at 2-3 fixed breakpoints. Use whenever the user wants a site to be "responsive", "look good on every screen", "fluid", or asks to fix layout breaking/overflow at certain widths. Foundational for any portfolio or section skill — apply this before layering animation on top.
---

# Fluid Responsive Layout System

Most "responsive" sites are actually just 3 fixed layouts (mobile/tablet/desktop) with jumps between them. True fluid design scales continuously across every width in between, with no visible "snap" points except where the layout genuinely needs to restructure (e.g. grid columns 3→2→1).

## 1. Fluid typography with `clamp()` — the foundation

```css
:root {
  /* clamp(min, preferred, max) — preferred uses viewport width so it scales continuously */
  --fs-h1: clamp(2.25rem, 1.5rem + 3.5vw, 5.5rem);
  --fs-h2: clamp(1.75rem, 1.2rem + 2vw, 3.25rem);
  --fs-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --fs-small: clamp(0.8rem, 0.78rem + 0.1vw, 0.95rem);
}
h1 { font-size: var(--fs-h1); }
```
Calculate the "preferred" middle value with this formula so scaling actually feels linear between your min/max viewport targets, rather than guessing:
```
slope = (maxFontSize - minFontSize) / (maxViewport - minViewport)
preferred = minFontSize - (minViewport * slope) + (slope * 100)vw
```
Example: 18px at 375px viewport → 20px at 1440px viewport: slope = (20-18)/(1440-375) = 0.00188; intercept = 18 - 375*0.00188 = 17.3; result: `clamp(1.125rem, 1.08rem + 0.19vw, 1.25rem)`. Don't hand-wave these numbers — compute them, or use a fluid-type calculator (e.g. utopia.fyi) and paste the exact output.

## 2. Fluid spacing (same technique, applied to margins/padding/gaps — not just type)

```css
:root {
  --space-xs: clamp(0.5rem, 0.4rem + 0.4vw, 0.75rem);
  --space-sm: clamp(1rem, 0.8rem + 0.8vw, 1.5rem);
  --space-md: clamp(2rem, 1.5rem + 2vw, 3.5rem);
  --space-lg: clamp(3rem, 2rem + 4vw, 6rem);
  --space-section: clamp(4rem, 3rem + 6vw, 10vw);
}
section { padding-block: var(--space-section); }
.stack > * + * { margin-top: var(--space-sm); }
```
This eliminates the classic bug where a design looks perfectly spaced at 1440px and 375px but cramped or bloated at 800px — because spacing scales with the viewport instead of jumping between two fixed values.

## 3. Container queries — component-level responsiveness, not just page-level

```css
.card-grid { container-type: inline-size; container-name: card-grid; }
@container card-grid (min-width: 480px) {
  .card { grid-template-columns: 120px 1fr; }
}
@container card-grid (min-width: 800px) {
  .card { grid-template-columns: 200px 1fr; }
}
```
Use container queries (not just `@media`) for any component that can appear in different-width contexts — a sidebar card and a full-width card need different internal layouts even at the *same* viewport width, which `@media` alone cannot express.

## 4. Intentional breakpoint strategy (restructure only where content genuinely demands it)

```css
/* Don't use arbitrary device-name breakpoints (iPhone/iPad widths) — use content breakpoints */
.work-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr)); gap: var(--space-md); }
```
`auto-fit` + `minmax(min(100%, 320px), 1fr)` gives a grid that naturally reflows from 1 to N columns with zero explicit breakpoints — reserve real `@media`/`@container` breakpoints for structural changes CSS grid alone can't express (e.g. switching a nav from horizontal to a hamburger menu).

## 5. Fluid images and media

```css
img, video { max-width: 100%; height: auto; display: block; }
.hero-media { aspect-ratio: 16 / 9; object-fit: cover; }
```
Always set `aspect-ratio` (or explicit `width`/`height` attributes) on images/video to reserve layout space before the asset loads — prevents cumulative layout shift, which also desyncs any `ScrollTrigger` instances measured before the image finished loading.

## 6. `clamp()` for layout dimensions too, not just type/spacing

```css
.sidebar { width: clamp(240px, 20vw, 340px); }
.content-max { max-width: min(90vw, 1200px); margin-inline: auto; }
```

## Critical correctness rules

1. Never hand-write a `clamp()` "preferred" value by guessing — compute the slope/intercept as shown, or the scaling rate will visibly kink at your min/max boundaries.
2. Always pair fluid type/spacing with a sensible `max-width` reading measure (`max-width: 65ch` on body text) — fluid font-size alone doesn't fix line length on ultra-wide monitors.
3. Test every fluid value at the *minimum* and *maximum* viewport, not just common device widths — clamp values can look fine at 375/768/1440 but overflow or collapse at 320px or 2560px if the min/max bounds weren't chosen deliberately.
4. Use `dvh` (dynamic viewport height) instead of `vh` for full-height sections on mobile — `100vh` is famously wrong on mobile Safari/Chrome because it doesn't account for the address bar showing/hiding.
5. Re-run any GSAP `ScrollTrigger.refresh()` (see `gsap-scrolltrigger-effects` skill) after fluid layout reflow on resize/orientation change, since scrubbed/pinned triggers measure real pixel positions that shift when fluid values recompute.
