---
name: ui:text-motion
description: Animate text and typography — interactive/variable fonts that react to hover or mouse position, character/word/line stagger reveals, animated counters, typewriter effects, and text loading animations. Use whenever the user asks for "text animation", "interactive font", "animated headline", "text reveal", "typewriter", "split text", "counter animation", or "text loading". Covers both GSAP SplitText-style and dependency-free approaches.
---

# Text Motion & Interactive Typography

## 1. Split text into characters/words (no plugin — works everywhere)

```js
function splitText(el, mode = "chars") {
  const source = el.textContent;
  el.textContent = "";
  const units = mode === "chars" ? source.split("") : source.split(" ");
  return units.map(unit => {
    const span = document.createElement("span");
    span.textContent = unit === " " ? "\u00A0" : unit;
    span.style.display = "inline-block";
    el.appendChild(span);
    if (mode === "words") el.appendChild(document.createTextNode(" "));
    return span;
  });
}
```

## 2. Character stagger reveal (GSAP)

```js
const chars = splitText(document.querySelector(".headline"), "chars");
gsap.from(chars, {
  yPercent: 120,
  opacity: 0,
  duration: 0.8,
  ease: "power4.out",
  stagger: 0.02
});
```
For scroll-triggered version, wrap in the pattern from `gsap-scrolltrigger-effects` skill (`scrollTrigger: { trigger: el, start: "top 85%" }`).

## 3. Same effect with anime.js

```js
const chars = splitText(document.querySelector(".headline"), "chars");
anime({
  targets: chars,
  translateY: [40, 0],
  opacity: [0, 1],
  easing: "easeOutExpo",
  duration: 900,
  delay: anime.stagger(25)
});
```
CDN: `<script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js"></script>`

## 4. Interactive font — weight/width reacts to mouse proximity (real variable fonts)

Requires a variable font with a `wght` (and ideally `wdth`) axis, e.g. self-hosted `Inter-Variable.woff2` or Google Fonts variable endpoint.
```css
.reactive-text { font-variation-settings: "wght" 400; transition: font-variation-settings 0.15s ease-out; }
```
```js
const letters = splitText(document.querySelector(".reactive-text"), "chars");
document.addEventListener("mousemove", e => {
  letters.forEach(letter => {
    const r = letter.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    const weight = Math.max(100, 900 - dist * 4); // closer cursor = heavier weight
    letter.style.fontVariationSettings = `"wght" ${weight}`;
  });
});
```
This is throttled implicitly by `mousemove` frequency; for many letters, throttle with `requestAnimationFrame` batching (see `buttery-smooth-120fps-performance` skill) to avoid layout thrash — read `getBoundingClientRect` once per letter outside the loop when the layout is static, or cache rects on resize instead of every mousemove.

## 5. Typewriter effect (dependency-free)

```js
function typewriter(el, text, speed = 40) {
  el.textContent = "";
  let i = 0;
  (function tick() {
    if (i <= text.length) { el.textContent = text.slice(0, i++); requestAnimationFrame(() => setTimeout(tick, speed)); }
  })();
}
```
Add a CSS blinking caret: `.typewriter::after { content: "|"; animation: blink 1s step-end infinite; } @keyframes blink { 50% { opacity: 0; } }`

## 6. Animated number counter (great for stats sections)

```js
gsap.utils.toArray(".counter").forEach(el => {
  const target = +el.dataset.target;
  gsap.fromTo(el, { innerText: 0 }, {
    innerText: target,
    duration: 2,
    ease: "power1.out",
    snap: { innerText: 1 },
    scrollTrigger: { trigger: el, start: "top 85%" }
  });
});
```

## 7. Text loading / "shimmer decode" effect (Matrix-style scramble reveal — great for preloaders)

```js
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function scrambleReveal(el, finalText, duration = 1200) {
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const revealCount = Math.floor(progress * finalText.length);
    el.textContent = finalText.split("").map((ch, i) => {
      if (i < revealCount) return ch;
      if (ch === " ") return " ";
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join("");
    if (progress < 1) requestAnimationFrame(frame); else el.textContent = finalText;
  }
  requestAnimationFrame(frame);
}
```

## 8. Line-mask reveal (clip-path per line — clean, modern "each line slides up from a mask")

```css
.line-mask { overflow: hidden; }
.line-mask span { display: inline-block; will-change: transform; }
```
```js
document.querySelectorAll(".line-mask").forEach(line => {
  gsap.from(line.querySelector("span"), {
    yPercent: 100, duration: 0.9, ease: "power4.out",
    scrollTrigger: { trigger: line, start: "top 90%" }
  });
});
```
Wrap each `<span>` line individually in a parent with `overflow:hidden` in your HTML/templating step — this masking parent is what makes the reveal look like it's wiping up from behind a slit, not just fading in.

## Critical correctness rules

1. Never split text into individual characters for screen-reader content without adding `aria-label` with the full original string on the container and `aria-hidden="true"` on the split spans — otherwise screen readers announce garbled letter-by-letter text.
2. Re-run split-and-animate logic after web fonts load (`document.fonts.ready.then(...)`) or characters will be measured/positioned with fallback-font metrics and jump when the real font swaps in.
3. Debounce/recompute on resize for anything using `getBoundingClientRect` per letter (variable-font proximity effect).
