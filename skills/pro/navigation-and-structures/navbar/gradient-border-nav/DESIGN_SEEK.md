# Design Seek: Gradient Border Nav

## Visual Language
- **Vibe:** AI-Native, Premium Dark SaaS, Neon Prismatic, Modern Infrastructure
- **Color Palette:** Deep zinc backgrounds (`zinc-950` / `#09090b`). Neon gradient accent pulling from indigo → violet → pink → indigo cycle. Text in zinc-100 (active) and zinc-400 (inactive). Everything is dark-first.
- **Shapes:** Outer wrapper is `rounded-full`. Inner container is `rounded-full`. Each nav item is `rounded-full`. The pill-within-pill geometry is essential — the outer gradient becomes a glowing border.
- **Border Technique:** NOT a real CSS border. A 1px padding wrapper with a `conic-gradient` background IS the border. The inner `bg-zinc-900` container sits inside it, creating the illusion of a spinning gradient border.

## Key Interactions & Physics

1. **Spinning Conic-Gradient Border (Core Visual):**
   - Outer `div`: `background: conic-gradient(from var(--angle), #6366f1, #a855f7, #ec4899, #6366f1)`.
   - CSS `@property --angle` (Houdini CSS) declares `--angle` as an animatable `<angle>` type.
   - `@keyframes spin { to { --angle: 360deg; } }` with `animation: spin 3s linear infinite`.
   - Result: a continuously rotating prismatic border that makes the nav feel alive at all times — even when the user isn't interacting.
   - Without `@property`, the gradient cannot animate — this is a hard CSS Houdini requirement.

2. **Active State Pill:**
   - Active items: `bg-white/10 text-white rounded-full px-4 py-1.5`.
   - No motion/animation on active change — the active state is static. The spinning border provides all the motion energy; adding a moving active pill would create visual noise.
   - Inactive items: `text-zinc-400 hover:text-zinc-200 transition-colors duration-200`.

3. **CTA Gradient Button:**
   - `bg-gradient-to-r from-indigo-500 to-purple-500` — intentionally matches the border gradient color family.
   - `hover:opacity-90 transition-opacity` — simple, no scale transform. Keeps it premium.

## Color System

| Element        | Value                                        |
|----------------|----------------------------------------------|
| Outer Wrapper  | `conic-gradient(#6366f1,#a855f7,#ec4899,...)` |
| Inner Container| `bg-zinc-900/80 backdrop-blur-xl`             |
| Active Item    | `bg-white/10 text-white`                     |
| Inactive Item  | `text-zinc-400`                              |
| CTA Button     | `from-indigo-500 to-purple-500`              |
| Border Width   | `p-[1px]` (1px gradient border simulation)   |
