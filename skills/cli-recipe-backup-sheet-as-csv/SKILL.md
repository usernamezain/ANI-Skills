---
name: mobile:recipe-backup-sheet-as-csv
description: "Export a Google Sheets spreadsheet as a CSV file for local backup or processing."
metadata:
  version: 0.22.5
  openclaw:
    category: "recipe"
    domain: "productivity"
    requires:
      bins:
        - gws
      skills:
        - gws-sheets
        - gws-drive
---

# Export a Google Sheet as CSV

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-sheets`, `gws-drive`

Export a Google Sheets spreadsheet as a CSV file for local backup or processing.

## Steps

1. Get spreadsheet details: `gws sheets spreadsheets get --params '{"spreadsheetId": "SHEET_ID"}'`
2. Export as CSV: `gws drive files export --params '{"fileId": "SHEET_ID", "mimeType": "text/csv"}'`
3. Or read values directly: `gws sheets +read --spreadsheet SHEET_ID --range 'Sheet1' --format csv`



## When to Use
- Use this skill when the task involves `recipe-backup-sheet-as-csv` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-backup-sheet-as-csv`, `cli`, `mobile`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
