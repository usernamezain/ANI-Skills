# Design Seek: Image Cursor Trail

## Visual Language
- **Vibe:** Creative Agency Collage, Dynamic Typographic Overlay, Retro-Modern Editorial
- **Color Palette:** Pure dark base (`#09090b` or `#000000`). Colorful multi-portrait photography cards (Unsplash curation). Bold, white (`#ffffff`) main text.
- **Textures:** Smooth sliding stacks. Flat paper-like card boundaries that drop shadowing highlights (`shadow-xl` / `shadow-black/50`) over each other.
- **Typography:** Ultra-bold, geometric sans-serif (e.g., *Outfit*, *Clash Display*, *Syne*) in massive sizing (`text-[15vw]–[25vw]`), centered on the screen as a structural anchor.

## Key Interactions & Physics

1. **Re-renderless Animation Loop:**
   - Component maintains 60fps by storing animation coordinates inside React `useRef` states:
     - Prevents state update triggers during rapid mouse moves.
     - Frame updates operate inside a `requestAnimationFrame` render loop.
     - Coordinates LERPed on every tick: `lerp(cacheMousePos.x, mousePos.x, 0.1)`.

2. **Distance-Based Spawning Physics:**
   - Measures distance travelled since the last image was rendered:
     - `distance = getDistance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y)`
     - If `distance > trailDistance` (default `100px`), a new image card spawns at current coordinates.
     - Saves current coordinates as the new baseline: `lastMousePos = mousePos`.

3. **GSAP Stack Orchestration:**
   - Stacks images iteratively by incrementing a loop index (`imgPosition = (imgPosition + 1) % images.length`).
   - Newly spawned images receive incrementing z-index offsets (`zIndexVal++`) to guarantee they sit on top of the pile.
   - Animate card entrance and exit with GSAP:
     - **Enter:** Scales up from `0.3` to `1.0`, rotates slightly (`rotation: random(-15, 15)`), and fades to full visibility over `0.8s` with `power2.out` easing.
     - **Exit:** Fades out (`opacity: 0`) and shrinks (`scale: 0.8`) after a short delay, cleaning up the layout.

## Color System

| Parameter / Variable | Value / Configuration           |
|----------------------|---------------------------------|
| Page Base BG         | `bg-zinc-950` (#09090b)         |
| Main Typography      | `text-white font-black tracking-tighter`|
| Image Card Size      | `w-[150px] h-[200px]` (portrait)|
| Spawn Distance Gate  | `100px` (trailDistance)         |
| LERP Alpha Speed     | `0.1` (damping speed)           |
| Scale Transition     | `scale: [0.3 -> 1.0 -> 0.8]`    |
