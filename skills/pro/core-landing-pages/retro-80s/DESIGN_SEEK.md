# Design Seek: Retro 80s

## Visual Language
- **Vibe:** Synthwave, Outrun, Cyberpunk Terminal, Arcade Nostalgia, Neon-Drenched
- **Color Palette:** Pure black `#000000` base. Neon magenta `#ff00ff`, electric cyan `#00f0ff`, hot pink `#ff2d78`, and toxic green `#39ff14`. Use all four in the hero — this aesthetic demands chromatic excess. The rule: the more colors, the more authentic.
- **Textures:** CRT scanlines (horizontal `repeating-linear-gradient` at `2px` intervals, `rgba(0,0,0,0.2)`) combined with a vignette (`radial-gradient` dark edges). Harsh, not subtle.
- **Typography:** Monospace ONLY for all text. `JetBrains Mono` or `Space Mono`. Large sizes with `text-stroke` (WebkitTextStroke) for outline-only headings. Text-shadow multi-layer for neon glow: `0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 40px #ff00ff`.

## Key Interactions & Physics

1. **Matrix Text Scramble (`useScramble` hook):**
   - On mount (or trigger), the target text's characters are rapidly replaced with random characters from a charset: `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*`.
   - Every `50ms` interval, a new random character replaces each position.
   - Over `1.5s` total, characters are "locked in" one by one from left to right.
   - Final state: original text, fully resolved. Like a terminal decoding a password.

2. **CRT Scanline Overlay:**
   ```css
   .crt::before {
     content: "";
     position: fixed;
     inset: 0;
     background: repeating-linear-gradient(
       0deg,
       rgba(0,0,0,0.15) 0px,
       rgba(0,0,0,0.15) 1px,
       transparent 1px,
       transparent 2px
     );
     pointer-events: none;
     z-index: 9999;
   }
   ```
   - Add a `flicker` `@keyframes` that randomly dips `opacity: 0.9 → 1 → 0.85 → 1` at `0.1s` irregular intervals for CRT monitor realism.

3. **Perspective Grid Scroll:**
   - CSS: `transform: perspective(300px) rotateX(45deg)` on a `grid` of `1px` neon lines.
   - Animate `background-position-y` from `0` to `40px` infinitely — creates the illusion of moving forward through the grid.
   - The "sun" is a circular `background: linear-gradient(to bottom, #ff00ff 0%, #ff6b35 50%, transparent 100%)` absolutely centered at the horizon line.

4. **Floating Element GSAP Yoyo:**
   - Decorative UI data nodes use `gsap.to(el, { y: -15, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 })`.
   - Different starting delays create desynchronized floating — organic and alive.

## Color System

| Element      | Value                   |
|--------------|-------------------------|
| Background   | `#000000`               |
| Primary Neon | `#ff00ff` (magenta)     |
| Secondary    | `#00f0ff` (cyan)        |
| Accent Hot   | `#ff2d78` (hot pink)    |
| Grid Lines   | `#ff00ff` at 30% opacity |
| Text         | `#ffffff` (white)       |
| Outline Text | `WebkitTextStroke: 1px #ff00ff, color: transparent` |
