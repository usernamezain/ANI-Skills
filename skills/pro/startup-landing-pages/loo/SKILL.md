---
name: ani:pro:startup-landing-pages:loo
description: Generate a full brutalist, CLI/developer-tool landing page with sharp GSAP entrance animations, a 3D CSS cube hero, horizontally pinned workflow pipeline, and mono typography — the "Loo" aesthetic.
---

# Loo Startup Landing Page

A hard-edged, developer-focused landing page that breaks conventional web design norms. Built for infrastructure tools, CLIs, and developer SaaS products. Uses raw mono typography, high-contrast black-and-white with selective red accents, geometric borders, and GSAP to deliver violent, precise entrance animations.

## Features

- **Brutalist Background (`BrutalistBackground`)**: A CSS `linear-gradient` grid pattern creates sharp graph-paper aesthetics. Layered with CSS pulse-animated blob elements at low opacity for subtle depth — but they never feel "soft" due to the strong grid overlay.
- **GSAP Hero Entrance (`Hero`)**: A complex multi-step GSAP timeline on mount animates lines of text in with `y: 100 → 0`, `opacity: 0 → 1`, using `back.out(1.7)` for a sharp snap-in feel. Staggered at `0.08s` intervals per character/word.
- **3D CSS Cube**: Inside the hero, a pure CSS 3D rotating cube is built using `transform-style: preserve-3d`, `perspective: 800px`, and 6 absolutely positioned faces with `translateZ`. It auto-spins via `@keyframes` `rotateX` + `rotateY` animation.
- **Custom Terminal Cursor**: A blinking `|` cursor rendered inside the hero headline using `@keyframes blink` alternating `opacity: 1 → 0` at `0.75s` intervals.
- **Horizontal Pinned Workflow**: `Workflow` section uses GSAP `ScrollTrigger` with `pin: true` and `horizontal: true` to simulate a left-to-right pipeline scroll while the user scrolls vertically — a signature brutalist interaction.
- **Bento Grid (`BentoGrid`)**: Sharp-edged cards (`border-2 border-black`), no border-radius, high-contrast content blocks with monospace font highlighting specific capabilities.
- **Infinite Marquee (`Marquee`)**: Pure CSS `@keyframes` infinite scroll banner. Two layers: one forwards, one reversed, at different speeds for a layered depth.
- **Stats Counter (`LooStats`)**: GSAP `ScrollTrigger`-triggered number countup from 0 to final value using `snap: 1` for integer counting with a short `1.5s` duration.
- **Pricing Cards (`LooPricing`)**: Brutalist pricing cards with thick borders, no shadows, and a solid red `background` highlight on the recommended plan (no gradients).
- **Team, Integrations, FAQ, Testimonials, Newsletter**: Consistent brutalist styling — thick outlines, sharp corners, mono fonts.

## Component Structure

The unified implementation is at `references/component.tsx`. It exports `LooPage` as the default export.

- `CustomCursor` — trailing cursor dot with `gsap.quickTo`
- `BrutalistBackground` — grid pattern + pulse blobs
- `Navbar` — minimal top nav with thick bottom border
- `Hero` — GSAP stagger reveal + 3D CSS cube
- `Marquee` — dual-speed CSS infinite scroll banner
- `BentoGrid` — 6-cell brutalist feature grid
- `Workflow` — GSAP horizontal-pinned pipeline
- `LooStats`, `LooPricing`, `LooTeam`
- `LooIntegrations`, `LooFAQ`, `LooTestimonials`, `LooNewsletter`
- `Footer` — minimal black footer with grid border

## Dependencies

- `gsap` (with `ScrollTrigger` plugin)
- `lenis`
- `lucide-react`

## How to Use

Register `ScrollTrigger` in the first `useEffect`. Initialize `Lenis` in a second `useEffect` linked to `ScrollTrigger.update`. The `Workflow` section's horizontal pinning requires the container to have `overflow: hidden` on the parent. All mono typography uses the `font-mono` Tailwind class — ensure your Tailwind config has `fontFamily.mono` defined.
