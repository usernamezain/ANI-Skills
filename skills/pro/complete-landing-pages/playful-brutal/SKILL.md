---
name: antigravity:pro:complete-landing-pages:playful-brutal
description: A high-energy, vibrant, and interactive landing page mixing brutalist grid structures with playful animations, marquee tickers, and physics-based interactions.
version: 1.0.0
tags: ["landing-page", "gsap", "framer-motion", "brutalism", "playful", "marquee", "lenis"]
---

# Playful Brutal Landing Page

This skill provides a comprehensive landing page component that combines brutalist aesthetics (thick borders, harsh shadows, uppercase text) with playful elements (bouncing stickers, physics-based magnetic buttons, spinning SVGs, and chaotic marquees).

## Features
1. **Lenis + GSAP Integration**: Smooth scrolling handled by Lenis, tightly synchronized with GSAP's ScrollTrigger for high-performance scroll-linked animations.
2. **Magnetic Button (`MagneticBtn`)**: A custom physics-based button using `gsap.quickTo` with an elastic ease (`elastic.out(1, 0.3)`) to snap towards the cursor position.
3. **Infinite Marquee (`Marquee`)**: A seamless looping marquee driven by GSAP, which dynamically reverses direction based on scroll velocity and direction.
4. **Bento Grid Toolkit (`BentoGrid`)**: A masonry-style bento grid that reveals itself using a GSAP stagger and elastic `back.out` ease as the user scrolls.
5. **Sticky Split Section (`SplitInteractive`)**: A section that pins (`pin: true`) the left header column while the right column scrolls through content blocks.
6. **Character Reveal (`CharacterReveal`)**: A text effect that splits a paragraph into individual span elements and animates their opacity on scroll.
7. **Floating Decor (`FloatingStickers`)**: CSS-animated bouncing SVG icons scattered across the screen to break the rigid grid system.

## Integration
- Copy `references/component.tsx` into your project.
- Ensure `gsap`, `framer-motion`, and `lenis` are installed.
- Requires Tailwind CSS for the complex shadow strings and color tokens.

## Dependencies
- `gsap`: For ScrollTrigger, `quickTo`, and timeline animations.
- `framer-motion`: Used selectively for simple hover states (`whileHover`).
- `lenis`: For global smooth scrolling.
- `lucide-react`: For icons.
- `tailwind-merge` & `clsx` (via `cn` utility).
