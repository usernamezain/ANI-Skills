---
name: antigravity:pro:grid-distortion
description: Generate an interactive WebGL-based grid displacement distortion canvas using Three.js DataTexture and custom shaders. Features chromatic aberration (RGB channels split) responsive to mouse gesture speeds, relaxation friction physics, and automatic container aspect ratio cover fitting. Use this skill when the user requests grid distortion, mouse ripples on images, interactive liquid picture distortion, or chromatic WebGL image hover warp effects.
---

# WebGL Grid Distortion

An ultra-premium, high-performance interactive WebGL component powered by Three.js and custom shaders. It creates a physical grid data texture over an image, driving fluid wave distortions, liquid ripples, and RGB channel separation splits (chromatic aberration) that react dynamically to cursor speed and direction.

## Component Spec

To render the component, drop it into your page as follows:

```tsx
import GridDistortion from "@/src/components/CrazyComponents/tsx/GridDistortion";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen">
      <GridDistortion imageSrc="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1000&auto=format&fit=crop" />
    </div>
  );
}
```

## Implementation Guidelines

1. **Object-Fit Cover Math:** In the fragment shader, dynamically compute aspect ratios using resolution vectors (`resolution` and `imageResolution`) to map texture UVs safely, guaranteeing that imagery fills the canvas without vertical or horizontal stretching.
2. **WebGL DataTexture Grid Physics:** Store displacement states inside a custom `THREE.DataTexture` backed by a `Float32Array`. On every render loop, apply relaxation factors (`relaxation = 0.9`) to slowly dampen forces over time, returning the grid texture to a neutral zero state.
3. **Cursor Speed Vector Splatting:** Calculate mouse velocity (`vX` and `vY`) inside a `mousemove` handler. Map the normalized cursor points to active cells in the grid, injection-splatting force vectors multiplied by proximity distances (`maxDist / Math.sqrt(distSq)`) into the texture channels.
4. **Chromatic Aberration (RGB Split):** Offset Red, Green, and Blue sample UVs at varying scales (`0.02`, `0.015`, `0.01`) based on displacement values inside the data texture, producing stunning neon/prism split visual sweeps during fast actions.
5. **Robust Resize Observer:** Bind a `ResizeObserver` to the parent container node to trigger viewport projection updates on the orthographic camera and scale plane models dynamically.
