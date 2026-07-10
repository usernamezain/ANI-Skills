# Design Seek: Apple Glass Nav

## Visual Language
- **Vibe:** High-end Consumer, Sleek, Transparent, iOS/macOS Inspired, Tactile
- **Color Palette:** Fully adaptive — the nav itself has no dominant color. It uses `bg-white/20` and `border-white/30`, letting the page background bleed through. Logo and text are `text-gray-900` (on light backgrounds) or conditionally white.
- **Shapes:** Perfectly pill-shaped outer container (`rounded-full`). Each nav item is also `rounded-full` for individual hit targets. Nothing has sharp corners.
- **Material Quality:** The single most important visual detail — `backdrop-blur-xl` combined with `bg-white/20` creates the authentic frosted glass material. Increasing `bg-white` opacity above `0.4` will break the glass illusion and make it opaque.

## Key Interactions & Physics

1. **Dynamic Island-Style Active Pill (Core Interaction):**
   - An `absolute`-positioned `motion.div` with `layoutId="glass-active"` renders inside the currently active nav item.
   - When `activeItem` state changes (on click), Framer Motion uses its internal FLIP algorithm to automatically calculate and animate the `top`, `left`, `width`, and `height` delta between the old position and new position.
   - No JavaScript position tracking. No `getBoundingClientRect()`. The `layoutId` is the entire magic.
   - Physics: `transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}` — a subtle, confident spring. Increasing `bounce` above `0.5` makes it feel playful. Below `0.2` feels sluggish.

2. **Hover Micro-Interaction:**
   - Non-active links: `hover:text-gray-900/80` with `transition-colors duration-200`.
   - No scale, no translate — keeping hover effects minimal to let the active pill carry all the interaction weight.

3. **Scroll-Reactive Opacity (Optional Enhancement):**
   - On scroll, the nav container can transition from `bg-transparent` to `bg-white/20 backdrop-blur-xl` using a `useScroll` listener and a simple `threshold: 50px` trigger — making the glass "materialize" on scroll.

## Color System

| Element        | Value                  |
|----------------|------------------------|
| Container BG   | `bg-white/20`          |
| Border         | `border border-white/30` |
| Active Pill    | `bg-white/40`          |
| Active Text    | `text-gray-900`        |
| Inactive Text  | `text-gray-600`        |
| CTA Button     | `bg-black/80 text-white` |
