---
name: ui:pro-ui-components-image-cursor-trail
description: Generate a premium React GSAP image trail effect that follows the user's cursor. Use this whenever the user asks for a mouse trailing effect, cursor images, or interactive hero backgrounds.
---

# Image Cursor Trail

When triggered, this skill generates a highly performant, interactive React component that leaves a trailing path of images tracking the user's mouse movement using `gsap`.

## Instructions

1.  **Read Reference:** Review `references/component.tsx` to understand the implementation leveraging `useRef` state and `gsap` timelines to achieve 60fps tracking without triggering React re-renders.
2.  **Implementation:** Reproduce the component perfectly in the user's project (React or Next.js).
3.  **Dependencies:** Ensure the code imports `gsap`. Remind the user to install it if you detect it isn't in the project.
4.  **Customization:** The component accepts `images` and `trailDistance`. The design can be adapted if the user wants different trailing logic or images. Ensure the central text remains "ANI" as defined in the reference.
5.  **Return ONLY the full code implementation. No explanations, comments, or additional text. Just the working code.**

## Output Requirements

-   The output must be the raw, functional code for the component.
-   Follow the exact implementation from the reference component.
