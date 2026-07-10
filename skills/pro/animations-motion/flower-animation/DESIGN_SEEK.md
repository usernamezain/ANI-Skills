# Design Seek: Flower Animation

## Visual Language
- **Vibe:** Magical Midnight Garden, Enchanted Botanical, Organic Ambient, Premium Interactive CSS
- **Color Palette:** Deep night indigo (`#010113`) background with a soft cyan radial horizon glow. Saturated glowing neon yellow/green (`#e6f331`) flower petals. Rich forest green (`#028137`, `#056d24`) stems and swaying grass. Golden/yellow glowing particle lights.
- **Textures:** Multi-layered radial gradients simulating twilight shadows and horizon light transitions. Flat vector SVGs with CSS glows. Soft floating heart particles with linear opacity shifts.
- **Typography:** None by default. If annotations are added, use a clean modern sans-serif like *Inter* or *Montserrat* at low opacity.

## Key Interactions & Physics

1. **Sequential Blooming Orchestration:**
   - Sequential mounting delays (`--d` custom properties) desynchronize leaf growth and petal openings:
     - Stem growth (`grow-flower-tree`): `4s` duration.
     - Bottom foliage: `1s` to `2.5s` delay offsets.
     - Petals opening (`blooming-flower`): `2s` duration.
   - Petals scale up and rotate outward using 3D perspective triggers (`rotateY(40deg) rotateX(-50deg)`).

2. **Ambient Wind Swaying:**
   - Swaying motions utilize custom cubic-bezier keyframe curves for organic lag:
     - `moving-flower-1`: Sway range `-5deg` to `5deg`, `4s` duration, infinite loop.
     - `moving-grass`: Sway range `-2deg` to `2deg`, `2s` duration.
   - Separate delay properties prevent animations from looking uniform.

3. **Floating Light Particles:**
   - Glow points utilize a custom keyframe loop (`light-ans`):
     - Orbit offset and float up `20vmin` while fading to `opacity: 0`.
     - Alternate odd/even elements glow yellow vs green.

## Color System

| Element          | Value / Tailwind Equivalent     |
|------------------|---------------------------------|
| Sky BG Base      | `#010113` (custom twilight)     |
| Sky Horizon      | `rgba(145, 233, 255, 0.2)`      |
| Flower Petals    | `#e6f331` (electric yellow)     |
| Stem & Grass     | `#028137` / `#056d24`           |
| Center Pistil    | `#e7b201` with radial blur      |
| Glowing Lights   | `rgb(255, 251, 0)`              |
| Floating Hearts  | Selectable overlay SVG, low-op  |
