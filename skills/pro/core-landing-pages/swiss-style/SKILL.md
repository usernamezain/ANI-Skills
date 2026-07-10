---
name: ani:pro:swiss-style
description: Generate a premium Swiss design-inspired hero section featuring strict grid layouts, massive typography, smooth scrolling (Lenis), and interactive 3D WebGL images.
---

# Swiss Style Hero Section

This skill creates a high-end, editorial Swiss design layout. It focuses on grid alignment, high-contrast brutalist elements with refined serif touches, and smooth, immersive interactions.

## Features
- **Smooth Scrolling**: Implements `lenis` for buttery smooth inertial scrolling.
- **GSAP Sequence**: Staggered, skewed typography reveals (`skewY`) and expanding border animations (`scaleX`) on load.
- **3D Interactive Image**: Uses `@react-three/fiber` and `@react-three/drei`'s `Image` component to create a floating plane that animates from grayscale to color and zooms in upon hover via `THREE.MathUtils.damp`.
- **CSS Marquee**: An infinite CSS keyframe animation for a high-impact bottom banner (`bg-[#ff3300]`).
- **Typography**: Emphasizes massive uppercase tracking (`text-[9rem]`) paired with elegant serif italic secondary text.
- **Grid Architecture**: Structural, visible `border-black/10` and overlay grid lines (`w-[1px]`) to enforce the Swiss style.

## Component Structure
The primary export includes the `SwissPortfolio` layout alongside the `HoverImage` (Three.js), `Scene`, and `Marquee` components combined in a single file for modularity.

## Dependencies
- `gsap`
- `lenis`
- `lucide-react`
- `@react-three/fiber`
- `@react-three/drei`
- `three`
