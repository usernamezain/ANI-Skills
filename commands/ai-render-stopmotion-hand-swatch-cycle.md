# ai:render-stopmotion-hand-swatch-cycle

Assemble a stop-motion hand-swatch-cycle product-demo ad from a config — a sequence of still PLATES (one hand swiping a single-barrel cosmetic across a cream skin-patch, the barrel + swatch changing per plate while the hand, background, crop, and lighting stay locked) is PNG→mp4 loop-encoded at each plate's own stop-motion hold (fast motion frames 150–250ms, per-shade ~380ms, hero beats 1100–1800ms), concat-demuxed with HARD cuts into a silent master, closed on a Playwright HTML-rendered branded end card (serif tagline + sans subtitle + real logo SVG over a hero BG, never AI-rendered text), and muxed with a pre-sourced music track playing under the end card with a fade tail (no VO). This is the FREE deterministic assembly stage (loop-encode + concat-demux + end-card render + music mux); the master-anchor plate, shade plates, and end-card BG come from create-image-gpt-image-fal and the track from create-music-elevenlabs. Use for the stopmotion-hand-swatch-cycle format.

**Skill folder:** `skills/goose-skills-render-stopmotion-hand-swatch-cycle/`
**Namespace:** `ai`
