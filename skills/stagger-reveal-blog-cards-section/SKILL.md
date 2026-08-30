---
name: ui:stagger-blog-cards
description: Build a blog/article listing section with staggered scroll-triggered card entrances, image zoom-on-hover, animated read-time/category tags, and optional filterable category tabs with a GSAP FLIP-style layout transition. Use whenever the user wants a "blog section", "articles grid", "news section", or "insights listing".
---

# Blog Cards Section — Stagger Reveal + Filterable Grid

## Structure

```html
<section class="blog">
  <div class="blog-filters">
    <button class="filter-tab active" data-cat="all">All</button>
    <button class="filter-tab" data-cat="design">Design</button>
    <button class="filter-tab" data-cat="engineering">Engineering</button>
  </div>
  <div class="blog-grid">
    <article class="blog-card reveal" data-cat="design">
      <div class="blog-img"><img src="post-1.jpg" alt=""></div>
      <span class="blog-tag">Design</span>
      <h3>Why most rebrands fail in the first year</h3>
      <p class="blog-meta">6 min read</p>
    </article>
    <!-- repeat .blog-card -->
  </div>
</section>
```
```css
.blog-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; }
.blog-img { overflow: hidden; border-radius: 12px; aspect-ratio: 4/3; }
.blog-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.blog-card:hover .blog-img img { transform: scale(1.08); }
```

## Staggered scroll entrance

```js
gsap.from(".blog-card", {
  y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
  scrollTrigger: { trigger: ".blog-grid", start: "top 80%" }
});
```

## Filter tabs with FLIP-style reflow (cards animate to their new position instead of snapping)

```js
document.querySelectorAll(".filter-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    const cat = tab.dataset.cat;
    const cards = gsap.utils.toArray(".blog-card");

    // FLIP: record First position
    const first = cards.map(c => c.getBoundingClientRect());

    cards.forEach(c => { c.style.display = (cat === "all" || c.dataset.cat === cat) ? "" : "none"; });

    // Last position, then invert + play
    cards.forEach((c, i) => {
      if (c.style.display === "none") return;
      const last = c.getBoundingClientRect();
      const deltaX = first[i].left - last.left;
      const deltaY = first[i].top - last.top;
      gsap.fromTo(c, { x: deltaX, y: deltaY }, { x: 0, y: 0, duration: 0.5, ease: "power3.out" });
    });
  });
});
```
This is the manual FLIP technique (First-Last-Invert-Play) — GSAP has an official `Flip` plugin that does this more robustly for complex grids (handling size changes too, not just position); use `gsap.registerPlugin(Flip)` and `Flip.getState()`/`Flip.from()` instead of the manual version above if the project already includes the Flip plugin.

## Notes for the agent

- Filtering by simply hiding non-matching cards (`display: none`) is fine for small grids; for large lists (50+ posts) paginate or virtualize instead of animating all DOM nodes at once.
- Keep the image zoom-on-hover as a plain CSS `transition` (shown above) rather than GSAP — it's simple enough that GSAP adds no benefit and CSS handles it more cheaply.
- Always re-run `ScrollTrigger.refresh()` after filtering changes the grid's height, or later sections' scroll triggers can desync.
