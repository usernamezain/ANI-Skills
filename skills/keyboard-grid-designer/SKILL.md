---
name: ui:keyboard-grid
description: Skill for designing interactive custom keyboard grids with GSAP. Trigger when the user mentions custom keyboard, virtual key layouts, or accelerator composition.
---

# Keyboard Grid Designer Skill

Use this skill to design responsive virtual keyboard layouts, handle multi-modifier combinations, and render GSAP interaction feedback.

---

## 1. Setup & Integration Workflow

To build a virtual keyboard layout:
1. Define the physical key proportions matching standard layout dimensions (e.g. 1.25u, 1.5u, 2.0u, etc.).
2. Apply the proportional sizing equation:
   $$\text{width}_{\text{pixels}} = \text{uWidth} \times (\text{baseWidth} + \text{gap}) - \text{gap}$$
3. Instantiate the DOM elements ensuring all modifier buttons are set to `-webkit-app-region: no-drag;` to prevent window-dragging interference inside Electron apps.
4. Bind mouse clicks and keyboard events to handle hotkey composition and triggers.

---

## 2. Resources & Implementation Details

For copy-pasteable codes, animation setups, and implementation guides, refer directly to:
- [Implementation Reference](references/IMPLEMENTATION.md) — Detailed class lifecycle configurations, layout structure matrices, CSS styling files, and GSAP interaction tweens.
