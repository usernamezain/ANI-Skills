# Design Seek: Cartoonish

## Visual Language
- **Vibe:** Neo-Brutalist, Cartoon Pop Art, Toy Packaging, Loud and Playful, Comic Book Energy
- **Color Palette:** Maximum saturation. Must use ALL of: `#FFDD00` (yellow), `#00C2FF` (neon blue), `#FF3366` (hot pink), `#7CFF50` (lime green). Rotated per element — no single color dominates. Black `#000000` borders and shadows ONLY. White `#ffffff` backgrounds only inside cards.
- **Borders:** `border-4 border-black` minimum. Use `border-[6px] border-black` for hero elements. NO border-radius or `rounded-lg` — use either `rounded-none` or very exaggerated `rounded-full`. Nothing in between.
- **Shadows:** `box-shadow: 8px 8px 0 0 rgba(0,0,0,1)` — solid black, no blur, maximum offset. The shadow should be aggressively visible.
- **Typography:** `Bangers` (Google Font — the "comic book" font) for all display text. ALL CAPS mandatory. `letter-spacing: 0.05em`. Body text in a rounded sans like `Nunito` or `Poppins`.

## Key Interactions & Physics

1. **Cursor Eye Tracking:**
   - Two "eyes" rendered as circles with offset pupils.
   - Track `document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; })`.
   - On each `requestAnimationFrame`: calculate angle from eye center to cursor: `Math.atan2(dy, dx)`.
   - Pupil offset: `x = Math.cos(angle) * 8px, y = Math.sin(angle) * 8px` (constrained to 8px radius).
   - Apply as `transform: translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` on the pupil element.

2. **GSAP Elastic Pop Entrance:**
   - All hero elements start `scale: 0, opacity: 0`.
   - `gsap.from(elements, { scale: 0, opacity: 0, duration: 0.8, stagger: 0.1, ease: "elastic.out(1, 0.5)" })`.
   - The `elastic.out(1, 0.5)` creates the cartoon "boing" bounce. Never use `back.out` — elastic only.

3. **Floating Sticker Physics:**
   - Each badge/sticker gets unique sine-wave parameters:
   - `gsap.to(sticker, { y: -15, rotation: 5, duration: 2 + delay, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.4 })`.
   - Multiple stickers at different phases = organic, independent floating. Like balloons in the wind.

4. **CSS Marquee with Outline Text:**
   - Two tracks: filled text (`#000000`) and outline text (`WebkitTextStroke: 3px black, color: transparent`).
   - Alternating `background-color` stripes: yellow → pink → blue per marquee item.
   - `animation: marquee 15s linear infinite` — set the duplicate element at exactly `translateX(-50%)` to prevent gaps.

## Color Rotation Pattern

| Element     | Color        |
|-------------|--------------|
| Card 1      | `#FFDD00`    |
| Card 2      | `#00C2FF`    |
| Card 3      | `#FF3366`    |
| Card 4      | `#7CFF50`    |
| Marquee     | Cycles all 4 |
| Button      | `#FF3366`    |
| Shadow all  | `#000000`    |
