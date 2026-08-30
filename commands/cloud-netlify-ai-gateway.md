# cloud:netlify-ai-gateway

Reference for Netlify AI Gateway — the managed proxy that routes calls to OpenAI, Anthropic, and Google Gemini SDKs without provider API keys. Use this skill any time the user wants to add AI on a Netlify site (chat, completion, reasoning, image generation, image-to-image edit/stylize), choose or change a model, wire up the OpenAI / Anthropic / @google/genai SDK, decide which provider to use for an image-gen feature (it's Gemini-only on the gateway), or debug "model not found" / "API key missing" against the gateway. Required reading before pinning a model — the gateway exposes a curated subset, not every provider model.

**Skill folder:** `skills/netlify-skills-netlify-ai-gateway/`
**Namespace:** `cloud`
