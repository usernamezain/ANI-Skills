# Design Seek: Goo

## Visual Language
- **Vibe:** Premium, High-Tech, Fluid, Agency-Grade, Startup-Aspirational
- **Color Palette:** Deep blacks (`zinc-950` / `#09090b`) as the base. Vibrant blobs in `indigo-500`, `purple-500`, and `pink-500` at `blur-[120px]` create the "goo" ambient glow. Text is always `white` or `zinc-100`. Never use warm tones (orange, yellow) — cold, electric hues only.
- **Textures:** `mix-blend-overlay` noise SVG overlay at `opacity: 0.05` adds film grain — makes the gradients feel physical, not digital. Heavy blur everywhere: cards use `backdrop-blur-sm`, hero uses `backdrop-blur-md`.
- **Typography:** Tight tracking (`tracking-tight`), heavy weight (`font-bold`/`font-extrabold`). Hero headline is massive (`text-5xl`–`text-7xl`). Body is `zinc-400` — always de-emphasized.

## Key Interactions & Physics

1. **3D Tilt Hero Dashboard:**
   - `useMotionValue` tracks `mouseX` and `mouseY` (0–1 normalized by window size).
   - `useSpring(mouseX, { stiffness: 500, damping: 100 })` creates a laggy spring version of the mouse.
   - `useTransform(springX, [0, 1], [-15, 15])` maps spring position to ±15° rotation.
   - Applied as `rotateX` and `rotateY` on a `motion.div` with `style={{ perspective: "1000px" }}`.
   - The 500 stiffness + 100 damping gives a snappy-but-not-instant feel — premium, not bouncy.

2. **Bento Grid Mouse Glow:**
   - A global `mousemove` listener in `useEffect` writes `e.clientX` and `e.clientY` to `document.documentElement` as CSS custom properties `--mouse-x` and `--mouse-y`.
   - Each bento card has a pseudo-element (or `div` overlay) with:
     ```css
     background: radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(99,102,241,0.15), transparent 40%);
     ```
   - This only shows on `group-hover` — so the glow only appears when the cursor is over the bento grid area.

3. **Animated Background Blobs:**
   - 4–6 `motion.div` elements with `animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}`.
   - Each blob has a unique `transition={{ duration: 6–10, repeat: Infinity, delay: 0–3 }}` for organic desynchronization.
   - All blobs are `pointer-events-none` at `z-0` — purely decorative.

4. **Scroll-Triggered Section Reveals:**
   - All major sections use `motion.div` with `whileInView={{ opacity: 1, y: 0 }}` and `initial={{ opacity: 0, y: 20 }}`.
   - `viewport={{ once: true, margin: "-100px" }}` — triggers just before the element enters the viewport.
   - `transition={{ duration: 0.6, ease: "easeOut" }}` — never use spring for section reveals. Keep them dignified and smooth.

## Color System

| Element         | Value                          |
|-----------------|--------------------------------|
| Page BG         | `bg-zinc-950` (#09090b)        |
| Blob 1          | `bg-indigo-500` blur-[120px]   |
| Blob 2          | `bg-purple-500` blur-[120px]   |
| Blob 3          | `bg-pink-500` blur-[100px]     |
| Card BG         | `bg-zinc-900/50 backdrop-blur-sm` |
| Card Border     | `border border-zinc-800`       |
| Primary CTA     | `from-indigo-500 to-purple-600` |
| Best Value Ring | `ring-2 ring-indigo-500`       |
