---
name: ui:tilt-pricing-cards
description: Build a pricing section with 3D tilt-on-hover cards, a highlighted/featured plan that scales up, and a monthly/yearly toggle animated with GSAP. Use whenever the user wants a "pricing section", "pricing cards", "plans comparison", or "subscription tiers" with polish beyond static cards. Builds on custom-cursor-effects' tilt-card pattern.
---

# Pricing Section — Tilt Cards + Animated Toggle

## Structure

```html
<section class="pricing">
  <div class="billing-toggle">
    <span class="toggle-label active" data-period="monthly">Monthly</span>
    <button class="toggle-switch"><span class="toggle-knob"></span></button>
    <span class="toggle-label" data-period="yearly">Yearly <small>(save 20%)</small></span>
  </div>
  <div class="pricing-grid">
    <div class="price-card tilt-card reveal"><h3>Starter</h3><p class="price" data-monthly="19" data-yearly="15">$19</p></div>
    <div class="price-card tilt-card reveal featured"><h3>Pro</h3><p class="price" data-monthly="49" data-yearly="39">$49</p></div>
    <div class="price-card tilt-card reveal"><h3>Team</h3><p class="price" data-monthly="99" data-yearly="79">$99</p></div>
  </div>
</section>
```
```css
.price-card { transform-style: preserve-3d; padding: 32px; border-radius: 20px; background: rgba(255,255,255,0.04); }
.price-card.featured { transform: scale(1.06); border: 1px solid rgba(255,255,255,0.3); }
```

## Tilt on hover (identical pattern to custom-cursor-effects skill, section 4 — reused directly)

```js
document.querySelectorAll(".tilt-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    gsap.to(card, { rotateY: (px - 0.5) * 14, rotateX: (0.5 - py) * 14, transformPerspective: 700, duration: 0.4, ease: "power2.out" });
  });
  card.addEventListener("mouseleave", () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" }));
});
```

## Scroll entrance (featured card pops slightly later/bigger for emphasis)

```js
gsap.from(".price-card", {
  y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
  scrollTrigger: { trigger: ".pricing-grid", start: "top 80%" }
});
```

## Animated price swap on billing toggle

```js
const toggle = document.querySelector(".toggle-switch");
let yearly = false;
toggle.addEventListener("click", () => {
  yearly = !yearly;
  gsap.to(".toggle-knob", { x: yearly ? 24 : 0, duration: 0.3, ease: "power2.out" });
  document.querySelectorAll(".toggle-label").forEach(l => l.classList.toggle("active"));
  document.querySelectorAll(".price").forEach(price => {
    const target = +price.dataset[yearly ? "yearly" : "monthly"];
    const counter = { val: +price.textContent.replace("$", "") };
    gsap.to(counter, {
      val: target, duration: 0.5, ease: "power2.out",
      onUpdate: () => price.textContent = "$" + Math.round(counter.val)
    });
  });
});
```

## Notes for the agent

- Disable the tilt effect on touch devices per the guard in `custom-cursor-effects` — tilt-on-hover has no equivalent meaning on tap.
- Keep the featured card's `scale(1.06)` as a static CSS transform, not part of the hover tilt tween, so the two don't fight — apply tilt as an additive `rotateX/rotateY` on top of the existing scale (GSAP tweens merge onto the same transform property set correctly by default).
- Ensure toggle state and animated price are kept in sync with real state (don't let a fast double-click desync the displayed price from `yearly`/`monthly`) — consider disabling the toggle button briefly during the tween via `pointer-events: none`.
