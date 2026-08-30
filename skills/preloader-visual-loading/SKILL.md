---
name: ui:preloader
description: Build page preloaders and loading-state animations — percentage counter preloaders, progress bars, skeleton screens, spinner/morph loaders, and staged reveal-after-load sequences. Use whenever the user asks for "preloader", "loading screen", "loading animation", "progress bar", "skeleton loading", "spinner", or "splash screen". Distinct from scroll-triggered reveals — these run once on initial page load, gated by real asset-load events, not scroll position.
---

# Preloaders & Visual Loading States

## 1. Percentage counter preloader (classic agency-site pattern)

```html
<div class="preloader">
  <span class="preloader-count">0</span><span>%</span>
</div>
```
```js
window.addEventListener("load", () => {
  const counter = { val: 0 };
  gsap.to(counter, {
    val: 100,
    duration: 2,
    ease: "power1.inOut",
    onUpdate: () => document.querySelector(".preloader-count").textContent = Math.floor(counter.val),
    onComplete: hidePreloader
  });
});

function hidePreloader() {
  gsap.to(".preloader", {
    yPercent: -100,
    duration: 0.8,
    ease: "power4.inOut",
    onComplete: () => document.querySelector(".preloader").remove()
  });
}
```
Use `window.addEventListener("load", ...)` (not `DOMContentLoaded`) so the counter reflects real image/font/asset load time, not just DOM parse.

## 2. Real asset-progress preloader (tracks actual image loads, not a fake timer)

```js
function preloadImages(selector = "img") {
  return new Promise(resolve => {
    const images = document.querySelectorAll(selector);
    let loaded = 0;
    const total = images.length || 1;
    const updateProgress = () => {
      loaded++;
      const pct = Math.round((loaded / total) * 100);
      document.querySelector(".preloader-count").textContent = pct;
      if (loaded === total) resolve();
    };
    if (total === 0) resolve();
    images.forEach(img => {
      if (img.complete) updateProgress();
      else { img.addEventListener("load", updateProgress); img.addEventListener("error", updateProgress); }
    });
  });
}
preloadImages().then(hidePreloader);
```
This is the honest version — use it whenever the loading number should represent real progress rather than a decorative fixed-duration count-up.

## 3. Progress bar preloader (fills left-to-right)

```css
.progress-track { width: 240px; height: 3px; background: rgba(255,255,255,.2); }
.progress-fill { height: 100%; width: 0%; background: #fff; }
```
```js
gsap.to(".progress-fill", { width: "100%", duration: 2, ease: "power2.inOut", onComplete: hidePreloader });
```

## 4. Skeleton screen (shimmer placeholder while content loads — best for dashboards/lists, not full-page splash)

```css
.skeleton {
  background: linear-gradient(90deg, #e2e2e2 25%, #f0f0f0 37%, #e2e2e2 63%);
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 6px;
}
@keyframes shimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
```
Swap the skeleton element for real content once data resolves; don't animate the real content in with a shimmer.

## 5. Morph-shape loader (looping SVG blob or bars, no fixed duration — good for indeterminate waits like API calls)

```js
anime({
  targets: '.loader-bar',
  scaleY: [0.3, 1],
  translateY: ['20%', '0%'],
  backgroundColor: '#fff',
  easing: 'easeInOutSine',
  duration: 700,
  delay: anime.stagger(100, { from: 'center' }),
  direction: 'alternate',
  loop: true
});
```
```html
<div class="loader"><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div><div class="loader-bar"></div></div>
```

## 6. Staged reveal after preloader exits (hero content animates in right as the preloader clears — feels intentional, not like two separate events)

```js
function hidePreloader() {
  const tl = gsap.timeline();
  tl.to(".preloader", { yPercent: -100, duration: 0.8, ease: "power4.inOut" })
    .from(".hero-heading", { y: 60, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.4")
    .from(".hero-sub", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
}
```
The negative offsets (`"-=0.4"`) make the hero content start animating in *before* the preloader has fully left, which reads as one continuous motion instead of a jarring handoff.

## Critical correctness rules

1. Always set `overflow: hidden` on `body` while the preloader is active (`body { overflow: hidden }`, removed on `hidePreloader`) so users can't scroll behind it.
2. Give the preloader a documented minimum display time only if content genuinely finishes loading instantly (feels broken otherwise) — but never fake a *longer* delay than real load time just for show; that's a common anti-pattern that annoys users and should be avoided unless explicitly requested.
3. Preloaders must have a hard fallback timeout (e.g. force-hide after 6s even if some asset never fires `load`) so a single broken image/font request can't permanently block the page.
4. Respect `prefers-reduced-motion`: reduce or skip elaborate morph/counter animations for users with that media query set, per accessibility norms — a simple fade is enough.
