# Design Seek: Marble

## Visual Language
- **Vibe:** Monumental Luxury, Sculpture Gallery, Architecture, High-End Brand Identity
- **Color Palette:** Near-pure black (`#080808`) base. Stone gray (`#b0a898`) as the mid-tone. Warm white (`#f2ede9`) for headline text. No blues. No purples. Only earth and stone tones — the colors of obsidian, limestone, and ash.
- **Typography:** `Cinzel` (Roman serif, all-caps, spaced) for monumental display text. `Manrope` (clean, structured sans-serif) for all body and secondary text. The contrast between ancient-feeling serif and modern sans = luxury.
- **Textures:** CSS grain overlay (`mix-blend-overlay`, `opacity: 0.3`) for a tactile, film-like quality over the entire section. The 3D stone surface itself has Lightformer reflections that simulate marble veins.

## Key Interactions & Physics

1. **3D Obsidian Stone (`MeshDistortMaterial`):**
   - Geometry: `icosahedronGeometry(2.5, 4)` — high-poly for smooth distortion.
   - Material: `MeshDistortMaterial` with `distort: 0.2, speed: 0.4, roughness: 0.1, metalness: 0.9`.
   - Rotation: `mesh.rotation.y += 0.003` per frame — imperceptibly slow, like a stone turning on a plinth.
   - Environment: `@react-three/drei` `Lightformer` with `intensity: 4` at specific angles to create the dramatic marble-vein reflections.

2. **GSAP Character-by-Character Reveal:**
   - The massive center text is split into individual `<span>` elements (one per character, including spaces).
   - GSAP stagger: `from: { opacity: 0, y: 40, rotationX: -90 }` to `{ opacity: 1, y: 0, rotationX: 0 }`.
   - Duration per character: `0.6s`. Stagger delay: `0.04s`. Ease: `power4.out`.
   - Total animation feels deliberate and weighty — like letters being carved.

3. **Line Reveals:**
   - Decorative lines (horizontal rule elements) animate `scaleX: 0 → 1` with `transform-origin: left` on load.
   - Duration: `1.2s` with `ease: power2.inOut` — draws across the screen like a chalk mark.

## Color System

| Element         | Value            |
|-----------------|------------------|
| Background      | `#080808`        |
| 3D Stone        | Dark gray metallic |
| Primary Text    | `#f2ede9`        |
| Secondary Text  | `#b0a898`        |
| Accent Line     | `#3a3530`        |
| Grain Overlay   | SVG feTurbulence, `opacity: 0.3`, `mix-blend-overlay` |
