---
name: ani:pro:image-slider
description: Generate a premium WebGL (THREE.js) + GSAP React image slider. Use this whenever the user asks for a beautiful, cinematic image slider, hero slider, or specific WebGL transition galleries. Highly customizable based on user's design requests.
---

# Image Slider (WebGL + GSAP)

When triggered, this skill generates a cinematic, highly-performant React/Next.js image slider that uses WebGL (via `three.js`) and `gsap` for custom shader transitions and synchronized typography animations.

## Instructions

1.  **Read Reference:** Review `references/component.tsx` to understand the default implementation using a displacement shader, synced GSAP animations, and the exact component structure.
2.  **Adapt Design:** This skill is highly flexible. The user may request different design possibilities. If the user specifies variations (e.g., "make the text aligned to the right", "use a liquid ripple shader transition", "change the typography to modern sans-serif", or "make the slider horizontal"), adapt the reference code to fulfill their exact design request.
3.  **Dependencies:** Ensure the code imports `three` and `gsap`. Remind the user to install them if you detect they aren't in the project.
4.  **Preserve Core Logic:** Even if adapting the design, maintain the robust synchronization between the WebGL scene, the GSAP timeline, and React state.
5.  **Return ONLY the full code implementation. No explanations, comments, or additional text. Just the working code.**

## Design Possibilities (To keep in mind for user requests):

-   **Shader Variations:** The reference uses a vertical displacement shader. You can rewrite the GLSL to create wipe effects, water ripples, noise burns, or pixelation.
-   **Typography & Layout:** The reference uses an elegant *Playfair Display* bottom-left layout. You can flip this to a bold, brutalist, or minimalist layout.
-   **Controls:** The reference uses vertical numeric pagination. You can implement draggable slides, next/prev arrows, or auto-hide controls.

## Output Requirements

-   The output must be the raw, functional code for the component.
-   Follow the user's specific design variations if requested; otherwise, use the pixel-perfect reference exactly as provided.
