# Design Seek: Kinetic

## Visual Language
- **Vibe:** Creative Agency, Motion-Obsessed, Reality Distortion, Brutalist-Premium
- **Color Palette:** Deep blacks (`#000` / `zinc-950`) with pure white typography. Selective single-color accent (electric red `#FF2D20` or lime `#C8F135`) used sparingly on one hero word only.
- **Textures:** Film grain overlay (`noise.svg` or CSS `filter: contrast + brightness` hack). No gradients in the primary sections — contrast comes from motion, not color.
- **Typography:** Massive, uppercase, tracking-tighter display font (e.g., `Bebas Neue`, `Monument Extended`, or `Anton`). Body copy in a neutral sans.

## Key Interactions & Physics

1. **Velocity-Reactive Skew:**
   - `ScrollTrigger.getVelocity()` samples scroll speed every frame.
   - Applies `gsap.to(element, { skewY: velocity / 300, ease: "power4.out", duration: 0.4 })`.
   - Fast scroll = heavy skew. Slow scroll = snaps back to straight. Creates a visceral, responsive feel.

2. **Magnetic Button Repulsion:**
   - On `mouseenter`, calculates `rect.left + rect.width / 2 - e.clientX` and `rect.top + rect.height / 2 - e.clientY` offsets.
   - Applies a `gsap.to` of `x: -offsetX * 0.4, y: -offsetY * 0.4` — the button physically moves toward the cursor.
   - On `mouseleave`, `gsap.to` resets to `x: 0, y: 0` with `elastic.out(1, 0.3)`.

3. **Cursor Trail:**
   - Two elements: a "dot" (4px solid circle) with `gsap.quickTo` at `duration: 0.1`, and an "outline" (40px circle with `mix-blend-difference`) with `duration: 0.6`.
   - The lag between the two creates the trailing effect. The outline's `mix-blend-difference` inverts the color of anything underneath, making it visible on any background.

4. **Pinned Parallax Layers:**
   - `Hero` has 3 absolutely positioned layers: `scrub: 1` (bg), `scrub: 1.5` (mid), `scrub: 2` (fg text).
   - Opposed scroll columns in `ParallaxGallery`: column A moves `y: -200px`, column B moves `y: +200px` across the same scroll distance.
