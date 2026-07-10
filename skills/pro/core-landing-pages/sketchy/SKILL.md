---
name: antigravity:pro:sketchy
description: Generate a premium hand-drawn, "sketchy" notebook-style hero section featuring drawn 3D shapes, SVG squiggles, and GSAP stroke drawing animations.
---

# Sketchy Hero Section

This skill creates a playful, hand-drawn web aesthetic that emulates a notebook sketch. It uses WebGL orthographic rendering with edge detection to simulate drawn 3D primitives.

## Features
- **3D Edge Detection**: Utilizes `@react-three/drei` `Edges` component on basic geometric primitives to create pencil-like 3D wireframes that float in the background.
- **GSAP Path Drawing**: Animates an SVG path (`#scribble-path`) using `strokeDashoffset` manipulation to "draw" an underline dynamically.
- **CSS Asymmetry**: Brutalist, imperfect border radii using complex percentages (`rounded-[255px_15px_.../...]`) to simulate organic, hand-drawn buttons.
- **Typography Integration**: Employs 'Patrick Hand' and 'Permanent Marker' Google Fonts via inline CSS for the handwritten look.
- **Layered Textures**: Combines an SVG fractal noise filter as a paper texture base and a radial-gradient dot grid pattern.

## Component Structure
The primary export includes the `Sketchy2` hero layout, alongside the 3D `Scene`, `SketchyShape` renderer, and SVG `ScribbleLine` component.

## Dependencies
- `gsap`
- `lucide-react`
- `@react-three/fiber`
- `@react-three/drei`
- `three`
