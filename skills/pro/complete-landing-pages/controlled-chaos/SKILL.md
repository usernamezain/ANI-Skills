---
name: ui:pro-complete-landing-pages-controlled-chaos
description: Generate a full brutalist, maximalist startup landing page with hand-drawn SVG animations, GSAP scroll pinning, loud rotated typography, offset solid shadows, mouse-reactive parallax, and deliberately rule-breaking layouts.
version: 1.0.0
tags: ["landing-page", "gsap", "brutalist", "startup", "kinetic", "lenis", "hand-drawn", "svg-animation"]
---

# Controlled Chaos Landing Page

A deliberately rule-breaking, maximalist landing page for bold creative agencies and startups that want to make a statement. Every layout rule is broken on purpose: text overlaps images, elements are rotated, shadows are hard and offset (no blur), and hand-drawn SVG paths are animated on scroll. The chaos IS the design. Controlled by precise GSAP timing.

## Features

- **Global CSS Injection (`GlobalStyles`)**: Injects `Space Grotesk` (body) and `Permanent Marker` (accent) Google Fonts directly via `<style>` injection. Also defines CSS custom properties for the brutalist color palette: `--black: #0a0a0a`, `--white: #f5f5f0`, `--red: #ff2d20`, `--yellow: #ffd60a`. Contains the global SVG noise filter for grain overlay.
- **Brutal Button (`BrutalButton`)**: A reusable button with `border-2 border-black` + `box-shadow: 4px 4px 0 #0a0a0a` (hard, unblurred offset shadow). On hover: the box-shadow reduces to `1px 1px 0` and `translate(3px, 3px)` — simulates physical button press. No border-radius.
- **SVG Path Drawing (`DrawSVG`)**: Utility component that wraps any SVG element. On `IntersectionObserver` trigger (threshold: 0.3), uses GSAP `strokeDashoffset` from `pathLength` to `0` — animating as if the line is being hand-drawn in real time. Duration: `1.2s` per path.
- **Mouse Parallax Hero (`Hero`)**: GSAP `mousemove` listener on the hero container updates two layers at different intensities: background layer moves at `0.02x` mouse offset, foreground elements move at `0.05x`. Rotated UI elements (`rotate(-3deg)`) fly with the mouse. Creates a disorienting, kinetic depth effect.
- **Horizontal Scroll Pin (`StickyWorks`)**: Classic GSAP ScrollTrigger horizontal pin. Container `overflow: hidden`, inner strip `width: [n * 100vw]`. ScrollTrigger `pin: true, scrub: 1` translates the strip `x: 0 → -(total_width - 100vw)` as user scrolls. Each "work card" is a full 100vw panel with deliberately broken grid layouts.
- **Stroke-Outline Marquee (`Marquee`)**: CSS `@keyframes` infinite scroll. Text uses `-webkit-text-stroke: 2px #0a0a0a` with `color: transparent` — outline-only text. Alternates with filled text every other item for maximum contrast.
- **Scattered Polaroid Gallery (`StudioGallery`)**: Images absolutely positioned with unique `rotate()` transforms per image (`rotate(-3deg)`, `rotate(2deg)`, etc.) and `box-shadow: 6px 6px 0 rgba(0,0,0,0.3)` — simulating photos scattered on a desk. Hover brings image to `rotate(0deg) scale(1.05)`.
- **Team Scribbles (`TeamScribbles`)**: Team member cards with hand-drawn circle SVGs drawn around profile photos on hover (GSAP `pathLength` animation).
- **Raw Stats (`RawStats`)**: GSAP counter animation from 0 to final value. Numbers styled in huge `font-size: clamp(4rem, 10vw, 8rem)` with the accent font.
- **Client Logos (`ClientChaos`)**: Logos displayed with `mix-blend-multiply` on a yellow `#ffd60a` background strip — making all logos appear as dark silhouettes.

## Component Exports

All named exports in `references/component.tsx`:
- `GlobalStyles` — font + CSS variable injection
- `Navbar` — minimal nav with brutal button CTA
- `Hero` — mouse-parallax rotated layout
- `Marquee` — stroke-outline infinite scroll
- `Manifesto` — full-page bold statement text
- `ChaosServices` — drawn SVG service cards
- `TeamScribbles` — hand-drawn circle team section
- `StickyWorks` — horizontal scroll pinned portfolio
- `RawStats` — GSAP counter stats
- `ClientChaos` — yellow background logo strip
- `StudioGallery` — scattered polaroid grid
- `Footer` — minimal brutalist footer

## Integration Notes

- `GlobalStyles` must be the first element in the component tree to inject fonts before first paint.
- For non-Next.js environments: extract `GlobalStyles` content into your main `index.css` file instead of using `<style jsx global>`.
- The horizontal scroll pin (`StickyWorks`) requires `overflow: hidden` on the immediate parent and the ScrollTrigger `scrub: 1` value must match Lenis `duration` for smooth pinning.
- All GSAP instances should use the `useLayoutEffect` hook in Next.js (not `useEffect`) to avoid SSR hydration mismatches.

## Dependencies

- `gsap` (with `ScrollTrigger` plugin) — scroll pin, SVG drawing, mouse parallax, counters
- `lenis` — smooth scrolling (linked to ScrollTrigger via RAF)
- `lucide-react` — minimal iconography
