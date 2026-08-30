---
name: ui:morph-mask-reveal
description: Build morph and mask reveal animations — shape morphing between SVG paths, clip-path mask wipes/reveals for images and sections, page/section transition overlays, and blob morph loaders. Use whenever the user asks for "morph animation", "mask reveal", "clip path reveal", "shape morph", "page transition", "wipe transition", or "blob animation". These are distinct from simple opacity fades — the defining trait is a moving edge/boundary that reveals or reshapes content.
---

# Morph & Mask Reveal Transitions

Two distinct techniques get grouped under "morph/reveal": **clip-path masking** (revealing existing content through a moving shape) and **SVG path morphing** (one shape's geometry animating into another's). Pick based on what the user actually wants.

## 1. Image mask reveal — wipe-in from clip-path (dependency-free, cheap, very common)

```css
.reveal-img { clip-path: inset(0 100% 0 0); } /* fully hidden from the right */
```
```js
gsap.to(".reveal-img", {
  clipPath: "inset(0 0% 0 0)",
  duration: 1.2,
  ease: "power4.inOut",
  scrollTrigger: { trigger: ".reveal-img", start: "top 80%" }
});
```
Diagonal/angled reveal variant using polygon instead of inset:
```js
gsap.fromTo(".reveal-img",
  { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
  { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", duration: 1.1, ease: "power3.inOut" }
);
```

## 2. Full-screen page-transition wipe (overlay panel covers, then reveals new content)

```html
<div class="transition-overlay"></div>
```
```css
.transition-overlay {
  position: fixed; inset: 0; background: #111; z-index: 9999;
  transform-origin: bottom; transform: scaleY(0);
}
```
```js
function pageTransitionOut(onCovered) {
  gsap.to(".transition-overlay", {
    scaleY: 1, transformOrigin: "bottom", duration: 0.6, ease: "power4.inOut",
    onComplete: onCovered
  });
}
function pageTransitionIn() {
  gsap.to(".transition-overlay", {
    scaleY: 0, transformOrigin: "top", duration: 0.6, ease: "power4.inOut"
  });
}
// usage: pageTransitionOut(() => { /* swap route/content here, then */ pageTransitionIn(); });
```

## 3. SVG shape morph (anime.js — real path-to-path morphing, needs matching point counts)

Anime.js can tween the `d` attribute directly only if both paths have compatible structure; for arbitrary shape-to-shape morphing, use SVG paths pre-authored with matching anchor point counts (design in Figma/Illustrator, export both, verify point count matches), then:
```js
anime({
  targets: '.morph-path',
  d: [
    { value: pathDataBlob2 },
    { value: pathDataBlob3 }
  ],
  easing: 'easeInOutQuad',
  duration: 2000,
  loop: true,
  direction: 'alternate'
});
```
```html
<svg viewBox="0 0 200 200"><path class="morph-path" d="M100,20 ..." /></svg>
```
If the two source shapes have a different number of points, morphing will look distorted or fail. Simplest fix: author both shapes with the same number of anchor points, or use an SVG path-matching preprocessing step (outside runtime code) before animating.

## 4. Blob morph loader (organic looping shape, common on hero sections/loaders)

```js
anime({
  targets: '.blob path',
  d: [
    { value: 'M45,-55C58,-45,68,-30,70,-14C72,3,65,20,54,34C43,48,27,60,9,63C-9,66,-27,60,-42,49C-56,38,-67,22,-70,4C-73,-14,-68,-32,-56,-45C-45,-58,-27,-66,-9,-68C9,-70,27,-64,45,-55Z' },
    { value: 'M39,-49C49,-38,53,-22,58,-5C64,12,72,29,67,42C63,55,46,64,29,68C12,72,-6,71,-23,65C-40,59,-56,48,-63,32C-71,17,-70,-2,-64,-19C-58,-35,-46,-49,-32,-58C-17,-67,0,-70,15,-66C31,-62,29,-60,39,-49Z' }
  ],
  duration: 3000,
  easing: 'easeInOutSine',
  direction: 'alternate',
  loop: true
});
```
Generate morph-compatible blob path pairs from a tool like blobmaker/Fluid Shapes (both exported at the same point-count setting) rather than hand-writing path data.

## 5. Circular "iris" reveal mask (great for modal/lightbox open)

```css
.iris-reveal { clip-path: circle(0% at var(--cx, 50%) var(--cy, 50%)); }
```
```js
function openIris(el, originEvent) {
  el.style.setProperty("--cx", `${originEvent.clientX}px`);
  el.style.setProperty("--cy", `${originEvent.clientY}px`);
  gsap.to(el, { clipPath: "circle(150% at var(--cx) var(--cy))", duration: 0.8, ease: "power4.inOut" });
}
```

## 6. Text mask reveal through an image (word/logo cut out of a video or gradient)

```css
.masked-text {
  background: url('texture.jpg') center/cover;
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
```
Animate the background-position for a moving-texture-through-text effect:
```js
gsap.to(".masked-text", { backgroundPosition: "100% 50%", duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
```

## Critical correctness rules

1. `clip-path` animations run on the compositor only when the property value itself changes smoothly frame-to-frame (GSAP handles this) — avoid animating `clip-path` with plain CSS `transition` on a JS-computed polygon string per frame, it's much slower than letting GSAP interpolate the underlying values.
2. Always set `will-change: clip-path` (or `transform` for scale-based masks) on elements before the animation starts, and remove it after (`onComplete: () => el.style.willChange = 'auto'`) so browsers don't keep unnecessary compositor layers alive.
3. SVG path morphing requires equal anchor-point counts on source/target paths — mismatched counts is the most common cause of "the morph looks broken/glitchy."
4. For page transitions, always guard against double-triggering (disable nav clicks while `.transition-overlay` animation is in flight).
