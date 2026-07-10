# Design Seek: Swiss Style

## Visual Language
- **Vibe:** International Typographic Style, Grid-Worship, High-Contrast Brutalist-Refined, Design Studio Authority
- **Color Palette:** Black (`#0a0a0a`), White (`#ffffff`), and ONE accent — classic Swiss uses red (`#ff3300`) exclusively. Never more than 3 colors. The grid structure IS the design. Color is used only to punctuate it.
- **Textures:** No textures. Swiss style is about purity of form. Grid lines and whitespace create all visual rhythm.
- **Typography:** Massive uppercase tracking (`letter-spacing: 0.1em` to `0.2em`) for display. Sizes pushed to extremes: `text-[9rem]` or `clamp(5rem, 12vw, 12rem)`. Headline font: `Helvetica Neue` or `Neue Haas Grotesk`. Sub-text in a complementary serif italic for contrast.
- **Grid Architecture:** Visible structural grid lines using `border-black/10` `div` elements and `w-[1px]` vertical columns that divide the layout. The grid is not decoration — it IS the layout system made visible.

## Key Interactions & Physics

1. **GSAP Load Sequence (Skew Reveals):**
   - Typography enters with `gsap.from({ y: 80, skewY: 5, opacity: 0 })` → `{ y: 0, skewY: 0, opacity: 1 }`.
   - Stagger `0.1s` per element. Duration `0.8s`. Ease `power4.out`.
   - Grid border lines animate `scaleX: 0 → 1` simultaneously using `transform-origin: left`.
   - Total choreography finishes in `~1.2s` — disciplined, not playful.

2. **3D Interactive Image (`@react-three/drei Image`):**
   - A `<Image>` component (Drei) renders the hero image as a WebGL plane.
   - On mouse hover: `THREE.MathUtils.damp(material.zoom, 1.3, 0.1, delta)` — smoothly zooms the texture.
   - On mouse leave: damps back to `zoom: 1.0`.
   - `grayscale: 1 → 0` on hover: image transitions from B&W to full color using the `<Image grayscale>` prop.
   - The effect feels like a gallery photograph "activating" when touched.

3. **Lenis Smooth Scroll:**
   - `duration: 1.4`, `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
   - Swiss style demands deliberate, unhurried scroll — never laggy, never instant.

4. **CSS Marquee Bottom Band:**
   - `background: #ff3300` (the single accent color).
   - White text in all-caps uppercase, spaced.
   - `@keyframes scroll-left { to { transform: translateX(-50%); } }` at `20s linear infinite`.
   - No interaction — purely decorative rhythm at the bottom of the viewport.

## Grid Anatomy

```
[Left Gutter | Col 1 | Col 2 | Col 3 | Col 4 | Right Gutter]
    4vw       16.5%   16.5%   16.5%   16.5%     4vw
```
- Vertical `1px` lines at each column edge: `position: absolute`, `top: 0`, `bottom: 0`, `width: 1px`, `background: rgba(0,0,0,0.08)`.
- Horizontal baseline: single `1px` line at `50vh` — anchors the typographic hierarchy visually.
