# DESIGN SEEK: Systematic Disorder & Brutalist Tension

This document defines the mathematical foundations, core mechanics, and geometric layouts powering the **Disorder Grid** landing page design system.

---

## 1. Core Mechanics & Math

### A. Viewport-Locked Staggered Reveals
To represent systemic chaos, text reveals rely on non-standard rotation hinges and heavy bottom-left transformation coordinates:
- **Transform Origin**: `transform-origin: bottom left`
- **Initial Character State**: `opacity: 0`, `y: 150px`, `rotateZ: 15deg`, `scale: 0.8`
- **Target Character State**: `opacity: 1`, `y: 0`, `rotateZ: 0deg`, `scale: 1.0`
- **Pacing**: `stagger: 0.04s`, `duration: 1.2s`, Easing: `power4.out`

### B. Dynamic Spring Parallax Easing
Images and floating items scroll at offset ratios mapped from Framer Motion's `useScroll` hook.
- **Scroll Value Map**: The raw progress $P \in [0, 1]$ is mapped to translation ranges:
  $$Y(P) = P \times \text{SpeedMultiplier} \times 300\text{px}$$
- **Spring Settings**: To give visual weight, translations pass through a high-mass spring damping model:
  - `stiffness`: `70`
  - `damping`: `20`

### C. Diagonal Bounding Masks
The transition into the footer breaks horizontal lines via asymmetrical polygon coordinates:
- **CSS Bounding Mask**: `clip-path: polygon(0 15%, 100% 0, 100% 100%, 0% 100%)`
This creates a sharp $15\%$ slope rising left-to-right across the transition viewport.

---

## 2. Design Tokens & Styling Guide

### Palette (Raw Brutalist Monochromatic Warmth)
- **Backgrounds**: Vintage Warm Linen `#EBE9E4`, Pure White `#ffffff`, Obsidian `#111111`
- **Accents**: Pure Black `#000000`, Deep Dark Charcoal `#0a0a0a`
- **Strokings**: Thin black borders (`border-black/20`, `border-black`)

### Typography
- **Headings**: Aggressive black-weighted uppercase tracking-tighter (`font-black uppercase tracking-tighter`)
- **Body / Manifesto**: Giant bold monospaced or uppercase words with staggered opacity properties.
