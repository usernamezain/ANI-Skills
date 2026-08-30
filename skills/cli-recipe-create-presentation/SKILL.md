---
name: ai:recipe-create-presentation
description: "Create a new Google Slides presentation and add initial slides."
metadata:
  version: 0.22.5
  openclaw:
    category: "recipe"
    domain: "productivity"
    requires:
      bins:
        - gws
      skills:
        - gws-slides
---

# Create a Google Slides Presentation

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-slides`

Create a new Google Slides presentation and add initial slides.

## Steps

1. Create presentation: `gws slides presentations create --json '{"title": "Quarterly Review Q2"}'`
2. Get the presentation ID from the response
3. Share with team: `gws drive permissions create --params '{"fileId": "PRESENTATION_ID"}' --json '{"role": "writer", "type": "user", "emailAddress": "team@company.com"}'`



## When to Use
- Use this skill when the task involves `recipe-create-presentation` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-create-presentation`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
