---
name: ai:create-image-fal
description: Generate or edit an image via any FAL image model (nano-banana edit, gpt-image, flux, ...), ROUTED THROUGH THE fal-proxy so it bills the Ads agent. image_urls must be public URLs (orchestrator hosts local product refs via MCP upload->presign). The recipe names the model + prompt. Use for keyframes, flat-cover transforms, product hero edits. (For the OpenAI gpt-image family specifically, create-image-gpt-image-fal also exists.)
status: active
---

# create-image-fal

Generate or edit an image via any FAL image model (nano-banana edit, gpt-image, flux, ...), ROUTED THROUGH THE fal-proxy so it bills the Ads agent. image_urls must be public URLs (orchestrator hosts local product refs via MCP upload->presign). The recipe names the model + prompt. Use for keyframes, flat-cover transforms, product hero edits. (For the OpenAI gpt-image family specifically, create-image-gpt-image-fal also exists.)

## Run
gen_image.py --model fal-ai/nano-banana/edit --payload '{...}' --out keyframe.png — bills the agent; returns the *.fal.media URL.

## Contract
- Paid calls route through the GooseWorks proxies (bills the Ads agent) via the
  bundled `media_proxy.py` — never a provider SDK's default host.
- The template recipe (DB) supplies the model + params; this capability is generic.


## When to Use
- Use this skill when the task involves `create-image-fal` workflows, tooling, or domain requirements from `gooseworks-ai/goose-skills`.
- Trigger on user keywords: `create-image-fal`, `goose-skills`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
