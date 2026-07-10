# DESIGN SEEK: WebGL Distortions & Kinetic Interfaces

This document defines the mathematical foundations, core mechanics, and interactive layouts powering the **Kinetic Void** landing page design system.

---

## 1. Core Mechanics & Math

### A. WebGL Mesh Distortion Math
The focal point of the interface is the wobbly fluid 3D sphere. The vertex displacement is calculated inside the GPU shaders using continuous fractal noise:
- **Sphere Geometry**: `Sphere args={[1, 100, 100]}` (creates a high-resolution sphere mapping 10,000 vertices to ensure smooth deformations).
- **Distort Factor ($d$)**: `0.5`
- **Distort Speed ($s$)**: `2.0`
- **Mouse Dynamics**: Vertex rotations follow a low-pass filter tracking the normal-normalized mouse vector $(X_n, Y_n) \in [-1, 1]$:
  $$R_x \leftarrow R_x + (Y_n \times 0.5 - R_x) \times 0.05$$
  $$R_y \leftarrow R_y + (X_n \times 0.5 - R_y) \times 0.05$$

### B. Glassmorphism Backdrops
Navigations utilize strict light transmission settings to merge with the WebGL canvas:
- **CSS Filters**: `backdrop-blur-xl bg-black/20 border border-white/10`
- **Ping Effects**: Continuous scaling cycles tracking the state heartbeat.

---

## 2. Design Tokens & Styling Guide

### Palette (Obsidian & Quantum Indigo)
- **Primary Canvas**: Dark Space `#050505`
- **Material Base**: Metallic Dark `#1a1a1a` (metalness: `0.9`, roughness: `0.2`)
- **Accents**: Neon Indigo `#6366f1` (Tailwind `indigo-500`), Cosmic Purple `#a855f7`

### Typography
- **Core Titles**: Geometric bold sans tracking-tighter (`font-bold tracking-tighter`)
- **Metadata**: Monospace small tracking-widest (`font-mono text-xs tracking-widest`)
