---
name: ticker-banner-designer
description: Skill for designing infinite horizontal marquee text banners.
---

# Ticker Banner Designer Skill

## Overview
This skill provides instructions on how to create, style, and animate high-performance, infinite horizontal typography ticker banners that loop seamlessly across the viewport.

## HTML Structure
Create a container with a track and double nested content wrappers to allow seamless wrapping:
```html
<div class="ticker-banner">
    <div class="ticker-track">
        <div class="ticker-content">
            <span>TEXT ITEM 1</span> <span class="ticker-star">★</span>
            <span>TEXT ITEM 2</span> <span class="ticker-star">★</span>
        </div>
        <!-- Duplicate content block for seamless looping -->
        <div class="ticker-content">
            <span>TEXT ITEM 1</span> <span class="ticker-star">★</span>
            <span>TEXT ITEM 2</span> <span class="ticker-star">★</span>
        </div>
    </div>
</div>
```

## CSS Styling
Use flexbox, hardware acceleration (`transform: translate3d`), and keyframe animations:
```css
.ticker-banner {
    width: 100%;
    overflow: hidden;
    background-color: var(--bg-black);
    border-top: 1px solid var(--border-gray);
    border-bottom: 1px solid var(--border-gray);
    padding: 1.5rem 0;
}

.ticker-track {
    display: flex;
    width: max-content;
}

.ticker-content {
    display: flex;
    align-items: center;
    gap: 3rem;
    padding-right: 3rem; /* Match gap to prevent stutter */
    animation: ticker-slide 25s linear infinite;
    will-change: transform;
}

@keyframes ticker-slide {
    0% { transform: translate3d(0, 0, 0); }
    100% { transform: translate3d(-100%, 0, 0); }
}
```

## Performance Tips
- Use `will-change: transform` to promote elements to the GPU.
- Ensure the track has twice the content width and the second block is identical.
- Set linear animation pacing.
