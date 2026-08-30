---
name: ui:menu-split-panel
description: Build a navigation menu where two panels split open from the center (or one panel wipes across) to reveal fullscreen navigation underneath, like theater curtains parting. Use whenever the user wants a "split menu", "panels that open", "curtain-style menu split down the middle", or a more dramatic/cinematic alternative to a simple fade-in fullscreen overlay.
---

# Split-Panel Menu Reveal

## Structure

```html
<button class="menu-trigger" aria-expanded="false" aria-controls="split-nav">Menu</button>

<nav class="split-nav" id="split-nav" aria-hidden="true">
  <div class="split-panel split-panel-left"></div>
  <div class="split-panel split-panel-right"></div>
  <ul class="split-nav-links">
    <li><a href="#work">Work</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```
```css
.split-nav { position: fixed; inset: 0; z-index: 999; visibility: hidden; pointer-events: none; }
.split-panel { position: absolute; top: 0; bottom: 0; width: 50%; background: #0a0a0a; }
.split-panel-left { left: 0; transform: translateX(-100%); }
.split-panel-right { right: 0; transform: translateX(100%); }
.split-nav-links {
  position: absolute; inset: 0; z-index: 2; list-style: none;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.split-nav-links a { display: block; font-size: clamp(2rem, 6vw, 4.5rem); color: #fff; text-decoration: none; padding: 8px 0; opacity: 0; transform: translateY(30px); }
```

## Open: panels slide in from opposite edges to meet in the center, then links reveal

```js
const trigger = document.querySelector(".menu-trigger");
const nav = document.querySelector(".split-nav");
const links = gsap.utils.toArray(".split-nav-links a");
let isOpen = false;

const tl = gsap.timeline({ paused: true })
  .set(nav, { visibility: "visible", pointerEvents: "auto" })
  .to(".split-panel-left", { xPercent: 0, duration: 0.6, ease: "power4.inOut" })
  .to(".split-panel-right", { xPercent: 0, duration: 0.6, ease: "power4.inOut" }, "<")
  .to(links, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.2");

trigger.addEventListener("click", () => {
  isOpen = !isOpen;
  trigger.setAttribute("aria-expanded", String(isOpen));
  nav.setAttribute("aria-hidden", String(!isOpen));
  if (isOpen) {
    tl.timeScale(1).play();
  } else {
    // reverse order on close: links first, then panels part back to the edges
    gsap.to(links, { opacity: 0, y: -20, duration: 0.3, stagger: 0.03 });
    gsap.to(".split-panel-left", { xPercent: -100, duration: 0.5, ease: "power3.in", delay: 0.15 });
    gsap.to(".split-panel-right", { xPercent: 100, duration: 0.5, ease: "power3.in", delay: 0.15,
      onComplete: () => gsap.set(nav, { visibility: "hidden", pointerEvents: "none" }) });
  }
  document.body.style.overflow = isOpen ? "hidden" : "";
});
```
The close sequence is written as separate tweens rather than `tl.reverse()` here because the visual choreography intentionally differs both ways (links exit upward and fast, panels then part outward) — reversing the exact same timeline would replay the opening panel motion backward, which looks like the panels are "un-meeting" rather than a deliberate parting exit. Use `tl.reverse()` only when open/close should look like true mirror images of each other; write explicit close tweens when they shouldn't (as here).

## Notes for the agent

- Alternative single-panel variant: use only `.split-panel-right` at `width: 100%` and animate `scaleX` from a transform-origin edge for a simpler one-directional wipe if the two-panel "parting curtain" look is more drama than the brief calls for.
- This pattern reads as high-drama/cinematic — best suited to film, event, or luxury-brand style portfolios per the `one-of-a-kind-portfolio-builder` skill's pairing logic; it's a poor fit for a fast, utilitarian SaaS nav where users expect an instant menu.
- Trap focus and handle Escape identically to the other menu skills.
