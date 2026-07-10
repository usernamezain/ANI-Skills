# Custom Monochromatic Inertial Cursor Reference

This document provides the structure, styles, and animation mechanics to implement a custom dual-element cursor with inertia (lag).

---

## 1. DOM Structure (HTML)
Insert these helper divs immediately inside the `<body>` tag:

```html
<!-- Custom Cursor Elements -->
<div class="custom-cursor"></div>
<div class="custom-cursor-follower"></div>
```

---

## 2. Style System (CSS Setup)
Add this to your stylesheet. Make sure custom cursors are hidden on touch screens via media queries:

```css
:root {
    --cursor-size: 8px;
    --cursor-follower-size: 30px;
    --text-white: #ffffff;
    --bg-black: #000000;
}

/* Hide default cursor globally */
* {
    cursor: none !important;
}

/* Inner Dot (Instant movement) */
.custom-cursor {
    width: var(--cursor-size);
    height: var(--cursor-size);
    background-color: var(--text-white);
    border-radius: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    pointer-events: none; /* Crucial: clicks must pass through */
    z-index: 9999;
    transition: width 0.2s, height 0.2s, background-color 0.2s;
}

/* Outer Ring (Lerp inertial movement) */
.custom-cursor-follower {
    width: var(--cursor-follower-size);
    height: var(--cursor-follower-size);
    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.08s ease-out, width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s;
}

/* Link/Button Hover State (Expanded ring, hidden dot) */
body.hovering-link .custom-cursor {
    width: 0;
    height: 0;
}

body.hovering-link .custom-cursor-follower {
    width: 45px;
    height: 45px;
    background-color: rgba(255, 255, 255, 0.08);
    border-color: var(--text-white);
}

/* Disable on mobile touch screens */
@media (max-width: 1024px) {
    .custom-cursor,
    .custom-cursor-follower {
        display: none !important;
    }
    * {
        cursor: auto !important;
    }
}
```

---

## 3. Motion Interpolation (JavaScript)

Apply a linear interpolation (`lerp`) factor to create smooth movement lag:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    function animateCursor() {
        // Lerp equation: current += (target - current) * lerpFactor
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;

        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state bindings for interactive elements
    const hoverSelectors = 'a, button, .btn, input, textarea, select, spline-viewer';
    const interactiveElements = document.querySelectorAll(hoverSelectors);
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering-link');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering-link');
        });
    });
});
```
