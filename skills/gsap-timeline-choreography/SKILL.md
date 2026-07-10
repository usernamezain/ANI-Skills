---
name: gsap-timeline-choreography
description: Sequence complex multi-element animations precisely using GSAP timelines — labels, relative position parameters, nested timelines, and function-based stagger — instead of chaining many separate tweens with guessed delay values. Use whenever an animation involves more than 2-3 elements that need to move in relation to each other (hero entrances, multi-step reveals, coordinated section transitions), or when the user says animations feel "out of sync" or "the timing is off."
---

# GSAP Timeline Choreography

The most common cause of animation that feels "almost right but off" is using separate `gsap.to()` calls with hand-guessed `delay` values instead of a single `gsap.timeline()` with position parameters. Delays drift the moment any single animation's duration changes; timeline positions don't.

## 1. The core mistake to avoid

```js
// Fragile — if the first duration changes, every subsequent delay is now wrong
gsap.to(".a", { opacity: 1, duration: 0.6 });
gsap.to(".b", { opacity: 1, duration: 0.6, delay: 0.4 });
gsap.to(".c", { opacity: 1, duration: 0.6, delay: 0.8 });
```
```js
// Robust — position parameters are relative to the timeline, not hand-guessed absolute delays
const tl = gsap.timeline();
tl.to(".a", { opacity: 1, duration: 0.6 })
  .to(".b", { opacity: 1, duration: 0.6 }, "-=0.3")  // starts 0.3s before previous ends
  .to(".c", { opacity: 1, duration: 0.6 }, "-=0.3");
```

## 2. Position parameter syntax (memorize these — they're the whole system)

- `"+=0.5"` — start 0.5s *after* the previous tween/label ends
- `"-=0.3"` — start 0.3s *before* the previous tween ends (overlap)
- `"<"` — start at the exact same time as the previous tween started
- `"<0.2"` — start 0.2s after the previous tween started (not ended)
- `">"` — start when the previous tween ends (same as default, explicit)
- `1.2` (raw number) — start at absolute time 1.2s from timeline start
- `"myLabel"` — start at a named label (see below)

## 3. Labels for coordinating unrelated element groups

```js
const tl = gsap.timeline();
tl.addLabel("heroIn")
  .from(".hero-bg", { scale: 1.15, duration: 1.4 }, "heroIn")
  .from(".hero-title", { y: 40, opacity: 0, duration: 1 }, "heroIn+=0.3")
  .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "heroIn+=0.5")
  .addLabel("navIn", "heroIn+=0.8")
  .from(".nav-link", { y: -10, opacity: 0, stagger: 0.05 }, "navIn");
```
Labels are essential once a sequence has 6+ tweens or spans multiple visually distinct groups (hero copy vs. nav vs. background) — they let you reorganize timing by moving one label instead of recalculating every downstream offset.

## 4. Nested timelines (compose section-level timelines into one master sequence)

```js
function heroTimeline() {
  const tl = gsap.timeline();
  tl.from(".hero-bg", { scale: 1.15, duration: 1.4 })
    .from(".hero-title", { y: 40, opacity: 0, duration: 1 }, "-=1");
  return tl;
}
function navTimeline() {
  const tl = gsap.timeline();
  tl.from(".nav-link", { y: -10, opacity: 0, stagger: 0.05, duration: 0.5 });
  return tl;
}

const master = gsap.timeline();
master.add(heroTimeline())
      .add(navTimeline(), "-=0.6"); // nested timeline starts 0.6s before the previous nested timeline ends
```
This keeps each section's internal choreography self-contained and testable in isolation, while still composing precisely into a full-page sequence.

## 5. Function-based stagger for non-uniform, intentional-feeling reveals

```js
gsap.from(".grid-item", {
  y: 40, opacity: 0, duration: 0.7, ease: "power3.out",
  stagger: {
    each: 0.06,
    from: "center",
    grid: "auto",         // auto-detects rows/cols for a grid, staggers outward correctly instead of linear DOM order
    ease: "power2.out"
  }
});
```
For a grid layout, always pass `grid: "auto"` (or explicit `[rows, cols]`) when using `from: "center"` / `from: "edges"` — without it, GSAP staggers in DOM order regardless of the `from` setting, which looks wrong for anything but a single row.

## 6. `timeScale()` for global pacing control (adjust one number instead of every duration)

```js
const tl = gsap.timeline({ paused: true });
// ...build the full sequence...
tl.timeScale(1.3).play(); // 30% faster across the entire sequence, all relative timing preserved
```
Useful when a fully-built sequence feels globally slightly too slow/fast — scale the whole timeline rather than manually editing every duration.

## 7. `scrollTrigger` + timeline combined (recap from gsap-scrolltrigger-effects, shown here in choreography context)

```js
const tl = gsap.timeline({
  scrollTrigger: { trigger: ".pin-section", start: "top top", end: "+=3000", pin: true, scrub: 1 }
});
tl.to(".slide-1", { autoAlpha: 0 })
  .to(".slide-2", { autoAlpha: 1 }, "<")
  .addLabel("mid")
  .to(".slide-2", { autoAlpha: 0 }, "mid+=1")
  .to(".slide-3", { autoAlpha: 1 }, "<");
```
Inside a scrubbed timeline, position parameters still work exactly the same way — they define proportional scroll-distance relationships, not real seconds, since `scrub` maps the whole timeline's duration onto scroll progress.

## Critical correctness rules

1. Default to one `gsap.timeline()` per coordinated visual sequence — reach for separate `gsap.to()` calls only for genuinely independent, unrelated animations (e.g. an ambient background loop that has no relationship to a hero entrance).
2. Use labels once a sequence exceeds ~5 tweens or spans multiple element groups — hand-tracking offsets without labels is the direct cause of "timing drifted after I changed one duration."
3. Always pass `grid: "auto"` with non-`"start"` stagger `from` values on grid layouts, or the visual stagger direction won't match what `from` implies.
4. Prefer nested nameable timeline functions (`heroTimeline()`, `navTimeline()`) over one giant flat timeline once a page has several independently-meaningful sequences — it's both more maintainable and easier for another agent/developer to reason about later.
