---
name: ai:recipe-post-mortem-setup
description: "Create a Google Docs post-mortem, schedule a Google Calendar review, and notify via Chat."
metadata:
  version: 0.22.5
  openclaw:
    category: "recipe"
    domain: "engineering"
    requires:
      bins:
        - gws
      skills:
        - gws-docs
        - gws-calendar
        - gws-chat
---

# Set Up Post-Mortem

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-docs`, `gws-calendar`, `gws-chat`

Create a Google Docs post-mortem, schedule a Google Calendar review, and notify via Chat.

## Steps

1. Create post-mortem doc: `gws docs +write --title 'Post-Mortem: [Incident]' --body '## Summary\n\n## Timeline\n\n## Root Cause\n\n## Action Items'`
2. Schedule review meeting: `gws calendar +insert --summary 'Post-Mortem Review: [Incident]' --attendee team@company.com --start '2026-03-16T14:00:00' --end '2026-03-16T15:00:00'`
3. Notify in Chat: `gws chat +send --space spaces/ENG_SPACE --text '🔍 Post-mortem scheduled for [Incident].'`



## When to Use
- Use this skill when the task involves `recipe-post-mortem-setup` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-post-mortem-setup`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
