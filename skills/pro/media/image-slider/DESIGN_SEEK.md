# Design Seek: Image Slider (WebGL + GSAP)

## Visual Language
- **Vibe:** Editorial Luxury, High-End Fashion Showcase, Cinematic Gallery, Refined Interactive
- **Color Palette:** Dominated by slide photography. Contrast base uses deep charcoal/black overlays. Accent text is cream/white (`#ffffff`, `#f5f5f5`) or custom colors (e.g., green/yellow danger status).
- **Textures:** Liquid displacement warp overlay. Image transitions look like paint/liquid melting vertically to reveal the next slide.
- **Typography:** Elegant high-contrast serif font (e.g., *Playfair Display*, *Bodoni*) for large titles, paired with a clean, tracking-spaced geometric sans-serif (e.g., *Montserrat*, *Inter*) for subtitles and numeric pagination.

## Key Interactions & Physics

1. **Warp Displacement Transition Shader:**
   - Instead of a generic fade, transitions warp pixel mappings vertically using color data from the incoming image:
     - `intensity = 0.6`
     - `_currentImage = texture2D(currentImage, vec2(uv.x, uv.y + dispFactor * (orig2 * intensity)))`
     - `_nextImage = texture2D(nextImage, vec2(uv.x, uv.y + (1.0 - dispFactor) * (orig1 * intensity)))`
     - `gl_FragColor = mix(_currentImage, _nextImage, dispFactor)`
   - This causes pixels to drag and warp proportional to the next image's local color values.

2. **Choreographed GSAP Timeline:**
   - WebGL transitions and DOM typography states are bound to a single GSAP timeline:
     - Interpolates the `dispFactor` uniform from `0.0` to `1.0` (duration `1.6s`, ease `power2.inOut`).
     - Simultaneously translates and fades out old title text: `y: -50`, `opacity: 0`, `duration: 0.8s`.
     - Staggers in the next title text: `y: [50, 0]`, `opacity: [0, 1]`, `duration: 1.0s`, `delay: 0.4s`.
   - This ensures the text changes at the exact moment of highest image distortion.

3. **Multi-mode Navigation Inputs:**
   - Vertical list pagination triggers direct slide indexes.
   - Next/Previous button clicks.
   - Optional timer-based autoPlay ticks with slide wrapping.

## Color System

| UI Element          | Style / Tailwind Equivalent     |
|---------------------|---------------------------------|
| Slider Background   | `bg-zinc-950` (#09090b)         |
| Main Heading Text   | Serif, `text-white font-serif`  |
| Subtitle Status     | Sans-serif, uppercase, `text-xs`|
| Navigation Bullets  | `w-2 h-2 rounded-full bg-white` |
| Active Page Line    | `w-6 h-[1px] bg-white`          |
