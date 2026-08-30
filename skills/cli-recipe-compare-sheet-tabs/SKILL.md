---
name: ai:recipe-compare-sheet-tabs
description: "Read data from two tabs in a Google Sheet to compare and identify differences."
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

# Compare Two Google Sheets Tabs

> **PREREQUISITE:** Load the following skills to execute this recipe: `gws-sheets`

Read data from two tabs in a Google Sheet to compare and identify differences.

## Steps

1. Read the first tab: `gws sheets +read --spreadsheet SHEET_ID --range "January!A1:D"`
2. Read the second tab: `gws sheets +read --spreadsheet SHEET_ID --range "February!A1:D"`
3. Compare the data and identify changes



## When to Use
- Use this skill when the task involves `recipe-compare-sheet-tabs` workflows, tooling, or domain requirements from `googleworkspace/cli`.
- Trigger on user keywords: `recipe-compare-sheet-tabs`, `cli`, `ai`.

## What to Use
- Read the instructions below, implement pattern-verified code, and consult the `references/` folder if available.
