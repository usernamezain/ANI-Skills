---
name: ui:hero-split-text
description: Build a minimal, typography-first hero section where the headline reveals character-by-character or line-by-line through masked slits, followed by a subtle scroll-scrub zoom. Use for editorial, SaaS, or design-studio landing pages where the user asks for a "text-focused hero", "big typography hero", "line reveal headline", or a cleaner alternative to an image-heavy hero. Pairs with text-motion-typography for the split logic.
---

# Split-Text Reveal Hero Section

## Structure

```html
<section class="hero-text">
  <h1 class="hero-text-title">
    <span class="line-mask"><span class="line">Design that</span></span>
    <span class="line-mask"><span class="line">moves people.</span></span>
  </h1>
  <p class="hero-text-sub reveal-fade">A product studio for startups who refuse to blend in.</p>
</section>
```
```css
.hero-text { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 0 6vw; }
.hero-text-title { font-size: clamp(2.5rem, 8vw, 6rem); line-height: 1.05; font-weight: 700; }
.line-mask { display: block; overflow: hidden; }
.line { display: inline-block; will-change: transform; }
```

## Reveal timeline (line-mask slide-up, staggered)

```js
const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1 } });
tl.from(".line", { yPercent: 110, stagger: 0.12 })
  .from(".reveal-fade", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5");
```
For a per-character version instead of per-line, replace `.line` targets with the `splitText(el, "chars")` helper from the `text-motion-typography` skill and use `yPercent: 120, stagger: 0.015`.

## Subtle scroll-scrub zoom-out (title shrinks slightly as user scrolls, signalling "settle in")

```js
gsap.to(".hero-text-title", {
  scale: 0.9,
  opacity: 0.4,
  ease: "none",
  scrollTrigger: { trigger: ".hero-text", start: "top top", end: "bottom top", scrub: true }
});
```

## Optional: cursor-reactive letter weight (variable font hero, high-craft option)

If the loaded font is a variable font, swap the static title for the proximity-reactive letters pattern from `text-motion-typography` skill section 4 — gives a premium "font breathes near your cursor" feel without extra JS libraries.

## Notes for the agent

- Always run splitting/animation after `document.fonts.ready` to avoid layout jump from fallback-font metrics — critical here since font size is huge (clamp up to 6rem) and any reflow is very visible.
- Keep `.line-mask` `overflow: hidden` — this is what makes the reveal look like a masked wipe rather than a plain fade-up.
- Provide `aria-label` with the full plain-text headline on the outer `<h1>` and `aria-hidden="true"` on the inner spans for screen readers.
