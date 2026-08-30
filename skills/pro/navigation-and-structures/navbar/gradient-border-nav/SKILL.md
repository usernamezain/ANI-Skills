---
name: ui:pro-navigation-and-structures-navbar-gradient-border-nav
description: Generate a dark, premium SaaS/AI navbar with a spinning conic-gradient animated border, glassmorphism backdrop, and a controlled active state — the go-to for AI-native and modern SaaS brands.
---

# Gradient Border Nav

A dark, premium navbar favored by AI-native startups, modern SaaS brands, and developer tools. Features a spinning conic-gradient animated border on a frosted glass pill container — combining the best of glassmorphism and neon/gradient aesthetics. Inspired by Vercel, Resend, and Linear's navigation patterns.

## Features

- **Animated Conic-Gradient Border**: The nav's outer wrapper uses a `bg-[conic-gradient(from_var(--angle),#6366f1,#a855f7,#ec4899,#6366f1)]` border simulation. A `@property --angle` CSS custom property is animated from `0deg` to `360deg` via `animation: spin 3s linear infinite`, creating a continuously rotating prismatic border.
- **Frosted Glass Container**: Inner container uses `bg-zinc-900/80 backdrop-blur-xl` with `rounded-full` — the gradient border "wraps" it via a 1px padding wrapper technique.
- **Active State Pill**: Active links get a `bg-white/10` rounded-full background with `text-white`, while inactive links use `text-zinc-400 hover:text-zinc-200`.
- **Dark-First Design**: All text, backgrounds, and states are calibrated for dark backgrounds. The nav sits on `bg-zinc-950` environments with the grid pattern background.
- **Responsive Pill Shape**: The entire nav is `rounded-full` with `px-2 py-2` outer padding. Items are `px-4 py-2 rounded-full` individually for individual click targets.
- **Logo Slot**: Left-aligned geometric/text logo. Uses `text-white font-bold` for maximum contrast on dark.
- **CTA Button**: Right-aligned button with a gradient background (`bg-gradient-to-r from-indigo-500 to-purple-500`) and `text-white` — matches the border animation color palette.

## Component Structure

Located at `references/component.tsx`. Exports `GradientBorderNav` as named export.

- `GradientBorderNav` — accepts `items: NavItem[]` and optional `className`
- Internal state: `activeItem` (string, defaults to first item)
- Outer wrapper: gradient border simulation via padding + conic-gradient
- Inner wrapper: frosted glass pill

## Props Interface

```ts
type NavItem = { name: string; href: string; }
interface NavProps { items: NavItem[]; className?: string; }
```

## CSS Requirements

The `--angle` CSS custom property rotation animation requires `@property --angle` declaration in global CSS or a `<style>` tag within the component for the Houdini animation to work:

```css
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes spin {
  to { --angle: 360deg; }
}
```

## Dependencies

- `framer-motion` (optional, for item hover states)
- `clsx` / `cn` utility

## When to Use

Use when the brand is: AI-native, developer-focused SaaS, modern infrastructure, or any dark-mode-first product. **Do not use** for consumer/lifestyle brands — use `apple-glass-nav` instead. **Do not use** for brutalist/hand-drawn aesthetics — use `sketchy-nav` instead.
