---
name: db:create-vo-elevenlabs
description: Generate a voiceover (VO) clip via ElevenLabs text-to-speech, ROUTED THROUGH THE elevenlabs-proxy so it bills the Ads agent. Voice id + script text come from the template recipe. Use for the spoken narration of VO-driven video-ad formats (cgi-app-sizzle, flat-vector-explainer, hypermotion). Never call ElevenLabs directly — the proxy attribution is required.
status: active
---

# create-vo-elevenlabs

VO via the elevenlabs-proxy (bills the Ads agent). `gen_vo.py --text "..." --voice <id> --out vo.mp3`.
The template recipe supplies the voice + text; paid call routes through media_proxy.


## When to Use
- Use this skill when the task involves `create-vo-elevenlabs` workflows, tooling, or domain requirements from `gooseworks-ai/goose-skills`.
- Trigger on user keywords: `create-vo-elevenlabs`, `goose-skills`, `db`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
