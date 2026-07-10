# Design Seek: Awwwards

## Visual Language
- **Vibe:** Award-Winning, Organic, Studio-Quality, Creative Agency Premium
- **Color Palette:** Dark base (`#0a0a0a`) with warm cream/off-white (`#f5f0e8`) typography. Selective single saturated color accent per design (electric blue `#1a6eff` or ochre `#d4a853`). Never more than 2 saturated colors in the entire page.
- **Textures:** SVG `feTurbulence` noise grain at `opacity: 0.12` — subtle but physical. Applied with `mix-blend-mode: overlay` on a fixed `::after` layer spanning the viewport.
- **Typography:** Display-scale serif (`Cormorant Garamond`, `Playfair Display`) for hero statements at `clamp(4rem, 9vw, 9rem)`. UI text in a neutral geometric sans (`Inter`, `DM Sans`). The contrast between the two typefaces IS the design.
- **Spacing:** Maximal. `py-32` to `py-64` between sections. Elements must breathe. Never feel cramped.

## Key Interactions & Physics

1. **Custom Mix-Blend-Difference Cursor:**
   - A `div` that's pure white (`bg-white`) follows mouse with `useMotionValue` + `useSpring`.
   - `mix-blend-difference` mode makes it appear as inverse of the background — black on white, white on black.
   - Spring physics: `stiffness: 350, damping: 28` — responsive but slightly laggy for personality.
   - Size: 24×24px default, scales to 80×80px on hovering over links/buttons using `whileHover`.

2. **ScrollTrigger Typography Blur Reveal (`TypeReveal`):**
   - Each character or word starts at `filter: blur(8px) opacity: 0 translateY(20px)`.
   - GSAP timeline stagger `0.03s` per character, easing `power3.out`, duration `0.6s` per character.
   - Trigger: `start: "top 80%"` — begins revealing as the section scrolls into view.

3. **Parallax Gallery (3 Columns):**
   - Column 1: `y: 0 → -120px` (moves up as scroll progresses).
   - Column 2: `y: 0 → +60px` (moves down — opposing motion).
   - Column 3: `y: 0 → -80px` (moderate upward).
   - All driven by `useScroll` + `useTransform` with `scrollYProgress: [0, 1]` range.

4. **Horizontal Feature Scroll:**
   - `useScroll` with `target: sectionRef, offset: ["start end", "end end"]`.
   - `useTransform(scrollProgress, [0, 1], ["0%", "-66.66%"])` on the inner strip `x`.
   - Lenis must be active for this to feel natural — native scroll makes it stuttery.

## Grain Overlay Recipe

```html
<!-- Fixed grain layer, above everything at z-50 but pointer-events-none -->
<svg style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:50;pointer-events:none;opacity:0.12;mix-blend-mode:overlay;">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#grain)"/>
</svg>
```
