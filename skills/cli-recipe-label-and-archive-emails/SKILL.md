---
name: ai:recipe-label-and-archive-emails
description: "Apply Gmail labels to matching messages and archive them to keep your inbox clean."
metadata:
  version: 0.22.5
  openclaw:
    category: "recipe"
    domain: "productivity"
    requires:
      bins:
        - gws
      skills:
        - gws-gmail
---

# Label and Archive Gmail Threads

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-gmail`

Apply Gmail labels to matching messages and archive them to keep your inbox clean.

## Steps

1. Search for matching emails: `gws gmail users messages list --params '{"userId": "me", "q": "from:notifications@service.com"}' --format table`
2. Apply a label: `gws gmail users messages modify --params '{"userId": "me", "id": "MESSAGE_ID"}' --json '{"addLabelIds": ["LABEL_ID"]}'`
3. Archive (remove from inbox): `gws gmail users messages modify --params '{"userId": "me", "id": "MESSAGE_ID"}' --json '{"removeLabelIds": ["INBOX"]}'`



## When to Use
- Use this skill when the task involves `recipe-label-and-archive-emails` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-label-and-archive-emails`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
