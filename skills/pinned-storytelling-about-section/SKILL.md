---
name: pinned-storytelling-about-section
description: Build a pinned "about" or brand-story section where the section sticks in place while a sequence of copy/images crossfades or slides as the user keeps scrolling — the classic scrollytelling technique. Use whenever the user wants an "about section", "our story", "scrollytelling", "pinned narrative section", or a section where "text changes as I scroll but stays in place". Built directly on the gsap-scrolltrigger-effects skill's pin+scrub pattern.
---

# Pinned Storytelling / About Section

## Structure

```html
<section class="story-pin">
  <div class="story-visual">
    <img class="story-img active" src="story-1.jpg" alt="">
    <img class="story-img" src="story-2.jpg" alt="">
    <img class="story-img" src="story-3.jpg" alt="">
  </div>
  <div class="story-copy">
    <p class="story-step active" data-step="1">It started with a simple question: what if brand and product were never separate decisions?</p>
    <p class="story-step" data-step="2">Three years later, we've shipped for over 40 companies across five countries.</p>
    <p class="story-step" data-step="3">Today, we're a small team obsessed with craft — and we're just getting started.</p>
  </div>
</section>
```
```css
.story-pin { position: relative; height: 100vh; display: grid; grid-template-columns: 1fr 1fr; align-items: center; overflow: hidden; }
.story-visual { position: relative; height: 70vh; }
.story-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; }
.story-img.active { opacity: 1; }
.story-step { position: absolute; opacity: 0; font-size: 1.6rem; max-width: 32ch; }
.story-step.active { opacity: 1; }
```

## Pinned step-through timeline

```js
const steps = gsap.utils.toArray(".story-step");
const imgs = gsap.utils.toArray(".story-img");

ScrollTrigger.create({
  trigger: ".story-pin",
  start: "top top",
  end: `+=${steps.length * 1000}`,  // 1000px of scroll distance per step
  pin: true,
  scrub: 1,
  snap: 1 / (steps.length - 1),      // settles cleanly on each step instead of stopping mid-transition
  onUpdate: self => {
    const stepIndex = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
    steps.forEach((s, i) => s.classList.toggle("active", i === stepIndex));
    imgs.forEach((im, i) => im.classList.toggle("active", i === stepIndex));
  }
});
```
```css
.story-step, .story-img { transition: opacity 0.6s ease; } /* the crossfade itself can be plain CSS since class toggling is cheap */
```

## Alternative: timeline-based crossfade instead of class toggling (smoother, more control over overlap)

```js
const tl = gsap.timeline({
  scrollTrigger: { trigger: ".story-pin", start: "top top", end: "+=3000", pin: true, scrub: 1 }
});
tl.to(imgs[0], { opacity: 0 }).to(imgs[1], { opacity: 1 }, "<")
  .to(steps[0], { opacity: 0 }, "<").to(steps[1], { opacity: 1 }, "<")
  .to(imgs[1], { opacity: 0 }).to(imgs[2], { opacity: 1 }, "<")
  .to(steps[1], { opacity: 0 }, "<").to(steps[2], { opacity: 1 }, "<");
```

## Notes for the agent

- `end: "+=Npx"` controls how "long" (in scroll distance) the whole story takes — more steps need a proportionally larger value; a good default is 900–1200px per step.
- Always call `ScrollTrigger.refresh()` after images load if they affect layout height, per the core `gsap-scrolltrigger-effects` skill's correctness rules.
- On mobile, pinned sections this tall can feel excessive — consider disabling `pin` below a breakpoint (`ScrollTrigger.matchMedia()`) and falling back to a normal stacked-scroll reveal instead.
