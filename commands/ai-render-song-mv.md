# ai:render-song-mv

Assemble a song-driven music-video ad from a config — a generated sung track carries the whole narration across N tableaux (one keyframe -> one i2v clip per lyric beat) with NO separate voiceover, captions synced to the song's OWN word timings (script-window, never Whisper) and the hook word landing on the chorus drop, closed on a PIL brand end card. This is the FREE deterministic assembly stage (clip cut-to-timeline + captions + end card + FFmpeg composite); the song, keyframes, and clips come from create-music-elevenlabs / create-image-fal / create-video-fal. Use for the song-driven-music-video format.

**Skill folder:** `skills/goose-skills-render-song-mv/`
**Namespace:** `ai`
