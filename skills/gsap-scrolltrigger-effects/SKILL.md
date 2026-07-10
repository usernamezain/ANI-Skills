---
name: gsap-scrolltrigger-effects
description: Build scroll-driven animations with GSAP + ScrollTrigger — scroll scrubbing, pinned sections, parallax layers, horizontal scroll sections, and animated scroll progress bars. Use this skill whenever the user asks for "scroll animation", "pin a section", "scroll scrub", "parallax", "sticky scroll", "scroll progress bar", "reveal on scroll", or any component whose motion should be tied to scroll position rather than time. Always use this skill before hand-writing scroll listeners — GSAP ScrollTrigger is more accurate and performant than manual IntersectionObserver/scroll-event code.
---

# GSAP ScrollTrigger Effects

Scroll-linked motion has two families: **scrubbed** (animation progress = scroll progress, no easing over time) and **triggered** (animation plays once when a threshold is crossed). Pick the right one before writing code.

## Setup (always required)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>gsap.registerPlugin(ScrollTrigger);</script>
```
In React/Vite/Next, `npm i gsap` then `import { gsap } from "gsap"; import { ScrollTrigger } from "gsap/ScrollTrigger"; gsap.registerPlugin(ScrollTrigger);` — register inside `useEffect`/`useGSAP`, never at module top-level in SSR frameworks (Next.js) or you'll get a window-undefined error.

## 1. Scroll-scrubbed animation (progress tied 1:1 to scroll)

```js
gsap.to(".box", {
  x: 500,
  rotation: 360,
  scrollTrigger: {
    trigger: ".section",
    start: "top top",      // when trigger's top hits viewport top
    end: "bottom top",     // when trigger's bottom hits viewport top
    scrub: true,            // true = instant tie; a number (e.g. 0.6) = smoothed lag in seconds
    markers: false          // set true only while debugging, remove for prod
  }
});
```
`scrub: 1` (a number) is almost always preferred over `scrub: true` for a "cool" feel — it adds a small catch-up delay so motion doesn't feel jittery on fast scroll/trackpad flicks.

## 2. Pinned section (element sticks while content scrolls "through" it)

```js
ScrollTrigger.create({
  trigger: ".pin-section",
  start: "top top",
  end: "+=3000",        // pin for 3000px of scroll distance
  pin: true,
  pinSpacing: true,      // adds space so page height doesn't jump
  anticipatePin: 1       // fixes a flicker bug at pin start on fast scroll
});
```
Combine pin + scrub for the classic "pinned image gallery" or "pinned text that changes as you scroll" effect:
```js
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".pin-section",
    start: "top top",
    end: "+=3000",
    pin: true,
    scrub: 1
  }
});
tl.to(".slide-1", { autoAlpha: 0 })
  .to(".slide-2", { autoAlpha: 1 }, "<")   // "<" = start at same time as previous
  .to(".slide-2", { autoAlpha: 0 })
  .to(".slide-3", { autoAlpha: 1 }, "<");
```

## 3. Horizontal scroll section (vertical scroll drives horizontal movement)

```js
let panels = gsap.utils.toArray(".panel");
gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-track",
    pin: true,
    scrub: 1,
    end: () => "+=" + document.querySelector(".horizontal-track").offsetWidth
  }
});
```
CSS requirement: `.horizontal-track { display: flex; width: 400%; }` `.panel { width: 100vw; flex-shrink: 0; }`

## 4. Parallax layers (simple depth effect)

```js
gsap.utils.toArray(".parallax-layer").forEach(layer => {
  const speed = layer.dataset.speed || 0.5; // 0 = static, 1 = normal scroll
  gsap.to(layer, {
    y: () => -window.innerHeight * (1 - speed),
    ease: "none",
    scrollTrigger: { trigger: layer.parentElement, start: "top bottom", end: "bottom top", scrub: true }
  });
});
```

## 5. Reveal-once on entry (not scrubbed — plays and finishes)

```js
gsap.utils.toArray(".reveal").forEach(el => {
  gsap.from(el, {
    y: 80, opacity: 0, duration: 1, ease: "power3.out",
    scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }
  });
});
```
`toggleActions` order = onEnter, onLeave, onEnterBack, onLeaveBack. Use `"play none none none"` for a one-shot reveal that never re-plays or reverses.

## 6. Animated scroll progress bar

```html
<div class="progress-bar"></div>
```
```js
gsap.to(".progress-bar", {
  scaleX: 1,
  transformOrigin: "left center",
  ease: "none",
  scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 }
});
```
CSS: `.progress-bar { position: fixed; top: 0; left: 0; height: 4px; width: 100%; transform: scaleX(0); background: linear-gradient(90deg,#7c3aed,#06b6d4); z-index: 999; }`

## Critical correctness rules (AI agents must follow these)

1. **Always animate `transform`/`opacity` only** inside scrubbed timelines (x, y, scale, rotation, autoAlpha) — never `top/left/width/height` in scrub animations, they force layout thrash and break 60fps+.
2. **Call `ScrollTrigger.refresh()`** after any dynamic content load/resize/font load, or images that change layout height will desync triggers.
3. **On React unmount**, kill triggers: `return () => ScrollTrigger.getAll().forEach(t => t.kill())` inside `useEffect` cleanup, or triggers accumulate on hot-reload/route change.
4. **Never pin a container while inside `overflow: hidden`** on an ancestor — pin requires the ancestor chain to allow position changes; wrap pinned sections directly under `body`/main scroll container.
5. Pair with `buttery-smooth-120fps-performance` skill when the user also wants a custom smooth-scroll feel (Lenis) — GSAP ScrollTrigger has a documented Lenis integration via `scrollerProxy`.
