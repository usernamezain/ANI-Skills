# Design Seek: Controlled Chaos

## Visual Language
- **Vibe:** Brutalist, Maximalist, Bold Creative Agency, Deliberately Broken, Rule-Smashing
- **Color Palette:** Only 4 colors. Everything else is a sin.
  - `--black: #0a0a0a` — near-black (softer than #000 — more "ink" less "void")
  - `--white: #f5f5f0` — warm white (never pure #fff — warmer, like uncoated paper)
  - `--red: #ff2d20` — one accent, used maximally in hero, sparingly elsewhere
  - `--yellow: #ffd60a` — second accent, used for background strips and highlights only
- **Typography:** `Space Grotesk` for body/display (modern, slightly quirky geometry). `Permanent Marker` for hand-drawn accent text. Headlines use `font-size: clamp(4rem, 10vw, 9rem)` — they must be uncomfortable to look at. Tight `letter-spacing: -0.04em`.
- **Shadows:** NO `box-shadow` with blur. ONLY hard, offset shadows: `box-shadow: 4px 4px 0 #0a0a0a`. This is the single most important brutalist visual rule. Blur = softness = weakness.
- **Borders:** Always `border-2 border-black` or `border-4 border-black`. Never `border-gray-200`.
- **Rotation:** Elements must be slightly rotated. Never perfectly aligned. `rotate(-2deg)` to `rotate(3deg)` range. Unpredictable but controlled.

## Key Interactions & Physics

1. **Hard Shadow Button Press (Core Interaction):**
   - Default: `box-shadow: 4px 4px 0 #0a0a0a`, `transform: translate(0, 0)`.
   - Hover: `box-shadow: 1px 1px 0 #0a0a0a`, `transform: translate(3px, 3px)`.
   - The button physically moves toward the shadow, compressing it — like pressing a physical stamp. No spring. No ease-in-out. `transition: all 0.1s linear` — fast and hard.

2. **SVG Hand-Drawing Animation (ScrollTrigger):**
   - Each SVG path has its full `pathLength` set as `stroke-dasharray` on mount.
   - `stroke-dashoffset` starts at `pathLength` (fully hidden) and animates to `0` (fully drawn).
   - Triggered by `IntersectionObserver` or `ScrollTrigger` at `threshold: 0.3`.
   - GSAP: `gsap.to(path, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" })`.

3. **Mouse Parallax Layers (Hero):**
   - Layer 1 (deepest): `x = mouseX * 0.02, y = mouseY * 0.02` — barely moves, creates depth.
   - Layer 2 (elements): `x = mouseX * 0.05, y = mouseY * 0.05` — moderate movement.
   - Layer 3 (cursor-adjacent): `x = mouseX * 0.08` — most reactive.
   - All use `gsap.to` with `ease: "power1.out"` and `duration: 0.5` for a fluid but not spring-y tracking.

4. **Scattered Polaroid Physics:**
   - Each image has a unique rotation: `rotate-[-3deg]`, `rotate-[2deg]`, `rotate-[-1deg]`.
   - Hover: `rotate(0deg) scale(1.05) z-index: 10` with `transition: all 0.2s ease-out`.
   - Box shadow: `8px 8px 0 rgba(0,0,0,0.3)` — hard offset, simulates a thick polaroid casting shadow.
   - Layout is **not CSS Grid** — elements are absolutely positioned with pixel values. Controlled chaos.

## Layout Rules

| Rule | Value |
|------|-------|
| No border-radius | `rounded-none` always |
| No gradient backgrounds | Solid fills only |
| No box-shadow blur | `0px` blur radius always |
| Max font-weight | `font-black` (900) for display |
| Rotation range | `-3deg` to `+3deg` per element |
| Yellow usage | Only for background strips, never text |
| Red usage | Max 2 instances per page section |
