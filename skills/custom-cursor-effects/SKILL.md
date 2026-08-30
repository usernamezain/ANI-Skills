---
name: ui:cursor-effects
description: Build custom mouse-cursor effects and cool hover interactions — magnetic buttons, cursor-follow blobs, mix-blend-mode cursors, cursor trails, image/text hover distortion, and 3D tilt-on-hover cards. Use whenever the user mentions "custom cursor", "magnetic button", "hover effect", "cursor trail", "mouse follow", "tilt card", "3D hover", or "cool hover animation". Always disable/adjust these on touch devices since there is no cursor.
---

# Custom Cursor & Hover Effects

## 0. Universal touch-device guard (always include this)

```js
const isTouch = window.matchMedia("(pointer: coarse)").matches;
if (isTouch) {
  // skip all custom-cursor JS; let native touch behavior work
}
```

## 1. Smooth-following custom cursor (GSAP quickTo — most performant method)

```html
<div class="cursor"></div>
```
```css
.cursor {
  position: fixed; top: 0; left: 0; width: 24px; height: 24px;
  border-radius: 50%; background: #fff; mix-blend-mode: difference;
  pointer-events: none; z-index: 9999; transform: translate(-50%, -50%);
  will-change: transform;
}
```
```js
const cursor = document.querySelector(".cursor");
const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });
window.addEventListener("mousemove", e => { xTo(e.clientX); yTo(e.clientY); });
```
`gsap.quickTo` is preferred over `gsap.to` on every mousemove — it reuses a single tween instance instead of creating a new one per event, which is essential for 120fps smoothness.

## 2. Magnetic button (element pulls toward cursor within a radius)

```js
document.querySelectorAll(".magnetic").forEach(el => {
  const strength = 0.4;
  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();
    const relX = e.clientX - r.left - r.width / 2;
    const relY = e.clientY - r.top - r.height / 2;
    gsap.to(el, { x: relX * strength, y: relY * strength, duration: 0.6, ease: "power3.out" });
  });
  el.addEventListener("mouseleave", () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
  });
});
```
Wrap the button's inner label in a nested span with a *smaller* strength (e.g. `strength * 0.5`) for a two-layer magnetic feel used by agency sites.

## 3. Cursor scale/state change on hover targets

```js
document.querySelectorAll("a, button, [data-cursor='link']").forEach(el => {
  el.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 3, duration: 0.3 }));
  el.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1, duration: 0.3 }));
});
```
For a "view project" text-in-cursor effect on portfolio thumbnails, swap `scale` for animating a `<span>` inside the cursor's opacity + text content on `mouseenter`.

## 4. 3D tilt-on-hover card (vanilla, no library needed — cheapest option)

```js
document.querySelectorAll(".tilt-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotateY = (px - 0.5) * 20;
    const rotateX = (0.5 - py) * 20;
    gsap.to(card, { rotateX, rotateY, transformPerspective: 600, duration: 0.4, ease: "power2.out" });
  });
  card.addEventListener("mouseleave", () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" }));
});
```
CSS requirement: `.tilt-card { transform-style: preserve-3d; }`

## 5. Cursor trail (multiple lagging dots — anime.js version)

```js
const dots = document.querySelectorAll(".trail-dot"); // e.g. 8 divs, decreasing opacity
let mouse = { x: 0, y: 0 };
let positions = Array.from(dots, () => ({ x: 0, y: 0 }));
window.addEventListener("mousemove", e => { mouse = { x: e.clientX, y: e.clientY }; });
function render() {
  positions[0].x += (mouse.x - positions[0].x) * 0.3;
  positions[0].y += (mouse.y - positions[0].y) * 0.3;
  for (let i = 1; i < positions.length; i++) {
    positions[i].x += (positions[i - 1].x - positions[i].x) * 0.3;
    positions[i].y += (positions[i - 1].y - positions[i].y) * 0.3;
  }
  dots.forEach((d, i) => { d.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`; });
  requestAnimationFrame(render);
}
render();
```

## 6. Image hover-reveal that follows cursor (agency-style "hover thumbnail preview")

```js
const preview = document.querySelector(".hover-preview img");
document.querySelectorAll("[data-preview-img]").forEach(item => {
  item.addEventListener("mouseenter", () => {
    preview.src = item.dataset.previewImg;
    gsap.to(".hover-preview", { autoAlpha: 1, duration: 0.3 });
  });
  item.addEventListener("mousemove", e => {
    gsap.to(".hover-preview", { x: e.clientX + 20, y: e.clientY + 20, duration: 0.5, ease: "power3.out" });
  });
  item.addEventListener("mouseleave", () => gsap.to(".hover-preview", { autoAlpha: 0, duration: 0.3 }));
});
```

## Critical correctness rules

1. Always set `cursor: none` on `body` (or the interactive zone only) when a custom cursor is active, and restore default cursor on touch devices.
2. Use `pointer-events: none` on the visual cursor element so it never blocks clicks on what's underneath.
3. Prefer `gsap.quickTo`/`quickSetter` over creating a new tween per `mousemove` event — this is the #1 cause of jank in cursor effects.
4. Debounce/guard magnetic and tilt listeners so they don't run when `isTouch` is true.
