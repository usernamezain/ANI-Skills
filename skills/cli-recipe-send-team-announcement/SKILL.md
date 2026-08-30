---
name: ai:recipe-send-team-announcement
description: "Send a team announcement via both Gmail and a Google Chat space."
metadata:
  version: 0.22.5
  openclaw:
    category: "recipe"
    domain: "communication"
    requires:
      bins:
        - gws
      skills:
        - gws-gmail
        - gws-chat
---

# Announce via Gmail and Google Chat

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-gmail`, `gws-chat`

Send a team announcement via both Gmail and a Google Chat space.

## Steps

1. Send email: `gws gmail +send --to team@company.com --subject 'Important Update' --body 'Please review the attached policy changes.'`
2. Post in Chat: `gws chat +send --space spaces/TEAM_SPACE --text '📢 Important Update: Please check your email for policy changes.'`



## When to Use
- Use this skill when the task involves `recipe-send-team-announcement` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-send-team-announcement`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
