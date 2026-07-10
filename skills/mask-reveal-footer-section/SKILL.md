---
name: mask-reveal-footer-section
description: Build a footer section that reveals itself with a rising mask/curtain as the user scrolls to the bottom of the page, plus a large animated logo/wordmark and staggered link columns. Use whenever the user wants a "footer section", "site footer", "curtain reveal footer", or "footer that slides up from the bottom". Builds on morph-mask-reveal-transitions for the curtain effect.
---

# Mask-Reveal Footer Section

## Structure (footer sits beneath the main content, revealed as page content lifts away)

```html
<main class="page-content"><!-- rest of site --></main>
<footer class="site-footer">
  <h2 class="footer-word">Let's talk.</h2>
  <div class="footer-columns">
    <div class="footer-col reveal"><h4>Sitemap</h4><a href="#">Work</a><a href="#">About</a><a href="#">Contact</a></div>
    <div class="footer-col reveal"><h4>Social</h4><a href="#">Instagram</a><a href="#">LinkedIn</a></div>
    <div class="footer-col reveal"><h4>Contact</h4><a href="mailto:hi@studio.com">hi@studio.com</a></div>
  </div>
  <p class="footer-legal">© 2026 Studio. All rights reserved.</p>
</footer>
```
```css
.page-content { position: relative; z-index: 2; background: #0a0a0a; border-radius: 0 0 24px 24px; }
.site-footer { position: sticky; bottom: 0; z-index: 1; height: 100vh; display: flex; flex-direction: column; justify-content: space-between; padding: 6vw; }
```
The "curtain" illusion: `.page-content` sits on top (`z-index: 2`) with rounded bottom corners and its own background; `.site-footer` is `position: sticky; bottom: 0` underneath, so as the page scrolls to the end, the content naturally lifts away and reveals the footer sitting still beneath it — no JS required for the core effect, which is both simpler and cheaper than a scrubbed clip-path.

## Optional: exaggerate the reveal with a corner-radius/scale animation on the content edge

```js
gsap.to(".page-content", {
  scale: 0.96,
  borderRadius: 32,
  ease: "none",
  scrollTrigger: { trigger: ".site-footer", start: "top bottom", end: "top top", scrub: true }
});
```

## Big wordmark scale-in as footer becomes visible

```js
gsap.from(".footer-word", {
  scale: 0.8, opacity: 0, duration: 1, ease: "power3.out",
  scrollTrigger: { trigger: ".site-footer", start: "top 70%" }
});
```

## Staggered link columns

```js
gsap.from(".footer-col", {
  y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
  scrollTrigger: { trigger: ".footer-columns", start: "top 85%" }
});
```

## Notes for the agent

- The sticky-footer-under-lifting-content pattern is CSS-driven and far cheaper than a JS clip-path curtain — prefer it unless the user specifically wants a diagonal/angled wipe, in which case use the clip-path polygon approach from `morph-mask-reveal-transitions` skill section 1 instead.
- `.page-content`'s rounded-corner-reveal only reads correctly if `.site-footer`'s background contrasts with `.page-content`'s background — pick genuinely different colors, not near-identical shades.
- Test on mobile Safari specifically — `position: sticky` combined with `overflow` on ancestors is a common breakage point; make sure no ancestor of `.site-footer` has `overflow: hidden` set.
