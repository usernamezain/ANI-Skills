# Design Seek: Sketchy Nav

## Visual Language
- **Vibe:** Hand-Drawn, Indie Maker, Playful, Organic, Anti-Corporate
- **Color Palette:** Off-whites and warm grays for backgrounds. Near-black (`#1a1a1a`) for text (softer than pure `#000` — more "pencil" than "ink"). Bright yellow (`#FDE047` / `yellow-300`) for the highlighter stroke. Never use blue or purple — they feel digital. Yellow and near-black only.
- **Shapes:** Intentionally imperfect. Containers use `rounded-[4px]` or `rounded-sm`, NOT `rounded-full`. The nav container itself may have a slight `rotate(-0.5deg)` transform to feel hand-placed on the page.
- **Typography:** A handwritten Google Font is mandatory. Options in priority order: `Caveat` (most natural), `Patrick Hand` (more legible), `Permanent Marker` (most dramatic). Load via `next/font/google` or `@import`.

## Key Interactions & Physics

1. **Dual-Layer SVG Scribble (Core Interaction):**
   - The active indicator is NOT a `div` with a background. It is an `<svg>` with TWO `<motion.path>` elements absolutely positioned below the nav item text.
   
   - **Path 1 — Yellow Highlighter:**
     - `stroke="#FDE047"`, `strokeWidth="8"`, `strokeLinecap="round"`, `fill="none"`
     - `pathLength: 0 → 1` over `duration: 0.35s` with `ease: "easeOut"`
     - Imperfect wavy `d` value: `"M 5,12 Q 20,9 40,13 Q 60,17 80,12 Q 95,8 110,14"`
   
   - **Path 2 — Black Pencil Outline:**
     - `stroke="#1a1a1a"`, `strokeWidth="1.5"`, `strokeLinecap="round"`, `fill="none"`
     - `pathLength: 0 → 1` over `duration: 0.4s` with `delay: 0.1s`
     - Slightly different `d` value than path 1 for a "traced over" look
   
   - On deactivation: `pathLength: 1 → 0` — the scribble erases itself.

2. **Hover State — Pencil Mark:**
   - On hover, a third very faint path with `opacity: 0.2` appears — like a light pencil pre-mark before you draw. Animates `pathLength: 0 → 0.6`.
   - Background: `hover:bg-yellow-50` with `transition-colors duration-150` — a subtle warm highlight.

3. **Layout Feel:**
   - The entire nav is NOT centered with flexbox justify-center. It's slightly left-offset or has uneven padding (`px-6 py-3` left, `px-4 py-3` right) to feel manually placed.
   - Container may have a CSS `box-shadow: 2px 3px 0 #1a1a1a` (hand-drawn box shadow with no blur radius) for a flat-shadow sticker effect.

## SVG Viewbox Spec

```
viewBox="0 0 120 24"
width="100%"
height="24"
style={{ position: 'absolute', bottom: '-4px', left: 0 }}
```
