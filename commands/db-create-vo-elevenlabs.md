# db:create-vo-elevenlabs

Generate a voiceover (VO) clip via ElevenLabs text-to-speech, ROUTED THROUGH THE elevenlabs-proxy so it bills the Ads agent. Voice id + script text come from the template recipe. Use for the spoken narration of VO-driven video-ad formats (cgi-app-sizzle, flat-vector-explainer, hypermotion). Never call ElevenLabs directly — the proxy attribution is required.

**Skill folder:** `skills/goose-skills-create-vo-elevenlabs/`
**Namespace:** `db`
