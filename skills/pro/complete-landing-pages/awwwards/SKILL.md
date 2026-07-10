---
name: antigravity:pro:awwwards
description: Generate a premium, multi-section Awwwards-style complete landing page featuring horizontal scroll, parallax galleries, custom cursors, and GSAP ScrollTrigger typography reveals.
---

# Awwwards Complete Landing Page

This skill creates a full, multi-section landing page styled after award-winning web designs (e.g., Awwwards, FWA). It emphasizes organic, smooth animations, complex scroll interactions, and high-fidelity aesthetics.

## Sections Included
1. **Navbar**: Animated dropdown link effects on hover.
2. **Hero**: Multi-directional parallax images tied to scroll (`useScroll`, `useTransform`), with organic blurred blobs and staggered text reveals.
3. **Statement**: GSAP `ScrollTrigger` based letter-by-letter blur reveal (`TypeReveal`).
4. **Marquee**: Framer Motion infinite loop scrolling text.
5. **Parallax Gallery**: 3-column staggered vertical scrolling tied to page scroll.
6. **Features (Horizontal Scroll)**: A sticky section that translates horizontal movement (`x`) based on vertical scroll progress.
7. **Footer**: Massive typography and organic hover-fill buttons.

## Features
- **Custom Cursor**: Tracks mouse via `useMotionValue` and uses `mix-blend-difference`.
- **Grain Overlay**: SVG turbulence filter applied globally for a textured, tactile feel.
- **GSAP & Framer Motion Integration**: Uses Framer Motion for layout and structural scroll (horizontal scroll), and GSAP for precise text manipulation and blur reveals.
- **Tailwind Merge Utility**: Includes a local `cn` utility to handle conditional classes (`clsx` + `tailwind-merge`).

## Dependencies
- `framer-motion`
- `gsap`
- `lucide-react`
- `clsx`
- `tailwind-merge`
