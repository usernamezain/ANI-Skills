---
name: ani:pro:complete-landing-pages:neo-brutalist
description: A bold, high-contrast, "chunky" Neo-Brutalist landing page featuring 3D tilt cards, harsh shadows, and acid colors.
version: 1.0.0
tags: ["landing-page", "framer-motion", "neo-brutalism", "3d-tilt", "chunky"]
---

# Neo Brutalism Landing Page

This skill provides a complete landing page built around the Neo-Brutalist aesthetic. It features thick borders, hard drop shadows, high-contrast typography, and "acid" accent colors like lime green and bright orange.

## Features
1. **3D Tilt Card (`TiltCard`)**: A core component that tracks mouse movement to apply a 3D tilt effect (`rotateX`, `rotateY`) while maintaining heavy brutalist styling.
2. **Animated Navbar**: A floating pill-shaped navbar with spring animations.
3. **Infinite Marquee**: An angled (`rotate-[-2deg]`) scrolling text banner for aggressive branding.
4. **Bento Grid**: An asymmetrical layout utilizing the 3D tilt cards for projects, stats, and CTAs.
5. **Masonry Showcase**: A gallery layout mixing different aspect ratios and grayscale hover effects.
6. **Split Section**: High-contrast split-screen section with oversized typography.

## Integration
- Copy `references/component.tsx` into your project.
- Ensure your `tailwind.config.js` or global CSS supports standard Tailwind utility classes.
- The component relies on pure CSS shadows (e.g., `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`) for the brutalist effect.

## Dependencies
- `framer-motion`: For `useSpring`, `useMotionValue`, and `useTransform`.
- `lucide-react`: For iconography.
- `tailwind-merge` & `clsx` (via `cn` utility)
