---
name: ani:pro:complete-landing-pages:magnetic-cursor
description: A complete landing page component featuring a custom spring-physics magnetic cursor, noise overlays, and spotlight bento grids, built with Framer Motion.
version: 1.0.0
tags: ["landing-page", "framer-motion", "cursor", "bento-grid", "noise-overlay"]
---

# Magnetic Cursor Landing Page

This skill provides a high-contrast, modern, monochromatic landing page component focusing on a "AURA" aesthetic. It replaces the default browser cursor with a custom `useSpring` driven cursor that reacts to hover states, scaling up and displaying text when hovering interactive elements.

## Features
1. **NoiseOverlay:** A fractal noise SVG overlay mixed with `mix-blend-overlay` to create an analog film grain texture across the screen.
2. **CustomCursor:** A framer-motion powered cursor that hides the native cursor (`cursor-none`) and renders a custom dot with spring physics (`useSpring`) and `mix-blend-difference` for high contrast against any background.
3. **Spotlight Bento Grid:** Cards that reveal a subtle radial gradient upon hover, driven by `useMotionTemplate` tracking mouse coordinates relative to the card bounds.
4. **Hero & Typography:** Bold, tracking-tighter typography with italic accents, giving a futuristic, brutalist vibe.

## Integration
- Copy the provided `references/component.tsx` into your project.
- Ensure your globals include a dark background if not scoped at the component level.
- Hide the default cursor in the root layout if using globally: `cursor-none`.

## Dependencies
- `framer-motion`: For `useSpring`, `useMotionValue`, and `useMotionTemplate`.
- `lucide-react`: For iconography.
- `tailwind-merge` & `clsx` (via `cn` utility)
