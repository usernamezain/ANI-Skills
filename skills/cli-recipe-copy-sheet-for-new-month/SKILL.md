---
name: ai:recipe-copy-sheet-for-new-month
description: "Duplicate a Google Sheets template tab for a new month of tracking."
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
---

# Copy a Google Sheet for a New Month

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-sheets`

Duplicate a Google Sheets template tab for a new month of tracking.

## Steps

1. Get spreadsheet details: `gws sheets spreadsheets get --params '{"spreadsheetId": "SHEET_ID"}'`
2. Copy the template sheet: `gws sheets spreadsheets sheets copyTo --params '{"spreadsheetId": "SHEET_ID", "sheetId": 0}' --json '{"destinationSpreadsheetId": "SHEET_ID"}'`
3. Rename the new tab: `gws sheets spreadsheets batchUpdate --params '{"spreadsheetId": "SHEET_ID"}' --json '{"requests": [{"updateSheetProperties": {"properties": {"sheetId": 123, "title": "February 2025"}, "fields": "title"}}]}'`



## When to Use
- Use this skill when the task involves `recipe-copy-sheet-for-new-month` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-copy-sheet-for-new-month`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
