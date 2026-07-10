---
name: antigravity:pro:retro-80s
description: Generate a premium outrun/synthwave-styled 80s/90s retro hero section featuring CRT overlays, perspective grid movement, and text scrambling matrix effects.
---

# Retro 80s Hero Section

This skill creates a high-fidelity synthwave retro-futuristic hero section inspired by outrun aesthetics, 80s/90s cyberpunk terminals, and classic arcade interfaces.

## Features
- **Scramble Text Effect**: Custom `useScramble` hook creates a decoding matrix effect for primary titles simulating an old terminal boot.
- **CRT Overlay**: Pure CSS CRT scanline effect with rhythmic flickering and harsh vignette shading to emulate old monitors.
- **Perspective Retro Grid**: CSS 3D transform grid with a glowing "synthwave sun" and animated bottom movement for speed simulation.
- **Typography**: Heavily stylized monospace typography with aggressive text-strokes (`WebkitTextStroke`) and offset shadows (`textShadow`).
- **Interactive Buttons**: High-contrast, brutalist flat buttons with color wipe hover states and inset shadows.
- **Floating Elements**: GSAP `sine.inOut` repeating yoyo animations applied to decorative elements and UI data nodes.

## Component Structure
The primary export includes the `Retro80s` hero section, alongside the `useScramble` hook, `RetroGrid` background, and `CRTOverlay` which are self-contained.

## Dependencies
- `gsap`
- `lucide-react`
- `react`
