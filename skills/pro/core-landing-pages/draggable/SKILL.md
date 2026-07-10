---
name: antigravity:pro:draggable
description: Generate a highly interactive retro-styled desktop hero playground section (Playground.OS) using Framer Motion constraints dragging, dynamic z-index layers, OS window frames, bouncing elements, stickers, and Polaroid photos. Use this skill when the user requests a draggable landing page, interactive retro OS desk, collage UI layouts, or web toys built on framer-motion.
---

# Draggable Retro OS Hero Section

An ultra-premium, interactive playground hero section styled after classic desktop interfaces and Neo-Brutalist collage designs. Almost every visual asset on the screen—including word pieces in the headline, system windows, music players, badges, and Polaroid images—is an independent physical element that users can drag, toss, or stack in real time.

## Component Spec

To render the component, drop it into your page as follows:

```tsx
import PlaygroundPage from "@/src/components/CrazyComponents/tsx/Draggable";

export default function Page() {
    return <PlaygroundPage />;
}
```

## Implementation Guidelines

1. **Framer Motion Physics & Easing:** Wrap draggable items in a custom `DragItem` wrapper. Bind the elements inside physical boundary limits utilizing `dragConstraints` pointing to the main container ref. Enforce `dragMomentum={false}` to prevent ice-like sliding, and implement minor drag elasticities (`dragElastic={0.2}`).
2. **Dynamic Z-Index Stack:** Manage layering orders by tracking local React state (`zIndex`). When an item starts dragging (`onDragStart`), immediately promote its z-index (`zIndex = 100`) to lift it over all surrounding layers. On drag release (`onDragEnd`), calculate random settle indexes to naturally weave elements in the stack.
3. **Responsive Scaling Badges:** Trigger scale expansions (`scale: 1.05`) and custom grab cursors (`cursor: 'grab'`) on mouse hover. Rotate elements slightly inside drag actions to mimic manual handling physics (`rotate: Math.random() * 10 - 5`).
4. **Retro Subcomponents:** Design custom helper modules like operating system frames (`RetroWindow`), vinyl spinning records (`MusicPlayer`), and Captioned Grayscale Polaroids (`Polaroid`) utilizing clean black borders, display monospace typography, and interactive button controls.
5. **Local Portability Helpers:** Use clean local class name merging strategies to avoid external merge library dependencies, keeping files completely isolated and drop-in ready.
