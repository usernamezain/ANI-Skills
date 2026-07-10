---
name: horizontal-scroll-gallery-section
description: Build an image/project gallery section where vertical page scroll drives horizontal panel movement, with each panel slightly scaling/parallaxing as it passes center. Use whenever the user wants a "horizontal scroll gallery", "horizontal scrolling section", "sideways scroll", or "image showcase that scrolls sideways". Extends the horizontal-scroll pattern from gsap-scrolltrigger-effects with per-panel scale/parallax detail.
---

# Horizontal Scroll Gallery Section

## Structure

```html
<section class="h-gallery">
  <div class="h-track">
    <figure class="h-panel"><img src="work-1.jpg" alt=""><figcaption>Nord — Identity System</figcaption></figure>
    <figure class="h-panel"><img src="work-2.jpg" alt=""><figcaption>Fable — App Redesign</figcaption></figure>
    <figure class="h-panel"><img src="work-3.jpg" alt=""><figcaption>Atlas — Packaging</figcaption></figure>
  </div>
</section>
```
```css
.h-gallery { overflow: hidden; }
.h-track { display: flex; width: 300%; } /* 100% * number of panels */
.h-panel { width: 100vw; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4vw; }
.h-panel img { max-height: 60vh; width: auto; border-radius: 12px; will-change: transform; }
```

## Core horizontal scroll-pin (base pattern from gsap-scrolltrigger-effects)

```js
const track = document.querySelector(".h-track");
const panels = gsap.utils.toArray(".h-panel");

const scrollTween = gsap.to(track, {
  xPercent: -100 * (panels.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".h-gallery",
    pin: true,
    scrub: 1,
    end: () => "+=" + track.offsetWidth
  }
});
```

## Per-panel scale/parallax as each panel passes screen-center (adds visual rhythm beyond a flat slide)

```js
panels.forEach(panel => {
  gsap.fromTo(panel.querySelector("img"),
    { scale: 0.85 },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: panel,
        containerAnimation: scrollTween, // ties this trigger to the horizontal scroll instead of vertical
        start: "left center",
        end: "right center",
        scrub: true
      }
    }
  );
});
```
`containerAnimation` is the key detail that's easy to miss — it tells ScrollTrigger to measure this panel's trigger positions along the *horizontal* scrollTween's progress rather than the page's normal vertical scroll, which is what makes per-panel effects work correctly inside a horizontal-scroll container.

## Notes for the agent

- Always compute `end: () => "+=" + track.offsetWidth` as a function (not a static value) so it recalculates correctly on resize/`ScrollTrigger.refresh()`.
- This section eats significant vertical scroll distance (one full "page" of scroll per panel) — for 5+ panels, warn the user this could feel long; consider capping to 3–5 panels or adding a visible progress indicator dots.
- On mobile, horizontal-scroll-hijacking sections are often disorienting with touch gestures — consider using `ScrollTrigger.matchMedia()` to disable pinning below a breakpoint and fall back to a native horizontally-scrollable `overflow-x: auto` strip instead.
