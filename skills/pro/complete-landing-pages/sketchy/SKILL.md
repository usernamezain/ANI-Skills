---
name: ani:pro:complete-landing-pages:sketchy
description: A creative, hand-drawn aesthetic landing page featuring SVG distortion filters to create wobbly "pencil" lines and interactive "sketchbook" mechanics.
version: 1.0.0
tags: ["landing-page", "gsap", "framer-motion", "svg-filter", "hand-drawn", "lenis"]
---

# Sketchy Landing Page

This skill provides a highly stylized, illustrative landing page component. It uses SVG `feTurbulence` and `feDisplacementMap` filters applied via CSS to give standard HTML elements a wobbly, hand-drawn, graphite-like texture.

## Features
1. **SVG Squiggle Filter (`SquiggleFilter`)**: An invisible SVG definition block containing noise filters that, when applied via CSS (`filter: url(#squiggle)`), distort the edges of standard DOM nodes to look hand-drawn.
2. **Graphite Graph Paper (`GraphPaper`)**: A fixed background using CSS linear-gradients combined with a desaturated SVG noise filter to simulate textured paper.
3. **Interactive Sketch Button (`SketchButton`)**: Buttons that utilize an internal SVG rect instead of standard borders to allow the squiggle filter to act on the stroke, creating a drawn-box effect.
4. **Horizontal Sketchbook Showcase (`SketchbookShowcase`)**: A GSAP pinned horizontal scroll section presenting "drafts" in massive, bordered cards.
5. **Scroll-Driven SVG Path (`ProcessPath`)**: A vertical, squiggly SVG line that "draws" itself as the user scrolls using GSAP's `strokeDashoffset` manipulation.
6. **Masonry Testimonials (`ClientScribbles`)**: A CSS multi-column layout for sticky-note style feedback cards.

## Integration
- Copy `references/component.tsx` into your project.
- You must include the `SquiggleFilter` component somewhere near the top of the DOM tree for the `#squiggle` and `#pencil-texture` URLs to resolve correctly.
- Add a handwriting font (e.g., Google Fonts 'Caveat' or 'Permanent Marker') and configure it in Tailwind as `font-handwriting` for the best effect.

## Dependencies
- `gsap`: For scroll-linked pinning and path drawing.
- `framer-motion`: For hover interactions and entrance animations.
- `lenis`: For global smooth scrolling.
- `lucide-react`: For icons.
- `tailwind-merge` & `clsx` (via `cn` utility).
