---
name: ui:scrub-carousel
description: Build a testimonials section where quote cards scroll horizontally, driven either by a scroll-scrubbed timeline or by draggable/auto-playing carousel controls. Use whenever the user wants a "testimonials section", "reviews carousel", "quote slider", or "customer feedback section". Two variants included — scroll-scrubbed (tied to page scroll) and self-contained carousel (autoplay/drag, independent of page scroll).
---

# Testimonials: Scroll-Scrubbed or Carousel

## Variant A — Scroll-scrubbed horizontal cards (page scroll drives card movement, no buttons needed)

```html
<section class="testimonial-scrub">
  <div class="testimonial-track">
    <blockquote class="t-card">"They rebuilt our entire funnel in three weeks." <cite>— Dana, Head of Growth</cite></blockquote>
    <!-- repeat .t-card -->
  </div>
</section>
```
```css
.testimonial-scrub { overflow: hidden; }
.testimonial-track { display: flex; gap: 32px; width: max-content; }
.t-card { width: 420px; padding: 32px; border-radius: 16px; background: rgba(255,255,255,0.05); }
```
```js
const track = document.querySelector(".testimonial-track");
gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: "none",
  scrollTrigger: {
    trigger: ".testimonial-scrub",
    start: "top top",
    end: () => "+=" + (track.scrollWidth - window.innerWidth),
    pin: true,
    scrub: 1
  }
});
```

## Variant B — Self-contained draggable/autoplay carousel (independent of page scroll, uses GSAP Draggable)

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Draggable.min.js"></script>
<script>gsap.registerPlugin(Draggable, InertiaPlugin);</script>
```
```js
const cards = gsap.utils.toArray(".t-card");
const cardWidth = 420 + 32; // width + gap
let proxy = { x: 0 };

Draggable.create(proxy, {
  type: "x",
  inertia: true,
  onDrag: updatePosition,
  onThrowUpdate: updatePosition
});
function updatePosition() {
  gsap.set(track, { x: gsap.utils.clamp(-(cardWidth * (cards.length - 1)), 0, proxy.x) });
}

// autoplay when idle
let autoplay = gsap.to(track, { x: -(cardWidth * (cards.length - 1)), duration: cards.length * 4, ease: "none", repeat: -1 });
track.addEventListener("mouseenter", () => autoplay.pause());
track.addEventListener("mouseleave", () => autoplay.play());
```
Note: `Draggable`/`InertiaPlugin` are part of GSAP's bonus plugins (Club GreenSock in older docs, bundled free as of recent GSAP versions) — confirm availability/license in the project before relying on `InertiaPlugin`; if unavailable, drop `inertia: true` and use plain `type: "x"` dragging.

## Notes for the agent

- Default to Variant A for portfolio/marketing sites where testimonials are part of the scroll narrative; use Variant B when the user explicitly wants user-controlled dragging/autoplay independent of page scroll (e.g. embedded widget).
- Always pause carousel autoplay on hover and on `visibilitychange` (tab not focused) to avoid wasted cycles per the `buttery-smooth-120fps-performance` skill's single-active-loop guidance.
- Add `role="region" aria-label="Testimonials"` and ensure keyboard arrow-key navigation is added for Variant B if accessibility is a requirement — draggable-only carousels are not keyboard accessible by default.
