# ai:render-cosmic-mythology-voiceover

Assemble a cosmic-mythology-voiceover reel from a config — a warm spoken voiceover carries the whole narrative while N curated cosmic stills are weighted beat-synced across the delivered VO duration (cut_dur = VO_dur times weight over the weight sum, so emotional beats hold longer), Ken-Burns-zoomed per still (scale 2x, center crop, zoompan, fade-in first and fade-out last), ffmpeg-concatenated, the VO composited under the picture (libx264 crf18 plus aac), the ONE on-screen hook line faded on over the open with a drawtext alpha window, and Whisper/VEED captions burned along the bottom — never in-world text on a still. This is the FREE deterministic assembly stage (weighted sequence plus Ken-Burns plus concat plus VO composite plus hook overlay plus caption burn); the VO and the stills come from create-vo-elevenlabs and create-image-fal. Use for the cosmic-mythology-voiceover format.

**Skill folder:** `skills/goose-skills-render-cosmic-mythology-voiceover/`
**Namespace:** `ai`
