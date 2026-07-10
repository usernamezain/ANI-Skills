---
name: precision-easing-motion-design
description: Choose and tune animation easing curves with actual motion-design intent — custom cubic-bezier curves, GSAP's expanded ease library, and the physical-motion principles (anticipation, overshoot, follow-through) that separate "buttery" animation from generic linear/ease-in-out defaults. Use whenever the user says "make it feel smoother", "buttery", "more premium/polished motion", "the animation feels stiff/robotic", or asks about timing/easing specifically.
---

# Precision Easing & Motion Design

Jank and "stiffness" are usually not a frame-rate problem — they're an easing-choice problem. Two animations with identical duration and identical FPS can feel completely different depending on the curve. This skill is about picking the *right* curve on purpose, not defaulting to `ease` or `ease-in-out` everywhere.

## 1. Stop defaulting to `power2.inOut` for everything — match the ease to the motion's intent

| Motion type | Recommended GSAP ease | Why |
|---|---|---|
| Element entering from off-screen | `power3.out` or `power4.out` | Fast start, gentle settle — mimics real deceleration |
| Element exiting/leaving | `power2.in` or `power3.in` | Slow start, fast finish — feels like it's being pulled away |
| Playful/bouncy UI (buttons, toggles, magnetic elements) | `elastic.out(1, 0.4)` or `back.out(1.7)` | Slight overshoot before settling — reads as "alive" |
| Scroll-scrubbed animation (tied 1:1 to scroll position) | `"none"` (linear) | Any easing here fights the user's own scroll input — always linear for scrub |
| Looping ambient motion (glow drift, floating shapes) | `sine.inOut` | Smooth, organic, no harsh start/stop — avoids a "mechanical" loop |
| Modal/panel open | `power4.out` in, `power2.in` out | Asymmetric timing: open feels immediate, close feels natural, not identical-reversed |

```js
gsap.to(el, { y: 0, opacity: 1, duration: 0.8, ease: "power4.out" });   // entrance
gsap.to(el, { y: -20, opacity: 0, duration: 0.4, ease: "power2.in" });  // exit — shorter + different curve, not just reversed
```
The single most common "stiff" mistake: using the *same* duration and ease for both entrance and exit. Real motion is asymmetric — things arrive with more visible deceleration than they leave with.

## 2. Custom cubic-bezier curves when the built-in eases aren't precise enough

```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);   /* fast, decisive settle — great for hero reveals */
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1); /* smooth symmetric, more "designed" than default ease-in-out */
  --ease-out-back: cubic-bezier(0.34, 1.56, 0.64, 1);  /* slight overshoot without full elastic bounce */
}
.reveal { transition: transform 0.6s var(--ease-out-expo); }
```
In GSAP, pass the same bezier string directly: `ease: "cubic-bezier(0.16, 1, 0.3, 1)"` or register a custom ease once: `CustomEase.create("outExpo", "0.16, 1, 0.3, 1")` (requires the `CustomEase` plugin) then reuse `ease: "outExpo"` everywhere for consistency.

## 3. Duration discipline — precise timing ranges by interaction type

- **Micro-interactions** (button hover, icon toggle, small state change): 150–300ms. Longer feels laggy/unresponsive.
- **Component transitions** (accordion open, modal, tab switch): 300–500ms.
- **Section/page-level reveals** (hero entrance, scroll reveal): 600ms–1.2s.
- **Ambient/looping motion** (glow drift, marquee): 4s+, always `sine.inOut` or linear — fast loops on ambient elements feel anxious, not premium.

Never use a single duration constant for every animation on a site — differentiate by scale/importance of what's moving, matching the table above.

## 4. Anticipation and overshoot (the details that separate "animated" from "buttery")

```js
// Anticipation: a tiny opposite-direction dip before the main motion — used sparingly, for emphasis
gsap.timeline()
  .to(el, { y: 6, duration: 0.1, ease: "power1.in" })   // small anticipatory dip
  .to(el, { y: -20, duration: 0.5, ease: "power4.out" }); // then the real motion

// Overshoot on arrival: settles past the target then eases back — reads as physical weight
gsap.to(el, { scale: 1, duration: 0.6, ease: "back.out(1.7)" }); // the 1.7 controls overshoot strength — 1.2-2 is usually the sweet spot, above 3 looks cartoonish
```
Reserve anticipation/overshoot for a small number of high-emphasis moments (a hero CTA, a magnetic button, a modal open) — applying it to every single reveal on the page reads as gimmicky rather than premium.

## 5. Stagger timing precision (not just a flat number)

```js
gsap.from(".grid-item", {
  y: 30, opacity: 0, duration: 0.6, ease: "power3.out",
  stagger: { each: 0.06, from: "start", ease: "power1.in" } // stagger itself can have its own ease curve
});
```
`stagger.from: "center"` or `"random"` reads more intentional than the default `"start"` (top-left-first) for symmetric grids like team or work sections — pick based on the layout's visual center of gravity.

## Critical correctness rules

1. Never use eased/non-linear curves inside a `scrub`-tied `ScrollTrigger` animation — the user's own scroll speed is already the "easing"; a non-linear ease there causes the animation to visibly lag or race ahead of the actual scroll position.
2. Keep entrance and exit animations asymmetric (different duration + different ease) rather than literally reversing the same tween — this single change is the highest-leverage fix for "stiff" feeling UI.
3. Don't apply elastic/back overshoot to more than a few emphasis moments per page — overuse reads as cheap, not premium.
4. Always test easing choices at the actual target duration, not sped up in a code editor preview — a curve that looks great at 2x speed can feel completely different at real speed.
