---
name: scroll-morph-navbar-section
description: Build a navbar that morphs on scroll — shrinks in height, adds a background/blur, and can hide-on-scroll-down/show-on-scroll-up. Use whenever the user wants a "sticky navbar", "shrinking header", "navbar that changes on scroll", or "hide navbar on scroll down". Pairs with buttery-smooth-120fps-performance for the rAF-throttled scroll listener.
---

# Scroll-Morphing Navbar Section

## Structure

```html
<nav class="site-nav">
  <a class="nav-logo" href="/">Brand</a>
  <ul class="nav-links"><li><a href="#work">Work</a></li><li><a href="#about">About</a></li><li><a href="#contact">Contact</a></li></ul>
</nav>
```
```css
.site-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  display: flex; justify-content: space-between; align-items: center;
  padding: 28px 6vw; transition: none; /* JS drives the morph, not CSS transition, for scrub precision */
  background: transparent;
}
```

## Shrink + backdrop-blur on scroll past threshold (state-based, not scrubbed)

```js
ScrollTrigger.create({
  start: 80,
  end: 99999,
  onUpdate: self => {
    gsap.to(".site-nav", {
      paddingTop: self.progress > 0 ? 14 : 28,
      paddingBottom: self.progress > 0 ? 14 : 28,
      backgroundColor: self.direction === 1 || window.scrollY > 80 ? "rgba(10,10,10,0.75)" : "rgba(0,0,0,0)",
      backdropFilter: window.scrollY > 80 ? "blur(12px)" : "blur(0px)",
      duration: 0.4, ease: "power2.out", overwrite: "auto"
    });
  }
});
```
Simpler threshold-only version if smooth interpolation isn't required:
```js
ScrollTrigger.create({
  start: "top -80",
  onEnter: () => document.querySelector(".site-nav").classList.add("nav-scrolled"),
  onLeaveBack: () => document.querySelector(".site-nav").classList.remove("nav-scrolled")
});
```
```css
.site-nav.nav-scrolled { padding: 14px 6vw; background: rgba(10,10,10,0.75); backdrop-filter: blur(12px); }
```
Prefer the class-toggle version (second one) for most projects — it's cheaper (no per-frame `onUpdate` tween creation) and CSS `transition` handles the smoothing.
```css
.site-nav { transition: padding 0.4s ease, background-color 0.4s ease, backdrop-filter 0.4s ease; }
```

## Hide on scroll down, reveal on scroll up

```js
let lastY = window.scrollY;
ScrollTrigger.create({
  start: "top top",
  end: 99999,
  onUpdate: self => {
    const goingDown = self.direction === 1;
    gsap.to(".site-nav", { yPercent: goingDown && window.scrollY > 200 ? -100 : 0, duration: 0.35, ease: "power2.out" });
  }
});
```

## Notes for the agent

- Use the class-toggle CSS-transition approach by default; only use the per-frame `onUpdate` tween approach if the user explicitly wants scroll-scrubbed (not threshold) navbar morphing.
- Combine with a mobile hamburger menu using a separate GSAP timeline (`.fromTo` on a fullscreen overlay `clipPath`) rather than this scroll logic — nav-open state and scroll-morph state are independent concerns.
- Always keep `z-index` above hero/section content and test that `backdrop-filter: blur()` has a fallback solid background for browsers without support.
