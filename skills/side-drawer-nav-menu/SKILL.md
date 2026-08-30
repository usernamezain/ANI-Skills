---
name: ui:menu-side-drawer
description: Build a navigation menu that slides in from the left or right edge of the screen as a fixed-width drawer/panel, with a dimmed backdrop and staggered link entrance. Use whenever the user wants a "side menu", "slide-in nav", "drawer menu", "side panel navigation", or "menu from the side" — distinct from a fullscreen overlay in that it stays a partial-width panel rather than covering the whole viewport.
---

# Side Drawer Nav Menu

## Structure

```html
<button class="menu-trigger" aria-expanded="false" aria-controls="side-drawer">Menu</button>

<div class="drawer-backdrop" aria-hidden="true"></div>
<nav class="side-drawer" id="side-drawer" aria-hidden="true">
  <button class="drawer-close" aria-label="Close menu">×</button>
  <ul class="drawer-links">
    <li><a href="#work">Work</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="drawer-footer"><p>hello@studio.com</p></div>
</nav>
```
```css
.drawer-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); opacity: 0; visibility: hidden; z-index: 997; }
.side-drawer {
  position: fixed; top: 0; right: 0; height: 100vh; width: min(420px, 88vw);
  background: #111; z-index: 998; padding: 8vh 40px;
  transform: translateX(100%); visibility: hidden;
}
.drawer-links { list-style: none; }
.drawer-links a { display: block; font-size: 1.75rem; color: #fff; text-decoration: none; padding: 14px 0; opacity: 0; transform: translateX(24px); }
```
Use `right: 0` + `translateX(100%)` for a right-side drawer (common for secondary nav/cart-style menus); mirror to `left: 0` + `translateX(-100%)` for a left-side drawer (common for primary site nav).

## Open/close timeline

```js
const trigger = document.querySelector(".menu-trigger");
const closeBtn = document.querySelector(".drawer-close");
const drawer = document.querySelector(".side-drawer");
const backdrop = document.querySelector(".drawer-backdrop");
const links = gsap.utils.toArray(".drawer-links a");
let isOpen = false;

const tl = gsap.timeline({ paused: true })
  .set([drawer, backdrop], { visibility: "visible" })
  .to(backdrop, { opacity: 1, duration: 0.4 })
  .to(drawer, { xPercent: 0, duration: 0.5, ease: "power4.out" }, "<0.05")
  .to(links, { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power3.out" }, "-=0.2");

function toggle(open) {
  isOpen = open;
  trigger.setAttribute("aria-expanded", String(isOpen));
  drawer.setAttribute("aria-hidden", String(!isOpen));
  isOpen ? tl.timeScale(1).play() : tl.timeScale(1.3).reverse();
  document.body.style.overflow = isOpen ? "hidden" : "";
}
trigger.addEventListener("click", () => toggle(!isOpen));
closeBtn.addEventListener("click", () => toggle(false));
backdrop.addEventListener("click", () => toggle(false));
document.addEventListener("keydown", e => { if (e.key === "Escape" && isOpen) toggle(false); });
```
Note: `xPercent: 0` (not `x: 0`) is used here so GSAP correctly resolves the percentage-based `translateX` from the CSS starting transform — `gsap.to(drawer, { xPercent: 0 })` targets the same transform mechanism as the initial `transform: translateX(100%)` in CSS, keeping units consistent.

## Notes for the agent

- Trap focus within `.side-drawer` while open, same modal-equivalent requirement as the other menu skills.
- On mobile, `width: min(420px, 88vw)` keeps the drawer from spanning edge-to-edge while still being comfortably tappable — never let a side drawer's width exceed ~90vw or it functionally becomes a fullscreen overlay without that pattern's intentional framing.
- If nested sub-items are needed (e.g. "Services" expands to show sub-links), animate an inner accordion using the height-measurement pattern from `smooth-accordion-faq-section` rather than nesting another drawer.
