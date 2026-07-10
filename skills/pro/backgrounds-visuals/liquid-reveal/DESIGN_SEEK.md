# Design Seek: Liquid Reveal (WebGL Fluid Simulation)

## Visual Language
- **Vibe:** Experimental Creative, Fluid Smoke, Liquid Glass Reveal, High-Tech Interactive WebGL
- **Color Palette:** Dominated by the source image underneath, revealed by high-contrast smoke/fluid plumes in cold tones (neon blues, purples, icy whites, or custom hexes). Transition areas fade into black.
- **Textures:** Hyper-realistic gaseous and liquid simulation, driven by custom Navier-Stokes solvers in WebGL fragment shaders. Back-buffered canvas renders at high precision.
- **Typography:** None. Renders directly as an interactive backdrop/cover element behind content.

## Key Interactions & Physics

1. **Navier-Stokes Shader Pipeline:**
   - The simulation utilizes 4-5 custom GLSL shaders executing sequentially in a Framebuffer Object (FBO) swap chain:
     - **Advection Shading:** Moves velocity and dye values forward along the velocity field.
     - **Divergence Shading:** Calculates velocity field expansion.
     - **Pressure Shading (Poisson Solver):** Iteratively solves pressure equations to make the fluid incompressible.
     - **Gradient Subtraction Shading:** Corrects the velocity field with the calculated pressure.

2. **Pointer Velocity Injection (Splatting):**
   - Movement velocity `(dx, dy)` and duration are tracked on `mousemove` and `touchmove`.
   - Splats inject a gaussian force distribution into the velocity and dye FBOs:
     - `splatRadius = mouseRadius * (windowSize / resolution)`.
     - High speed movements spawn larger, sweeping trails; static hovers generate expanding circular blooms.

3. **Dissipation / Decaying Over Time:**
   - Both velocity and color density values dissipate on every frame loop by multiplying by dampening uniforms (`u_dissipation = 0.98` for dye, `0.96` for velocity).
   - This creates the smoke fading/absorption effect, reverting the background back to dark/opaque.

4. **Float Precision Requirements:**
   - WebGL context utilizes the `OES_texture_float` extension to perform calculations in 32-bit floating point, preventing numerical clamping and ensuring silky smooth gradients.

## Color System

| Parameter / Uniform | Value / Description             |
|---------------------|---------------------------------|
| Fluid Dye Base      | Configurable RGB (e.g. Cyan/Purple)|
| Simulation Grid Size| `SIM_RESOLUTION` (default `128` or `256`)|
| Dye Resolution      | `DYE_RESOLUTION` (default `512` or `1024`)|
| Pressure Iterations | `19` to `30` loops              |
| Dye Dissipation     | `0.97` to `0.99`                |
| Velocity Dissipation| `0.96` to `0.98`                |
