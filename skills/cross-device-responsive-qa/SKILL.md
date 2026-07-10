---
name: cross-device-responsive-qa
description: Systematically verify a site actually works across real devices, viewports, pointer types, and browsers — not just "looks fine in one browser window." Use after building any responsive or animated section, whenever the user asks to "test", "make sure it works everywhere", "check responsiveness", or reports something "breaks/looks wrong" on a specific device. This is a verification checklist skill, not a code-pattern skill.
---

# Cross-Device & Responsive QA Checklist

Animated, scroll-driven sites break in ways plain static sites don't — pinned sections that mis-measure, hover effects with no touch equivalent, smooth-scroll libraries fighting native scroll. This is the systematic pass to run before calling a build "done."

## 1. Viewport width sweep (not just 3 device presets)

Test at minimum: 320px (smallest common phone), 375px, 414px, 768px (tablet portrait), 1024px (tablet landscape / small laptop), 1440px, 1920px, and one ultra-wide (2560px+). Pay special attention to the *gaps between* standard breakpoints (e.g. 850px, 1150px) — fluid layouts (`fluid-responsive-layout-system` skill) should hold up here too; if something only looks right at exact preset widths, the layout isn't actually fluid.

## 2. Pointer/input type — the #1 source of "broken" interactions on real devices

- Every hover-only interaction (`custom-cursor-effects`, tilt cards, magnetic buttons) must have a graceful non-hover fallback on touch — verify with `(pointer: coarse)` guards, not just "it happens not to crash."
- Test actual touch scrolling on a real phone or device emulator with touch simulation on — trackpad/mouse-wheel scroll in a desktop browser does *not* reliably reproduce touch scroll physics, especially with Lenis or other scroll-hijacking libraries active.
- Verify tap targets are ≥44×44px (Apple HIG / WCAG guidance) — animated micro-buttons and icon-only controls are frequent offenders.

## 3. Scroll-driven animation specific checks

- Pinned sections (`gsap-scrolltrigger-effects`, `pinned-storytelling-about-section`, `horizontal-scroll-gallery-section`): confirm pin start/end positions are correct after page fully loads including fonts/images — a common bug is triggers measured before web fonts swap in, shifting all subsequent trigger positions.
- Resize the browser window live (don't just reload at a new size) and confirm `ScrollTrigger.refresh()` is actually wired to a resize/orientationchange listener — untested resize handling is the most common cause of "it broke when I resized."
- Test scrolling both directions (down, then back up) through every scrubbed/pinned section — reverse-scroll bugs (elements not un-animating cleanly) are common and easy to miss if you only ever test scrolling one direction.
- On iOS Safari specifically: test address-bar show/hide behavior during scroll — `100vh` sections (should be `dvh`, see `fluid-responsive-layout-system`) and pinned sections are the most likely to misbehave here.

## 4. Performance verification (not just visual correctness)

- Open DevTools Performance panel, record a scroll through the heaviest section (three.js background, horizontal gallery, pinned timeline), check for dropped frames / long tasks — per `buttery-smooth-120fps-performance`.
- Throttle to a mid-tier mobile CPU profile (DevTools → Performance → CPU throttling 4x–6x slowdown) — a site that's smooth on a dev machine can be genuinely janky on a real mid-range Android phone.
- Check Lighthouse mobile score specifically for Cumulative Layout Shift (CLS) — animated entrances that shift layout before triggering, or images without reserved `aspect-ratio`, are common CLS sources.

## 5. Browser matrix (minimum realistic coverage)

Chrome (desktop + Android), Safari (desktop + iOS — these are *not* the same engine behavior on animation/scroll edge cases), Firefox. Specifically re-check on Safari: `backdrop-filter` support/fallback, `position: sticky` inside transformed ancestors (a known Safari quirk), and `clip-path` animation smoothness.

## 6. Reduced-motion and accessibility pass

- Toggle `prefers-reduced-motion: reduce` in OS/DevTools and confirm ambient/ decorative motion (glow drifts, marquees, elastic overshoots) is actually reduced or removed, not just "still runs but slightly different" — see `animation-accessibility-performance-audit` skill for the full audit.
- Keyboard-only pass: Tab through interactive elements (nav, accordion, form, carousel) and confirm focus is visible and logically ordered — hover-triggered reveals (portfolio preview, team card info) need a keyboard/focus equivalent, not just `:hover`.

## Reporting format

When running this checklist, report findings as a pass/fail list per section, not a vague "looks good overall" — e.g.:
```
Hero (video-hero-section): PASS 320–2560px, PASS iOS Safari autoplay, FAIL — CLS 0.18 from unset video aspect-ratio
Work grid (portfolio-hover-reveal-grid-section): PASS desktop hover, FAIL touch — no tap fallback for preview image
```
This makes it clear exactly what still needs fixing rather than a general impression.

## Critical correctness rules

1. Never certify "responsive" based on resizing a desktop browser window alone — pointer type, real touch scroll physics, and mobile viewport units (`dvh` vs `vh`) genuinely differ from an emulated resize.
2. Always test the reverse-scroll direction on every scrubbed/pinned animation, not just forward.
3. Always test with realistic CPU/network throttling at least once — "smooth on my machine" is not the same claim as "smooth."
