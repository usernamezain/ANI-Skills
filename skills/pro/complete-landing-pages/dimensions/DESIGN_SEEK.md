# DESIGN SEEK: Dimensions Geometric Canvas

This document defines the mathematical foundations, core mechanics, and geometric layouts powering the **Dimensions** landing page design system.

---

## 1. Core Mechanics & Math

### A. Split Text Reveal Math
To simulate high-end physical reveals, text characters are split into separate `span` elements and rotated along the X-axis with perspective.
- **Perspective Parent**: `perspective: 1000px`, `overflow: hidden`
- **Initial Character State**: `opacity: 0`, `y: 100px`, `rotateX: -90deg`
- **Target Character State**: `opacity: 1`, `y: 0`, `rotateX: 0deg`
- **Pacing**: `stagger: 0.02s`, `duration: 1.2s`, Easing: `power4.out`

### B. Scroll-Hijacked Horizontal Axis Pinning
The transition from vertical scroll to horizontal pane translation is achieved by pinning the container and translating the target scroll track:
$$\text{Translation Offset} = -100\% \times (\text{number of panels} - 1)$$
- **GSAP Configuration**:
  - `trigger`: Scroll-hijack target container
  - `pin`: `true` (locks the scrollbar position)
  - `scrub`: `1` (ensures 1-second lag smoothing for buttery feedback)
  - `end`: `() => "+=" + trackWidth` (pins the section exactly for the length of horizontal content)

### C. Exploding 3D Bento Layouts
Using the `perspective-1000` context, child nodes are staggered on viewport entrance:
- **Transform Variables**:
  - `rotationX`: $45^\circ \to 0^\circ$
  - `scale`: $0.8 \to 1.0$
  - `y`: $150\text{px} \to 0\text{px}$
- **Easing**: `power3.out`

---

## 2. Design Tokens & Styling Guide

### Palette (High-Contrast Monochromatic & Cyan)
- **Backgrounds**: Deep Obsidian `#050505`, Zinc Dark `#111111`, White `#ffffff`
- **Accents**: Neon Cyan `rgba(6, 182, 212, 1)` (Tailwind `cyan-500`)
- **Text**: Pure White, Monochromatic Gray, Cyan Highlight

### Typography
- **Headings**: Aggressive black-weighted uppercase tracking-tighter (`font-black uppercase tracking-tighter`)
- **Metadata**: Monospaced small-caps tracking-widest (`font-mono text-xs tracking-widest`)

---

## 3. Extending the Component System
To add new spatial zones:
1. Append an `.h-item` div to the horizontal track inside `DimensionShifter` and increment `w-[400vw]` (e.g. to `w-[500vw]`).
2. Add a `gsap.from()` animation inside the `DimensionShifter` timeline using `containerAnimation: scrollTween` to trigger elements relative to the horizontal progress.
