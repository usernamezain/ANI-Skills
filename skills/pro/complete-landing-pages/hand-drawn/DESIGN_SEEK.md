# DESIGN SEEK: Sketch displacement & Tactile Aesthetics

This document defines the mathematical foundations, core mechanics, and organic layouts powering the **Hand Drawn** landing page design system.

---

## 1. Core Mechanics & Math

### A. The Organic Displacer (SVG Filters)
To bypass strict computational alignments, digital containers are mutated using vector noise displacement maps:
$$\text{Displacement Vector } D(x,y) = \text{SourceGraphic}(x + s \times (R(x,y) - 0.5), y + s \times (G(x,y) - 0.5))$$
- **Turbulence Configuration**:
  - `type`: `fractalNoise` (computes continuous, non-periodic spatial noise)
  - `baseFrequency`: `0.04` (perfect sweet spot between fine-grain detail and smooth shapes)
  - `numOctaves`: `5` (applies 5 layered passes of noise, adding natural wiggles)
- **Displacement Mapping**:
  - `scale`: `2` (the amount of pixels to displace borders; higher scale = rougher drawing)

### B. Tactile Border-Radius Ratios
To give a mock-card the illusion of being cut by hand, unequal ratios are applied on corners:
- **Sketched Border Radius**: `borderRadius: "255px 15px 225px 15px / 15px 225px 15px 255px"`
This skew maps asymmetric horizontal and vertical radii to force a distorted paper shape.

### C. Self-Drawing SVG Vectors
Drawn arrows and button borders use Framer Motion to control path animations based on scroll states:
- **Path Length Mapping**: `pathLength` is set from $0.0 \to 1.0$ using standard SVG `stroke-dasharray` transition vectors.

---

## 2. Design Tokens & Styling Guide

### Palette (Organic Creative Sketchbook)
- **Backgrounds**: Sketched Warm Linen `#fdfbf7`, Pastel Note Yellow `#ffeb3b`, Pure White `#ffffff`
- **Stroke/Accents**: Charcoal Graphite `#2d2d2d`, Sky Cyan `#a5f3fc`, Pink Rose `#fbcfe8`
- **Highlight Base**: Bright Canvas Yellow `#ffeb3b`

### Typography
- **Headings**: Heavy artistic sans and serifs (`font-black tracking-tight font-serif`)
- **Metadata**: Monospace small labels (`font-mono text-xs tracking-widest`)
