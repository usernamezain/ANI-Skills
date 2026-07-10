---
name: antigravity:pro:living-porcelain
description: Generate a premium editorial hero section featuring a 3D morphing porcelain sphere reacting to cursor velocity, accompanied by sophisticated serif typography and noise overlays.
---

# Living Porcelain Hero Section

This skill creates a high-end, editorial-style hero section focusing on a central 3D interactive sculpture ("Living Porcelain"). It leverages WebGL (Three.js/Fiber) for rendering and Framer Motion for text reveals.

## Features
- **3D Sculpture**: A responsive `MorphingBlob` built with `@react-three/fiber` and `@react-three/drei`'s `MeshDistortMaterial`.
- **Interaction**: The blob distorts and speeds up based on cursor velocity, providing an organic, "living" feel.
- **Editorial Typography**: Elegant mix of serif (`font-serif`), monospace (`font-mono`), and italicized text matching high-fashion/design agency aesthetics.
- **Noise Overlay**: SVG filter generating fractal noise to give the entire section a tactile, paper-like texture.
- **Smooth Animations**: Staggered text reveals and line drawing animations using Framer Motion.

## Component Structure
The unified file exports:
- `MorphingBlob`: The Three.js interactive mesh.
- `NoiseOverlay`: The fixed SVG noise layer.
- `LivingPorcelain`: The main default export containing the canvas and HTML UI overlay.

## Dependencies
- `framer-motion`
- `@react-three/fiber`
- `@react-three/drei`
- `three`
