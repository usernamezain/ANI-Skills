# ai:render-podcast-skit

Assemble a two-host fake-podcast skit ad from a config — per-line lipsync clips hard-concatenated in script order, scaled/padded to 1080×1920, WHITE bottom-center captions (up to 5 words per cue, broken on sentence punctuation, word-wrapped to stay in-frame, held at least 0.9s) built from each line's OWN ElevenLabs char-level timestamps (offset by cumulative clip start, never Whisper), and closed on a Playwright/PIL brand end card composited from the real wordmark — never AI-rendered text. This is the FREE deterministic assembly stage (concat + white captions + end card + crf28 encode); the per-line VOs, photoreal gpt-image-2 base stills, expression variants, and lipsync clips come from create-vo-elevenlabs / create-image-gpt-image-fal / create-video-fal. Use for the podcast-skit format.

**Skill folder:** `skills/goose-skills-render-podcast-skit/`
**Namespace:** `ai`
