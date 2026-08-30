---
name: ui:pro-complete-landing-pages-hand-drawn
description: An organic, pleasantly imperfect landing page utilizing complex SVG displacement turbulence maps, scroll-triggered text highlights, hover-scribble buttons, self-drawing SVG arrows, and vintage grid-paper layout structures.
category: pro/complete-landing-pages
tags:
  - hand-drawn
  - organic
  - svg-filters
  - framer-motion
  - displacement-map
  - scroll-highlights
  - typography
---

# Hand Drawn Complete Landing Page

A beautifully styled, tactile creative landing page focusing on mimicking human sketchbooks, organic shapes, and pencil grain directly inside the DOM.

## Features

- **The Displacement Engine**: Custom global SVG turbulence displacement filters (`#rough-paper` & `#pencil-texture`) distorting strict digital boxes into rough, organic sketched boundaries.
- **Organic Grid-Paper Base**: Background linear gradients combined with custom SVG displacement noise.
- **Highlighter Effects**: Staggered scroll-triggered background highlight strips mimicking real marker brushes.
- **Sketch Button Hover States**: SVG vector boundaries that dynamically draw their own outlines on focus.
- **Self-Drawing Vector Arrows**: Custom SVG paths that dynamically extend along path lengths on scroll triggers.
- **Tactile Sticky Notes**: Interactive mock paper elements equipped with pushpins and custom border-radius ratios (`borderRadius: "255px 15px/15px 255px"`).

## Technical Details

- **Animation Engine**: `framer-motion`
- **SVG Math Filters**: `feTurbulence`, `feDisplacementMap`, `feColorMatrix`
- **Icons**: `lucide-react`
- **Styling**: Tailwind CSS
