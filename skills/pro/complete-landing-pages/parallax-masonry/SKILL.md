---
name: ui:pro-complete-landing-pages-parallax-masonry
description: A high-end photography/portfolio landing page featuring smooth scrolling, complex parallax masonry grids, and magnetic interactive elements.
version: 1.0.0
tags: ["landing-page", "framer-motion", "parallax", "masonry", "lenis", "smooth-scroll"]
---

# Parallax Masonry Landing Page

This skill provides a complete landing page built around a fluid, editorial photography aesthetic. It utilizes Lenis for smooth scrolling and Framer Motion for complex scroll-linked parallax animations.

## Features
1. **Lenis Smooth Scroll (`SmoothScroll`)**: A wrapper component that hijack's native scrolling to provide butter-smooth interpolation, enhancing the parallax effects.
2. **Masonry Parallax Grid (`MasonryGrid`)**: A 3-column grid where each column scrolls at a different speed (`y1`, `y2`, `y3`) using `useTransform` mapped to `scrollYProgress`.
3. **Magnetic Button (`MagneticButton`)**: Interactive buttons that subtly pull towards the user's cursor using pointer coordinates and `useMotionValue`.
4. **Horizontal Scroll Section (`HorizontalScroll`)**: A section that translates vertical scroll into horizontal movement, creating a curated gallery experience.
5. **Sticky Reveal (`StickyReveal`)**: A background image that sticks, scales up, and fades out as the user scrolls past, revealing the next section beneath it.
6. **Accordion Footer (`Footer`)**: A massive footer that expands smoothly to reveal contact information.

## Integration
- Copy `references/component.tsx` into your project.
- Ensure your layout allows for full-screen sticky elements.
- The noise overlay relies on a base64 encoded inline SVG, meaning no external assets are required for the grain effect.

## Dependencies
- `framer-motion`: For all scroll-linked animations and spring physics.
- `lenis`: For hijacking and smoothing the browser scroll behavior.
- `lucide-react`: For iconography.
- `tailwind-merge` & `clsx` (via `cn` utility).
