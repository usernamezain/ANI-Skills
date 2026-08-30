---
name: ui:magnetic-nav-links
description: Style huge oversized navigation link text with per-letter magnetic cursor attraction, outline-to-fill hover fill effects, and an animated active-page indicator — the link-styling layer to drop into any fullscreen/drawer/curtain menu skill. Use whenever the user wants nav links that feel "alive" or "magnetic", huge display-sized menu type, or a fill/outline hover effect on menu items. This is a styling layer, not a full menu container — pair it with fullscreen-menu-overlay, side-drawer-nav-menu, top-down-curtain-menu, or split-panel-menu-reveal for the container/open-close mechanics.
---

# Magnetic Huge-Text Nav Links

## Base huge-text link styling

```css
.menu-link {
  display: inline-block; font-size: clamp(2.5rem, 7vw, 5.5rem); font-weight: 700;
  color: transparent; -webkit-text-stroke: 1.5px rgba(255,255,255,0.6);
  text-decoration: none; position: relative; line-height: 1.15;
}
```
The transparent-fill + stroke-outline treatment (rather than solid color) is what makes the "fill in on hover" effect below read clearly — a solid-color link has nothing to visually fill toward.

## Fill-on-hover (outline text fills solid on hover — classic display-type nav treatment)

```css
.menu-link { transition: -webkit-text-stroke 0.4s ease; }
```
```js
document.querySelectorAll(".menu-link").forEach(link => {
  link.addEventListener("mouseenter", () => gsap.to(link, { color: "#fff", duration: 0.4, ease: "power2.out" }));
  link.addEventListener("mouseleave", () => gsap.to(link, { color: "transparent", duration: 0.3, ease: "power2.in" }));
});
```

## Per-link magnetic pull (whole link shifts toward cursor within its bounding box — reuses the pattern from custom-cursor-effects, applied specifically to nav text)

```js
document.querySelectorAll(".menu-link").forEach(link => {
  link.addEventListener("mousemove", e => {
    const r = link.getBoundingClientRect();
    const relX = e.clientX - r.left - r.width / 2;
    const relY = e.clientY - r.top - r.height / 2;
    gsap.to(link, { x: relX * 0.25, y: relY * 0.4, duration: 0.5, ease: "power3.out" });
  });
  link.addEventListener("mouseleave", () => gsap.to(link, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" }));
});
```
Keep the magnetic pull subtle on huge text specifically (`0.25`/`0.4` strength, lower than a normal button's `0.4`+) — at large font sizes, a strong pull looks like the text is glitching rather than magnetically responding.

## Animated active-page underline indicator (a single moving bar that slides to whichever link is active/hovered)

```html
<span class="menu-active-indicator"></span>
```
```css
.menu-active-indicator { position: absolute; height: 3px; background: #fff; bottom: -4px; left: 0; width: 0; }
```
```js
const indicator = document.querySelector(".menu-active-indicator");
document.querySelectorAll(".menu-link").forEach(link => {
  link.addEventListener("mouseenter", () => {
    const linkRect = link.getBoundingClientRect();
    const containerRect = link.closest("ul").getBoundingClientRect();
    gsap.to(indicator, {
      width: linkRect.width,
      x: linkRect.left - containerRect.left,
      y: linkRect.top - containerRect.top + linkRect.height + 4,
      duration: 0.4, ease: "power3.out"
    });
  });
});
document.querySelector("ul").addEventListener("mouseleave", () => gsap.to(indicator, { width: 0, duration: 0.3 }));
```

## Numbered/index prefix detail (agency-site convention — adds craft with minimal code)

```html
<li><span class="menu-index">01</span><a class="menu-link" href="#work">Work</a></li>
```
```css
.menu-index { font-size: 0.9rem; color: rgba(255,255,255,0.4); margin-right: 16px; vertical-align: super; }
```

## Notes for the agent

- Disable the magnetic-pull mousemove listener entirely on touch devices (per the guard convention in `custom-cursor-effects`) — leave the fill-on-hover as a `:active`/tap state instead for touch.
- This skill only styles the `<a>` elements — wire it into whichever container/open-close mechanics skill (`fullscreen-menu-overlay`, `side-drawer-nav-menu`, `top-down-curtain-menu`, `split-panel-menu-reveal`) is being used; don't duplicate the open/close timeline logic here.
- `-webkit-text-stroke` has patchy cross-browser support for the exact stroke rendering — verify in Firefox specifically (support exists but renders slightly differently) and provide a `color: rgba(255,255,255,0.6)` fallback for browsers without stroke support via `@supports not (-webkit-text-stroke: 1px black)`.
