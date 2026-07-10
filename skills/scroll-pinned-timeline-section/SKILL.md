---
name: scroll-pinned-timeline-section
description: Build a vertical timeline/roadmap/milestones section where a progress line draws itself and milestone cards light up as the user scrolls past them, with an optional pinned variant where the timeline stays centered while entries scroll past. Use whenever the user wants a "timeline section", "roadmap", "milestones", "our history", or "process steps section".
---

# Scroll-Pinned Timeline Section

## Structure

```html
<section class="timeline">
  <div class="timeline-line"><div class="timeline-progress"></div></div>
  <div class="timeline-entry reveal"><span class="timeline-dot"></span><div class="timeline-content"><h4>2022</h4><p>Founded with a two-person team and one client.</p></div></div>
  <div class="timeline-entry reveal"><span class="timeline-dot"></span><div class="timeline-content"><h4>2023</h4><p>Grew to 12 people, opened a second studio.</p></div></div>
  <div class="timeline-entry reveal"><span class="timeline-dot"></span><div class="timeline-content"><h4>2025</h4><p>Shipped our 200th project.</p></div></div>
</section>
```
```css
.timeline { position: relative; padding-left: 60px; }
.timeline-line { position: absolute; left: 20px; top: 0; bottom: 0; width: 2px; background: rgba(255,255,255,0.15); }
.timeline-progress { width: 100%; height: 0; background: #fff; }
.timeline-entry { position: relative; padding: 40px 0; }
.timeline-dot { position: absolute; left: -46px; top: 44px; width: 14px; height: 14px; border-radius: 50%; background: rgba(255,255,255,0.2); }
.timeline-dot.active { background: #fff; }
```

## Progress line draws itself as user scrolls through the whole section

```js
gsap.to(".timeline-progress", {
  height: "100%",
  ease: "none",
  scrollTrigger: { trigger: ".timeline", start: "top 60%", end: "bottom 60%", scrub: true }
});
```

## Each dot lights up and its content fades in as it's reached

```js
gsap.utils.toArray(".timeline-entry").forEach(entry => {
  const dot = entry.querySelector(".timeline-dot");
  gsap.timeline({ scrollTrigger: { trigger: entry, start: "top 65%", toggleActions: "play none none reverse" } })
    .to(dot, { backgroundColor: "#fff", scale: 1.2, duration: 0.3 })
    .from(entry.querySelector(".timeline-content"), { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" }, "<");
});
```

## Optional pinned variant (timeline label stays centered/fixed while entries scroll past it — good for long roadmaps)

```js
ScrollTrigger.create({ trigger: ".timeline", start: "top top", end: "bottom bottom", pin: ".timeline-year-marker", pinSpacing: false });
```
Use only when there's a single persistent label (e.g. a year counter) that should stay put while individual milestone cards scroll past beside it — for the simpler top-to-bottom draw-in pattern above, skip pinning entirely.

## Notes for the agent

- `toggleActions: "play none none reverse"` makes each dot/content un-light as the user scrolls back up past it — use `"play none none none"` instead if the user wants entries to stay lit permanently once revealed.
- The progress-line-draw effect depends on knowing the real rendered height of `.timeline` — call `ScrollTrigger.refresh()` after any dynamic entries are added/images load inside timeline content.
- For very long timelines (10+ entries), consider virtualizing/lazy-mounting entries far off-screen rather than creating 10+ individual ScrollTrigger instances all at once, per performance guidance in `buttery-smooth-120fps-performance`.
