---
name: ai:recipe-bulk-download-folder
description: "List and download all files from a Google Drive folder."
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
---

# Bulk Download Drive Folder

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-drive`

List and download all files from a Google Drive folder.

## Steps

1. List files in folder: `gws drive files list --params '{"q": "'\''FOLDER_ID'\'' in parents"}' --format json`
2. Download each file: `gws drive files get --params '{"fileId": "FILE_ID", "alt": "media"}' -o filename.ext`
3. Export Google Docs as PDF: `gws drive files export --params '{"fileId": "FILE_ID", "mimeType": "application/pdf"}' -o document.pdf`



## When to Use
- Use this skill when the task involves `recipe-bulk-download-folder` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-bulk-download-folder`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
