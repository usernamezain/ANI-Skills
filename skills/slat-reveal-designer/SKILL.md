---
name: slat-reveal-designer
description: Skill for designing staggered reveal overlay slat animations.
---

# Slat Reveal Designer Skill

## Overview
This skill describes how to design and build overlay slat reveals (using multiple stacked layers) that peel away in a staggered timeline when scrolling to reveal project cards or grids underneath.

## HTML Structure
A container housing the background reveal layers (slats) and the content container:
```html
<div class="project-reveal-container">
    <!-- Overlay Slat Layers -->
    <div class="reveal-layer layer-1"></div>
    <div class="reveal-layer layer-2"></div>
    <div class="reveal-layer layer-3"></div>
    <div class="reveal-layer layer-4"></div>
    <div class="reveal-layer layer-5"></div>
    
    <!-- Revealed Content -->
    <div class="projects-content-wrapper">
        <!-- Cards here -->
    </div>
</div>
```

## CSS Setup
Position layers absolutely on top of the content:
```css
.project-reveal-container {
    position: relative;
    overflow: hidden;
}

.reveal-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: #ffffff;
    pointer-events: none;
}

/* Stagger layer heights or horizontal sections if clipping */
.reveal-layer.layer-1 { clip-path: inset(0 0 80% 0); }
.reveal-layer.layer-2 { clip-path: inset(20% 0 60% 0); }
.reveal-layer.layer-3 { clip-path: inset(40% 0 40% 0); }
.reveal-layer.layer-4 { clip-path: inset(60% 0 20% 0); }
.reveal-layer.layer-5 { clip-path: inset(80% 0 0 0); }
```

## GSAP Integration
Scrub-reveal the slats on scroll:
```javascript
gsap.timeline({
    scrollTrigger: {
        trigger: '.project-reveal-container',
        start: 'top 75%',
        end: 'top 25%',
        scrub: true
    }
})
.to('.reveal-layer', {
    xPercent: (i) => i % 2 === 0 ? -100 : 100, // alternate left/right slide
    stagger: 0.08,
    ease: 'power2.inOut'
});
```
