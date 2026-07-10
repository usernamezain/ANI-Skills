---
name: mega-menu-dropdown
description: Build a multi-column mega-menu dropdown that expands beneath a nav item on hover/click, with grouped link columns and an optional live image preview panel that swaps based on which link is hovered. Use whenever the user wants a "mega menu", "dropdown with columns", "nav menu with preview images", or a menu structure for a site with many sections/categories that a simple link list can't organize well.
---

# Mega Menu Dropdown

## Structure

```html
<nav class="main-nav">
  <ul class="nav-list">
    <li class="nav-item has-mega" data-mega="work">
      <button class="nav-item-trigger">Work <span class="chevron">⌄</span></button>
    </li>
    <li class="nav-item"><a href="#about">About</a></li>
  </ul>

  <div class="mega-panel" data-mega-panel="work">
    <div class="mega-columns">
      <div class="mega-col">
        <h5>By Discipline</h5>
        <a href="#" data-preview="preview-branding.jpg">Branding</a>
        <a href="#" data-preview="preview-web.jpg">Web Design</a>
        <a href="#" data-preview="preview-motion.jpg">Motion</a>
      </div>
      <div class="mega-col">
        <h5>By Industry</h5>
        <a href="#" data-preview="preview-tech.jpg">Technology</a>
        <a href="#" data-preview="preview-retail.jpg">Retail</a>
      </div>
    </div>
    <div class="mega-preview"><img src="preview-branding.jpg" alt=""></div>
  </div>
</nav>
```
```css
.mega-panel {
  position: absolute; top: 100%; left: 0; right: 0; z-index: 90;
  display: grid; grid-template-columns: 1fr 320px; gap: 40px;
  background: #111; padding: 40px 6vw; border-top: 1px solid rgba(255,255,255,0.1);
  opacity: 0; visibility: hidden; transform: translateY(-10px);
}
.mega-columns { display: flex; gap: 60px; }
.mega-col a { display: block; padding: 8px 0; color: rgba(255,255,255,0.7); text-decoration: none; }
.mega-preview img { width: 100%; border-radius: 8px; aspect-ratio: 4/3; object-fit: cover; }
```

## Open/close on hover with an intent delay (prevents accidental flicker when moving the cursor across the nav)

```js
let openTimeout, closeTimeout;
document.querySelectorAll(".has-mega").forEach(item => {
  const megaKey = item.dataset.mega;
  const panel = document.querySelector(`[data-mega-panel="${megaKey}"]`);

  item.addEventListener("mouseenter", () => {
    clearTimeout(closeTimeout);
    openTimeout = setTimeout(() => {
      gsap.set(panel, { visibility: "visible" });
      gsap.to(panel, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" });
    }, 100); // small intent delay avoids the panel flashing open during fast cursor pass-through
  });
  item.addEventListener("mouseleave", () => {
    clearTimeout(openTimeout);
    closeTimeout = setTimeout(() => {
      gsap.to(panel, { opacity: 0, y: -10, duration: 0.25, ease: "power2.in", onComplete: () => gsap.set(panel, { visibility: "hidden" }) });
    }, 200); // delay lets the cursor travel from the trigger down into the panel itself without it closing
  });
  panel.addEventListener("mouseenter", () => clearTimeout(closeTimeout));
  panel.addEventListener("mouseleave", () => {
    closeTimeout = setTimeout(() => gsap.to(panel, { opacity: 0, y: -10, duration: 0.25, onComplete: () => gsap.set(panel, { visibility: "hidden" }) }), 200);
  });
});
```
The two delays (100ms open-intent, 200ms close-grace) are the detail that makes hover-driven mega menus feel deliberate instead of twitchy — without them, moving the mouse diagonally across the top nav toward the panel content will cause it to flicker closed before the cursor arrives.

## Live preview image swap on link hover

```js
document.querySelectorAll(".mega-col a[data-preview]").forEach(link => {
  link.addEventListener("mouseenter", () => {
    const img = link.closest(".mega-panel").querySelector(".mega-preview img");
    gsap.to(img, { opacity: 0, duration: 0.15, onComplete: () => {
      img.src = link.dataset.preview;
      gsap.to(img, { opacity: 1, duration: 0.25 });
    }});
  });
});
```

## Notes for the agent

- Provide a click-based open/close (not just hover) for touch devices — mega menus are one of the trickiest patterns for touch, since there's no hover state; on `(pointer: coarse)`, convert `.nav-item-trigger` to a tap-toggle and consider stacking the mega panel as a full accordion instead of a wide grid.
- Keep `mega-panel`'s column count responsive — collapse to a single scrollable column below a reasonable breakpoint (e.g. 900px) rather than shrinking a 3–4 column grid until it's unreadable.
- Add keyboard support: the trigger should be a real `<button>` toggling `aria-expanded`, and Escape should close an open panel and return focus to the trigger.
