# DESIGN SEEK: Premium Editorial Layouts & Spring Drag Mechanics

This document defines the mathematical foundations, core mechanics, and premium layouts powering the **Magazine** landing page design system.

---

## 1. Core Mechanics & Math

### A. Spring-Damped Cursor Image Dragging
To give the floating image modal a feeling of tactile inertia, coordinates are smoothed using a custom spring model:
- **Spring Variables**:
  - `stiffness`: `150` (forces the modal to snap quickly)
  - `damping`: `15` (prevents excessive osculation)
  - `mass`: `0.1` (keeps the modal feeling lightweight and rapid)
- **Centering Correction**: The floating modal offsets its top-left coordinates by half of its bounding box dimensions to remain centered on the tip of the cursor:
  $$\text{RenderX} = X_m - \frac{\text{width}}{2}$$
  $$\text{RenderY} = Y_m - \frac{\text{height}}{2}$$

### B. High-End Editorial Grids
Visual Indexes are structured in asymmetrical groupings to evoke magazine pages:
- **Vertical Offsets**: Alternating items are displaced up or down:
  - Even Columns: `md:mb-24`
  - Odd Columns: `md:mt-24`

---

## 2. Design Tokens & Styling Guide

### Palette (High-Fashion Linen & Deep Black)
- **Canvas Base**: Creamy Linen `#f4f4f0`
- **Text / Solid Accents**: Obsidian Black `#000000`
- **Faded Highlights**: Soft Stone Gray `#737373` (Tailwind `neutral-500`)

### Typography
- **Headings**: Elegant serifs paired with italic skews (`font-serif italic text-8xl tracking-tighter`)
- **Metadata**: Monospaced all-caps tracking-widest (`font-mono text-xs uppercase tracking-widest`)
