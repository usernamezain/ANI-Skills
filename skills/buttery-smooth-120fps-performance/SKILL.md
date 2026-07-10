---
name: buttery-smooth-120fps-performance
description: Make animations run buttery-smooth at high frame rates (120fps on capable displays, no jank on 60Hz) — smooth-scroll setup with Lenis, GSAP/rAF ticker synchronization, transform-only animation rules, will-change management, and debugging jank. Use this skill alongside any other animation skill whenever the user says "smooth", "120fps", "buttery", "no lag", "jank", "laggy animation", or "make it feel premium" — it's a cross-cutting correctness layer, not a standalone effect.
---

# Buttery-Smooth High-Framerate Animation

Frame rate problems almost always come from one of: animating layout-triggering properties, uncapped/duplicate render loops, missing GPU compositing hints, or scroll listeners that aren't rAF-throttled. This skill is a checklist to apply across every other animation skill.

## 1. Smooth (inertia-based) scrolling with Lenis — the standard modern choice

```html
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
```
```js
const lenis = new Lenis({
  duration: 1.1,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```
Sync with GSAP ScrollTrigger so pinned/scrubbed animations stay perfectly aligned with the smoothed scroll position instead of drifting:
```js
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
```
Note: when using this integration, remove the separate manual `requestAnimationFrame(raf)` loop above — `gsap.ticker` becomes the single driver so you don't run two competing rAF loops.

## 2. Only animate compositor-friendly properties

**Cheap (GPU compositor only, no layout/paint):** `transform` (translate/scale/rotate), `opacity`, `filter` (mostly).
**Expensive (triggers layout and/or paint — avoid animating these every frame):** `width`, `height`, `top`, `left`, `margin`, `padding`, `box-shadow` size changes, `border-radius` is usually fine but large blurred `box-shadow` is not.

```js
// Bad — animates layout-triggering properties every frame
gsap.to(".box", { left: 400, top: 200 });
// Good — same visual result, GPU-composited only
gsap.to(".box", { x: 400, y: 200 });
```

## 3. `will-change` — use surgically, not everywhere

```css
.about-to-animate { will-change: transform, opacity; }
```
Apply it right before an animation starts (or permanently only on elements that animate continuously, like a cursor dot), and remove it after (`el.style.willChange = "auto"`) once finished. Applying `will-change` to too many elements simultaneously forces the browser to keep excess GPU layers resident, which *hurts* memory/perf rather than helping — this is a common overcorrection.

## 4. One render loop, not several

Every independent `requestAnimationFrame` loop (three.js render, a hand-rolled cursor trail, a custom parallax script) adds overhead. Where possible:
- Let `gsap.ticker` drive everything GSAP-related (it already runs one shared rAF loop internally).
- If you also have a raw three.js scene, either drive its render call from `gsap.ticker.add()` too, or keep it as a single separate loop — never stack 3+ independent `requestAnimationFrame(loop)` calls that each do their own scheduling.

## 5. Throttle expensive per-frame work (e.g. `getBoundingClientRect` in mousemove handlers)

```js
let rectCache = null;
function cacheRects() { rectCache = [...document.querySelectorAll(".item")].map(el => el.getBoundingClientRect()); }
cacheRects();
window.addEventListener("resize", cacheRects);
// use rectCache inside mousemove instead of calling getBoundingClientRect() live every event
```
Reading layout (`getBoundingClientRect`, `offsetWidth`, etc.) inside a loop that also writes styles causes forced synchronous layout ("layout thrashing"). Read all needed values first, then write.

## 6. Match device refresh rate correctly — don't hardcode 60fps assumptions

GSAP and the browser's `requestAnimationFrame` automatically run at the display's native refresh rate (120Hz ProMotion displays, 144Hz monitors, etc.) — do not hand-roll `setInterval(fn, 1000/60)` for animation, since that hardcodes 60fps and looks stuttery on higher-refresh screens. Always use `requestAnimationFrame`/GSAP/anime.js's internal scheduling instead of `setInterval`/`setTimeout` for anything visual.

## 7. Debugging checklist when something feels janky

1. Open DevTools → Rendering tab → enable "Frame Rendering Stats" to see live FPS.
2. Check the Performance panel for long tasks/"Layout" purple bars during the animation — if present, you're animating a layout property; switch to `transform`.
3. Check for duplicate event listeners (common in SPA route changes where cleanup wasn't called — see the `threejs-interactive-backgrounds` skill's dispose rules).
4. Reduce `setPixelRatio`/particle counts on three.js/canvas-heavy scenes on lower-end devices (`navigator.hardwareConcurrency` as a rough capability signal).
5. Confirm only one scroll-smoothing library is active — running Lenis alongside another smooth-scroll polyfill causes fighting/jitter.

## Critical correctness rules

1. Never animate `top`/`left`/`width`/`height` in a loop or scrubbed scroll animation — always the `transform` equivalent.
2. Always provide a single shared render/update loop rather than multiple independent `requestAnimationFrame` calls scattered across a codebase.
3. Always remove `will-change` after an animation completes.
4. Always respect `prefers-reduced-motion` — wrap non-essential motion in a media query check and fall back to instant/simple transitions for users who've set that preference.
5. Cap device pixel ratio and particle/element counts for canvas/WebGL-heavy effects to avoid frame drops on mobile.
