---
name: marquee-logo-cloud-section
description: Build an infinitely scrolling logo cloud / client-showcase strip with seamless looping, pause-on-hover, and optional grayscale-to-color reveal on hover per logo. Use whenever the user wants a "logo cloud", "client logos section", "as seen in", "trusted by", or "brands we work with" strip.
---

# Marquee Logo Cloud Section

## Structure (duplicate the logo list once so the loop is seamless)

```html
<section class="logo-cloud">
  <p class="logo-cloud-label">Trusted by teams at</p>
  <div class="logo-track">
    <div class="logo-set">
      <img src="logo-1.svg" alt="Company One">
      <img src="logo-2.svg" alt="Company Two">
      <img src="logo-3.svg" alt="Company Three">
      <img src="logo-4.svg" alt="Company Four">
    </div>
    <div class="logo-set" aria-hidden="true">
      <img src="logo-1.svg" alt=""><img src="logo-2.svg" alt=""><img src="logo-3.svg" alt=""><img src="logo-4.svg" alt="">
    </div>
  </div>
</section>
```
```css
.logo-cloud { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
.logo-track { display: flex; width: max-content; }
.logo-set { display: flex; gap: 64px; align-items: center; padding-right: 64px; }
.logo-set img { height: 32px; filter: grayscale(1) opacity(0.5); transition: filter 0.3s ease; }
.logo-set img:hover { filter: grayscale(0) opacity(1); }
```

## Infinite seamless loop (GSAP — precise, pauseable, no jump-cut)

```js
const track = document.querySelector(".logo-track");
const setWidth = document.querySelector(".logo-set").offsetWidth;

const marquee = gsap.to(track, {
  x: -setWidth,
  duration: 20,
  ease: "none",
  repeat: -1
});

track.addEventListener("mouseenter", () => marquee.pause());
track.addEventListener("mouseleave", () => marquee.play());
```
Because the logo list is duplicated exactly once in the HTML and the tween moves exactly `-setWidth` before repeating, the loop has no visible seam or jump — this is the key detail versus naively animating `x: "-100%"` on a single non-duplicated set, which leaves a visible gap.

## Notes for the agent

- Recompute `setWidth` (and restart the tween) on window resize, since logo sizes/gaps may reflow at different breakpoints: `window.addEventListener("resize", () => { /* recalc + kill/recreate tween */ })`.
- Use real `<img>` alt text on the first (visible/primary) logo set for accessibility; mark the duplicated second set `aria-hidden="true"` with empty `alt=""` so screen readers don't announce every logo twice.
- The `mask-image` gradient fade at the strip's edges is what makes the infinite scroll look intentional rather than abruptly clipped — keep it even if the user doesn't explicitly ask, it's a small detail that reads as polish.
