---
name: antigravity:pro:glass-operating-system
description: Generate a premium glassmorphic OS-style hero section with a bento grid layout, scrambling text, live clocks, and subtle noise overlays.
---

# Glass Operating System Hero Section

This skill creates a high-end, cyberpunk-adjacent glassmorphic operating system dashboard interface. It features a bento box grid layout, real-time clock components, text scrambling animations on load, and subtle noise textures for depth.

## Features
- **Bento Grid Layout**: A responsive, 4-column dynamic grid of frosted glass cards.
- **Glassmorphism**: Backdrop blur with extremely subtle borders and gradients (`bg-white/[0.02] border border-white/[0.05] backdrop-blur-md`).
- **Interactive Micro-Animations**: Scrambling text components for titles (`<ScrambleText>`), live tick time displays (`<TimeDisplay>`), and Framer Motion staggered reveals (`<Card delay={x}>`).
- **Background Noise**: SVG data-uri based fractal noise filter for texture.

## Component Structure
The primary file includes everything needed in a single, exportable file to minimize dependencies:
- `cn` utility
- `ScrambleText` component
- `TimeDisplay` component
- `Card` layout component
- `GlassOperatingSystem` default export page

## Styling
- Strict monochromatic with selective color highlights (Green, Blue).
- High-contrast typography using Inter/sans and monospace fonts.
- Framer motion for layout animations.
