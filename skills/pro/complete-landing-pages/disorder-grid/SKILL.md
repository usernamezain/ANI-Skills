---
name: ani:pro:complete-landing-pages:disorder-grid
description: An avant-garde brutalist aesthetic landing page characterized by systematic grid shattering, tension-based animations, staggered viewport-locked letter reveals, and parallax smooth scrolling.
category: pro/complete-landing-pages
tags:
  - brutalism
  - gsap
  - framer-motion
  - scroll-parallax
  - lenis
  - marquee
  - typography
---

# Disorder Grid Complete Landing Page

A masterpiece of systematic chaos, rejecting traditional grid structures to form a visually striking, brutalist, high-impact creative canvas.

## Features

- **Split Text Viewport Revelations**: Custom staggered letters entering with dynamic rotations, scales, and offsets (`rotateZ: 15`, `scale: 0.8`, `y: 150`).
- **Erratic Parallax Blocks**: Framer Motion scroll wrappers linked to customized vertical transform offsets using smooth spring easing properties (`stiffness: 70`, `damping: 20`).
- **Scattered Gallery**: Off-center, overlapping imagery blocks reacting at different spring speeds.
- **Tension Kinetic Marquees**: Viewport-scrubbed typography tickers utilizing GSAP ScrollTrigger percentage shifts.
- **Continuous Scroll Manifestos**: Interactive textual arrays whose character opacity levels stagger progressively on page-scroll bounds.
- **Diagonal Masking Footers**: Striking dark-themed footers with skewed bounding masks (`clipPath: polygon()`).

## Technical Details

- **Animation Engine**: `gsap`, `@gsap/ScrollTrigger`, `framer-motion`
- **Scrolling Control**: `lenis`
- **Icons**: `lucide-react`
- **Styling**: Tailwind CSS
