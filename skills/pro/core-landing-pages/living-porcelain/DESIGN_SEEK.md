# Design Seek: Living Porcelain

## Visual Language
- **Vibe:** Editorial Luxury, High Fashion, Sculpture Gallery, Organic Premium
- **Color Palette:** Off-white (`#f8f5f2` — warm, never pure white) base. Near-black (`#1a1a1a`) text. Single blush accent (`#d4a8a0`) used sparingly for one decorative element. The 3D sphere itself is the hero color — pale porcelain white with subsurface scattering simulation.
- **Textures:** SVG `feTurbulence` grain overlay at `opacity: 0.08` with `mix-blend-overlay`. Barely visible — adds physical quality without visual weight.
- **Typography:** Serif italic (`Cormorant Garamond`, `Playfair Display`) for the hero statement. Tight tracked `letter-spacing: 0.2em` monospace for metadata/coordinates. The serif/mono contrast creates editorial magazine feel.
- **Spacing:** Hero uses `min-h-screen` with all elements in a central focal composition. Nothing is left-aligned grid — it's centered, museum-like.

## Key Interactions & Physics

1. **Cursor-Velocity Blob Distortion (Core Interaction):**
   - Track cursor velocity: `velocity = sqrt((dx/dt)² + (dy/dt)²)` — the rate of cursor movement.
   - Map velocity to `MeshDistortMaterial.distort`: `0 → 0.1` (still) to `300px/s → 0.5` (fast).
   - Map velocity to `MeshDistortMaterial.speed`: `0.3` (idle) to `2.0` (fast move).
   - Result: the blob barely moves when the cursor is still, but ripples and morphs violently when the cursor moves quickly — like poking a soap bubble.
   - `THREE.MathUtils.damp(current, target, 0.1, delta)` on each frame for smooth interpolation.

2. **Staggered Text Reveal:**
   - Lines of text animate from `opacity: 0, y: 30` to `opacity: 1, y: 0` with Framer Motion.
   - `initial={{ opacity: 0, y: 30 }}` + `animate={{ opacity: 1, y: 0 }}`.
   - `transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}`.
   - No spring — easeOut only. Porcelain doesn't bounce.

3. **Line Drawing Animation:**
   - Decorative SVG line (`width: 80px, height: 1px`) animates `scaleX: 0 → 1` on mount.
   - `transform-origin: left center`. Duration: `1.2s`. Ease: `power2.inOut`.

## 3D Material Spec

```js
<MeshDistortMaterial
  color="#f0ebe4"        // Porcelain white
  roughness={0.05}       // Near-mirror smooth
  metalness={0.0}        // No metal — pure ceramic
  distort={0.15}         // Base distortion at rest
  speed={0.5}            // Base animation speed
  envMapIntensity={1.2}  // Slight environmental reflection
/>
```

## Color System

| Element        | Value        |
|----------------|--------------|
| Background     | `#f8f5f2`    |
| 3D Sphere      | `#f0ebe4` (porcelain white) |
| Primary Text   | `#1a1a1a`    |
| Accent         | `#d4a8a0` (blush) |
| Grain Overlay  | `opacity: 0.08`, `mix-blend-overlay` |
