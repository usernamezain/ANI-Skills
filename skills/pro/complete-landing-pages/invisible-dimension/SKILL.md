---
name: ani:pro:complete-landing-pages:invisible-dimension
description: An award-winning creative landing page featuring dynamic dual-layer rendering, high-accuracy client mouse flashlight masking tracking, custom mix-blend mode cursors, and grain overlay filters.
category: pro/complete-landing-pages
tags:
  - dynamic-masking
  - x-ray-reveal
  - mouse-tracking
  - parallax
  - interactive-lens
  - creative-landing-page
---

# Invisible Dimension Complete Landing Page

An interactive high-fidelity experience featuring real-time client mouse-tracking masking that overlays a "boring/gray null" surface over a "colorful hidden reality."

## Features

- **The Interactive X-Ray Lens**: Utilizes Framer Motion's `useMotionTemplate` and CSS `radial-gradient` webkit mask configurations to reveal the color layer underneath in real-time.
- **Perfect Dual-Render Synced Content (`ContentLayer`)**: Identical DOM nodes rendered in both state structures, with distinct styling (e.g. font-thin grey null vs font-black vivid secret).
- **Vivid Parallax Scrolling**: Dynamic scroll vectors that sync perfectly on both dimensions.
- **Mix-Blend Custom Cursors**: Fluid circles tracking Client X/Y coordinates while executing `mix-blend-difference` color inversion overlays.
- **Fractal Noise Overlays**: Fixed viewport SVG grain texture overlays using continuous `feTurbulence` filters at high base frequencies (`baseFrequency="0.6"`).

## Technical Details

- **Animation Engine**: `framer-motion`
- **Masking Math**: `useMotionTemplate`, `radial-gradient`
- **Icons**: `lucide-react`
- **Styling**: Tailwind CSS
