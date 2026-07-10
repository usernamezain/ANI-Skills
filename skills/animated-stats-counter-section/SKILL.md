---
name: animated-stats-counter-section
description: Build a stats/metrics section where numbers count up as they scroll into view, with staggered timing, animated separators, and an optional circular progress ring per stat. Use whenever the user wants a "stats section", "numbers section", "metrics counter", "by the numbers", or "achievements section". Uses the counter pattern from text-motion-typography, extended with layout and ring variants.
---

# Animated Stats Counter Section

## Structure

```html
<section class="stats">
  <div class="stat reveal">
    <span class="stat-number" data-target="240" data-suffix="+">0</span>
    <p class="stat-label">Projects shipped</p>
  </div>
  <div class="stat reveal">
    <span class="stat-number" data-target="98" data-suffix="%">0</span>
    <p class="stat-label">Client retention</p>
  </div>
  <div class="stat reveal">
    <span class="stat-number" data-target="12" data-suffix="">0</span>
    <p class="stat-label">Countries served</p>
  </div>
</section>
```
```css
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; text-align: center; }
.stat-number { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 700; display: block; }
```

## Count-up on scroll entrance

```js
gsap.utils.toArray(".stat-number").forEach(el => {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || "";
  gsap.fromTo(el, { innerText: 0 }, {
    innerText: target,
    duration: 1.8,
    ease: "power2.out",
    snap: { innerText: 1 },
    scrollTrigger: { trigger: el, start: "top 85%", once: true },
    onUpdate: function () { el.textContent = Math.floor(this.targets()[0].innerText) + suffix; }
  });
});
```
`once: true` ensures the count-up plays exactly once (not every time the user scrolls back up/down past it) — stats sections almost always want this rather than replaying.

## Staggered container entrance (cards fade/slide up before the numbers start counting)

```js
gsap.from(".stat", {
  y: 30, opacity: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
  scrollTrigger: { trigger: ".stats", start: "top 85%" }
});
```

## Optional: circular progress ring per stat (percentage-based stats only)

```html
<svg class="stat-ring" viewBox="0 0 100 100">
  <circle class="ring-bg" cx="50" cy="50" r="45" />
  <circle class="ring-fill" cx="50" cy="50" r="45" />
</svg>
```
```css
.ring-bg, .ring-fill { fill: none; stroke-width: 6; }
.ring-bg { stroke: rgba(255,255,255,0.1); }
.ring-fill { stroke: #fff; stroke-dasharray: 283; stroke-dashoffset: 283; transform: rotate(-90deg); transform-origin: center; }
```
```js
gsap.to(".ring-fill", {
  strokeDashoffset: 283 - (283 * 98) / 100, // 283 = 2*PI*45, 98 = target percent
  duration: 1.8, ease: "power2.out",
  scrollTrigger: { trigger: ".stat-ring", start: "top 85%", once: true }
});
```

## Notes for the agent

- Always pair `once: true` on stat count-ups — recounting every time a user scrolls past looks buggy, not delightful.
- If stats include decimals (e.g. "4.9 rating"), adjust `snap` to `{ innerText: 0.1 }` and format with `.toFixed(1)` in `onUpdate` instead of `Math.floor`.
- Keep the number and its suffix in the same animated element's `onUpdate`, not as a separate static span, or the suffix will visually detach from the counting number during the tween.
