---
name: antigravity:pro:complete-landing-pages:wabi-sabi
description: Generate a full Japanese Wabi-Sabi philosophy landing page featuring washi paper textures, hanko stamp cursors, vertical kanji-style navigation, parallax scroll, and a deep minimalist atmosphere of impermanence and stillness.
version: 1.0.0
tags: ["landing-page", "framer-motion", "gsap", "zen", "minimalist", "lenis", "textures", "japanese"]
---

# Wabi-Sabi Landing Page

A deeply atmospheric, texture-heavy complete landing page inspired by the Japanese philosophy of *Wabi-Sabi* — finding beauty in imperfection, impermanence, and the natural. Every design decision prioritizes stillness, deliberate pacing, and analog material qualities. Lenis is set to `duration: 2.2s` to force slow, contemplative browsing. Nothing moves fast.

## Features

- **Washi Paper Texture (`WashiTexture`)**: A fixed `::before` pseudo-layer using an inline SVG `<feTurbulence>` noise filter and `mix-blend-overlay` at `opacity: 0.4`. Applied globally across the entire viewport — makes the digital surface feel like hand-made rice paper. Must be `pointer-events-none` and `z-[1]`.
- **Hanko Stamp Cursor (`HankoCursor`)**: A custom cursor rendered as a circular element with a kanji character (`印`). Uses Framer Motion `useSpring` physics with `stiffness: 150, damping: 15` for a heavy ink-stamp trailing lag. `mix-blend-multiply` mode makes it "burn" into the background like red ink on paper.
- **Vertical Navigation (`VerticalNav`)**: Fixed right-side nav using CSS `writing-mode: vertical-rl` and `text-orientation: mixed`. Navigation items are rendered vertically, top-to-bottom, mimicking traditional Japanese printed text. Active state uses a subtle red underline.
- **Hero Parallax (`HeroSection`)**: Muted, desaturated hero image. Uses `framer-motion`'s `useScroll` + `useTransform` for a `y: 0 → -100px` upward parallax drift. Text fades out as scroll progress goes from `0 → 0.3`.
- **Rotating Ink Seal (`HaikuSection`)**: An SVG `<textPath>` follows a circular `<path>` and the entire group rotates infinitely via `motion.svg animate={{ rotate: 360 }}` at `duration: 20, repeat: Infinity, ease: "linear"` — mimicking a traditional official seal (hanko/chop).
- **Ephemeral Archive Grid (`EphemeralArchive`)**: Images displayed in a sparse, asymmetric CSS grid. Each is `grayscale(100%)` by default, transitioning to `grayscale(0%)` on hover over `0.6s ease` — "color appears like memory."
- **Zen Dialogue Accordion (`ZenDialogue`)**: A FAQ/dialogue accordion with hairline `1px` dividers, zero border-radius, and `framer-motion` `AnimatePresence` height animations at `duration: 0.5s ease-in-out`.
- **States of Being (`StatesOfBeing`)**: A scroll-triggered text reveal section where individual characters or words appear one by one using `framer-motion` stagger, simulating the contemplative act of reading poetry.
- **Footer**: Sparse, asymmetric footer with a single red dot accent and minimal copyright text. Maximum whitespace.

## Component Exports

All named exports are in `references/component.tsx`:
- `SmoothScroll` — Lenis wrapper (duration: 2.2)
- `WashiTexture`, `HankoCursor`
- `VerticalNav`
- `HeroSection`, `PhilisophyMa`, `HaikuSection`
- `EphemeralArchive`, `ZenDialogue`, `StatesOfBeing`
- `Footer`

## Integration Notes

- Configure a serif font: `Noto Serif JP` (for authenticity) or `Cormorant Garamond` (for luxury). Load via `next/font/google`.
- `WashiTexture` must sit at `z-[1]` with `pointer-events-none`. All content layers must be `z-[2]+`.
- Lenis duration of `2.2s` is intentional — do not reduce it to feel "faster." The slowness IS the aesthetic.
- Selection colors override: `selection:bg-red-900 selection:text-white` — red ink selection reinforces the hanko stamp theme.

## Dependencies

- `framer-motion` — cursors, parallax, accordion, stagger reveals, rotating seal
- `lenis` — mandatory slow smooth scroll (duration: 2.2)
- `lucide-react` — minimal icons only
- `tailwind-merge` & `clsx` (via `cn` utility)
