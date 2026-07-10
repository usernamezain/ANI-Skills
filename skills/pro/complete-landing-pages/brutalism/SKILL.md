---
name: ani:pro:brutalism
description: Generate a comprehensive Brutalist landing page featuring aggressive typography, hard shadows, GSAP-driven horizontal scroll pinning, and 3D tilting Framer Motion cards.
---

# Brutalism Complete Landing Page

This skill constructs a full, multi-section web experience based on neo-brutalism design principles. It rejects soft shadows and rounded corners in favor of high-contrast, aggressive, and structural web architecture.

## Sections Included
1. **Hero**: Features a 3D tilt card (Framer Motion) and 3D rotation GSAP text reveals (`BrutalReveal`).
2. **Infinite Marquee**: Aggressive separator using repeating components.
3. **Statement**: Massive typography and hard-edged progress bar tied to `whileInView`.
4. **Cinematic Stack**: Sticky positioning (`calc(15vh + i * 40px)`) that stacks cards as the user scrolls.
5. **Pinned Horizontal Scroll**: GSAP `ScrollTrigger` pinned container that scrubs a wide horizontal flex track.
6. **Manifesto Grid**: Staggered blur/scale reveals of hard-bordered text blocks.
7. **Brutal Gallery**: Grayscale-to-color scrubbed image interactions.
8. **Footer**: Massive typography and brutalist hover mechanics.

## Features
- **Hard Shadows**: Uses solid box-shadows (e.g., `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`) for a printed, architectural feel.
- **Mix-Blend Modes**: Employs `mix-blend-difference` and `mix-blend-exclusion` for dynamic text contrast over light/dark layers.
- **GSAP ScrollTrigger**: Powering the advanced timeline pinning (horizontal scroll) and scrubbed gallery filters.
- **Framer Motion**: Powering the math-heavy `useSpring` and `useTransform` logic for the interactive 3D `TiltCard`.

## Detailed Design Specifications
For an in-depth look at how the styling decisions, typography tracking, and animation physics map to the Brutalist design philosophy, refer to the `DESIGN_SEEK.md` file located alongside this skill.

## Dependencies
- `framer-motion`
- `gsap`
- `lucide-react`
- `clsx`
- `tailwind-merge`
