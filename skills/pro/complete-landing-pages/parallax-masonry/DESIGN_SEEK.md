# Design Constraints & Physics Parameters: Parallax Masonry

## 1. Lenis Smooth Scroll Configuration
To ensure the parallax feels weighty and fluid, Lenis is configured with a specific easing curve and lerp value.
```javascript
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease-out exponential
    lerp: 0.1, // Provides a slight drag feeling
    smoothWheel: true,
});
```

## 2. Masonry Parallax Speeds
The core visual trick relies on moving columns at different vertical speeds relative to the scroll progress.
```javascript
const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]); // Slow
const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]); // Fast
const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]); // Very Slow
```
- By offsetting the middle column (`-mt-24` in Tailwind) and giving it the highest negative translation (`-400`), it creates a strong depth effect.

## 3. Magnetic Button Physics
The magnetic effect on buttons translates the button a fraction (`0.2`) of the distance between the center of the button and the cursor.
```javascript
x.set((clientX - centerX) * 0.2);
y.set((clientY - centerY) * 0.2);
```
- No spring is applied directly to the motion values here; instead, it relies on Framer Motion's internal style updates. For snappier return, `handleMouseLeave` abruptly resets to `0`, but the CSS `transition-colors` handles the rest of the visual feedback.

## 4. Typography System
- **Headers/Display:** Uses a `font-serif` class (should map to something like Playfair Display or equivalent) with `italic` accents.
- **Micro-copy/Data:** Uses `font-mono` with tight sizing (`text-xs`) and heavy tracking (`tracking-widest` or `tracking-[0.3em]`) to contrast against the elegant serif.

## 5. Noise Texture
The grain is generated inline via SVG.
- **baseFrequency:** `0.65` provides a medium-coarse grain.
- **Blend Mode:** `mix-blend-overlay` at `4%` opacity ensures it only affects the midtones of the dark background, preventing the pure whites from looking dirty.
