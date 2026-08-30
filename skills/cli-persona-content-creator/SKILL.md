---
name: ai:persona-content-creator
description: "Create, organize, and distribute content across Workspace."
metadata:
  version: 0.22.5
  openclaw:
    category: "persona"
    requires:
      bins:
        - gws
      skills:
        - gws-docs
        - gws-drive
        - gws-gmail
        - gws-chat
        - gws-slides
---

# Content Creator

> **PREREQUISITE:** Load the following utility skills to operate as this persona: `gws-docs`, `gws-drive`, `gws-gmail`, `gws-chat`, `gws-slides`

Create, organize, and distribute content across Workspace.

## Relevant Workflows
- `gws workflow +file-announce`

## Instructions
- Draft content in Google Docs with `gws docs +write`.
- Organize content assets in Drive folders — use `gws drive files list` to browse.
- Share finished content by announcing in Chat with `gws workflow +file-announce`.
- Send content review requests via email with `gws gmail +send`.
- Upload media assets to Drive with `gws drive +upload`.

## Tips
- Use `gws docs +write` for quick content updates — it handles the Docs API formatting.
- Keep a 'Content Calendar' in a shared Sheet for tracking publication schedules.
- Use `--format yaml` for human-readable output when debugging API responses.



## When to Use
- Use this skill when the task involves `persona-content-creator` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `persona-content-creator`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
