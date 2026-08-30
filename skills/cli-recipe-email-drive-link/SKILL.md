---
name: ai:recipe-email-drive-link
description: "Share a Google Drive file and email the link with a message to recipients."
metadata:
  version: 0.22.5
  openclaw:
    category: "recipe"
    domain: "productivity"
    requires:
      bins:
        - gws
      skills:
        - gws-drive
        - gws-gmail
---

# Email a Google Drive File Link

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-drive`, `gws-gmail`

Share a Google Drive file and email the link with a message to recipients.

## Steps

1. Find the file: `gws drive files list --params '{"q": "name = '\''Quarterly Report'\''"}'`
2. Share the file: `gws drive permissions create --params '{"fileId": "FILE_ID"}' --json '{"role": "reader", "type": "user", "emailAddress": "client@example.com"}'`
3. Email the link: `gws gmail +send --to client@example.com --subject 'Quarterly Report' --body 'Hi, please find the report here: https://docs.google.com/document/d/FILE_ID'`



## When to Use
- Use this skill when the task involves `recipe-email-drive-link` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-email-drive-link`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
