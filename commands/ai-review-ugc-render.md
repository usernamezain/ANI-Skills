# ai:review-ugc-render

Mandatory pre-publish review gate for a UGC video render. Transcribes the finished render's AUDIO with Whisper and word-diffs it against the approved spoken script, then gates set_final_render — blocking a render whose generated audio mis-voices a word (e.g. the approved "human-vetted" spoken as "human witted"), drops an approved phrase, or comes back silent. Runnable, gating counterpart to content-goose's review-transcript-integrity atom. Every ugc-video-formats recipe runs this after render and BEFORE set_final_render.

**Skill folder:** `skills/goose-skills-review-ugc-render/`
**Namespace:** `ai`
