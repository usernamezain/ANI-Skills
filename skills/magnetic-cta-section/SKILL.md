---
name: magnetic-cta-section
description: Build a bold closing call-to-action section with a large magnetic button, animated gradient/glow background, and a scroll-scrubbed entrance that builds anticipation. Use whenever the user wants a "CTA section", "call to action", "final section", "get started section", or "closing banner" before the footer.
---

# Magnetic CTA Section

## Structure

```html
<section class="cta">
  <h2 class="cta-heading reveal">Ready to build something people remember?</h2>
  <a class="cta-button magnetic" href="#contact">
    <span class="cta-button-inner magnetic-inner">Start a project →</span>
  </a>
  <div class="cta-glow"></div>
</section>
```
```css
.cta { position: relative; text-align: center; padding: 14vh 6vw; overflow: hidden; }
.cta-glow {
  position: absolute; top: 50%; left: 50%; width: 60vw; height: 60vw;
  background: radial-gradient(circle, rgba(124,58,237,0.35), transparent 70%);
  transform: translate(-50%, -50%); filter: blur(60px); z-index: 0;
}
.cta-button { position: relative; z-index: 1; display: inline-block; padding: 20px 48px; border-radius: 999px; background: #fff; color: #000; font-weight: 600; text-decoration: none; }
```

## Two-layer magnetic pull (button shifts more, inner label shifts slightly less — adds depth)

```js
const btn = document.querySelector(".cta-button");
const label = document.querySelector(".magnetic-inner");
btn.addEventListener("mousemove", e => {
  const r = btn.getBoundingClientRect();
  const relX = e.clientX - r.left - r.width / 2;
  const relY = e.clientY - r.top - r.height / 2;
  gsap.to(btn, { x: relX * 0.4, y: relY * 0.4, duration: 0.6, ease: "power3.out" });
  gsap.to(label, { x: relX * 0.2, y: relY * 0.2, duration: 0.6, ease: "power3.out" });
});
btn.addEventListener("mouseleave", () => {
  gsap.to([btn, label], { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
});
```

## Ambient glow drift (slow looping motion so the section never feels static)

```js
gsap.to(".cta-glow", { x: 40, y: -30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
```

## Scroll entrance with slight anticipation (heading scales up from below full size, glow fades in)

```js
gsap.from(".cta-heading", {
  y: 50, opacity: 0, scale: 0.95, duration: 1, ease: "power4.out",
  scrollTrigger: { trigger: ".cta", start: "top 75%" }
});
gsap.from(".cta-glow", {
  opacity: 0, duration: 1.5, ease: "power2.out",
  scrollTrigger: { trigger: ".cta", start: "top 75%" }
});
gsap.from(".cta-button", {
  y: 30, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.2,
  scrollTrigger: { trigger: ".cta", start: "top 75%" }
});
```

## Notes for the agent

- Keep the glow's `filter: blur()` radius large and its opacity low — this section's whole job is to feel calm/inviting right before a footer, not busy.
- The two-layer magnetic pull (button + inner label at different strengths) reads as noticeably more premium than a single-layer pull; use it for hero/CTA buttons specifically, and the simpler single-layer version from `custom-cursor-effects` for smaller inline buttons.
- Disable the glow drift animation (or drastically slow it) if `prefers-reduced-motion` is set, per the accessibility rule in `buttery-smooth-120fps-performance`.
