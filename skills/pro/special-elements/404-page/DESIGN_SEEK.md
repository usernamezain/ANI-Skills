# Design Seek: 404 Page (Canyon Parallax)

## Visual Language
- **Vibe:** Atmospheric Solitude, Interactive Cartoon Desert, 7-Layer Depth Parallax
- **Color Palette:** Warm background sunset gradient. Deep canyon rocks in teal tones (cyan-700 `#0e7490`, cyan-800 `#155e75`). Contrasting pure black outlines (`#000000`) for structural elements.
- **Textures:** Crisp vector SVGs layering flat shapes to simulate depth. Thick illustrative cartoon stroke styles.
- **Typography:** *Pridi* (chunky slab-serif) for massive headers (`text-9xl`) like "404", paired with *Montserrat* (clean geometric sans-serif) for descriptive body text and primary buttons.

## Key Interactions & Physics

1. **7-Layer Mouse Parallax Hook:**
   - Mouse movement is captured and normalized:
     - `x = e.clientX / windowWidth - 0.5`
     - `y = e.clientY / windowHeight - 0.5`
   - Maps normalized coords against individual depth indices (e.g. `[0.05, 0.1, 0.2, 0.35, 0.5, 0.7, 0.95]`):
     - `offset = depth * normalizedCoordinate`
     - Results in coordinates that translate layers at different speeds.
   - Sky/background moves minimally (`depth = 0.05`), while foreground elements (cacti, text overlays) translate heavily (`depth = 0.95`), generating a 3D parallax effect.

2. **Illustrative SVG Cactus Assets:**
   - Modular `<Cactus />` React subcomponents:
     - SVG groups with distinct fill levels (highlight teal vs shadow teal).
     - Heavy dark borders (`stroke: black`, `stroke-width: 2px`).
     - Placed at different bottom-coordinate nodes with scaling factors (`scale` 0.5 to 1.2) to simulate distance scaling.

3. **Interactive Navigation Actions:**
   - "Go back home" secondary-styled buttons.
   - Inline "Search" boxes or alternate CTAs to recover user traffic.

## Color System

| Layer / Element     | Style / Fill Value              |
|---------------------|---------------------------------|
| Sky Sunset BG       | `from-orange-200 to-amber-100`  |
| Back Canyon Rocks   | `#164e63` (cyan-900)            |
| Middle Canyon Rocks | `#0e7490` (cyan-700)            |
| Foreground Cacti    | `#155e75` (cyan-800)            |
| Outlines / Borders  | `#000000`                       |
| Button CTA          | `bg-cyan-800 hover:bg-cyan-700` |
