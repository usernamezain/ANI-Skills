---
name: hero-cinematic-parallax-section
description: Build a cinematic full-viewport hero section with layered parallax depth, a staggered GSAP intro timeline, and scroll-fade-out on exit. Use whenever the user wants a "hero section", "landing page header", "cinematic intro", or "parallax hero" — especially for agency, film, product-launch, or portfolio landing pages. Pairs with gsap-scrolltrigger-effects and text-motion-typography skills for the entrance/scroll motion.
---

# Cinematic Parallax Hero Section

## Structure

```html
<section class="hero">
  <div class="hero-layer" data-depth="0.1"><img src="bg-far.jpg" alt=""/></div>
  <div class="hero-layer" data-depth="0.3"><img src="bg-mid.jpg" alt=""/></div>
  <div class="hero-layer" data-depth="0.6"><img src="fg-subject.png" alt=""/></div>
  <div class="hero-copy">
    <h1 class="hero-title">Build Something Unforgettable</h1>
    <p class="hero-sub">A studio for brands that want to move differently.</p>
    <a class="hero-cta magnetic" href="#work">See our work</a>
  </div>
  <div class="scroll-cue">scroll</div>
</section>
```
```css
.hero { position: relative; height: 100vh; overflow: hidden; }
.hero-layer { position: absolute; inset: 0; will-change: transform; }
.hero-layer img { width: 100%; height: 120%; object-fit: cover; }
.hero-copy { position: relative; z-index: 5; height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 0 6vw; }
```

## Entrance timeline (plays once on load, not scroll-tied)

```js
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
tl.from(".hero-layer[data-depth='0.1']", { scale: 1.15, duration: 1.6 })
  .from(".hero-layer[data-depth='0.3']", { scale: 1.1, duration: 1.4 }, "<0.1")
  .from(".hero-layer[data-depth='0.6']", { yPercent: 15, opacity: 0, duration: 1.2 }, "<0.2")
  .from(".hero-title", { y: 60, opacity: 0, duration: 1 }, "-=0.6")
  .from(".hero-sub", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
  .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
  .from(".scroll-cue", { opacity: 0, duration: 0.6 }, "-=0.2");
```

## Parallax on scroll (each layer moves at its own depth)

```js
gsap.utils.toArray(".hero-layer").forEach(layer => {
  const depth = parseFloat(layer.dataset.depth);
  gsap.to(layer, {
    yPercent: depth * 40,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
  });
});
```

## Fade/scale out as user scrolls past (so the hero doesn't feel stuck)

```js
gsap.to(".hero-copy", {
  opacity: 0, y: -60, scale: 0.96, ease: "none",
  scrollTrigger: { trigger: ".hero", start: "top top", end: "60% top", scrub: true }
});
```

## Scroll cue bounce (small looping detail)

```js
gsap.to(".scroll-cue", { y: 10, repeat: -1, yoyo: true, duration: 1, ease: "sine.inOut" });
```

## Notes for the agent

- Wire `.hero-cta` up to the `custom-cursor-effects` skill's magnetic-button snippet — it's already class-tagged `magnetic` above.
- Use `text-motion-typography`'s char-split stagger instead of the simple `.hero-title` fade above if the user wants a more dramatic word-by-word title reveal.
- Cap `img` sizes and use `loading="eager"` + `fetchpriority="high"` on the hero's foreground image only (it's above the fold); lazy-load nothing in the hero itself.
- Only animate `transform`/`opacity` in the scrub blocks — never `top`.
