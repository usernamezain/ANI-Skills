# ai:media-proxy

Shared helper that routes ALL paid media generation (FAL image/video, ElevenLabs music) through the GooseWorks proxies so every call bills the Ads agent — never a provider SDK's default host. Host-swaps the FAL queue URLs, loads the agent token from ~/.gooseworks/credentials.json, and returns the result CDN URL. Every video-ad media capability imports this; templates never call a provider directly.

**Skill folder:** `skills/goose-skills-media-proxy/`
**Namespace:** `ai`
