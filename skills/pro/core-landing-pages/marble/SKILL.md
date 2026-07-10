---
name: ani:pro:marble
description: Generate a premium dark-themed hero section featuring a 3D morphing obsidian/marble stone, GSAP typography animations, and precise lighting with Three.js.
---

# Marble Hero Section

This skill creates a high-end, luxury architecture/sculpture themed hero section. It combines GSAP for precise DOM typography animations with WebGL for a complex, realistic 3D material.

## Features
- **3D Marble Stone**: An `icosahedronGeometry` rendered as a slow-moving, heavy obsidian-like stone using `MeshDistortMaterial`.
- **Advanced Lighting**: Uses `Lightformer` from `@react-three/drei` within an `Environment` to create sharp, dramatic reflections that mimic marble veins.
- **GSAP Animations**: Complex staggered reveals for lines and character-by-character reveals for the massive center text.
- **Typography**: Imports and utilizes 'Cinzel' (serif) and 'Manrope' (sans-serif) to establish a monumental, established luxury brand feel.
- **Texture**: CSS grain overlay for a film-like, tangible quality.

## Component Structure
The unified file exports:
- `Scene`: The WebGL canvas wrapper.
- `MarbleStone`: The inner mesh.
- `Marble` (default): The main layout combining the GSAP animated HTML and the 3D scene.

## Dependencies
- `gsap`
- `@react-three/fiber`
- `@react-three/drei`
- `three`
- `lucide-react`
