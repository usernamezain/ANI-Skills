# Design Seek: Loo

## Visual Language
- **Vibe:** Brutalist, Developer-Tool, CLI-Inspired, Technical Authority
- **Color Palette:** Pure white (`#fff`) background with pure black (`#000`) text and borders. Single accent: hard red (`#ef4444` / `red-500`) used only for the most critical CTA and one hero word.
- **Textures:** CSS `linear-gradient` grid pattern — `1px #e5e5e5` horizontal and vertical lines on `40px` grid. Sharp and unforgiving. No blur, no soft shadows.
- **Typography:** `font-mono` throughout. Headlines in huge sizes (`text-6xl`–`text-9xl`) with tight `leading-none`. All caps. Stark and loud.

## Key Interactions & Physics

1. **GSAP Hero Entrance — "Violent Reveal":**
   - Text lines start at `y: 100, opacity: 0`. Animate to `y: 0, opacity: 1` with `back.out(1.7)` easing — the snap-back on arrival gives a physical, heavy impact feel.
   - Stagger at `0.08s` per element. Total entrance animation runs in `~0.8s`.
   - The 3D CSS Cube starts `opacity: 0, rotateY: -90deg` and flies in from the side with `gsap.from`.

2. **Horizontal Scroll Pipeline (GSAP Pin):**
   - Container `overflow: hidden`. Inner horizontal strip is `width: [n-items * 100vw]`.
   - `ScrollTrigger` pins the section (`pin: true`), then animates `x: 0 → -(total_width - 100vw)` using `scrub: 1`.
   - Each pipeline node ("step") becomes visible as the horizontal scroll progresses.

3. **3D CSS Cube — Continuous Rotation:**
   - Built with `transform-style: preserve-3d`, `perspective: 800px` on parent.
   - 6 faces: each `translateZ(60px)` from center, then rotated to correct face positions.
   - Rotates via `@keyframes cubeRotate { to { transform: rotateX(360deg) rotateY(360deg); } }` at `8s linear infinite`.

4. **Bento Grid — Hard Borders, Zero Radii:**
   - Each card: `border-2 border-black rounded-none`. No box-shadow. No glassmorphism.
   - Hover state: `background-color` fills with black, text inverts to white — a hard binary inversion (no gradients).
