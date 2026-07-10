# Design Seek: Glass Operating System

## Visual Language
- **Vibe:** Cyberpunk Dashboard, Dark Glassmorphic OS, Hacker Aesthetic, Mission Control
- **Color Palette:** Near-pure black (`#080808`) base. Glassmorphic cards at `bg-white/[0.02]` — barely visible white. Text in `white` or `zinc-400`. Accent colors: electric green `#00ff88` (for "online/active" states) and blue `#4f88ff` (for data/informational states). Used selectively inside cards, never on backgrounds.
- **Typography:** `Inter` or `system-ui` for UI text — feels native to an OS. `JetBrains Mono` or `Space Mono` for all numbers, time displays, and code-like data. Size contrast is extreme: large stat numbers (`text-4xl`) next to tiny labels (`text-[10px] tracking-widest uppercase`).
- **Borders:** `border border-white/[0.05]` — barely visible at rest. On hover: `border-white/20` — the card "activates."

## Key Interactions & Physics

1. **Scramble Text Animation (`ScrambleText`):**
   - On mount (or scroll trigger), iterate through the target string character by character.
   - At each position, rapidly swap to random characters from a charset for `duration: 30ms` per frame.
   - After `n` frames per character, "lock" the character to the correct final value.
   - Effect: text appears to decode itself — like a terminal boot sequence.
   - React state: `displayText` array of chars. `useEffect` + `setInterval` drives the swap loop.

2. **Framer Motion Staggered Card Reveal:**
   - Each bento card: `initial={{ opacity: 0, y: 20, scale: 0.98 }}` → `animate={{ opacity: 1, y: 0, scale: 1 }}`.
   - `transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}`.
   - Grid of 8 cards reveals in a cascade — top-left to bottom-right.

3. **Live Clock (`TimeDisplay`):**
   - `setInterval` every `1000ms` updating `new Date().toLocaleTimeString()`.
   - Displayed in monospace with `tabular-nums` (`font-variant-numeric: tabular-nums`) so the digits don't cause layout shift as they change.
   - Subtle `opacity` pulse on each tick: `opacity: 0.8 → 1` in `100ms`.

## Glassmorphism Stack

```
Layer 1 (Background):  bg-[#080808]
Layer 2 (SVG Noise):   SVG feTurbulence, fixed, opacity: 0.4, mix-blend: overlay
Layer 3 (Card):        bg-white/[0.02] backdrop-blur-md border border-white/[0.05]
Layer 4 (Card Hover):  bg-white/[0.05] border-white/20 (on :hover)
Layer 5 (Content):     Text and data elements
```

## Bento Grid Layout

| Card Size    | Grid Span         |
|--------------|-------------------|
| Hero Card    | col-span-2, row-span-2 |
| Wide Card    | col-span-2, row-span-1 |
| Standard     | col-span-1, row-span-1 |
| Tall Card    | col-span-1, row-span-2 |

All on a `grid-cols-4` with `gap-3`. The layout should feel like a real OS window manager.
