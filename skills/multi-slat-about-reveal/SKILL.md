---
name: ui:slat-about-reveal
description: Skill for designing scroll-pinned multi-slat reveals with alternating layers.
---

# Multi-Slat About Reveal Skill

## Overview
This skill details how to design and build scroll-pinned reveals using multiple alternating (white/black) overlay slats. The section pins to the viewport, peels the layers away in a staggered timeline on scroll, reveals the content, and then unpins.

## HTML Structure
```html
<section id="about" class="section about-section">
    <!-- Alternating Color Slat Layers -->
    <div class="about-reveal-layer layer-1 bg-white"></div>
    <div class="about-reveal-layer layer-2 bg-black"></div>
    <div class="about-reveal-layer layer-3 bg-white"></div>
    <div class="about-reveal-layer layer-4 bg-black"></div>
    <div class="about-reveal-layer layer-5 bg-white"></div>
    <div class="about-reveal-layer layer-6 bg-black"></div>
    <div class="about-reveal-layer layer-7 bg-white"></div>

    <div class="container about-content-container">
        <!-- Main Section Content -->
    </div>
</section>
```

## CSS Setup
Position slats absolute over the section with high z-indices:
```css
.about-section {
    position: relative;
    overflow: hidden;
}

.about-reveal-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    pointer-events: none;
}

.about-reveal-layer.bg-white { background-color: #ffffff; }
.about-reveal-layer.bg-black { background-color: #000000; }

.about-content-container {
    position: relative;
    z-index: 10;
}
```

## GSAP Pinning and Revealing
Create a pinned scrub timeline that sweeps the slats away:
```javascript
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '#about',
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: true
    }
});

tl.to('.about-reveal-layer', {
    xPercent: (index) => index % 2 === 0 ? -100 : 100, // alternate left/right slide
    stagger: 0.1,
    ease: 'power2.inOut'
})
.from('.about-content-container', {
    opacity: 0,
    scale: 0.95,
    duration: 0.5,
    ease: 'power1.out'
}, "-=0.3");
```
