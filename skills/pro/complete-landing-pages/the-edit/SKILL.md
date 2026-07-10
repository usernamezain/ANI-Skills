---
name: antigravity:pro:complete-landing-pages:the-edit
description: A minimalist, high-fashion editorial landing page focusing on typography, generous whitespace, and subtle parallax imagery.
version: 1.0.0
tags: ["landing-page", "framer-motion", "gsap", "editorial", "minimalist", "lenis"]
---

# The Edit Landing Page

This skill provides an elegant, magazine-style editorial layout. It prioritizes a stark, minimalist aesthetic utilizing high-contrast typography, hairline borders, and very deliberate, slow animations.

## Features
1. **Editorial Typography**: Heavy reliance on mixing stark sans-serif technical data (`font-black uppercase tracking-[0.5em]`) with elegant, massive serif headers (`font-serif italic tracking-tighter`).
2. **Subtle Image Parallax (`ParallaxImage`)**: Reusable wrapper that subtly translates and scales imagery relative to the scroll position to simulate depth within tight layout constraints.
3. **Character Reveal (`TheManifesto`)**: A GSAP ScrollTrigger based text reveal that fades in individual characters as the user scrolls through a massive statement section.
4. **Horizontal Lookbook (`Lookbook`)**: A pinned horizontal scrolling gallery section mapping vertical scroll progress to horizontal translation.
5. **Auto-Hiding Navbar (`Navbar`)**: A navigation bar that detects scroll direction and hides when scrolling down to maximize reading area, reappearing immediately when scrolling up.
6. **Accordion Dialogue (`TheDialogue`)**: Framer Motion powered accordion for QA/editorial text segments.

## Integration
- Copy `references/component.tsx` into your project.
- Ensure your Tailwind configuration has a distinct serif font (e.g., Playfair Display or equivalent) mapped to `font-serif`.
- Color palette relies on warm grays (`stone` in Tailwind) rather than pure black/white to reduce eye strain and feel more "printed".

## Dependencies
- `framer-motion`: Used for state-based animations (accordion, navbar hiding) and scroll-linked layout transforms.
- `gsap`: Specifically utilized for the character-by-character scrubbed text reveal where `framer-motion` can be less performant.
- `lenis`: For global smooth scrolling, essential for the parallax effects to look premium.
- `lucide-react`: For minimalist iconography.
- `tailwind-merge` & `clsx` (via `cn` utility).
