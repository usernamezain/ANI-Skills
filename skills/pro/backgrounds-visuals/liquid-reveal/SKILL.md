---
name: antigravity:pro:liquid-reveal
description: Generate a highly interactive WebGL fluid simulation component for React. Use this whenever the user requests a liquid reveal, smoke simulation, interactive fluid background, or WebGL fluid canvas.
---

# Liquid Reveal (WebGL Fluid Simulation)

When triggered, this skill generates a highly complex, performance-optimized WebGL fluid simulation running inside a React component. It uses multiple custom GLSL shaders (advection, divergence, pressure) to create an interactive liquid/smoke effect that reacts to mouse and touch movements over an image.

## Instructions

1.  **Read Reference:** Review `references/component.tsx` to understand the WebGL frame buffer object (FBO) implementation and the extensive GLSL shader strings.
2.  **Implementation:** Reproduce the component perfectly in the user's project (React or Next.js).
3.  **Dependencies:** This component utilizes raw WebGL APIs and standard React hooks. Ensure the user's environment supports WebGL extensions like `OES_texture_float`.
4.  **Customization:** The simulation parameters (`SIM_RESOLUTION`, `DYE_RESOLUTION`, `color`, etc.) are configurable within the `useEffect`. The user may request different fluid colors or interaction radii.
5.  **Return ONLY the full code implementation. No explanations, comments, or additional text. Just the working code.**

## Output Requirements

-   The output must be the raw, functional code for the component.
-   Include all GLSL shader constants exactly as they are defined in the reference.
