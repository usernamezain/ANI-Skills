---
name: ai:create-video-fal
description: Image-to-video (or text-to-video) via any FAL video model (Kling, Seedance, Veo), ROUTED THROUGH THE GooseWorks fal-proxy so the call bills the Ads agent. The template recipe names the model + params; image_url inputs must be public URLs (the orchestrator hosts local frames via MCP get_upload_url -> get_download_url). Returns the result video URL and downloads it. Use for the generative base clip of any video-ad format.
status: active
---

# create-video-fal

Image-to-video (or text-to-video) via any FAL video model (Kling, Seedance, Veo), ROUTED THROUGH THE GooseWorks fal-proxy so the call bills the Ads agent. The template recipe names the model + params; image_url inputs must be public URLs (the orchestrator hosts local frames via MCP get_upload_url -> get_download_url). Returns the result video URL and downloads it. Use for the generative base clip of any video-ad format.

## Run
gen_video.py --model fal-ai/kling-video/v2.1/standard/image-to-video --payload '{...}' --out clip.mp4 — bills the agent; host-swaps the FAL queue URLs; downloads the result.

## Contract
- Paid calls route through the GooseWorks proxies (bills the Ads agent) via the
  bundled `media_proxy.py` — never a provider SDK's default host.
- The template recipe (DB) supplies the model + params; this capability is generic.


## When to Use
- Use this skill when the task involves `create-video-fal` workflows, tooling, or domain requirements from `gooseworks-ai/goose-skills`.
- Trigger on user keywords: `create-video-fal`, `goose-skills`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
