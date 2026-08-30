---
name: ui:pro-backgrounds-visuals-cable-cursor
description: Generate a premium interactive HTML5 Canvas-based cable/whip cursor trailing effect (Harmonic Stream) with additive blending, dynamic HSL rainbow colors responsive to mouse velocity, orbit physics, and smooth tail histories. Use this skill when the user asks for a sketchy line cursor, interactive ribbon cursor, cosmic particle whip, or colorful custom cursor trails on canvas.
---

# Cable Cursor (Harmonic Stream)

An ultra-fluid, interactive HTML5 Canvas cursor trailing effect. It creates multiple orbiting strands that follow the cursor with varying lags, creating a whip-like harmonic stream. Features HSL color cycles, mouse speed velocity feedback (lines glow brighter/whiter when moved fast), and additive blending for premium visual results.

## Component Spec

To render the component, drop it into your page as follows:

```tsx
import SketchyLine from "@/src/components/CrazyComponents/tsx/SketchyLine";

export default function Page() {
    return <SketchyLine />;
}
```

## Implementation Guidelines

1. **Orbit Physics & Lag:** Implement dynamic orbit logic around the cursor coordinates utilizing sine/cosine offsets per strand (`BASE_RADIUS + Math.sin(frame * 0.05 + phaseOffset) * 10`). Assign incremental lags (`0.1 + (index / STRAND_COUNT) * 0.05`) to create a delayed drag/whip trail.
2. **Dynamic Coloring & Velocity:** Drive HSL hue rotations through time (`frame` counts) and index distribution (`index * (360 / STRAND_COUNT)`). Read mouse speed coordinates (`Math.abs(vX) + Math.abs(vY)`) to dynamically adjust HSL lightness, simulating energy surges under rapid movement.
3. **Canvas Drawing Modes:** Ensure background fills use low opacity overlays (`rgba(0, 0, 0, 0.1)`) and `globalCompositeOperation = 'source-over'` to preserve historical frame trails. Strands themselves must use `globalCompositeOperation = 'lighter'` (additive blending) to create high-contrast glowing intersections.
4. **Touch Support & Responsiveness:** Listen to both `mousemove` and `touchmove` events to map target coordinates, disabling default touch gestures to prevent viewport disruptions.
