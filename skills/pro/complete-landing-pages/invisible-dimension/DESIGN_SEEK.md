# DESIGN SEEK: Interactive Flashlight Masking & Dual-Layer Realities

This document defines the mathematical foundations, core mechanics, and interactive layouts powering the **Invisible Dimension** landing page design system.

---

## 1. Core Mechanics & Math

### A. Real-Time Masking Equations
The signature interaction of this system is the interactive "X-ray flashlight." It maps the client cursor coordinates $(X_m, Y_m)$ directly to the CSS mask coordinates of the foreground container:
$$\text{MaskGradient}(x, y) = \text{radial-gradient}(\text{circle } r \text{ at } X_m\text{px } Y_m\text{px}, \text{black } 100\%, \text{transparent } 100\%)$$
- **Framer Motion Integration**:
  - Coordinate tracking utilizes `useMotionValue(0)`.
  - The final CSS mask string is compiled using `useMotionTemplate` to guarantee smooth, sub-pixel hardware-accelerated rendering at 60fps without triggering React virtual DOM tree refreshes.
  - **Flashlight Radius ($r$)**: `250px`

### B. Perfect Dual-Render Structural Syncing
To prevent content layout mismatches while hovering:
1. Both the `Null` (bottom) and `Vivid` (top) layers render the exact same component structure: `<ContentLayer />`.
2. The `Null` layer renders with standard static positioning, capturing scroll events normally.
3. The `Vivid` layer is absolute-positioned and intercepts mouse coordinates, but remains passive to click-throughs via `pointer-events-none`.

---

## 2. Design Tokens & Styling Guide

### Palette (Obsidian & Vivid Gradients)
- **Null Base**: Obsidian `#050505`, Dull Surface Gray `#6b7280` (Tailwind `gray-500`)
- **Vivid Secret**: Vibrant Neon Gradient (`from-blue-500 via-purple-500 to-pink-500`), Active Hot Pink `#ec4899`
- **Cursor Highlight**: Semi-transparent white (`bg-white/10 border-white`)

### Typography
- **Null Mode**: Extralight, thin serifs (`font-thin opacity-20`)
- **Vivid Mode**: Heavy font weight uppercase serif typography (`font-bold`)
