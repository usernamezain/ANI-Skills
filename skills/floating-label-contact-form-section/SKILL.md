---
name: floating-label-contact-form-section
description: Build a contact form section with animated floating labels, focus-state underline draw-in, inline validation micro-shakes, and a success-state morph on submit. Use whenever the user wants a "contact form", "contact section", "get in touch form", or a form with more polish than default browser styling. Pairs with morph-mask-reveal-transitions for the submit success state.
---

# Floating-Label Contact Form Section

## Structure

```html
<section class="contact">
  <form class="contact-form" id="contactForm">
    <div class="field">
      <input type="text" id="name" required placeholder=" ">
      <label for="name">Your name</label>
      <span class="field-line"></span>
    </div>
    <div class="field">
      <input type="email" id="email" required placeholder=" ">
      <label for="email">Email address</label>
      <span class="field-line"></span>
    </div>
    <div class="field">
      <textarea id="message" required placeholder=" "></textarea>
      <label for="message">Your message</label>
      <span class="field-line"></span>
    </div>
    <button type="submit" class="magnetic">Send message</button>
  </form>
  <div class="form-success"><h3>Message sent.</h3><p>We'll reply within 24 hours.</p></div>
</section>
```
```css
.field { position: relative; margin-bottom: 28px; }
.field input, .field textarea { width: 100%; background: none; border: none; border-bottom: 1px solid rgba(255,255,255,0.3); padding: 12px 0; color: #fff; font-size: 1rem; }
.field label { position: absolute; top: 12px; left: 0; color: rgba(255,255,255,0.5); pointer-events: none; transition: transform 0.25s ease, color 0.25s ease; transform-origin: left; }
.field input:focus + label, .field input:not(:placeholder-shown) + label,
.field textarea:focus + label, .field textarea:not(:placeholder-shown) + label { transform: translateY(-20px) scale(0.8); color: #fff; }
.field-line { position: absolute; bottom: 0; left: 0; height: 2px; width: 0; background: #fff; }
```

## Underline draw-in on focus (GSAP, more control than a CSS transition alone)

```js
document.querySelectorAll(".field input, .field textarea").forEach(input => {
  const line = input.closest(".field").querySelector(".field-line");
  input.addEventListener("focus", () => gsap.to(line, { width: "100%", duration: 0.4, ease: "power3.out" }));
  input.addEventListener("blur", () => gsap.to(line, { width: "0%", duration: 0.3, ease: "power3.in" }));
});
```

## Invalid-field micro-shake (on failed submit)

```js
function shakeField(field) {
  gsap.fromTo(field, { x: -8 }, { x: 0, duration: 0.4, ease: "elastic.out(1.5, 0.3)" });
}
```

## Submit → success morph (form scales/fades out, success message scales in)

```js
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const invalid = [...e.target.querySelectorAll("[required]")].filter(f => !f.value.trim());
  if (invalid.length) { invalid.forEach(f => shakeField(f.closest(".field"))); return; }

  const tl = gsap.timeline();
  tl.to(".contact-form", { opacity: 0, scale: 0.96, duration: 0.4, ease: "power3.in" })
    .set(".contact-form", { display: "none" })
    .set(".form-success", { display: "block" })
    .from(".form-success", { opacity: 0, scale: 0.9, duration: 0.5, ease: "power3.out" });
  // actual form submission (fetch/XHR to backend) belongs here, before or in parallel with the animation
});
```

## Notes for the agent

- This client-side validation is a UX layer only — always keep real server-side validation and the actual submit (`fetch`/`XHR`) logic; don't let the animation timeline substitute for actually sending the data.
- `placeholder=" "` (a single space) is required for the `:not(:placeholder-shown)` CSS selector trick to detect "has content" without JavaScript — don't remove it.
- Wire the submit button up to the `custom-cursor-effects` magnetic-button pattern (already class-tagged `magnetic`) for a nice detail on the primary CTA.
