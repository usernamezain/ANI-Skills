# Design Constraints & Physics Parameters: Sketchy

## 1. SVG Turbulence Physics
The core of the "sketchy" look relies on SVG filters applied to CSS.
```xml
<filter id="squiggle">
    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="5" result="noise" seed="0" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
</filter>
```
- **baseFrequency:** `0.01` provides low-frequency (large) noise waves, meaning borders will wobble gently rather than looking jittery or fuzzy.
- **scale:** `4` dictates how far the pixels are displaced by the noise map. Keeping it low ensures text inside filtered containers remains readable, while borders look hand-drawn.

## 2. Interaction Physics (Framer Motion)
Interactions should feel like shuffling papers or tilting a notebook.
```javascript
whileHover={{ scale: 1.05, rotate: -1 }}
whileTap={{ scale: 0.95, rotate: 1 }}
```
- Slight, alternating rotations combined with scaling mimic the physical action of pressing a slightly uneven button on a desk.

## 3. Visual Language
- **Colors:** Base background is an off-white/cream (`#fdfbf7`). Highlights mimic highlighter pens (bright yellow `bg-yellow-300`, pink `bg-pink-200`, cyan `bg-blue-200`). Pen ink is represented by a soft black/dark gray (`text-slate-900`).
- **Typography:** 
    - **Display:** `font-black text-slate-900 tracking-tight` for heavy, marker-like headings.
    - **Annotations:** `font-handwriting` for organic user feedback and tape text.
    - **Technical Data:** `font-mono uppercase tracking-widest` for blueprints and coordinates.

## 4. Scroll Drawing Dynamics
The `ProcessPath` draws an SVG line downwards as the user scrolls.
- GSAP maps the `strokeDashoffset` from `totalLength` down to `0`.
- The `scrub: 1` setting ensures the drawing speed is tied directly to scroll velocity, but with a slight 1-second delay smoothing to prevent jittery lines.
