---
name: ui:pro-navigation-and-structures-navbar-apple-glass-nav
description: Generate a glassmorphic, iOS/macOS-inspired navbar with a Framer Motion layoutId-driven animated active pill that glides between nav items with Apple-caliber spring physics.
---

# Apple Glass Nav

An Apple-inspired frosted glass navbar with a floating, shape-shifting active indicator. The pill dynamically repositions between navigation links using `framer-motion`'s `layoutId` — achieving seamless, GPU-accelerated transitions with zero JavaScript position calculations. Designed for consumer apps, portfolio sites, and high-end SaaS products.

## Features

- **Frosted Glass Material**: The nav container uses `backdrop-blur-xl` + `bg-white/20` + `border border-white/30` to simulate the precise Apple "vibrancy" frosted glass material seen in macOS menus and iOS sheets.
- **`layoutId` Active Pill**: A `motion.div` with `layoutId="glass-active"` is absolutely positioned inside the active `<a>` tag. When the active item changes, Framer Motion automatically animates the pill's size, position, and shape between the old and new item — no manual math required.
- **Spring Physics**: The layout animation uses Framer Motion's `transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}` — matching Apple's characteristic slightly bouncy, fluid motion.
- **Blob Background Decoration**: The preview wrapper renders 3 absolutely positioned `div` blobs with `mix-blend-multiply filter blur-xl opacity-70 animate-blob` for a dynamic, colorful environment that shows how the glass adapts to the background.
- **Hover State**: Non-active items use `hover:text-black/80` with a `0.2s` transition. No scale — keeps the micro-interaction subtle and Apple-appropriate.
- **Logo Slot**: Left-aligned logo text with `font-semibold` and a small SVG icon to represent a brand mark.
- **CTA Button**: Right-aligned `Get Started` button with a solid dark background (`bg-black/80`) and `text-white`, contrasting the transparent nav.

## Component Structure

Located at `references/component.tsx`. Exports `AppleGlassNav` as named export.

- `AppleGlassNav` — accepts `items: NavItem[]` and optional `className`
- Internal state: `activeItem` (string, defaults to first item)
- Each nav item renders a relative `<a>` wrapping a conditional `<motion.div layoutId="glass-active">`

## Props Interface

```ts
type NavItem = { name: string; href: string; }
interface NavProps { items: NavItem[]; className?: string; }
```

## Dependencies

- `framer-motion`
- `clsx` / `cn` utility (optional, for conditional classes)

## When to Use

Use when the brand feels consumer, premium, or Apple-adjacent. Perfect for: portfolio sites, iOS/macOS app landing pages, design tool SaaS, luxury e-commerce. **Do not use** for brutalist, developer-tool, or heavy dark-mode SaaS brands — use `gradient-border-nav` instead.
