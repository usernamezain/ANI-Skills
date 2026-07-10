---
name: morph-newsletter-signup-section
description: Build a newsletter signup section where the input/button morph into a confirmation checkmark state on successful submit, with an inline shake for invalid email and a subtle floating background shape. Use whenever the user wants a "newsletter section", "email signup", "subscribe section", or "mailing list form".
---

# Morph Newsletter Signup Section

## Structure

```html
<section class="newsletter">
  <div class="newsletter-shape"></div>
  <h2 class="reveal">Get occasional notes on design and craft.</h2>
  <form class="newsletter-form" id="newsletterForm">
    <input type="email" id="newsletterEmail" placeholder="you@email.com" required>
    <button type="submit" class="newsletter-submit">
      <span class="btn-label">Subscribe</span>
      <svg class="btn-check" viewBox="0 0 24 24"><path d="M4 12l5 5L20 6" fill="none" stroke="currentColor" stroke-width="2"/></svg>
    </button>
  </form>
</section>
```
```css
.newsletter { position: relative; text-align: center; padding: 10vh 6vw; overflow: hidden; }
.newsletter-shape { position: absolute; top: -20%; right: -10%; width: 40vw; height: 40vw; border-radius: 50%; background: radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%); filter: blur(40px); }
.newsletter-form { display: inline-flex; gap: 0; border: 1px solid rgba(255,255,255,0.3); border-radius: 999px; overflow: hidden; }
.newsletter-form input { background: none; border: none; padding: 14px 20px; color: #fff; min-width: 260px; }
.newsletter-submit { position: relative; background: #fff; color: #000; padding: 14px 28px; border: none; font-weight: 600; overflow: hidden; }
.btn-check { position: absolute; inset: 0; margin: auto; width: 18px; height: 18px; opacity: 0; }
```

## Floating background shape (ambient motion, matches the magnetic-cta-section glow-drift pattern)

```js
gsap.to(".newsletter-shape", { y: 30, x: -20, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
```

## Submit → morph to checkmark state

```js
document.getElementById("newsletterForm").addEventListener("submit", e => {
  e.preventDefault();
  const input = document.getElementById("newsletterEmail");
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);

  if (!isValidEmail) {
    gsap.fromTo(input, { x: -6 }, { x: 0, duration: 0.4, ease: "elastic.out(1.5, 0.3)" });
    input.style.borderColor = "#ff5c5c";
    return;
  }

  // actual subscribe API call goes here — await it before/alongside the success animation

  const tl = gsap.timeline();
  tl.to(".btn-label", { opacity: 0, duration: 0.2 })
    .to(".newsletter-submit", { width: 52, paddingLeft: 0, paddingRight: 0, duration: 0.35, ease: "power3.inOut" }, "<0.05")
    .to(".btn-check", { opacity: 1, duration: 0.3 }, "-=0.1")
    .to(input, { opacity: 0.4, pointerEvents: "none", duration: 0.3 }, "<");
});
```

## Notes for the agent

- The `.newsletter-submit` width collapse to a circular checkmark button (`width: 52`, no horizontal padding) only looks right if the button's `border-radius` is already fully rounded (999px) — verify that in the base CSS.
- Wire the real newsletter API call (Mailchimp/ConvertKit/custom backend) in the space marked in the submit handler — the animation is presentational only and must not be treated as confirmation that the subscription actually succeeded; ideally gate the success morph on the API call's resolved promise, not fire it optimistically before the request completes.
- Keep the shake on invalid input consistent with the same technique used in `floating-label-contact-form-section` for visual consistency if both sections appear on the same page.
