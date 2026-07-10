# Design Constraints & Physics Parameters: Wabi Sabi

## 1. Pacing & Momentum (Lenis)
The experience must force the user to slow down, mimicking a meditative state.
```javascript
const lenis = new Lenis({
    duration: 2.2, // Extremely slow
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```
- A duration of `2.2` creates a heavy, deliberate scroll inertia. Quick mouse flicks are absorbed into a long, smooth deceleration.

## 2. Cursor Physics (Hanko Stamp)
The cursor acts as an organic, floating element rather than a precise pointer.
```javascript
const x = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
```
- **mass: 0.5**: Lighter mass so it doesn't overshoot wildly.
- **damping: 20**: High friction so the stamp feels like it's dragging slightly on the paper surface.
- `mix-blend-multiply` ensures the red "ink" darkens whatever it floats over, mimicking real dye on paper.

## 3. Visual Language & The "Ma" Space
- **Colors**: Dominated by warm paper tones (`#f0f0eb`, `#e8e6e1`). The only stark color is the red ink (`#dc2626` / `text-red-600`) used sparingly for the cursor and text selections.
- **Ma (Negative Space)**: Margins and paddings are extreme (`py-64`, `gap-32`). Elements must never feel crowded.
- **Typography Mix**: 
  - Massive, elegant, low-opacity serif italics for philosophical statements.
  - Tiny, highly tracked, technical monospace for metadata/coordinates (`text-[10px] tracking-[1em]`).

## 4. Texture Physics
The background texture is not static; it modifies the elements above it.
- Using `mix-blend-overlay` on the noise SVG ensures that dark elements get darker and light elements get brighter, physically integrating the "paper grain" into the imagery and text, rather than just floating a semi-transparent PNG over the top.
