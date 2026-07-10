---
name: ani:pro:flower-animation
description: Generate a complex, animated CSS/React blooming flower scene. Use this whenever the user requests a flower animation, blooming flowers, or a pure CSS/React animated background scene featuring nature elements.
---

# Flower Animation

When triggered, this skill generates a highly complex, pure CSS and React animated scene featuring growing grass, blooming flowers, glowing lights, and floating particles (bubbles/hearts).

## Instructions

1.  **Read Reference:** Review `references/component.tsx` to understand the exact DOM structure and the massive block of CSS keyframes required to power the scene.
2.  **Implementation:** Reproduce the component perfectly in the user's project (React or Next.js).
3.  **Styling:** Ensure the `main-screen` wrapper and all internal `.flower`, `.leaf`, `.grass`, and `.bubble` classes are strictly isolated so they don't break the user's global CSS. The reference uses a `<style jsx global>` block, which should be adapted to standard CSS modules, Tailwind, or global CSS files based on the user's project stack.
4.  **Customization:** The user can pass in `flowerColor`, `nightColor`, and `scale` props. Ensure these CSS variables (`--flower-color`, `--dark-color`) are correctly bound to the root of the component.
5.  **Return ONLY the full code implementation. No explanations, comments, or additional text. Just the working code.**

## Output Requirements

-   The output must be the raw, functional code for the component.
-   Ensure the complex keyframe animations (`blooming-leaf-right`, `growing-grass-ans`, `love-burst`, etc.) are fully included without truncation.
