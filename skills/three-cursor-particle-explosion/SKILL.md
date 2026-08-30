---
name: ui:cursor-particle-explosion
description: Projects 2D mouse coordinates into a 3D perspective camera world plane to create cursor-following meshes and physics-based click particle shard explosions.
---

# 3D Cursor Projection & Click Particle Explosion

Use this skill to implement custom mouse projection interactions in WebGL/Three.js environments, along with smooth interpolations and physics-based shard particle explosions.

---

## 1. Integration Steps

1. Calculate Normalized Device Coordinates (NDC) from viewport coordinates.
2. Unproject coordinates from the camera view plane using the inverse projection matrix.
3. Perform ray/plane intersection math to get coordinates on the virtual interaction plane.
4. Lerp position coordinates dynamically in the render loop to create movement lag.
5. On `mousedown`, instantiate particle meshes and animate them along spherical velocity vectors.
6. **Crucial:** Always clean up expired meshes by calling `.dispose()` on geometries/materials to prevent memory leaks.

---

## 2. Implementation Guide

For code libraries, math models, and updates, refer directly to:
- [Implementation Reference](references/IMPLEMENTATION.md) — Mathematical equations, Javascript projection scripts, physics explosion listeners, and render loops.
