---
name: antigravity:pro:navigation:sketchy-nav
description: Generate a hand-drawn, organic navbar with SVG scribble path animations for the active state — built for indie makers, creative portfolios, and personality-driven brands.
---

# Sketchy Nav

An organic, imperfect, hand-drawn navigation bar inspired by Excalidraw, Notion's playful moments, and indie maker blogs. The active navigation item gets a two-layered SVG marker scribble drawn underneath it using Framer Motion's `pathLength` animation — first a thick yellow highlighter stroke, then a thin black pencil stroke on top. Nothing is perfectly straight. Everything has personality.

## Features

- **Dual-Layer SVG Scribble Active Indicator**:
  - **Layer 1 (Highlighter)**: A thick, irregular SVG `<path>` using `stroke="#FDE047" strokeWidth="8"` with `strokeLinecap="round"` is animated from `pathLength: 0` to `pathLength: 1` when a tab becomes active.
  - **Layer 2 (Pencil)**: A thinner overlapping `<path>` using `stroke="#1a1a1a" strokeWidth="1.5"` animates with a `delay: 0.1` after the highlighter — simulating hand-drawing with a pen over the highlight.
  - Both paths use `framer-motion`'s `animate={{ pathLength: isActive ? 1 : 0 }}` with `transition={{ duration: 0.4 }}`.
- **Organic Typography**: Uses 'Caveat' or 'Patrick Hand' Google Font (loaded via `@import` in global CSS) for the nav items — the handwritten font reinforces the sketchy aesthetic at a typography level.
- **Wobbly Background on Hover**: Non-active items use a subtle `hover:bg-yellow-50` background with `rounded-sm` (not `rounded-full`) for an organic, imprecise feel.
- **No Perfect Geometry**: Intentionally uses `rounded-[4px]` instead of `rounded-full`, and slight `rotate-[-0.5deg]` on the container for the "drawn by hand" feel.
- **SVG Path Shape**: The scribble path `d` attribute is a slightly irregular wavy line (`M 5,12 Q 20,10 40,13 Q 60,16 80,12 Q 95,10 110,13`) — not a straight line, mimicking a real marker stroke.

## Component Structure

Located at `references/component.tsx`. Exports `SketchyNav` as named export.

- `SketchyNav` — accepts `items: NavItem[]` and optional `className`
- Internal state: `activeItem` (string, defaults to first item)
- Each item renders a `relative` positioned container with an absolute SVG below the text

## Props Interface

```ts
type NavItem = { name: string; href: string; }
interface NavProps { items: NavItem[]; className?: string; }
```

## Dependencies

- `framer-motion` (for `pathLength` SVG animation)
- Google Font: `Caveat` or `Patrick Hand` (loaded via `@import` or `next/font/google`)

## When to Use

Use when the brand is: indie, creative, educational, portfolio-driven, or deliberately anti-corporate. Great for: personal portfolios, education platforms, creative agencies, productivity tools with personality. **Do not use** for AI-SaaS, infrastructure tools, or any brand that needs to project authority and precision.
