# Design Constraints & Physics Parameters: Playful Brutal

## 1. Visual Language: High Voltage Brutalism
This design combines strict brutalist grid rules with chaotic overrides.
- **Colors:** Concrete Grey (`#E0E0E0`) acts as the canvas. Accents are aggressive: International Orange (`#FF4D00`), Hyper Blue (`#0047FF`), and Acid Lime (`#CCFF00`).
- **Shadows:** Hard, sharp drop shadows simulating physical depth without blur: `shadow-[8px_8px_0px_0px_#000]`. Buttons use 4px offsets, cards use 8px, and massive elements use 12px or 16px offsets.
- **Typography:** Oversized, tracking-tighter, uppercase font. Stroke texts (`WebkitTextStroke: "4px black"`) are used extensively to create transparent or hollow text effects.

## 2. Physics Constraints (GSAP)
### Magnetic Button
Instead of standard Framer Motion springs, this uses `gsap.quickTo` for raw performance.
```javascript
const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
```
- **ease:** `elastic.out(1, 0.3)` provides a very rubbery, bouncy snap back to position, emphasizing the "playful" aspect.
- **Multiplier:** `0.3` limits the magnetic pull radius so the button doesn't fly too far from its origin.

### Bento Reveal
```javascript
ease: "back.out(1.7)",
stagger: 0.1,
```
- **ease:** `back.out(1.7)` causes the bento cards to scale slightly past 100% before settling, reinforcing the bouncy physical nature of the UI.

## 3. Scroll Dynamics
- **Marquee:** The infinite marquee uses `requestAnimationFrame` for base speed, combined with a GSAP ScrollTrigger `scrub: 0.25` that rapidly accelerates the text horizontally when the user scrolls vertically. It also flips direction (`direction = e.direction * -1`) instantly when scroll direction changes.
- **Lenis Settings:** `duration: 1.2` with an exponential easing curve provides a heavy, momentum-based scrolling feel.
