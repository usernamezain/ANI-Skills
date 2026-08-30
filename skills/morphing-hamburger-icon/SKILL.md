---
name: ui:hamburger-morph
description: Build an animated hamburger-to-X menu trigger icon with smooth line morphing, plus a text-label variant ("Menu" to "Close") and a circular progress/hover ring around the button. Use whenever the user wants a "hamburger menu icon", "animated menu button", "hamburger to X animation", or "menu open/close icon transition" — this is the trigger-button skill, pair it with any of the menu-container skills (fullscreen-menu-overlay, side-drawer-nav-menu, top-down-curtain-menu, split-panel-menu-reveal).
---

# Morphing Hamburger Icon

## Structure (3-line SVG hamburger, most reliable cross-browser morph approach)

```html
<button class="menu-trigger" aria-expanded="false" aria-label="Open menu">
  <svg class="hamburger-icon" viewBox="0 0 32 32" width="32" height="32">
    <line class="line line-top" x1="4" y1="10" x2="28" y2="10" />
    <line class="line line-mid" x1="4" y1="16" x2="28" y2="16" />
    <line class="line line-bottom" x1="4" y1="22" x2="28" y2="22" />
  </svg>
</button>
```
```css
.hamburger-icon .line { stroke: #fff; stroke-width: 2.5; stroke-linecap: round; fill: none; transform-origin: center; }
```

## Morph timeline (top/bottom lines rotate into an X, middle line fades and slides away)

```js
const trigger = document.querySelector(".menu-trigger");
const iconTl = gsap.timeline({ paused: true })
  .to(".line-top", { attr: { x1: 6, y1: 6, x2: 26, y2: 26 }, duration: 0.35, ease: "power3.inOut" }, 0)
  .to(".line-bottom", { attr: { x1: 6, y1: 26, x2: 26, y2: 6 }, duration: 0.35, ease: "power3.inOut" }, 0)
  .to(".line-mid", { opacity: 0, duration: 0.2 }, 0);

trigger.addEventListener("click", () => {
  const isOpen = trigger.getAttribute("aria-expanded") === "true";
  trigger.setAttribute("aria-expanded", String(!isOpen));
  trigger.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  isOpen ? iconTl.reverse() : iconTl.play();
});
```
Animating the SVG `attr:` (actual line endpoint coordinates) rather than CSS `transform: rotate()` on each line gives a true morph where the lines visibly converge into an X shape rather than two parallel lines spinning independently — this is the detail that separates a polished icon morph from a generic one.

## Text-label variant ("Menu" ↔ "Close", for sites where the trigger is a text button, not an icon)

```html
<button class="menu-trigger">
  <span class="trigger-label trigger-label-open">Menu</span>
  <span class="trigger-label trigger-label-close">Close</span>
</button>
```
```css
.trigger-label { position: absolute; }
.trigger-label-close { transform: translateY(100%); opacity: 0; }
```
```js
const labelTl = gsap.timeline({ paused: true })
  .to(".trigger-label-open", { yPercent: -100, opacity: 0, duration: 0.3, ease: "power3.inOut" }, 0)
  .to(".trigger-label-close", { yPercent: 0, opacity: 1, duration: 0.3, ease: "power3.inOut" }, 0);
// trigger the same way: isOpen ? labelTl.reverse() : labelTl.play();
```

## Optional: circular hover/progress ring around a round trigger button (adds a premium detail without extra complexity)

```html
<button class="menu-trigger round">
  <svg class="trigger-ring" viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" /></svg>
  <!-- hamburger icon svg goes inside, centered -->
</button>
```
```css
.trigger-ring circle { fill: none; stroke: rgba(255,255,255,0.4); stroke-width: 1.5; stroke-dasharray: 126; stroke-dashoffset: 126; transform-origin: center; transform: rotate(-90deg); }
```
```js
trigger.addEventListener("mouseenter", () => gsap.to(".trigger-ring circle", { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }));
trigger.addEventListener("mouseleave", () => gsap.to(".trigger-ring circle", { strokeDashoffset: 126, duration: 0.4, ease: "power2.in" }));
```

## Notes for the agent

- Always keep `aria-expanded` and `aria-label` in sync with actual open/close state — a purely visual icon morph with no updated `aria-label` fails screen-reader users even if it looks correct sighted.
- Use `iconTl.reverse()` here (unlike `split-panel-menu-reveal`'s explicit close tweens) because a hamburger-to-X icon genuinely should look like a true mirror image both directions — this is the case where reversing the same timeline is the correct choice, not a shortcut.
- Keep the icon morph duration short (0.3–0.4s) regardless of how long the actual menu-container's open animation takes — the icon is a small, secondary element and should never lag noticeably behind the button press.
