---
name: ui:accordion-faq
description: Build an FAQ section with smoothly animated accordion expand/collapse (real height measurement, not fixed max-height hacks), a rotating plus/chevron icon, and staggered scroll entrance. Use whenever the user wants an "FAQ section", "accordion", "expandable list", or "collapsible questions".
---

# Smooth Accordion FAQ Section

## Structure

```html
<section class="faq">
  <div class="faq-item reveal">
    <button class="faq-question" aria-expanded="false">
      <span>Do you offer ongoing support after launch?</span>
      <span class="faq-icon">+</span>
    </button>
    <div class="faq-answer">
      <p class="faq-answer-inner">Yes — every project includes 30 days of post-launch support, and ongoing retainers are available after that.</p>
    </div>
  </div>
  <!-- repeat .faq-item -->
</section>
```
```css
.faq-answer { height: 0; overflow: hidden; }
.faq-icon { display: inline-block; transition: none; } /* rotation handled by GSAP for easing control */
```

## Accurate height animation (measures real content height — never hardcode a max-height guess)

```js
document.querySelectorAll(".faq-item").forEach(item => {
  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  const inner = item.querySelector(".faq-answer-inner");
  const icon = item.querySelector(".faq-icon");

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    // close any other open item first (classic single-open accordion behavior)
    document.querySelectorAll(".faq-question[aria-expanded='true']").forEach(other => {
      if (other !== button) other.click();
    });

    if (!isOpen) {
      const targetHeight = inner.offsetHeight;
      gsap.to(answer, { height: targetHeight, duration: 0.5, ease: "power3.inOut", onComplete: () => answer.style.height = "auto" });
      gsap.to(icon, { rotate: 45, duration: 0.3, ease: "power2.out" });
      button.setAttribute("aria-expanded", "true");
    } else {
      gsap.to(answer, { height: 0, duration: 0.4, ease: "power3.inOut" });
      gsap.to(icon, { rotate: 0, duration: 0.3, ease: "power2.out" });
      button.setAttribute("aria-expanded", "false");
    }
  });
});
```
Setting `answer.style.height = "auto"` in `onComplete` (open state) is important — it lets the answer reflow correctly if window resizes or content changes while open, since a fixed pixel height would clip it.

## Staggered scroll entrance

```js
gsap.from(".faq-item", {
  y: 24, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power3.out",
  scrollTrigger: { trigger: ".faq", start: "top 85%" }
});
```

## Notes for the agent

- Never animate `max-height` to an arbitrary large fixed value (a common shortcut) — it either cuts off long answers or creates unnaturally slow/fast animation depending on content length; always measure `offsetHeight` as shown.
- Keep `aria-expanded` in sync with actual visual state for accessibility, and make the whole question row a `<button>` (not a `<div>` with a click handler) for keyboard/screen-reader operability.
- The "close others when one opens" behavior is optional — remove the `document.querySelectorAll(...).forEach(...)` block if the user wants multiple FAQ items open simultaneously instead.
