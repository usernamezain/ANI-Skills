---
name: ui:video-hero
description: Build a full-bleed video background hero section with a dark gradient overlay for text legibility, lazy/deferred video loading for performance, a mute/unmute control, and scroll-scrubbed fade-out. Use whenever the user wants a "video hero", "video background section", "autoplay video header", or "hero with background video".
---

# Video Background Hero Section

## Structure

```html
<section class="video-hero">
  <video class="video-hero-bg" autoplay muted loop playsinline poster="poster.jpg">
    <source src="hero-loop.mp4" type="video/mp4">
  </video>
  <div class="video-hero-overlay"></div>
  <div class="video-hero-copy">
    <h1 class="reveal">Motion is the message.</h1>
    <button class="mute-toggle" aria-label="Unmute video">🔇</button>
  </div>
</section>
```
```css
.video-hero { position: relative; height: 100vh; overflow: hidden; }
.video-hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.video-hero-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.3), rgba(0,0,0,0.7)); }
.video-hero-copy { position: relative; z-index: 2; height: 100%; display: flex; align-items: center; justify-content: center; }
```

## Required autoplay attributes (browsers block autoplay without these — this is not optional)

`autoplay muted loop playsinline` must all be present for the video to autoplay in Chrome/Safari/mobile browsers; a video with sound cannot autoplay, which is why mute + a visible unmute toggle is the standard pattern, not a workaround.

## Entrance + mute toggle

```js
gsap.from(".video-hero-copy h1", { y: 40, opacity: 0, duration: 1, ease: "power4.out", delay: 0.3 });

const video = document.querySelector(".video-hero-bg");
const muteBtn = document.querySelector(".mute-toggle");
muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "🔇" : "🔊";
  muteBtn.setAttribute("aria-label", video.muted ? "Unmute video" : "Mute video");
});
```

## Scroll-scrubbed fade/darken as user scrolls past (video dims rather than abruptly cutting)

```js
gsap.to(".video-hero-overlay", {
  opacity: 1, ease: "none",
  scrollTrigger: { trigger: ".video-hero", start: "top top", end: "bottom top", scrub: true }
});
gsap.to(".video-hero-bg", {
  scale: 1.1, ease: "none",
  scrollTrigger: { trigger: ".video-hero", start: "top top", end: "bottom top", scrub: true }
});
```

## Pause video when off-screen (saves CPU/battery — important since this is a heavier asset than an image hero)

```js
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { entry.isIntersecting ? video.play() : video.pause(); });
}, { threshold: 0.1 });
observer.observe(video);
```

## Notes for the agent

- Always include `poster="poster.jpg"` (a static frame) so there's an immediate visual on slow connections before the video buffers, and always compress the video aggressively (target well under 5MB for a hero loop; use `.mp4` H.264 for broad compatibility, `.webm` as a lighter second `<source>` if the build pipeline supports it).
- Never autoplay video *with sound* — it's blocked by every major browser and is also a poor user-experience default; always start `muted` with an explicit opt-in unmute control.
- Respect `prefers-reduced-motion`: consider swapping to the static `poster` image (pause the video, hide play state) for users with that preference set.
