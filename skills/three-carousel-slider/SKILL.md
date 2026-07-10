---
name: three-carousel-slider
description: Skill for designing cylindrical 3D horizontal sliders.
---

# 3D Carousel Slider Skill

## Overview
This skill details how to design high-fidelity horizontal cards sliding on a virtual 3D cylinder. Cards automatically tilt inward and recede into depth as they slide away from the screen center.

## HTML Layout
```html
<div class="tech-slider-viewport">
    <div class="tech-slider-track">
        <div class="tech-card">Card 1</div>
        <div class="tech-card">Card 2</div>
    </div>
</div>
```

## CSS Setup
Set perspective on the viewport and enable 3D preservations:
```css
.tech-slider-viewport {
    width: 100%;
    overflow: hidden;
    perspective: 1500px;
}

.tech-slider-track {
    display: flex;
    transform-style: preserve-3d;
}

.tech-card {
    transform-style: preserve-3d;
    backface-visibility: hidden;
}
```

## Javascript Mathematics (Lag-Free)
Calculate positions without querying layouts in the scroll loop to prevent layout thrashing:
```javascript
let cachedScrollWidth = track.scrollWidth - window.innerWidth;
let cachedPaddingLeft = window.innerWidth * 0.42;
let cachedGap = 64;

gsap.timeline({
    scrollTrigger: {
        trigger: '#slider-section',
        pin: true,
        scrub: true,
        onUpdate: (self) => {
            const center = window.innerWidth / 2;
            const trackX = -self.progress * cachedScrollWidth;
            
            cards.forEach((card, i) => {
                const cardCenter = cachedPaddingLeft + i * (150 + cachedGap) + 75 + trackX;
                const distance = cardCenter - center;
                const ratio = Math.min(Math.abs(distance) / 450, 1);
                
                const rotY = (distance / 450) * -38;
                const transZ = (1 - ratio) * 120 - 120;
                const scale = 1.0 + (0.4 * (1 - ratio));
                
                card.style.transform = `translateZ(${transZ}px) rotateY(${rotY}deg) scale(${scale})`;
            });
        }
    }
});
```
