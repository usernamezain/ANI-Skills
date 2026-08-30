# marketing:brand-setup

Create or update the brand profile every other skill reads — a quick 5-question or full 17-question interactive setup capturing identity, business model, industry and compliance markets, 4-dimension voice scales, channels, goals, and competitors, saved to ~/.claude-marketing/brands/{slug}/profile.json via scripts/setup.py. Triggers on \"/digital-marketing-pro:brand-setup\", \"set up a new brand\", \"onboard a new client\", \"switch to another brand\", \"update our brand voice\". Also handles brand switching (updates _active-brand.json) and field-level profile edits; run this first — all marketing skills auto-apply the resulting profile, voice samples, and compliance rules.

**Skill folder:** `skills/digital-marketing-pro-brand-setup/`
**Namespace:** `marketing`
