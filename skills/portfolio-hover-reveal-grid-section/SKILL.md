---
name: ui:portfolio-hover-grid
description: Build a portfolio/work grid where thumbnails reveal a preview image, project title, or video on hover, with a staggered scroll-triggered entrance for the grid items. Use whenever the user wants a "portfolio section", "project grid", "work showcase", "case study grid", or "hover to preview" gallery. Combines gsap-scrolltrigger-effects (entrance) with custom-cursor-effects (hover preview follow-cursor pattern).
---

# Portfolio Hover-Reveal Grid Section

## Structure

```html
<section class="portfolio-grid">
  <a class="portfolio-item reveal" data-preview-img="preview-1.jpg" href="/work/1">
    <span class="portfolio-title">Nord — Brand Identity</span>
    <span class="portfolio-tag">Branding · 2025</span>
  </a>
  <!-- repeat .portfolio-item for each project -->
  <div class="hover-preview"><img src="" alt=""></div>
</section>
```
```css
.portfolio-grid { display: grid; grid-template-columns: 1fr; gap: 0; }
.portfolio-item { display: flex; justify-content: space-between; padding: 28px 0; border-top: 1px solid rgba(255,255,255,0.15); text-decoration: none; color: inherit; }
.hover-preview { position: fixed; top: 0; left: 0; width: 280px; height: 360px; pointer-events: none; opacity: 0; z-index: 50; overflow: hidden; border-radius: 8px; }
.hover-preview img { width: 100%; height: 100%; object-fit: cover; }
```

## Staggered scroll entrance

```js
gsap.from(".portfolio-item", {
  y: 40, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.08,
  scrollTrigger: { trigger: ".portfolio-grid", start: "top 80%" }
});
```

## Hover preview that follows the cursor (from custom-cursor-effects skill, section 6)

```js
const preview = document.querySelector(".hover-preview img");
document.querySelectorAll(".portfolio-item").forEach(item => {
  item.addEventListener("mouseenter", () => {
    preview.src = item.dataset.previewImg;
    gsap.to(".hover-preview", { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power3.out" });
  });
  item.addEventListener("mousemove", e => {
    gsap.to(".hover-preview", { x: e.clientX + 24, y: e.clientY - 180, duration: 0.6, ease: "power3.out" });
  });
  item.addEventListener("mouseleave", () => gsap.to(".hover-preview", { autoAlpha: 0, scale: 0.9, duration: 0.3 }));
});
```

## Title text slide-in on row hover (adds craft to a text-only row)

```js
document.querySelectorAll(".portfolio-item").forEach(item => {
  const title = item.querySelector(".portfolio-title");
  item.addEventListener("mouseenter", () => gsap.to(title, { x: 16, duration: 0.4, ease: "power3.out" }));
  item.addEventListener("mouseleave", () => gsap.to(title, { x: 0, duration: 0.4, ease: "power3.out" }));
});
```

## Notes for the agent

- On touch devices, skip the cursor-following preview entirely (per the touch guard in `custom-cursor-effects`) and instead show the preview image inline within the row or on tap.
- Preload preview images on hover via `<link rel="prefetch">` is unnecessary for a handful of images but worth doing if the grid has 20+ items.
- If the user wants full thumbnail tiles instead of text rows, swap this pattern's row layout for a CSS grid of `<a class="portfolio-item"><img></a>` tiles and apply a `scale(1.05)` + `overflow:hidden` zoom-on-hover to the inner image instead of the floating preview.
