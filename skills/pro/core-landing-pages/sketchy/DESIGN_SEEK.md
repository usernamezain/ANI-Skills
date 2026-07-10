# Design Seek: Sketchy (Core Hero Section)

## Visual Language
- **Vibe:** Notebook Sketch, Hand-Drawn 3D, Playful Intellectual, Indie Product, Physical Analog
- **Color Palette:** Warm off-white (`#faf9f6`) base — like uncoated sketchbook paper. Near-black `#1a1a1a` for pencil strokes. Selective yellow `#fde047` for highlighter fill effects. Optional pastel color per drawn shape (light blue `#bfdbfe`, soft green `#bbf7d0`) — one per shape, pastel only.
- **Textures:**
  - Base layer: SVG `feTurbulence` noise (`baseFrequency: 0.65, numOctaves: 4`) with low `opacity: 0.15` — simulates paper grain.
  - Secondary layer: CSS `radial-gradient` dot grid (`1px dots, 20px spacing`) at `opacity: 0.2` — the sketchbook dot-grid paper look.
- **Typography:** `Patrick Hand` (primary) and `Permanent Marker` (accent) — both from Google Fonts. These are mandatory. Standard geometric sans destroys the aesthetic immediately.
- **Shapes:** Asymmetric border-radius on buttons: `rounded-[255px_15px_225px_15px/15px_225px_15px_255px]` — complex percentage radii that look drawn by hand.

## Key Interactions & Physics

1. **GSAP SVG Path Drawing (Core Animation):**
   - Each decorative SVG line/underline has `stroke-dasharray: pathLength` and `stroke-dashoffset: pathLength`.
   - On trigger: `gsap.to("#scribble-path", { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" })`.
   - The line appears to be drawn in real-time by an invisible hand.
   - Multiple paths stagger at `0.2s` intervals — title first, then underline, then shapes.

2. **3D Wireframe Shapes (Three.js Edges):**
   - Basic geometries (`boxGeometry`, `sphereGeometry`, `octahedronGeometry`) with `@react-three/drei`'s `<Edges>` component.
   - `<Edges>` renders only the mesh edges as line segments — creating the pencil-sketch wireframe effect.
   - Camera: `orthographic` (not perspective) — removes depth distortion, making shapes feel like drawn projections.
   - Shapes float via `mesh.rotation.x += 0.005` and `mesh.rotation.y += 0.007` per frame — slow, casual rotation.

3. **Organic Button Hover:**
   - Default: `background: transparent, border: 2px solid #1a1a1a, box-shadow: 4px 4px 0 #1a1a1a`.
   - Hover: `background: #fde047` (yellow fill), `box-shadow: 2px 2px 0 #1a1a1a`, `transform: translate(2px, 2px)`.
   - The button compresses toward its shadow — same "press" effect as the brutalist style, but in yellow.

4. **Layered Texture Composition:**
   ```
   z-0: bg-[#faf9f6] (base paper color)
   z-1: SVG feTurbulence grain (fixed, mix-blend-multiply)
   z-2: CSS dot grid (fixed, opacity: 0.2)
   z-3: 3D Canvas (absolute, full height)
   z-4: HTML content (relative, above canvas)
   ```

## SVG Scribble Path Template

```jsx
<svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
  <path
    id="scribble-path"
    d="M 0,12 Q 30,7 60,13 Q 90,19 120,11 Q 150,5 180,14 Q 195,17 200,12"
    stroke="#1a1a1a"
    strokeWidth="2.5"
    strokeLinecap="round"
    fill="none"
  />
</svg>
```
