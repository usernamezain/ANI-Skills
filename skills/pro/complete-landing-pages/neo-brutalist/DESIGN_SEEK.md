# Design Constraints & Physics Parameters: Neo Brutalism Landing Page

## 1. Visual Language: "Chunky" Neo-Brutalism
This component relies strictly on the Neo-Brutalist design trend.
- **Borders:** Thick, solid black borders (`border-4 border-black`, sometimes `border-8`).
- **Shadows:** Hard, unblurred drop shadows using absolute pixel offsets (`shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`).
- **Typography:** Uppercase, tightly tracked (`tracking-tighter`), bold or black weight fonts (`font-black`).

## 2. Color Palette (Acid Colors)
The design uses high-contrast, heavily saturated colors against neutral grays and stark black/white.
- **Background:** `#f0f0f0`
- **Dark Elements:** `#1a1a1a`
- **Acid Lime (Accent):** `#B8FF28`
- **Soft Purple:** `#9F7AEA`
- **Chunky Orange:** `#FF9F43`

## 3. 3D Tilt Physics
The `TiltCard` component uses Framer Motion's `useSpring` and `useTransform` to rotate the card on the X and Y axes depending on mouse position.
```javascript
const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
```
- **Stiffness & Damping:** `stiffness: 150` and `damping: 15` provide a snappy, responsive feel that settles quickly without excessive bouncing. This matches the "heavy/solid" aesthetic.
- **Rotation Constraints:** Limited to ±7 degrees to ensure text remains legible while providing enough depth.
- **Z-Translation:** The inner content uses `transform: "translateZ(50px)"` to float above the card background when tilted.

## 4. Marquee Angles
The marquee section uses a slight rotation (`rotate-[-2deg]`) and negative margin (`-mt-10`) to break the strict grid and introduce visual chaos, a staple of brutalist design.
