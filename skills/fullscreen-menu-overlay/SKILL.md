---
name: fullscreen-menu-overlay
description: Build a fullscreen navigation overlay with huge staggered text links that covers the entire viewport when opened — the classic agency-site menu pattern. Use whenever the user wants a "fullscreen menu", "huge text nav", "menu that takes over the screen", "big link list menu", or an alternative to a small dropdown/hamburger panel. Pairs with morphing-hamburger-icon for the trigger button and precision-easing-motion-design for the reveal timing.
---

# Fullscreen Menu Overlay

## Structure

```html
<button class="menu-trigger" aria-expanded="false" aria-controls="fullscreen-nav">Menu</button>

<nav class="fullscreen-nav" id="fullscreen-nav" aria-hidden="true">
  <div class="fullscreen-nav-bg"></div>
  <ul class="fullscreen-nav-links">
    <li><a href="#work">Work</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#studio">Studio</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="fullscreen-nav-meta">
    <p>hello@studio.com</p>
    <p>Instagram · LinkedIn</p>
  </div>
</nav>
```
```css
.fullscreen-nav {
  position: fixed; inset: 0; z-index: 999;
  visibility: hidden; pointer-events: none;
  display: flex; flex-direction: column; justify-content: center; padding: 6vw;
}
.fullscreen-nav-bg { position: absolute; inset: 0; background: #0a0a0a; clip-path: circle(0% at 100% 0%); }
.fullscreen-nav-links { list-style: none; }
.fullscreen-nav-links li { overflow: hidden; }
.fullscreen-nav-links a {
  display: inline-block; font-size: clamp(2.5rem, 8vw, 6rem); font-weight: 700;
  color: #fff; text-decoration: none; transform: translateY(110%);
}
```

## Open/close timeline (circular clip-path wipe from the trigger + staggered huge-text links)

```js
const trigger = document.querySelector(".menu-trigger");
const nav = document.querySelector(".fullscreen-nav");
const links = gsap.utils.toArray(".fullscreen-nav-links a");
let isOpen = false;

const tl = gsap.timeline({ paused: true })
  .set(nav, { visibility: "visible", pointerEvents: "auto" })
  .to(".fullscreen-nav-bg", { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "power4.inOut" })
  .to(links, { yPercent: 0, duration: 0.8, stagger: 0.07, ease: "power4.out" }, "-=0.4")
  .from(".fullscreen-nav-meta", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");

trigger.addEventListener("click", () => {
  isOpen = !isOpen;
  trigger.setAttribute("aria-expanded", String(isOpen));
  nav.setAttribute("aria-hidden", String(!isOpen));
  if (isOpen) { tl.timeScale(1).play(); } else { tl.timeScale(1.4).reverse(); }
  document.body.style.overflow = isOpen ? "hidden" : "";
});

// close on link click
links.forEach(a => a.addEventListener("click", () => trigger.click()));
// close on Escape
document.addEventListener("keydown", e => { if (e.key === "Escape" && isOpen) trigger.click(); });
```

## Per-link hover slide detail (optional extra craft)

```js
links.forEach(a => {
  a.addEventListener("mouseenter", () => gsap.to(a, { x: 20, duration: 0.4, ease: "power3.out" }));
  a.addEventListener("mouseleave", () => gsap.to(a, { x: 0, duration: 0.4, ease: "power3.out" }));
});
```

## Notes for the agent

- Trap focus inside `.fullscreen-nav` while open (cycle Tab between the first and last focusable element) and return focus to `.menu-trigger` on close — this is a modal-equivalent overlay and needs modal-equivalent keyboard behavior.
- Reverse the timeline faster than it opens (`timeScale(1.4)` above) — closes should always feel snappier than opens, per the asymmetric-timing rule in `precision-easing-motion-design`.
- Pair the trigger button with the icon-morph pattern from `morphing-hamburger-icon` rather than just swapping text/icon instantly.
- `document.body.style.overflow = "hidden"` while open prevents background scroll — remember to also handle iOS Safari's rubber-band scroll if targeting mobile (may need `touch-action: none` on body as well).
