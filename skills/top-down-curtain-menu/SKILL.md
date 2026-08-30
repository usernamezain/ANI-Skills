---
name: ui:menu-curtain
description: Build a navigation menu that drops down from the top of the screen like a curtain or roller blind, covering the page as it descends, with links revealing as the panel unrolls. Use whenever the user wants a "menu that comes from the top", "dropdown curtain menu", "menu that slides down", or "top-down reveal navigation" — distinct from a fullscreen overlay in that the panel itself visibly grows downward rather than instantly covering the viewport.
---

# Top-Down Curtain Menu

## Structure

```html
<header class="site-header">
  <a class="nav-logo" href="/">Brand</a>
  <button class="menu-trigger" aria-expanded="false" aria-controls="curtain-nav">Menu</button>
</header>

<nav class="curtain-nav" id="curtain-nav" aria-hidden="true">
  <ul class="curtain-links">
    <li><a href="#work">Work</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```
```css
.curtain-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 998;
  height: 0; overflow: hidden; background: #111;
  display: flex; align-items: center; justify-content: center;
}
.curtain-links { list-style: none; text-align: center; }
.curtain-links a { display: block; font-size: clamp(2rem, 5vw, 3.5rem); color: #fff; text-decoration: none; padding: 12px 0; opacity: 0; transform: translateY(-30px); }
```

## Curtain-drop timeline (panel height grows from 0 to full, links fade/drop in after the panel has room)

```js
const trigger = document.querySelector(".menu-trigger");
const nav = document.querySelector(".curtain-nav");
const links = gsap.utils.toArray(".curtain-links a");
let isOpen = false;

const tl = gsap.timeline({ paused: true })
  .to(nav, { height: "100vh", duration: 0.7, ease: "power4.inOut" })
  .to(links, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.25");

trigger.addEventListener("click", () => {
  isOpen = !isOpen;
  trigger.setAttribute("aria-expanded", String(isOpen));
  nav.setAttribute("aria-hidden", String(!isOpen));
  isOpen ? tl.play() : tl.reverse();
  document.body.style.overflow = isOpen ? "hidden" : "";
});
```
Animating `height` here (rather than `transform: scaleY`) is a deliberate exception to the usual "never animate layout properties" rule — because the curtain must actually push/reveal real page space as it grows, a transform-scale version would visually stretch the links inside it unnaturally. To keep this smooth despite animating `height`, keep the curtain's own internal content simple (no nested heavy layout) and always pair with `will-change: height` during the transition only.

## Alternative: `clip-path: inset()` version (cheaper, GPU-composited, no layout animation)

```css
.curtain-nav { position: fixed; inset: 0; height: 100vh; clip-path: inset(0 0 100% 0); }
```
```js
gsap.to(nav, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" });
```
Prefer this `clip-path` version by default — it achieves the same visual "curtain drops down covering the page" effect while staying on the compositor (see `buttery-smooth-120fps-performance`), and only fall back to animating real `height` if the design specifically needs the layout underneath to reflow as the curtain descends (rare).

## Notes for the agent

- Close on outside click (click anywhere in the now-revealed page area below the curtain) in addition to Escape and a close button, since a full-width top panel invites clicking below it to dismiss.
- Trap focus inside `.curtain-nav` while open, same as `fullscreen-menu-overlay`.
- If `.site-header` needs to stay visible/interactive above the curtain (e.g. keep the trigger button clickable to close), keep it at a higher `z-index` than `.curtain-nav`.
