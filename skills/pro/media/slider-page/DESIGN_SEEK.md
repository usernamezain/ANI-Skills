# Design Seek: WebGL Liquid Glass Slider Page

## Visual Language
- **Vibe:** Creative Agency Portfolio, Liquid Refractive Glass, Premium Editorial Gallery
- **Color Palette:** Pure dark backdrop (`#080808`). Glass bubbles refract and chromatic-split underlying slide colors. Neutral text overlays in white (`#ffffff`) and zinc-gray (`#a1a1aa`).
- **Textures:** Liquid refractions, organic noise warps, bubbles, edge glows, and orbiting particle preloaders.
- **Typography:** Bold sans-serif headers (e.g. *Outfit*, *Inter*) at high sizes (`text-6xl` to `text-8xl`), paired with a monospaced typeface (e.g. *Space Mono*, *Fira Code*) for pagination indices.

## Key Interactions & Physics

1. **Liquid Glass Refraction Shaders:**
   - Textures transition using a custom liquid glass refraction shader driven by noise layers:
     - `glassStrength = 0.08 * uGlassRefractionStrength * uDistortionStrength * uGlobalIntensity`
     - Uses `smoothNoise(vec2 p)` to generate simplex ripples.
     - Chromatic aberration splits R/G/B vector offsets inside the glass circle.
     - Simulates refractive light amplification on bubbles: `glassEffect(uv, progress)`.

2. **Orbiting Radial Particle Preloader:**
   - HTML5 Canvas preloader draws a series of concentric particle rings (`dotRings`):
     - Orbit velocity: `angle = frame * speed + ringIndex * phaseOffset`
     - Radial distance breathes over time using sine easing: `r = baseR + Math.sin(frame * pulseSpeed) * pulseAmt`.
     - Fades out smoothly as resources finish loading.

3. **Timed Linear Indicators:**
   - Timer loops increment a progress value, feeding a linear loading bar at the bottom:
     - Transitions trigger automatic slide changes.
     - Bullets expand horizontally (`scaleX` or `width`) from `0%` to `100%`, snapping back to `0%` on change.

4. **GSAP Uniform Interpolation:**
   - Easing functions (`power2.inOut` over `1.8s`) update the WebGL `uProgress` shader uniform, coordinating overlay fading and displacement warp speeds.

5. **Tweakpane Live Tuners:**
   - Tweakpane UI panels hook into uniforms (`uGlobalIntensity`, `uDistortionStrength`, `uGlassRefractionStrength`, etc.) for real-time visual adjustment.
   - Panel visibility toggles on/off pressing `H`.

## Color System

| Parameter / Uniform | Default Value / Setup           |
|---------------------|---------------------------------|
| Slide Background    | `#080808`                       |
| Global Intensity    | `1.0`                           |
| Glass Refraction    | `1.2`                           |
| Chromatic Aberration| `1.5`                           |
| Edge Glow Intensity | `0.4`                           |
| Preloader Particle  | `rgba(255, 255, 255, 0.8)`      |
