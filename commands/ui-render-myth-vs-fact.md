# ui:render-myth-vs-fact

Assemble a myth-vs-fact kinetic-typography explainer video ad (≈29.5s, 9:16) from N myth/fact pairs + hook / turn / punch copy + palette + a brand end-card PNG + a VO track — a hook, 3 red-strike MYTH cards that flip to teal-check FACT cards (per-line strikethrough that crosses EVERY wrapped line), a "what actually works" turn, an optional proof reveal, a punch line, and a static end card. DETERMINISTIC assembly with ZERO AI-gen visuals — HTML hyperframes rendered frame-exact via Playwright (`window.renderAt(t)`, animation a pure function of beat-local time), Whisper beat-snap to VO word onsets, concat at a uniform fps, karaoke `.ass` captions burned last (suppressed on the proof + end-card beats), and a VO + optional music mix (music −20 dB, `amix normalize=0`, tail fade). FREE (Python + Playwright + ffmpeg); the recipe supplies the copy / palette / end-card / VO and gates the paid VO / music / Whisper calls to their own capabilities. Use for the myth-vs-fact format.

**Skill folder:** `skills/goose-skills-render-myth-vs-fact/`
**Namespace:** `ui`
