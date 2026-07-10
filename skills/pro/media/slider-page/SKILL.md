---
name: ani:pro:slider-page
description: Generate an ultra-premium WebGL-based slideshow component utilizing Three.js and custom shaders to produce liquid glass refractions, chromatic aberrations, and bubble lens displacement transitions. Includes auto-play linear progress indicators, Tweakpane configuration binds, and a smooth radial dot canvas preloader. Use this skill when the user requests a WebGL slider, liquid glass displacement transition, three.js media slideshow, or interactive photo gallery with professional controls.
---

# WebGL Liquid Glass Slider Page

An ultra-premium, interactive media slideshow page powered by Three.js WebGL and custom fragment shaders. Features a smooth, fluid glass bubble refraction displacement transition between slides, HSL/RGB chromatic aberration split offsets, interactive slides navigation bar with linear loading bar percentages, Tweakpane visual control binders, and a complex physics-simulated radial dot canvas preloader.

## Component Spec

To render the component, drop it into your page as follows:

```tsx
import SliderPage from "@/src/components/CrazyComponents/tsx/SliderPage";

export default function Page() {
    return <SliderPage />;
}
```

## Implementation Guidelines

1. **Custom Refraction Shaders:** Implement vertex and orthographic projection matrices. The fragment shader must use custom cover UV scale helper coordinates (`getCoverUV`), multi-level smooth simplex noises (`smoothNoise`), and complex refractive vector mathematical equations to warp textures over a progressive bubble radius (`glassEffect`).
2. **Radial Canvas Preloader:** Draw center dot anchors and multiple rings of orbiting particles (`dotRings`) with custom easing parameters (`easeInOutSine`, `easeInOutCubic`) and brightness/radius pulses to build a sleek loading experience before WebGL assets load.
3. **Timed Navigation Indicators:** Implement auto-sliding schedules using interval ticks to calculate active slide progress. Render linear DOM nodes that expand horizontally and reset to zero once transitions complete.
4. **GSAP WebGL Intersections:** Interpolate progress uniforms (`uProgress`) utilizing smooth GSAP easing functions (`power2.inOut`) to synchronize WebGL rendering layers with DOM-state updates.
5. **Dynamic Tweakpane Controllers:** Integrate Tweakpane UI panes allowing users to bind and tune parameters like `globalIntensity`, `distortionStrength`, and `glassRefractionStrength` in real time. Show or hide via keyboard binds (e.g., 'KeyH').
