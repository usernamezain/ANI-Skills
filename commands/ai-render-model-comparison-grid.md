# ai:render-model-comparison-grid

Render a 'model comparison grid' video from a config — a fal-style "same prompt, N contenders" showcase — a dark real-DOM stage where per beat a monospace prompt fades in centered, docks to a small top strip, then a labeled 2-4 panel grid (static images OR muted video clips, mixable per cell) staggers in and holds for comparison, plus a minimal end card — frame-stepped via Playwright (video cells are frame-seeked deterministically) and encoded with FFmpeg. Deterministic assembly, FREE (cell media comes from create-image-fal / create-video-fal, music from create-music-elevenlabs), text stays pixel-crisp. Use for the model-comparison-grid format.

**Skill folder:** `skills/goose-skills-render-model-comparison-grid/`
**Namespace:** `ai`
