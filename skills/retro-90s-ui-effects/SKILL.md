---
name: ui:retro-90s
description: Build 90s/early-web retro UI aesthetics and effects — CRT scanline overlays, glitch/VHS text distortion, marquee scrolling text, blinking elements, pixelated/bitmap styling, chunky beveled buttons, and neon/vaporwave color treatments. Use whenever the user asks for "90s style", "retro website", "vaporwave", "CRT effect", "glitch text", "old-school web", "Windows 95/98 style", or "nostalgic UI".
---

# 90s Retro UI Effects

## 1. CRT scanline + screen-curvature overlay (the signature "old monitor" look)

```css
.crt-overlay {
  position: fixed; inset: 0; pointer-events: none; z-index: 9998;
  background: repeating-linear-gradient(
    to bottom,
    rgba(0,0,0,0.15) 0px,
    rgba(0,0,0,0.15) 1px,
    transparent 2px,
    transparent 3px
  );
  mix-blend-mode: overlay;
}
.crt-flicker { animation: flicker 6s infinite; }
@keyframes flicker {
  0%, 96%, 100% { opacity: 1; }
  97% { opacity: 0.86; }
  98% { opacity: 1; }
  99% { opacity: 0.92; }
}
```
Add subtle screen curvature with `border-radius` + `box-shadow: inset 0 0 120px rgba(0,0,0,0.5)` on the outer viewport wrapper for a rounded-CRT vignette.

## 2. Glitch text (RGB-split distortion — classic VHS/hacker aesthetic)

```html
<h1 class="glitch" data-text="SYSTEM ERROR">SYSTEM ERROR</h1>
```
```css
.glitch { position: relative; color: #fff; font-family: monospace; }
.glitch::before, .glitch::after {
  content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; overflow: hidden;
}
.glitch::before { color: #ff004f; left: 2px; animation: glitch-anim 2.5s infinite linear alternate-reverse; }
.glitch::after { color: #00fff9; left: -2px; animation: glitch-anim2 2.5s infinite linear alternate-reverse; }
@keyframes glitch-anim {
  0% { clip-path: inset(10% 0 85% 0); } 20% { clip-path: inset(60% 0 5% 0); }
  40% { clip-path: inset(30% 0 40% 0); } 60% { clip-path: inset(80% 0 2% 0); }
  80% { clip-path: inset(5% 0 70% 0); } 100% { clip-path: inset(45% 0 30% 0); }
}
@keyframes glitch-anim2 {
  0% { clip-path: inset(70% 0 10% 0); } 25% { clip-path: inset(10% 0 60% 0); }
  50% { clip-path: inset(50% 0 20% 0); } 75% { clip-path: inset(20% 0 50% 0); } 100% { clip-path: inset(65% 0 5% 0); }
}
```
For an on-hover-only glitch burst instead of infinite looping, trigger a short GSAP timeline on `mouseenter` that rapidly randomizes `clip-path`/`skew` a few times over ~300ms, then resets.

## 3. Marquee scrolling text (the most iconic 90s HTML element, rebuilt in modern CSS)

```html
<div class="marquee"><div class="marquee-track">★ NEW ★ WELCOME TO MY HOMEPAGE ★ UNDER CONSTRUCTION ★ SIGN MY GUESTBOOK ★</div></div>
```
```css
.marquee { overflow: hidden; white-space: nowrap; width: 100%; }
.marquee-track { display: inline-block; padding-left: 100%; animation: marquee 12s linear infinite; }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } }
```
(Never use the deprecated `<marquee>` HTML tag itself — it's non-standard and inaccessible; this CSS version reproduces the look correctly.)

## 4. Chunky beveled "Windows 95" button

```css
.win95-btn {
  background: #c0c0c0; border: 2px solid; padding: 6px 16px; font-family: "MS Sans Serif", Tahoma, sans-serif;
  border-color: #fff #808080 #808080 #fff; box-shadow: inset 1px 1px 0 #dfdfdf;
  font-size: 14px; color: #000;
}
.win95-btn:active { border-color: #808080 #fff #fff #808080; }
```

## 5. Pixelated / bitmap image rendering

```css
.pixel-art { image-rendering: pixelated; image-rendering: crisp-edges; }
```
Pair with a pixel/bitmap web font (e.g. "Press Start 2P" from Google Fonts) for headings to complete the look.

## 6. Vaporwave gradient background + grid horizon (sunset-grid aesthetic)

```css
.vaporwave-bg {
  background: linear-gradient(180deg, #2b0d5e 0%, #ff2d95 50%, #ff9d5c 100%);
  position: relative; overflow: hidden;
}
.vaporwave-bg::after {
  content: ""; position: absolute; bottom: 0; left: -50%; width: 200%; height: 50%;
  background-image: linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px);
  background-size: 40px 40px;
  transform: perspective(200px) rotateX(60deg);
  transform-origin: bottom;
}
```

## 7. Blinking "under construction" badge (peak 90s)

```css
.blink { animation: blink-text 1s step-start infinite; }
@keyframes blink-text { 50% { opacity: 0; } }
```
Use sparingly and never for large text blocks — it's charmingly obnoxious in small doses, genuinely unreadable at scale, and can trigger seizure sensitivity in rapid/large-area implementations, so keep blink rate ≥1s and elements small.

## Critical correctness rules

1. Never use the actual deprecated `<marquee>` or `<blink>` HTML tags — recreate their look with CSS animations as shown, since the tags themselves are removed/unsupported in modern accessibility trees.
2. Respect `prefers-reduced-motion` for glitch/flicker/blink effects — wrap the relevant `animation` in `@media (prefers-reduced-motion: no-preference) { ... }` so sensitive users get a static (still retro-styled) fallback.
3. Pixelated bitmap fonts at small sizes hurt legibility — reserve them for large display headings, not body copy.
