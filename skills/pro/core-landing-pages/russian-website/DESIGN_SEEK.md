# Design Seek: Russian Website (Cyber Samurai)

## Visual Language
- **Vibe:** Cyberpunk Samurai, Terminal Hacker, High-Contrast Brutalist, Digital Noir
- **Color Palette:** Pure black (`#000000`) with pure white (`#ffffff`) text. ONE accent: burning red (`#ff0000` or `#dc2626`). Used on: borders, cursor elements, glitch effects, and hover states. Never in paragraphs — only in structural/decorative elements.
- **Textures:** None (other than scanline CSS). The high-contrast black-and-white imagery IS the texture. Grain would soften the aesthetic — this must stay harsh.
- **Typography:** Monospace (`Space Mono`, `JetBrains Mono`) for terminal/data text. Massive bold sans-serif for hero titles. Outline/stroke text: `WebkitTextStroke: 2px #ffffff; color: transparent` — the "samurai slash" lettering style.
- **Imagery:** Always `grayscale(100%)` for photos — creates the cyber-noir look. Red color intrudes only via borders and hover glows, never in images.

## Key Interactions & Physics

1. **Terminal Boot Preloader:**
   - Renders before the main page content.
   - Sequential typing of boot messages using `async/await` + `setInterval` (or `useEffect` chain).
   - Each message types out character by character at `40ms/char`, then waits `400ms` before the next.
   - After final message, GSAP `clip-path` animation: `polygon(0 0, 100% 0, 100% 100%, 0 100%)` → `polygon(0 0, 100% 0, 100% 0%, 0 0%)` — the preloader swipes upward and disappears.
   - Duration: `0.8s`, ease: `power4.inOut`.

2. **Diagonal Sliced Image Parallax:**
   - Hero image split into 2 halves using `clip-path`:
     - Top slice: `polygon(0 0, 100% 0, 100% 45%, 0 55%)`
     - Bottom slice: `polygon(0 55%, 100% 45%, 100% 100%, 0 100%)`
   - Each slice positioned with `position: absolute`, same image, same `background-position`.
   - GSAP ScrollTrigger `scrub: 1`: top slice `y: 0 → -30px`, bottom slice `y: 0 → +30px` — they separate as user scrolls, revealing the black gap between.
   - Effect mimics a sword cut through the image.

3. **Neon Grid Card Hover:**
   - Feature cards have a `position: relative overflow: hidden` container.
   - Inside: an absolutely positioned `div` with `background: radial-gradient(circle at var(--x) var(--y), rgba(255,0,0,0.3), transparent 60%)`.
   - JS `mousemove` updates `--x` and `--y` CSS custom properties on `mouseenter`.
   - The red neon glow follows the cursor inside the card.

4. **Clip-Path Scroll Reveals:**
   - Sections animate in with `clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%)` → `polygon(0 0%, 100% 0%, 100% 100%, 0 100%)`.
   - GSAP ScrollTrigger: `start: "top 80%"`, `duration: 0.9`, `ease: "power4.out"`.
   - The page feels like sections are being "unsheathed" from below — samurai sword aesthetic.

## Color System

| Element          | Value                |
|------------------|----------------------|
| Background       | `#000000`            |
| Primary Text     | `#ffffff`            |
| Stroke Text      | `WebkitTextStroke: 2px #fff` |
| Accent Red       | `#ff0000`            |
| Card Hover Glow  | `rgba(255,0,0,0.3)` radial-gradient |
| Images           | `grayscale(100%)`    |
| Terminal Text    | `#00ff00` or `#ffffff` |
