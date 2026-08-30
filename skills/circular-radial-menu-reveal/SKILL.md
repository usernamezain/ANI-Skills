---
name: ui:menu-radial
description: Build a menu where navigation links expand outward in a circular/radial arrangement from a central trigger button, like a radial dial or flower opening, rather than a conventional list. Use whenever the user wants something genuinely unconventional — "radial menu", "circular nav", "menu that expands in a circle", or when the one-of-a-kind-portfolio-builder skill's originality step calls for a nav pattern nobody else is using. Best suited to a small number of top-level links (4–6 max); not a replacement for a full sitemap nav.
---

# Circular Radial Menu Reveal

## Structure

```html
<div class="radial-menu">
  <button class="radial-trigger" aria-expanded="false">
    <span class="radial-trigger-dot"></span>
  </button>
  <nav class="radial-links" aria-hidden="true">
    <a href="#work" class="radial-link" data-angle="0">Work</a>
    <a href="#about" class="radial-link" data-angle="72">About</a>
    <a href="#services" class="radial-link" data-angle="144">Services</a>
    <a href="#journal" class="radial-link" data-angle="216">Journal</a>
    <a href="#contact" class="radial-link" data-angle="288">Contact</a>
  </nav>
</div>
```
```css
.radial-menu { position: fixed; bottom: 40px; right: 40px; z-index: 999; }
.radial-trigger { width: 64px; height: 64px; border-radius: 50%; background: #fff; border: none; position: relative; z-index: 2; }
.radial-links { position: absolute; inset: 0; pointer-events: none; }
.radial-link {
  position: absolute; top: 32px; left: 32px; width: 90px; height: 90px;
  display: flex; align-items: center; justify-content: center; text-align: center;
  border-radius: 50%; background: #111; color: #fff; text-decoration: none; font-size: 0.85rem;
  opacity: 0; transform: translate(-50%, -50%) scale(0.3);
}
```

## Radial positioning math (compute each link's resting x/y on a circle, then animate outward from the trigger's center)

```js
const trigger = document.querySelector(".radial-trigger");
const linksContainer = document.querySelector(".radial-links");
const links = gsap.utils.toArray(".radial-link");
const radius = 160; // distance from center to each link, in px — tune based on trigger size and viewport
let isOpen = false;

links.forEach(link => {
  const angleDeg = +link.dataset.angle;
  const angleRad = (angleDeg - 90) * (Math.PI / 180); // -90 so angle 0 points straight up rather than right
  link._targetX = Math.cos(angleRad) * radius;
  link._targetY = Math.sin(angleRad) * radius;
});

const tl = gsap.timeline({ paused: true })
  .set(linksContainer, { pointerEvents: "auto" })
  .to(links, {
    x: link => link._targetX,
    y: link => link._targetY,
    scale: 1,
    opacity: 1,
    duration: 0.6,
    ease: "back.out(1.4)",
    stagger: 0.06
  });

trigger.addEventListener("click", () => {
  isOpen = !isOpen;
  trigger.setAttribute("aria-expanded", String(isOpen));
  linksContainer.setAttribute("aria-hidden", String(!isOpen));
  gsap.to(trigger, { rotate: isOpen ? 45 : 0, duration: 0.4, ease: "power3.out" });
  isOpen ? tl.play() : tl.reverse();
});
```
`x: link => link._targetX` uses GSAP's function-based value syntax so each link animates to its own precomputed radial position in a single `.to()` call rather than needing a separate tween per link.

## Notes for the agent

- Cap this pattern at 4–6 links maximum — beyond that, links either overlap or the radius has to grow so large the menu no longer reads as a cohesive radial shape. For a full sitemap, use `fullscreen-menu-overlay` or `mega-menu-dropdown` instead and reserve this pattern for a small, curated top-level nav (common on single-page portfolios).
- On small viewports, reduce `radius` and/or switch the arrangement to a half-circle/arc (limit angles to a 180° range) so links don't get pushed off-screen — always test at 375px width specifically.
- This is a genuinely unconventional pattern per the `one-of-a-kind-portfolio-builder` skill's Step 3 — use it deliberately as part of a considered aesthetic direction, not as a drop-in replacement for a standard nav on a site that otherwise looks conventional; an unusual nav on an otherwise generic site reads as inconsistent rather than distinctive.
- Ensure keyboard access: Tab should reach each `.radial-link` in a sensible order even while visually arranged in a circle (DOM order controls tab order regardless of visual position, so keep the HTML link order logical).
