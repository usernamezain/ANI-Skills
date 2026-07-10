# Design Seek: Draggable (Playground OS)

## Visual Language
- **Vibe:** Retro Desktop OS, Collage Playground, Physical Toy Interface, Neo-Brutalist Tangible
- **Color Palette:** Warm neutral base — `#f0ede8` or `#f5f2ee` (aged paper/desk surface). Each draggable element has its own accent: windows in white with black borders, polaroids in white, vinyl record in black, sticky notes in yellow `#FFDD00`. No gradients anywhere.
- **Borders:** `border-2 border-black` on all elements. OS windows have `border-4`. No rounded corners — `rounded-none` on all frames. Window title bars use `border-b-2 border-black` as separator.
- **Shadows:** `box-shadow: 4px 4px 0 rgba(0,0,0,0.8)` — hard, offset, no blur. Every draggable element has this shadow at rest.
- **Rotation:** Each element has a unique initial rotation (`rotate-[-2deg]`, `rotate-[1deg]`) applied inline to simulate manual placement on a desk. This initial rotation remains as the user drags.
- **Cursor:** `cursor: grab` at rest, `cursor: grabbing` while dragging.

## Key Interactions & Physics

1. **Framer Motion Drag (`DragItem`):**
   - Every element wrapped in: `<motion.div drag dragConstraints={containerRef} dragMomentum={false} dragElastic={0.2}>`.
   - `dragConstraints={containerRef}` keeps all elements inside the main container bounds.
   - `dragMomentum={false}` — no ice-sliding after release. Elements stop immediately where dropped.
   - `dragElastic={0.2}` — slight elastic resistance when dragged past the container edge.

2. **Dynamic Z-Index Stack:**
   - Each `DragItem` has a local `zIndex` state, initialized to a random value `10–30`.
   - `onDragStart`: `setZIndex(100)` — lifts the dragged element to the top immediately.
   - `onDragEnd`: `setZIndex(Math.floor(Math.random() * 20) + 10)` — settles at a natural mid-stack level.
   - Result: elements layer naturally as if being physically picked up and placed.

3. **Hover Scale with Cursor Change:**
   - `whileHover={{ scale: 1.05 }}` — slight grow on hover signals draggability.
   - CSS: `cursor: grab` via Tailwind `cursor-grab`.
   - `whileDrag={{ scale: 1.02, rotate: Math.random() * 6 - 3 }}` — element slightly rotates while being dragged (handling physics).

4. **Retro OS Window (`RetroWindow`):**
   - Title bar: `bg-black text-white` with 3 colored dots (red/yellow/green — mac-style but flat).
   - Content: white background, no shadow on internal elements.
   - Window has `min-width: 200px, min-height: 150px` to feel substantial.

5. **Vinyl Spinning Record (`MusicPlayer`):**
   - Inner disc: `animate={{ rotate: 360 }}` with `transition={{ duration: 3, repeat: Infinity, ease: "linear" }}`.
   - Rotation pauses with a `animate={{ rotate: isPlaying ? 360 : 0 }}` toggle on click.
   - The "arm" is a thin `div` rotated into position with `rotate-[25deg]`.

6. **Polaroid Photo:**
   - White card with thick bottom padding (space for handwritten caption).
   - Caption: `font-family: 'Caveat'` or `'Patrick Hand'` — handwritten Google Font.
   - Photo area: `grayscale(30%)` — slightly desaturated for retro feel, not fully B&W.

## Spatial Layout Rules

- **No CSS Grid or Flexbox for draggable elements.** All positioned with `position: absolute` and specific `top/left/right` values.
- Initial placement is carefully designed to look "naturally scattered" — deliberately imperfect.
- The background desk surface should be the full viewport height with `overflow: hidden` to create a bounded playground.
