---
name: ani:pro:cartoonish
description: Generate a premium, highly energetic Neo-Brutalist "Cartoonish" hero landing page section with active cursor eye-tracking pupil animations, floating stickers with physics-based sine wave hovering, thick black outlines, infinite marquees, and elastic GSAP pop entrance reveals. Use this skill when the user requests a playful cartoonish landing page, neo-brutalist interface, loud bold typography, or custom eye-tracking elements.
---

# Cartoonish Neo-Brutalist Hero Section

An ultra-premium, interactive landing page hero section utilizing vibrant pop colors, thick black borders (Neo-Brutalism), custom cursors, floating/hovering decorative badges, and active eye pupils that trace the user's cursor position in real time.

## Component Spec

To render the component, drop it into your page as follows:

```tsx
import Cartoonish from "@/src/components/CrazyComponents/tsx/Cartoonish";

export default function Page() {
    return <Cartoonish />;
}
```

## Implementation Guidelines

1. **Vibrant Neo-Brutalist Theme:** Enforce thick black borders (`border-4 border-black`), deep flat shadows (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`), bright bold styling hues (yellow, neon blue, lime, hot pink), and loud display headers (`font-family: 'Bangers'`).
2. **Interactive Eye Tracking:** Keep eye pupil positions bound to the cursor position by computing screen offsets via coordinates. Track custom offsets dynamically inside active pupils utilizing translate transforms (`translate(calc(-50% + x), calc(-50% + y))`).
3. **GSAP Elastic Entrances:** Pop main elements, buttons, and headers on page mount utilizing staggered elastic ease timelines (`stagger: 0.1`, `ease: 'elastic.out(1, 0.5)'`). Keep polka dot grids sliding smoothly in the background.
4. **Physically Floating Badges:** Embed sticker decorators (`Sticker`) utilizing independent sine wave parameters (`gsap.to(ref.current, { y: -15, rotation: 5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay })`) to simulate organic bobbing/floating motions.
5. **Infinite Marquees:** Utilize linear CSS animations to translate horizontal marquee elements endlessly (`transform: translateX(-50%)`), making sure boundary elements do not jitter or gap during resets.
