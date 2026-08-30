---
name: ui:pro-startup-landing-pages-kinetic
description: Generate a full motion-driven, agency-grade landing page with GSAP ScrollTrigger parallax, Lenis smooth scrolling, physics-based magnetic cursors, and velocity-skew image columns — the "Kinetic" aesthetic.
---

# Kinetic Startup Landing Page

A pure motion-obsessed layout designed for creative agencies and high-energy startups. Every pixel moves with purpose. Built around a Lenis + GSAP ScrollTrigger engine, the page features velocity-reactive skewing, multi-layer parallax, physics-based cursor magnetism, and a sticky card-stacking feature section.

## Features

- **Lenis Smooth Scroll Engine**: Lenis is initialized at the top-level with `duration: 1.5` and a custom exponential easing curve. It drives `ScrollTrigger.update` on every frame via `lenis.on('scroll', ScrollTrigger.update)` and ticks via `requestAnimationFrame`.
- **Custom Physics Cursor**: A `div` element tracks the mouse using `gsap.quickTo` with a `0.6s` elastic ease for lag. Uses `mix-blend-difference` to invert colors over any element it hovers — a signature luxury-brand interaction pattern.
- **Magnetic Buttons (`MagneticButton`)**: On `mouseenter`, calculates the button center and applies a `gsap.to` translation pushing the button towards the cursor position. Resets on `mouseleave` with a spring bounce.
- **Multi-Layer Hero Parallax**: `Hero` section has 3 depth layers (text, image, background) each with different `ScrollTrigger` scrub values (`scrub: 1`, `scrub: 2`, `scrub: 3`) for a true 3D parallax depth effect.
- **Velocity Skew (`ParallaxImage`)**: Uses `ScrollTrigger.getVelocity()` to dynamically apply `skewY` transforms to image containers — faster scrolling = more dramatic skew. Normalizes back to 0 with a lerp on each frame.
- **Opposed Scroll Gallery (`ParallaxGallery`)**: Two image columns scroll in opposite Y directions using ScrollTrigger `scrub`, creating a cinematic reveal.
- **Sticky Feature Card Stack (`StickyFeatures`)**: Uses ScrollTrigger `pin: true` to lock the section, then progressively fades and scales up each card using staggered timelines triggered as scroll progresses.
- **Kinetic Marquee (`CrazyMarquee`)**: GSAP `repeat: -1` infinite looping horizontal scroll with velocity-boost on fast scroll.
- **GSAP-Powered Metrics (`KineticMetrics`)**: Numbers count up from 0 using ScrollTrigger-triggered GSAP counter animations with custom easing.

## Component Structure

The unified implementation is at `references/component.tsx`. It exports `KineticPage` as the default export.

- `MagneticButton` — reusable physics-attract button wrapper
- `ParallaxImage` — velocity-skew image component
- `Navbar` — minimal dark fixed nav with scroll-reactive opacity
- `Hero` — 3-layer parallax hero with massive kinetic typography
- `ParallaxGallery` — opposed-direction scroll image columns
- `CrazyMarquee` — infinite scroll text/logo strip
- `StickyFeatures` — pinned card stack section
- `VoidProcess`, `KineticMetrics`, `KineticPricing`
- `TeamVoid`, `StaticFAQ`, `KineticClients`, `KineticNewsletter`
- `Footer` — minimal footer with social links

## Dependencies

- `gsap` (with `ScrollTrigger` plugin)
- `lenis`
- `lucide-react`

## How to Use

Register `ScrollTrigger` in a `useEffect` before anything else. Initialize `Lenis` in a second `useEffect` and link it to ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`. This component owns the entire scroll experience — use it as the root-level page, not inside a layout that already has scroll handling.
