# ai:create-video-fal

Image-to-video (or text-to-video) via any FAL video model (Kling, Seedance, Veo), ROUTED THROUGH THE GooseWorks fal-proxy so the call bills the Ads agent. The template recipe names the model + params; image_url inputs must be public URLs (the orchestrator hosts local frames via MCP get_upload_url -> get_download_url). Returns the result video URL and downloads it. Use for the generative base clip of any video-ad format.

**Skill folder:** `skills/goose-skills-create-video-fal/`
**Namespace:** `ai`
