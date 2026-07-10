# DESIGN_SEEK: Brutalism Architecture & Animation Philosophy

This document serves as the detailed design schema and philosophical proof for the **Brutalism Complete Landing Page** skill. It outlines *why* certain CSS properties are used, *how* GSAP and Framer Motion interact to create the desired aesthetic, and *what* to add when expanding this architecture.

## 1. The Core Philosophy
Neo-Brutalism in web design is a reaction against the overly polished, soft, "corporate Memphis" aesthetic. It emphasizes:
- **Raw Structure**: Exposing the grid and the "bones" of the design.
- **Maximum Contrast**: Pure blacks, pure whites, and highly saturated accent colors (e.g., `#ff4800`).
- **Absence of Subtlety**: No soft drop shadows. No rounded corners unless exaggerated.

## 2. CSS & Tailwind Implementations
To achieve this, the CSS relies on specific Tailwind patterns:

### Hard Shadows
Instead of `shadow-md` (which utilizes gaussian blur), we use explicit offset shadows with zero blur:
```css
/* Brutalist Shadow */
box-shadow: 8px 8px 0px 0px rgba(0,0,0,1);
```
**Usage Rule**: Apply to buttons, image wrappers, and layout cards. On hover, increase the offset (e.g., `12px` to `20px`) rather than the blur.

### Borders
Borders must be thick and unapologetic. 
- Use `border-4` or `border-8`.
- Keep border colors `#000000` (black) or `#FFFFFF` (white) to define structural boundaries.

### Typography
- **Families**: Mix aggressive `sans-serif` (like Inter/Helvetica/Impact) for headings with strict `monospace` for data/subtitles.
- **Styling**: `font-black`, `uppercase`, `tracking-tighter` (negative letter spacing), and extreme line-heights (`leading-[0.8]`).

## 3. Animation Libraries & Integration

### A. GSAP (GreenSock Animation Platform)
**Role**: Structural scroll control, staggered typography, and complex timeline scrubbing.

1. **The Pinned Horizontal Scroll (`PinnedFeatures`)**
   - *Why GSAP over Framer Motion here?* GSAP's `ScrollTrigger` with `pin: true` and `scrub: 1` provides unmatched performance and precise control over viewport locking while translating the horizontal track (`x: "-66.66%"`). It feels strictly mechanical, fitting brutalism.
2. **BrutalReveal (3D Text)**
   - Elements start at `rotateX: -90` with a shifted `transformOrigin`. When scrolled into view, they snap to `rotateX: 0` using `power4.out`. This creates a heavy, physical "slamming" effect rather than a soft fade.
3. **Gallery Scrubbing**
   - Using GSAP to transition CSS filters (`grayscale(100%) contrast(200%)` to `grayscale(0)`) tied directly to the scrollbar creates a raw, tactile interaction.

### B. Framer Motion
**Role**: Physics-based micro-interactions and layout transitions.

1. **The 3D Tilt Card (`TiltCard`)**
   - *Implementation*: Uses `useMotionValue` to track mouse position relative to the container center.
   - *Physics*: Passes the raw mouse data through a `useSpring({ stiffness: 300, damping: 30 })`. The high stiffness and low damping make the card feel heavy and responsive, rejecting the "floaty" feel of standard animations.
2. **Hover States (`BrutalButton`)**
   - Buttons scale up (`scale: 1.02`), translate negatively (`x: -4, y: -4`), and expand their hard shadow. This creates a physical "pop" effect.

## 4. Expanding the Design (What to Add Next)
When extending this component or building new brutalist sections, adhere to these rules:

1. **New Layouts**: Always separate columns and rows with visible `border-black` lines. Do not rely on whitespace alone to define sections.
2. **New Interactions**: If creating a new hover effect, use `mix-blend-difference` or invert colors entirely (e.g., black background with white text flips to white background with black text).
3. **New Animations**: Avoid `ease-in-out` for major transitions. Prefer `expo.out` or `back.out(1.5)` so elements snap aggressively into place.
4. **Data Visualization**: If adding charts or stats, use highly geometric SVG shapes with no anti-aliasing (or simulated pixelation) and thick stroke widths.
