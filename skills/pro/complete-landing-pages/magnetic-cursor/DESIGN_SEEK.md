# Design Constraints & Physics Parameters: Magnetic Cursor Landing Page

## 1. Spring Physics Configuration
The custom cursor uses `framer-motion`'s `useSpring` hook for smooth, elastic movement.
```javascript
const springConfig = { 
  damping: 25,     // Controls the resistance. Lower = more bouncy, Higher = sluggish. 25 provides snappy feedback without excessive oscillation.
  stiffness: 300,  // Controls the speed at which it snaps to the target.
  mass: 0.5        // Keeps the cursor light, reducing initial delay.
};
```

## 2. Noise Overlay Metrics
The analog film grain effect is achieved entirely through SVG filters.
```xml
<filter id="noiseFilter">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
</filter>
```
- **baseFrequency:** `0.8` (Provides fine, high-density grain)
- **numOctaves:** `3` (Adds depth to the noise pattern)
- **Opacity / Blend Mode:** The overlay container is set to `opacity-[0.03]` with `mix-blend-overlay`. This ensures the noise subtly affects shadows and highlights without overpowering the text.

## 3. Spotlight Gradient (Bento Card)
Hover effects on Bento Cards track mouse coordinates using `useMotionValue` and apply a radial gradient via `useMotionTemplate`.
```javascript
radial-gradient(
  650px circle at ${mouseX}px ${mouseY}px,
  rgba(255,255,255,0.1),
  transparent 80%
)
```
- **Radius:** 650px creates a soft, expansive glow that fades out cleanly.
- **Center:** Dynamic based on cursor position relative to the element bounds.

## 4. Typography & Grid Architecture
- **Font Stack:** Monospace for technical/subtext elements (`tracking-widest`, `uppercase`), and bold Sans-Serif for primary display headers (`tracking-tighter`, `leading-none`).
- **Colors:** True black (`#000`), Pure white (`#FFF`), and neutral greys (`text-neutral-400`, `text-neutral-500`) to maintain the strict monochromatic "AURA" aesthetic.
- **Layout:** Bento-style CSS grid with asymmetric cell sizes (`md:col-span-2`) for visual rhythm.
