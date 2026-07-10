# Design Seek: Cable Cursor (Harmonic Stream)

## Visual Language
- **Vibe:** Cyber-Organic, Cosmic Whip, Ribbon Physics, Premium Fluid Interactive
- **Color Palette:** Pure dark base (`#000000` or `#080808`). Glowing rainbow spectrum lines cycling through the HSL spectrum (`(frame + index * (360 / STRAND_COUNT)) % 360`). Higher velocities trigger whiter/hotter light center overlays.
- **Textures:** Layered additive lines. Continuous blending (`globalCompositeOperation = 'lighter'`) creates ultra-bright neon core highlights where strands intersect. Decaying histories create a smoke-like tail.
- **Typography:** None.

## Key Interactions & Physics

1. **Strand Orbit & Phase Offset:**
   - Strands do not follow the exact cursor position; instead, they orbit around it using dynamic trigonometry:
     - `orbitRadius = BASE_RADIUS + Math.sin(frame * 0.05 + phaseOffset) * 10`
     - `orbitX = target.x + Math.cos(frame * 0.02 + phaseOffset) * orbitRadius`
     - `orbitY = target.y + Math.sin(frame * 0.02 + phaseOffset) * orbitRadius`
   - Phase offset (`index / STRAND_COUNT * Math.PI * 2`) spreads the strands uniformly around the circle.

2. **Whip Lag Physics (LERP):**
   - Each strand has a progressively larger lag coefficient:
     - `lag = 0.1 + (index / STRAND_COUNT) * 0.05`
     - `x += (orbitX - x) * lag`
   - High index strands trail significantly behind, generating a whip-like snake wave on rapid movements.

3. **Mouse Speed/Velocity Glow:**
   - Velocity calculated as: `speed = Math.abs(vX) + Math.abs(vY)`.
   - Modulates HSL lightness: `lightness = Math.min(50 + speed * 2, 85)`.
   - Faster mouse movements make the strands glow brighter and closer to white, visualising energy input.

4. **Canvas Trails Decayer:**
   - Canvas cleared with a low-opacity alpha overlay on each frame (`rgba(0, 0, 0, 0.1)`) instead of full clear, preserving a short history tail of prior strand points.

## Color System

| Parameter / Element | Setting / Value                 |
|---------------------|---------------------------------|
| Canvas Clear Fill   | `rgba(0, 0, 0, 0.1)`            |
| Strand Base Count   | `12`                            |
| Tail Frame History  | `40`                            |
| Base Orbit Radius   | `30px`                          |
| Blend Mode          | `'lighter'` (Additive Glow)     |
| Color Cycle Mode    | Dynamic HSL Shift (0 to 360 deg)|
