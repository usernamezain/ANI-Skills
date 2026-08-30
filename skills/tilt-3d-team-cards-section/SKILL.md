---
name: ui:tilt-3d-cards
description: Build a team/people section with 3D tilt-on-hover photo cards, a name/role reveal that slides up on hover, and a staggered scroll entrance. Use whenever the user wants a "team section", "our team", "people grid", "meet the team", or "staff directory" with more polish than plain photo grids.
---

# Team Section — Tilt Cards with Slide-Up Info

## Structure

```html
<section class="team">
  <div class="team-card tilt-card reveal">
    <div class="team-photo"><img src="person-1.jpg" alt="Alex Rivera"></div>
    <div class="team-info">
      <h4>Alex Rivera</h4>
      <p>Creative Director</p>
    </div>
  </div>
  <!-- repeat .team-card -->
</section>
```
```css
.team { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
.team-card { position: relative; overflow: hidden; border-radius: 16px; transform-style: preserve-3d; aspect-ratio: 3/4; }
.team-photo img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.team-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; transform: translateY(60%); background: linear-gradient(to top, rgba(0,0,0,0.85), transparent); }
.team-info p { opacity: 0; }
```

## Tilt + photo zoom + info slide-up, combined on one hover

```js
document.querySelectorAll(".team-card").forEach(card => {
  const img = card.querySelector(".team-photo img");
  const info = card.querySelector(".team-info");

  card.addEventListener("mousemove", e => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    gsap.to(card, { rotateY: (px - 0.5) * 10, rotateX: (0.5 - py) * 10, transformPerspective: 800, duration: 0.4, ease: "power2.out" });
  });
  card.addEventListener("mouseenter", () => {
    gsap.to(img, { scale: 1.08, duration: 0.6, ease: "power3.out" });
    gsap.to(info, { y: "0%", duration: 0.4, ease: "power3.out" });
    gsap.to(info.querySelector("p"), { opacity: 1, duration: 0.4, delay: 0.1 });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power3.out" });
    gsap.to(img, { scale: 1, duration: 0.6, ease: "power3.out" });
    gsap.to(info, { y: "60%", duration: 0.4, ease: "power3.in" });
    gsap.to(info.querySelector("p"), { opacity: 0, duration: 0.2 });
  });
});
```

## Staggered scroll entrance

```js
gsap.from(".team-card", {
  y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
  scrollTrigger: { trigger: ".team", start: "top 80%" }
});
```

## Notes for the agent

- On touch devices, skip the tilt/mousemove listener (per the touch guard convention in `custom-cursor-effects`) but keep the info panel visible by default or toggle it on tap, since hover has no touch equivalent.
- Keep the `translateY(60%)` resting position tuned so the name is always visible and only the role/description slides fully into view on hover — don't hide the name entirely at rest.
- Use `object-position` on `.team-photo img` if headshots are inconsistently framed, so the zoom-on-hover doesn't crop faces oddly.
