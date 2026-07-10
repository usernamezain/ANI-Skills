---
name: custom-inertial-cursor
description: Designing a custom monochromatic dual-element cursor system with motion interpolation (lerp), magnetic properties, and hover expansion triggers.
---

# Custom Monochromatic Inertial Cursor

Use this skill to implement custom inertial dual-element pointer cursors, hover states, and smooth movement interpolations in web applications.

---

## 1. Setup Guide

1. Disable standard cursors using CSS rules (`cursor: none !important`).
2. Insert helper elements for the inner dot and outer ring.
3. Track client coordinates dynamically and apply linear interpolation (`lerp`) calculations in a `requestAnimationFrame` loop.
4. Set `pointer-events: none` on cursor layers to prevent click interception issues.
5. Apply media queries to revert styles on mobile touch-screen devices.

---

## 2. Resource Files

For structural layouts, styles, and movement scripts, refer directly to:
- [Implementation Reference](references/IMPLEMENTATION.md) — HTML templates, CSS classes, and JavaScript coordinate math.
