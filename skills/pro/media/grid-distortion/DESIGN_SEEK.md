# Design Seek: WebGL Grid Distortion

## Visual Language
- **Vibe:** Avant-Garde Studio, Fluid Glass Distortion, Prism Aberration, Premium Media Interaction
- **Color Palette:** Determined by the target image. Real-time prism RGB channel separation creates neon cyan, magenta, and yellow edge sweeps on motion.
- **Textures:** Liquid warps driven by vector force grids. High-contrast edge refractions simulating thick glass plates sliding over an underlying texture.
- **Typography:** None directly inside the canvas. Designed to occupy full section blocks behind overlays.

## Key Interactions & Physics

1. **Object-Fit: Cover UV Math:**
   - Shaders prevent image warping by computing aspect-ratio fits in GLSL:
     - `ratio = vec2(min((res.x / res.y) / (img.x / img.y), 1.0), min((res.y / res.x) / (img.y / img.x), 1.0))`
     - `uv = vUv * ratio + (1.0 - ratio) * 0.5`

2. **DataTexture Fluid Physics:**
   - A grid of vector forces (e.g., `15x15` or `30x30`) is stored in a `Float32Array` representing a `THREE.DataTexture`.
   - On each render tick, the vectors decay exponentially toward zero:
     - `displacement *= relaxation` (where `relaxation = 0.9` controls friction).
     - This simulates a fluid medium that dampens cursor movements.

3. **Speed-Weighted Splatting:**
   - On cursor movement, mouse velocity `(vX, vY)` is computed.
   - For all cells near the cursor index, the velocity vectors are injected into the DataTexture, weighted by distance:
     - `force = velocity * (1.0 - distance / maxRadius)`
     - This creates highly directional waves following the cursor angle.

4. **RGB Chromatic Aberration Split:**
   - The fragment shader samples the image texture three separate times with shifted coordinates based on the local displacement value (`offset.rg`):
     - `r = texture(uTexture, uv - 0.02 * offset.rg).r`
     - `g = texture(uTexture, uv - 0.015 * offset.rg).g`
     - `b = texture(uTexture, uv - 0.01 * offset.rg).b`
   - This creates a dramatic chromatic split that scales up on speed and disappears when the canvas is still.

## Color System

| Parameter / Uniform | Value / Setup                   |
|---------------------|---------------------------------|
| Grid Cells Density  | `15` to `30` columns/rows       |
| Decay Coefficient   | `0.9` (Smooth relaxation)       |
| Red Channel Offset  | `0.02 * offset.rg`              |
| Green Channel Offset| `0.015 * offset.rg`             |
| Blue Channel Offset | `0.01 * offset.rg`              |
| Blend State         | Standard opaque cover           |
