---
name: ui:pro-complete-landing-pages-chrome-liquid
description: Generate a premium Chrome/Liquid Metal aesthetic landing page featuring advanced SVG filters (Gooey, DisplacementMap), heavy physics-based mouse tracking, and layered metallic text rendering.
---

# Chrome Liquid Landing Page

This skill constructs a full, multi-section web experience based on the Y2K / Cyber-Liquid / Chrome metal aesthetic. It leverages raw SVG filter math directly applied via React to simulate liquid physics without relying entirely on heavy WebGL canvases.

## Sections Included
1. **SVG Filter Engine**: An invisible `<svg>` block defining `#goo` and `#liquid-metal` filters used throughout the DOM.
2. **Hero**: Features a heavy `mass: 3` Framer Motion orb that follows the mouse with simulated viscosity.
3. **Molten Button**: A button that literally drips and merges when hovered using the `#goo` filter matrix.
4. **Chrome Text Layering**: A custom text component that layers distorted blurry text behind sharp gradient-clipped text to simulate realistic chrome reflections.
5. **Content Gallery**: Parallax scrolling cards floating over a mutating liquid background mesh.
6. **Molten Marquee**: An infinite text ticker actively distorted by fractal noise in real-time.

## Features
- **Liquid Math**: Heavy use of `feTurbulence` and `feColorMatrix` for organic shape distortion.
- **Mix-Blend Modes**: `mix-blend-difference` and `mix-blend-hard-light` interact with the background fluids.
- **Framer Motion Physics**: Uses high `damping` and `mass` inside spring configurations to give the interface a heavy, mercury-like feel.

## Detailed Design Specifications
For an in-depth look at how the styling decisions, typography tracking, and SVG filter mechanics map to the Chrome Liquid design philosophy, refer to the `DESIGN_SEEK.md` file located alongside this skill.

## Dependencies
- `framer-motion`
- `lucide-react`
